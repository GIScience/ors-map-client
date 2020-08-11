import menuManager from '@/support/menu-manager'
import resolver from '@/support/routes-resolver'

export default {
  data () {
    return {
      drawer: true,
      clipped: false,
      menuItems: []
    }
  },
  methods: {
    toggleSidebar () {
      this.highlightMenu = false
      this.$store.commit('setLeftSideBarIsOpen', !this.$store.getters.leftSideBarOpen)
    },
    toggleTopBar () {
      this.$store.commit('setTopBarIsOpen', !this.$store.getters.topBarOpen)
    },
    hideTopBar () {
      this.$store.commit('setTopBarIsOpen', false)
    }
  },
  created () {
    const context = this
    this.$store.dispatch('fetchMainMenu').then(() => {
      context.menuItems = context.$store.getters.mainMenu
    })

    this.eventBus.$on('routeChanged', (routeParams) => {
      if (context.menuItems.length > 0) {
        menuManager.setMenuActiveStatus(context.menuItems, routeParams.to)
      }
    })

    // If in low resolution mode, hid the top baf by default
    if (this.$mdAndDownResolution) {
      this.$store.commit('setTopBarIsOpen', false)
    } else {
      setTimeout(() => {
        this.$store.commit('setTopBarIsOpen', false)
      }, 1500)
    }
  },
  computed: {
    homeUrl () {
      const url = resolver.homeUrl()
      return url
    }
  }
}
