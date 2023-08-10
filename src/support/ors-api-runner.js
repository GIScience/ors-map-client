import OrsParamsParser from '@/support/map-data-services/ors-params-parser'
import constants from '@/resources/constants'
import GeoUtils from '@/support/geo-utils'
import AppLoader from '@/app-loader'
import Place from '@/models/place'
import store from '@/store/store'
import lodash from 'lodash'

import OrsApiClient from 'openrouteservice-js'

// By default, we use the openrouteservice-js npm package to query the API.
// But, if it is needed to test and change the openrouteservice-js itself the lib source code
// can be put in the /src/ors-js folder, and then we can use it to apply changes and see
// these changes on the fly. This is only to developers who will work on
// the openrouteservice-js project. If you want to do this, comment the OrsApiClient import above
// and uncomment the import line below to use a local and unpacked openrouteservice-js lib
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

  return new Promise((resolve, reject) => {
    OrsParamsParser.buildRoutingArgs(places).then(args => {
      if (customArgs) {
        args = Object.assign(args, customArgs)
      }
      directions.calculate(args).then(response => {
        const data = { options: { origin: constants.dataOrigins.directions, apiVersion: constants.apiVersion }, content: response }
        resolve(data)
      }).catch(err => {
        err.response.json().then((error) => {
          const result = { response: error, args: args }
          reject(result)
        })
      })
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
      err.response.json().then((error) => {
        reject(error)
      })
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
      err.response.json().then((error) => {
        reject(error)
      })
    })
  })
}

