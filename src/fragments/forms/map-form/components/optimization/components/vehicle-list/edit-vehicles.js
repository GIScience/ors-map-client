import RouteImporter from '@/fragments/forms/route-importer/RouteImporter.vue'
import MapFormBtn from '@/fragments/forms/map-form-btn/MapFormBtn.vue'
import PlaceInput from '@/fragments/forms/place-input/PlaceInput.vue'
import PlaceAutocomplete from '@/fragments/forms/place-input/PlaceAutocomplete.vue'
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
    pastedVehicles: [],
    JsonPlaceholder: '[{"id":1,"description":"","profile":"driving-car","start":[8.675863,49.418477],"end":[8.675863,49.418477],"capacity":[4],"skills":[1]}]',
    focused: false,
    searching: false,
    debounceTimeoutId: null,
    newEndPoint: false,
    onlyStartPoint: false,
    showSkillManagement: false,
    isImportOpen: false
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
    PlaceAutocomplete,
    EditSkills,
    EventBus
  },
  computed: {
    editVehiclesJSON () {
      const jsonVehicles = []
      for (const v of this.editVehicles) {
        jsonVehicles.push(v.toJSON())
      }
      return jsonVehicles
    },
    // returns true if start and end point are the same
    sameStartEndPoint () {
      const id = this.editId - 1
      return this.editVehicles[id].start[0] === this.editVehicles[id].end[0] && this.editVehicles[id].start[1] === this.editVehicles[id].end[1]
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
    // close editVehciles box to pick a place from the map
    EventBus.$on('pickAPlace', () => {
      this.closeVehiclesModal()
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

    // open the import dialog
    importVehicles () {
      this.isImportOpen = true
    },
    closeImport() {
      this.isImportOpen = false
      this.$emit('close')
    },
    // save vehicles from pasted JSON and return error if not a valid JSON
    saveVehicleImport() {
      try {
        const vehicles = []
        for (const v of JSON.parse(this.pastedVehicles)) {
          vehicles.push(Vehicle.fromObject(v))
        }
        this.editVehicles = vehicles

        this.isImportOpen = false
        this.saveVehicles()
      } catch (err) {
        this.showError(this.$t('optimization.notAJson'), {timeout: 3000})
      }
    },

    // copy JSON object containing jobs to clipboard
    exportVehicles () {
      navigator.clipboard.writeText(JSON.stringify(this.editVehiclesJSON)).then(() => {
        this.showSuccess(this.$t('vehicle.copiedToClipboard'), {timeout: 3000})
      }, () => {
        this.showError(this.$t('vehicle.copiedToClipboardFailed'), {timeout: 3000})
      },)
    },
    // remove different end location and automatically fill it to match start location
    removeEndPoint(index) {
      this.editVehicles[index].end = this.editVehicles[index].start
    },
    // check if one of the vehicles does not have a start location
    // missing end location is not a problem, since it is set to be the same as the start in that case
    emptyLocation () {
      for (let jobId in this.editVehicles) {
        if (this.editVehicles[jobId].start === null) {
          return true
        }
      }
      return false
    },
    // save vehicles and close the editVehicles box, show error if one or more of them has an empty start location
    saveVehicles () {
      if (this.emptyLocation()) {
        this.showError('Added vehicle does not have a valid start location', {timeout: 3000})
      } else {
        this.$emit('vehiclesChanged', this.editVehicles)
        localStorage.setItem('vehicles', JSON.stringify(this.editVehiclesJSON))
        this.closeVehiclesModal()
      }
    },
    // add a vehicle
    // if not chosen from map it has an empty start location and placeAutocomplete is activated
    addVehicle (fromMap) {
      if(fromMap) {
        // TODO: choose point from map
        this.showError(this.$t('global.notImplemented'), {timeout: 3000})
      } else {
        let vehicle = new Vehicle()
        let id = this.editVehicles.length + 1
        vehicle.setId(id)
        vehicle.capacity = [1]
        this.editVehicles.push(vehicle)
        this.editId = id
      }
    },
    // delete old location when switching to search to activate placeAutocomplete
    switchToSearch (mode) {
      if (mode === 'start') {
        if (!this.sameStartEndPoint) {
          this.onlyStartPoint = true
        }
        this.editVehicles[this.editId - 1].start = null
      } else if (mode === 'end') {
        this.newEndPoint = true
        this.editVehicles[this.editId - 1].end = null
      }
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
      this.vehicleSkills = newSkills
    },
  }
}
