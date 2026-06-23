import MapViewData from '@/models/map-view-data'
import {EventBus} from '@/common/event-bus'
import {getTimeOfDay, monthToDOY, timesOfTheDay} from '@/support/heal-utils'

export default {
  props: {
    mapViewData: {
      Type: MapViewData,
      Required: false
    },
    places: []
  },
  components: {},
  data: () => {
    return {
      doy: 202,
      months: [
        {
          label: 'may',
          value: 141
        },
        {
          label: 'june',
          value: 172
        },
        {
          label: 'july',
          value: 202
        },
        {
          label: 'august',
          value: 233
        },
      ],
      selectedTOD: 12
    }
  },
  computed: {
    timesOfTheDayLabel() {
      return timesOfTheDay.map(t => {
        return {
          label: `${this.$t('timeBasedRoute.' + t.label)}`,
          value: t.value
        }
      })
    },
    monthsLabel() {
      return this.months.map(t => {
        return {
          label: `${this.$t('timeBasedRoute.' + t.label)}`,
          value: t.value
        }
      })
    },
  },
  methods: {
    departHourChange() {
      const column = `${this.doy}_${this.selectedTOD}`
      let appRouteData = this.$store.getters.appRouteData
      if (appRouteData.options.options) {
        appRouteData.options.options.profile_params.weightings.csv_column = column
        EventBus.$emit('appRouteDataChanged', appRouteData)
      } else {
        EventBus.$emit('new-csv-column', column)
      }
    }
  },
  created() {
    if (!this.$store.getters.appRouteData.options.options) {
      const currentTime = new Date()
      const currentHour = currentTime.getHours()
      const currentMinute = currentTime.getMinutes()
      this.doy = monthToDOY(currentTime.getMonth())
      this.selectedTOD = getTimeOfDay(currentHour, currentMinute)
    } else {
      const stored = this.$store.getters.appRouteData.options.options.profile_params.weightings.csv_column.split('_')
      this.doy = parseInt(stored[0])
      this.selectedTOD = parseInt(stored[1])
    }
  }
}
