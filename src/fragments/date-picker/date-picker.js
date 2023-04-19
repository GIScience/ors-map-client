export default {
  data: () => ({
    dateModal: false,
    dateMenu: false,
    date: null
  }),
  props: {
    label:
    {
      type: String,
      required: true
    },
    model: {
      required: false,
      default: ''
    },
    onChange: {
      type: Function,
      required: false
    },
    min: {
      required: false
    },
    max: {
      required: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    locale: {
      type: String,
      default: 'en-us'
    }
  },
  watch: {
    model: function (newVal) {
      this.date = newVal
    }
  },
  created () {
    this.date = this.model
  },
  methods: {
    onDatePicked () {
      this.$emit('update:model', this.date)
      this.$refs.menu.save(this.date)
      if (this.onChange) {
        this.onChange(this.date)
      }
    }
  }
}
