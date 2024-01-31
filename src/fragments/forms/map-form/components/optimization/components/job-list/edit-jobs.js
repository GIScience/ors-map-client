import RouteImporter from '@/fragments/forms/route-importer/RouteImporter.vue'
import MapFormBtn from '@/fragments/forms/map-form-btn/MapFormBtn.vue'
import PlaceInput from '@/fragments/forms/place-input/PlaceInput.vue'
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
    // Amount of place inputs
    disabledActions: {
      default: () => [],
      type: Array,
    }
  },
  components: {
    RouteImporter,
    MapFormBtn,
    PlaceInput,
    EditSkills,
    EventBus
  },
  computed: {
    jobsJSON () {
      const jsonJobs = []
      for (const job of this.jobs) {
        jsonJobs.push(job.toJSON())
      }
      return jsonJobs
    }
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

    importJobs () {
      this.isImportOpen = true
    },
    closeImport() {
      this.isImportOpen = false
      this.$emit('close')
    },
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

    exportJobs () {
      navigator.clipboard.writeText(JSON.stringify(this.jobsJSON)).then(() => {
        this.showSuccess(this.$t('job.copiedToClipboard'), {timeout: 3000})
      }, () => {
        this.showError(this.$t('job.copiedToClipboardFailed'), {timeout: 3000})
      },)
    },
    saveJobs () {
      this.$emit('jobsChanged', this.editJobs)
      this.closeJobsModal()
    },
    addJob (fromMap) {
      if(fromMap) {
        // TODO: choose point from map
        this.showError(this.$t('global.notImplemented'), {timeout: 3000})
      }
    },
    removeJob (id) {
      this.editJobs.splice(id-1,1)
      for (const i in this.editJobs) {
        this.editJobs[i].setId(parseInt(i)+1)
      }
    },
    copyJob () {
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
    manageSkills(skillId) {
      this.showSkillManagement = true
      EventBus.$emit('showSkillsModal', skillId)
    },
    skillsChanged(editedSkills) {
      let newSkills = []
      for (const skill of editedSkills) {
        newSkills.push(skill.clone())
      }
      this.jobSkills = newSkills
    },
  }
}
