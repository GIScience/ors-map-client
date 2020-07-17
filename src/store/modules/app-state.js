import constants from '@/resources/constants'

const state = {
  mode: constants.modes.place,
  apiDataRequested: false,
  dataAcquired: false
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
