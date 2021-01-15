import OrsParamsParser from '@/support/map-data-services/ors-params-parser'
import constants from '@/resources/constants'
import GeoUtils from '@/support/geo-utils'
import Place from '@/models/place'
import store from '@/store/store'
import lodash from 'lodash'
import main from '@/main'

import OrsApiClient from 'openrouteservice-js'

// By default we use the openrouteservice-js npm package to query the API.
// But, if it is needed to test and change the openrouteservice-js itself the lib source code
// can be put in the /src/ors-js folder and then we can use it to apply changes and see
// these changes on the fly. This is only to developers who will work on
// the openrouteservice-js project. If you want to do this, comment the OrsApiClient import above
// and uncomment the import lline below to use a local and unpacked openrouteservice-js lib
// import OrsApiClient from '@/ors-js/src'

/**
 * Get the Directions function accessor
 * @param {Array} Places
 * @param {Object} customArgs
 * @returns {Promise}
 */
const Directions = (places, customArgs = null) => {
  const mapSettings = store.getters.mapSettings

  // Build the ors client object
  const directions = new OrsApiClient.Directions({
    api_key: mapSettings.apiKey,
    host: mapSettings.apiBaseUrl,
    service: mapSettings.endpoints.directions
  })
  let args = OrsParamsParser.buildRoutingArgs(places)
  if (customArgs) {
    args = Object.assign(args, customArgs)
  }
  return new Promise((resolve, reject) => {
    directions.calculate(args).then(response => {
      const data = { options: { origin: constants.dataOrigins.directions, apiVersion: constants.apiVersion }, content: response }
      resolve(data)
    }).catch(err => {
      const result = { response: err, args: args }
      reject(result)
    })
  })
}

/**
 * Get the Geocode function accessor
 * @param {String} term
 * @param {Number} size
 * @returns {Promise}
 */
