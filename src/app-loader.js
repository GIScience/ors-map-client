import store from '@/store/store'
import httpApi from '@/common/http-api'
import defaultMapSettings from '@/resources/default-map-settings'
import appConfig from '@/config'
import utils from '@/support/utils'
import constants from '@/resources/constants'
import settingsOptions from '@/resources/settings-options.js'
import lodash from 'lodash'

/**
 * Fetch required api data to run the app
 */
const fetchApiInitialData = () => {
  return new Promise((resolve) => {
    // If the data was already acquired
    // don't run the request again
    if (store.getters.dataAcquired) {
      resolve(store.getters.mapSettings.apiKey)
    } else {
      // For some reason not yet identified (maybe a vue router bug?)
      // the `beforeEnter` guard used to fire this action is being called
      // multiple times. so, we had to implement this `apiDataRequested` flag
      // so that we avoid running several requests before the promise is resolved
      if (!store.getters.apiDataRequested) {
        store.commit('apiDataRequested', true)

        // By default, the app must use an ors API key stored in config.js
        if (appConfig.useUserKey) {
          saveApiData(appConfig.ORSApiKey, constants.endpoints)
          resolve()
        } else {
          // Request the public API key from the remote service 
          // (only works when runing the app on valid ORS domains).
          // If the request fails, use the local user key instead
          httpApi.get(appConfig.publicApiKeyUrl).then(response => {
            saveApiData(response.data, constants.publicEndpoints)
            resolve(response.data)
          }).catch(error => {
            saveApiData(appConfig.ORSApiKey, constants.endpoints)
            console.log(error)
            resolve()
          })
        }
      }
    }
  })
}

/**
 * Find the fitting locale
 * @param {String} mapSettings 
 * @returns {String}
 */
const findFittingLocale = (storedLocale) => {
  let locale =  storedLocale || window.navigator.language || window.navigator.userLanguage
  if (locale) {
    locale = locale.toLowerCase()
  }
  let isLocaleValid = lodash.find(settingsOptions.appLocales, (l) => {
    return l.value === locale
  })
  // If the selected locale is not supported, set the default
  if (!isLocaleValid) {
    locale = 'en'
  }
  return locale
}
/**
 * Save the API data
 * @param {*} commit 
 * @param {*} apiKey 
 * @param {*} endpoints 
 */
const saveApiData = (apiKey, endpoints) => {
  // Save the api key and the endpoints to the default settings object
  defaultMapSettings.apiKey = apiKey
  defaultMapSettings.endpoints = endpoints

  // WE will save the mapSettings on our store
  // but the default settings are preserved
  const mapSettings = utils.clone(defaultMapSettings)

  // Get map settings from local storage
  const serializedMapSettings = localStorage.getItem('mapSettings')

  // Restore settings stored in local storage, if available
  if (serializedMapSettings) {
    const storedMapSettings = JSON.parse(serializedMapSettings)
    for (const key in storedMapSettings) {
      if (key === 'locale') {
        let fittingLocale = findFittingLocale(storedMapSettings.locale)
        mapSettings.locale = fittingLocale
      } else {
        if (typeof storedMapSettings[key] === 'object') {
          mapSettings[key] = Object.assign({}, storedMapSettings[key])
        } else {
          mapSettings[key] = storedMapSettings[key]
        }
      }
    }
    // If the settings was saved in local storage
    // then this option is must start as true
    mapSettings.saveToLocalStorage = true
  }

  // Save the map settings
  store.commit('mapSettings', mapSettings)

  // Save the data acquired flag as true
  store.commit('dataAcquired', true)
}
/**
 * check if the embed is in the url params and set the embed state
 * @param {*} getters 
 * @param {*} commit 
 * @param {*} routeTo 
 */
const checkAndSetEmbedState = () => {
  return new Promise((resolve) => {
    let isEmbed = location.href.indexOf('/embed') > -1
    store.commit('embed', isEmbed)

    if (isEmbed && routeTo.params.locale ) {
      let validLocales = settingsOptions.appLocales
      let localeSupported = lodash.find(validLocales, ['value', routeTo.params.locale])

      if (lodash.isObject(localeSupported)) {
        let settings = store.getters.mapSettings
        settings.locale = routeTo.params.locale
        store.commit('mapSettings', settings)      
      }
    }
    resolve(isEmbed)
  })
}

const load = () => {
  return new Promise((resolve) => {
    let apiDataPromise = fetchApiInitialData()
    let embedPromise = checkAndSetEmbedState()

    Promise.all([apiDataPromise, embedPromise]).then((results) => {
      resolve()
    })
  })
}

const loader = {
  load,
  checkAndSetEmbedState
}

export default loader


