
import utils from '@/support/utils'

export default {
  data: () => ({
    subProfileIsOpen: false, // if a nested profile or a vehicle type menu is open
    localActiveProfileSlug: null
  }),
  props: {
    profile: {
      type: Object,
      required: true
    },
    activeProfileSlug: {
      type: String,
      required: false
    },
    activeVehicleType: {
      type: String,
      required: false
    }
  },
  created() {
    this.localActiveProfileSlug = this.activeProfileSlug
  },
  watch: {
    activeProfileSlug () {
      this.localActiveProfileSlug = this.activeProfileSlug
    },
  },
  computed: {
    rootProfileActive () {
      if (this.$store.getters.mapSettings.skipAllSegments) {
        return false
      }
      if (this.localActiveProfileSlug === this.profile.slug) {
        return true
      } else {
        if (this.activeVehicleType && this.profile.vehicleTypes && this.profile.vehicleTypes.indexOf(this.activeVehicleType) > -1) {
          return true
        } else if (this.profile.nestedProfiles && this.profile.nestedProfiles.indexOf(this.localActiveProfileSlug) > -1) {
          return true
        }
      }
      return false
    },
    /**
     * Determines if the device is mobile
     * @returns {Boolean}
     */
    isMobile () {
      let isMobile = utils.isMobile() || this.$lowResolution
      return isMobile
    },
  },
  methods: {
    getProfileTitle (slug, subProfileSlug) {
      let title
      if (subProfileSlug) {
        let filterKey = `orsMapFilters.profiles.${subProfileSlug}`
        title = this.$t(filterKey)
      }
      if (!title) {
        let filterKey = `orsMapFilters.profiles.${slug}`
        title = this.$t(filterKey)
      }
      return title
    },
    /**
     * Handles the profile selector button click
     * by setting local properties, emitting the profileSelected event
     * and by updating the interface due to the subProfileIsOpen change
     * @param {*} profileSlug
     * @param {*} vehicleType
     * @emits profileSelected
     */
    profileSelected (profileSlug, vehicleType = null) {
      this.localActiveProfileSlug = profileSlug
      this.subProfileIsOpen = false
      let data = {profileSlug, vehicleType: vehicleType}
      this.$emit('profileSelected', data)
    }
  }
}
