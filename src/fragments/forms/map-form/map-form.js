import PlacesAndDirections from './components/place-and-directions/PlacesAndDirections'
import Isochrones from './components/isochrones/Isochrones'
import Optimization from './components/optimization/Optimization'
import resolver from '@/support/routes-resolver'
import constants from '@/resources/constants'
import appConfig from '@/config/app-config'

export default {
  data: () => ({
    activeTab: '0'
  }),
  components: {
    PlacesAndDirections,
    Isochrones,
    Optimization
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
    },
    hasOptimizationTab () {
      return appConfig.supportsOptimization
    }
  },
  methods: {
    /**
     * Handle the tab change event
     */
    tabChanged () {
      if (this.activeTab === 0) {
        if ([constants.modes.isochrones, constants.modes.optimization].includes(this.$store.getters.mode)) {
          if (this.$route.fullPath.includes(resolver.directions())) {
            this.$store.commit('mode', constants.modes.directions)
          } else {
            this.$store.commit('mode', constants.modes.place)
          }
        }
      } else if (this.activeTab === 1) {
        this.$store.commit('mode', constants.modes.isochrones)
      } else if (this.activeTab === 2) {
        this.$store.commit('mode', constants.modes.optimization)
      }
    },
    /**
     * Load the map data from the url
     * rebuilding the place inputs, and it values
     * and render the map with this data (place or route)
     */
    setTab () {
      if (!this.hasPlacesAndDirectionsTab) {
        if (!this.hasIsochronesTab) {
          this.$store.commit('mode', constants.modes.optimization)
        } else {
          this.$store.commit('mode', constants.modes.isochrones)
        }
      }
      if (this.hasIsochronesTab && this.$store.getters.mode === constants.modes.isochrones) {
        this.activeTab = 1
        if (this.$mdAndUpResolution && !this.$store.getters.embed) {
          this.$store.commit('setLeftSideBarIsOpen', true)
        }
      } else if (this.hasOptimizationTab && this.$store.getters.mode === constants.modes.optimization) {
        this.activeTab = 2
        if (this.$mdAndUpResolution && !this.$store.getters.embed) {
          this.$store.commit('setLeftSideBarIsOpen', true)
        }
      } else {
        this.activeTab = 0

      }
    }
  }
}
