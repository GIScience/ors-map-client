import lodash from 'lodash'
import {parseString} from 'xml2js'
import MapViewData from '@/models/map-view-data'
import Place from '@/models/place'
import constants from '@/resources/constants'

/**
 * GpxImporter
 * @param {*} data {mapRawData: {}, translations: {}}
 */
class GpxImporter {
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
        this.parseFileContent().then((fileObject) => {
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
   * Get the places data based in the response data
   * @param {Array} routes
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
   * Get the places from the fileObject
   * @param {*} fileObject
   * @returns {Array} of places
   */
  getPlaces = (fileObject) => {
    let places = []
    let wpts = lodash.get(fileObject, 'gpx.wpt')

    if (wpts) {
      for (let key in wpts) {
        let latlon = wpts[key].$
        let name = Array.isArray(wpts[key].name) ? wpts[key].name[0] : wpts[key].name
        if (name.length === 0) {
          name = Array.isArray(wpts[key].desc) ? wpts[key].desc[0] : wpts[key].desc
        }
        if (name.indexOf('=') > 0) {
          name = name.split('=')[1]
        }
        let place = new Place(latlon.lat, latlon.lon, name)
        places.push(place)
      }
    }
    return places
  }

  /**
   * Get the polyline data if the response contains polyline data
   * @returns {Array} coordinates
   */
  getRoutes = (fileObject) => {
    let routes = []
    let tracks = lodash.get(fileObject, 'gpx.trk') || lodash.get(fileObject, 'gpx.rte')
    let creator = lodash.get(fileObject, 'gpx.$.creator')
    if (tracks) {
      for (let key in tracks) {
        let track = tracks[key]
        let points = lodash.get(track, 'trkseg[0].trkpt') || track.rtept
        let coordinatesParsed = []
        for (let ptKey in points) {
          let latlon = points[ptKey].$
          let point = creator === 'openrouteservice' ? [latlon.lat, latlon.lon] : [latlon.lon, latlon.lat]
          let elev = points[ptKey].ele
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
export default GpxImporter
