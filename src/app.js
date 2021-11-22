import Header from '@/fragments/header/Header'
import Sidebar from '@/fragments/sidebar/Sidebar'
import Footer from '@/fragments/footer/Footer'
import Toaster from '@/fragments/toaster/Toaster'
import Confirm from '@/fragments/dialogs/confirm/Confirm'
import Info from '@/fragments/dialogs/info/Info'
import MainMenu from '@/common/main-menu'

export default {
  data () {
    return {
      title: '',
      showLoading: false
    }
  },
  name: 'ORSWebClientApp',
  components: {
    appHeader: Header,
    appSidebar: Sidebar,
    appFooter: Footer,
    appToaster: Toaster,
    appConfirm: Confirm,
    appInfo: Info
  },
  created () {
    // Register the listener for the showLoading and 
    // titleChanged events
    this.eventBus.$on('showLoading', (value) => {
      this.showLoading = value
    })
    this.eventBus.$on('titleChanged', (title) => {
      this.title = title
    })
  },
  mounted() {
    this.eventBus.$on('appLoaded', () => {
      MainMenu.adjustMenu()
    })
  },
}
