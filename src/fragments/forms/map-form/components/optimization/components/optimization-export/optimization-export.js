import Download from '@/fragments/forms/map-form/components/download/Download'
import MapFormBtn from '@/fragments/forms/map-form-btn/MapFormBtn.vue'
import Job from '@/models/job'
import Vehicle from '@/models/vehicle'

export default {
  data: () => ({
    isExportOpen: true,
  }),
  props: {
    editJobs: {
      Type: Array[Job],
      Required: false
    },
    editVehicles: {
      Type: Array[Vehicle],
      Required: false
    }
  },
  components: {
    Download,
    MapFormBtn
  },
  computed: {
    expectedData () {
      if (this.editJobs) {
        return 'jobs'
      } else if (this.editVehicles) {
        return 'vehicles'
      }
    },
    jobsJson () {
      const jsonJobs = []
      for (const job of this.editJobs) {
        jsonJobs.push(job.toJSON(true))
      }
      return jsonJobs
    },
    vehiclesJson () {
      const jsonVehicles = []
      for (const v of this.editVehicles) {
        jsonVehicles.push(v.toJSON(true))
      }
      return jsonVehicles
    },
    content () {
      if (this.expectedData === 'jobs') {
        return {
          header: 'Export jobs',
          copied: this.$t('optimizationExport.jobsCopiedToClipboard'),
          jsonFilename: 'jobs.json'
        }
      } else if (this.expectedData === 'vehicles') {
        return {
          header: 'Export vehicles',
          copied: this.$t('optimizationExport.vehiclesCopiedToClipboard'),
          jsonFilename: 'vehicles.json'
        }
      }
    },
    downloadFormats () {
      return [
        { text: 'ORS JSON', value: 'json', ext: 'json' },
        { text: 'GeoJSON', value: 'geojson', ext: 'json' },
        { text: 'CSV', value: 'csv', ext: 'csv' }
      ]
    },
  },
  created() {
  },
  methods: {
    // copy JSON object containing jobs to clipboard
    copyToClipboard () {
      let data = []
      if (this.expectedData === 'jobs') {
        data = this.jobsJson
      } else if (this.expectedData === 'vehicles') {
        data = this.vehiclesJson
      }

      navigator.clipboard.writeText(JSON.stringify(data)).then(() => {
        this.showSuccess(this.content.copied, {timeout: 3000})
      }, () => {
        this.showError(this.$t('optimizationExport.copiedToClipboardFailed'), {timeout: 3000})
      },)
    },

    downloadCsv () {
      // TODO: write jobs/vehicles to csv and download it
      this.showError(this.$t('global.notImplemented'), {timeout: 3000})
    },

    // Hide the import dialog
    closeExporter () {
      this.$emit('close')
    }
  },
}
