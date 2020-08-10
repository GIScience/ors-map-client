import OrsMapFilters from '@/resources/ors-map-filters'
import OrsFilterUtil from '@/support/map-data-services/ors-filter-util'
import constants from '@/resources/constants'

export default {
  data: () => ({
    activeProfileIndex: null,
    extraProfilesOpen: false,
    activeProfile: null,
    orsFilters: OrsMapFilters

  }),
  props: {
    initialProfile: {
      default: constants.defaultProfile
    }
  },
  created () {
    this.activeProfile = this.initialProfile
    let primaryProfiles = this.getPrimaryProfiles()
    this.activeProfileIndex = Object.keys(primaryProfiles).indexOf(this.activeProfile)
  },
  computed: {
    profilesMapping () {
      let filter = this.getProfileFilter()
      return filter.mapping
    }
  },

  watch: {
    activeProfile (newVal, oldVal) {
      if (oldVal) {
        OrsFilterUtil.setFilterValue(constants.profileFilterName, newVal)
        this.eventBus.$emit('filtersChangedExternally')
      }
    },
    orsFilters: {
      handler: function (newVal, oldVal) {
        this.updateFilterProfile()
      },
      deep: true
    }
  },
  methods: {
    /**
     * Get the profile filter object
     * @returns {Object}
     */
    getProfileFilter () {
      let filterRef = OrsFilterUtil.getFilterRefByName(constants.profileFilterName)
      return filterRef
    },

    /**
     * Get the primary profiles
     * @returns {Array}
     */
    getPrimaryProfiles () {
      let primaryProfiles = this.lodash.filter(this.profilesMapping, (p) => {
        return p.primary === true
      })
      return primaryProfiles
    },

    /**
     * Set the profile used to route
     * @param {*} profile
     * @param {*} index
     */
    setProfile (profile, index) {
      this.activeProfile = profile
      if (index) {
        this.activeProfileIndex = index
      }
      let context = this
      setTimeout(() => {
        context.extraProfilesOpen = false
      }, 200)
    },
    updateFilterProfile () {
      let filterRef = OrsFilterUtil.getFilterRefByName(constants.profileFilterName)
      if (filterRef.value && this.activeProfile !== filterRef.value) {
        this.activeProfile = filterRef.value
      }
    }
  }
}
