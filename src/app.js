import Header from '@/fragments/header/Header'
import Sidebar from '@/fragments/sidebar/Sidebar'
import Footer from '@/fragments/footer/Footer'
import Toaster from '@/fragments/toaster/Toaster'
import Confirm from '@/fragments/dialogs/confirm/Confirm'
import Info from '@/fragments/dialogs/info/Info'

export default {
  data () {
    return {
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      fixed: false,
      title: 'OSM dev dashboard',
      showLoading: false
    }
  },
  name: 'App',
  components: {
    appHeader: Header,
    appSidebar: Sidebar,
    appFooter: Footer,
    appToaster: Toaster,
    appConfirm: Confirm,
    appInfo: Info
  },
  created () {
    this.eventBus.$on('showLoading', (value) => {
      this.showLoading = value
    })
    this.eventBus.$on('titleChanged', (title) => {
      this.title = title
    })
  }
}
