import OrsParamsParser from '@/support/map-data-services/ors-params-parser'
import constants from '@/resources/constants'
import GeoUtils from '@/support/geo-utils'
import Place from '@/models/place'
import store from '@/store/store'
import lodash from 'lodash'

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
    service: mapSettings.endpoints.autocomplete // using autocomplete because it is faster
  })
  const args = OrsParamsParser.buildAutocompleteArgs(term)
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

    // Build args to search for address only
    let addressesArgs = OrsParamsParser.buildAutocompleteArgs(term, false)
    addressesArgs.size = quantity
     // priority administrative places and addresses
    addressesArgs.layers = ['country', 'region', 'macrocounty', 'borough', 'macroregion', 'county', 'locality', 'neighbourhood', 'borough', 'street', 'address', 'localadmin']
    promises.push(client.geocode(addressesArgs))   

    // Build a second query that searchs for everything, including venues
    const restrictToBbox = restrictArea && mapSettings.prioritizeSearchingForNearbyPlaces
    let poisArgs = OrsParamsParser.buildAutocompleteArgs(term, restrictToBbox)
    poisArgs.size = quantity
    poisArgs.layers = ['venue'] // POIs  
    promises.push(client.geocode(poisArgs))    

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
  let features = responses[0].features
  if (responses.length === 2) {
    features = responses[0].features.slice(0, quantity / 2)
    let availableSlots = (quantity - features.length)
    features = features.concat(responses[1].features.slice(0, availableSlots))
  } else {
    features = responses[0].features
  }

  features = sortFeatures(features)
  const places = Place.placesFromFeatures(features)
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
  features = lodash.uniqBy(features, function (f) { return f.properties.id })
  
  for (let key in features) {    
    let featureLatLng = GeoUtils.buildLatLong(features[key].geometry.coordinates[1], features[key].geometry.coordinates[0])
    features[key].distance = GeoUtils.calculateDistanceBetweenLocations(store.getters.mapSettings.mapCenter, featureLatLng, store.getters.mapSettings.unit)    
  }
  features = lodash.sortBy(features, ['distance', 'asc'])

  let closestCityIndex = lodash.findIndex(features, function(f) { return f.properties.layer === 'locality' || f.properties.layer === 'city' })
  if (closestCityIndex) {
    // Move closest city to first postion
    features.splice(0, 0, features.splice(closestCityIndex, 1)[0])
  }
  return features
}

/**
 * Get the POI function accessor
 */
const Pois = () => {
  const mapSettings = store.getters.mapSettings

  const pois = new OrsApiClient.Pois({
    api_key: mapSettings.apiKey,
    host: mapSettings.apiBaseUrl,
    service: mapSettings.endpoints.pois
  })
  return pois
}

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
