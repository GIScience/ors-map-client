import FormFields from './components/form-fields/FormFields'

export default {
  props: {
    parameters: {
      required: true
    }
  },
  created () {
    this.build = true
  },
  data () {
    return {
      tokens: null,
      build: false
    }
  },
  watch: {
    'actionData' () {
      this.build = false
      setTimeout(() => {
        this.build = true
      }, 100)
    }
  },
  methods: {
    fieldUpdated (data) {
      this.$emit('fieldUpdated', data)
    }
  },
  components: {
    FormFields
  }
}
