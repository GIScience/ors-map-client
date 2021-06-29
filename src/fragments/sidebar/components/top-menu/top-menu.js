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
      let newOpenState = !this.$store.getters.leftSideBarOpen
      this.$store.commit('setLeftSideBarIsOpen', newOpenState)
      
      // If the new state is closed, the pinned 
      // state must be set to false too
      if (!newOpenState) {
        this.$store.commit('setLeftSideBarIsPinned', newOpenState)
      }
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
