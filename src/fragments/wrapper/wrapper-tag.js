import { h } from 'vue'

export default {
  props: {
    tag: {
      type: String,
      required: true
    }
  },
  render() {
    return h(
      this.tag, // tag name
      this.$slots.default ? this.$slots.default() : [] // array of children
    )
  }
}
