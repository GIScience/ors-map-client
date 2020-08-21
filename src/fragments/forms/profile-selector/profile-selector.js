import OrsMapFilters from '@/resources/ors-map-filters'
import OrsFilterUtil from '@/support/map-data-services/ors-filter-util'
import defaultMapSettings from '@/resources/default-map-settings'
import constants from '@/resources/constants'

export default {
  data: () => ({
    activeProfileIndex: null,
    extraProfilesOpen: false,
    activeProfile: null,
    orsFilters: OrsMapFilters,
    initialProfile: null

  }),
  created () {
    this.initialProfile = this.$store.getters.mapSettings.defaultProfile || defaultMapSettings.defaultProfile
    let primaryProfiles = this.getPrimaryProfiles()
    this.activeProfileIndex = Object.keys(primaryProfiles).indexOf(this.currentProfile)
  },
  computed: {
    currentProfile () {
      return this.activeProfile || this.initialProfile
    },
    profilesMapping () {
      const filter = this.getProfileFilter()
      return filter.mapping
    }
  },

  watch: {
    orsFilters: {
      handler: function (newVal, oldVal) {
        this.updateFilterProfile()
      },
      deep: true
    },
    '$store.getters.mapSettings.defaultProfile' (newVal) {
      this.initialProfile = newVal
      if (!this.activeProfile) {
        let primaryProfiles = this.getPrimaryProfiles()
        this.activeProfileIndex = Object.keys(primaryProfiles).indexOf(this.currentProfile)
        OrsFilterUtil.setFilterValue(constants.profileFilterName, newVal)
      }
    }
  },
  methods: {
    /**
     * Get the profile filter object
     * @returns {Object}
     */
    getProfileFilter () {
      const filterRef = OrsFilterUtil.getFilterRefByName(constants.profileFilterName)
      return filterRef
    },

    /**
     * Get the primary profiles
     * @returns {Array}
     */
    getPrimaryProfiles () {
      const primaryProfiles = this.lodash.filter(this.profilesMapping, (p) => {
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
      OrsFilterUtil.setFilterValue(constants.profileFilterName, profile)
      this.eventBus.$emit('filtersChangedExternally')

      let context = this
      setTimeout(() => {
        context.extraProfilesOpen = false
      }, 200)
    },
    updateFilterProfile () {
      const filterRef = OrsFilterUtil.getFilterRefByName(constants.profileFilterName)
      if (filterRef.value && this.activeProfile !== filterRef.value) {
        this.activeProfile = filterRef.value
      }
    }
  }
}
