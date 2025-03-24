/* eslint-disable no-undef */
import global from './global.js'
import {addComponentKeys} from '@/i18n/utils'


/**
 * Fetch required api data to run the app
 */
const build = () => {
  // EN LANGUAGE

  let translationsObj = global

  const componentMessages = import.meta.glob('@/pages/**/*.i18n.it-it.js', { eager: true})
  addComponentKeys(componentMessages, translationsObj)

  const sharedPartsMessages = import.meta.glob('@/fragments/**/*.i18n.it-it.js', { eager: true})
  addComponentKeys(sharedPartsMessages, translationsObj)

  const resourcesMessages = import.meta.glob('@/resources/**/*.i18n.it-it.js', { eager: true})
  addComponentKeys(resourcesMessages, translationsObj)

  const pluginsMessages = import.meta.glob('@/plugins/**/*.i18n.it-it.js', { eager: true})
  addComponentKeys(pluginsMessages, translationsObj)

  return translationsObj
}


const translationsBuilder = {
  build,
}

export default translationsBuilder
