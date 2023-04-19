import MapViewData from '@/models/map-view-data'

export default {
  // props: ['places', 'mapViewData'],
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
        {
          label: 'morning',
          value: '06'
        },
        {
          label: 'noon',
          value: '10'
        },
        {
          label: 'afternoon',
          value: '14'
        },
        {
          label: 'evening',
          value: '18'
        }
      ],
      selectedHour: '14'
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
    /* route(time) {
      console.log('>>> timeBasedRoute >>> route ', time)
    }, */
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

      appRouteData.options.options.profile_params.weightings.csv_column = `176_${this.selectedHour}-26`
      // this.$store.commit('appRouteData', appRouteData)
      this.eventBus.$emit('appRouteDataChanged', appRouteData)
    },

  }
}
