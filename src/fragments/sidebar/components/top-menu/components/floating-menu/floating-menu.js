export default {
  props: {
    openOnHover: {
      default: true,
      type: Boolean
    },
    showSettings: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      settingsTooltipClicked: false
    }
  },
  computed: {
    showSettingsTooltip () {
      return this.showSettings && !this.settingsTooltipClicked && this.$store.getters.isSidebarVisible
    }
  },
  methods: {
    menuClicked () {
      this.settingsTooltipClicked = true
    }
  }
}
