const wrapperTag = {
  render (createElement) {
    return createElement(
      this.tag, // tag name
      this.$slots.default // array of children
    )
  },
  props: {
    tag: {
      type: String,
      required: true
    }
  }
}
export default wrapperTag
