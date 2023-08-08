import PlacesAndDirections from './components/place-and-directions/PlacesAndDirections'
import Isochrones from './components/isochrones/Isochrones'
import resolver from '@/support/routes-resolver'
import constants from '@/resources/constants'
import appConfig from '@/config/app-config'

export default {
  data: () => ({
    activeTab: '0'
  }),
  components: {
    PlacesAndDirections,
    Isochrones
  },
  watch: {
    activeTab: function () {
      this.tabChanged()
    },
    $route: function () {
      this.setTab()
    },
    '$store.getters.mode': function () {
      this.setTab()
    }
  },
  created () {
    this.setTab()
  },
  computed: {
    hasPlacesAndDirectionsTab () {
      return appConfig.supportsPlacesAndDirections
    },
    hasIsochronesTab () {
      return appConfig.supportsIsochrones
    }
  },
  methods: {
    /**
     * Handle the tab change event
     */
    tabChanged () {
      if (this.activeTab === 0) {
        if (this.$store.getters.mode === constants.modes.isochrones) {
          if (this.$route.fullPath.includes(resolver.directions())) {
            this.$store.commit('mode', constants.modes.directions)
          } else {
            this.$store.commit('mode', constants.modes.place)
          }
        }
      } else if (this.activeTab === 1) {
        this.$store.commit('mode', constants.modes.isochrones)
      }
    },
    /**
     * Load the map data from the url
     * rebuilding the place inputs, and it values
     * and render the map with this data (place or route)
     */
    setTab () {
      if (!this.hasPlacesAndDirectionsTab) (
        this.$store.commit('mode', constants.modes.isochrones)
      )
      if (this.hasIsochronesTab && this.$store.getters.mode === constants.modes.isochrones) {
        this.activeTab = 1
        if (this.$mdAndUpResolution && !this.$store.getters.embed) {
          this.$store.commit('setLeftSideBarIsOpen', true)
        }
      } else {
        this.activeTab = 0

      }
    }
  }
}
