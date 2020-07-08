import * as showToaster from './show-toaster-mixin'
import VueInstance from '@/main'
import appConstants from '@/resources/constants'

const globalMixins = {
  methods: {
    ...showToaster, // mix the show toaster methods here

    confirmDialog (title, text, options) {
      let confirm = options || {}
      confirm.text = text
      confirm.title = title
      confirm.neverOption = options && options.neverOption
      VueInstance.eventBus.$emit('triggerConfirm', confirm)

      return new Promise((resolve, reject) => {
        VueInstance.eventBus.$on('confirmAnswered', (result) => {
          if (result.response === 'yes') {
            resolve(result)
          } else {
            reject(result)
          }
        })
      })
    },
    infoDialog (title, text, options) {
      let info = options || {}
      info.text = text
      info.title = title
      VueInstance.eventBus.$emit('triggerShowInfo', info)

      return new Promise((resolve, reject) => {
        VueInstance.eventBus.$on('infoOk', () => {
          resolve()
        })
      })
    }
  },
  computed: {
    $xlResolution () {
      let extraLow = this.$vuetify.breakpoint.xs
      return extraLow
    },
    $lowResolution () {
      let lowResolution = this.$vuetify.breakpoint.smAndDown
      return lowResolution
    },
    $highResolution () {
      let highResolution = this.$vuetify.breakpoint.lgAndUp
      return highResolution
    },

    $mdResolution () {
      let highResolution = this.$vuetify.breakpoint.md
      return highResolution
    },

    $mdAndUpResolution () {
      let mdAndUpResolution = this.$vuetify.breakpoint.mdAndUp
      return mdAndUpResolution
    },
    $mdAndDownResolution () {
      let mdAndDownResolution = this.$vuetify.breakpoint.mdAndDown
      return mdAndDownResolution
    },
    constants () {
      return appConstants
    }
  }
}

export default globalMixins
