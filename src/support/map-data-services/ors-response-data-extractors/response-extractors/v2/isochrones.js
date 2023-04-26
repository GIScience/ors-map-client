import PolygonUtils from '@/support/polygon-utils'
import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
import Place from '@/models/place'
import lodash from 'lodash'
/**
 * IsochronesBuilder Map data Builder class
 * @param {*} data {responseData: {}, translations: {}}
 */
class IsochronesBuilder {
  constructor (data) {
    this.responseData = data.responseData
    this.translations = data.translations
    this.markers = null
  }

  /**
   * Build the map data for geocode search response
   * @returns {Promise} that returns in the resolve mapData object
   */
  buildMapData = () => {
    const mapViewData = new MapViewData()
    const context = this
    return new Promise((resolve) => {
      mapViewData.places = context.buildPlaces()
      mapViewData.polygons = context.getPolygons()
      mapViewData.timestamp = context.responseData.metadata.timestamp
      mapViewData.rawData = context.responseData
      mapViewData.isRouteData = false
      mapViewData.mode = constants.modes.isochrones

      resolve(mapViewData)
    })
  }

  /**
   * Get the places data based in the response data
   * @returns {Array} markers
   */
  buildPlaces = () => {
    const places = []
    if (lodash.get(this, 'responseData.metadata.query.locations')) {
      const polygonCenters = []
      this.responseData.features.forEach(feature => {
        const locationCoordsStr = `${feature.properties.center[0]}, ${feature.properties.center[1]}`
        if (!polygonCenters.includes(locationCoordsStr)) {
          const lnglat = feature.properties.center
          const place = new Place(lnglat[0], lnglat[1], locationCoordsStr, { properties: feature.properties })
          places.push(place)
          polygonCenters.push(locationCoordsStr)
        }
      })
    }
    return places
  }

  /**
   * Get the markers data based in the response data
   * @returns {Array} markers
   */
  getPolygons = () => {
    const isochrones = []
    if (this.responseData.features) {
      // When you request multiple points in an isochrone request, ors returns them all as a single array
      // of polygon features
      const ranges = this.responseData.metadata.query.range
      const maxRange = Math.max(ranges)

      const grouped_features = this.responseData.features.reduce((result, item) => {
        const groupIndex = item.properties.group_index
        if (!result[groupIndex]) {
          result[groupIndex] = []
        }
        result[groupIndex].push(item)
        return result
      }, {})
      const range_type = this.responseData.metadata.query.range_type
      const i18n = this.translations
      for (const [groupId, group] of Object.entries(grouped_features)) {
        isochrones[groupId] = {rings: [], visible: true, opacity: 0.5}
        group.forEach((polygon, index) => {
          const feature = { geometry: polygon.geometry, properties: polygon.properties }
          feature.properties.range_type = range_type

          PolygonUtils.preparePolygonForView(feature, i18n, index, maxRange)
          isochrones[groupId].rings.push(feature)
        })
        isochrones[groupId].rings = isochrones[groupId].rings.reverse()
      }
    }
    return isochrones
  }
}

// export the directions json builder class
export default IsochronesBuilder
