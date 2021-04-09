import Altitude from '@/fragments/charts/altitude/Altitude'
import MapViewData from '@/models/map-view-data'

export default {
  props: {
    height: {
      type: Number,
      default: 100
    },
    mapViewData: {
      required: true,
      type: MapViewData
    }
  },
  components: {
    Altitude
  },
  methods: {
    openAltitudeBox () {
      // if in low resolution, close the sidebar
      // before displaying the altitude modal
      if (this.$lowResolution) {
        this.$store.commit('setLeftSideBarIsOpen', false)
      }
      this.eventBus.$emit('showAltitudeModal')
    }
  }
}
