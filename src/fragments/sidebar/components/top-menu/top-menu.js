import FloatingMenu from './components/floating-menu/FloatingMenu'

export default {
  data () {
    return {

    }
  },
  computed: {
    isPinned () {
      const isPinned = this.$store.getters.leftSideBarPinned
      return isPinned
    }
  },
  methods: {
    toggleSidebarIsPinned () {
      this.$store.commit('setLeftSideBarIsPinned', !this.$store.getters.leftSideBarPinned)
    },
    toggleSidebar () {
      this.$store.commit('setLeftSideBarIsOpen', !this.$store.getters.leftSideBarOpen)
    }
  },
  components: {
    FloatingMenu
  },
  created () {
  }
}
