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
  constructor ({places = []} = {}) {
    this.polygons = []
    this.options = {} // {origin: String, apiVersion: String, contentType: String, timestamp: timestamp, options: {avoid_polygons: Object, avoid_features: Array}},
    this.places = places ? Place.placesFromFeatures(places) : [] // array of Place objects @see /src/models/place
    this.pois = [] // array of Place objects @see /src/models/place
    this.routes = [] // array of route objects containing route data and summary
    this.origin = 'response' // where the data comes from
    this.mode = constants.modes.directions // default mode is directions
    this.isRouteData = false // if the places collection represent a route
    this.rawData = null // the original raw data
    this.timestamp = null // the timestamp that defines when the data was acquired/uploaded
  }

  /**
   * Build a place using only lng a lat
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
   * Check if the object has places
   * @param {*} lng
   * @param {*} lat
   */
  hasPois () {
    return this.pois.length > 0
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
    const mapViewDataClone = new MapViewData()
    const propertiesToClone = ['origin', 'isRouteData', 'timestamp', 'mode']

    for (const key in propertiesToClone) {
      const prop = propertiesToClone[key]
      mapViewDataClone[prop] = this[prop]
    }

    mapViewDataClone.rawData = utils.clone(this.rawData)
    mapViewDataClone.routes = utils.clone(this.routes)
    mapViewDataClone.polygons = utils.clone(this.polygons)
    mapViewDataClone.options = utils.clone(this.options)

    for (let i = 0; i < this.places.length; i++) {
      if (this.places[i] instanceof Place) {
        const place = this.places[i]
        mapViewDataClone.places.push(place.clone())
      }
    }

    for (let k = 0; k < this.pois.length; k++) {
      if (this.pois[k] instanceof Place) {
        const place = this.pois[k]
        mapViewDataClone.pois.push(place.clone())
      }
    }

    return mapViewDataClone
  }

  /**
   * Build a mapViewData object from a GeoJSON object
   * @param {*} geoJson
   * @returns {MapViewData} mapViewAta
   */
  static buildFromGeoJson (geoJson) {
    const mapViewAta = new MapViewData()

    for (const fKey in geoJson.features) {
      const feature = {
        properties: geoJson.features[fKey].properties,
        geometry: {
          coordinates: geoJson.features[fKey].geometry.coordinates
        }
      }
      switch (geoJson.features[fKey].geometry.type) {
        case 'LineString':
          mapViewAta.routes.push(feature)
          break
        case 'Point': {
          const lat = feature.geometry.coordinates[0]
          const lon = feature.geometry.coordinates[1]
          const place = new Place(lat, lon, feature.properties.label, { properties: feature.properties })
          feature.latlngs = feature.geometry.coordinates
          mapViewAta.places.push(place)
          break
        }
        case 'Polygon':
          mapViewAta.polygons.push(feature)
          break
      }
    }
    return mapViewAta
  }

  /**
   * Get the GeoJSON from the mapViewData
   * @returns {Object} GeoJSON
   */
  getGeoJson () {
    const geoJsonData = { type: 'FeatureCollection', features: [] }

    // Build and add routes/linestring features to the GeoJSON
    for (const rKey in this.routes) {
      const routeFeature = {
        type: 'Feature',
        properties: this.routes[rKey].properties,
        geometry: {
          type: 'LineString',
          coordinates: this.routes[rKey].geometry.coordinates
        }
      }
      geoJsonData.features.push(routeFeature)
    }

    // Build and add places/points features to the GeoJSON
    for (const plaKey in this.places) {
      const placeFeature = {
        type: 'Feature',
        properties: { label: this.places[plaKey].placeName },
        geometry: {
          type: 'Point',
          coordinates: this.places[plaKey].coordinates
        }
      }
      geoJsonData.features.push(placeFeature)
    }

    // Build and add polygons features to the GeoJSON
    for (const polKey in this.polygons) {
      const polygon = this.polygons[polKey]

      const polygonFeature = {
        type: 'Feature',
        properties: polygon.properties,
        geometry: polygon.geometry
      }
      geoJsonData.features.push(polygonFeature)
    }

    // Return GeoJSON with features
    return geoJsonData
  }
}
// export the MapViewData class
export default MapViewData
