import FloatingMenu from './components/floating-menu/FloatingMenu'

export default {
  data () {
    return {
      settingsTooltipClicked: false
    }
  },
  computed: {
    isPinned () {
      const isPinned = this.$store.getters.leftSideBarPinned
      return isPinned
    },
    showSettingsTooltip () {
      let show = !this.settingsTooltipClicked && this.$store.getters.isSidebarVisible
      return show
    }
  },
  methods: {
    toggleSidebarIsPinned () {
      this.$store.commit('setLeftSideBarIsPinned', !this.$store.getters.leftSideBarPinned)
    },
    toggleSidebar () {
      this.$store.commit('setLeftSideBarIsOpen', !this.$store.getters.leftSideBarOpen)
    },
    settingsClicked () {
      this.settingsTooltipClicked = true
      this.eventBus.$emit('showSettingsModal')
    }
  },
  components: {
    FloatingMenu
  }
}
