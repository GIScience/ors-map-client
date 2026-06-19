import {EventBus} from '@/common/event-bus'
import appConfig from '@/config/app-config'

export default {
  name: 'city-selector',

  data() {
    const url = window.location.href.split('?')
    let urlParams = new URLSearchParams()
    if (url.length > 1) {
      urlParams = new URLSearchParams(url[1])
    }

    return {
      selectedCountry: urlParams.get('country') || appConfig.defaultCountry,
      selectedState: urlParams.get('state') || appConfig.defaultState,
      selectedCity: urlParams.get('city') || appConfig.defaultCity,
      countries: {}
    }
  },

  async created() {
    try {
      const res = await fetch('/aois/countries.json')
      this.countries = await res.json()
    } catch (e) {
      console.error('Failed to load countries:', e)
    }
  },

  computed: {
    countryStateCityMap() {
      const map = {}

      Object.entries(this.countries).forEach(([rawCountry, states]) => {
        const stateMap = {}

        Object.entries(states).forEach(([rawState, cities]) => {
          stateMap[rawState] = {
            text: this.prepareString(rawState),
            value: rawState,
            cities: cities.map(rawCity => ({
              text: this.prepareString(rawCity),
              value: rawCity
            }))
          }
        })

        map[rawCountry] = {
          text: this.prepareString(rawCountry),
          value: rawCountry,
          states: stateMap
        }
      })

      return map
    },

    countryOptions() {
      return Object.values(this.countryStateCityMap)
        .sort((a, b) => a.text.localeCompare(b.text))
    },

    states() {
      if (!this.selectedCountry) return []
      return Object.values(this.countryStateCityMap[this.selectedCountry]?.states || {})
        .sort((a, b) => a.text.localeCompare(b.text))
    },

    cities() {
      if (!this.selectedCountry || !this.selectedState) return []
      return (this.countryStateCityMap[this.selectedCountry]?.states[this.selectedState]?.cities || [])
        .sort((a, b) => a.text.localeCompare(b.text))
    }
  },
  watch: {
    selectedCountry(newCountry) {
      const states = Object.values(this.countryStateCityMap[newCountry]?.states || {})
      if (states.length === 1) {
        this.selectedState = states[0].value
      } else {
        this.selectedState = null
        this.selectedCity = null
      }
    },
    selectedState(newState) {
      const cities = this.countryStateCityMap[this.selectedCountry]?.states[newState]?.cities || []
      if (cities.length === 1) {
        this.selectedCity = cities[0].value
        this.changeCity()
      } else {
        this.selectedCity = null
      }
    }
  },
  methods: {
    prepareString(s) {
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
          country: this.selectedCountry,
          state: this.selectedState,
          city: this.selectedCity,
        }
      })

      EventBus.$emit(
        'city-change',
        this.selectedCountry + '/' + this.selectedState + '/' + this.selectedCity
      )
    }
  }
}
