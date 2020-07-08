import {Directions} from '@/support/ors-api-runner'
import OrsParamsParser from '@/support/map-data-services/ors-params-parser'
import toGpx from 'togpx'
import toKml from 'tokml'
import MapViewData from '@/models/map-view-data'

export default {
  data: () => ({
    isDownloadModalOpen: false,
    downloadFileName: null,
    dowloadFormat: null,
    downloadFormats: [
      {text: 'Raw JSON', value: 'json', ext: 'json'},
      {text: 'ORS API GPX', value: 'ors-gpx', ext: 'gpx'},
      {text: 'Standard GPX', value: 'to-gpx', ext: 'gpx'},
      {text: 'KML', value: 'kml', ext: 'kml'}
    ]
  }),
  props: {
    mapViewData: {
      Type: MapViewData,
      Required: true
    },
    requestArgs: {
      Type: Object,
      Required: true
    },
    downloadFormatsSupported: {
      Type: Array,
      default: function () {
        return ['json', 'ors-gpx', 'to-gpx', 'gpx', 'kml']
      }
    }
  },
  created () {
    console.log('created download')
  },
  computed: {
    /**
     * Return the name of the route first's point
     * @returns string
     */
    originName () {
      let origin = this.mapViewData.places[0]
      return origin ? origin.placeName : ''
    },
    /**
     * Return the name of the route last's point
     * @returns string
     */
    destinationName () {
      let destination = this.mapViewData.places[this.mapViewData.places.length - 1]
      return destination ? destination.placeName : ''
    },
    availableDownloadFormats () {
      let context = this
      let available = this.lodash.filter(this.downloadFormats, (f) => {
        return context.downloadFormatsSupported.includes(f.value)
      })
      return available
    }
  },
  methods: {
    /**
     * Set the default filename and format and open the dowload modal
     */
    openDownload () {
      this.downloadFileName = 'ors-route'
      this.dowloadFormat = this.downloadFormats[0].value
      this.isDownloadModalOpen = true
    },
    /**
     * Close the download modal
     */
    closeDownload () {
      this.isDownloadModalOpen = false
    },
    /**
     * Build the string download content and force a native browser download
     */
    download () {
      let context = this

      this.showInfo(this.$t('download.preparingDownload'), {timeout: 0})
      this.buildContent().then((content) => {
        // The way to force a native browser download of a string is by
        // creating a hidden anchor and setting its href as a data text
        let link = document.createElement('a')
        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content)

        // check if it has reached the max lenght
        if (link.href.length > 2097152) {
          this.showError(this.$t('download.fileTooBigToBeDowloaded'), {timeout: 2000})
        } else {
          // Set the filename
          let timestamp = new Date().getTime()
          let format = context.lodash.find(context.downloadFormats, (df) => { return df.value === context.dowloadFormat })
          link.download = `${context.downloadFileName}_${timestamp}.${format.ext}`

          // Fire the download by triggering a click on the hidden anchor
          document.body.appendChild(link)
          link.click()
          link.remove()
          this.showSuccess(this.$t('download.fileReady'), {timeout: 2000})
        }
      }).catch(error => {
        console.error(error)
        this.showError(this.$t('download.errorPreparingFile'), {timeout: 2000})
      })
    },
    /**
     * Build the content to be dowloaded according the format selected
     * When the format is ors-gpx a new request is made using the same
     * args object but changint the format to gpx
     * @returns {Promise}
     */
    buildContent () {
      let jsonData
      let context = this
      return new Promise((resolve, reject) => {
        try {
          if (context.dowloadFormat === 'json') {
            // Get the ORS routes json and stringfy it
            jsonData = this.mapViewData
            let geojsonStr = JSON.stringify(jsonData)
            resolve(geojsonStr)
          } else if (context.dowloadFormat === 'ors-gpx') {
            // If the format is ors-gpx, run anew request with the format being 'gpx'
            context.getORSGpx().then((orsGpx) => {
              resolve(orsGpx)
            }).catch(error => {
              reject(error)
            })
          } else if (context.dowloadFormat === 'to-gpx') {
            jsonData = this.getGeoJson()
            // Use the third party utility to convert geojson to gpx
            let togpx = toGpx(jsonData)
            resolve(togpx)
          } else if (context.dowloadFormat === 'kml') {
            let routeTitle = context.originName.length > 0 ? `${context.originName} -> ${context.destinationName}` : context.$t('download.documentTitle')
            let kmlOptions = {
              documentName: routeTitle,
              documentDescription: context.$t('download.documentDescription')
            }
            jsonData = context.getGeoJson()
            // Use the third party utility to convert geojson to kml
            let tokml = toKml(jsonData, kmlOptions)
            resolve(tokml)
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
     * Get the geojson from a ors routes json object
     * @returns {Object} geojson
     */
    getGeoJson () {
      let geoJsonData = { type: 'FeatureCollection', features: [] }

      for (let key in this.mapViewData.routes) {
        let feature = {
          type: 'Feature',
          properties: { id: key },
          geometry: {
            type: 'LineString',
            coordinates: this.mapViewData.routes[key].geometry.coordinates
          }
        }
        geoJsonData.features.push(feature)
      }
      return geoJsonData
    },

    /**
     * Get the ors gpx text running a new request
     * using the same args but changing the format to `gpx`
     * @returns {Promise}
     */
    getORSGpx () {
      let context = this
      return new Promise((resolve, reject) => {
        // Build the args for a directions api request
        let args = OrsParamsParser.buildRoutingArgs(context.mapViewData.places)
        // merge the args with the ones applied in the user request
        args = Object.assign(args, context.mapViewData.rawData.metadata.query)

        // Make sure a gpx format will be returnned
        args.format = 'gpx'

        Directions(context.mapViewData.places, args).then(response => {
          resolve(response)
        }).catch(result => {
          console.log(result)
        })
      })
    }
  }
}
