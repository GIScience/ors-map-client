import appConfig from '@/config/app-config'
import utils from '@/support/utils'

export default {
  computed: {
    showDefaultAboutContent () {
      return appConfig.showDefaultAboutContent
    }
  },
  mounted() {
    this.callHook()
  },
  created() {
    this.getImgSrc = utils.getImgSrc
  },
  methods: {
    callHook () {
      let hookData = {customAbout: this.$refs.customAbout, aboutContainer: this.$refs.aboutContainer, aboutLogo: this.$refs.aboutLogo}
      this.$root.appHooks.run('aboutContentDefined', hookData)
    }
  },
}
