import geoUtils from '@/support/geo-utils'
import lodash from 'lodash'

/**
 * Build a geolocation response like object based on a given place object
 * @param {*} place
 * @returns {*}
 */
const buildSinglePlaceResponse = (place) => {
  const responseLikeLData = { features: [{ properties: { label: place.placeName, id: place.placeId }, geometry: { coordinates: place.coordinates }, inputIndex: 0 }] }
  return responseLikeLData
}

/**
 * Filter a response data so that only the selected place will be part of it
 * @param {*} suggestedPlaceSelected
 * @returns {object}
 */
const getFilteredFeatureResponse = (featureId, rawResponse) => {
  const filteredResponse = {}
  Object.assign(filteredResponse, rawResponse)
  if (rawResponse && Array.isArray(rawResponse.features)) {
    filteredResponse.features = lodash.filter(rawResponse.features, function (f) { return f.properties.id === featureId })
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
  const newTimestamp = lodash.get(newResponse, 'metadata.timestamp')
  const oldTimestamp = lodash.get(oldResponse, 'metadata.timestamp')
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
  const filter = lodash.find(OrsMapFiltersAccessor, (f) => {
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
  const filterIndex = lodash.findIndex(OrsMapFiltersAccessor, (f) => {
    return f.name === name
  })
  return filterIndex
}

const responseUtils = {
  buildSinglePlaceResponse,
  getFilteredFeatureResponse,
  isANewResponse,
  isANewMapViewData,
  getFilterRefByName,
  getFilterIndexByName
}

export default responseUtils
