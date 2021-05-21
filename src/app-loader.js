import defaultMapSettings from '@/config/default-map-settings'
import settingsOptions from '@/config/settings-options.js'
import constants from '@/resources/constants'
import appConfig from '@/config/app-config'
import {HttpClient} from 'vue-rest-client'
import utils from '@/support/utils'
import store from '@/store/store'
import lodash from 'lodash'
import main from '@/main'

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
          saveApiData(appConfig.orsApiKey, constants.endpoints)
          resolve()
        } else {
          let httpClient = new HttpClient({baseURL: appConfig.dataServiceBaseUrl})
          // Request the public API key from the remote service
          // (only works when running the app on valid ORS domains).
          // If the request fails, use the local user key instead
          httpClient.http.get(appConfig.publicApiKeyUrl).then(response => {
            saveApiData(response.data, constants.publicEndpoints)
            resolve(response.data)
          }).catch(error => {
            saveApiData(appConfig.orsApiKey, constants.endpoints)
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
 * @returns {String}
 * @param storedLocale
 */
const setFittingLocale = (storedLocale) => {
  var deviceLocale = window.navigator.language || window.navigator.userLanguage
  let locale =  storedLocale || deviceLocale
  if (locale) {
    locale = locale.toLowerCase()
  }
  let isLocaleValid = lodash.find(settingsOptions.appLocales, (l) => {
    return l.value === locale
  })
  // If the exact locale of the device is not available, try at least to use the language
  if (!isLocaleValid) {
    let language = locale
    if (locale.length > 2 && locale.indexOf('-') > -1) {
      language = locale.split('-')[0]
    }
    isLocaleValid = lodash.find(settingsOptions.appLocales, (l) => {
      return l.value.split('-')[0] === language
    })
    if (isLocaleValid) {
      locale = isLocaleValid.value
    }
  }
  // If the selected locale is not supported, set the default
  if (!isLocaleValid) {
    locale = appConfig.defaultLocale
  }
  return locale
}
/**
 * Save the API data
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

  var locale = null

  // Restore settings stored in local storage, if available
  if (serializedMapSettings) {
    const storedMapSettings = JSON.parse(serializedMapSettings)
    for (const key in storedMapSettings) {
      if (key === 'locale') {
        locale = storedMapSettings.locale
      } else {
        if (typeof storedMapSettings[key] === 'object') {
          mapSettings[key] = Object.assign({}, storedMapSettings[key])
        } else {
          mapSettings[key] = storedMapSettings[key]
        }
      }
    }
    if ( typeof mapSettings.apiKey !== 'string' || mapSettings.apiKey === '') {
      mapSettings.apiKey = defaultMapSettings.apiKey
    }
    // If the settings was saved in local storage
    // then this option is must start as true
    mapSettings.saveToLocalStorage = true
  }
  storeLocale(mapSettings, locale)

  let mainVue = main
  if (mainVue) { // main maz be not available when app is loading
    let appInstance = mainVue.getInstance()
    if (appInstance) {
      appInstance.appHooks.run('mapSettingsChanged', mapSettings)
    }
  }

  // Save the data acquired flag as true
  store.commit('dataAcquired', true)
}

/**
 * Store the map settings locale and routing locale
 * @param {*} mapSettings
 * @param {*} locale
 */
const storeLocale = (mapSettings, locale = null) => {
  let fittingLocale = setFittingLocale(locale)
  mapSettings.locale = fittingLocale

  let validroutingLocale = lodash.find(settingsOptions.routingInstructionsLocales, (l) => {
    return l.value === fittingLocale
  })
  if (validroutingLocale) {
    settingsOptions.routingInstructionsLocale = locale
  } else {
    validroutingLocale = lodash.find(settingsOptions.routingInstructionsLocales, (l) => {
      return l.value === fittingLocale.split('-')[0]
    })
    if (validroutingLocale) {
      mapSettings.routingInstructionsLocale = validroutingLocale.value
    }
  }

  // Save the map settings
  store.commit('mapSettings', mapSettings)
}
/**
 * check if the embed is in the url params and set the embed state
 */
const checkAndSetEmbedState = () => {
  return new Promise((resolve) => {
    let isEmbed = location.href.indexOf('/embed') > -1
    store.commit('embed', isEmbed)

    let parts = location.href.split('/embed/')
    if (isEmbed && Array.isArray(parts) && parts.length > 1 && parts[1] ) {
      let locale = parts[1]
      locale = setFittingLocale(locale)

      let settings = store.getters.mapSettings
      storeLocale(settings, locale)
    }
    resolve(isEmbed)
  })
}

const load = () => {
  return new Promise((resolve) => {
    let apiDataPromise = fetchApiInitialData()
    let embedPromise = checkAndSetEmbedState()
    let fetchMainMenu = store.dispatch('fetchMainMenu')

    Promise.all([apiDataPromise, embedPromise, fetchMainMenu]).then((results) => {
      resolve()
    })
  })
}

const loader = {
  load,
  checkAndSetEmbedState
}

export default loader


