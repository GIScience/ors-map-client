import {EventBus} from '@/common/event-bus'
import appConfig from '@/config/app-config'

export default {
  name: 'app-city-selector',
  computed: {
    stateCityMap: function () {
      const ctx = require.context(
        '@/assets/aois',
        true,
        /\.geojson$/
      )

      return ctx.keys().reduce((map, path) => {
        const parts = path
          .replace(/^\.\//, '')
          .replace(/\.geojson$/, '')
          .split('/')

        const rawState = parts[0]
        const rawCity = parts[1]

        if (!map[rawState]) {
          map[rawState] = {
            text: this.prepareString(rawState),
            value: rawState,
            cities: []
          }
        }

        map[rawState].cities.push({
          text: this.prepareString(rawCity),
          value: rawCity
        })

        return map
      }, {})
    },

    states: function () {
      return Object.values(this.stateCityMap)
        .sort((a, b) => a.text.localeCompare(b.text))
    },

    cities: function () {
      if (!this.selectedState) return []
      return (this.stateCityMap[this.selectedState]?.cities || [])
        .sort((a, b) => a.text.localeCompare(b.text))
    }
  },
  methods: {
    prepareString: function (s) {
      return (String(s[0]).toUpperCase() + String(s).slice(1))
        .replace('ae', 'ä')
        .replace('oe', 'ö')
        .replace('ue', 'ü')
        .replace(/(^|\/|-)(\S)/g, s => s.toUpperCase())
    },
    changeCity: function () {
      this.$router.push({
        name: 'MapLocation',
        query: {
          state: this.selectedState,
          city: this.selectedCity,
        }
      })
      EventBus.$emit('city-change', this.selectedState + '/' + this.selectedCity)
    }
  },
  data() {
    const url = window.location.href.split('?')
    let urlParams = new URLSearchParams()
    if (url.length>1){
      urlParams = new URLSearchParams(url[1])
    }
    return {
      selectedState: urlParams.get('state') || appConfig.defaultState,
      selectedCity: urlParams.get('city') || appConfig.defaultCity
    }
  }
}
