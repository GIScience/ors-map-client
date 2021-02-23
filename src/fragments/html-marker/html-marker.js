export default {
  props: {
    color: {
      Type: String,
      default: 'white'
    },
    iconImg: {
      type: String,
      required: false
    },
    iconNumber: {
      type: Number,
      default: ''
    }
  },
  computed: {
    doubleDigitText () {
      return this.iconNumber && this.iconNumber > 9
    },
    tripleDigitText () {
      return this.iconNumber && this.iconNumber > 99
    },
    fourDigitText () {
      return this.iconNumber && this.iconNumber > 999
    }
  }
}
