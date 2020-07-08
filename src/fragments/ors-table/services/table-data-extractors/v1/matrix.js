import VueInstance from '@/main'
/**
 * MatrixBuilder table data Builder class
 * @param {*} data {responseData: {}, translations: {}}
 */
class MatrixBuilder {
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
      tableData.columns = []

      if (this.responseData.durations && this.responseData.distances) {
        tableData.columns.push(['distances', 'durations'])
      } else {
        if (this.responseData.durations) {
          tableData.columns.push('durations')
        } else {
          tableData.columns.push('distances')
        }
      }

      context.responseData.destinations.forEach((destination) => {
        tableData.columns.push(`${destination.location[0]}, ${destination.location[1]}`)
      })

      tableData.rows = this.getRows()
      tableData.initialRowValuesSource = 'distances'

      resolve(tableData)
    })
  }

  /**
   * Get the array of rows to be populated to the table
   * Can return an array, if only one source is available
   * or an object with the durations and distances props containing
   * in each one, an array of rows
   *
   * @returns {Array|Object}
   * @memberof MatrixBuilder
   */
  getRows () {
    let rows
    if (this.responseData.durations && this.responseData.distances) {
      rows = {}
      rows.durations = this.getDurationsRows()
      rows.distances = this.getDistanceRows()
    } else {
      if (this.responseData.durations) {
        rows = this.getDurationsRows()
      } else {
        rows = this.getDistanceRows()
      }
    }
    return rows
  }

  /**
   * Get the duration rows to be populated to the table
   *
   * @returns {Array}
   * @memberof MatrixBuilder
   */
  getDurationsRows () {
    let rows = []
    this.responseData.sources.forEach((source, index) => {
      let row = []
      // Add the location lat-lon as a first value in the row
      row.push(`${source.location[0]}, ${source.location[1]}`)
      // Add the durations
      let rowValues = VueInstance.lodash.map(this.responseData.durations[index], (value) => {
        return `${value} ${this.translations.sec}`
      })
      row = row.concat(rowValues)
      rows.push(row)
    })
    return rows
  }

   /**
   * Get the distance rows to be populated to the table
   *
   * @returns {Array}
   * @memberof MatrixBuilder
   */
  getDistanceRows () {
    let rows = []
    this.responseData.sources.forEach((source, index) => {
      let row = []
      // Add the location lat-lon as a first value in the row
      row.push(`${source.location[0]}, ${source.location[1]}`)
      // Add the distances
      let rowValues = VueInstance.lodash.map(this.responseData.distances[index], (value) => {
        return `${value} ${this.responseData.info.query.units}`
      })
      row = row.concat(rowValues)
      rows.push(row)
    })
    return rows
  }
}

// export the directions json builder class
export default MatrixBuilder
