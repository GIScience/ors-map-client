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
      let show = this.showSettings && !this.settingsTooltipClicked && this.$store.getters.isSidebarVisible
      return show
    }
  },
  methods: {
    menuClicked () {
      this.settingsTooltipClicked = true
    }
  }
}
