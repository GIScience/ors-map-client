export default {
  props: {
    color: {
      Type: String,
      default: 'white'
    },
    markerImg: {
      type: String,
      required: false
    },
    markerNumber: {
      type: String,
      required: false
    }
  },
  computed: {
    doubleDigitText () {
      return this.markerNumber.length === 2
    },
    tripleDigitText () {
      return this.markerNumber.length === 3
    },
    fourDigitText () {
      return this.markerNumber.length === 4
    }
  }
}
