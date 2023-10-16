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
      timesOfTheDay: [
        {
          label: 'morning',
          value: 'heat_morning'
        },
        {
          label: 'noon',
          value: 'heat_noon'
        },
        {
          label: 'afternoon',
          value: 'heat_afternoon'
        },
        {
          label: 'evening',
          value: 'heat_evening'
        }
      ],
      selectedHour: 'heat_noon'
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
      // console.log('>>> departHourChange ', this.selectedHour, appRouteData)

      appRouteData.options.options.profile_params.weightings.csv_column = `${this.selectedHour}`
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

    this.selectedHour = this.getTimeOfDay(currentHour, currentMinute)
  }
}
