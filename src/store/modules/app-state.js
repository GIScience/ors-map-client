import constants from '@/resources/constants'

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
}

export default {
  state,
  getters,
  mutations,
  actions
}
