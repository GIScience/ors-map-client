// import OrsResponseUtil from '@/support/map-data-services/ors-response-util'
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
    let mapViewData = new MapViewData()
    let context = this
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
    let places = []
    if (lodash.get(this, 'responseData.metadata.query.locations')) {
      let polygonCenters = []
      this.responseData.features.forEach(feature => {
        let locationCoordsStr = `${feature.properties.center[0]}, ${feature.properties.center[1]}`
        if (!polygonCenters.includes(locationCoordsStr)) {
          let lnglat = feature.properties.center
          let place = new Place(lnglat[0], lnglat[1], locationCoordsStr, {properties: feature.properties})
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
    let polygons = []
    if (this.responseData.features) {
      this.responseData.features.forEach((feature, index) => {
        let polygon = { geometry: feature.geometry, properties: feature.properties }
        polygon.properties.range_type = this.responseData.metadata.query.range_type
        polygons.push(polygon)
      })
    }
    return polygons.reverse()
  }
}

// export the directions json builder class
export default IsochronesBuilder
