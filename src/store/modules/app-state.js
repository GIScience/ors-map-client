import constants from '@/resources/constants'
import defaultMapSettings from '@/resources/default-map-settings'
import utils from '@/support/utils'

const state = {
  mode: constants.modes.place,
  apiDataRequested: false,
  dataAcquired: false,
  mapSettings: {},
  embed: false,
  acessibleModeActive: false
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
  },
  acessibleModeActive: state => {
    return state.acessibleModeActive
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
  },
  acessibleModeActive: (state, acessibleModeActive) => {
    state.acessibleModeActive = acessibleModeActive
  }
}

const actions = {
  saveSettings ({ commit }, savingSettings) {
    return new Promise((resolve) => {
      const defaultSettings = defaultMapSettings

      // The apiKey must not be saved if it is the default one (only if is a custom one)
      if (savingSettings.apiKey === defaultSettings.apiKey || savingSettings.apiKey === '' || savingSettings.apiKey === null) {
        delete savingSettings.apiKey
      }
      commit('mapSettings', savingSettings)
      localStorage.setItem('mapSettings', JSON.stringify(savingSettings))
      resolve(savingSettings)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
