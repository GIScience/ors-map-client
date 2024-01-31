import RouteImporter from '@/fragments/forms/route-importer/RouteImporter.vue'
import MapFormBtn from '@/fragments/forms/map-form-btn/MapFormBtn.vue'
import PlaceInput from '@/fragments/forms/place-input/PlaceInput.vue'
import EditSkills from '@/fragments/forms/map-form/components/optimization/components/skill-list/EditSkills.vue'
import {EventBus} from '@/common/event-bus'
import Vehicle from '@/models/vehicle'
import Skill from '@/models/skill'

export default {
  data: () => ({
    isVehiclesOpen: true,
    editId: 0,
    editVehicles: [],
    vehicleSkills: [],
    showSkillManagement: false
  }),
  props: {
    vehicles: {
      Type: Array[Vehicle],
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
    vehiclesJSON () {
      const jsonVehicles = []
      for (const v of this.vehicles) {
        jsonVehicles.push(v.toJSON())
      }
      return jsonVehicles
    }
  },
  created () {
    // this.loadSkills()

    for (const v of this.vehicles) {
      this.editVehicles.push(v.clone())
    }

    for (const skill of this.skills) {
      this.vehicleSkills.push(skill.clone())
    }

    const context = this
    // edit Vehicles box is open
    EventBus.$on('showVehiclesModal', (editId) => {
      context.isVehiclesOpen = true
      context.editId = editId
    })
  },
  methods: {
    isEnabled (action) {
      const disabled = this.disabledActions
      return !disabled.includes(action)
    },

    closeVehiclesModal () {
      this.isVehiclesOpen = false
      this.$emit('close')
    },

    contentUploaded (data) {
      this.$emit('contentUploaded', data)
    },

    importVehicles () {
      // TODO: Import from JSON
      this.showError(this.$t('global.notImplemented'), {timeout: 3000})
    },
    exportVehicles () {
      navigator.clipboard.writeText(JSON.stringify(this.vehiclesJSON)).then(() => {
        this.showSuccess(this.$t('vehicle.copiedToClipboard'), {timeout: 3000})
      }, () => {
        this.showError(this.$t('vehicle.copiedToClipboardFailed'), {timeout: 3000})
      },)
    },
    saveVehicles () {
      this.$emit('vehiclesChanged', this.editVehicles)
      this.closeVehiclesModal()
    },
    addVehicle () {
    // TODO: add vehicles
    },
    removeVehicle (id) {
      this.editVehicles.splice(id-1,1)
      for (const i in this.editVehicles) {
        this.editVehicles[i].setId(parseInt(i)+1)
      }
    },
    copyVehicle () {
      // TODO: add copyVehicle
    },
    restoreVehicles () {
      this.editVehicles = this.vehicles
    },

    loadSkills() {
      // this.vehicleSkills = this.$store.getters.appRouteData.skills
      let storedSkills = localStorage.getItem('skills')
      if (storedSkills) {
        const skills = []
        for (const skill of JSON.parse(storedSkills)) {
          skills.push(Skill.fromObject(skill))
        }
        this.vehicleSkills = skills
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
      this.vehicleSkills = newSkills
    },
  }
}
