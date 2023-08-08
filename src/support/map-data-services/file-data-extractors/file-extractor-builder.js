import xmlImporter from './file-extractors/xml-file-importer'
import gpxImporter from './file-extractors/gpx-file-importer'
import jsonImporter from './file-extractors/json-file-importer'
import geojsonImporter from './file-extractors/geojson-file-importer'
import kmlImporter from './file-extractors/kml-file-importer'

/**
 * Map data Builder class
 * @param {*} data {responseData: {}, requestData: {}, apiVersion: String, translations: {}}
 */
class FileExtractorBuilder {
  constructor (fileType, data) {
    this.dataBuilder = FileExtractorBuilder.getFileDataExtractor(data, fileType)
  }

  /**
   * Build the map data for the target strategy, using the appropriate builder
   * @returns {Promise} that returns in the resolve mapData object
   */
  buildMapData = () => {
    return this.dataBuilder.buildMapData()
  }

  /**
   * Get the map data extractor based on the current selected api version
   *
   * @param String builderName
   * @param data {responseData: {}, requestData: {}, translations: {}}
   * @param  apiVersion {String}
   * @returns {*} Map data extractor instance
   */
  static getFileDataExtractor = (data, fileType) => {
    const fileExtractors = {
      xmlImporter,
      gpxImporter,
      jsonImporter,
      geojsonImporter,
      kmlImporter
    }
    const fileExtractorName = `${fileType}Importer`
    return new fileExtractors[fileExtractorName](data)
  }
}

// export the request builder class
export default FileExtractorBuilder
