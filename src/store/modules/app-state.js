import httpApi from '@/common/http-api'
import defaultMapSettings from '@/resources/default-map-settings'
import appConfig from '@/config'
import utils from '@/support/utils'
import constants from '@/resources/constants'
import settingsOptions from '@/resources/settings-options.js'
import lodash from 'lodash'

const state = {
  mode: constants.modes.place,
  apiDataRequested: false,
  dataAcquired: false,
  mapSettings: {},
  embed: false
}

const getters = {
  mode: state => {
    return state.mode
  },
  apiDataRequested: state => {
    return state.apiDataRequested
  },
  dataAcquired: state => {
    return state.dataAcquired
  },
  mapSettings: state => {
    return state.mapSettings
  },
  embed: state => {
    return state.embed
  }
}

const mutations = {
  mode: (state, mode) => {
    state.mode = mode
  },
  apiDataRequested: (state, requested) => {
    state.apiDataRequested = requested
  },
  dataAcquired: (state, dataAcquired) => {
    state.dataAcquired = dataAcquired
  },
  mapSettings: (state, mapSettings) => {
    state.mapSettings = mapSettings
  },
  embed: (state, embed) => {
    state.embed = embed
  }
}

const actions = {
  setAppState ( {getters, commit }) {
    return actions.fetchApiInitialData({getters, commit })
  },
  fetchApiInitialData ({ getters, commit }) {
    return new Promise((resolve) => {
      // If the data was already acquired
      // don't run the request again
      if (getters.dataAcquired) {
        resolve(getters.mapSettings.apiKey)
      } else {
        // For some reason not yet identified (maybe a vue router bug?)
        // the `beforeEnter` guard used to fire this action is being called
        // multiple times. so, we had to implement this `apiDataRequested` flag
        // so that we avoid running several requests before the promise is resolved
        if (!getters.apiDataRequested) {
          commit('apiDataRequested', true)

          // By default, the app must use an ors API key stored in config.js
          if (appConfig.useUserKey) {
            saveApiData(commit, appConfig.ORSApiKey, constants.endpoints)
            resolve()
          } else {
            // Request the public API key from the remote service 
            // (only works when runing the app on valid ORS domains).
            // If the request fails, use the local user key instead
            httpApi.get(appConfig.publicApiKeyUrl).then(response => {
              saveApiData(commit, response.data, constants.publicEndpoints)
              resolve(response.data)
            }).catch(error => {
              saveApiData(commit, appConfig.ORSApiKey, constants.endpoints)
              console.log(error)
              resolve()
            })
          }
        }
      }
    })
  },
  /**
   * check if the embed is in the url params and set the embed state
   * @param {*} getters 
   * @param {*} commit 
   * @param {*} to 
   */
  checkAndSetEmbedState ({getters, commit}, routeTo) {
    return new Promise((resolve) => {
      let isEmbed = routeTo.params.embed === 'embed' || routeTo.params.embed === '1'
      commit('embed', isEmbed)

      if (isEmbed && routeTo.params.locale ) {
        let validLocales = settingsOptions.appLocales
        let localeSupported = lodash.find(validLocales, ['value', routeTo.params.locale])

        if (lodash.isObject(localeSupported)) {
          let settings = getters.mapSettings
          settings.locale = routeTo.params.locale
          commit('mapSettings', settings)      
        }
      }
      resolve(isEmbed)
    })
  } 
}

/**
 * Save the initial api base request data to the store
 * @param {*} commit
 * @param {*} apiKey
 * @param {*} endpoints
 */
const saveApiData = (commit, apiKey, endpoints) => {
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
      if (typeof storedMapSettings[key] === 'object') {
        mapSettings[key] = Object.assign({}, storedMapSettings[key])
      } else {
        mapSettings[key] = storedMapSettings[key]
      }
    }
    // If the settings was saved in local storage
    // then this option is must start as true
    mapSettings.saveToLocalStorage = true
  }

  // Save the map settings
  commit('mapSettings', mapSettings)

  // Save the data acquired flag as true
  commit('dataAcquired', true)
}

export default {
  state,
  getters,
  mutations,
  actions
}
