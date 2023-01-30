import Download from '@/fragments/forms/map-form/components/download/Download'
import Share from '@/fragments/forms/map-form/components/share/Share'
import Print from '@/fragments/forms/map-form/components/print/Print'
import PolygonUtils from '@/support/polygon-utils'
import MapViewData from '@/models/map-view-data'
import Utils from '@/support/utils'
import {EventBus} from '@/common/event-bus'


export default {
  data: () => ({
    localMapViewData: null
  }),
  props: {
    mapViewData: {
      Type: MapViewData,
      Required: true
    }
  },
  components: {
    Share,
    Download,
    Print
  },
  computed: {
    shareUrl () {
      return location.href
    }
  },
  created() {
    this.localMapViewData = this.mapViewData.clone()
  },
  methods: {
    calcArea (polygon) {
      return PolygonUtils.calcPolygonArea(polygon)
    },
    polygonAreaTextColor (backgroundColor) {
      return Utils.contrastingTextColor(backgroundColor)
    },
    hasAsCenter (place, polygon) {
      return PolygonUtils.hasPlaceAsCenter(place, polygon)
    },
    toggleVisibility (polygonIndex) {
      EventBus.$emit('togglePolygonVisibility', polygonIndex)
    },

    polygonOpacityChanged (polygonIndex) {
      let fillOpacity = this.localMapViewData.polygons[polygonIndex].properties.fillOpacity
      EventBus.$emit('setPolygonOpacity', {polygonIndex, fillOpacity })
    }
  },
  watch: {
    /**
     * Every time the response data changes
     * the map builder is reset and the
     * map data is reloaded
     */
    mapViewData: {
      handler: function () {
        this.localMapViewData = this.mapViewData.clone()
      },
      deep: true
    },
  }
}
