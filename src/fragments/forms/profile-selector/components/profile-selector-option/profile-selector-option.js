
import lodash from 'lodash'

export default {
  data: () => ({
    extraProfilesOpen: false,
  }),
  props: {
    profile: {
      type: Object,
      required: true
    },
    activeProfile: {
      type: String,
      required: false
    },
    nestedItemActive: {
      type: String,
      required: false
    }
  },
  computed: {
    active () {
      if (this.activeProfile === this.profile.slug) {
        return true
      } else {
        if (this.nestedItemActive && this.profile.vehicleTypes && this.profile.vehicleTypes.indexOf(this.nestedItemActive) > -1) {
          return true
        } else if (this.profile.nestedProfiles && this.profile.nestedProfiles.indexOf(this.activeProfile) > -1) {
          return true
        }
      }
      return false
    },
  },
  methods: {
    getProfileTitle (slug, nestedItem) {
      let title
      if (nestedItem) {
        let filterKey = `orsMapFilters.profiles.${nestedItem}`
        title = this.$t(filterKey)
      }
      if (!title) {
        let filterKey = `orsMapFilters.profiles.${slug}`
        title = this.$t(filterKey)
      }
      return title
    },
    profileSelected (profileSlug, nestedItemSlug) {
      this.extraProfilesOpen = false
      if (nestedItemSlug && this.profile.nestedProfiles && this.profile.nestedProfiles.indexOf(nestedItemSlug) > -1) {
        // nested profile is a valid profile
        this.$emit('profileSelected', {profileSlug: nestedItemSlug})
      } else if (nestedItemSlug) {
        this.$emit('profileSelected', {profileSlug, vehicleType: nestedItemSlug})
      } else {
        this.$emit('profileSelected', {profileSlug})
      }  
    }
  }
}
