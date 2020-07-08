// import OrsResponseUtil from '@/support/map-data-services/ors-response-util'
import GeoUtils from '@/support/geo-utils'
import htmlColors from 'html-colors'
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
      // OrsResponseUtil.adjustResponseCoordinates(context.responseData)
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
      let names = htmlColors.names() // Get an array containing all colors names
      let translations = this.translations
      this.responseData.features.forEach((feature, index) => {
        // The Vue2-Leaflet expect the coordinates in the inverse order (lat,long), so we reorder then here
        // The polygon component expects an array containing, at the position 0 an array of coordinates
        // so we just provide it as expected
        let switchedCords = [GeoUtils.switchLatLonIndex(feature.geometry.coordinates[0])]
        let unit = this.responseData.metadata.query.range_type === 'time' ? translations.seconds : translations.meters
        let featureLabel = `${feature.properties.value} ${unit} ${feature.geometry.type}`
        let polygon = {
          latlngs: switchedCords,
          color: htmlColors.hex(names[index + 6]), // We get a color from the color collection but we skip the first 5 colors because they are not nice
          geometry: feature.geometry,
          label: featureLabel,
          properties: feature.properties
        }
        polygons.push(polygon)
      })
    }
    return polygons.reverse()
  }
}

// export the directions json builder class
export default IsochronesBuilder
