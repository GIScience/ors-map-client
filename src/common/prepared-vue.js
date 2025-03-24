import wrapperTag from '@/fragments/wrapper/wrapper-tag'
import clickOutside from '@/directives/click-outside'
import smartTooltip from '@/directives/smart-tooltip'
import globalMixins from '@/common/global-mixins'
import AppVMenu from '@/fragments/v-menu/VMenu.vue'
import topBorder from '@/directives/top-border'
import capitalize from '@/filters/capitalize'
import HMenu from '@/fragments/h-menu/HMenu.vue'
import uppercase from '@/filters/uppercase'
import title from '@/directives/title'
import focus from '@/directives/focus'
import VeeValidate from 'vee-validate'
import box from '@/fragments/box/Box.vue'
import theme from '@/config/theme'
import VueLodash from 'vue-lodash'
import VueMoment from 'vue-moment'
import bg from '@/directives/bg'
import lodash from 'lodash'
import Vue from 'vue'


import '../../node_modules/vuetify/src/stylus/app.styl'
import Vuetify from 'vuetify'
import {
  VAlert,
  VApp,
  VAutocomplete,
  VBadge,
  VBottomNav,
  VBtn,
  VBtnToggle,
  VCard,
  VCardActions,
  VCardTitle,
  VCarousel,
  VCheckbox,
  VChip,
  VDataTable,
  VDialog,
  VDivider,
  VExpansionPanel,
  VExpansionPanelContent,
  VFooter,
  VForm,
  VIcon,
  VImg,
  VItem,
  VItemGroup,
  VJumbotron,
  VList,
  VListGroup,
  VListTile,
  VListTileAction,
  VListTileAvatar,
  VListTileContent,
  VListTileSubTitle,
  VListTileTitle,
  VMenu,
  VNavigationDrawer,
  VProgressLinear,
  VSelect,
  VSlider,
  VSnackbar,
  VSubheader,
  VSwitch,
  VTab,
  VTabItem,
  VTabs,
  VTabsItems,
  VTextarea,
  VTextField,
  VToolbar,
  VToolbarItems,
  VToolbarTitle,
  VTooltip
} from 'vuetify/lib'
import transitions from 'vuetify/lib/components/transitions'
import VGrid from 'vuetify/lib/components/VGrid'


Vue.use(Vuetify, {
  theme: theme, components: {
    VAlert,
    VApp,
    VAutocomplete,
    VBadge,
    VBottomNav,
    VBtn,
    VBtnToggle,
    VCard,
    VCardActions,
    VCardTitle,
    VCarousel,
    VCheckbox,
    VChip,
    VDataTable,
    VDialog,
    VDivider,
    VExpansionPanel,
    VExpansionPanelContent,
    VFooter,
    VForm,
    VIcon,
    VImg,
    VItem,
    VItemGroup,
    VJumbotron,
    VList,
    VListGroup,
    VListTile,
    VListTileAction,
    VListTileAvatar,
    VListTileContent,
    VListTileSubTitle,
    VListTileTitle,
    VMenu,
    VNavigationDrawer,
    VProgressLinear,
    VSelect,
    VSlider,
    VSnackbar,
    VSubheader,
    VSwitch,
    VTab,
    VTabItem,
    VTabs,
    VTabsItems,
    VTextarea,
    VTextField,
    VToolbar,
    VToolbarItems,
    VToolbarTitle,
    VTooltip,
    transitions,
    VGrid
  }
})

const options = {lodash: lodash} // customize the way you want to call it
Vue.use(VueLodash, options) // options is optional

// Use vee validate to easily validate forms
Vue.use(VeeValidate)

// Managing Date and Times
Vue.use(VueMoment)

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
Vue.directive('smart-tooltip', smartTooltip)


// add global custom components
Vue.component('box', box)
Vue.component('app-h-menu', HMenu)
Vue.component('app-v-menu', AppVMenu)
Vue.component('wrapper-tag', wrapperTag)

// add global custom filters
Vue.filter('uppercase', uppercase)
Vue.filter('capitalize', capitalize)

export default Vue
