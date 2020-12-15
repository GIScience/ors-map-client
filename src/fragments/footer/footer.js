import appConfig from '@/config/app-config'

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
    }
  }
}
