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
      month: 202,
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
      selectedTOD: 'noon'
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
    /*routeOnHotDays(time) {
      console.log('>>> timeBasedRoute >>> routeOnHotDays ', time)
    },*/
    departHourChange() {
      let appRouteData = this.$store.getters.appRouteData
      // console.log('>>> departHourChange ', this.selectedTOD, appRouteData)

      appRouteData.options.options.profile_params.weightings.csv_column = `${this.month}_${this.selectedTOD}`
      // this.$store.commit('appRouteData', appRouteData)
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
    }
  },
  created() {
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    const currentMinute = currentTime.getMinutes()

    this.selectedTOD = this.getTimeOfDay(currentHour, currentMinute)
    let appRouteData = this.$store.getters.appRouteData
    if (appRouteData.options.options.profile_params.weightings.csv_column) {
      let [url_TOD, url_today] = appRouteData.options.options.profile_params.weightings.csv_column.split('_')
      this.selectedTOD = url_TOD
      this.month = Number.parseInt(url_today)
    } else {
      console.log(appRouteData)
    }
  }
}
