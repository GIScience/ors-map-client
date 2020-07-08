import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import ors from './modules/ors'
import apState from './modules/state'
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
    ui,
    ors,
    apState
  }
}

// load and get all routes from *.route.js default export using custom loader
let storeModules = loader.load(require.context('@/pages/', true, /\.store\.js$/), true)
let fragmentModules = loader.load(require.context('@/fragments/', true, /\.store\.js$/), true)
let mergedModules = { ...storeModules, ...fragmentModules }

for (var key in mergedModules) {
  storeBuilder.modules[key] = mergedModules[key]
}

const store = new Vuex.Store(storeBuilder)

export default store
