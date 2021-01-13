import layerZoomMapping from '@/config/layer-zoom-mapping'
import lodash from 'lodash'
import Leaflet from 'leaflet'
import moment from 'moment'
import main from '@/main'

// The import below will add some methods to Leaflet.GeometryUtil 
// Even if it is not been accessed within this class, it is being used!
import 'leaflet-geometryutil'

const geoUtils = {
  /**
   * Reorder the values of an array of coordinates switching the position of lat and long of each coordinate
   * @param {*} coordinatesArr
   * @returns {Array} of reordered coordinates
   */
  switchLatLonIndex: (coordinatesArr) => {
    const switchedCoords = []
    // the lat and long data of the geometry comes in the
    // inverted order from the one that is expected by leaflet
    // so we just iterate over than and create an array
    // with lat and long in the expected order
    coordinatesArr.forEach(function (coordinate) {
      const switched = [coordinate[1], coordinate[0]]
      if (coordinate[2]) {
        switched[2] = coordinate[2]
      }
      switchedCoords.push(switched)
    })
    return switchedCoords
  },

  /**
   * Build a leaflet latlng object
   * @returns {Object}
   */
  buildLatLong: (lat, lng) => {
    return Leaflet.latLng(lat, lng)
  },

  /**
   * Get the marker color based on the index, isRoute and lasIndex
   * @param index
   * @param lastIndexKey
   * @param {Boolean} isRoute
   * @returns {Array} of markers
   */
  getMarkerColor: (index, lastIndexKey, isRoute) => {
    let coloredMarkerName

    if (isRoute) {
      if (index === 0) {
        coloredMarkerName = 'green'
      } else if (lastIndexKey === index) {
        coloredMarkerName = 'red'
      } else {
        coloredMarkerName = 'blue'
      }
    } else {
      coloredMarkerName = 'blue'
    }
    return coloredMarkerName
  },

  /**
   * Build the markers based in an array of coordinates
   * @param {Array} places - coordinates of the marker
   * @param {Boolean} isRoute - default true
   * @param {Place|null} highlightedPlace - place to have a corresponding marker hightlighed (red)
   * @returns {Array} of markers
   */
  buildMarkers: (places, isRoute = false,  highlightedPlace = null) => {
    const markers = []
    if (!places || places.length === 0) {
      return []
    }
    lodash.each(places, (place, key) => {
      // Define the marker color
      const lastIndexKey = places.length - 1
      let coloredMarkerName = geoUtils.getMarkerColor(key, lastIndexKey, isRoute)

      if (highlightedPlace) {
        if (place.equals(highlightedPlace)) {
          coloredMarkerName = 'red'
        }
      } else if (Number(key) === 0 && !isRoute) {
        coloredMarkerName = 'red'
      }

      // Build the marker
      const markerIcon = geoUtils.buildMarkerIcon(coloredMarkerName)
      const marker = { position: { lng: place.lng, lat: place.lat }, icon: markerIcon }

      // If the way point array has the third parameter, it is its label
      marker.label = place.placeName || `${place.lng},${place.lat}`
      if (!isNaN(place.index) && isRoute) {
        marker.label = `(${place.index}) ${marker.label}`
      }

      // If the way point array has the fourth parameter, it is its way point json data
      marker.place = place

      // Add the markers to the returning array
      markers.push(marker)
    })
    return markers
  },

  /**
   * Determines if a geojson is a rectangle
   * @param {Object} geojson 
   * @returns {Boolean}
   */
  geojsonIsARectangle (geojson) {
    let coordinates = geojson.geometry.coordinates[0]
    let firstVortice = coordinates[0].toString()
    let lastVortice = coordinates[coordinates.length -1].toString()

    // It is a four side closed polygon
    if (coordinates.length === 5 && firstVortice === lastVortice) {
      let topLeftVortice = coordinates[0]
      let topRightVortice = coordinates[1]
      let bottomRightVortice = coordinates[2]
      let bottomLeftVortice = coordinates[3]
      
      let topAndBottomParallel = (topLeftVortice[1] - bottomLeftVortice[1]) === (topRightVortice[1] - bottomRightVortice[1])
      let trightAndLeftParallel = (topLeftVortice[0] - bottomLeftVortice[0]) === (topRightVortice[0] - bottomRightVortice[0])

      if (topAndBottomParallel && trightAndLeftParallel) {
        return true
      }
      return false
    }
  },

  /**
   * Determines the type of polygon a geojson has. 
   * If the geojson is of the type  Polygon it retirns false.
   * @param {Object} geojson 
   * @returns {String|false}
   */
  geojsonShapeType (geojson) {
    let type = geojson.type
    if (geojson.geometry && geojson.geometry.type) {
      type = geojson.geometry.type
    }
    if (type !== 'Polygon') {
      return false
    }
    if (geoUtils.geojsonIsARectangle(geojson)) {
      return 'rectangle'
    } else {
      return 'polygon'
    }
  },

  /**
   * Get marker coordinates
   * @param {*} marker
   */
  getMarkerCordinates (marker) {
    const markerCoordinates = lodash.get(marker, 'data.geometry.coordinates')
    return markerCoordinates
  },

  /**
   * Calculate geodesic area
   * @param {Array} latlngs 
   */
  geodesicArea (latlngs) {
    return Leaflet.GeometryUtil.geodesicArea(latlngs)
  },

   /**
   * Get readable area
   * @param {Number} area 
   * @param {String} unit 
   */
  readableArea (latlngs, unit) {
    let area = Leaflet.GeometryUtil.geodesicArea(latlngs)
    return Leaflet.GeometryUtil.readableArea(area, unit)
  },



  

  /**
   * Build a marker icon based on the color specified
   * Expecting marker PNGs in 180x230 resolution
   * @param {String} color
   * @returns {Object} markerIcon
   */
  buildMarkerIcon: (color) => {
    const markerIcon = Leaflet.icon({
      iconUrl: require(`./static/${color}-marker.png`).default,
      shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
      iconAnchor: [14, 35],
      shadowAnchor: [12, 41],
      iconSize: [28, 36],
      popupAnchor: [0, -32]
    })
    return markerIcon
  },

  /**
   * Build a bounding box the also includes the plaes and the polyline
   * @param {Array} places
   * @param {Array} polyline containing arrays where index 0 is lng and index 1 is lat
   * @returns {Array} of 2 objects {lon:..., lat:...}
   */
  getBounds: (places = [], polyline = []) => {
    var boundsCollection = []
    var minLat = null
    var maxLat = null
    var minLng = null
    var maxLng = null

    places.forEach((place) => {
      boundsCollection.push({ lat: place.lat, lng: place.lng })
    })
    if (Array.isArray(polyline)) {
      polyline.forEach((lngLatArr) => {
        boundsCollection.push({ lng: lngLatArr[0], lat: lngLatArr[1] })
      })
    }

    if (places.length === 1 && boundsCollection.length === 1) {
      const place = places[0]
      minLat = maxLat = place.lat
      minLng = maxLng = place.lng
    } else {
      for (let itemKey in boundsCollection) {
        let lngLat = boundsCollection[itemKey] 
        minLat = minLat ===  null || lngLat.lat < minLat ? lngLat.lat : minLat
        minLng = minLng ===  null || lngLat.lng < minLng ? lngLat.lng : minLng
        maxLat = maxLat ===  null || lngLat.lat > maxLat ? lngLat.lat : maxLat
        maxLng = maxLng ===  null || lngLat.lng > maxLng ? lngLat.lng : maxLng
      }
    }

    return [
      { lon: minLng, lat: minLat },
      { lon: maxLng, lat: maxLat }
    ]
  },

  /**
   * Get humanized tool tip string
   * @param {*} data {duration: Number, distance: Number, unit: String}
   * @returns {String} formatted tool tip
   */
  getHumanizedTimeAndDistance: (data, translations) => {
    let humanizedDistance = null
    if (data.distance) {
      data.distance = parseFloat(data.distance)
      if (data.distance > 1000 && data.unit === 'm') {
        // when the unit is in meters and very big, we convert it to kilometers
        data.distance = (data.distance / 1000).toFixed(1)
        data.unit = 'km'
      } else {
        // If km or mi, only one decimal
        data.distance = data.distance.toFixed(1)
      }
      humanizedDistance = `${data.distance} ${data.unit}`
    }

    let humanizedDuration = null

    if (data.duration) {
      if (typeof data.duration === 'string') {
        humanizedDuration = data.duration
      } else {
        const durationObj = geoUtils.getDurationInSegments(data.duration, translations)
        humanizedDuration = `${durationObj.days} ${durationObj.hours} ${durationObj.minutes} ${durationObj.seconds}`
      }
    }

    return {
      duration: humanizedDuration,
      distance: humanizedDistance
    }
  },

  /**
   * Get the seconds segments (days, hours, minutes, seconds) or empty string for each segment
   * @param {*} data {duration: Number, distance: Number, unit: String}
   * @returns {String} formatted tool tip
   */
  getDurationInSegments: (seconds, translations) => {
    const durationObj = moment.duration(seconds, 'seconds') // the duration value is expected to be always in seconds
    return {
      days: durationObj._data.days > 0 ? durationObj._data.days + translations.days : '',
      hours: durationObj._data.hours > 0 ? durationObj._data.hours + ' ' + translations.hours : '',
      minutes: durationObj._data.minutes > 0 ? durationObj._data.minutes + ' ' + translations.minutes : '',
      seconds: durationObj._data.seconds > 0 ? durationObj._data.seconds + ' ' + translations.seconds : ''
    }
  },

  /**
   * Get the tile row and column for input location at zoom level
   * @param lat -
   * @param lon
   * @param zoom
   * @returns {{z: number, x: number, y: number}}
   */
  getTileData: (lat, lon, zoom) => {
    const row = (Math.floor((lon + 180) / 360 * Math.pow(2, zoom)))
    const column = (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom)))
    return {
      z: zoom, x: row, y: column
    }
  },

  getBrowserLocation: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const error = 'Geo location not available'
        reject(error)
      }
      const getPositionSuccess = (position) => {
        const location = { lng: position.coords.longitude, lat: position.coords.latitude, accuracy: position.coords.accuracy }
        resolve(location)
      }
      const getPositionError = (error) => {
        reject(error)
      }
      navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError, { enableHighAccuracy: true })
    })
  },

  /**
   * Get the slot index for adding a new place given the new place latlng
   * @param {*} latlng
   * @param {Array} places
   */
  getClosestPlaceIndex: (latlng, places) => {
    let shorterDistance = null
    let closestPlaceIndex = 0

    places.forEach((p, index) => {
      if (p.coordinates) {
        const toLatlng = geoUtils.buildLatLong(p.coordinates[1], p.coordinates[0])
        const currentDistance = geoUtils.calculateDistanceBetweenLocations(latlng, toLatlng)
        if (shorterDistance) {
          if (currentDistance < shorterDistance) {
            shorterDistance = currentDistance
            closestPlaceIndex = index
          }
        } else {
          shorterDistance = currentDistance
        }
      }
    })

    // If the closest place is the last one,
    // check if the new place to be inserted
    // is not closer to the place before the las
    // then the the last place. If so, we define move
    // the new place slot to  be before the last
    if (closestPlaceIndex === places.length - 1) {
      const placeBefore = places[closestPlaceIndex - 1]
      const lastPlace = places[closestPlaceIndex]
      const beforeLatlng = geoUtils.buildLatLong(placeBefore.coordinates[1], placeBefore.coordinates[0])
      const fromNewToPlaceBefore = geoUtils.calculateDistanceBetweenLocations(latlng, beforeLatlng)
      const lastLatlng = geoUtils.buildLatLong(lastPlace.coordinates[1], lastPlace.coordinates[0])

      const fromBeforeToLast = geoUtils.calculateDistanceBetweenLocations(lastLatlng, beforeLatlng)
      if (fromNewToPlaceBefore < fromBeforeToLast) {
        closestPlaceIndex--
      }
    }

    return closestPlaceIndex
  },
  /**
   * Get the appropriate place index to inject a stop considering the polyline path
   * @param {Object} targetLattng 
   * @param {Array} places 
   * @param {Array} polylineArr 
   * @param {Integer} draggedFromIndex 
   * @returns {Integer} injectPlaceIndex
   */
  getStopInjectIndexFromPolyline (targetLattng, places, polylineArr, draggedFromIndex) {
    // the default inject is the one considering promixity
    let injectPlaceIndex = geoUtils.getClosestPlaceIndex(targetLattng, places)
    let closestPlace = places[injectPlaceIndex]    
    var closestPlaceIndexOnPolyline
    var minDistance = null

    // Find an more appropriate inject index, it this is the case
    for (let pIndex = 0; pIndex < polylineArr.length; pIndex++) {
      const polylineCoords = polylineArr[pIndex]
      const polylineCoordsLatlng = {lat: polylineCoords[0], lng: polylineCoords[1]}
      const placeLatlng = {lat: closestPlace.lat, lng: closestPlace.lng}

      // Check the place that has the shortest distace to the polyline point
      let currentDistance = geoUtils.calculateDistanceBetweenLocations(polylineCoordsLatlng, placeLatlng, 'm')
      if (currentDistance === 0) {
        // Get the closest polyline point index
        closestPlaceIndexOnPolyline = pIndex
        break
      } else {
        if (minDistance === null || currentDistance < minDistance) {
          minDistance = currentDistance
          // Get the closest polyline point index
          closestPlaceIndexOnPolyline = pIndex
        }
      } 
    }
    // If the index of the point where the drag started from
    // if lowest than the corresponding index of the closest place 
    // over the polyline, then we must indext the stop before the
    // closest place index
    if (draggedFromIndex < closestPlaceIndexOnPolyline) {
      injectPlaceIndex--
    }
    return injectPlaceIndex
  },

  /**
   * Return the zoom level accoding the layer
   */
  zoomLevelByLayer: (layer) => {
    const map = layerZoomMapping
    const zoom = map[layer]
    if (!zoom) {
      return 8
    }
    return zoom
  },

  /**
   * Calculate the distance between two coordinates
   * @param {Object} fromLatlng
   * @param {Object} toLatlng
   * @param {String} unit km|mi|m
   * @returns {Number}
   */
  calculateDistanceBetweenLocations (fromLatlng, toLatlng, unit = 'km') {
    const toRadians = function (deg) {
      return deg * (Math.PI / 180)
    }

    const R = 6371 // km
    // has a problem with the .toRad() method below
    const x1 = toLatlng.lat - fromLatlng.lat
    const dLat = toRadians(x1)
    const x2 = toLatlng.lng - fromLatlng.lng
    const dLon = toRadians(x2)
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(fromLatlng.lat)) * Math.cos(toRadians(toLatlng.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    if (unit === 'mi') {
      return distance * 0.62137
    }
    if (unit === 'm') {
      return distance * 1000
    }
    return distance
  },

  /**
   * Select a feature from a feature list by a give zoom
   * the feature with the zomm level (according the layer type)
   * being closest to the givn zoom level will be selected
   * @param {*} zoom
   * @param {*} places
   * @returns {Place} place
   */
  selectPlaceByZoomLevel (zoom, places) {
    let selectedPlace = null
    if (Array.isArray(places) && places.length > 0) {
      selectedPlace = places[0]
      for (const key in places) {
        const featureZoom = geoUtils.zoomLevelByLayer(places[key].properties.layer)
        const selectedFeatureZoom = geoUtils.zoomLevelByLayer(selectedPlace.properties.layer)

        // If the difference betwen the reference zoom and
        // the current feature zoom is smaller than the
        // the difference betwen the previously selected feature
        // then replace the current selected feature bt the current feature
        if (featureZoom % zoom < selectedFeatureZoom % zoom) {
          selectedPlace = places[key]
        }
      }
    }
    return selectedPlace
  },

  /**
   * Check if a point is inside a polygon
   */
  isPointInsidePolygon: (lat, lng, polyPoints) => {
    const x = lat
    const y = lng

    var inside = false
    for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
      const xi = polyPoints[i][1]
      const yi = polyPoints[i][0]
      const xj = polyPoints[j][1]
      const yj = polyPoints[j][0]

      const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
      if (intersect) inside = !inside
    }

    return inside
  }
}
export default geoUtils
