import lodash from 'lodash'
import { parseString } from 'xml2js'
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
    const places = []

    if (routes.length > 0) {
      // If there are less than 15, so we get all
      if (routes[0].length < 16) {
        for (const key in routes[0]) {
          const lngLat = routes[0][key].geometry.coordinates
          const lng = lngLat[0]
          const lat = lngLat[1]
          const place = new Place(lng, lat)
          places.push(place)
        }
      } else { // if there are more than 15, only the first and the last
        const firstCoords = routes[0].geometry.coordinates[0]
        const lastCoords = (routes[0].geometry.coordinates.at(-1))

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
   * Get the places from the fileObject
   * @param {*} fileObject
   * @returns {Array} of places
   */
  getPlaces = (fileObject) => {
    const places = []
    const pts = lodash.get(fileObject, 'gpx.wpt')

    if (pts) {
      for (const key in pts) {
        const latLon = pts[key].$
        let name = Array.isArray(pts[key].name) ? pts[key].name[0] : pts[key].name
        if (name.length === 0) {
          name = Array.isArray(pts[key].desc) ? pts[key].desc[0] : pts[key].desc
        }
        if (name.indexOf('=') > 0) {
          name = name.split('=')[1]
        }
        const place = new Place(latLon.lon, latLon.lat, name)
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
    const routes = []
    const tracks = lodash.get(fileObject, 'gpx.trk') || lodash.get(fileObject, 'gpx.rte')
    const creator = lodash.get(fileObject, 'gpx.$.creator')
    if (tracks) {
      const coordinatesParsed = []
      for (const key in tracks) {
        const track = tracks[key]
        let segments = track.trkseg || [track.rtept]
        for (let key in segments) {
          let points = segments[key].trkpt || segments[key]

          if (points) {

            for (const ptKey in points) {
              const latLon = points[ptKey].$
              const point = creator === 'openrouteservice' ? [latLon.lat, latLon.lon] : [latLon.lon, latLon.lat]
              const elev = points[ptKey].ele
              if (elev && elev.length > 0) {
                point.push(elev[0])
              }
              coordinatesParsed.push(point)
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
    return routes
  }
}
// export the directions json builder class
export default GpxImporter
