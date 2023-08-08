import layerZoomMapping from '@/config/layer-zoom-mapping'
import lodash from 'lodash'
import Leaflet from 'leaflet'
import moment from 'moment'
import Vue from 'vue'
import HtmlMarker from '@/fragments/html-marker/HtmlMarker'

// The import below will add some methods to Leaflet.GeometryUtil
// Even if it is not accessed within this class, it is being used!
import 'leaflet-geometryutil'

// noinspection GrazieInspection
const geoUtils = {
  /**
   * Reorder the values of an array of coordinates switching the position of lat and long of each coordinate
   * @param {*} coordinatesArr
   * @returns {Array} of reordered coordinates
   */
  switchLatLonIndex: (coordinatesArr) => {
    const switchedCoords = []
    // the lat and long data of the geometry comes in the
    // inverted order from the one that is expected by leaflet,
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
   * Build a leaflet lat-lng object
   * @param {String|Number} lat
   * @param {String|Number} lng
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
        coloredMarkerName = '#206fe2'
      }
    } else {
      coloredMarkerName = '#206fe2'
    }
    return coloredMarkerName
  },

  /**
   * Build the markers based in an array of coordinates
   * @param {Array} places - coordinates of the marker
   * @param {Boolean} isRoute - default true
   * @param {Place|null} highlightedPlace - place to have a corresponding marker highlighted (red)
   * @returns {Array} of markers
   */
  buildMarkers: (places, isRoute = false, highlightedPlace = null) => {
    const markers = []
    if (!places || places.length === 0) {
      return []
    }
    lodash.each(places, (place, key) => {
      if (place.lng && place.lat) {
        // Define the marker color
        const lastIndexKey = places.length - 1
        let coloredMarkerName = geoUtils.getMarkerColor(key, lastIndexKey, isRoute)

        if (highlightedPlace) {
          if (place.equals(highlightedPlace)) {
            coloredMarkerName = 'red'
          }
        } else if (Number(key) === 0 && !isRoute || places.length === 1) {
          coloredMarkerName = 'red'
        }

        let buildAsRoute = isRoute && places.length > 1

        // Build the marker
        const markerIcon = geoUtils.buildMarkerIcon(coloredMarkerName, key, buildAsRoute)
        const marker = {
          position: {
            lng: place.lng,
            lat: place.lat
          },
          icon: markerIcon
        }

        // If the way point array has the third parameter, it is its label
        marker.label = place.placeName || `${place.lng},${place.lat}`
        if (isRoute) {
          let markerDisplayIndex = Number(key) + 1
          marker.label = `(${markerDisplayIndex}) ${marker.label}`
        }

        // If the way point array has the fourth parameter, it is its way point json data
        marker.place = place

        // Add the markers to the returning array
        markers.push(marker)

      }
    })
    return markers
  },

  /**
   * Determines if a GeoJSON is a rectangle
   * @param {Object} geoJson
   * @returns {Boolean}
   */
  geoJsonIsARectangle(geoJson) {
    let coordinates = geoJson.geometry.coordinates[0]
    let firstVertex = coordinates[0].toString()
    let lastVertex = coordinates.at(-1).toString()

    // It is a four sided, closed polygon
    if (coordinates.length === 5 && firstVertex === lastVertex) {
      let topLeftVertex = coordinates[0]
      let topRightVertex = coordinates[1]
      let bottomRightVertex = coordinates[2]
      let bottomLeftVertex = coordinates[3]

      let topAndBottomParallel = (topLeftVertex[1] - bottomLeftVertex[1]) === (topRightVertex[1] - bottomRightVertex[1])
      let rightAndLeftParallel = (topLeftVertex[0] - bottomLeftVertex[0]) === (topRightVertex[0] - bottomRightVertex[0])

      return topAndBottomParallel && rightAndLeftParallel
    }
  },

  /**
   * Determines the type of polygon a GeoJSON has.
   * If the GeoJSON is of the type  Polygon it returns false.
   * @param {Object} geoJson
   * @returns {String|false}
   */
  geoJsonShapeType(geoJson) {
    let type = geoJson.type
    if (geoJson.geometry && geoJson.geometry.type) {
      type = geoJson.geometry.type
    }
    if (type !== 'Polygon') {
      return false
    }
    if (geoUtils.geoJsonIsARectangle(geoJson)) {
      return 'rectangle'
    } else {
      return 'polygon'
    }
  },

  /**
   * Get marker coordinates
   * @param {*} marker
   */
  getMarkerCoordinates(marker) {
    const markerCoordinates = lodash.get(marker, 'data.geometry.coordinates')
    return markerCoordinates
  },

  /**
   * Calculate geodesic area
   * @param {Array} coords
   */
  geodesicArea(coords) {
    return Leaflet.GeometryUtil.geodesicArea(coords)
  },

  /**
   * Get readable area
   * @param {Array} coords
   * @param {String} unit
   */
  readableArea(coords, unit) {
    // see https://github.com/Leaflet/Leaflet.draw/blob/33ea262678bbfc3da7e92c226f70c017bd328434/src/ext/GeometryUtil.js#L66-L99
    let precision = precision || 2
    let area = this.geodesicArea(coords)
    let areaStr
    if (area >= 10000 && unit === 'km') {
      areaStr = Leaflet.GeometryUtil.formattedNumber(area * 0.000001, precision) + ' km²'
    } else if (area >= 10000 && unit === 'ha') {
      areaStr = Leaflet.GeometryUtil.formattedNumber(area * 0.0001, precision) + ' ha'
    } else {
      areaStr = Leaflet.GeometryUtil.formattedNumber(area, 0) + ' m²'
    }
    return areaStr
  },

  /**
   * Build an HTML marker icon based on parameters
   * @param {String} color
   * @returns {Object} markerIcon
   */
  buildMarkerIcon: (color, index, isRoute) => {
    let propsData = {
      color: color
    }
    if (isRoute && index !== null) {
      propsData.markerNumber = Number(index) + 1
    }
    const htmlMarkerClass = Vue.extend(HtmlMarker)
    const htmlIconInstance = new htmlMarkerClass({
      propsData
    })
    htmlIconInstance.$mount()
    let markerHtml = htmlIconInstance.$el.innerHTML

    const markerIcon = Leaflet.divIcon({
      className: 'custom-div-icon',
      html: markerHtml,
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    })
    return markerIcon
  },

  /**
   * Build a bounding box the also includes the places and the polyline
   * @param {Array} places
   * @param {Array} polyline containing arrays where index 0 is lng and index 1 is lat
   * @returns {Array} of 2 objects {lon:..., lat:...}
   */
  getBounds: (places = [], polyline = []) => {
    const boundsCollection = []
    let minLat = null
    let maxLat = null
    let minLng = null
    let maxLng = null

    places.forEach((place) => {
      boundsCollection.push({
        lat: place.lat,
        lng: place.lng
      })
    })
    if (Array.isArray(polyline)) {
      polyline.forEach((lngLatArr) => {
        boundsCollection.push({
          lng: lngLatArr[0],
          lat: lngLatArr[1]
        })
      })
    }

    if (places.length === 1 && boundsCollection.length === 1) {
      const place = places[0]
      minLat = maxLat = place.lat
      minLng = maxLng = place.lng
    } else {
      for (let itemKey in boundsCollection) {
        let lngLat = boundsCollection[itemKey]
        minLat = minLat === null || lngLat.lat < minLat ? lngLat.lat : minLat
        minLng = minLng === null || lngLat.lng < minLng ? lngLat.lng : minLng
        maxLat = maxLat === null || lngLat.lat > maxLat ? lngLat.lat : maxLat
        maxLng = maxLng === null || lngLat.lng > maxLng ? lngLat.lng : maxLng
      }
    }

    return [
      {
        lon: minLng,
        lat: minLat
      },
      {
        lon: maxLng,
        lat: maxLat
      }
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
        // If km or miles, only one decimal
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
    let durationSegments = {
      days: durationObj._data.days > 0 ? durationObj._data.days + translations.days : '',
      hours: durationObj._data.hours > 0 ? durationObj._data.hours + ' ' + translations.hours : '',
      minutes: durationObj._data.minutes > 0 ? durationObj._data.minutes + ' ' + translations.min : '',
      seconds: durationObj._data.seconds > 0 ? durationObj._data.seconds + ' ' + translations.s : ''
    }
    return durationSegments
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
      z: zoom,
      x: row,
      y: column
    }
  },

  getBrowserLocation: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const error = 'Geo location not available'
        reject(error)
      }
      const getPositionSuccess = (position) => {
        const location = {
          lng: position.coords.longitude,
          lat: position.coords.latitude,
          accuracy: position.coords.accuracy
        }
        resolve(location)
      }
      const getPositionError = (error) => {
        reject(error)
      }
      navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError, {
        enableHighAccuracy: true
      })
    })
  },

  /**
   * Get the slot index for adding a new place given the new place latLng
   * @param {*} latLng
   * @param {Array} places
   */
  getClosestPlaceIndex: (latLng, places) => {
    let shorterDistance = null
    let closestPlaceIndex = 0

    places.forEach((p, index) => {
      if (p.coordinates) {
        const toLatLng = geoUtils.buildLatLong(p.coordinates[1], p.coordinates[0])
        const currentDistance = geoUtils.calculateDistanceBetweenLocations(latLng, toLatLng)
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
    // then the last place. If so, we define move
    // the new place slot to  be before the last
    if (closestPlaceIndex === places.length - 1) {
      const placeBefore = places[closestPlaceIndex - 1]
      const lastPlace = places[closestPlaceIndex]
      const beforeLatLng = geoUtils.buildLatLong(placeBefore.coordinates[1], placeBefore.coordinates[0])
      const fromNewToPlaceBefore = geoUtils.calculateDistanceBetweenLocations(latLng, beforeLatLng)
      const lastLatLng = geoUtils.buildLatLong(lastPlace.coordinates[1], lastPlace.coordinates[0])

      const fromBeforeToLast = geoUtils.calculateDistanceBetweenLocations(lastLatLng, beforeLatLng)
      if (fromNewToPlaceBefore < fromBeforeToLast) {
        closestPlaceIndex--
      }
    }

    return closestPlaceIndex
  },

  /**
   * Get the index of a place on the polyline array
   * @param {Place} place
   * @param {Array} polylineArr
   * @returns  {Integer|null} indexOnPolyline
   */
  getPlaceIndexOnPolylineArray(place, polylineArr) {
    let indexOnPolyline = null
    let minDistance = null
    // Find a more appropriate inject index, it this is the case
    for (let pIndex = 0; pIndex < polylineArr.length; pIndex++) {
      const polylineCoords = polylineArr[pIndex]
      const polylineCoordsLatLng = {
        lat: polylineCoords[0],
        lng: polylineCoords[1]
      }

      // Check the place that has the shortest distance to the polyline point
      let currentDistance = geoUtils.calculateDistanceBetweenLocations(polylineCoordsLatLng, place, 'm')
      if (currentDistance === 0) {
        // Get the closest polyline point index
        indexOnPolyline = pIndex
        break
      } else {
        if (minDistance === null || currentDistance < minDistance) {
          minDistance = currentDistance
          // Get the closest polyline point index
          indexOnPolyline = pIndex
        }
      }
    }
    return indexOnPolyline
  },
  /**
   * Get the inject-index considering the source polyline point
   * @param {Array} places
   * @param {Array} polylineArr
   * @param {Integer} sourceIndex
   * @returns {Integer} injectIndex
   */
  getStopIndexFromSourcePoint(places, polylineArr, sourceIndex) {
    let injectIndex = null
    let placePolylineIndexMap = []

    for (let placeKey in places) {
      const placeIndexOnPolyline = geoUtils.getPlaceIndexOnPolylineArray(places[placeKey], polylineArr)
      if (placeIndexOnPolyline !== null) {
        let map = {
          polylineIndex: placeIndexOnPolyline,
          placeIndex: placeKey
        }
        placePolylineIndexMap.push(map)
      }
    }

    for (let mIndex = 0; mIndex < placePolylineIndexMap.length; mIndex++) {
      let indexMap = placePolylineIndexMap[mIndex]
      let nextIndexMap = placePolylineIndexMap[mIndex + 1]
      if (indexMap.polylineIndex <= sourceIndex && nextIndexMap && sourceIndex <= nextIndexMap.polylineIndex) {
        injectIndex = Number(indexMap.placeIndex)
        break
      }
    }
    return injectIndex
  },

  /**
   * Return the zoom level according to the layer
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
   * @param {Object} fromLatLng
   * @param {Object} toLatLng
   * @param {String} unit km|mi|m
   * @returns {Number}
   */
  calculateDistanceBetweenLocations(fromLatLng, toLatLng, unit = 'km') {
    const toRadians = function (deg) {
      return deg * (Math.PI / 180)
    }

    const R = 6371 // km
    // has a problem with the .toRad() method below
    const x1 = toLatLng.lat - fromLatLng.lat
    const dLat = toRadians(x1)
    const x2 = toLatLng.lng - fromLatLng.lng
    const dLon = toRadians(x2)
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(fromLatLng.lat)) * Math.cos(toRadians(toLatLng.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
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
   * the feature with the zoom level (according the layer type)
   * being closest to the given zoom level will be selected
   * @param {*} zoom
   * @param {*} places
   * @returns {Place} place
   */
  selectPlaceByZoomLevel(zoom, places) {
    let selectedPlace = null
    if (Array.isArray(places) && places.length > 0) {
      selectedPlace = places[0]
      for (const key in places) {
        const featureZoom = geoUtils.zoomLevelByLayer(places[key].properties.layer)
        const selectedFeatureZoom = geoUtils.zoomLevelByLayer(selectedPlace.properties.layer)

        // If the difference between the reference zoom and
        // the current feature zoom is smaller than the
        // difference between the previously selected feature
        // then replace the current selected feature bt the current feature
        if (featureZoom % zoom < selectedFeatureZoom % zoom) {
          selectedPlace = places[key]
        }
      }
    }
    return selectedPlace
  },

  /**
   * Tests if a point is left|on|right of an infinite line.
   * This is a JavaScript and Leaflet port of the `isLeft()` C++ function by Dan Sunday.
   * @param {LatLng} p0 Point the polyline point
   * @param {LatLng} p1 Point The reference line is defined by the polyline LatLng to p1.
   * @param {LatLng} p2 The point in question.
   * @returns {Number}
   *  >0 for p2 left of the line through this point and p1,
   *  =0 for p2 on the line,
   *  <0 for p2 right of the line through this point and p1.
   * @see {@link http://geomalgorithms.com/a03-_inclusion.html Inclusion of a Point in a Polygon} by Dan Sunday.
   */
  isOverLine: (p0, p1, p2) => {
    let val = ((p1.lng - p0.lng) * (p2.lat - p0.lat) - (p2.lng - p0.lng) * (p1.lat - p0.lat))
    return val
  },

  /**
   * Normalize latLng to keep lat in range 90 >< 90 and lng -180 >< 180
   * @param {Object} latLng
   */
  normalizeCoordinates (latLng) {
    latLng.lat = geoUtils.normalizeLat(latLng.lat)
    latLng.lng = geoUtils.normalizeLng(latLng.lng)
  },

  /**
   * Normalize longitude to keep it between 90 >< 90
   * @param {Number} lat
   */
  normalizeLat (lat) {
    while(lat < -180){
      lat +=360
    }
    while (lat > 180){
      lat -= 360
    }
    return lat
  },

  /**
   * Normalize longitude to keep it between -180 >< 180
   * @param {Number} lng
   */
  normalizeLng (lng) {
    while(lng < -180){
      lng +=360
    }
    while (lng > 180){
      lng -= 360
    }
    return lng
  }
}
export default geoUtils
