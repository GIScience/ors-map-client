import appConfig from '@/config/app-config'
import constants from '@/resources/constants'

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
