import {EventBus} from '@/common/event-bus'
import appConfig from '@/config/app-config'

const NO_STATE = '_'

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
      if (!this.hasStateLevel) {
        this.selectedState = NO_STATE
      }
    } catch (e) {
      console.error('Failed to load countries:', e)
    }
  },

  computed: {
    countryStateCityMap() {
      const map = {}

      Object.entries(this.countries).forEach(([rawCountry, states]) => {
        const stateMap = {}

        Object.entries(states || {}).forEach(([rawState, cities]) => {
          stateMap[rawState] = {
            text: this.localizedName('states', rawState),
            value: rawState,
            cities: (cities || []).map((rawCity) => ({
              text: this.localizedName('cities', rawCity),
              value: rawCity
            }))
          }
        })

        map[rawCountry] = {
          text: this.localizedName('countries', rawCountry),
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
      if (!this.selectedCountry || !this.hasStateLevel) return []
      return Object.values(this.countryStateCityMap[this.selectedCountry]?.states || {})
        .sort((a, b) => a.text.localeCompare(b.text))
    },

    hasStateLevel() {
      if (!this.selectedCountry) return false
      const stateKeys = Object.keys(this.countryStateCityMap[this.selectedCountry]?.states || {})
      return !(stateKeys.length === 1 && stateKeys[0] === NO_STATE)
    },

    cities() {
      if (!this.selectedCountry || !this.selectedState) return []
      return (this.countryStateCityMap[this.selectedCountry]?.states[this.selectedState]?.cities || [])
        .sort((a, b) => a.text.localeCompare(b.text))
    }
  },
  watch: {
    selectedCountry(newCountry) {
      if (!this.hasStateLevel) {
        const previousState = this.selectedState
        this.selectedState = NO_STATE
        if (previousState === NO_STATE) {
          this.selectCity()
        }
        return
      }
      const states = Object.values(this.countryStateCityMap[newCountry]?.states || {})
      if (states.length === 1) {
        this.selectedState = states[0].value
      } else {
        this.selectedState = null
        this.selectedCity = null
      }
    },
    selectedState() {
      this.selectCity()
    }
  },
  methods: {
    selectCity() {
      const cities = this.cities
      if (cities.length === 1) {
        this.selectedCity = cities[0].value
        this.changeCity()
      } else {
        this.selectedCity = null
      }
    },
    localizedName(category, slug) {
      const key = `citySelector.places.${category}.${slug}`
      if (this.$te(key)) {
        return this.$t(key)
      }
      const fallbackLocale = this.$i18n.fallbackLocale
      if (fallbackLocale && this.$te(key, fallbackLocale)) {
        return this.$t(key, fallbackLocale)
      }
      return this.prepareString(slug)
    },
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
