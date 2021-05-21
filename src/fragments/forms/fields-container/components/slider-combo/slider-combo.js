export default {
  props: {
    filter: {
      type: Object,
      required: false
    },
    label: {
      type: String,
      required: true
    },
  },
  data () {
    return {
      localModel: null,
      textLocalModel: null,
      debounceTimeoutId: null
    }
  },
  created () {
    this.localModel = this.textLocalModel = this.filter.value
  },
  computed: {
    sliderValue () {
      if (this.localModel !== null && this.localModel !== undefined) {
        return this.localModel
      }
      return ''
    }
  },
  methods: {
    /**
     * Run a field update with a debounce
     */
    debounceTextFieldChange () {
      const context = this
      if (this.debounceTimeoutId) {
        clearTimeout(this.debounceTimeoutId)
      }
      this.debounceTimeoutId = setTimeout(function () {
        if (context.textLocalModel) {
          var value = Number(context.textLocalModel)

          // Make sure the filter has a value that is allowed
          if (context.filter.max && value > context.filter.max) {
            value = context.filter.max
          }
          if (context.filter.min && value < context.filter.min) {
            value = context.filter.min
          }
          if (context.localModel !== value) {
            context.filter.value = context.localModel = context.textLocalModel = value
            context.fieldUpdated()
          }
        } else {
          let defaultvalue = null
          if (context.filter.default !== undefined) {
            defaultvalue = context.filter.default
          }
          context.localModel = context.filter.value = defaultvalue
          context.fieldUpdated()
        }
      }, 1000)
    },

    /**
     * Update filter value and both models when the slider is changed and call the fieldUpdated
     */
    sliderValueChanged () {
      this.filter.value = this.textLocalModel = this.localModel
      this.fieldUpdated()
    },

    /**
     * Build slider component label
     * @returns {String} unit
     */
    buildUnit () {
      let unit = ''
      if (this.filter.unit) {
        let unitsTrans = this.$t('global.units')
        if (unitsTrans[this.filter.unit]) {
          unit = unitsTrans[this.filter.unit]
        }
        unit = String(unit)
      }
      return unit
    },

    /**
     * Emit the field update event
     *
     * @emits fieldUpdated [to parent]
     */
    fieldUpdated () {
      this.$emit('change', this.localModel)
    }
  }
}
