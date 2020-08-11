import DirectionsJSONDataBuilderV2 from './response-extractors/v2/directions-json'
import GeocodeSearchBuilderV2 from './response-extractors/v2/geocode-search'
import GeocodeReverseBuilderV2 from './response-extractors/v2/geocode-reverse'
import IsochronesBuilderV2 from './response-extractors/v2/isochrones'
import PoisBuilderV2 from './response-extractors/v2/pois'

/**
 * Map data Builder class
 * @param {*} data {responseData: {}, requestData: {}, apiVersion: String, translations: {}}
 */
class OrsResponseExtractorBuilder {
  constructor (dataFromType, data, apiVersion) {
    this.dataFromType = dataFromType
    this.apiVersion = apiVersion
    this.dataBuilder = OrsResponseExtractorBuilder.getMapDataBuilder(dataFromType, data, apiVersion)
  }

  /**
   * Build the map data for the target strategy, using the appropriate builder
   * @returns {Promise} that returns in the resolve mapData object
   */
  buildMapData = () => {
    return this.dataBuilder.buildMapData()
  }

  /**
   * Get the target map builder for a given result type, data and api version
   *
   * @static
   * @param {*} dataFromType
   * @param {*} data
   * @param {*} apiVersion
   * @returns
   * @memberof MapDataBuilder
   */
  static getMapDataBuilder (dataFromType, data, apiVersion) {
    switch (dataFromType) {
      case 'directionsJSON':
        return OrsResponseExtractorBuilder.getMapDataExtractor('DirectionsJSONDataBuilder', data, apiVersion)
      case 'geocodeSearch':
        return OrsResponseExtractorBuilder.getMapDataExtractor('GeocodeSearchBuilder', data, apiVersion)
      case 'geocodeReverse':
        return OrsResponseExtractorBuilder.getMapDataExtractor('GeocodeReverseBuilder', data, apiVersion)
      case 'isochrones':
        return OrsResponseExtractorBuilder.getMapDataExtractor('IsochronesBuilder', data, apiVersion)
      case 'pois':
        return OrsResponseExtractorBuilder.getMapDataExtractor('PoisBuilder', data, apiVersion)
    }
  }

  /**
   * Get the map data extractor based on the current selected api version
   *
   * @param String builderName
   * @param data {responseData: {}, requestData: {}, translations: {}}
   * @param  apiVersion {String}
   * @returns {*} Map data extractor instance
   */
  static getMapDataExtractor = (extractorName, data, apiVersion) => {
    // This is a dictionary that translates
    // the API version to an extractor version
    const apiVersionToExtractorDictionary = {
      '5.0': 'V2'
    }

    // In this constant we have to add all the map extractors
    // for all the cases in all versions
    const extractors = {
      DirectionsJSONDataBuilderV2,
      GeocodeSearchBuilderV2,
      GeocodeReverseBuilderV2,
      IsochronesBuilderV2,
      PoisBuilderV2
      // we can add more versions here in the future
    }

    // Get the right extractor based on the extractor name
    // and on the api version from the extractors list
    const extractorNameWithVersion = extractorName + apiVersionToExtractorDictionary[apiVersion]
    const builderInputData = {
      responseData: data.mapRawData,
      requestData: data.dataOrigin,
      translations: data.translations
    }
    const extractorInstance = new extractors[extractorNameWithVersion](builderInputData)
    return extractorInstance
  }

  /**
   * Determines if the ors map component has support
   * for given endpoint
   *
   * @static
   * @param {*} data {responseData: {}, requestData: {}, apiVersion: String}
   * @memberof TableDataBuilder
   */
  static hasMapBuilderFor = (dataFromType, data, apiVersion) => {
    const builder = OrsResponseExtractorBuilder.getMapDataBuilder(dataFromType, data, apiVersion)
    return builder !== null && builder !== undefined
  }
}

// export the request builder class
export default OrsResponseExtractorBuilder
