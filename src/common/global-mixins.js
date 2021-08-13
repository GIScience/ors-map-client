import * as showToaster from './show-toaster-mixin'
import appConstants from '@/resources/constants'
import AppHooks from '@/support/app-hooks'
import AppLoader from '@/app-loader'

const globalMixins = {
  data: () => ({
    appHooks: new AppHooks()
  }),
  methods: {
    ...showToaster, // mix the show toaster methods here

    confirmDialog (title, text, options) {
      const confirm = options || {}
      confirm.text = text
      confirm.title = title
      confirm.neverOption = options && options.neverOption
      let VueInstance = AppLoader.getInstance()
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
      const info = options || {}
      info.text = text
      info.title = title
      let VueInstance = AppLoader.getInstance()
      VueInstance.eventBus.$emit('triggerShowInfo', info)

      return new Promise((resolve) => {
        VueInstance.eventBus.$on('infoOk', () => {
          resolve()
        })
      })
    }
  },
  computed: {
    $xlResolution () {
      const extraLow = this.$vuetify.breakpoint.xs
      return extraLow
    },
    $lowResolution () {
      const lowResolution = this.$vuetify.breakpoint.smAndDown
      return lowResolution
    },
    $highResolution () {
      const highResolution = this.$vuetify.breakpoint.lgAndUp
      return highResolution
    },

    $mdResolution () {
      const highResolution = this.$vuetify.breakpoint.md
      return highResolution
    },

    $mdAndUpResolution () {
      const mdAndUpResolution = this.$vuetify.breakpoint.mdAndUp
      return mdAndUpResolution
    },
    $mdAndDownResolution () {
      const mdAndDownResolution = this.$vuetify.breakpoint.mdAndDown
      return mdAndDownResolution
    },
    constants () {
      return appConstants
    }
  }
}

export default globalMixins
