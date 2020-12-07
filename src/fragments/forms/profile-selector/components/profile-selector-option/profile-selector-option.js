
import lodash from 'lodash'

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
    profileSelected (profileSlug, vehicleType) {
      this.localActiveProfileSlug = profileSlug
      this.subProfileIsOpen = false

      if (vehicleType) {
        // In this case nested profile is a valid profile
        this.$emit('profileSelected', {profileSlug, vehicleType})
      } else {
        this.$emit('profileSelected', {profileSlug})
      }
    }
  }
}
