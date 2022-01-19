import {
  Geocode,
  ReverseGeocode
} from '@/support/ors-api-runner'
import GeoUtils from '@/support/geo-utils'
import lodash from 'lodash'
/**
 * Place model class
 * @param {Number} lat - default null
 * @param {Number} lng - default null
 * @param {String} placeName
 * @param {Object} options
 */
class Place {
  constructor(lng = null, lat = null, placeName = '', options = {}) {
    this.lng = lng !== null && lng !== 'null' ? Number(lng) : null
    this.lat = lat !== null && lat !== 'null' ? Number(lat) : null

    this.placeName = placeName

    // If the place must be resolved (do a request and convert the lng,lat to a qualified place name)
    this.unresolved = options.resolve

    // suggestion places listed to be selected when the user input a place name in a place input
    this.suggestions = options.suggestions || []

    // array containing lng and lat values
    this.coordinates = null

    // place properties
    this.properties = options.properties || {} // object properties, including layer

    // The id of the place returned by the API
    this.placeId = options.placeId

    // The if a route should be routed directly to this Place
    this.direct = options.direct || false

    // If it is a POI
    this.isPoi = options.isPoi

    if (this.lng !== null && this.lat !== null) {
      this.coordinates = [this.lng, this.lat]

      // Build a place name using coordinates
      if (this.placeName === '' && lat && lng) {
        this.placeName = `${lat},${lng}`
      }
    }
  }

  /**
   * Set the the lng and lat of the Place
   * @param {*} lng
   * @param {*} lat
   */
  setLnglat(lng, lat) {
    this.lng = Number(lng)
    this.lat = Number(lat)
    this.coordinates = [Number(lng), Number(lat)]
  }

  /**
   * Returns an array containing lng and lat
   * @returns {Array} containing [lng, lat]
   */
  getLngLatArr() {
    if (this.lat !== null && this.lng !== null) {
      return [this.lng, this.lat]
    } else {
      if (this.nameIsCoord()) {
        const coords = this.getCoordsFromName()
        return coords
      } else {
        return [0, 0]
      }
    }
  }

  /**
   * Returns LatLng object
   * @returns {LatLng}
   */
  getLatLng() {
    if (this.nameIsCoord()) {
      let coords = this.getCoordsFromName()
      return GeoUtils.buildLatLong(coords[1], coords[0])
    }
    return GeoUtils.buildLatLong(this.lat, this.lng)
  }

  /**
   * Returns an array containing lat and lng
   * @returns {Array} containing [lat, lng]
   */
  getLatLngArr() {
    return this.getLngLatArr().reverse()
  }

  /**
   * Set the suggestions
   * @param {Array} places
   */
  setSuggestions(places) {
    this.suggestions = places
  }

  /**
   * Set the place id
   * @param {*} id
   */
  setId(id) {
    this.placeId = id
  }

  isEmpty() {
    return !this.lat || this.lat === 0 || !this.lng || this.lng === 0
  }

  /**
   * Determines if the current place is equals to a given place
   * @param {Place} otherPlace
   * @returns {Boolean} equals
   */
  equals(otherPlace) {
    let equals = true
    if (!otherPlace || (otherPlace.lat !== this.lat || otherPlace.lng !== this.lng || otherPlace.properties.layer !== this.properties.layer)) {
      equals = false
    }
    return equals
  }

  /**
   * Create a clone of the current Place
   * @returns {Place}
   */
  clone() {
    const clone = new Place(this.lng, this.lat, this.placeName)
    const propertiesToClone = [
      'unresolved',
      'suggestions',
      'coordinates',
      'properties',
      'placeId',
      'direct',
      'isPoi'
    ]

    for (const key in propertiesToClone) {
      const prop = propertiesToClone[key]
      clone[prop] = this[prop]
    }
    return clone
  }

  /**
   * Find the index of the current place instance in an array of Places
   * @param {Array} places
   * @returns {Number} index
   */
  findIndex(places) {
    const context = this
    const index = lodash.findIndex(places, (p) => {
      return p.lat === context.lat && p.lng === context.lng && p.placeName === context.placeName
    })
    return index
  }

  /**
   * Check if the place contains coordinates as placeName
   */
  nameIsCoord() {
    const coords = this.getCoordsFromName()
    if (coords) {
      return true
    }
    return false
  }

  /**
   * Get the coordinates from name
   * @returns {Array|false}
   */
  getCoordsFromName() {
    if (this.placeName && this.placeName.indexOf(',') > -1) {
      const parts = this.placeName.split(',')
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return parts
      }
    }
    return false
  }

  /**
   * Set the place coordinates as place name
   */
  setCoordsAsName() {
    if (this.lat && this.lng) {
      const coords = `${this.lat},${this.lng}`
      this.placeName = coords
    }
  }

  /**
   * Resolve the coordinates of a place to a qualified location
   * @param {Number} zoom
   * @returns {Promise}
   */
  resolve(zoom = 10) {
    const context = this
    return new Promise((resolve, reject) => {
      let promise = null
      if (context.placeName && context.placeName.length > 0 && !context.nameIsCoord()) {
        promise = Geocode(context.placeName)
      } else {
        promise = ReverseGeocode(context.lat, context.lng)
      }
      promise.then(places => {
        const selectedPlace = Place.selectPlaceByZoomLevel(zoom, places)

        if (selectedPlace) {
          context.properties = selectedPlace.properties
          context.placeName = selectedPlace.properties.label
        }

        context.unresolved = false
        resolve(context)
      }).catch(response => {
        console.error(response)
        reject(response)
      })
    })
  }

  /**
   * Get place models that are filled
   * @returns {Array} of filled places
   */
  static getFilledPlaces(places) {
    const filledPlaces = lodash.filter(places, (p) => {
      if (!p.isEmpty()) {
        return p
      }
    })
    return filledPlaces
  }

  /**
   * Select a feature from a feature list by a give zoom
   * the feature with the zoom level (according the layer type)
   * being closest to the given zoom level will be selected
   * @param {*} zoom
   * @param {*} places
   * @returns {Place} place
   */
  static selectPlaceByZoomLevel(zoom, places) {
    let selectedPlace = null
    if (Array.isArray(places) && places.length > 0) {
      selectedPlace = places[0]
      for (const key in places) {
        const placeZoom = GeoUtils.zoomLevelByLayer(places[key].properties.layer)
        const selectedPlaceZoom = GeoUtils.zoomLevelByLayer(selectedPlace.properties.layer)

        // If the difference between the reference zoom and
        // the current feature zoom is smaller than the
        // the difference between the previously selected feature
        // then replace the current selected feature bt the current feature
        if (placeZoom % zoom < selectedPlaceZoom % zoom) {
          selectedPlace = places[key]
        }
      }
    }
    return selectedPlace
  }

  /**
   * Get list of Places from features
   * @param {*} features
   * @returns {Array} of Places
   */
  static placesFromFeatures(features) {
    const places = []
    for (const key in features) {
      const feature = features[key]

      let placeName = null
      if (feature.properties.label) {
        placeName = feature.properties.label
      } else if (feature.properties.osm_tags && feature.properties.osm_tags.name) {
        placeName = feature.properties.osm_tags.name
      }
      const place = new Place(feature.geometry.coordinates[0], feature.geometry.coordinates[1], placeName)
      place.properties = feature.properties
      places.push(place)
    }
    return places
  }

  /**
   * Build a place using only lng an lat
   * @param {*} lng
   * @param {*} lat
   */
  static build(lng, lat, placeName = '', options = {}) {
    return new Place(lng, lat, placeName, options)
  }
}
// export the place class
export default Place
