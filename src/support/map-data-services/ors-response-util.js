
import VueInstance from '@/main'
import geoUtils from '@/support/geo-utils'

/**
 * Build a geolocation response like object based on a given place object
 * @param {*} place
 * @returns {*}
 */
const buildSinglePlaceResponse = (place) => {
  let responseLikeLData = { features: [ { properties: { label: place.placeName, id: place.placeId }, geometry: { coordinates: place.coordinates }, inputIndex: 0 } ] }
  return responseLikeLData
}

/**
 * Filter a response data so that only the selected place will be part of it
 * @param {*} suggestedPlaceSelected
 * @returns {object}
 */
const getFilteredFeatureResponse = (featureId, rawResponse) => {
  let filteredResponse = {}
  Object.assign(filteredResponse, rawResponse)
  if (rawResponse && Array.isArray(rawResponse.features)) {
    filteredResponse.features = VueInstance.lodash.filter(rawResponse.features, function (f) { return f.properties.id === featureId })
    return filteredResponse
  }
}

/**
 * Determines if the new response is really different from the old one
 * using the response timestamp metadata as reference
 * @param {*} newResponse
 * @param {*} oldResponse
*/
const isANewResponse = (newResponse, oldResponse) => {
  let newTimestamp = VueInstance.lodash.get(newResponse, 'metadata.timestamp')
  let oldTimestamp = VueInstance.lodash.get(oldResponse, 'metadata.timestamp')
  if (!oldTimestamp || (newTimestamp !== oldTimestamp)) {
    return true
  }
  return false
}

/**
 * Determines if the new mapviewdata is really different from the old one
 * using the response timestamp metadata as reference
 * @param {*} newResponse
 * @param {*} oldResponse
*/
const isANewMapViewData = (newMapData, oldMapData) => {
  if (!newMapData || !oldMapData || !newMapData.timestamp || newMapData.timestamp > oldMapData.timestamp) {
    return true
  }
  return false
}

/**
 * Get filter object reference by filter name
 * @param {*} OrsMapFiltersAccessor
 * @param {*} name
 * @returns {*} filter object
 */
const getFilterRefByName = (OrsMapFiltersAccessor, name) => {
  let filter = VueInstance.lodash.find(OrsMapFiltersAccessor, (f) => {
    return f.name === name
  })
  return filter
}

/**
 * Get filter index by filter name
 * @param {*} OrsMapFiltersAccessor
 * @param {*} name
 * @returns {*} filter object
 */
const getFilterIndexByName = (OrsMapFiltersAccessor, name) => {
  let filterIndex = VueInstance.lodash.findIndex(OrsMapFiltersAccessor, (f) => {
    return f.name === name
  })
  return filterIndex
}

/**
 * Adjust response coordinates by switching the coordinates position in the responseData object
 * @param {*} responseData
 */
const adjustResponseCoordinates = (responseData) => {
  // When the query does not have elevation the returned result
  // comes with the coordinates position switched
  // so, we switchit back
  let queryWithElevation = VueInstance.lodash.get(responseData, 'metadata.query.elevation')

  // Switch coordinates position and decode polyline, if necessary
  if (responseData.routes) {
    if (responseData.metadata.query.format === 'encodedpolyline') {
      for (let key in responseData.routes) {
        responseData.routes[key].geometry = geoUtils.decodePolyline(responseData.routes[key].geometry.geometry)
        responseData.routes[key].route.geometry_format = 'geojson'
        if (queryWithElevation && !responseData.routes[key].geometry.switched) {
          responseData.routes[key].geometry.coordinates = geoUtils.switchLatLonIndex(responseData.routes[key].geometry.coordinates)
          responseData.routes[key].geometry.switched = true
        }
      }
    }
  } else if (responseData.features) {
    for (let key in responseData.features) {
      if (queryWithElevation && !responseData.features[key].geometry.switched) {
        responseData.features[key].geometry.coordinates = geoUtils.switchLatLonIndex(responseData.features[key].geometry.coordinates)
        responseData.features[key].geometry.switched = true
      }
    }
  }
}

const responseUtils = {
  buildSinglePlaceResponse,
  getFilteredFeatureResponse,
  adjustResponseCoordinates,
  isANewResponse,
  isANewMapViewData,
  getFilterRefByName,
  getFilterIndexByName
}

export default responseUtils
