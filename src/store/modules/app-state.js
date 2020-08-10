import httpApi from '@/common/http-api'
import defaultMapSettings from '@/resources/default-map-settings'
import appConfig from '@/config'
import utils from '@/support/utils'
import constants from '@/resources/constants'

const state = {
  mode: constants.modes.place,
  apiDataRequested: false,
  dataAcquired: false,
  mapSettings: {}
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
  }
}

const actions = {
  fetchApiInitialData ({getters, commit}) {
    return new Promise((resolve) => {
      // If the data was already acquired
      // don't run the request again
      if (getters.dataAcquired) {
        resolve(getters.mapSettings.apiKey)
      } else {
        // For some reason not yet discovered (maybe a vue router bug?)
        // the `beforeEnter` guard used to fire this action is being called
        // multiple times. so, we had to implement this `apiKeyRequested` flag
        // so that we avoid running several requests before the promise is resolved
        if (!getters.apiDataRequested) {
          commit('apiDataRequested', true)

          // Request the public API key from the remote service
          // If the request fails, use the local user key
          httpApi.get(appConfig.publicApiKeyUrl).then(response => {
            saveApiData(commit, response.data, constants.publicEndpoints)
            resolve(response.data)
          }).catch(error => {
            saveApiData(commit, appConfig.userApiKey, constants.endpoints)
            console.log(error)
            resolve(appConfig.userApiKey)
          })
        }
      }
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
  let mapSettings = utils.clone(defaultMapSettings)

  // Get map settings from local storage
  let serializedMapSettings = localStorage.getItem('mapSettings')

  // Restore settings stored in local storage, if available
  if (serializedMapSettings) {
    let storedMapSettings = JSON.parse(serializedMapSettings)
    for (let key in storedMapSettings) {
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
