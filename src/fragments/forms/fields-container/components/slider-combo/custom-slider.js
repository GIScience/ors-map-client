
import { VSlider } from 'vuetify'

export default {
  name:'custom-slider',
  extends: VSlider,
  computed: {
    internalValue: {
      get: function get() {
        return this.lazyValue
      },
      set: function set(val) {
        const min = this.min, max = this.max

        // Only trigger the change if the value is not
        // null or undefined. Otherwise, the min value
        // is set in replacement of the null
        if (val !== null && val !== undefined) {
          // Round value to ensure the
          // entire slider range can
          // be selected with step
          const value = this.roundValue(Math.min(Math.max(val, min), max))
          if (value === this.lazyValue) return
          this.lazyValue = value
          this.$emit('input', value)
          this.validate()
        }
      }
    },
  }
}
