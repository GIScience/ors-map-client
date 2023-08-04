/* eslint-disable no-undef */
import global from './global.js'
import loader from '@/support/loader'

/**
 * Fetch required api data to run the app
 */
const build = () => {
  // EN LANGUAGE

  let translationsObj = global

  const componentMessages = loader.load(require.context('@/pages/', true, /\.i18n\.it-it\.js$/), true)
  addComponentKeys(componentMessages, translationsObj)

  const sharedPartsMessages = loader.load(require.context('@/fragments/', true, /\.i18n\.it-it\.js$/), true)
  addComponentKeys(sharedPartsMessages, translationsObj)

  const resourcesMessages = loader.load(require.context('@/resources/', true, /\.i18n\.it-it\.js$/), true)
  addComponentKeys(resourcesMessages, translationsObj)

  const pluginsMessages = loader.load(require.context('@/plugins/', true, /\.i18n\.it-it\.js$/), true)
  addComponentKeys(pluginsMessages, translationsObj)

  return translationsObj
}

const addComponentKeys = (localeSharedPartsMessages, translationsObj) => {
  for (let messages in localeSharedPartsMessages) {
    let translations = localeSharedPartsMessages[messages]
    for (let key in translations) {
      // Skip loop if the property is from prototype
      if (!Object.prototype.hasOwnProperty.call(translations, key)) continue
      translationsObj[key] = translations[key]
    }
  }
}


const translationsBuilder = {
  build,
}

export default translationsBuilder
