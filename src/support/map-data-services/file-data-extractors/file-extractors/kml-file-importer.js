import {parseString} from 'xml2js'
import MapViewData from '@/models/map-view-data'
import Place from '@/models/place'
import constants from '@/resources/constants'
import lodash from 'lodash'

/**
 * XmlImported Map data Builder class
 * @param {*} data {mapRawData: {}, translations: {}}
 */
class KmlImported {
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
  getRoutes = (fileObject) => {
    let routes = []
    let kmlRoutes = lodash.get(fileObject, 'kml.Document[0].Placemark')
    if (kmlRoutes) {
      for (let rKey in kmlRoutes) {
        let route = kmlRoutes[rKey]
        let coordinatesParsed = []
        for (let cKey in route.LineString[0].coordinates) {
          let routeCoords = route.LineString[0].coordinates[cKey].split(' ')
          for (let pkey in routeCoords) {
            let routePointStr = routeCoords[pkey]
            let point = routePointStr.split(',')
            coordinatesParsed.push(point)
          }
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
export default KmlImported
