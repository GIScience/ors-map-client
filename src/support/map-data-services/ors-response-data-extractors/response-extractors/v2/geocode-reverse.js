import MapViewData from '@/models/map-view-data'
import Place from '@/models/place'

/**
 * GeocodeReverseBuilder Map data Builder class
 * @param {*} data {responseData: {}, translations: {}}
 */
class GeocodeReverseBuilder {
  constructor (data) {
    this.responseData = data.responseData
    this.markers = null
  }

  /**
   * Build the map data for geocode reverse response
   * @returns {Promise} that returns in the resolve mapData object
   */
  buildMapData = () => {
    const mapViewData = new MapViewData()
    const context = this
    return new Promise((resolve) => {
      mapViewData.places = context.buildPlaces()
      mapViewData.isRouteData = false
      mapViewData.timestamp = context.responseData.metadata.timestamp
      mapViewData.maxZoom = 20
      resolve(mapViewData)
    })
  }

  /**
   * Get the markers data based in the response data
   * @returns {Array} places
   */
  buildPlaces = () => {
    const places = []
    if (this.responseData.features) {
      this.responseData.features.forEach(feature => {
        const lngLat = feature.geometry.coordinates
        const place = new Place(lngLat[0], lngLat[0], feature.properties.label, { properties: feature })
        places.push(place)
      })
      const queryPoint = this.responseData.geocoding.query
      const queryPlace = new Place([queryPoint['point.lon'], queryPoint['point.lat']])
      places.push(queryPlace)
    }
    return places
  }
}

// export the directions json builder class
export default GeocodeReverseBuilder
