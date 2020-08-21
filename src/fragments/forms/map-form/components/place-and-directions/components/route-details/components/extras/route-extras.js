
import orsDictionary from '@/resources/ors-dictionary'

export default {
  props: {
    route: {
      Type: Object,
      Required: true
    }
  },
  computed: {
    routeExtras () {
      return this.route.properties.extras || []
    }
  },
  methods: {
    showExtra (extraKey) {
      let show = (this.$store.getters.mapSettings[extraKey] === true)
      if (!show) { // check if the extra is being returned in a singular keyed property
        const singular = extraKey.substring(0, extraKey.length - 1)
        show = this.$store.getters.mapSettings[singular] === true
      }
      return show
    },
    showExtras () {
      let extras = 0
      for (const extraKey in this.routeExtras) {
        if (this.showExtra(extraKey)) {
          extras++
        }
      }
      return extras > 0
    },
    colorValue (extraKey, index) {
      const color = orsDictionary.colors[extraKey][index]
      return color
    },
    segmentStyle (extraKey, amount, index) {
      const style = {
        width: amount + '%',
        background: this.colorValue(extraKey, index)
      }
      return style
    },
    getExtraValueLabel (extraKey, value) {
      if (orsDictionary[extraKey] && orsDictionary[extraKey][value]) {
        const key = orsDictionary[extraKey][value]
        const labels = this.$t('routeExtras.orsDictionary')
        if (labels[key]) {
          return labels[key]
        }
        return key
      }
      return value
    },
    showSection (extraKey, value, index) {
      const sectionTitle = this.$t('routeExtras.' + extraKey).toLowerCase()
      const color = this.colorValue(extraKey, index)
      const heighlighData = { extraKey, sectionTitle, sections: [{ intervals: [], color }] }

      const polylineData = this.buildExtraHighlighPolylineData(extraKey, index, value)
      heighlighData.sections.push(polylineData)
      this.eventBus.$emit('highlightPolylineSections', heighlighData)
    },
    showAllSections (extraKey) {
      const sectionTitle = this.$t('routeExtras.' + extraKey).toLowerCase()
      const heighlighData = { extraKey: extraKey, sectionTitle, sections: [] }

      let index = 0
      for (const summaryKey in this.routeExtras[extraKey].summary) {
        const summary = this.routeExtras[extraKey].summary[summaryKey]
        const polylineData = this.buildExtraHighlighPolylineData(extraKey, index, summary.value)
        heighlighData.sections.push(polylineData)
        index++
      }
      this.eventBus.$emit('highlightPolylineSections', heighlighData)
    },
    buildExtraHighlighPolylineData (extraKey, index, value) {
      const color = this.colorValue(extraKey, index)
      const label = this.getExtraValueLabel(extraKey, value).toLowerCase()
      const intervals = this.lodash.filter(this.routeExtras[extraKey].values, (v) => {
        return v[2] === value
      })
      return {
        intervals,
        color,
        label
      }
    }
  }
}
