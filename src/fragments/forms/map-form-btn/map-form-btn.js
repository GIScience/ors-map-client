export default {
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'default'
    }
  },
  data: () => ({
    btnText: ''
  }),
  created () {
    this.btnText = this.text || this.title
  }
}
