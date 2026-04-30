import orsDictionary from '@/resources/ors-dictionary'

export default {
  data() {
    return {
      labelsOverflow: false,
      showExtraInfoSection: null
    }
  },
  props: {
    route: {
      Type: Object,
      Required: true
    },
    idx: {
      type: Number,
      required: true
    }
  },
  computed: {
    /**
     * Return the array of extras or an empty array
     * @returns {Array}
     */
    routeExtras() {
      if (this.route.properties.extras?.['steepness']) {
        this.route.properties.extras['steepness'].summary = this.route.properties.extras['steepness'].summary.sort((a, b) => parseInt(a.value) - parseInt(b.value))
      }
      return this.route.properties.extras || []
    }
  },
  methods: {
    /**
     * Determines if a given
     * extra must be shown by
     * checking if it is enabled
     * in the app settings
     * @param {*} extraKey
     * @returns {Boolean}
     */
    showExtra(extraKey) {
      let show = (this.$store.getters.mapSettings[extraKey] === true)
      if (!show) { // check if the extra is being returned in a singular keyed property
        const singular = extraKey.substring(0, extraKey.length - 1)
        show = this.$store.getters.mapSettings[singular] === true
      }
      return show
    },
    /**
     * Get the color from the ors dictionary
     * based on the extra key and index
     * @param {*} extraKey
     * @param {*} index
     * @param {*} value
     */
    colorValue(extraKey, index, value = null) {
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
    segmentStyle(extraKey, summary, index) {
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
    getExtraValueLabel(extraKey, value) {
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

    checkForOverflow() {
      const container = document.getElementById('extra-bar-labels' + this.idx)
      if (!container) return
      this.labelsOverflow = Array.from(container.querySelectorAll('.segment-label')).some(label => {
        return label.scrollWidth > label.clientWidth
      })
    }
  },
  mounted() {
    setTimeout(this.checkForOverflow, 100)
  },
  updated() {
    this.checkForOverflow()
  }
}
