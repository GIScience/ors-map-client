import {parseString} from 'xml2js'
import MapViewData from '@/models/map-view-data'
import Place from '@/models/place'
import constants from '@/resources/constants'
import lodash from 'lodash'

/**
 * KmlImporter
 * @param {*} data {mapRawData: {}, translations: {}}
 */
class KmlImporter {
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
    return new Promise((resolve, reject) => {
      try {
        context.parseFileContent().then((fileObject) => {
          context.mapRawData = fileObject
          mapViewData.routes = context.getRoutes(fileObject)
          context.setPlaces(mapViewData, fileObject)
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
    let places = []
    let placeMarks = lodash.get(fileObject, 'kml.Document[0].Folder[0].Placemark') || lodash.get(fileObject, 'kml.Document[0].Placemark')

    if (placeMarks) {
      for (let key in placeMarks) {
        if (placeMarks[key].Point) {
          let coordinatesStr = placeMarks[key].Point[0].coordinates[0]
          let coordinatesaArr = coordinatesStr.split(',')
          let latlon = {lat: coordinatesaArr[0], lon: coordinatesaArr[1]}
          let name = lodash.get(placeMarks[key], 'ExtendedData[0].Data[0].value[0]')
          let place = new Place(latlon.lat, latlon.lon, name)
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
    let placeMarks = lodash.get(fileObject, 'kml.Document[0].Folder[0].Placemark') || lodash.get(fileObject, 'kml.Document[0].Placemark')
    let description = lodash.get(fileObject, 'kml.Document[0].description[0]')

    if (placeMarks) {
      for (let rKey in placeMarks) {
        let placeMark = placeMarks[rKey]
        if (placeMark.LineString) {
          let coordinatesParsed = []
          for (let cKey in placeMark.LineString[0].coordinates) {
            let routeCoords = placeMark.LineString[0].coordinates[cKey].split(' ')
            for (let pkey in routeCoords) {
              let routePointStr = routeCoords[pkey]
              if (routePointStr.length > 2) {
                let point = routePointStr.split(',')
                // It is a ORS generated KML
                if (description === constants.orsKmlDocumentDescription) {
                  coordinatesParsed.push(point)
                } else { // It a KML generated by other tool
                  point = point.slice(0, 2)
                  point.reverse()
                  coordinatesParsed.push(point)
                }
              }
            }
          }
          routes.push({
            geometry: {
              coordinates: coordinatesParsed
            }
          })
        }
      }
    }
    return routes
  }
}
// export the directions json builder class
export default KmlImporter
