import LineChart from '@/fragments/charts/line-chart/line-chart'
import ChartWrapper from '@/fragments/charts/chart-wrapper/ChartWrapper'
import AltitudeDataParser from './altitude-parser'
import MapViewData from '@/models/map-view-data'

export default {
  props: {
    mapViewData: {
      required: true,
      type: MapViewData
    },
    height: {
      type: Number,
      default: 300
    },
    showVariations: {
      type: Boolean,
      default: true
    },
    propagateActivePoint: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    parsedData: null,
    altitudeLabels: [],
    altitudeDatasets: [],
    localMapViewData: null
  }),
  components: {
    LineChart,
    ChartWrapper
  },
  created () {
    this.build()

    // Rebuild altitude data when the active route index change
    this.eventBus.$on('activeRouteIndexChanged', this.build)
  },
  computed: {
    altitudeData () {
      const hasData = this.parsedData && Array.isArray(this.parsedData.datasets) && this.parsedData.datasets.length > 0
      const data = hasData ? this.parsedData : false
      return data
    },
    summary () {
      if (this.localMapViewData) {
        const summary = this.localMapViewData.routes[this.$store.getters.activeRouteIndex].summary
        return summary
      }
    },
    ascent () {
      const value = Math.abs(this.summary.ascent).toFixed(1)
      return value
    },
    descent () {
      const value = Math.abs(this.summary.descent).toFixed(1)
      return value
    }
  },
  watch: {
    'mapViewData.routes': {
      handler: function () {
        this.build()
      },
      deep: true
    }
  },

  methods: {
    build () {
      if (this.mapViewData.hasRoutes()) {
        this.localMapViewData = this.mapViewData.clone()
        let translations = {meters: this.$t('global.units.meters')}
        this.parsedData = AltitudeDataParser.parse(this.localMapViewData, this.$store.getters.activeRouteIndex, translations)
      }
    },
    chartHoverIndexChanged (index) {
      if (this.propagateActivePoint) {
        this.eventBus.$emit('altitudeChartHoverIndexChanged', index)
      }
    },
    mouseLeftChart () {
      this.eventBus.$emit('mouseLeftChartAltitudeChart')
    }
  }
}
