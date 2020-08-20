import Utils from '@/support/utils'
import Place from '@/models/place'
import lodash from 'lodash'
import store from '@/store/store'
import constants from '@/resources/constants'

const RouteUtils = {

  /**
   * Get route places
   * @param {Object} route
   * @returns {Array} places
   */
  getRoutePlaces: (route) => {
    const places = []
    const data = RouteUtils.decodeDataParam(route.params.data)
    // Get the collection of coordinates from the decoded data param object
    const coordinates = data.coordinates.split(';')

    // Check if we have the same number of coordinates and places
    var placeNameParameters = lodash.pickBy(route.params, function (value, key) {
      return key.startsWith('placeName') && value !== undefined
    })
    // If the amount of place names and coordinates does not match, it is an invalid path
    if (Object.keys(placeNameParameters).length !== coordinates.length) {
      return places
    }
    // Build each place object and add then to the places array
    let counter = 0
    for (const key in placeNameParameters) {
      const lnglat = coordinates[counter].split(',')

      // Add a new place
      const placeName = route.params[key].replace(',', ', ')
      places.push(new Place(lnglat[0], lnglat[1], placeName, { resolve: false, inputIndex: counter }))
      counter++
    }
    return places
  },
  /**
   * Build the route params object out of appRouteDAta and options object
   * @param {AppRouteData} appRouteData
   * @param {Object} options
   * @returns {Object} param
   */
  buildRouteParams: (appRouteData, options) => {
    appRouteData.options = appRouteData.options || {}
    Object.assign(appRouteData.options, options)
    const params = {}
    var coordinates = []

    // For each place, create a param that starts with `placeName` and ends with an index, like `placeName1`, `placeName2`...
    appRouteData.places.forEach((p, index) => {
      const placeKey = 'placeName' + (index + 1)
      params[placeKey] = p.placeName.replace(/, /g, ',')
      coordinates.push(`${p.lng},${p.lat}`)
    })
    const dataString = JSON.stringify({ coordinates: coordinates.join(';'), options: appRouteData.options })
    const data = store.getters.mapSettings.compressDataUrlSegment ? Utils.compressTxt(dataString) : dataString

    // Set the `data` param value, that goes at the end of the url
    params.data = data
    return params
  },
  /**
   * Decode string url value into an object
   * @param {String} str
   * @returns {}
   */
  decodeDataParam: (str, tryDecompress = true) => {
    if (!str) {
      return {}
    }
    if (store.getters.mapSettings.compressDataUrlSegment) {
      if (tryDecompress) {
        str = Utils.decompressTxt(str)
      }
    }
    let parsedData = Utils.tryParseJson(str)
    if (parsedData) {
      for (const key in parsedData) {
        if (typeof parsedData[key] === 'object') {
          for (const objKey in parsedData[key]) {
            const value = parsedData[key][objKey]
            if (value && value.toString().length > 1) {
              parsedData[key][objKey] = RouteUtils.decodeDataParam(value, false)
            } else {
              parsedData[key][objKey] = value
            }
          }
        }
      }
    } else {
      parsedData = str
    }
    return parsedData
  },

  /**
   * Set the directions mode based on the target route
   * considering the places on the URL params
   * @param {*} routeTo
   */
  setDirectionsModeBasedOnRoute (routeTo) {
    var placeNameParams = lodash.pickBy(routeTo.params, function (value, key) {
      return key.startsWith('placeName') && value !== undefined
    })
    const placeNameParamsAmount = Object.keys(placeNameParams).length
    const currentMode = placeNameParamsAmount === 1 ? constants.modes.roundTrip : constants.modes.directions
    store.commit('mode', currentMode)
  }
}

export default RouteUtils
