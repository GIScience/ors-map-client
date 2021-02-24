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
      type: Number,
      required: false
    }
  },
  computed: {
    doubleDigitText () {
      return this.markerNumber && this.markerNumber > 9
    },
    tripleDigitText () {
      return this.markerNumber && this.markerNumber > 99
    },
    fourDigitText () {
      return this.markerNumber && this.markerNumber > 999
    }
  }
}
