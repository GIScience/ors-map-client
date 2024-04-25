import RouteImporter from '@/fragments/forms/route-importer/RouteImporter.vue'
import MapFormBtn from '@/fragments/forms/map-form-btn/MapFormBtn.vue'
import {EventBus} from '@/common/event-bus'
import Job from '@/models/job'
import Vehicle from '@/models/vehicle'
import Skill from '@/models/skill'
import {vehicleColors} from '@/support/optimization-utils'

export default {
  data: () => ({
    isEditOpen: true,
    editId: 0,
    editData: [],
    editJobs: [],
    editVehicles: [],
    editSkills: [],
    jobsBox: false,
    vehiclesBox: false,
    pickPlaceSupported: true,
    focused: false,
    searching: false,
    debounceTimeoutId: null,
    activeProfileSlug: null,
    activeVehicleType: null,
  }),
  props: {
    data: {
      Type: Array,
      Required: true
    },
    skills: {
      Type: Array[Skill],
      Required: true
    },
    editProp: {
      Type: String,
      Required: true
    },
    disabledActions: {
      default: () => [],
      type: Array,
    }
  },
  components: {
    RouteImporter,
    Download,
    MapFormBtn,
    EventBus
  },
  computed: {
    content () {
      if (this.jobsBox) {
        return {
          item: 'Job',
          class: Job,
          maxLength: 50,
          maxWarning: this.$t('optimization.jobMaxWarning'),
          add: this.$t('optimization.addJob'),
          duplicate: this.$t('optimization.duplicateJob'),
          remove: this.$t('optimization.removeJob'),
          header: this.$t('optimization.manageJobs'),
          fromMap: this.$t('optimization.addJobFromMap'),
          expected: 'jobs',
          changedEvent: 'jobsChanged',
          skills: 'Skills needed for this Job',
          emptyLoc: 'Added job does not have a valid location',
        }
      } else if (this.vehiclesBox) {
        return {
          item: 'Vehicle',
          class: Vehicle,
          maxLength: 3,
          maxWarning: this.$t('optimization.vehicleMaxWarning'),
          add: this.$t('optimization.addVehicle'),
          duplicate: this.$t('optimization.duplicateVehicle'),
          remove: this.$t('optimization.removeVehicle'),
          header: this.$t('optimization.manageVehicles'),
          fromMap: this.$t('optimization.addVehicleFromMap'),
          expected: 'vehicles',
          changedEvent: 'vehiclesChanged',
          skills: 'Skills this Vehicle has',
          emptyLoc: 'Added vehicle does not have a valid start location',
        }
      }
    },
  },
  created () {
    if (this.editProp === 'jobs') {
      this.jobsBox = true
    } else if (this.editProp === 'vehicles') {
      this.vehiclesBox = true
    }

    for (let item of this.data) {
      this.editData.push(item.clone())
    }
    for (const skill of this.skills) {
      this.editSkills.push(skill.clone())
    }

    const context = this
    // edit box is open
    EventBus.$on('showEditModal', (editId) => {
      context.isEditOpen = true
      context.editId = editId
    })
    // close editJobs box to pick a place from the map
    EventBus.$on('pickAPlace', () => {
      this.closeEditModal()
    })
  },
  methods: {
    vehicleColors,
    vehicleIcon,
    isEnabled (action) {
      const disabled = this.disabledActions
      return !disabled.includes(action)
    },
    // close editJobs dialog
    closeEditModal () {
      this.isEditOpen = false
      this.$emit('close')
    },

    contentUploaded (data) {
      this.$emit('contentUploaded', data)
    },

    // check if one of the jobs does not have a location
    hasEmptyLocation () {
      for (let item of this.editData) {
        if (item.location === null || item.start === null) {
          return true
        }
      }
      return false
    },
    // save items and close the edit box, show error if one or more of them has an empty location
    saveItems () {
      if (this.hasEmptyLocation()) {
        this.showError(this.content.emptyLoc, {timeout: 3000})
      } else {
        this.$emit(this.content.changedEvent, this.editData)
        this.closeEditModal()
      }
    },
    // add an item
    // if not chosen from map it has an empty location and placeAutocomplete is activated
    addItem (fromMap) {
      if(fromMap) {
        this.showInfo(this.$t('placeInput.clickOnTheMapToSelectAPlace'))
        this.closeEditModal()
        this.setPickPlaceSource()
      } else {
        let item
        if (this.jobsBox) {
          item = new Job()
        } else if (this.vehiclesBox) {
          item = new Vehicle()
        }
        const id = this.editData.length + 1
        item.setId(id)
        this.editData.push(item)
        this.editId = id
      }
    },
    // set the pick place input source
    setPickPlaceSource () {
      if (this.pickPlaceSupported) {
        this.$store.commit('pickPlaceIndex', this.editData.length)
        this.$store.commit('pickPlaceId', this.editData.length + 1)
        if (this.jobsBox) {
          this.$store.commit('pickEditSource', 'jobs')
        } else if (this.vehiclesBox) {
          this.$store.commit('pickEditSource', 'vehicleStart')
        }
      }
    },
    removeItem (id) {
      this.editData.splice(id-1,1)
      for (const i in this.editData) {
        this.editData[i].setId(parseInt(i)+1)
      }
    },
    duplicateItem (index) {
      let newItem = this.editData[index-1].clone()
      let id = this.editData.length + 1
      newItem.setId(id)
      this.editData.push(newItem)
      this.editId = id
    },
    skillNames(item) {
      let names = ''
      for (const skill of item.skills) {
        if(names === ''){
          names = skill.name
        } else {
          names = names + ', ' + skill.name
        }
      }
      return names
    },
  }
}
