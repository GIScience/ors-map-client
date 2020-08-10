import OrsParamsParser from '@/support/map-data-services/ors-params-parser'
import constants from '@/resources/constants'
import Place from '@/models/place'
import store from '@/store/store'

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
  let directions = new OrsApiClient.Directions({
    api_key: store.getters.mapSettings.apiKey,
    host: store.getters.mapSettings.apiBaseUrl,
    service: store.getters.mapSettings.endpoints.directions
  })
  let args = OrsParamsParser.buildRoutingArgs(places)
  if (customArgs) {
    args = Object.assign(args, customArgs)
  }
  return new Promise((resolve, reject) => {
    directions.calculate(args).then(response => {
      let data = { options: {origin: constants.dataOrigins.directions, apiVersion: constants.apiVersion}, content: response }
      resolve(data)
    }).catch(err => {
      let result = {response: err, args: args}
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
  let client = new OrsApiClient.Geocode({
    api_key: store.getters.mapSettings.apiKey,
    host: store.getters.mapSettings.apiBaseUrl,
    service: store.getters.mapSettings.endpoints.autocomplete // using autocomplete because it is faster
  })
  let args = OrsParamsParser.buildAutocompleteArgs(term)
  args.size = size
  return new Promise((resolve, reject) => {
    client.geocode(args).then((response) => {
      let places = Place.placesFromFeatures(response.features)
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
  let client = new OrsApiClient.Geocode({
    api_key: store.getters.mapSettings.apiKey,
    host: store.getters.mapSettings.apiBaseUrl,
    service: store.getters.mapSettings.endpoints.reverseGeocode
  })
  let args = OrsParamsParser.buildReverseSearchArgs(lat, lng)
  args.size = size
  return new Promise((resolve, reject) => {
    client.reverseGeocode(args).then((response) => {
      let places = Place.placesFromFeatures(response.features)
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
    let restrictToBbox = restrictArea && store.getters.mapSettings.prioritizeSearchingForNearbyPlaces
    let args = OrsParamsParser.buildAutocompleteArgs(term, restrictToBbox)
    args.size = quantity

    let client = new OrsApiClient.Geocode({
      api_key: store.getters.mapSettings.apiKey,
      host: store.getters.mapSettings.apiBaseUrl,
      service: store.getters.mapSettings.endpoints.geocodeSearch
    })

    client.geocode(args).then(response => {
      // If no features were returned and the search
      // was limited to the defined bounding box, redo
      // the search at this time without the bounding box
      if (response.features.length === 0 && restrictToBbox) {
        return PlacesSearch(term, quantity, false).then(places => {
          resolve(places)
        }).catch(response => {
          reject(response)
        })
      } else {
        let places = Place.placesFromFeatures(response.features)
        resolve(places)
      }
    }).catch(response => {
      reject(response)
    })
  })
}

/**
 * Get the POI function accessor
 */
const Pois = () => {
  let pois = new OrsApiClient.Pois({
    api_key: store.getters.mapSettings.apiKey,
    host: store.getters.mapSettings.apiBaseUrl,
    service: store.getters.mapSettings.endpoints.pois
  })
  return pois
}

const Isochrones = (places) => {
  var isochrones = new OrsApiClient.Isochrones({
    api_key: store.getters.mapSettings.apiKey,
    host: store.getters.mapSettings.apiBaseUrl,
    service: store.getters.mapSettings.endpoints.isochrones
  })
  return new Promise((resolve, reject) => {
    let args = OrsParamsParser.buildIsochronesArgs(places)
    isochrones.calculate(args).then((response) => {
      let data = { options: {origin: constants.dataOrigins.isochrones, apiVersion: constants.apiVersion}, content: response }
      resolve(data)
    }).catch((err) => {
      let result = {response: err, args: args}
      reject(result)
    })
  })
}

export {Directions}
export {Geocode}
export {Pois}
export {PlacesSearch}
export {ReverseGeocode}
export {Isochrones}
