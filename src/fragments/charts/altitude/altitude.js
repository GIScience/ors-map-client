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
    if (this.mapViewData.hasRoutes()) {
      this.localMapViewData = this.mapViewData
    }
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
      if (this.mapViewData) {
        const summary = this.mapViewData.routes[this.$store.getters.activeRouteIndex].summary
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
    mapViewData: {
      handler: function () {
        this.build()
      },
      deep: true
    }
  },

  methods: {
    build () {
      if (this.mapViewData.hasRoutes()) {
        this.parsedData = AltitudeDataParser.parse(this.mapViewData, this.$store.getters.activeRouteIndex)
      }
    },
    chartHoverIndexChanged (index) {
      this.eventBus.$emit('altitudeChartHoverIndexChanged', index)
    },
    mouseLeftChart () {
      this.eventBus.$emit('mouseLeftChartAltitudeChart')
    }
  }
}
