import RouteData from '@/support/map-data-services/ors-response-data-extractors/route-data'
import OrsResponseExtractorBuilder from '@/support/map-data-services/ors-response-data-extractors/ors-response-extractor-builder'
import FileExtractorBuilder from '@/support/map-data-services/file-data-extractors/file-extractor-builder'
import constants from '@/resources/constants'

class MapViewDataBuilder {
  constructor (rawData, options = {}) {
    this.mapRawData = rawData
    this.dataOrigin = options.origin
    this.contentType = options.contentType
    this.apiVersion = options.apiVersion
    this.translations = options.translations
    this.options = options
  }
  /**
   * Build and returns map data
   * @returns {Promise} with MapViewData @see @/models/map-view-data
   */
  buildMapViewData = () => {
    this.setMapExtractorBuilder()
    let context = this
    return new Promise((resolve, reject) => {
      let sourceType = this.getSourceType()
      if (sourceType) {
        context.mapDataBuilder.buildMapData(sourceType, this.apiVersion).then(mapViewData => {
          resolve(mapViewData)
        }).catch(error => {
          reject(error)
        })
      }
    })
  }
  /**
   * Get the response type, considering the endpoint and the response formart
   * It is used to determin the map data extractor that is gonna be used
   * to extract the data from the rsponse and render it
   */
  getSourceType = () => {
    let sourceType
    if (this.dataOrigin && this.dataOrigin === constants.dataOrigins.fileImporter) {
      return this.dataOrigin
    } else {
      sourceType = RouteData.getSourceType(this.dataOrigin, this.mapRawData)
    }
    return sourceType
  }

  /**
   * Define the map builder instance according the current response, request and api version
   */
  setMapExtractorBuilder = () => {
    let sourceType = this.getSourceType()

    // If we have a valid source type
    if (sourceType) {
      let data = {
        mapRawData: this.mapRawData,
        dataOrigin: this.dataOrigin,
        translations: this.translations,
        options: this.options
      }
      if (sourceType === constants.dataOrigins.fileImporter) {
        this.mapDataBuilder = new FileExtractorBuilder(this.contentType, data)
      } else {
        this.mapDataBuilder = new OrsResponseExtractorBuilder(sourceType, data, this.apiVersion)
      }
    } else {
      console.error('Invalid source type for map extractor builder')
    }
  }

  /**
   * Build the mapViewData object
   * @param {*} data {content:..., options:...}
   * @emits mapViewDataChanged - using eventBus
   */
  static buildMapData = (data, appRouteData) => {
    let rawContent = data.content
    let options = data.options
    let mapViewDataBuilder = new MapViewDataBuilder(rawContent, options)

    return new Promise((resolve, reject) => {
      mapViewDataBuilder.buildMapViewData().then((mapViewData) => {
        // The places in appRouteData alreay contains the placeName, so we use it
        // to avoid having to resolve each place coordinates to a placeName again
        // If there is no places in appRouteData (dealing with a route import, for example)
        // nothing happens because appRouteData.places will be an empty array
        for (let key in appRouteData.places) {
          if (mapViewData.places[key]) {
            mapViewData.places[key].placeName = appRouteData.places[key].placeName
          }
        }

        // Merge the app route data options with the map view data to
        // keep the view data synced with the app url state
        Object.assign(mapViewData.options, appRouteData.options)
        resolve(mapViewData)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default MapViewDataBuilder
