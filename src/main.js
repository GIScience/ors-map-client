// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from '@/common/vue-with-vuetify.js'
import App from '@/App'
import router from '@/router'
import store from '@/store/store'
import I18nLoader from '@/i18n/i18n-loader'
import topBorder from '@/directives/top-border'
import title from '@/directives/title'
import focus from '@/directives/focus'
import clickOutside from '@/directives/click-outside'
import bg from '@/directives/bg'
import uppercase from '@/filters/uppercase'
import capitalize from '@/filters/capitalize'
import box from '@/fragments/box/Box'
import HMenu from '@/fragments/h-menu/HMenu'
import VMenu from '@/fragments/v-menu/VMenu'
import DatePicker from '@/fragments/date-picker/DatePicker'
import globalMixins from '@/common/global-mixins'
import VeeValidate from 'vee-validate'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import VueMoment from 'vue-moment'
import wrapperTag from '@/fragments/wrapper/wrapper-tag'
import AppLoader from '@/app-loader'

/**
 * Fix Vue leaflet issues:
 * - import leaflet styles for proper map rendering
 * - edit marker image path
 */
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const options = { lodash: lodash } // customize the way you want to call it
Vue.use(VueLodash, options) // options is optional

// Use vee validate to easily validate forms
Vue.use(VeeValidate)

// Managing Date and Times
Vue.use(VueMoment)

// Create a global event bus, so all the components
// can access it to emit and capture events using this.eventBus
const eventBus = new Vue()
Vue.prototype.eventBus = eventBus

// turn off console message saying we are in dev mode
Vue.config.productionTip = false

// Add global mixins to vue instance
Vue.mixin(globalMixins)

// add global custom directives
Vue.directive('top-border', topBorder)
Vue.directive('bg', bg)
Vue.directive('title', title)
Vue.directive('click-outside', clickOutside)
Vue.directive('focus', focus)

// add global custom components
Vue.component('box', box)
Vue.component('app-h-menu', HMenu)
Vue.component('app-v-menu', VMenu)
Vue.component('date-picker', DatePicker)
Vue.component('wrapper-tag', wrapperTag)

// add global custom filters
Vue.filter('uppercase', uppercase)
Vue.filter('capitalize', capitalize)

let VueInstance = null

AppLoader.load().then(() => {
  let i18n = I18nLoader.get()

  // In some previous version of this app the `en` locale was stored as `en-us`
  let locale = store.getters.mapSettings.locale === 'en' ? 'en-us' : store.getters.mapSettings.locale
  // Set locale from store/local storage
  i18n.locale = locale

  /* eslint-disable no-new */
  VueInstance = new Vue({
    el: '#app',
    i18n,
    router,
    components: { App },
    store: store,
    template: '<App/>'
  })
})

const main = {
  getInstance: () => {
    return VueInstance
  }
}

export default main
