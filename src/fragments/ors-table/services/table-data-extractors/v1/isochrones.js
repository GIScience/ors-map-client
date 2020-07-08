/**
 * IsochronesBuilder table data Builder class
 * @param {*} data {responseData: {}, translations: {}}
 */

class IsochronesBuilder {
  constructor (data) {
    this.responseData = data.responseData
    this.translations = data.translations
  }

  /**
   * Build the table data for isochrones
   * @returns {Promise} that returns in the resolve mapData object
   */
  buildTableData = () => {
    let tableData = {}
    let context = this
    return new Promise((resolve) => {
      tableData.columns = [this.translations.type, this.translations.value, this.translations.geometry, this.translations.properties]

      tableData.rows = []
      context.responseData.features.forEach((feature) => {
        let value = context.humanizedValue(feature.properties.value)
        tableData.rows.push([feature.geometry.type, value, feature.geometry.coordinates, feature.properties])
      })

      resolve(tableData)
    })
  }

  humanizedValue = (value) => {
    // if the unit was not present in the query, `meters` is the default unit
    let distanceUnit = this.responseData.info.query.units || this.translations.meters
    // if is distance, use the distance unit, if is `time`, the value will always be in seconds
    let unit = this.responseData.info.query.range_type === 'distance' ? distanceUnit : this.translations.sec
    return `${value} ${unit}`
  }
}

// export the directions json builder class
export default IsochronesBuilder
