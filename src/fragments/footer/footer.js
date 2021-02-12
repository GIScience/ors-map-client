import appConfig from '@/config/app-config'
import constants from '@/resources/constants'
export default {
  data () {
    return {
      footerMainSiteName: appConfig.footerAppName,
      footerLink: appConfig.footerDevelopedByLink,
      appVersion: constants.clientVersion
    }
  },
  computed: {
    currentYear () {
      return (new Date()).getFullYear()
    }
  }
}
