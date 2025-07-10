import AppRouteData from '@/models/app-route-data'
import AppHooks from '@/support/app-hooks'

const state = {
  appRouteData: new AppRouteData(),
  mapReady: false,
  cleanMap: false,
  openSettings: false,
  openAbout: false
}

const getters = {
  appRouteData: state => {
    return state.appRouteData
  },
  mapReady: state => {
    return state.mapReady
  },
  cleanMap: state => {
    return state.cleanMap
  },
  openSettings: state => {
    return state.openSettings
  },
  openAbout: state => {
    return state.openAbout
  }
}

const mutations = {
  appRouteData: (state, value) => {
    state.appRouteData = value
    AppHooks.run('appRouteDataChanged', state.appRouteData)
  },
  mapReady: (state, value) => {
    state.mapReady = value
  },
  cleanMap: (state, value) => {
    state.cleanMap = value
  },
  openAbout: (state, value) => {
    state.openAbout = value
  },
  openSettings: (state, value) => {
    state.openSettings = value
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
