import {Geocode, ReverseGeocode} from '@/support/ors-api-runner'
import GeoUtils from '@/support/geo-utils'
import lodash from 'lodash'
/**
 * Place model class
 * @param {*} lat
 * @param {*} lng
 * @param {*} placeName
 * @param {*} options
 */
class Place {
  constructor (lng = 0, lat = 0, placeName = '', options = {}) {
    this.lng = Number(lng)
    this.lat = Number(lat)
    this.placeName = placeName

    // if the place must be resolved (do a request and convert the lng,lat to a qualified place name)
    this.unresolved = options.resolve

    // suggestion places listed to be selected when the user input a place name in a place input
    this.suggestions = options.suggestions || []

    // array containing lng and lat values
    this.coordinates = null

    // place properties
    this.properties = options.properties || {} // objct properties, including layer

    // If the place was valid before be cleared
    this.wasValidBeforeCleared = options.wasValidBeforeCleared !== undefined ? options.wasValidBeforeCleared : false

    // The indx of the input associated to the Place object
    this.inputIndex = options.inputIndex

    // The id of the place returned by the API
    this.placeId = options.placeId

    // if the place was generated based acquired via a browser location api
    this.fromBrowser = options.fromBrowser !== undefined ? options.fromBrowser : false

    // if the place data shall be shown when the user interact with it on the view
    this.skipShowData = options.skipShowData !== undefined ? options.skipShowData : false

    // The index of the Place
    this.index = null

    if (lng !== 0 && lat !== 0) {
      this.coordinates = [Number(lng), Number(lat)]

      // Build a place name using coordinates
      if (this.placeName === '') {
        this.placeName = `${lat},${lng}`
      }
    }
  }

  /**
   * Set the the lng and lat of the Place
   * @param {*} lng
   * @param {*} lat
   */
  setLnglat (lng, lat) {
    this.lng = Number(lng)
    this.lat = Number(lat)
    this.coordinates = [Number(lng), Number(lat)]
  }
  /**
   * Returns an array containing lng and lat
   */
  getLnglat () {
    if (this.coordinates) {
      return this.coordinates
    }
    return [this.lng, this.lat]
  }

  /**
   * Set the input index
   * @param {*} index
   */
  setIputIndex (index) {
    this.inputIndex = index
  }

  /**
   * Set skipShowData
   * @param {*} index
   */
  setSkipShowData (skip) {
    this.skipShowData = skip
  }

  /**
   * Set fromBroser
   * @param {*} index
   */
  setFromBrowser (fromBroser) {
    this.fromBrowser = fromBroser
  }

  /**
   * Set the suggestions
   * @param {Array} places
   */
  setSuggestions (places) {
    this.suggestions = places
  }

  /**
   * Set the place id
   * @param {*} id
   */
  setId (id) {
    this.placeId = id
  }

  isEmpty () {
    return !this.lat || this.lat === 0 || !this.lng || this.lng === 0
  }

  /**
   * Determines if the current place is equals to a given place
   * @param {Place} otherPlace
   * @returns {Boolean} equals
   */
  equals (otherPlace) {
    let equals = true
    if (!otherPlace || (otherPlace.lat !== this.lat || otherPlace.lng !== this.lng || otherPlace.placeName !== this.placeName)) {
      equals = false
    }
    return equals
  }

  /**
   * Create a clone of the current Place
   * @returns {Place}
   */
  clone () {
    let clone = new Place(this.lng, this.lat, this.placeName)
    let propertiesToClone = [
      'unresolved',
      'suggestions',
      'coordinates',
      'properties',
      'wasValidBeforeCleared',
      'inputIndex',
      'placeId',
      'fromBrowser',
      'skipShowData',
      'index'
    ]

    for (let key in propertiesToClone) {
      let prop = propertiesToClone[key]
      clone[prop] = this[prop]
    }
    return clone
  }

  /**
   * Find the index of the current place instance in an array of Places
   * @param {Array} places
   * @returns {Number} index
   */
  findIndex (places) {
    let context = this
    let index = lodash.findIndex(places, (p) => {
      return p.lat === context.lat && p.lng === context.lng && p.placeName === context.placeName
    })
    return index
  }

  /**
   * Check if the place contains coordinates as placeName
   */
  nameIsCoord () {
    let containsCoords = false
    if (this.placeName && this.placeName.indexOf(',') > -1) {
      let parts = this.placeName.split(',')
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        containsCoords = true
      }
    }
    return containsCoords
  }

  /**
   * Set the place coordinates as place name
   */
  setCoordsAsName () {
    let parts = this.placeName.split(',')
    let coords = `${parts[1]},${parts[0]}`
    this.placeName = coords
  }

  /**
   * Resolve the coordinates of a place to a qualified location
   * @param {Number} zoom
   * @returns {Promise}
   */
  resolve (zoom = 10) {
    let context = this
    return new Promise((resolve, reject) => {
      let promise = null
      if (context.placeName && context.placeName.length > 0 && !context.nameIsCoord()) {
        promise = Geocode(context.placeName)
      } else {
        promise = ReverseGeocode(context.lat, context.lng)
      }
      promise.then(places => {
        let selectedPlace = Place.selectPlaceByZoomLevel(zoom, places)

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
   * Select a feature from a feature list by a give zoom
   * the feature with the zomm level (according the layer type)
   * being closest to the givn zoom level will be selected
   * @param {*} zoom
   * @param {*} places
   * @returns {Place} place
   */
  static selectPlaceByZoomLevel (zoom, places) {
    let selectedPlace = null
    if (Array.isArray(places) && places.length > 0) {
      selectedPlace = places[0]
      for (let key in places) {
        let placeZoom = GeoUtils.zoomLevelByLayer(places[key].properties.layer)
        let selectedPlaceZoom = GeoUtils.zoomLevelByLayer(selectedPlace.properties.layer)

        // If the difference betwen the reference zoom and
        // the current feature zoom is smaller than the
        // the difference betwen the previously selected feature
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
  static placesFromFeatures (features) {
    let places = []
    for (let key in features) {
      let feature = features[key]
      let place = new Place(feature.geometry.coordinates[0], feature.geometry.coordinates[1], feature.properties.label)
      place.properties = feature.properties
      place.inputIndex = key
      place.skipShowData = true
      places.push(place)
    }
    return places
  }

  /**
   * Build a place using only lng an lat
   * @param {*} lng
   * @param {*} lat
   */
  static build (lng, lat, placeName = '', options = {}) {
    return new Place(lng, lat, placeName, options)
  }
}
// export the directions json builder class
export default Place
