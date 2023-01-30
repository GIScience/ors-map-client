import OrsMapFilters from '@/config/ors-map-filters'
import OrsFilterUtil from '@/support/map-data-services/ors-filter-util'
import defaultMapSettings from '@/config/default-map-settings'
import ProfileSelectorOption from './components/profile-selector-option/ProfileSelectorOption'
import lodash from 'lodash'
import constants from '@/resources/constants'
import {EventBus} from '@/common/event-bus'

export default {
  data: () => ({
    extraProfilesOpen: false,
    activeProfileSlug: null,
    orsFilters: OrsMapFilters,
    activeVehicleType: null,
    vehicleType: null
  }),
  computed: {
    currentNestedItem () {
      return this.activeVehicleType
    },
    profilesMapping () {
      const filter = OrsFilterUtil.getFilterRefByName(constants.profileFilterName)
      return filter.mapping
    }
  },
  components: {
    ProfileSelectorOption
  },
  watch: {
    orsFilters: {
      handler: function () {
        this.updateActiveProfileWhenFilterChangedExternally()
      },
      deep: true
    },
    '$store.getters.mapReady' (newVal) {
      if (newVal) {
        this.loadActiveProfileAndVehicle()
      }
    },
    '$store.getters.appRouteData.options.profile' () {
      this.loadActiveProfileAndVehicle()
    },
    '$store.getters.appRouteData.options.vehicle_type' () {
      this.loadActiveProfileAndVehicle()
    }
  },
  methods: {
    profileSelected (data) {
      this.setProfile(data.profileSlug, data.vehicleType).then(() => {
        this.notifyProfileChanged()
      })
    },
    loadActiveProfileAndVehicle () {
      let profileFromAppRoute = lodash.get(this, '$store.getters.appRouteData.options.profile')
      let profile = profileFromAppRoute || this.$store.getters.mapSettings.defaultProfile || defaultMapSettings.defaultProfile
      let vehicleType = lodash.get(this, '$store.getters.appRouteData.options.options.vehicle_type')

      if (profile !== this.activeProfileSlug || this.activeVehicleType !== vehicleType) {
        this.setProfile(profile, vehicleType)
      }
    },
    /**
     * Get the profile filter object
     * @returns {Object}
     */
    getCurrentProfileFilterValue () {
      const filterRef = OrsFilterUtil.getFilterRefByName(constants.profileFilterName)
      return filterRef.value
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

    notifyProfileChanged () {
      EventBus.$emit('filtersChangedExternally')
    },

    /**
     * Set the profile used to route
     * @param {*} profileSlug
     * @param {*} vehicleTypeSlug
     * @returns {Promise}
     */
    setProfile (profileSlug, vehicleTypeSlug = null) {
      return new Promise((resolve) => {
        this.activeProfileSlug = profileSlug
        this.activeVehicleType = vehicleTypeSlug

        // Update the values in map filters object
        OrsFilterUtil.setFilterValue(constants.profileFilterName, profileSlug)
        OrsFilterUtil.setFilterValue(constants.vehicleTypeFilterName, vehicleTypeSlug)

        // Store the selected profile as default profile
        // so the next time the ap is loaded, it will be selected by default
        let mapSettings = this.$store.getters.mapSettings
        mapSettings.defaultProfile = profileSlug
        mapSettings.defaultVehicleType = vehicleTypeSlug

        this.$store.dispatch('saveSettings', mapSettings).then(() => {
          let context = this
          setTimeout(() => {
            context.extraProfilesOpen = false
            resolve(profileSlug)
          }, 200)
        })
      })
    },
    /**
     * Change the value of local profile and vehicle type
     * when the ors map filter object changes externally
     */
    updateActiveProfileWhenFilterChangedExternally () {
      const profileFilterRef = OrsFilterUtil.getFilterRefByName(constants.profileFilterName)
      const vehicleTypeFilterRef = OrsFilterUtil.getFilterRefByName(constants.vehicleTypeFilterName)

      let profile = profileFilterRef.value|| this.activeProfileSlug
      let vehicleType = vehicleTypeFilterRef.value|| this.activeVehicleType

      if (this.activeProfileSlug !== profile || this.activeVehicleType !== vehicleType) {
        this.setProfile(profile, vehicleType)
      }
    }
  }
}
