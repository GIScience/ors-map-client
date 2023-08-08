import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
import Place from '@/models/place'
import store from '@/store/store'
import lodash from 'lodash'
/**
 * JsonImporter
 * @param {*} data {mapRawData: {}, translations: {}}
 */
class JsonImporter {
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
      let mapViewData = new MapViewData()
      const parsingResult = context.parseFileContentToMapViewData()
      if (parsingResult) {
        mapViewData = parsingResult

        if (!mapViewData.mode) {
          mapViewData.mode = mapViewData.places.length === 1 ? constants.modes.roundTrip : constants.modes.directions
        }

        // Make sure that the mode defined
        // in the imported file/object is valid
        if (!constants.importableModes[mapViewData.mode]) {
          reject(Error('invalid-file-content'))
        }
        mapViewData.origin = constants.dataOrigins.fileImporter
        mapViewData.timestamp = context.options.timestamp
      } else { // try to extract usable data from an old format exported file
        const content = JSON.parse(context.fileRawContent)
        if (!content) {
          reject(Error('invalid-file-content'))
        }
        if (!context.coordinates) {
          reject(Error('invalid-file-content'))
        }

        // If the polyline data are found
        context.mapRawData = content
        context.setRoutesSummaryData()
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
    const content = JSON.parse(this.fileRawContent)

    const mapViewData = new MapViewData()

    for (const key in mapViewData) {
      // skip loop if the property is from prototype
      if (!Object.prototype.hasOwnProperty.call(mapViewData, key)) continue

      // If an expected property
      // does not exist in the parsed content
      // the parsed object is invalid (POIs is not mandatory)
      if (content[key] === undefined && key !== 'pois') {
        return false
      } else {
        if (key === 'places') {
          mapViewData.places = this.parsePlaces(content)
        } else if (content[key]) {
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
    const places = []
    for (const placeKey in content.places) {
      const place = new Place()
      for (const prop in content.places[placeKey]) {
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
    if (lodash.get(this, 'mapRawData.features[0].properties.summary')) {
      for (const key in this.mapRawData.features) {
        const summary = Object.assign({}, this.mapRawData.features[key].properties.summary)
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
    const places = []
    // If there are less than 15, so we get all
    if (this.coordinates.length < 16) {
      for (const latLng of this.coordinates) {
        const lng = latLng[1]
        const lat = latLng[0]
        const place = new Place(lng, lat)
        places.push(place)
      }
    } else { // if there are more than 15, only the first and the last
      const firstCoords = (this.coordinates[0])
      const lastCoords = (this.coordinates.at(-1))

      const firstLng = firstCoords[1]
      const firstLat = firstCoords[0]
      const firstPlace = new Place(firstLng, firstLat, '', { resolve: true })
      places.push(firstPlace)

      const lastLng = lastCoords[1]
      const lastLat = lastCoords[0]
      const lastPlace = new Place(lastLng, lastLat, '', { resolve: true })
      places.push(lastPlace)
    }
    return places
  }
}
// export the directions json builder class
export default JsonImporter
