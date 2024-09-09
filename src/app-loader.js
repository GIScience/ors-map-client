import OrsFilterUtil from '@/support/map-data-services/ors-filter-util'
import defaultMapSettings from '@/config/default-map-settings'
import settingsOptions from '@/config/settings-options.js'
import PreparedVue from '@/common/prepared-vue.js'
import I18nBuilder from '@/i18n/i18n-builder'
import constants from '@/resources/constants'
import appConfig from '@/config/app-config'
import AppHooks from '@/support/app-hooks'
import {HttpClient} from 'vue-rest-client'
import utils from '@/support/utils'
import store from '@/store/store'
import router from '@/router'
import lodash from 'lodash'
import Vue from 'vue'

class AppLoader {
  constructor() {
    this.debounceTimeoutId = null
    this.vueInstance = null
  }

  /**
   * Fetch required api data to run the app
   */
  async fetchApiInitialData() {
    // If the data was already acquired, don't run the request again
    if (store.getters.dataAcquired) {
      return store.getters.mapSettings.apiKey
    }

    const BITLYLOGIN = process.env.BITLYLOGIN
    const BITLYAPIKEY = process.env.BITLYAPIKEY
    if (BITLYLOGIN) {
      appConfig.bitlyLogin = BITLYLOGIN
    }
    if (BITLYAPIKEY) {
      appConfig.bitlyApiKey = BITLYAPIKEY
    }

    // For some reason not yet identified (maybe a vue router bug?)
    // the `beforeEnter` guard used to fire this action is being called
    // multiple times. so, we had to implement this `apiDataRequested` flag
    // so that we avoid running several requests before the promise is resolved
    if (!store.getters.apiDataRequested) {
      store.commit('apiDataRequested', true)

      const ORSKEY = process.env.ORSKEY

      // By default, the app must use an ors API key stored in config.js
      if (appConfig.useUserKey) {
        if (appConfig.orsApiKey === 'put-here-an-ors-api-key' && ORSKEY && ORSKEY !== '') {
          appConfig.orsApiKey = ORSKEY
        }
        this.setInitialSettings(appConfig.orsApiKey, constants.endpoints)
      } else {
        const httpClient = new HttpClient({baseURL: appConfig.dataServiceBaseUrl})

        try {
          // Request the public API key from the remote service
          // (only works when running the app on valid ORS domains).
          const response = await httpClient.http.get(appConfig.publicApiKeyUrl)
          this.setInitialSettings(response.data, constants.publicEndpoints)
          return response.data
        } catch (error) {
          // If the request fails, use the local user key instead
          if (ORSKEY && ORSKEY !== 'put-an-ors-key-here' && ORSKEY !== '') {
            appConfig.orsApiKey = ORSKEY
          }
          this.setInitialSettings(appConfig.orsApiKey, constants.endpoints)
          console.log('Error acquiring api key:', error)
        }
      }
    }
  }

  /**
   * Find the fitting locale
   * @returns {String}
   * @param storedLocale
   */
  getFittingLocale(storedLocale) {
    const deviceLocale = window.navigator.language || window.navigator.userLanguage
    let locale = storedLocale || deviceLocale
    if (locale) {
      locale = locale.toLowerCase()
    }
    let isLocaleValid = lodash.find(settingsOptions.appLocales, (l) => l.value === locale)

    // If the exact locale of the device is not available, try at least to use the language
    if (!isLocaleValid) {
      let language = locale
      if (locale.length > 2 && locale.indexOf('-') > -1) {
        language = locale.split('-')[0]
      }
      isLocaleValid = lodash.find(settingsOptions.appLocales, (l) => l.value.split('-')[0] === language)
      if (isLocaleValid) {
        locale = isLocaleValid.value
      }
    }

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
  setInitialSettings(apiKey, endpoints) {
    defaultMapSettings.apiKey = apiKey
    defaultMapSettings.endpoints = endpoints

    const mapSettings = utils.clone(defaultMapSettings)
    const serializedMapSettings = localStorage.getItem('mapSettings')
    let locale = null

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
      if (typeof mapSettings.apiKey !== 'string' || mapSettings.apiKey === '') {
        mapSettings.apiKey = defaultMapSettings.apiKey
      }
      // If the settings was saved in local storage
      // then this option must start as true
      mapSettings.saveToLocalStorage = true
    }

    const profile = OrsFilterUtil.getFilterRefByName(constants.profileFilterName)
    if (!profile.value) {
      OrsFilterUtil.setFilterValue(constants.profileFilterName, defaultMapSettings.defaultProfile)
    }

    this.saveSettings(mapSettings, locale)

    const appInstance = AppLoader.getInstance()
    if (appInstance) {
      // main app instance may not be available when app is still loading
      appInstance.appHooks.run('mapSettingsChanged', mapSettings)
    }

    store.commit('dataAcquired', true)
  }

