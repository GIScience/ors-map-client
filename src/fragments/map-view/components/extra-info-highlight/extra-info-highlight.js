import routeData from '@/support/map-data-services/ors-response-data-extractors/route-data'
import tinycolor2 from 'tinycolor2'
import { LPolyline, LTooltip } from 'vue2-leaflet'

export default {
  props: {
    polylineData: {
      required: false,
      type: Array
    }
  },
  data () {
    return {
      extraInfo: null,
      highlightedPolyline: null,
      highlightedPolylineSnack: false
    }
  },
  components: {
    LPolyline,
    LTooltip
  },
  computed: {
    highlightedPolylines () {
      if (this.highlightedPolyline) {
        return this.highlightedPolyline
      }
    }
  },
  methods: {
    buildHighlightedPolyline () {
      if (this.polylineData) {
        this.highlightedPolyline = routeData.buildHighlightedPolylines(this.polylineData, this.extraInfo)
      }
    },
    removeHightlightedSegments () {
      this.highlightedPolyline = null
      this.highlightedPolylineSnack = false
    },
    highlightedSectionStyle (backgroundColor) {
      let foreGroundColor = tinycolor2(backgroundColor).isLight() ? 'black' : 'white'
      return { backgroundColor, color: foreGroundColor }
    }
  },
  created () {
    let context = this
    this.eventBus.$on('highlightPolylineSections', (extraInfo) => {
      context.extraInfo = extraInfo
      context.highlightedPolylineSnack = true
      context.buildHighlightedPolyline()
    })
  }
}
