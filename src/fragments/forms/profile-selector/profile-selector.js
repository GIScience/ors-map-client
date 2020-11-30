import OrsMapFilters from '@/resources/ors-map-filters'
import OrsFilterUtil from '@/support/map-data-services/ors-filter-util'
import defaultMapSettings from '@/resources/default-map-settings'
import lodash from 'lodash'
import constants from '@/resources/constants'

export default {
  data: () => ({
    activeProfileIndex: null,
    extraProfilesOpen: false,
    activeProfile: null,
    orsFilters: OrsMapFilters

  }),
  created () {
    // this.loadActiveProfile()
  },
  computed: {
    currentProfile () {
      return this.activeProfile
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
    '$store.getters.mapReady' (newVal) {
      if (newVal) {
        this.loadActiveProfile()
      }
    },
    '$route' () {
      if (this.$store.getters.mapReady) {
        this.loadActiveProfile()
      }
    },
    '$store.getters.mapSettings.defaultProfile' (newVal) {
      if (this.activeProfile !== newVal) {
        this.setProfile(newVal, false)
      }
    }
  },
  methods: {
    loadActiveProfile () {
      const profileFromAppRoute = lodash.get(this, '$store.getters.appRouteData.options.profile')
      let profile = profileFromAppRoute || this.$store.getters.mapSettings.defaultProfile || defaultMapSettings.defaultProfile
      this.setProfile(profile, false)
    },
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
    setProfile (profile, notify = true) {
      this.activeProfile = profile
      let primaryProfiles = this.getPrimaryProfiles()
      let index = Object.keys(primaryProfiles).indexOf(this.profile)
      this.activeProfileIndex = index

      let mapSettings = this.$store.getters.mapSettings
      mapSettings.defaultProfile = profile
      OrsFilterUtil.setFilterValue(constants.profileFilterName, profile)  

      this.$store.dispatch('saveSettings', mapSettings).then(() => {
        if (notify) {
          this.eventBus.$emit('filtersChangedExternally')
        }
        let context = this
        
        setTimeout(() => {
          context.extraProfilesOpen = false
        }, 200)
      })
        
    },
    updateFilterProfile () {
      const filterRef = OrsFilterUtil.getFilterRefByName(constants.profileFilterName)
      if (filterRef.value && this.activeProfile !== filterRef.value) {
        this.setProfile(filterRef.value, false)
      }
    },
    getProfileTitle (slug) {
      let filterKey = `orsMapFilters.profiles.${slug}`
      let title = this.$t(filterKey)
      return title
    }
  }
}
