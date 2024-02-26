import RouteImporter from '@/fragments/forms/route-importer/RouteImporter.vue'
import MapFormBtn from '@/fragments/forms/map-form-btn/MapFormBtn.vue'
import PlaceAutocomplete from '@/fragments/forms/place-input/PlaceAutocomplete.vue'
import EditSkills from '@/fragments/forms/map-form/components/optimization/components/skill-list/EditSkills.vue'
import {EventBus} from '@/common/event-bus'
import Job from '@/models/job'
import Skill from '@/models/skill'

export default {
  data: () => ({
    isJobsOpen: true,
    editId: 0,
    editJobs: [],
    jobSkills: [],
    pastedJobs: [],
    JsonPlaceholder: '[{"id":1,"location":[8.68525,49.420822],"service":300,"delivery":[1],"skills":[1]}]',
    focused: false,
    searching: false,
    debounceTimeoutId: null,
    saveToLocalStorage: true,
    showSkillManagement: false,
    isImportOpen: false
  }),
  props: {
    jobs: {
      Type: Array[Job],
      Required: true
    },
    skills: {
      Type: Array[Skill],
      Required: false
    },
    disabledActions: {
      default: () => [],
      type: Array,
    }
  },
  components: {
    RouteImporter,
    MapFormBtn,
    PlaceAutocomplete,
    EditSkills,
    EventBus
  },
  computed: {
    editJobsJSON () {
      const jsonJobs = []
      for (const job of this.editJobs) {
        jsonJobs.push(job.toJSON())
      }
      return jsonJobs
    },
  },
  created () {
    // this.loadSkills()

    for (const job of this.jobs) {
      this.editJobs.push(job.clone())
    }

    for (const skill of this.skills) {
      this.jobSkills.push(skill.clone())
    }

    const context = this
    // edit Jobs box is open
    EventBus.$on('showJobsModal', (editId) => {
      context.isJobsOpen = true
      context.editId = editId
    })
    // close editJobs box to pick a plce from the map
    EventBus.$on('pickAPlace', () => {
      this.closeJobsModal()
    })
    // write coordinates into job location when place is selected
    EventBus.$on('locationPicked', (data) => {
      context.editJobs[data.pickPlaceIndex].location = data.place.coordinates
    })
  },
  methods: {
    isEnabled (action) {
      const disabled = this.disabledActions
      return !disabled.includes(action)
    },

    closeJobsModal () {
      this.isJobsOpen = false
      this.$emit('close')
    },

    contentUploaded (data) {
      this.$emit('contentUploaded', data)
    },

    // open the import dialog
    importJobs () {
      this.isImportOpen = true
    },
    closeImport() {
      this.isImportOpen = false
      this.$emit('close')
    },
    // save jobs from pasted JSON and return error if not a valid JSON
    saveJobImport() {
      try {
        const jobs = []
        for (const s of JSON.parse(this.pastedJobs)) {
          jobs.push(Job.fromObject(s))
        }
        this.editJobs = jobs

        this.isImportOpen = false
        this.saveJobs()
      } catch (err) {
        this.showError(this.$t('optimization.notAJson'), {timeout: 3000})
      }
    },

    // copy JSON object containing jobs to clipboard
    exportJobs () {
      navigator.clipboard.writeText(JSON.stringify(this.editJobsJSON)).then(() => {
        this.showSuccess(this.$t('job.copiedToClipboard'), {timeout: 3000})
      }, () => {
        this.showError(this.$t('job.copiedToClipboardFailed'), {timeout: 3000})
      },)
    },
    // check if one of the jobs does not have a location
    emptyLocation () {
      for (let jobId in this.editJobs) {
        if (this.editJobs[jobId].location === null) {
          return true
        }
      }
      return false
    },
    // save jobs and close the editJobs box, show error if one or more of them has an empty location
    // only save to local storage if checkbox is ticked
    saveJobs () {
      if (this.emptyLocation()) {
        this.showError('Added job does not have a valid location', {timeout: 3000})
      } else {
        this.$emit('jobsChanged', this.editJobs)
        if (this.saveToLocalStorage) {
          localStorage.setItem('jobs', JSON.stringify(this.editJobsJSON))
        }
        this.closeJobsModal()
      }
    },
    // add a job
    // if not chosen from map it has an empty location and placeAutocomplete is activated
    addJob (fromMap) {
      if(fromMap) {
        // TODO: choose point from map
        this.showError(this.$t('global.notImplemented'), {timeout: 3000})
      } else {
        let job = new Job()
        let id = this.editJobs.length + 1
        job.setId(id)
        this.editJobs.push(job)
        this.editId = id
      }
    },
    // delete old location when switching to search to activate placeAutocomplete
    switchToSearch () {
      this.editJobs[this.editId - 1].location = null
    },
    removeJob (id) {
      this.editJobs.splice(id-1,1)
      for (const i in this.editJobs) {
        this.editJobs[i].setId(parseInt(i)+1)
      }
    },
    copyJob () {
      // TODO: copy job to clipboard? or duplicate job?
      this.showError(this.$t('global.notImplemented'), {timeout: 3000})
    },
    restoreJobs () {
      this.editJobs = this.jobs
    },

    loadSkills() {
      // this.jobSkills = this.$store.getters.appRouteData.skills
      let storedSkills = localStorage.getItem('skills')
      if (storedSkills) {
        const skills = []
        for (const skill of JSON.parse(storedSkills)) {
          skills.push(Skill.fromObject(skill))
        }
        this.jobSkills = skills
      }
    },
    // open manage skill box dialog
    manageSkills(skillId) {
      this.showSkillManagement = true
      EventBus.$emit('showSkillsModal', skillId)
    },
    // update job skills selection when the skills were changed
    skillsChanged(editedSkills) {
      let newSkills = []
      for (const skill of editedSkills) {
        newSkills.push(skill.clone())
      }
      this.jobSkills = newSkills
    },
  }
}
