import { createI18n } from 'vue-i18n'
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

const build = () => {
  const messages = {
    'en-us': enUSTranslations.build(),
    'de-de': deDETranslations.build(),
    'pt-br': ptBRTranslations.build(),
    'it-it': itITTranslations.build(),
    'fr-fr': frFRTranslations.build(),
    'hu-hu': huHUTranslations.build(),
    'es-es': esESTranslations.build(),
    'cs-cz': csCZTranslations.build(),
    'ro-ro': roROTranslations.build()
  }

  const i18n = createI18n({
    locale: appConfig.defaultLocale,
    fallbackLocale: appConfig.defaultLocale,
    messages
  })

  /*
    Uncomment the line below to output, via browser
    console, a merged version of the translation source
    file when the application runs. If necessary, you can
    replace 'en-us' below by any of the supported
    locale, like 'de-de' or 'fr-fr'.
  */
  // console.log(JSON.stringify(i18n.messages['en-us']))

  return i18n
}

const getShortLocale = (locale) => {
  let short = locale.split('-')[0]
  return short
}

export default {
  build,
  getShortLocale
}
