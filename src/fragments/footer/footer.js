import appConfig from '@/config/app-config'
import theme from '@/config/theme'

export default {
  data () {
    return {
      footerMainSiteName: appConfig.footerAppName,
      footerLink: appConfig.footerDevelopedByLink
    }
  },
  computed: {
    currentYear () {
      return (new Date()).getFullYear()
    },
    linkColor () {
      return 'color: ' + theme.primary + ';'
    },
    appVersion () {
      let version = __APP_VERSION__
      return version
    }
  }
}
