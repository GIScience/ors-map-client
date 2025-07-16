import appConfig from '@/config/app-config'

export default {
  data () {
    return {
      footerMainSiteName: appConfig.footerAppName,
      footerLink: appConfig.footerDevelopedByLink,
    }
  },
  computed: {
    currentYear () {
      return (new Date()).getFullYear()
    },
    appVersion () {
      // eslint-disable-next-line no-undef
      let version = __APP_VERSION__
      return version
    }
  }
}