/**
 * Run a search for places given a term. If the search is set to
 * be run within a restricted are and no results are found with
 * this restriction than the function runs a second query ignoring
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

    // Build a search localities only
    let localityArgs = OrsParamsParser.buildPlaceSearchArgs(term, false)
    localityArgs.size = quantity / (quantity / 2)
    localityArgs.layers = ['locality']
    promises.push(client.geocode(localityArgs))
    AppLoader.getInstance().appHooks.run('placeSearchLocalityArgsDefined', localityArgs)

    // Build a search counties only
    let countyArgs = OrsParamsParser.buildPlaceSearchArgs(term, false)
    countyArgs.size = quantity / (quantity / 1)
    countyArgs.layers = ['county']
    promises.push(client.geocode(countyArgs))
    AppLoader.getInstance().appHooks.run('placeSearchCountyArgsDefined', countyArgs)

    // Build a search for addresses
    let addressesArgs = OrsParamsParser.buildPlaceSearchArgs(term, false)
    addressesArgs.size = quantity
    addressesArgs.layers = ['country', 'region', 'macrocounty', 'macroregion', 'neighbourhood', 'borough', 'street', 'address', 'postalcode'] // `coarse` will bring places by postal code
    promises.push(client.geocode(addressesArgs))
    AppLoader.getInstance().appHooks.run('placeSearchAddressArgsDefined', addressesArgs)

    // Build a search for venues
    const restrictToBbox = restrictArea && mapSettings.prioritizeSearchingForNearbyPlaces
    let poisArgs = OrsParamsParser.buildPlaceSearchArgs(term, restrictToBbox)
    poisArgs.size = quantity
    poisArgs.layers = ['venue'] // venue = POI
    promises.push(client.geocode(poisArgs))
    AppLoader.getInstance().appHooks.run('placeSearchPoisArgsDefined', addressesArgs)

    promises = AppLoader.getInstance().appHooks.run('placeSearchPromisesDefined', promises)

    Promise.all(promises).then((responses) => {
      const places = buildPlacesSearchResult(responses, quantity)
      resolve(places)
    }).catch(err => {
      err.response.json().then((error) => {
        reject(error)
      })
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
      quantity = quantity - localityFeatures.length
      features = features.concat(localityFeatures)
    }

    let countyFeatures = responses[1].features
    if(countyFeatures && countyFeatures.length > 0) {
      quantity = quantity - countyFeatures.length
      features = features.concat(countyFeatures)
    }

    // By default, get all the features of the administrative places list
    let adminFeatures = []
    if (responses.length > 1) {
      adminFeatures = responses[2].features
    }

    // If there are administrative places and also places
    // from POIs (venues) then merge them into the collection
    let poisFeatures = responses.length === 4 ? responses[3].features : []

    if (poisFeatures.length > 0) {
      let half = Math.round((quantity / 2))
      let amountTobGetFromPOIsList = poisFeatures.length > half ? half : poisFeatures.length
      let amountTobGetFromAdminList = quantity - amountTobGetFromPOIsList
      features = features.concat(adminFeatures.slice(0, amountTobGetFromAdminList))
      features = features.concat(poisFeatures.slice(0, amountTobGetFromPOIsList))
    } else {
      features = features.concat(adminFeatures)
    }
  }
  features = sortFeatures(features)

  let places = Place.placesFromFeatures(features)
  places = AppLoader.getInstance().appHooks.run('placeSearchResultPrepared', places)
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
  // Se the distance of each location considering the current map center
  for (let key in features) {
    let featureLatLng = GeoUtils.buildLatLong(features[key].geometry.coordinates[1], features[key].geometry.coordinates[0])
    features[key].distance = GeoUtils.calculateDistanceBetweenLocations(store.getters.mapSettings.mapCenter, featureLatLng, store.getters.mapSettings.unit)
    // Add a unique id for each feature
    features[key].properties.unique_id = features[key].properties.id || `osm_id_${features[key].properties.osm_id}`
  }
  // Sort by distance
  features = lodash.sortBy(features, ['distance', 'asc'])

  let bestMatchIndex = lodash.findIndex(features, function(f) { return f.bestMatch === true})
  if (bestMatchIndex > -1) {
    // Move best match to first position (duplicated items will be removed later)
    features.splice(0, 0, features[bestMatchIndex])
  }

  let postalCodeIndex = lodash.findIndex(features, function(f) { return f.properties.layer === 'postalcode'})
  if (postalCodeIndex > 1) {
    // Move postalcode place to first position (duplicated items will be removed later)
    features.splice(0, 0, features[postalCodeIndex])
  } else {
    let closestCityIndex = lodash.findIndex(features, function(f) { return f.properties.layer === 'locality' || f.properties.layer === 'city'})
    if (closestCityIndex > 1) {
      // Move the closest city to second position (duplicated items will be removed later)
      features.splice(1, 0, features[closestCityIndex])
    }
  }
  let closestCountyIndex = lodash.findIndex(features, function(f) { return f.properties.layer === 'county' })
  if (closestCountyIndex > 1) {
    // Move the closest city to second position (duplicated items will be removed later)
    features.splice(2, 0, features[closestCountyIndex])
  }

  let closestCountryIndex = lodash.findIndex(features, function(f) { return f.properties.layer === 'country'})
  if (closestCountryIndex > 2) {
    // Move the closest city to third position (duplicated items will be removed later)
    features.splice(3, 0, features[closestCountryIndex])
  }
  // remove duplicated
  features = lodash.uniqBy(features, function (f) { return f.properties.unique_id })
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
      err.response.json().then((error) => {
        reject(error)
      })
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

  const isochrones = new OrsApiClient.Isochrones({
    api_key: mapSettings.apiKey,
    host: mapSettings.apiBaseUrl,
    service: mapSettings.endpoints.isochrones
  })
  return new Promise((resolve, reject) => {
    OrsParamsParser.buildIsochronesArgs(places).then(args => {
      isochrones.calculate(args).then((response) => {
        const data = { options: { origin: constants.dataOrigins.isochrones, apiVersion: constants.apiVersion }, content: response }
        resolve(data)
      }).catch((err) => {
        err.response.json().then((error) => {
          const result = { response: error, args: args }
          reject(result)
        })
      })
    })
  })
}

export { Directions }
export { Geocode }
export { Pois }
export { PlacesSearch }
export { ReverseGeocode }
export { Isochrones }
