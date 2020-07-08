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
      this.eventBus.$emit('showAltitudeModal', this.mapViewData)
    }
  }
}
