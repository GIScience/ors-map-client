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
  methods: {
    /**
     * Run a fieldupdate with a debounce
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
     * Build slider componet label
     * @returns {String} unit
     */
    buildUnit () {
      let unit = ''
      if (this.filter.unit) {
        let unitsTrans = this.$t('global.units')
        if (unitsTrans[this.filter.unit]) {
          unit = unitsTrans[this.filter.unit]
        }
        unit = String(this.filter.unit)
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
