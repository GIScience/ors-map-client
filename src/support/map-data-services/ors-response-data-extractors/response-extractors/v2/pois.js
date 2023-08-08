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
    const mapViewData = new MapViewData()
    const context = this
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
    const places = []
    if (this.responseData.features) {
      this.responseData.features.forEach(feature => {
        const lngLat = feature.geometry.coordinates
        const place = new Place(lngLat[0], lngLat[1], feature.properties.label, { properties: feature })
        places.push(place)
      })
    }
    return places
  }
}

// export the directions json builder class
export default PoisBuilder
