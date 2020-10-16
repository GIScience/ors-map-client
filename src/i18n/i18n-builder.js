import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enUSTranslations from './translations/en-us/builder'
import deDETranslations from './translations/de-de/builder'
import ptBRTranslations from './translations/pt-br/builder'
import appConfig from '@/config'

Vue.use(VueI18n)

const build = () => {
  const i18n = {
    locale: appConfig.defaultLocale,
    messages: { 'de-de': {}, 'en-us': {}, 'pt-br': {}},
    fallbackLocale: appConfig.defaultLocale
  }

  i18n.messages['en-us'] = enUSTranslations.build()
  i18n.messages['de-de'] = deDETranslations.build()
  i18n.messages['pt-br'] = ptBRTranslations.build()

  Vue.use(VueI18n)
  return new VueI18n(i18n)
}

const getShortLocale = (locale) => {
  let short = locale.split('-')[0]
  return short
}

export default {
  build,
  getShortLocale
}
