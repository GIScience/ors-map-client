import MapViewData from '@/models/map-view-data'
import Utils from '@/support/utils'
import GeoUtils from '@/support/geo-utils'

/**
 * DirectionsJSONBuilder Map data Builder class
 * @param {*} data {responseData: {}, translations: {}}
 */
class OptimizationBuilder {
  constructor (data) {
    this.responseData = data.responseData
  }


  /**
   * Build the map data for directions json response
   * @returns {Promise} that returns in the resolve mapData object
   */
  buildMapData = () => {
    const mapViewData = new MapViewData()
    const context = this
    return new Promise((resolve) => {
      mapViewData.rawData = Utils.clone(context.responseData)
      mapViewData.routes = context.buildRoutes()
      mapViewData.isRouteData = mapViewData.hasRoutes()
      resolve(mapViewData)
    })
  }

  buildRoutes = () => {
    for (const key in this.responseData.routes) {
      this.responseData.routes[key].properties = {
        id: key + 1
      }
      this.responseData.routes[key].geometry = {
        coordinates: GeoUtils.switchLatLonIndex(this.decodePolyline(this.responseData.routes[key].geometry, false)),
        type: 'Polyline'
      }
    }
    return this.responseData.routes
  }

  /**
   * Decode an x,y or x,y,z encoded polyline
   * @param {*} encodedPolyline
   * @param {Boolean} includeElevation - true for x,y,z polyline
   * @returns {Array} of coordinates
   */
  decodePolyline = (encodedPolyline, includeElevation) => {
    // array that holds the points
    let points = []
    let index = 0
    const len = encodedPolyline.length
    let lat = 0
    let lng = 0
    let ele = 0
    while (index < len) {
      let result = 0
      let decodedLine = this.decodeLine(encodedPolyline, index)
      result = decodedLine.result
      index = decodedLine.index

      lat += ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1))
      decodedLine = this.decodeLine(encodedPolyline, index)
      result = decodedLine.result
      index = decodedLine.index
      lng += ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1))

      if (includeElevation) {
        decodedLine = this.decodeLine(encodedPolyline, index)
        result = decodedLine.result
        index = decodedLine.index
        ele += ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1))
      }
      try {
        let location = [(lat / 1E5), (lng / 1E5)]
        if (includeElevation) location.push((ele / 100))
        points.push(location)
      } catch (e) {
        console.log(e)
      }
    }
    return points
  }

  decodeLine(encodedPolyline, index){
    let b
    let shift = 0
    let result = 0
    do {
      b = encodedPolyline.charAt(index++).charCodeAt(0) - 63 // finds ascii
      // and subtract it by 63
      result |= (b & 0x1f) << shift
      shift += 5
    } while (b >= 0x20)
    return {result, index}
  }
}
export default OptimizationBuilder
