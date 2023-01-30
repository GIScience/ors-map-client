import Altitude from '@/fragments/charts/altitude/Altitude'
import MapViewData from '@/models/map-view-data'
import {EventBus} from '@/common/event-bus'

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
      EventBus.$emit('showAltitudeModal')
    }
  }
}
