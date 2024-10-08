import orsDictionary from '@/resources/ors-dictionary'
import {EventBus} from '@/common/event-bus'
import Utils from '@/support/utils'

export default {
  data () {
    return {
      showExtraInfoSection: null
    }
  },
  props: {
    route: {
      Type: Object,
      Required: true
    }
  },
  watch: {
    route: {
      handler: function (newVal, oldVal) {
        // avoid update on map center move
        let diff = Utils.getObjectsDiff(newVal, oldVal)
        if (diff.different.length) {
          this.showFromExistingSetting()
        }
      }
    }
  },
  computed: {
    /**
     * Return the array of extras or an empty array
     * @returns {Array}
     */
    routeExtras () {
      if (this.route.properties.extras?.['steepness']) {
        this.route.properties.extras['steepness'].summary = this.route.properties.extras['steepness'].summary.sort((a, b) => parseInt(a.value) - parseInt(b.value))
      }
      return this.route.properties.extras || []
    }
  },
  created() {
    this.showFromExistingSetting()
  },
  methods: {
    showFromExistingSetting() {
      // get current displayed extras
      let {key: extraKey, value: extraValue, index: index} = this.$store.getters.extraHighlight
      if (extraKey) {
        this.showExtraInfoSection = 0  // show extra section
        // does the active route have the specific extraValue?
        if (this.routeExtras[extraKey].summary.map(e => e.value).includes(extraValue)) {
          this.showSection(extraKey, extraValue, index)
        } else {
          this.showAllSections(extraKey)
        }
      }
    },
    /**
     * Determines if a given
     * extra must be shown by
     * checking if it is enabled
     * in the app settings
     * @param {*} extraKey
     * @returns {Boolean}
     */
    showExtra (extraKey) {
      let show = (this.$store.getters.mapSettings[extraKey] === true)
      if (!show) { // check if the extra is being returned in a singular keyed property
        const singular = extraKey.substring(0, extraKey.length - 1)
        show = this.$store.getters.mapSettings[singular] === true
      }
      return show
    },
    /**
     * Determines if the extras block must
     * be shown, checking if exists
     * extra data
     * @returns {Boolean}
     */
    showExtras () {
      let extras = 0
      for (const extraKey in this.routeExtras) {
        if (this.showExtra(extraKey)) {
          extras++
        }
      }
      return extras > 0
    },
    /**
     * Get the color from the ors dictionary
     * based on the extra key and index
     * @param {*} extraKey
     * @param {*} index
     * @param {*} value
     */
    colorValue (extraKey, index, value = null) {
      let dict = orsDictionary
      let color
      if (value !== null) {
        color = dict.colors[extraKey][value]
      } else {
        color = dict.colors[extraKey][index]
      }

      return color
    },
    /**
     * Build and return
     * the segment style object
     * @param {String} extraKey
     * @param summary amount, value
     * @param {Integer} index
     * @returns {Object}
     */
    segmentStyle (extraKey, summary, index) {
      const style = {
        width: summary.amount + '%',
        background: this.colorValue(extraKey, index, summary.value)
      }
      return style
    },
    /**
     * Get the label of an extra value
     * @param {String} extraKey
     * @param {Integer} value
     * @returns {Integer} value
     */
    getExtraValueLabel (extraKey, value) {
      let dict = orsDictionary
      if (dict[extraKey] && dict[extraKey][value]) {
        const key = dict[extraKey][value]
        const labels = this.$t('orsDictionary')
        if (labels[key]) {
          return labels[key]
        }
        return key
      }
      return value
    },
    /**
     * Handle the show section click by
     * building the object and emitting a
     * highlightPolylineSections event
     * that will be caught by the map view
     * to highlight a given section of a given extra key
     * @param {String} extraKey
     * @param {Integer} value
     * @param {Integer} index
     * @emits highlightPolylineSections (via EventBus)
     */
    showSection (extraKey, value, index) {
      this.$store.commit('extraHighlight', {key: extraKey, value: value, index: index})
      const sectionTitle = this.$t('global.' + extraKey).toLowerCase()
      const color = this.colorValue(extraKey, index)
      const highlightData = { extraKey, sectionTitle, sections: [{ intervals: [], color }] }

      const polylineData = this.buildExtraHighlightPolylineData(extraKey, index, value)
      highlightData.sections.push(polylineData)
      EventBus.$emit('highlightPolylineSections', highlightData)
    },
    /**
     * Handle the show all sections click by
     * building the object and emitting a
     * highlightPolylineSections event
     * that will be caught by the map view
     * to highlight all sections of a given extra key
     * @param {String} extraKey
     * @emits highlightPolylineSections (via EventBus)
     */
    showAllSections (extraKey) {
      this.$store.commit('extraHighlight', {key: extraKey, value: 'all', index: 0})
      const sectionTitle = this.$t('global.' + extraKey).toLowerCase()
      const highlightData = { extraKey: extraKey, sectionTitle, sections: [] }

      let index = 0
      for (const summary of this.routeExtras[extraKey].summary) {
        const polylineData = this.buildExtraHighlightPolylineData(extraKey, index, summary.value)
        highlightData.sections.push(polylineData)
        index++
      }
      EventBus.$emit('highlightPolylineSections', highlightData)
    },
    /**
     * Build the extra info highlighting data
     * @param {String} extraKey
     * @param {Integer} index
     * @param {Integer} value
     * @returns {Object} {intervals: Array, color: string, label: String}
     */
    buildExtraHighlightPolylineData (extraKey, index, value) {
      const color = this.colorValue(extraKey, index, value)
      const label = this.getExtraValueLabel(extraKey, value).toLowerCase()
      // Values contains an array with the following data:
      // a) position `zero` - the starting index on the route polyline array of
      // where the given extra info starts
      // b) position `1` - the final index on the route polyline array where the
      // given extra info ends.
      // c) position 2 - the value that represents the extra info to be
      // shown on over the route. For example, steepness
      const values = this.routeExtras[extraKey].values


      // As some extra info may be present in several non-continuous
      // segments we must get the intervals where the value matches
      // so that we show only the extra info wth the value selected by the user
      const intervals = this.lodash.filter(values, (v) => {
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
