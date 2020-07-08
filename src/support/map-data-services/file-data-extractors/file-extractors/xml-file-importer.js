import {parseString} from 'xml2js'
import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
import Place from '@/models/place'
import lodash from 'lodash'

/**
 * XmlImported Map data Builder class
 * @param {*} data {mapRawData: {}, translations: {}}
 */
class XmlImported {
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
      parseString(this.fileRawContent, {trim: true}, function (err, parsedXml) {
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
    let mapViewData = new MapViewData()
    let context = this
    return new Promise((resolve) => {
      this.parseFileContent().then((fileObject) => {
        context.mapRawData = fileObject
        mapViewData.routes = context.getRoutes(fileObject)
        mapViewData.places = context.buildPlaces(mapViewData.routes)
        mapViewData.isRouteData = true
        mapViewData.origin = constants.dataOrigins.fileImporter
        mapViewData.timestamp = context.options.timestamp
        resolve(mapViewData)
      })
    })
  }

  /**
   * Get the places data based in the response data
   * @returns {Array} places
   */
  buildPlaces = (routes) => {
    let places = []

    if (routes.length > 0) {
      // If there are less then 15, so we get all
      if (routes[0].length < 16) {
        for (let key in routes[0]) {
          let latlng = routes[0][key].geometry.coordinates
          let lng = latlng[1]
          let lat = latlng[0]
          let place = new Place(lng, lat)
          places.push(place)
        }
      } else { // if there are more then 15, only the first and the last
        let firstCoords = routes[0].geometry.coordinates[0]
        let lastCoords = (routes[0].geometry.coordinates[routes[0].geometry.coordinates.length - 1])

        let firstLng = firstCoords[1]
        let firstLat = firstCoords[0]
        let firstPlace = new Place(firstLng, firstLat, '', {resolve: true})
        places.push(firstPlace)

        let lastLng = lastCoords[1]
        let lastLat = lastCoords[0]
        let lastPlace = new Place(lastLng, lastLat, '', {resolve: true})
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
    let routes = []
    let rtes = lodash.get(fileObject, 'gpx.rte')
    if (rtes) {
      for (let key in rtes) {
        let rte = rtes[key]
        let coordinatesParsed = []
        for (let ptKey in rte.rtept) {
          let latlon = rte.rtept[ptKey].$
          let point = [latlon.lon, latlon.lat]
          let elev = rte.rtept[ptKey].ele
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
export default XmlImported
