import OrsParamsParser from '@/support/map-data-services/ors-params-parser'
import { Directions } from '@/support/ors-api-runner'
import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
import toKml from '@maphubs/tokml'
import toGpx from 'togpx'

export default {
  data: () => ({
    isDownloadModalOpen: false,
    downloadFileName: null,
    downloadFormat: null,
    defaultDownloadName: 'ors-route'
  }),
  props: {
    mapViewData: {
      Type: MapViewData,
      Required: true
    },
    downloadFormatsSupported: {
      Type: Array,
      default: function () {
        return ['json', 'ors-gpx', 'geojson', 'to-gpx', 'kml']
      }
    }
  },
  computed: {
    downloadFormats () {
      return [
        { text: 'ORS JSON', value: 'json', ext: 'json' },
        { text: 'GeoJSON', value: 'geojson', ext: 'json' },
        { text: 'ORS API GPX', value: 'ors-gpx', ext: 'gpx' },
        { text: `${this.$t('download.standard')} GPX`, value: 'to-gpx', ext: 'gpx' },
        { text: 'KML', value: 'kml', ext: 'kml' }
      ]
    },
    /**
     * Return the name of the route first's point
     * @returns string
     */
    originName () {
      const origin = this.mapViewData.places[0]
      return origin ? origin.placeName : ''
    },
    /**
     * Return the name of the route last's point
     * @returns string
     */
    destinationName () {
      const destination = this.mapViewData.places.at(-1)
      return destination ? destination.placeName : ''
    },
    availableDownloadFormats () {
      const context = this
      const available = this.lodash.filter(this.downloadFormats, (f) => {
        return context.downloadFormatsSupported.includes(f.value)
      })
      return available
    }
  },
  methods: {
    /**
     * Set the default filename and format and open the download modal
     */
    openDownload () {
      this.downloadFileName = this.defaultDownloadName
      this.downloadFormat = this.downloadFormats[0].value
      this.isDownloadModalOpen = true
    },
    /**
     * Close the download modal
     * @emits downloadClosed
     */
    closeDownload () {
      this.isDownloadModalOpen = false
      this.$emit('downloadClosed')
    },
    /**
     * Build the string download content and force a native browser download
     */
    download () {
      const context = this

      this.showInfo(this.$t('download.preparingDownload'), { timeout: 0 })
      this.buildContent().then((content) => {
        // The way to force a native browser download of a string is by
        // creating a hidden anchor and setting its href as a data text
        const anchor = document.createElement('a')
        anchor.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content)

        // Check if it has reached the max length
        if (anchor.href.length > 2097152) {
          context.showError(context.$t('download.fileTooBigToBeDownloaded'), { timeout: 2000 })
        } else {
          // Set the filename
          const timestamp = new Date().getTime()
          const format = context.lodash.find(context.downloadFormats, (df) => { return df.value === context.downloadFormat })
          // If the file has the default name, add a unique timestamp
          if (context.downloadFileName === context.defaultDownloadName) {
            anchor.download = `${context.downloadFileName}_${timestamp}.${format.ext}`
          } else {
            anchor.download = `${context.downloadFileName}.${format.ext}`
          }

          // Fire the download by triggering a click on the hidden anchor
          //document.body.appendChild(anchor)
          context.$refs.downloadContainer.appendChild(anchor)
          anchor.click()
          anchor.remove()
          context.showSuccess(context.$t('download.fileReady'), { timeout: 2000 })
          context.closeDownload()
        }
      }).catch(error => {
        console.error(error)
        context.showError(context.$t('download.errorPreparingFile'), { timeout: 2000 })
      })
    },
    /**
     * Build the content to be downloaded according the format selected
     * When the format is ors-gpx a new request is made using the same
     * args object but changing the format to gpx
     * @returns {Promise}
     */
    buildContent () {
      let jsonData
      const context = this
      return new Promise((resolve, reject) => {
        try {
          if (context.downloadFormat === 'json') {
            // Get the ORS mapViewData model and stringify it
            const orsJSONStr = JSON.stringify(context.mapViewData)
            resolve(orsJSONStr)
          } else if (context.downloadFormat === 'ors-gpx') {
            // If the format is ors-gpx, run anew request with the format being 'gpx'
            context.getORSGpx().then((orsGpx) => {
              resolve(orsGpx)
            }).catch(error => {
              reject(error)
            })
          } else if (context.downloadFormat === 'to-gpx') {
            const geoJSON = context.mapViewData.getGeoJson()
            // Use the third party utility to convert geojson to gpx
            const toGPX = toGpx(geoJSON)
            resolve(toGPX)
          } else if (context.downloadFormat === 'geojson') {
            jsonData = context.mapViewData.getGeoJson()
            const jsonStr = JSON.stringify(jsonData)
            resolve(jsonStr)
          } else if (context.downloadFormat === 'kml') {
            const routeTitle = context.originName.length > 0 ? `${context.originName} -> ${context.destinationName}` : context.$t('download.documentTitle')
            const kmlOptions = {
              documentName: routeTitle,
              documentDescription: constants.orsKmlDocumentDescription
            }
            jsonData = context.mapViewData.getGeoJson()
            // Use the third party utility to convert geojson to kml
            const toKML = toKml(jsonData, kmlOptions)
            resolve(toKML)
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    /**
     * Get the response data routes and make sure that the geometry format is geojson
     * @returns {Array} of route objects
     */
    getOrsRoutesJson () {
      let orsRoutes = []
      // Retrieve the route data
      if (this.mapViewData && this.mapViewData.routes) {
        orsRoutes = Object.assign({}, this.mapViewData.routes)
      }
      return orsRoutes
    },

    /**
     * Get the ors gpx text running a new request
     * using the same args but changing the format to `gpx`
     * @returns {Promise}
     */
    getORSGpx () {
      const context = this
      return new Promise((resolve) => {
        // Build the args for a directions api request
        let args = OrsParamsParser.buildRoutingArgs(context.mapViewData.places)
        // merge the args with the ones applied in the user request
        args = Object.assign(args, context.mapViewData.rawData.metadata.query)

        // Make sure a gpx format will be returned
        args.format = 'gpx'

        Directions(context.mapViewData.places, args).then(response => {
          resolve(response.content)
        }).catch(result => {
          console.log(result)
        })
      })
    }
  }
}
