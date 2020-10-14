import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './translations/en/all'
import de from './translations/de/all'
import loader from '@/support/loader'

Vue.use(VueI18n)

const get = () => {
  const i18n = {
    locale: 'en', // set locale
    messages: {
      de: de,
      en: en
    },
    fallbackLocale: 'en'
  }

  // EN LANGUAGE

  // load and get all EN messages from components *i18n.en.js default export using custom loader
  const enComponentMessages = loader.load(require.context('@/pages/', true, /\.i18n\.en\.js$/), true)
  addComponentKeys('en', enComponentMessages, i18n)

  // load and get all EN messages from core *i18n.en.js default export using custom loader
  const enCRUDMessages = loader.load(require.context('@/crud/', true, /\.i18n\.en\.js$/), true)
  addComponentKeys('en', enCRUDMessages, i18n)

  // load and get all EN messages from shared parts *i18n.en.js default export using custom loader
  const enSharedPartsMessages = loader.load(require.context('@/fragments/', true, /\.i18n\.en\.js$/), true)
  addComponentKeys('en', enSharedPartsMessages, i18n)

  // load and get all EN messages from shared parts *i18n.en.js default export using custom loader
  const enResourcesMessages = loader.load(require.context('@/resources/', true, /\.i18n\.en\.js$/), true)
  addComponentKeys('en', enResourcesMessages, i18n)


  // DE LANGUAGE

  // load and get all DE messages from components *i18n.de.js default export using custom loader
  const deComponentMessages = loader.load(require.context('@/pages/', true, /\.i18n\.de\.js$/), true)
  addComponentKeys('de', deComponentMessages, i18n)  

  // load and get all EN messages from core *i18n.en.js default export using custom loader
  const deCRUDMessages = loader.load(require.context('@/crud/', true, /\.i18n\.de\.js$/), true)
  addComponentKeys('de', deCRUDMessages, i18n)

  // load and get all EN messages from shared parts *i18n.en.js default export using custom loader
  const deSharedPartsMessages = loader.load(require.context('@/fragments/', true, /\.i18n\.de\.js$/), true)
  addComponentKeys('de', deSharedPartsMessages, i18n)

  // load and get all EN messages from shared parts *i18n.en.js default export using custom loader
  const deResourcesMessages = loader.load(require.context('@/resources/', true, /\.i18n\.de\.js$/), true)
  addComponentKeys('de', deResourcesMessages, i18n)

 

  Vue.use(VueI18n)

  return new VueI18n(i18n)
}

export default {
  get
}

function addComponentKeys (languageKey, localeSharedPartsMessages, i18nObj) {
  for (let messages in localeSharedPartsMessages) {
    let translations = localeSharedPartsMessages[messages]
    for (var key in translations) {
      // skip loop if the property is from prototype
      if (!translations.hasOwnProperty(key)) continue
      i18nObj.messages[languageKey][key] = translations[key]
    }
  }
}
