/* eslint-disable no-undef */
import Vue from 'vue'
import Vuex from 'vuex'
import appUI from './modules/app-ui'
import mapState from './modules/map-state'
import appState from './modules/app-state'

Vue.use(Vuex)

const storeBuilder = {
  state: {
    value: 0
  },
  getters: {
  },
  mutations: {

  },
  modules: {
    appUI,
    mapState,
    appState
  }
}

// load and get all routes from *.route.js default export using custom loader
const storeModules = import.meta.glob('@/pages/**.store.js', { eager: true})
const fragmentModules = import.meta.glob('@/fragments/**.store.js', { eager: true})
const pluginsModules = import.meta.glob('@/plugins/**.store.js', { eager: true})
const mergedModules = { ...storeModules, ...fragmentModules, ...pluginsModules }

for (let key in mergedModules) {
  storeBuilder.modules[key] = mergedModules[key]
}

const store = new Vuex.Store(storeBuilder)

export default store
