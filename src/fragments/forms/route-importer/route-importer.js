import vueDropzone from 'vue2-dropzone'
import constants from '@/resources/constants'
import MapFormBtn from '@/fragments/forms/map-form-btn/MapFormBtn.vue'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  data: () => ({
    isImportModalOpen: false
  }),
  computed: {
    dropzoneOptions () {
      return {
        maxFilesize: 0.5,
        url: 'https://not-used-url.tld', // declaration required by the component, but never used
        uploadMultiple: false,
        maxFiles: 1,
        clickable: true,
        acceptedFiles: '.json,.kml,.gpx',
        dictDefaultMessage: this.$t('routeImporter.dictDefaultMessage'),
        dictFallbackMessage: this.$t('routeImporter.dictFallbackMessage'),
        dictFileTooBig: this.$t('routeImporter.dictFileTooBig'),
        dictInvalidFileType: this.$t('routeImporter.dictInvalidFileType'),
        dictCancelUpload: this.$t('routeImporter.dictCancelUpload'),
        dictUploadCanceled: this.$t('routeImporter.dictUploadCanceled'),
        dictRemoveFile: this.$t('routeImporter.dictRemoveFile')
      }
    }
  },
  components: {
    vueDropzone,
    MapFormBtn
  },

  methods: {
    /**
     * Handle the file added event
     * @param {*} file
     */
    fileAdded (file) {
      const context = this
      var reader = new FileReader()
      reader.addEventListener('loadend', function (event) {
        const content = event.target.result
        if (!content || content === 'null') {
          context.showError(context.$t('routeImporter.failedToLoadFile'), 20000)
        } else {
          context.catchAndParseFile(content, file.type, file.lastModified)
          context.isImportModalOpen = false
        }
      })
      this.$refs.importRouteDropzone.removeAllFiles()
      reader.readAsText(file)
    },
    /**
     * Catch file contents and type, parse and call load
     * @param {*} fileContent
     * @param {*} type
     */
    catchAndParseFile (fileContent, type, timestamp) {
      let fileType = ''
      if (type.indexOf('kml') > -1) {
        fileType = 'kml'
      } else if (type.indexOf('gpx') > -1 || fileContent.startsWith('<gpx')) {
        fileType = 'gpx'
      } else if (fileContent.startsWith('<?xml')) {
        fileType = 'xml'
      } else if (type === 'application/json') {
        const parsedJson = JSON.parse(fileContent)
        if (parsedJson && parsedJson.features) {
          fileType = 'geojson'
        } else {
          fileType = 'json'
        }
      }
      this.sendDataToMap(fileType, fileContent, timestamp)
      this.closeImporter()
    },

    /**
     * Send new map data via eventBus to ors-map
     * @emits mapViewDataChanged via eventBus passing fileType and fileContent
     * @param {*} fileType
     * @param {*} fileContent
     * @param {*} timestamp
     */
    sendDataToMap (fileType, fileContent, timestamp) {
      const data = {
        content: fileContent,
        options: { origin: constants.dataOrigins.fileImporter, contentType: fileType, timestamp: timestamp }
      }
      this.$emit('contentUploaded', data)
    },

    /**
     * Show the import dialog
     */
    openImporter () {
      this.isImportModalOpen = true
    },
    /**
     * Hide the import dialog
     */
    closeImporter () {
      this.isImportModalOpen = false
    }
  }
}
