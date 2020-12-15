import MapForm from '@/fragments/forms/map-form/MapForm'
import Footer from '@/fragments/footer/Footer'
import ProfileSelector from '@/fragments/forms/profile-selector/ProfileSelector.vue'
import resolver from '@/support/routes-resolver'
import TopMenu from './components/top-menu/TopMenu'
import appConfig from '@/config/app-config'

export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      right: false,
      fixed: false,
      menuItems: [],
      subMenuOpen: [],
      activeTab: '0'
    }
  },
  computed: {
    isSideBarOpen: {
      get () {
        return this.$store.getters.leftSideBarOpen && !this.$store.getters.embed
      },
      set (open) {
        this.$store.commit('setLeftSideBarIsOpen', open)
        // If the side bar is closed by a user's action, then
        // we can set the sidebar pined status as false
        if (open === false) {
          this.$store.commit('setLeftSideBarIsPinned', open)
        }
      }
    },
    homeUrl () {
      const url = resolver.homeUrl()
      return url
    },
    sidebarContentHeightFormula () {
      const formula = `calc(100% - ${this.$store.getters.sidebarHeaderHeight}px)`
      return formula
    }
  },
  methods: {
    getConfigVal (key) {
      let configVal = appConfig[key]
      return configVal
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
  created () {
    this.menuItems = this.$store.getters.mainMenu
    /**
     * Set sidebar open status
     */
    const context = this
    this.eventBus.$on('setSidebarStatus', (isOpen) => {
      // pass a boolean that indicates 'force'
      context.$store.commit('setLeftSideBarIsOpen', isOpen)
    })
  },
  components: {
    ProfileSelector,
    MapForm,
    appFooter: Footer,
    TopMenu
  }
}
