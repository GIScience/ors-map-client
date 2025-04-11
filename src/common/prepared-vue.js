import wrapperTag from '@/fragments/wrapper/wrapper-tag'
import clickOutside from '@/directives/click-outside'
import smartTooltip from '@/directives/smart-tooltip'
import globalMixins from '@/common/global-mixins'
import AppVMenu from '@/fragments/v-menu/VMenu.vue'
import topBorder from '@/directives/top-border'
import HMenu from '@/fragments/h-menu/HMenu.vue'
import title from '@/directives/title'
import focus from '@/directives/focus'
// import VeeValidate from 'vee-validate'
import box from '@/fragments/box/Box.vue'
import theme from '@/config/theme'
import VueLodash from 'vue-lodash'
import VueMoment from 'vue-moment'
import bg from '@/directives/bg'
import lodash from 'lodash'
import { createApp } from 'vue'
import I18nBuilder from '@/i18n/i18n-builder'
import store from '@/store/store'
import router from '@/router'

import { createVuetify } from 'vuetify'
import {
  VAlert,
  VApp,
  VAutocomplete,
  VBadge,
  VBottomNavigation,
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
  VExpansionPanels,
  VExpansionPanelText,
  VExpansionPanelTitle,
  VFooter,
  VForm,
  VIcon,
  VImg,
  VItem,
  VItemGroup,
  VLayout,
  VList,
  VListGroup,
  VListItem,
  VListItemAction,
  VListItemTitle,
  VListSubheader,
  VMain,
  VMenu,
  VNavigationDrawer,
  VProgressLinear,
  VSelect,
  VSlider,
  VSnackbar,
  VSpacer,
  VSwitch,
  VTab,
  VTabs,
  VTextarea,
  VTextField,
  VToolbar,
  VToolbarItems,
  VToolbarTitle,
  VTooltip,
  VWindowItem
} from 'vuetify/components'


export default function createPreparedVue(App) {
  const app = createApp(App)

  const i18n = I18nBuilder.build()
  app.use(store)
  app.use(router)
  app.use(i18n)

  const vuetify = createVuetify({
    theme: theme, components: {
      VAlert,
      VApp,
      VAutocomplete,
      VBadge,
      VBottomNavigation,
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
      VExpansionPanels,
      VExpansionPanelText,
      VExpansionPanelTitle,
      VFooter,
      VForm,
      VIcon,
      VImg,
      VItem,
      VItemGroup,
      VLayout,
      VList,
      VListGroup,
      VListItem,
      VListItemAction,
      VListItemTitle,
      VMain,
      VMenu,
      VNavigationDrawer,
      VProgressLinear,
      VSelect,
      VSlider,
      VSnackbar,
      VSpacer,
      VListSubheader,
      VSwitch,
      VTab,
      VTabs,
      VTextarea,
      VTextField,
      VToolbar,
      VToolbarItems,
      VToolbarTitle,
      VTooltip,
      VWindowItem,
    }
  })
  app.use(vuetify)

  const options = {lodash: lodash} // customize the way you want to call it
  app.use(VueLodash, options) // options is optional

  // Use vee validate to easily validate forms
  //app.use(VeeValidate)

// Managing Date and Times
  app.use(VueMoment)

  // Add global mixins to vue instance
  app.mixin(globalMixins)

  // add global custom directives
  app.directive('top-border', topBorder)
  app.directive('bg', bg)
  app.directive('title', title)
  app.directive('click-outside', clickOutside)
  app.directive('focus', focus)
  app.directive('smart-tooltip', smartTooltip)

  // add global custom components
  app.component('box', box)
  app.component('app-h-menu', HMenu)
  app.component('app-v-menu', AppVMenu)
  app.component('wrapper-tag', wrapperTag)

  return app
}
