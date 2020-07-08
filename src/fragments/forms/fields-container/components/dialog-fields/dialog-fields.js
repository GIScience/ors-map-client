
export default {
  props: {
    parameters: {
      required: true
    },
    title: {
      required: true,
      type: String
    },
    subPropsIndex: {
      required: false
    },
    isModal: {
      required: false,
      type: Boolean
    }
  },
  data () {
    return {
      active: true
    }
  },
  created () {
    this.active = true
  },
  methods: {
    fieldUpdated (index, value) {
      this.$emit('fieldUpdated', { index: index, value: value })
    },
    onModalConfirm () {
      this.$emit('modalConfirmed')
    }
  },
  components: {
    'form-fields': () => import('../form-fields/FormFields.vue')
  }
}
