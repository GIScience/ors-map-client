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
    },
    appVersion () {
      let env = process.env
      let version = env.PACKAGE_JSON.version
      return version
    }
  }
}
