import Header from '@/fragments/header/Header.vue'
import Sidebar from '@/fragments/sidebar/Sidebar.vue'
import Footer from '@/fragments/footer/Footer.vue'
import Toaster from '@/fragments/toaster/Toaster.vue'
import Confirm from '@/fragments/dialogs/confirm/Confirm.vue'
import Info from '@/fragments/dialogs/info/Info.vue'
import MainMenu from '@/common/main-menu'
import utils from '@/support/utils'
import {EventBus} from '@/common/event-bus'


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
    // Register the listener for the showLoading and titleChanged events
    EventBus.$on('showLoading', (value) => {
      this.showLoading = value
    })
    EventBus.$on('titleChanged', (title) => {
      this.title = title
    })
    const favIcon = document.getElementById('favIcon')
    favIcon.href = utils.getImgSrc('favIcon')
  },
  mounted() {
    EventBus.$on('appLoaded', () => {
      MainMenu.adjustMenu()
    })
  },
}
