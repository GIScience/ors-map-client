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
  components: {

  },
  data: () => {
    return {
      // hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      timesOfTheDay: [
      // {
      //   label: 'now',
      //   value: 'now'
      // },
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
    timesOfTheDayLabel () {
      return this.timesOfTheDay.map( t => {
        return {
          label: `${this.$t('timeBasedRoute.'+ t.label)}`,
          value: t.value
        }
      })
    },
  },
  methods: {
    routeOnHotDays(time) {
      console.log('>>> timeBasedRoute >>> routeOnHotDays ', time)
    },
    /* addHour() {
      if(this.selectedHour >= 0 && this.selectedHour < 23)
      this.selectedHour++
    },
    subtracthour() {
      if(this.selectedHour > 0 && this.selectedHour <= 23)
      this.selectedHour--
    }, */
    departHourChange() {
      let appRouteData = this.$store.getters.appRouteData
      // console.log('>>> departHourChange ', this.selectedHour, appRouteData)

      appRouteData.options.options.profile_params.weightings.csv_column = `${this.selectedHour}`
      // this.$store.commit('appRouteData', appRouteData)
      EventBus.$emit('appRouteDataChanged', appRouteData)
    },

  }
}
