import vueDropzone from 'vue2-dropzone'
import constants from '@/resources/constants'
import MapFormBtn from '@/fragments/forms/map-form-btn/MapFormBtn.vue'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Job from '@/models/job'
import Vehicle from '@/models/vehicle'
import Skill from '@/models/skill'

export default {
  data: () => ({
    isImportOpen: true,
    acceptedFiles: '.json,.csv,.geojson',
    pastedData: [],
  }),
  props: {
    expectedData: {
      Type: String,
      Required: true
    },
  },
  components: {
    vueDropzone,
    MapFormBtn
  },
  computed: {
    content () {
      if (this.expectedData === 'jobs') {
        return {
          header: this.$t('optimization.importJobFile'),
          saveImport: this.$t('optimizationImport.saveJobImport'),
          jsonPlaceholder: '[{"id":1,"location":[8.68525,49.420822],"service":300,"delivery":[1],"skills":[1]}]',
        }
      } else if (this.expectedData === 'vehicles') {
        return {
          header: this.$t('optimization.importVehicleFile'),
          saveImport: this.$t('optimizationImport.saveVehicleImport'),
          jsonPlaceholder: '[{"id":1,"description":"","profile":"driving-car","start":[8.675863,49.418477],"end":[8.675863,49.418477],"capacity":[4],"skills":[1]}]',
        }
      } else if (this.expectedData === 'skills') {
        return {
          header: this.$t('optimization.importSkillFile'),
          saveImport: this.$t('optimizationImport.saveSkillImport'),
          jsonPlaceholder: '["{"name":"length over 1.5m","id":1}"]',
        }
      }
    },
    dropzoneOptions () {
      return {
        maxFilesize: 0.5,
        url: 'https://not-used-url.tld', // declaration required by the component, but never used
        uploadMultiple: false,
        maxFiles: 1,
        clickable: true,
        acceptedFiles: this.acceptedFiles,
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
  created() {
    this.acceptedFiles = this.$root.appHooks.run('importerAcceptedFilesDefined', this.acceptedFiles)
  },
  methods: {
    /**
     * Handle the file added event
     * @param {*} file
     */
    fileAdded (file) {
      const context = this
      const reader = new FileReader()
      reader.addEventListener('loadend', function (event) {
        const content = event.target.result
        if (!content || content === 'null') {
          context.showError(context.$t('routeImporter.failedToLoadFile'), {timeout: 0})
        } else {
          let parts = file.name.split('.')
          let extension = parts.at(-1)
          let type = file.type || extension
          context.catchAndParseFile(content, type, new Date().getTime())
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
    catchAndParseFile (fileContent, type) {
      let fileType = null
      let newJobs = []
      let newVehicles = []
      let newSkills = []
      if (type.indexOf('csv') > -1) {
        fileType = 'csv'
        if (this.expectedData === 'jobs') {
          newJobs = Job.fromCsv(fileContent)
        } else if (this.expectedData === 'vehicles') {
          newVehicles = Vehicle.fromCsv(fileContent)
        }
      } else if (type.indexOf('json') > -1 || type.indexOf('geojson') > -1) {
        const parsedJson = JSON.parse(fileContent)
        if (parsedJson && parsedJson.features) {
          fileType = 'geojson'
        } else {
          fileType = 'json'
        }
        if (this.expectedData === 'jobs') {
          for (const j of parsedJson) {
            try {
              newJobs.push(Job.fromObject(j))
            } catch {
              this.showError(this.$t('optimizationImport.notValidJob'))
            }
          }
        } else if (this.expectedData === 'vehicles') {
          for (const v of parsedJson) {
            try {
              newVehicles.push(Vehicle.fromObject(v))
            } catch {
              this.showError(this.$t('optimizationImport.notValidVehicle'))
            }
          }
        } else if (this.expectedData === 'skills') {
          for (const s of parsedJson) {
            try {
              newSkills.push(Skill.fromObject(s))
            } catch {
              this.showError(this.$t('optimizationImport.notValidSkill'))
            }
          }
        }
      }
      if (fileType) {
        this.$emit('saveOptimizationImport', {jobs: newJobs, vehicles: newVehicles, skills: newSkills})
        this.closeImporter()
      } else {
        this.showError(this.$t('routeImporter.failedToLoadFile'), {timeout: 0})
        this.$emit('failedToImportFile')
      }
    },

    // save jobs from pasted JSON and return error if not a valid JSON
    savePastedJson() {
      try {
        const newJobs = []
        const newVehicles = []
        const newSkills = []
        if (this.expectedData === 'jobs') {
          for (const j of JSON.parse(this.pastedData)) {
            newJobs.push(Job.fromObject(j))
          }
        } else if (this.expectedData === 'vehicles') {
          for (const v of JSON.parse(this.pastedData)) {
            newVehicles.push(Vehicle.fromObject(v))
          }
        } else if (this.expectedData === 'skills') {
          for (const s of JSON.parse(this.pastedData)) {
            newSkills.push(Skill.fromObject(s))
          }
        }
        this.$emit('saveOptimizationImport', {jobs: newJobs, vehicles: newVehicles, skills: newSkills})
        this.closeImporter()
      } catch (err) {
        this.showError(this.$t('optimizationImport.notAJson'), {timeout: 3000})
      }
    },

    /**
     * Send new map data via EventBus to ors-map
     * @emits mapViewDataChanged via EventBus passing fileType and fileContent
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

    // close the import dialog
    closeImporter () {
      this.$emit('close')
    }
  },
}
