import InstructionCodeToSymbol from '@/resources/lists/instruction-code-to-symbol'
import MapViewData from '@/models/map-view-data'
import GeoUtils from '@/support/geo-utils'
import Utils from '@/support/utils'

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
    contentTitle () {
      let places = this.localMapViewData.places
      let title = this.$t(`orsMapFilters.profiles.${this.localMapViewData.options.profile}`) + ': '

      if (places.length > 0 && places[0].placeName) {
        title +=  places[0].placeName
      }

      if (places.length > 1 && places.at(-1).placeName) {
        title += ` &rArr; ${places.at(-1).placeName}`
      }
      return title
    },
    activeRoute () {
      let route = this.localMapViewData.routes[this.$store.getters.activeRouteIndex]
      return route
    },

  },
  methods: {
    humanizedSummary (summary) {
      summary = Utils.clone(summary)
      summary.unit = this.$store.getters.mapSettings.unit
      summary = GeoUtils.getHumanizedTimeAndDistance(summary, this.$t('global.units'))
      return summary
    },
    getGlobalStepCounter (segmentIndex, stepIndex) {
      let counter = stepIndex

      if (segmentIndex > 0) {
        for (let i = 0; i < segmentIndex; i++) {
          let steps = this.activeRoute.properties.segments[segmentIndex].steps.length
          counter += steps
        }
        counter += stepIndex
      }
      return counter + 1
    },

    getStepSymbol (step) {
      let symbol = InstructionCodeToSymbol[step.type]
      return symbol
    },
  }
}
