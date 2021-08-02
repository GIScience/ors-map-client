import appConfig from '@/config/app-config'

export default {
  computed: {
    showDefaultAboutContent () {
      return appConfig.showDefaultAboutContent
    }
  },
  mounted() {
    this.callHook()
  },
  methods: {
    callHook () {
      let hookData = {customAbout: this.$refs.customAbout, aboutContainer: this.$refs.aboutContainer, aboutLogo: this.$refs.aboutLogo}
      this.$root.appHooks.run('aboutContentDefined', hookData)
    }
  },
}