const Geocode = (term, size = 10) => {
  const mapSettings = store.getters.mapSettings
  const client = new OrsApiClient.Geocode({
    api_key: mapSettings.apiKey,
    host: mapSettings.apiBaseUrl,
    service: mapSettings.endpoints.geocodeSearch
  })
  const args = OrsParamsParser.buildPlaceSearchArgs(term)
  args.size = size
  return new Promise((resolve, reject) => {
    client.geocode(args).then((response) => {
      const places = Place.placesFromFeatures(response.features)
      resolve(places)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * Find places by using reverse geocode
 * @param {Number} lat
 * @param {Number} lng
 * @param {Number} size
 * @returns {Promise}
 */
const ReverseGeocode = (lat, lng, size = 10) => {
  const mapSettings = store.getters.mapSettings

  const client = new OrsApiClient.Geocode({
    api_key: mapSettings.apiKey,
    host: mapSettings.apiBaseUrl,
    service: mapSettings.endpoints.reverseGeocode
  })
  const args = OrsParamsParser.buildReverseSearchArgs(lat, lng)
  args.size = size
  return new Promise((resolve, reject) => {
    client.reverseGeocode(args).then((response) => {
      const places = Place.placesFromFeatures(response.features)
      resolve(places)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * Run a seach for places given a term. If the search is set to
 * be run within a restricted are and no results are found with
 * this restriction than the function runs a second query igonring
 * the bounding box restriction
 * @param {*} term
 * @param {*} quantity - default 100
 * @param {*} restrictArea - default true
 * @returns {Promise}
 */
const PlacesSearch = (term, quantity = 100, restrictArea = true) => {
  return new Promise((resolve, reject) => {
    const mapSettings = store.getters.mapSettings

    const client = new OrsApiClient.Geocode({
      api_key: mapSettings.apiKey,
      host: mapSettings.apiBaseUrl,
      service: mapSettings.endpoints.geocodeSearch
    })
    
    let promises = []

    // Build args to search for localities only
    let localityArgs = OrsParamsParser.buildPlaceSearchArgs(term, false)
    localityArgs.size = 1
    localityArgs.layers = ['locality']
    promises.push(client.geocode(localityArgs))   
    main.getInstance().appHooks.run('placeSearchlocalityArgsDefined', localityArgs)

    // Build args to search for address only (without locality)
    let addressesArgs = OrsParamsParser.buildPlaceSearchArgs(term, false)
    addressesArgs.size = quantity
    addressesArgs.layers = ['country', 'region', 'macrocounty', 'borough', 'macroregion', 'county', 'neighbourhood', 'borough', 'street', 'address', 'localadmin']
    promises.push(client.geocode(addressesArgs))   
    main.getInstance().appHooks.run('placeSearchAddressArgsDefined', addressesArgs)

    // Build a second query that searchs for everything, including venues
    const restrictToBbox = restrictArea && mapSettings.prioritizeSearchingForNearbyPlaces
    let poisArgs = OrsParamsParser.buildPlaceSearchArgs(term, restrictToBbox)
    poisArgs.size = quantity
    poisArgs.layers = ['venue'] // venue = POI 
    promises.push(client.geocode(poisArgs)) 
    main.getInstance().appHooks.run('placeSearchPoisArgsDefined', addressesArgs)

    promises = main.getInstance().appHooks.run('placeSearchPromisesDefined', promises)

    Promise.all(promises).then((responses) => {
      const places = buildPlacesSearchResult(responses, quantity)
      resolve(places)
    }).catch(response => {
      reject(response)
    })  
  })
}

/**
 * Build places result from promises response
 * @param {Array} responses 
 * @returns {Array} of Places
 */
const buildPlacesSearchResult = (responses, quantity) => {
  let features = []

  // Get the locality from the list, if available
  if (Array.isArray(responses) && responses.length > 0) {
    let localityFeatures = responses[0].features
    if(localityFeatures && localityFeatures.length > 0) {
      quantity--
    }
  
    // By default, get all the features of the administrative places list
    let adminFeatures = []
    if (responses.length > 1) {
      adminFeatures = responses[1].features
    }
  
    // If there are administrative places and also places 
    // from POIs (venues) then merge them into the collection
    let poisFeatures = responses.length === 3 ? responses[2].features : []

    if (localityFeatures.length === 1) {
      features.push(localityFeatures[0])
    }  
    
    if (poisFeatures.length > 0) {          
      let half = Math.round((quantity / 2))
      let amountTobGetFromPOIsList = half > poisFeatures.length ? half : poisFeatures.length
      let amountTobGetFromAdminList = quantity - amountTobGetFromPOIsList
      features = features.concat(adminFeatures.slice(0, amountTobGetFromAdminList))
      features = features.concat(poisFeatures.slice(0, amountTobGetFromPOIsList))
    } else {
      features = features.concat(adminFeatures)
    }
  }

  features = sortFeatures(features)
  let places = Place.placesFromFeatures(features)
  places = main.getInstance().appHooks.run('placeSearchResultPrepared', places)
  return places
}

/**
 * Sort features by layer and distance from current map center
 * @param {*} features 
 * @returns {Array} features
 */
const sortFeatures  = (features) => {
  if (features.length < 2) {
    return features
  }
  for (let key in features) {    
    // Se the distance of each location considering the current map center
    let featureLatLng = GeoUtils.buildLatLong(features[key].geometry.coordinates[1], features[key].geometry.coordinates[0])
    features[key].distance = GeoUtils.calculateDistanceBetweenLocations(store.getters.mapSettings.mapCenter, featureLatLng, store.getters.mapSettings.unit)    
    // Add a unique id for each feature
    features[key].properties.unique_id = features[key].properties.id || `osm_id_${features[key].properties.osm_id}`
  }
  // Get unique items
  features = lodash.uniqBy(features, function (f) { return f.properties.unique_id })
  features = lodash.sortBy(features, ['distance', 'asc'])

  let closestCityIndex = lodash.findIndex(features, function(f) { return f.properties.layer === 'locality' || f.properties.layer === 'city' })
  if (closestCityIndex > -1) {
    // Move closest city to first postion
    features.splice(0, 0, features.splice(closestCityIndex, 1)[0])
  }
  return features
}

/**
 * Get the POIs
 * @param {Object} filters {
 *  category_group_ids: Array, 
 *  category_ids: Array, 
 *  name: Array [String], 
 *  wheelchair: Array ["yes","no","limited","designated"], 
 *  smoking: Array ['dedicated','yes','no','separated','isolated','outside'], 
 *  fee: Array ['yes', 'no']
 * } @see https://openrouteservice.org/dev/#/api-docs/pois/post
 * @param {Number} limit
 * @param {Number} distanceBuffer
 * @returns {Promise}
 */
const Pois = (filters, limit = 100, distanceBuffer = 500) => {
  const mapSettings = store.getters.mapSettings

  const pois = new OrsApiClient.Pois({
    api_key: mapSettings.apiKey,
    host: mapSettings.apiBaseUrl,
    service: mapSettings.endpoints.pois
  })
  
  return new Promise((resolve, reject) => {
    let args = OrsParamsParser.buildPoisSearchArgs(filters, limit, distanceBuffer)
    pois.pois(args).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

/**
 * Get isochrones for a list of places
 * @param {*} places 
 * @returns {Promise}
 */
const Isochrones = (places) => {
  const mapSettings = store.getters.mapSettings

  var isochrones = new OrsApiClient.Isochrones({
    api_key: mapSettings.apiKey,
    host: mapSettings.apiBaseUrl,
    service: mapSettings.endpoints.isochrones
  })
  return new Promise((resolve, reject) => {
    const args = OrsParamsParser.buildIsochronesArgs(places)
    isochrones.calculate(args).then((response) => {
      const data = { options: { origin: constants.dataOrigins.isochrones, apiVersion: constants.apiVersion }, content: response }
      resolve(data)
    }).catch((err) => {
      const result = { response: err, args: args }
      reject(result)
    })
  })
}

export { Directions }
export { Geocode }
export { Pois }
export { PlacesSearch }
export { ReverseGeocode }
export { Isochrones }
