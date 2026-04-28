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
      selectedState: urlParams.get('state') || appConfig.defaultState,
      selectedCity: urlParams.get('city') || appConfig.defaultCity,
      aois: {}
    }
  },

  async created() {
    try {
      const res = await fetch(`/aois/index.json`)
      this.aois = await res.json()
    } catch (e) {
      console.error('Failed to load AOIs:', e)
    }
  },

  computed: {
    stateCityMap() {
      const map = {}

      Object.entries(this.aois).forEach(([rawState, cities]) => {
        map[rawState] = {
          text: this.prepareString(rawState),
          value: rawState,
          cities: cities.map(rawCity => ({
            text: this.prepareString(rawCity),
            value: rawCity
          }))
        }
      })

      return map
    },

    states() {
      return Object.values(this.stateCityMap)
        .sort((a, b) => a.text.localeCompare(b.text))
    },

    cities() {
      if (!this.selectedState) return []
      return (this.stateCityMap[this.selectedState]?.cities || [])
        .sort((a, b) => a.text.localeCompare(b.text))
    }
  },
  watch: {
    selectedState(newState) {
      const cities = this.stateCityMap[newState]?.cities || []
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
          state: this.selectedState,
          city: this.selectedCity,
        }
      })

      EventBus.$emit(
        'city-change',
        this.selectedState + '/' + this.selectedCity
      )
    }
  }
}
