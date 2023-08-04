import constants from '@/resources/constants'
import defaultMapSettings from '@/config/default-map-settings'
import utils from '@/support/utils'
import AppLoader from '@/app-loader'

const state = {
  mode: constants.modes.place,
  apiDataRequested: false,
  dataAcquired: false,
  mapSettings: {}, // centered at Heidelberg (DE) by default
  embed: false,
  accessibleModeActive: false,
  mainAppInstanceRef: null
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
  // shortcut to map center
  mapCenter: state => {
    return state.mapSettings.mapCenter
  },
  embed: state => {
    return state.embed
  },
  accessibleModeActive: state => {
    return state.accessibleModeActive
  },
  mainAppInstanceRef: state => {
    return state.mainAppInstanceRef
  }
}

const mutations = {
  mode: (state, mode) => {
    state.mode = mode
    AppLoader.getInstance().appHooks.run('appModeChanged', mode)
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
  },
  accessibleModeActive: (state, accessibleModeActive) => {
    state.accessibleModeActive = accessibleModeActive
  },
  mainAppInstanceRef: (state, mainAppInstanceRef) => {
    state.mainAppInstanceRef = mainAppInstanceRef
  }
}

const actions = {
  saveSettings ({ commit }, savingSettings) {
    return new Promise((resolve) => {
      localStorage.removeItem('mapSettings')
      const defaultSettings = defaultMapSettings

      const settingsToKeepInAppStore = utils.clone(savingSettings)

      // The apiKey must not be saved if it is empty
      if (savingSettings.apiKey === '' || savingSettings.apiKey === null) {
        delete savingSettings.apiKey
      }
      // Do not save settings keys with default value
      for (let key in savingSettings) {
        if (defaultSettings[key] !== undefined && savingSettings[key] != undefined) {
          let saveVal = JSON.stringify(savingSettings[key])
          let defaultVal = JSON.stringify(defaultSettings[key])
          // locale is an exception, because the app auto-detects the browser locale
          // so the user would not be able to save the default language as preferred
          if (saveVal === defaultVal && key !== 'locale') {
            delete savingSettings[key]
          }
        }
      }
      commit('mapSettings', settingsToKeepInAppStore)
      localStorage.setItem('mapSettings', JSON.stringify(savingSettings))
      // Update the html language
      document.documentElement.lang = savingSettings.locale
      resolve(settingsToKeepInAppStore)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
