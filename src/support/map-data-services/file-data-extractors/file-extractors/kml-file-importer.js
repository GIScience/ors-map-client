import { parseString } from 'xml2js'
import MapViewData from '@/models/map-view-data'
import Place from '@/models/place'
import constants from '@/resources/constants'
import appConfig from '@/config/app-config'
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
          context.setPlaces(mapViewData, fileObject)
          mapViewData.isRouteData = true
          mapViewData.origin = constants.dataOrigins.fileImporter
          mapViewData.timestamp = context.options.timestamp
          mapViewData.mode = mapViewData.places.length === 1 ? constants.modes.roundTrip : constants.modes.directions
          resolve(mapViewData)
        }).catch(() => {
          reject(Error('invalid-file-content'))
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
    let places = this.getPlaces(fileObject)
    if (places.length > appConfig.maxPlaceInputs) {
      mapViewData.pois = places
    } else {
      mapViewData.places = places
    }
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
    const placeMarks = lodash.get(fileObject, 'kml.Document[0].Placemark') || lodash.get(fileObject, 'kml.Document[0].Folder[0].Placemark')

    if (placeMarks) {
      for (const key in placeMarks) {
        if (placeMarks[key].Point) {
          const coordinatesStr = placeMarks[key].Point[0].coordinates[0]
          const coordinatesaArr = coordinatesStr.split(',')
          const latlon = { lat: coordinatesaArr[0], lon: coordinatesaArr[1] }
          let name = placeMarks[key].name || lodash.get(placeMarks[key], 'ExtendedData[0].Data[0].value[0]')
          if (Array.isArray(name) && name.length > 0) {
            name = name[0]
          }
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
          const lng = latlng[0]
          const lat = latlng[1]
          const place = new Place(lng, lat)
          places.push(place)
        }
      } else { // if there are more then 15, only the first and the last
        const firstCoords = routes[0].geometry.coordinates[0]
        const lastCoords = (routes[0].geometry.coordinates[routes[0].geometry.coordinates.length - 1])

        const firstLng = firstCoords[0]
        const firstLat = firstCoords[1]
        const firstPlace = new Place(firstLng, firstLat, '', { resolve: true })
        places.push(firstPlace)

        const lastLng = lastCoords[0]
        const lastLat = lastCoords[1]
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
  getRoutes = (fileObject) => {
    const routes = []
    const placeMarks = lodash.get(fileObject, 'kml.Document[0].Folder[0].Placemark') || lodash.get(fileObject, 'kml.Document[0].Placemark')
    const description = lodash.get(fileObject, 'kml.Document[0].description[0]')

    if (placeMarks) {
      const coordinatesParsed = []
      for (const rKey in placeMarks) {
        const placeMark = placeMarks[rKey]
        if (placeMark.LineString) {
          for (let segmKey in placeMark.LineString) {
            let segment = placeMark.LineString[segmKey]
            for (const cKey in segment.coordinates) {
              const routeCoords = segment.coordinates[cKey].split(' ')
              for (const pkey in routeCoords) {
                const routePointStr = routeCoords[pkey]
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
          }
        }
      }
      routes.push({
        geometry: {
          coordinates: coordinatesParsed
        }
      })
    }
    return routes
  }
}
// export the directions json builder class
export default KmlImporter
