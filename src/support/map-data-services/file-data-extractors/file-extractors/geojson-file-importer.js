import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
import store from '@/store/store'
/**
 * GeoJsonImporter Map data Builder class
 * @param {*} data {mapRawData: {}, translations: {}}
 */
class GeoJsonImporter {
  constructor (data) {
    this.fileRawContent = data.mapRawData
    this.options = data.options
  }

  /**
   * Build the map data for directions json response
   * @returns {Promise} that returns in the resolve mapData object
   */
  buildMapData = () => {
    const context = this
    return new Promise((resolve, reject) => {
      try {
        const mapViewData = context.buildMapViewData()

        if (mapViewData) {
          mapViewData.rawData = context.fileRawContent
          context.setRoutesSummaryData(mapViewData)
          mapViewData.isRouteData = true
          mapViewData.origin = constants.dataOrigins.fileImporter
          mapViewData.timestamp = context.options.timestamp
          if (mapViewData.polygons.length > 0) {
            mapViewData.mode = constants.modes.isochrones
          } else {
            mapViewData.mode = mapViewData.places.length === 1 ? constants.modes.roundTrip : constants.modes.directions
          }
        } else {
          reject(Error('invalid-file-content'))
        }
        resolve(mapViewData)
      } catch (error) {
        reject(Error('invalid-file-content'))
      }
    })
  }

  /**
   * Parse the file content to an object
   * @returns {Object}
   */
  buildMapViewData = () => {
    const geoJson = JSON.parse(this.fileRawContent)
    const mapViewData = MapViewData.buildFromGeoJson(geoJson)
    return mapViewData
  }

  /**
   * Adjust summary data
   */
  setRoutesSummaryData = (mapViewData) => {
    for (const key in mapViewData.routes) {
      const summary = Object.assign({}, mapViewData.routes[key].properties.summary)
      summary.descent = mapViewData.routes[key].properties.descent
      summary.ascent = mapViewData.routes[key].properties.ascent
      summary.unit = store.getters.mapSettings.unit
      summary.originalUnit = store.getters.mapSettings.unit
      if (isNaN(summary.distance)) {
        summary.distance = parseFloat(summary.distance)
      }
      mapViewData.routes[key].summary = summary
    }
  }
}
// export the directions json builder class
export default GeoJsonImporter
