import lodash from 'lodash'
import OrsResponseUtil from '@/support/map-data-services/ors-response-util'
import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
import Place from '@/models/place'
import store from '@/store/store'

/**
 * DirectionsJSONBuilder Map data Builder class
 * @param {*} data {responseData: {}, translations: {}}
 */
class DirectionsJSONBuilder {
  constructor (data) {
    this.responseData = data.responseData
  }

  /**
   * Build the map data for directions json response
   * @returns {Promise} that returns in the resolve mapData object
   */
  buildMapData = () => {
    let mapViewData = new MapViewData()
    let context = this
    return new Promise((resolve) => {
      OrsResponseUtil.adjustResponseCoordinates(context.responseData)
      mapViewData.places = context.buildPlaces()
      context.setRoutesSummaryData()
      mapViewData.routes = context.responseData.features
      mapViewData.isRouteData = mapViewData.hasRoutes()
      mapViewData.rawData = context.responseData
      mapViewData.timestamp = context.responseData.metadata.timestamp
      mapViewData.mode = mapViewData.places.length > 1 ? constants.modes.directions : constants.modes.roundTrip
      resolve(mapViewData)
    })
  }

  /**
   * Get the places data based in the response data
   * @returns {Array} markersData
   */
  buildPlaces = () => {
    let places = []
    if (lodash.get(this, 'responseData.metadata.query.coordinates')) {
      for (let key in this.responseData.metadata.query.coordinates) {
        let lnglat = this.responseData.metadata.query.coordinates[key]
        let place = new Place(lnglat[0], lnglat[1])
        places.push(place)
      }
      return places
    }
    return []
  }

  /**
   * Adjust summary data
   */
  setRoutesSummaryData = () => {
    if (lodash.get(this, 'responseData.features[0].properties.summary')) {
      for (let key in this.responseData.features) {
        let summary = Object.assign({}, this.responseData.features[key].properties.summary)
        summary.descent = this.responseData.features[key].properties.descent
        summary.ascent = this.responseData.features[key].properties.ascent
        summary.unit = this.responseData.metadata.query.units || store.getters.mapSettings.unit
        summary.originalUnit = this.responseData.metadata.query.units || store.getters.mapSettings.unit
        if (isNaN(summary.distance)) {
          summary.distance = parseFloat(summary.distance)
        }
        this.responseData.features[key].summary = summary
      }
    }
  }
}
// export the directions json builder class
export default DirectionsJSONBuilder
