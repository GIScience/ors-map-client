import htmlColors from 'html-colors'
import GeoUtils from '@/support/geo-utils'
import Leaflet from 'leaflet'
import store from '@/store/store'

const PolygonUtils = {

  /**
   * Prepare polygon for view
   * @param {*} polygon 
   * @param {*} translations
   * @param {*} index
   */
  preparePolygonForView (polygon, translations, index) {
    polygon.properties = polygon.properties || {}
    polygon.properties.color = polygon.properties.color || PolygonUtils.buildPolygonColor(index)
    polygon.properties.fillColor = polygon.properties.fillColor || polygon.properties.color
    polygon.properties.label = polygon.properties.label || PolygonUtils.buildPolygonLabel(polygon, translations)
    polygon.properties.area = PolygonUtils.calcPolygonArea(polygon)

    polygon.properties.opacity = polygon.properties.opacity || 1
    polygon.properties.fillOpacity = polygon.properties.fillOpacity || 0.2
    if (polygon.properties.visible === undefined) {
      polygon.properties.visible = true
    }
  },

  /**
   * Create polygon
   * @param {*} coordinates 
   * @param {*} options 
   * @param {*} shapeType 
   * @returns {Leaflet.Polygon}
   */
  createPolygon (coordinates, options, shapeType) {
    let polygon
    if (shapeType === 'rectangle') {
      polygon = Leaflet.rectangle(coordinates, options)
    } else {
      polygon = Leaflet.polygon(coordinates, options)
    }
    return polygon
  },

  /**
   * Build polygon options
   * @param {Object} polygonData 
   * @returns {Object}
   */
  buildPolygonOptions (polygonData, defaultColor) {
    // Set the color options of the polygons about to be drawn
    let color = defaultColor
    let dashArray = null
    if (polygonData.properties) {
      if (polygonData.properties.color) {
        color = polygonData.properties.color
      }
      if (polygonData.properties.dashArray) {
        dashArray = polygonData.properties.dashArray
      }
    }
    return { color: color, dashArray: dashArray}
  },
  hasPlaceAsCenter (place, polygon) {
    if (polygon.properties.center && place.coordinates && polygon.properties.center.toString() === place.coordinates.toString()) {
      return true
    }
  },
  /**
   * Calculate polygon area
   * @param {Object} polygon 
   * @returns {String} polygon area + unit
   */
  calcPolygonArea (polygon) {
    const latlngs = []
    const coordinates = polygon.geometry.coordinates.length === 1 ? polygon.geometry.coordinates[0] : polygon.geometry.coordinates
    for (const key in coordinates) {
      const coordinate = coordinates[key]
      latlngs.push(GeoUtils.buildLatLong(coordinate[1], coordinate[0]))
    }
    const polygonArea = GeoUtils.readableArea(latlngs, store.getters.mapSettings.areaUnit)
    return polygonArea
  },
  /**
   * Get polygon color
   * @param {Number} index
   * @returns {String} color
   */
  buildPolygonColor(index) {
    index = Number(index)
    // We get a color from the color collection but we
    // skip the first 5 colors because they are not nice
    const names = htmlColors.names() // Get an array containing all colors names
    const color = htmlColors.hex(names[index + 6])
    return color
  },
  /**
   * Build polygon label
   * @param {Number} index
   * @returns {String} label
   */
  buildPolygonLabel(polygon, translations) {
    let label = ''
    if (polygon.properties.range_type === 'time') {
      const durationObj = GeoUtils.getDurationInSegments(polygon.properties.value, translations)
      const humanizedDuration = `${durationObj.days} ${durationObj.hours} ${durationObj.minutes} ${durationObj.seconds}`
      label = humanizedDuration
    } else { // the range_type is distance
      let distance = parseFloat(polygon.properties.value)
      if (distance >= 1000) {
        // when the unit is in meters and very big, we convert it to kilometers
        distance = (distance / 1000).toFixed(1)
        label = `${distance} ${translations.km}`
      } else {
        label = `${polygon.properties.value} ${translations.meters} ${translations.polygon}`
      }
    }
    return label
  },

  /**
   * Merge polygons into one MultiPolygon
   * @param {Array} polygons
   * @returns {Object}
   */
  mergePolygonsIntoMultiPolygon(polygons) {
    const avoidPolygon = {
      type: 'MultiPolygon',
      coordinates: []
    }
    for (let key in polygons) {
      avoidPolygon.coordinates.push(polygons[key].geometry.coordinates)
    }
    return avoidPolygon
  },
  /**
   * Merge polygons into one MultiPolygon
   * @param {Object} multiPolygon
   * @returns {Array} polygons
   */
  splitMultiPolygonIntoPolygons(multiPolygon) {
    let polygons = []
    for (let cKey in multiPolygon.coordinates) {
      let polygon = {
        type: 'Polygon',
        geometry: {
          coordinates: multiPolygon.coordinates[cKey]
        }
      }
      polygons.push(polygon)
    }
    return polygons
  },

  /**
   * Flat polygon coordinates
   * @param {*} coordinates
   */
  flatCoordinates (coordinates) {
    let flatten = []
    if (Array.isArray(coordinates[0]) && Array.isArray(coordinates[0][0])) {
      for (let key in coordinates) {
        flatten = flatten.concat(PolygonUtils.flatCoordinates(coordinates[key]))
      }
    } else {
      flatten = coordinates
    }
    return flatten
  },

  /**
   * Checks if a single point is contained in a polyline or polygon
   * Note that L.Polygon, L.GeodesicPolygons, and L.GeodesicCircles are types of L.Polygon.
   * @param {Leaflet.LatLng} point A geographical point
   * @param {Array} polygonCoords: array of LatLng points
   * @returns {boolean} True if the point is contained in the polygon or polyline; otherwise,
   *
   */
  isInsidePolygon: (point, polygonCoords) => {
    var windingNumber
    let polygon = Leaflet.polygon(polygonCoords)
    let insideBounds = PolygonUtils.isInsidePolygonBounds(point, polygon)

    if (insideBounds) {
      let vertices = polygon.getLatLngs()
      vertices = vertices.length === 1 ? vertices[0] : vertices
      windingNumber = PolygonUtils.getWindingNumber(point, vertices)
      return (windingNumber !== 0)
    } else {
      return false
    }
  },

  /**
   * Determines if a point is inside the polygon bounds
   * @param {Leaflet.latlng} point
   * @param {Leaflet.Polygon} polygon
   * @returns {Boolean} insideBounds
   */
  isInsidePolygonBounds (point, polygon) {
    let polygonBounds = polygon.getBounds()
    let insideBounds = point.lng >= polygonBounds._southWest.lng && point.lng <= polygonBounds._northEast.lng && point.lat > polygonBounds._southWest.lat && point.lat < polygonBounds._northEast.lat
    return insideBounds
  },

  /**
   * Test for a point in a polygon or on the bounding lines of the polygon.  The
   * coordinates (L.LatLng) for a GeodesicPolygon are set to follow the earth's
   * curvature when the GeodesicPolygon object is created.  Since L.Polygon
   * extends Leaflet.Polyline we can use the same method for both.  Although, for
   * L.Polyline, we only get points on the line even if a collection of lines
   * appear to make a polygon.
   *
   * This is a JavaScript and Leaflet port of the `wn_PnPoly()` C++ function by Dan Sunday.
   * Unlike the C++ version, this implementation does include points on the line and vertices.
   *
   * @param p {Leaflet.LatLng} A point.
   * @returns {Number} The winding number (=0 only when the point is outside)
   *
   * @see {@link http://geomalgorithms.com/a03-_inclusion.html Inclusion of a Point in a Polygon} by Dan Sunday.
   * @see {@link https://github.com/Fragger/Leaflet.Geodesic Leaflet.Geodesic} for information about Leaflet.Geodesic by Fragger.
   * @see {@link https://en.wikipedia.org/wiki/Winding_number} to understand winding number
   */
  getWindingNumber: (point, vertices) => {
    var i, isLeftTest, n, wn // the winding number counter

    n = vertices.length
    // Note that per the algorithm, the vertices (V) must be "a vertex points of a polygon V[n+1] with V[n]=V[0]"
    if (n > 0 && !(vertices[n - 1].lat === vertices[0].lat && vertices[n - 1].lng === vertices[0].lng)) {
      vertices.push(vertices[0])
    }
    n = vertices.length - 1
    wn = 0
    for (i = 0; i < n; i++) {
      isLeftTest = GeoUtils.isOverLine(vertices[i], vertices[i + 1], point)
      if (isLeftTest === 0) { // If the point is on a line, we are done.
        wn = 1
        break
      } else {
        if (isLeftTest !== 0) { // If not a vertex or on line (the C++ version does not check for this)
          if (vertices[i].lat <= point.lat) {
            if (vertices[i + 1].lat > point.lat) { // An upward crossing
              if (isLeftTest > 0) { // P left of edge
                wn++ // have a valid up intersect
              }
            }
          } else {
            if (vertices[i + 1].lat <= point.lat) { // A downward crossing
              if (isLeftTest < 0) { // P right of edge
                wn-- // have a valid down intersect
              }
            }
          }
        } else {
          wn++
        }
      }
    }
    return wn
  }
}

export default PolygonUtils
