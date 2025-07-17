import constants from '@/resources/constants'
import {EventBus} from '@/common/event-bus'
import AppHooks from '@/support/app-hooks.js'

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
      settingsTooltipClicked: false,
      ready: false
    }
  },
  computed: {
    showSettingsTooltip () {
      let show = this.showSettings && !this.settingsTooltipClicked && this.$store.getters.isSidebarVisible
      return show
    },
    menuItemsReady () {
      return this.ready
    },
    menuItems () {
      let items = [
        {
          id: 'settings',
          show: this.showSettings,
          emitEvent: 'showSettingsModal',
          title: this.$t('floatingTopMenu.settings'),
          text: this.$t('floatingTopMenu.settings'),
          icon: 'settings',
        },
        {
          id: 'about',
          show: true,
          emitEvent: 'showAboutModal',
          title: this.$t('floatingTopMenu.about'),
          text: this.$t('floatingTopMenu.about'),
          icon: 'info'
        },
        {
          id: 'openrouteserviceAPI',
          show: true,
          href: constants.links.ors,
          title: this.$t('floatingTopMenu.openrouteserviceAPI'),
          text: this.$t('floatingTopMenu.openrouteserviceAPI'),
          icon: 'code'
        },
        {
          id: 'openrouteserviceForDisasters',
          show: true,
          href: constants.links.disaster,
          title: this.$t('floatingTopMenu.openrouteserviceForDisasters'),
          text: this.$t('floatingTopMenu.openrouteserviceForDisasters'),
          icon: 'healing',
          target: '_blank'
        },
        {
          id: 'askOpenrouteservice',
          show: true,
          href: constants.links.forum,
          title: this.$t('floatingTopMenu.askOpenrouteservice'),
          text: this.$t('floatingTopMenu.askOpenrouteservice'),
          icon: 'help',
          target: '_blank'
        }
      ]
      items = AppHooks.run('floatingMenuItemsDefined', items)
      return items
    }
  },
  methods: {
    menuClicked () {
      this.settingsTooltipClicked = true
    },
    setReadyStatus () {
      let context = this
      setTimeout(() => {
        if (AppHooks) {
          context.ready = true
        } else {
          context.setReadyStatus()
        }
      }, 100)
    },
    emitEvent (event) {
      EventBus.$emit(event)
    }
  },
  created() {
    this.setReadyStatus()
  },
}
