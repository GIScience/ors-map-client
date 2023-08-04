/* eslint-disable no-undef */
import Vue from 'vue'
import Vuex from 'vuex'
import appUI from './modules/app-ui'
import mapState from './modules/map-state'
import appState from './modules/app-state'
import loader from '@/support/loader'

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
const storeModules = loader.load(require.context('@/pages/', true, /\.store\.js$/), true)
const fragmentModules = loader.load(require.context('@/fragments/', true, /\.store\.js$/), true)
const pluginsModules = loader.load(require.context('@/plugins/', true, /\.store\.js$/), true)
const mergedModules = { ...storeModules, ...fragmentModules, ...pluginsModules }

for (let key in mergedModules) {
  storeBuilder.modules[key] = mergedModules[key]
}

const store = new Vuex.Store(storeBuilder)

export default store
