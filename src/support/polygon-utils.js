import htmlColors from 'html-colors'

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
    let names = htmlColors.names() // Get an array containing all colors names
    let color = htmlColors.hex(names[index + 6])
    return color
  },
  /**
   * Build polygon label
   * @param {Number} index
   * @returns {String} label
   */
  buildPolygonLabel (polygon, translations) {
    let unit = polygon.properties.range_type === 'time' ? translations.seconds : translations.meters
    let label = `${polygon.properties.value} ${unit} ${translations.polygon}`
    return label
  }
}

export default PolygonUtils
