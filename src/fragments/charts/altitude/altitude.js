import {Line} from 'vue-chartjs'
import AltitudeDataParser from './altitude-parser'
import MapViewData from '@/models/map-view-data'
import {EventBus} from '@/common/event-bus'
import theme from '@/config/theme'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
)

export default {
  props: {
    mapViewData: {
      required: true,
      type: MapViewData
    },
    propagateActivePoint: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    parsedData: null,
    chartOptions: {
      aspectRatio: 4,
      scales: {
        x: {
          display: false
        }
      }
    }
  }),
  components: {
    lineChart: Line
  },
  created () {
    this.setChartDefaults()
    this.build()

    // Rebuild altitude data when the active route index change
    EventBus.$on('activeRouteIndexChanged', this.build)
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
        const currentRoute = this.mapViewData.routes[this.$store.getters.activeRouteIndex]
        this.parsedData = AltitudeDataParser.parse(currentRoute, this.$t('global.units.meters'))
      }
    },
    chartHoverIndexChanged (index) {
      if (this.propagateActivePoint) {
        EventBus.$emit('altitudeChartHoverIndexChanged', index)
      }
    },
    mouseLeftChart () {
      EventBus.$emit('mouseLeftChartAltitudeChart')
    },
    /**
     * These are global defaults for ChartJS and should be moved/adjusted if other charts are added.
     */
    setChartDefaults () {
      ChartJS.defaults.datasets.line.borderColor = theme.info
      ChartJS.defaults.datasets.line.borderWidth = 3
      ChartJS.defaults.datasets.line.lineTension = 0.5
      ChartJS.defaults.datasets.line.backgroundColor = '#A1C8DC'
      ChartJS.defaults.datasets.line.pointHoverBackgroundColor = 'white'
      ChartJS.defaults.datasets.line.fill = true
      ChartJS.defaults.datasets.line.pointRadius = 0
      ChartJS.defaults.datasets.line.pointHitRadius = 4

    }
  }
}
