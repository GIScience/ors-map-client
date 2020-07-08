import VueInstance from '@/main'
import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
import Place from '@/models/place'
import store from '@/store/store'
/**
 * JsonImported Map data Builder class
 * @param {*} data {mapRawData: {}, translations: {}}
 */
class JsonImported {
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
      let mapViewData = new MapViewData()
      let parsingResult = this.parseFileContentToMapViewData()
      if (parsingResult) {
        mapViewData = parsingResult

        if (!mapViewData.mode) {
          mapViewData = constants.modes.directions
        }

        // Make sure that the mode defined
        // in the imported file/object is valid
        if (!constants.importableModes[mapViewData.mode]) {
          reject(Error('invalid-file-content'))
        }
        mapViewData.origin = constants.dataOrigins.fileImporter
        mapViewData.timestamp = context.options.timestamp
      } else { // try to extract usable data from an old format exported file
        let content = JSON.parse(context.fileRawContent)
        if (!content) {
          reject(Error('invalid-file-content'))
        }
        if (!context.coordinates) {
          reject(Error('invalid-file-content'))
        }

        // If the polyline data are found
        context.mapRawData = content
        this.setRoutesSummaryData()
        mapViewData.places = context.buildPlaces()
        mapViewData.routes = context.mapRawData.routes || []
        mapViewData.isRouteData = true
        mapViewData.rawData = context.mapRawData
        mapViewData.origin = constants.dataOrigins.fileImporter
        mapViewData.timestamp = context.options.timestamp
      }
      resolve(mapViewData)
    })
  }

  /**
   * Parse the file content to an object
   * @returns {Object}
   */
  parseFileContentToMapViewData = () => {
    let content = JSON.parse(this.fileRawContent)

    let mapViewData = new MapViewData()

    for (let key in mapViewData) {
      // skip loop if the property is from prototype
      if (!mapViewData.hasOwnProperty(key)) continue

      // If an expected property
      // does not exist in the parsed content
      // the parsed object is invalid
      if (content[key] === undefined) {
        return false
      } else {
        if (key === 'places') {
          mapViewData.places = this.parsePlaces(content)
        } else {
          mapViewData[key] = content[key]
        }
      }
    }
    return mapViewData
  }

  /**
   * Parse places from content
   * @return [Places]
   */
  parsePlaces = (content) => {
    let places = []
    for (let placeKey in content.places) {
      let place = new Place()
      for (let prop in content.places[placeKey]) {
        place[prop] = content.places[placeKey][prop]
      }
      place.unresolved = true // make sure the place will be resolved
      places.push(place)
    }
    return places
  }

  /**
   * Adjust summary data
   */
  setRoutesSummaryData = () => {
    if (VueInstance.lodash.get(this, 'mapRawData.features[0].properties.summary')) {
      for (let key in this.mapRawData.features) {
        let summary = Object.assign({}, this.mapRawData.features[key].properties.summary)
        summary.descent = this.mapRawData.features[key].properties.descent
        summary.ascent = this.mapRawData.features[key].properties.ascent
        summary.unit = this.mapRawData.metadata.query.units || store.getters.mapSettings.unit
        summary.originalUnit = this.mapRawData.metadata.query.units || store.getters.mapSettings.unit
        if (isNaN(summary.distance)) {
          summary.distance = parseFloat(summary.distance)
        }
        this.mapRawData.features[key].summary = summary
      }
    }
  }

  /**
   * Get the places data based in the response data
   * @returns {Array} places
   */
  buildPlaces = () => {
    let places = []
    // If there are less then 15, so we get all
    if (this.coordinates.length < 16) {
      for (let key in this.coordinates) {
        let latlng = this.coordinates[key]
        let lng = latlng[1]
        let lat = latlng[0]
        let place = new Place(lng, lat)
        places.push(place)
      }
    } else { // if there are more then 15, only the first and the last
      let firstCoords = (this.coordinates[0])
      let lastCoords = (this.coordinates[this.coordinates.length - 1])

      let firstLng = firstCoords[1]
      let firstLat = firstCoords[0]
      let firstPlace = new Place(firstLng, firstLat, '', {resolve: true})
      places.push(firstPlace)

      let lastLng = lastCoords[1]
      let lastLat = lastCoords[0]
      let lastPlace = new Place(lastLng, lastLat, '', {resolve: true})
      places.push(lastPlace)
    }
    return places
  }
}
// export the directions json builder class
export default JsonImported
