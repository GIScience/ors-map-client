import global from './global.js'
import loader from '@/support/loader'

/**
 * Fetch required api data to run the app
 */
const build = () => {
  // DE LANGUAGE

  let translationsObj = global

  // load and get all EN messages from components *i18n.en.js default export using custom loader
  const componentMessages = loader.load(require.context('@/pages/', true, /\.i18n\.de-de\.js$/), true)
  addComponentKeys(componentMessages, translationsObj)

  // load and get all EN messages from core *i18n.en.js default export using custom loader
  const CRUDMessages = loader.load(require.context('@/crud/', true, /\.i18n\.de-de\.js$/), true)
  addComponentKeys(CRUDMessages, translationsObj)

  // load and get all EN messages from shared parts *i18n.en.js default export using custom loader
  const sharedPartsMessages = loader.load(require.context('@/fragments/', true, /\.i18n\.de-de\.js$/), true)
  addComponentKeys(sharedPartsMessages, translationsObj)

  // load and get all EN messages from shared parts *i18n.en.js default export using custom loader
  const resourcesMessages = loader.load(require.context('@/resources/', true, /\.i18n\.de-de\.js$/), true)
  addComponentKeys(resourcesMessages, translationsObj)

  return translationsObj
}

const addComponentKeys = (localeSharedPartsMessages, translationsObj) => {
  for (let messages in localeSharedPartsMessages) {
    let translations = localeSharedPartsMessages[messages]
    for (var key in translations) {
      // skip loop if the property is from prototype
      if (!translations.hasOwnProperty(key)) continue
      translationsObj[key] = translations[key]
    }
  }
}
  

const translationsBuilder = {
  build,
}

export default translationsBuilder


