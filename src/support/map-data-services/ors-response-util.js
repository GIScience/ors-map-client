import {findIndex as lodash_findIndex, filter as lodash_filter, get as lodash_get} from 'lodash'

/**
 * Build a geolocation response like object based on a given place object
 * @param {*} place
 * @returns {*}
 */
const buildSinglePlaceResponse = (place) => {
  const responseLikeLData = { features: [{ properties: { label: place.placeName, id: place.placeId }, geometry: { coordinates: place.coordinates } }] }
  return responseLikeLData
}

/**
 * Filter a response data so that only the selected place will be part of it
 * @returns {object}
 * @param featureId
 * @param rawResponse
 */
const getFilteredFeatureResponse = (featureId, rawResponse) => {
  const filteredResponse = {}
  Object.assign(filteredResponse, rawResponse)
  if (rawResponse && Array.isArray(rawResponse.features)) {
    filteredResponse.features = lodash_filter(rawResponse.features, function (f) { return f.properties.id === featureId })
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
  const newTimestamp = lodash_get(newResponse, 'metadata.timestamp')
  const oldTimestamp = lodash_get(oldResponse, 'metadata.timestamp')
  return !oldTimestamp || (newTimestamp !== oldTimestamp)
}

/**
 * Determines if the new map-view-data is really different from the old one
 * using the response timestamp metadata as reference
 * @param {*} newMapData
 * @param {*} oldMapData
*/
const isANewMapViewData = (newMapData, oldMapData) => {
  return !newMapData || !oldMapData || !newMapData.timestamp || newMapData.timestamp > oldMapData.timestamp

}

/**
 * Get filter index by filter name
 * @param {*} OrsMapFiltersAccessor
 * @param {*} name
 * @returns {*} filter object
 */
const getFilterIndexByName = (OrsMapFiltersAccessor, name) => {
  const filterIndex = lodash_findIndex(OrsMapFiltersAccessor, (f) => {
    return f.name === name
  })
  return filterIndex
}

const responseUtils = {
  buildSinglePlaceResponse,
  getFilteredFeatureResponse,
  isANewResponse,
  isANewMapViewData,
  getFilterIndexByName
}

export default responseUtils
