import htmlColors from 'html-colors'
import GeoUtils from '@/support/geo-utils'

const PolygonUtils = {
  /**
   * Get polygon color
   * @param {Number} index
   * @returns {String} color
   */
  buildPolygonColor (index) {
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
  buildPolygonLabel (polygon, translations) {
    let label = ''
    if (polygon.properties.range_type === 'time') {
      const durationObj = GeoUtils.getDurationInSegments(polygon.properties.value, translations)
      const humanizedDuration = `${durationObj.days} ${durationObj.hours} ${durationObj.minutes} ${durationObj.seconds}`
      label = `${humanizedDuration} ${translations.polygon}`
    } else { // the range_type is distance
      let distance = parseFloat(polygon.properties.value)
      if (distance >= 1000) {
        // when the unit is in meters and very big, we convert it to kilometers
        distance = (distance / 1000).toFixed(1)
        label = `${distance} ${translations.km} ${translations.polygon}`
      } else {
        label = `${polygon.properties.value} ${translations.meters} ${translations.polygon}`
      }
    }
    return label
  },

  /**
   * Merge polygons into one multipolygon
   * @param {Array} polygons 
   * @returns {Object}
   */
  mergePolygonsIntoMultiPolygon (polygons) {
    const avoidPolygon = { type: 'MultiPolygon', coordinates: [] }

    let coordinates = []
    for (let key in polygons) {
      avoidPolygon.coordinates.push(polygons[key].geometry.coordinates)
    }
    return avoidPolygon
  },
  /**
   * Merge polygons into one multipolygon
   * @param {Object} multiPolygon 
   * @returns {Array} polygons
   */
  splitMultiPolygonIntoPolygons (multiPolygon) {
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
  }
}

export default PolygonUtils
