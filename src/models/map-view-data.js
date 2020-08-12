import constants from '@/resources/constants'
import utils from '@/support/utils'
import Place from '@/models/place'

/**
 * MapViewData class
 */
class MapViewData {
  /**
   * MapViewData constructor
   */
  constructor () {
    this.polygons = []
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
    let mapViewDataClone = new MapViewData()
    let propertiesToClone = ['origin', 'isRouteData', 'timestamp', 'mode']

    for (let key in propertiesToClone) {
      let prop = propertiesToClone[key]
      mapViewDataClone[prop] = this[prop]
    }

    mapViewDataClone.rawData = utils.clone(this.rawData)
    mapViewDataClone.routes = utils.clone(this.routes)
    mapViewDataClone.polygons = utils.clone(this.polygons)
    mapViewDataClone.options = utils.clone(this.options)

    for (let key in this.places) {
      if (this.places[key] instanceof Place) {
        let place = this.places[key]
        mapViewDataClone.places.push(place.clone())
      }
    }
    return mapViewDataClone
  }

  /**
   * Build a mapViewData object from a geojson object
   * @param {*} geoJson
   * @returns {MapViewData} mapViewAta
   */
  static buildFromGeojson (geoJson) {
    let mapViewAta = new MapViewData()

    for (let fKey in geoJson.features) {
      let feature = {
        properties: geoJson.features[fKey].properties,
        geometry: {
          coordinates: geoJson.features[fKey].geometry.coordinates
        }
      }
      switch (geoJson.features[fKey].geometry.type) {
        case 'LineString':
          mapViewAta.routes.push(feature)
          break
        case 'Point':
          let lat = feature.geometry.coordinates[0]
          let lon = feature.geometry.coordinates[1]
          let place = new Place(lat, lon, feature.properties.label, {properties: feature.properties})
          feature.latlngs = feature.geometry.coordinates
          mapViewAta.places.push(place)
          break
        case 'Polygon':
          mapViewAta.polygons.push(feature)
          break
      }
    }
    return mapViewAta
  }

  /**
   * Get the geojson from the mapViewData
   * @returns {Object} geojson
   */
  getGeoJson () {
    let geoJsonData = { type: 'FeatureCollection', features: [] }

    // Build and add routes/linestring features to the geojson
    for (let rKey in this.routes) {
      let routeFeature = {
        type: 'Feature',
        properties: this.routes[rKey].properties,
        geometry: {
          type: 'LineString',
          coordinates: this.routes[rKey].geometry.coordinates
        }
      }
      geoJsonData.features.push(routeFeature)
    }

    // Build and add places/points features to the geojson
    for (let plaKey in this.places) {
      let placeFeature = {
        type: 'Feature',
        properties: {label: this.places[plaKey].placeName},
        geometry: {
          type: 'Point',
          coordinates: this.places[plaKey].coordinates
        }
      }
      geoJsonData.features.push(placeFeature)
    }

    // Build and add polygons features to the geojson
    for (let polKey in this.polygons) {
      let polygon = this.polygons[polKey]

      let polygonFeature = {
        type: 'Feature',
        properties: polygon.properties,
        geometry: polygon.geometry
      }
      geoJsonData.features.push(polygonFeature)
    }

    // Return geojson with features
    return geoJsonData
  }
}
// export the directions json builder class
export default MapViewData
