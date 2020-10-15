import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enUSTranslations from './translations/en-us/builder'
import deDETranslations from './translations/de-de/builder'
import appConfig from '@/config'

Vue.use(VueI18n)

const get = () => {
  const i18n = {
    locale: appConfig.defaultLocale,
    messages: { 'de-de': {}, 'en-us': {} },
    fallbackLocale: appConfig.defaultLocale
  }

  i18n.messages['en-us'] = enUSTranslations.build()
  i18n.messages['de-de'] = deDETranslations.build()

  Vue.use(VueI18n)
  return new VueI18n(i18n)
}

export default {
  get
}
