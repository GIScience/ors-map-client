import OrsParamsParser from '@/support/map-data-services/ors-params-parser'
import {Directions} from '@/support/ors-api-runner'
import MapViewData from '@/models/map-view-data'
import Job from '@/models/job'
import Vehicle from '@/models/vehicle'
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
      Required: false
    },
    data: {
      Type: Array,
      Required: false
    },
    editProp: {
      Type: String,
      Required: false
    },
    downloadFormatsSupported: {
      Type: Array,
      default: function () {
        return ['json', 'ors-gpx', 'geojson', 'to-gpx', 'kml', 'csv']
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
        { text: 'KML', value: 'kml', ext: 'kml' },
        { text: 'CSV', value: 'csv', ext: 'csv'}
      ]
    },
    content () {
      if (this.editProp === 'jobs') {
        return {
          copied: this.$t('download.jobsCopiedToClipboard'),
          fileName: 'ors-jobs',
        }
      } else if (this.editProp === 'vehicles') {
        return {
          copied: this.$t('download.vehiclesCopiedToClipboard'),
          fileName: 'ors-vehicles',
        }
      } else if (this.editProp === 'skills') {
        return {
          copied: this.$t('download.skillsCopiedToClipboard'),
          fileName: 'ors-skills',
        }
      } else {
        return {
          fileName: this.defaultDownloadName,
        }
      }
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
      return this.lodash.filter(this.downloadFormats, (f) => {
        return context.downloadFormatsSupported.includes(f.value)
      })
    },
    // low priority TODO: read jobs and vehicles out of MapView data instead of prop
    dataJson () {
      const jsonData = []
      for (const d of this.data) {
        jsonData.push(d.toJSON())
      }
      return jsonData
    },
    dataGeoJson () {
      if (this.editProp === 'skills') {
        return Error('GeoJSON cannot be created since skills contain no geoinformation')
      }
      const jsonData = []
      for (const d of this.data) {
        jsonData.push(d.toGeoJSON())
      }
      return { type: 'FeatureCollection', features: jsonData }
    },
  },
  methods: {
    /**
     * Set the default filename and format and open the download modal
     */
    openDownload () {
      this.downloadFileName = this.content.fileName
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
          switch (context.downloadFormat) {
            case 'json':
              // Get the ORS mapViewData model and stringify it
              if (this.mapViewData) {
                jsonData = JSON.stringify(this.parseMapView(context.mapViewData))
              } else {
                jsonData = JSON.stringify(context.dataJson)
              }
              resolve(jsonData)
              break
            case 'ors-gpx':
              // If the format is ors-gpx, run anew request with the format being 'gpx'
              context.getORSGpx().then((orsGpx) => {
                resolve(orsGpx)
              }).catch(error => {
                reject(error)
              })
              break
            case 'to-gpx':
              // Use the third party utility to convert geojson to gpx
              resolve(toGpx(context.mapViewData.getGeoJson()))
              break
            case 'geojson':
              if (this.mapViewData) {
                jsonData = context.mapViewData.getGeoJson()
              } else {
                jsonData = context.dataGeoJson
              }
              resolve(JSON.stringify(jsonData))
              break
            case 'kml':
              resolve(this.buildKmlData())
              break
            case 'csv':
              resolve(this.buildCsvData())
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    buildKmlData() {
      const routeTitle = this.originName.length > 0 ? `${this.originName} -> ${this.destinationName}` : this.$t('download.documentTitle')
      const kmlOptions = {
        documentName: routeTitle,
        documentDescription: constants.orsKmlDocumentDescription
      }
      let jsonData = this.mapViewData.getGeoJson()
      // Use the third party utility to convert geojson to kml
      return toKml(jsonData, kmlOptions)
    },
    buildCsvData() {
      let csvData
      if (this.editProp === 'jobs') {
        csvData = Job.toCsv(this.data)
      } else if (this.editProp === 'vehicles') {
        csvData = Vehicle.toCsv(this.data)
      }
      return csvData
    },
    parseMapView (mapViewData) {
      let localMapViewData = mapViewData.clone()

      if (mapViewData.mode === constants.modes.optimization) {
        let jsonJobs = []
        for (const job of mapViewData.jobs) {
          jsonJobs.push(job.toJSON())
        }
        localMapViewData.jobs = jsonJobs

        let jsonVehicles = []
        for (const v of mapViewData.vehicles) {
          jsonVehicles.push(v.toJSON())
        }
        localMapViewData.vehicles = jsonVehicles
      }

      return localMapViewData
    },

    copyToClipboard () {
      const data = this.dataJson

      navigator.clipboard.writeText(JSON.stringify(data)).then(() => {
        this.showSuccess(this.content.copied, {timeout: 3000})
      }, () => {
        this.showError(this.$t('download.copiedToClipboardFailed'), {timeout: 3000})
      },)
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
