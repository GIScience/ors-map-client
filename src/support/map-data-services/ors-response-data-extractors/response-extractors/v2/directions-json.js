import lodash from 'lodash'
import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
import Place from '@/models/place'
import store from '@/store/store'
import Utils from '@/support/utils'

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
    const mapViewData = new MapViewData()
    const context = this
    return new Promise((resolve) => {
      mapViewData.places = context.buildPlaces()
      context.setRoutesSummaryData()
      mapViewData.rawData = Utils.clone(context.responseData)
      mapViewData.routes = context.buildRoutes()
      mapViewData.isRouteData = mapViewData.hasRoutes()
      mapViewData.timestamp = context.responseData.metadata.timestamp
      mapViewData.mode = mapViewData.places.length > 1 ? constants.modes.directions : constants.modes.roundTrip
      resolve(mapViewData)
    })
  }

  buildRoutes = () => {
    for (const key in this.responseData.features) {
      this.responseData.features[key].properties.opacity = 0.9
    }
    return this.responseData.features
  }

  /**
   * Get the places data based in the response data
   * @returns {Array} markersData
   */
  buildPlaces = () => {
    const places = []
    if (lodash.get(this, 'responseData.metadata.query.coordinates')) {
      for (const key in this.responseData.metadata.query.coordinates) {
        const lngLat = this.responseData.metadata.query.coordinates[key]
        const place = new Place(lngLat[0], lngLat[1])
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
      for (const key in this.responseData.features) {
        const summary = Object.assign({}, this.responseData.features[key].properties.summary)
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
