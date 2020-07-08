import HttpOrsApi from '@/shared-services/http-ors-api'
import lodash from 'lodash'
import GeoUtils from '@/support/geo-utils'
import MapViewData from '@/models/map-view-data'
import Place from '@/models/place'

/**
 * DirectionsGPXBuilder Map data Builder class
 * @param {*} data {responseData: {}, requestData: {}, translations: {}}
 */
class DirectionsGPXBuilder {
  constructor (data) {
    this.responseData = data.responseData
    this.requestData = data.requestData
    this.translations = data.translations
    this.gpxSecondRequest = null
  }

  /**
   * Build the map data for directions gpx response
   * @returns {Promise} that returns in the resolve mapData object
   */
  buildMapData = () => {
    let mapViewData = new MapViewData()
    let context = this
    return new Promise((resolve) => {
      this.redoRequestToGetResponseAsGeoJson().then((response) => {
        context.gpxSecondRequest = response.data
        mapViewData.polyLineData = context.getPolyLineData()
        mapViewData.routeSummaryData = context.getRouteSummaryData()
        mapViewData.places = context.buildPlaces()
        mapViewData.isRouteData = true
        mapViewData.bbox = response.data.bbox
        mapViewData.info = context.translations.viewBasedOnEquivalentGeoJsonResponse
        resolve(mapViewData)
      })
    })
  }

  /**
   * Get the plaes data based in the response data
   * @returns {Array} places
   */
  buildPlaces = () => {
    let places = []
    if (lodash.get(this, 'gpxSecondRequest.metadata.query.coordinates')) {
      for (let key in this.gpxSecondRequest.metadata.query.coordinates) {
        let lnglat = this.gpxSecondRequest.metadata.query.coordinates[key]
        let place = new Place(lnglat[0], lnglat[1])
        places.push(place)
      }
    }
    return places
  }

  /**
   * Get the polyline tool tip data
   * @returns {Array} coordinates
   */
  getRouteSummaryData = () => {
    let summary = {}
    if (lodash.get(this, 'gpxSecondRequest.routeSummary')) {
      summary = Object.assign(summary, this.gpxSecondRequest.routeSummary.summary)
      summary.unit = 'm'
    } else if (lodash.get(this, 'gpxSecondRequest.features[0].properties.summary')) {
      summary = Object.assign(summary, this.gpxSecondRequest.features[0].properties.summary)
      summary.unit = 'm'
    } else if (lodash.get(this, 'gpxSecondRequest.routes[0].summary')) {
      summary = Object.assign(summary, this.gpxSecondRequest.routes[0].summary)
      summary.unit = this.gpxSecondRequest.metadata.query.units || this.$store.getters.mapSettings.unit
    }

    if (isNaN(summary.distance)) {
      summary.distance = parseFloat(summary.distance)
    }
    return summary
  }

  /**
   * Get the polyline data if the response contains polyline data
   * @returns {Array} coordinates
   */
  getPolyLineData = () => {
    let coordinates = []
    if (this.gpxSecondRequest) {
      if (this.gpxSecondRequest.routes) {
        coordinates = this.gpxSecondRequest.routes[0].geometry.coordinates
      } else {
        coordinates = this.gpxSecondRequest.features[0].geometry.coordinates
      }
      coordinates = GeoUtils.switchLatLonIndex(coordinates)
    }
    return coordinates
  }

  /**
   * Run a second request to get the response data in json format
   * this is used when the initial api response is in gpx
   * because we need the response in json to be able to display the result in a map
   */
  redoRequestToGetResponseAsGeoJson = () => {
    let url = this.requestData.url.replace('/gpx', '/geojson')
    if (this.requestData.method === 'get') {
      return HttpOrsApi.get(url, this.requestData.headers)
    } else {
      return HttpOrsApi.post(url, this.requestData.body, this.requestData.headers)
    }
  }
}

// export the directions gpx builder class
export default DirectionsGPXBuilder
