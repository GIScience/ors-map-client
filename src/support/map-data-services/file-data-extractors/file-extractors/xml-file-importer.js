import { parseString } from 'xml2js'
import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
import Place from '@/models/place'
import lodash from 'lodash'

/**
 * XmlImporter Map data Builder class
 * @param {*} data {mapRawData: {}, translations: {}}
 */
class XmlImporter {
  constructor (data) {
    this.fileRawContent = data.mapRawData
    this.options = data.options
  }

  /**
   * Parse the file content to an object
   * @returns {Promise}
   */
  parseFileContent = () => {
    return new Promise((resolve, reject) => {
      parseString(this.fileRawContent, { trim: true }, function (err, parsedXml) {
        if (err) {
          reject(err)
        } else {
          resolve(parsedXml)
        }
      })
    })
  }

  /**
   * Build the map data for directions json response
   * @returns {Promise} that returns in the resolve mapData object
   */
  buildMapData = () => {
    const mapViewData = new MapViewData()
    const context = this
    return new Promise((resolve, reject) => {
      try {
        context.parseFileContent().then((fileObject) => {
          context.mapRawData = fileObject
          mapViewData.routes = context.getRoutes(fileObject)
          mapViewData.places = context.setPlaces(mapViewData, fileObject)
          mapViewData.isRouteData = true
          mapViewData.origin = constants.dataOrigins.fileImporter
          mapViewData.timestamp = context.options.timestamp
          mapViewData.mode = mapViewData.places.length === 1 ? constants.modes.roundTrip : constants.modes.directions
          resolve(mapViewData)
        })
      } catch (error) {
        reject(Error('invalid-file-content'))
      }
    })
  }

  /**
   * Set the mapViewData places
   * @param {*} mapViewData
   * @param {*} fileObject
   */
  setPlaces = (mapViewData, fileObject) => {
    mapViewData.places = this.getPlaces(fileObject)
    if (mapViewData.places.length === 0) {
      mapViewData.places = this.buildPlaces(mapViewData.routes)
    }
  }

  /**
   * Get the places from the fileObject
   * @param {*} fileObject
   * @returns {Array} of places
   */
  getPlaces = (fileObject) => {
    const places = []
    const placeMarks = lodash.get(fileObject, 'kml.Document[0].Placemark')

    if (placeMarks) {
      for (const key in placeMarks) {
        if (placeMarks[key].Point) {
          const coordinatesStr = placeMarks[key].Point[0].coordinates[0]
          const coordinatesaArr = coordinatesStr.split(',')
          const latlon = { lat: coordinatesaArr[0], lon: coordinatesaArr[1] }
          const name = lodash.get(placeMarks[key], 'ExtendedData[0].Data[0].value[0]')
          const place = new Place(latlon.lat, latlon.lon, name)
          places.push(place)
        }
      }
    }
    return places
  }

  /**
   * Get the places data based in the response data
   * @returns {Array} places
   */
  buildPlaces = (routes) => {
    const places = []

    if (routes.length > 0) {
      // If there are less then 15, so we get all
      if (routes[0].length < 16) {
        for (const key in routes[0]) {
          const latlng = routes[0][key].geometry.coordinates
          const lng = latlng[1]
          const lat = latlng[0]
          const place = new Place(lng, lat)
          places.push(place)
        }
      } else { // if there are more then 15, only the first and the last
        const firstCoords = routes[0].geometry.coordinates[0]
        const lastCoords = (routes[0].geometry.coordinates[routes[0].geometry.coordinates.length - 1])

        const firstLng = firstCoords[1]
        const firstLat = firstCoords[0]
        const firstPlace = new Place(firstLng, firstLat, '', { resolve: true })
        places.push(firstPlace)

        const lastLng = lastCoords[1]
        const lastLat = lastCoords[0]
        const lastPlace = new Place(lastLng, lastLat, '', { resolve: true })
        places.push(lastPlace)
      }
    }
    return places
  }

  /**
   * Get the routes if the fileObject contains routes
   * @returns {Array} routes
   */
  getRoutes (fileObject) {
    const routes = []
    const rtes = lodash.get(fileObject, 'gpx.rte')
    if (rtes) {
      for (const key in rtes) {
        const rte = rtes[key]
        const coordinatesParsed = []
        for (const ptKey in rte.rtept) {
          const latlon = rte.rtept[ptKey].$
          const point = [latlon.lon, latlon.lat]
          const elev = rte.rtept[ptKey].ele
          if (elev && elev.length > 0) {
            point.push(elev[0])
          }
          coordinatesParsed.push(point)
        }
        routes.push({
          geometry: {
            coordinates: coordinatesParsed
          }
        })
      }
    }
    return routes
  }
}
// export the directions json builder class
export default XmlImporter
