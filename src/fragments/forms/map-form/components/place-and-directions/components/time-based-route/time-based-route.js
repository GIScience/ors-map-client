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
      today_toggle: 't',
      timesOfTheDay: [
        {
          label: 'morning',
          value: 'morning'
        },
        {
          label: 'noon',
          value: 'noon'
        },
        {
          label: 'afternoon',
          value: 'afternoon'
        },
        {
          label: 'evening',
          value: 'evening'
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
  },
  methods: {
    /*routeOnHotDays(time) {
      console.log('>>> timeBasedRoute >>> routeOnHotDays ', time)
    },*/
    departHourChange() {
      let appRouteData = this.$store.getters.appRouteData
      // console.log('>>> departHourChange ', this.selectedTOD, appRouteData)

      appRouteData.options.options.profile_params.weightings.csv_column = `${this.selectedTOD}_${this.today_toggle}`
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
      if (url_TOD === 'heat') {
        // old column names in url
        this.selectedTOD = url_today
        this.today_toggle = 't'
      } else {
        this.selectedTOD = url_TOD
        this.today_toggle = url_today
      }
    } else {
      console.log(appRouteData)
    }
  }
}
