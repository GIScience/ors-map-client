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
          const lngLat = feature.properties.center
          const place = new Place(lngLat[0], lngLat[1], locationCoordsStr, { properties: feature.properties })
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
    const polygons = []
    if (this.responseData.features) {
      // When you request multiple points in an isochrone request, ors returns them all as a single array
      // of polygon features
      const ranges = this.responseData.metadata.query.range
      const maxRange = Math.max(ranges)

      this.responseData.features.forEach((feature, index) => {
        const polygon = { geometry: feature.geometry, properties: feature.properties }
        polygon.properties.range_type = this.responseData.metadata.query.range_type
        PolygonUtils.preparePolygonForView(polygon, this.translations, index, maxRange)
        polygons.push(polygon)
      })
    }
    return polygons.reverse()
  }
}

// export the directions json builder class
export default IsochronesBuilder
