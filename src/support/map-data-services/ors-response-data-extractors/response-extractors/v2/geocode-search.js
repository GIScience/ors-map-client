import MapViewData from '@/models/map-view-data'
import Place from '@/models/place'

/**
 * GeocodeSearchBuilder Map data Builder class
 * @param {*} data {responseData: {}, translations: {}}
 */
class GeocodeSearchBuilder {
  constructor (data) {
    this.responseData = data.responseData
    this.markers = null
  }

  /**
   * Build the map data for geocode search response
   * @returns {Promise} that returns in the resolve mapData object
   */
  buildMapData = () => {
    let mapViewData = new MapViewData()
    let context = this
    return new Promise((resolve) => {
      mapViewData.places = context.buildPlaces()
      mapViewData.isRouteData = false
      mapViewData.timestamp = context.responseData.geocoding.timestamp
      resolve(mapViewData)
    })
  }

  /**
   * Get the places data based in the response data
   * @returns {Array} places
   */
  buildPlaces = () => {
    let places = []
    if (this.responseData.features) {
      this.responseData.features.forEach(feature => {
        let lnglat = feature.geometry.coordinates
        let place = new Place(lnglat[0], lnglat[1], feature.properties.label, {properties: feature.properties})
        places.push(place)
      })
    }
    return places
  }
}

// export the directions json builder class
export default GeocodeSearchBuilder
