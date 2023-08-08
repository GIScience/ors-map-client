import RouteImporter from '@/fragments/forms/route-importer/RouteImporter.vue'
import MapFormBtn from '@/fragments/forms/map-form-btn/MapFormBtn.vue'
import constants from '@/resources/constants'
import appConfig from '@/config/app-config'

export default {
  data: () => ({
  }),
  props: {
    // Amount of place inputs
    placeInputs: {
      required: true,
      type: Number
    },
    // Amount of place inputs
    disabledActions: {
      default: () => [],
      type: Array
    }
  },
  components: {
    RouteImporter,
    MapFormBtn
  },
  computed: {
    /**
     * Determines if a place input can be added to the view
     * @returns boolean
     */
    canAddPlaceInput () {
      return this.placeInputs < appConfig.maxPlaceInputs
    },
    roundTripActive () {
      return this.$store.getters.mode === constants.modes.roundTrip
    }
  },
  methods: {
    isEnabled (action) {
      const disabled = this.disabledActions
      return !disabled.includes(action)
    },
    /**
     * Toggle round trip
     */
    toggleRoundTrip () {
      this.$emit('toggleRoundTrip')
    },
    /**
     * Add a place input
     */
    addPlaceInput () {
      this.$emit('addPlaceInput')
    },
    /**
     * Reset the places input to its default status (only one empty input)
     */
    clearPlaces () {
      this.$emit('clearPlaces')
    },
    /**
     * Reverse the route places
     */
    reverseRoute () {
      this.$emit('reverseRoute')
    },
    contentUploaded (data) {
      this.$emit('contentUploaded', data)
    }
  }
}
