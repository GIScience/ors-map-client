import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enUSTranslations from './translations/en-us/builder'
import deDETranslations from './translations/de-de/builder'
import ptBRTranslations from './translations/pt-br/builder'
import itITTranslations from './translations/it-it/builder'
import frFRTranslations from './translations/fr-fr/builder'
import huHUTranslations from './translations/hu-hu/builder'
import esESTranslations from './translations/es-es/builder'
import csCZTranslations from './translations/cs-cz/builder'
import roROTranslations from './translations/ro-ro/builder'
import appConfig from '@/config/app-config'

Vue.use(VueI18n)

const build = () => {
  const i18n = {
    locale: appConfig.defaultLocale,
    messages: { 'de-de': {}, 'en-us': {}, 'pt-br': {}, 'it-it': {}, 'fr-fr': {}, 'hu-hu': {}, 'es-es': {}, 'cs-cz': {}, 'ro-ro': {}},
    fallbackLocale: appConfig.defaultLocale
  }

  i18n.messages['en-us'] = enUSTranslations.build()
  i18n.messages['de-de'] = deDETranslations.build()
  i18n.messages['pt-br'] = ptBRTranslations.build()
  i18n.messages['it-it'] = itITTranslations.build()
  i18n.messages['fr-fr'] = frFRTranslations.build()
  i18n.messages['hu-hu'] = huHUTranslations.build()
  i18n.messages['es-es'] = esESTranslations.build()
  i18n.messages['cs-cz'] = csCZTranslations.build()
  i18n.messages['ro-ro'] = roROTranslations.build()


  /*
    Uncomment the line below to output, via browser
    console, a merged version of the translation source
    file when the application runs. If necessary, you can
    replace 'en-us' below by any of the supported
    locale, like 'de-de' or 'fr-fr'.
  */
  // console.log(JSON.stringify(i18n.messages['en-us']))

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
