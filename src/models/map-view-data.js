import constants from '@/resources/constants'
import utils from '@/support/utils'

/**
 * MapViewData class
 */
class MapViewData {
  /**
   * MapViewData constructor
   */
  constructor () {
    this.polygons = null
    this.options = {} // {origin: String, apiVersion: String, contentType: String, timestamp: timestamp, options: {avoid_polygons: Object, avoid_features: Array}},
    this.places = [] // array of Place objects @see /src/models/place
    this.routes = [] // array of route objects containing route data and summary
    this.origin = 'response' // where the data comes from
    this.mode = constants.modes.directions // default mode is directions
    this.isRouteData = false // if the places collection represent a route
    this.rawData = null // the original raw data
    this.timestamp = null // the timestamp that defines when the data was acquired/uploaded
  }

  /**
   * Build a place using only lng an lat
   * @param {*} lng
   * @param {*} lat
   */
  static build (geoJson) {
    return new MapViewData(geoJson)
  }
  /**
   * Check if the object has places
   * @param {*} lng
   * @param {*} lat
   */
  hasPlaces () {
    return this.places.length > 0
  }
  /**
   * Check if the object has routes
   * @param {*} lng
   * @param {*} lat
   */
  hasRoutes () {
    return this.routes.length > 0
  }
  /**
   * Create a clone object
   * @returns  {MapViewData}
   */
  clone () {
    let clone = new MapViewData()
    let propertiesToClone = ['origin', 'isRouteData', 'timestamp', 'mode']

    for (let key in propertiesToClone) {
      let prop = propertiesToClone[key]
      clone[prop] = this[prop]
    }

    clone.rawData = utils.clone(this.rawData)
    clone.routes = utils.clone(this.routes)
    clone.polygons = utils.clone(this.polygons)
    clone.options = utils.clone(this.options)

    for (let key in this.places) {
      let place = this.places[key]
      clone.places.push(place.clone())
    }
    return clone
  }
}
// export the directions json builder class
export default MapViewData
