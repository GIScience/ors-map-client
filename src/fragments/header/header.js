import menuManager from '@/support/menu-manager'
import resolver from '@/support/routes-resolver'
import appConfig from '@/config/app-config'

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
    },
    getConfigVal (key) {
      let configVal = appConfig[key]
      return configVal
    }
  },
  created () {
    const context = this
    context.menuItems = context.$store.getters.mainMenu

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
  watch: {
    '$store.getters.mainMenu': {
      handler: function () {
        this.menuItems = this.$store.getters.mainMenu
      },
      deep: true
    }
  },
  computed: {
    homeUrl () {
      const url = resolver.homeUrl()
      return url
    },
    showToolbar () {
      // we can't wait for the $store.getters.embed to be set 
      let contains = location.hash.includes('/embed/')
      return !contains
    }
  }
}
