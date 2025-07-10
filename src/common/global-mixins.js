import * as showToaster from './show-toaster-mixin'
import appConstants from '@/resources/constants'
import {EventBus} from '@/common/event-bus'


const globalMixins = {
  methods: {
    ...showToaster, // mix the show toaster methods here

    confirmDialog (title, text, options) {
      const confirm = options || {}
      confirm.text = text
      confirm.title = title
      confirm.neverOption = options && options.neverOption
      EventBus.$emit('triggerConfirm', confirm)

      return new Promise((resolve, reject) => {
        EventBus.$on('confirmAnswered', (result) => {
          if (result.response === 'yes') {
            resolve(result)
          } else {
            reject(result)
          }
        })
      })
    },
    infoDialog (title, text, options) {
      const info = options || {}
      info.text = text
      info.title = title
      EventBus.$emit('triggerShowInfo', info)

      return new Promise((resolve) => {
        EventBus.$on('infoOk', () => {
          resolve()
        })
      })
    }
  },
  computed: {
    $xlResolution () {
      const extraLow = this.$vuetify.display.xs
      return extraLow
    },
    $lowResolution () {
      const lowResolution = this.$vuetify.display.smAndDown
      return lowResolution
    },
    $highResolution () {
      const highResolution = this.$vuetify.display.lgAndUp
      return highResolution
    },

    $mdResolution () {
      const highResolution = this.$vuetify.display.md
      return highResolution
    },

    $mdAndUpResolution () {
      const mdAndUpResolution = this.$vuetify.display.mdAndUp
      return mdAndUpResolution
    },
    $mdAndDownResolution () {
      const mdAndDownResolution = this.$vuetify.display.mdAndDown
      return mdAndDownResolution
    },
    constants () {
      return appConstants
    }
  }
}

export default globalMixins
