import RouteImporter from '@/fragments/forms/route-importer/RouteImporter.vue'
import Download from '@/fragments/forms/map-form/components/download/Download.vue'
import MapFormBtn from '@/fragments/forms/map-form-btn/MapFormBtn.vue'
import OrsFilterUtil, {vehicleIcon} from '@/support/map-data-services/ors-filter-util'
import constants from '@/resources/constants'
import PlaceAutocomplete from '@/fragments/forms/place-input/PlaceAutocomplete.vue'
import ProfileSelectorOption from '@/fragments/forms/profile-selector/components/profile-selector-option/ProfileSelectorOption'
import EditSkills from '@/fragments/forms/map-form/components/optimization/components/edit-skills/EditSkills.vue'
import OptimizationImport from '@/fragments/forms/map-form/components/optimization/components/optimization-import/OptimizationImport.vue'
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
    showSkillManagement: false,
    isSkillsOpen: false,
    isImportOpen: false,
    onlyStartPoint: false,
    newEndPoint: false,
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
    PlaceAutocomplete,
    ProfileSelectorOption,
    EditSkills,
    OptimizationImport,
    EventBus
  },
  computed: {
    content () {
      if (this.jobsBox) {
        return {
          item: 'Job',
          class: Job,
          maxLength: 50,
          maxWarning: this.$t('optimization.maxWarning') + '50' + this.$t('optimization.jobs'),
          import: this.$t('optimization.import') + this.$t('optimization.jobs'),
          edit: this.$t('optimization.edit') + this.$t('optimization.job'),
          add: this.$t('optimization.add') + this.$t('optimization.job'),
          duplicate: this.$t('optimization.duplicate') + this.$t('optimization.job'),
          remove: this.$t('optimization.remove') + this.$t('optimization.job'),
          header: this.$t('optimization.manage') + this.$t('optimization.jobs'),
          fromMap: this.$t('optimization.addFromMap') + this.$t('optimization.job'),
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
          maxWarning: this.$t('optimization.maxWarning') + '3' + this.$t('optimization.vehicles'),
          import: this.$t('optimization.import') + this.$t('optimization.vehicles'),
          edit: this.$t('optimization.edit') + this.$t('optimization.vehicle'),
          add: this.$t('optimization.add') + this.$t('optimization.vehicle'),
          duplicate: this.$t('optimization.duplicate') + this.$t('optimization.vehicle'),
          remove: this.$t('optimization.remove') + this.$t('optimization.vehicle'),
          header: this.$t('optimization.manage') + this.$t('optimization.vehicles'),
          fromMap: this.$t('optimization.addFromMap') + this.$t('optimization.vehicle'),
          expected: 'vehicles',
          changedEvent: 'vehiclesChanged',
          skills: 'Skills this Vehicle has',
          emptyLoc: 'Added vehicle does not have a valid start location',
        }
      }
    },
    headerText () {
      if (this.editId === 0) {
        return this.content.header
      } else {
        return this.content.header + ' - editing ' + this.editId
      }
    },
    // returns true if start and end point are the same
    sameStartEndPoint () {
      const id = this.editId - 1
      return this.editData[id].start[0] === this.editData[id].end[0] && this.editData[id].start[1] === this.editData[id].end[1]
    },
    profilesMapping () {
      const filter = OrsFilterUtil.getFilterRefByName(constants.profileFilterName)
      return filter.mapping
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

    // TODO: add clear all data option,
    //  possibly also a recover option?

    // save jobs from JSON
    saveImport(data) {
      if (this.jobsBox) {
        this.editData = data.jobs
      } else if (this.vehiclesBox) {
        this.editData = data.vehicles
      }
      // TODO: check if editData contains skills that are not in editSkills yet
      //  write in with empty name if not there
      this.saveItems()
      this.isImportOpen = false
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
    // delete old location when switching to search to activate placeAutocomplete
    switchToSearch (mode) {
      if (this.jobsBox) {
        this.editData[this.editId - 1].location = null
      } else if (this.vehiclesBox) {
        if (mode === 'start') {
          if (!this.sameStartEndPoint) {
            this.onlyStartPoint = true
          }
          this.editData[this.editId - 1].start = null
        } else if (mode === 'end') {
          this.newEndPoint = true
          this.editData[this.editId - 1].end = null
        }
      }
    },
    removeItem (id) {
      this.editData.splice(id-1,1)
      for (const i in this.editData) {
        this.editData[i].setId(parseInt(i)+1)
      }
    },
    removeEndPoint (index) {
      this.editData[index].end = this.editData[index].start
    },
    duplicateItem (index) {
      let newItem = this.editData[index-1].clone()
      let id = this.editData.length + 1
      newItem.setId(id)
      this.editData.push(newItem)
      this.editId = id
    },
    // update job skills selection when the skills were changed
    skillsChanged(editedSkills) {
      let newSkills = []
      for (const skill of editedSkills) {
        newSkills.push(skill.clone())
      }
      this.editSkills = newSkills
      this.$emit('skillsChanged', this.editSkills)
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

    // when profile selected in selector, update vehicle properties
    profileSelected (data) {
      this.activeProfileSlug = data.profileSlug
      this.activeVehicleType = data.vehicleTypeSlug

      OrsFilterUtil.setFilterValue(constants.profileFilterName, data.profileSlug)

      this.editData[this.editId - 1].profile = data.profileSlug
    },
    // return currently active vehicle profile property
    vehicleProfile(id) {
      const vt = this.editData[id].profile
      let profile
      if (vt !== 'wheelchair') {
        const profilePart = vt.split('-')[0]
        profile = profilePart.concat('-*')
      } else {
        profile = vt
      }
      return profile
    },
  }
}
