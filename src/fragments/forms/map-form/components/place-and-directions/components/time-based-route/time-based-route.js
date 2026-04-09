import MapViewData from '@/models/map-view-data'
import {EventBus} from '@/common/event-bus'

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
      timesOfTheDay: [
        {
          label: 'morning',
          value: 9
        },
        {
          label: 'noon',
          value: 12
        },
        {
          label: 'afternoon',
          value: 15
        },
        {
          label: 'evening',
          value: 18
        }
      ],
      selectedTOD: 12
    }
  },
  computed: {
    timesOfTheDayLabel() {
      return this.timesOfTheDay.map(t => {
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
      let appRouteData = this.$store.getters.appRouteData
      appRouteData.options.options.profile_params.weightings.csv_column = `${this.doy}_${this.selectedTOD}`
      EventBus.$emit('appRouteDataChanged', appRouteData)
    },
    getTimeOfDay(hour, minute) {
      // Function to determine the time of the day
      const totalMinutes = hour * 60 + minute

      if (totalMinutes >= 0 && totalMinutes <= 11 * 60 + 30) {
        return this.timesOfTheDay[0].value // Morning
      } else if (totalMinutes <= 14 * 60 + 30) {
        return this.timesOfTheDay[1].value // Noon
      } else if (totalMinutes <= 17 * 60 + 30) {
        return this.timesOfTheDay[2].value // Afternoon
      } else {
        return this.timesOfTheDay[3].value // Evening
      }
    },
    monthToDOY(month){
      const monthMap = {
        4: 141,
        5: 172,
        6: 202,
        7: 233
      }
      if (month < 4) return monthMap[4]
      else if (month > 7) return monthMap[7]
      else return monthMap[month]
    }
  },
  created() {
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    const currentMinute = currentTime.getMinutes()
    this.doy = this.monthToDOY(currentTime.getMonth())
    this.selectedTOD = this.getTimeOfDay(currentHour, currentMinute)
  }
}
