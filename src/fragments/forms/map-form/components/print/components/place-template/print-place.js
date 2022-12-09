import MapViewData from '@/models/map-view-data'

export default {
  props: {
    mapViewData: {
      type: MapViewData
    },
    mapViewImage: {
      type: String
    }
  },
  created () {
    this.localMapViewData = this.mapViewData
  },
  data: () => ({
    localMapViewData: null,
    mapImageDataUrl: null
  }),
  computed: {
    place () {
      return this.localMapViewData.places[0]
    }
  }
}
