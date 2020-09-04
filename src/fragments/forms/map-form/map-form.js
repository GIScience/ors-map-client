import PlacesAndDirections from './components/place-and-directions/PlacesAndDirections'
import Isochrones from './components/isochrones/Isochrones'
import resolver from '@/support/routes-resolver'
import constants from '@/resources/constants'
import lodash from 'lodash'

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
     * Get the target app mode considering the route
     * @returns {String} targetMode
     */
    getTargetMode () {
      let targetMode = constants.modes.place
      if (this.$route.fullPath.includes(resolver.directions())) {
        var placeNameParams = lodash.pickBy(this.$route.params, function (value, key) {
          return key.startsWith('placeName') && value !== undefined
        })
        targetMode = placeNameParams.lenght === 1 ? constants.modes.roundTrip : constants.modes.directions
      } else {
        targetMode = constants.modes.place
      }
      return targetMode
    },
    /**
     * Load the map data from the url
     * rebuilding the place inputs and it values
     * and render the map with these data (place or route)
     */
    setTab () {
      if (this.$store.getters.mode === constants.modes.isochrones) {
        this.activeTab = 1
        this.$store.commit('setLeftSideBarIsOpen', true)
      } else {
        this.activeTab = 0
      }
    }
  }
}
