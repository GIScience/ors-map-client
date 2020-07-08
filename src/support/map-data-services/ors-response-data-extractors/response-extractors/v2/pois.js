import MapViewData from '@/models/map-view-data'
import Place from '@/models/place'
/**
 * PoisBuilder Map data Builder class
 * @param {*} data {responseData: {}, translations: {}}
 */
class PoisBuilder {
  constructor (data) {
    this.responseData = data.responseData
    this.markers = null
  }

  /**
   * Build the map data for poi response
   * @returns {Promise} that returns in the resolve mapViewData object
   */
  buildMapData = () => {
    let mapViewData = new MapViewData()
    let context = this
    return new Promise((resolve) => {
      mapViewData.places = context.buildPlaces()
      resolve(mapViewData)
    })
  }

  /**
   * Get the places data based in the response data
   * @returns {Array} markers
   */
  buildPlaces = () => {
    let places = []
    if (this.responseData.features) {
      this.responseData.features.forEach(feature => {
        let lnglat = feature.geometry.coordinates
        let place = new Place(lnglat[0], lnglat[1], feature.properties.label, {properties: feature})
        places.push(place)
      })
    }
    return places
  }
}

// export the directions json builder class
export default PoisBuilder
