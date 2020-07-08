import MatrixDataBuilderV1 from './table-data-extractors/v1/matrix'
import IsochronesDataBuilderV1 from './table-data-extractors/v1/isochrones'

/**
 * Map data Builder class
 * @param {*} data {responseData: {}, endpoint: {String}, apiVersion: String, translations: {}}
 */
class TableDataBuilder {
  constructor (data) {
    this.dataBuilder = TableDataBuilder.getTableDataBuilder(data)
  }

  static getTableDataBuilder (data) {
    switch (data.endpoint) {
      case '/matrix':
        return TableDataBuilder.getTableDataExtractor('MatrixDataBuilder', data)
      case '/isochrones':
        return TableDataBuilder.getTableDataExtractor('IsochronesDataBuilder', data)
    }
  }

  /**
   * Build the map data for the target strategy, using the appropriate builder
   * @returns {Promise} that returns in the resolve mapData object
   */
  buildTableData = () => {
    return this.dataBuilder.buildTableData()
  }

  /**
   * Get the map data extractor based on the current selected api version
   *
   * @param String builderName
   * @param data {responseData: {}, requestData: {}, translations: {}, apiVersion: String}
   * @returns {*} Table data extractor instance
   */
  static getTableDataExtractor = (extractorName, data) => {
    // This is a dictionary that translates
    // the API version to an extractor version
    let apiVersionToExtractorVersionDictionary = {
      '4.5': 'V1',
      '4.7': 'V1'
    }

    // In this constant we have to add all the map extractors
    // for all the cases in all versions
    const extractors = {
      MatrixDataBuilderV1,
      IsochronesDataBuilderV1
      // we can add more versions here in the future
    }

    // Get the right extractor based on the extractor name
    // and on the api version from the extractors list
    let extractorNameWithVersion = extractorName + apiVersionToExtractorVersionDictionary[data.apiVersion]
    let extractor = new extractors[extractorNameWithVersion](data)
    return extractor
  }

  /**
   * Determines if the ors table component has support
   * for given endpoint
   *
   * @static
   * @param {object} data {responseData: {}, endpoint: {String}, apiVersion: String}
   * @memberof TableDataBuilder
   */
  static hasTableBuilderFor = (data) => {
    let builder = TableDataBuilder.getTableDataBuilder(data)
    return builder !== null && builder !== undefined
  }
}

// export the request builder class
export default TableDataBuilder
