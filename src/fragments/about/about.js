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
        let hookData = {containerRef: this.$refs.customAbout}
        this.$root.appHooks.run('setCustomAbout', hookData)
      }
  },
}
