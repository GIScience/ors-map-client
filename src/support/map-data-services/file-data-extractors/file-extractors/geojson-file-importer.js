import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
import Place from '@/models/place'
import store from '@/store/store'
/**
 * GeojsonImporter Map data Builder class
 * @param {*} data {mapRawData: {}, translations: {}}
 */
class GeojsonImporter {
  constructor (data) {
    this.fileRawContent = data.mapRawData
    this.options = data.options
  }

  /**
   * Build the map data for directions json response
   * @returns {Promise} that returns in the resolve mapData object
   */
  buildMapData = () => {
    let context = this
    return new Promise((resolve, reject) => {
      try {
        let mapViewData = this.buildMapViewData()

        if (mapViewData) {
          context.mapRawData = this.fileRawContent
          mapViewData.rawData = context.mapRawData
          this.setRoutesSummaryData(mapViewData)
          mapViewData.isRouteData = true
          mapViewData.origin = constants.dataOrigins.fileImporter
          mapViewData.timestamp = context.options.timestamp
          mapViewData.mode = mapViewData.places.length === 1 ? constants.modes.roundTrip : constants.modes.directions
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
    let content = JSON.parse(this.fileRawContent)

    let mapViewData = new MapViewData()

    for (let key in content.features) {
      let feature = content.features[key]

      if (feature.geometry.type === 'Point') {
        let place = new Place(feature.geometry.coordinates[0], feature.geometry.coordinates[1], feature.properties.label, {properties: feature.properties})
        mapViewData.places.push(place)
      }

      if (feature.geometry.type === 'LineString') {
        mapViewData.routes.push(feature)
      }
    }
    return mapViewData
  }

  /**
   * Adjust summary data
   */
  setRoutesSummaryData = (mapViewData) => {
    for (let key in mapViewData.routes) {
      let summary = Object.assign({}, mapViewData.routes[key].properties.summary)
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
export default GeojsonImporter