  /**
   * Store the map settings locale and routing locale
   * @param {*} mapSettings
   * @param {*} locale
   */
  saveSettings(mapSettings, locale = null) {
    const fittingLocale = this.getFittingLocale(locale)
    mapSettings.locale = fittingLocale

    let validRoutingLocale = lodash.find(settingsOptions.routingInstructionsLocales, (l) => l.value === fittingLocale)
    if (validRoutingLocale) {
      settingsOptions.routingInstructionsLocale = locale
    } else {
      validRoutingLocale = lodash.find(settingsOptions.routingInstructionsLocales, (l) => l.value === fittingLocale.split('-')[0])
      if (validRoutingLocale) {
        mapSettings.routingInstructionsLocale = validRoutingLocale.value
      }
    }

    store.commit('mapSettings', mapSettings)
  }

  /**
   * check if the embed is in the url params and set the embed state
   */
  static async checkAndSetEmbedState() {
    const isEmbed = location.href.indexOf('/embed') > -1
    store.commit('embed', isEmbed)

    const parts = location.href.split('/embed/')
    const mapSettings = store.getters.mapSettings
    if (Object.keys(mapSettings).length > 0 && isEmbed && Array.isArray(parts) && parts.length > 1 && parts[1]) {
      let locale = parts[1]
      const appLoader = new AppLoader()
      locale = appLoader.getFittingLocale(locale)
      appLoader.saveSettings(mapSettings, locale)
    }
    return isEmbed
  }

  /**
   * Load and mount the main VueJS app using the
   * @param {Object} App
   * @param {String} elementSelector
   * @param {String} templateTag
   * @returns {Promise} resolves main Vue instance
   */
  async loadApp(App, elementSelector, templateTag) {
    if (this.vueInstance) {
      return this.vueInstance
    } else if (store.getters.mainAppInstanceRef) {
      this.vueInstance = store.getters.mainAppInstanceRef
      return store.getters.mainAppInstanceRef
    }

    await this.loadAppData()
    const i18n = I18nBuilder.build()

    i18n.locale = store.getters.mapSettings.locale === 'en' ? 'en-us' : store.getters.mapSettings.locale

    this.vueInstance = new PreparedVue({
      el: elementSelector,
      i18n,
      router,
      components: {App},
      store,
      template: templateTag
    })

    store.commit('mainAppInstanceRef', this.vueInstance)
    return this.vueInstance
  }

  /**
   * Load app external data
   * @returns {Promise}
   */
  async loadAppData() {
    if (this.debounceTimeoutId) {
      clearTimeout(this.debounceTimeoutId)
    }

    return new Promise((resolve) => {
      this.debounceTimeoutId = setTimeout(async () => {
        await Promise.all([
          this.fetchApiInitialData(),
          AppLoader.checkAndSetEmbedState(),
          store.dispatch('fetchMainMenu')
        ])
        resolve()
      }, 500)
    })
  }

  /**
   * Get a pointer to the main app vue instance
   * @returns {Vue} instance
   */
  static getInstance() {
    let ref
    if (store.getters.mainAppInstanceRef) {
      ref = store.getters.mainAppInstanceRef
    } else {
      ref = new Vue({
        data: {appHooks: new AppHooks()},
        i18n: I18nBuilder.build(),
        store
      })
    }
    return ref
  }
}

export default AppLoader
