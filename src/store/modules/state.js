import constants from '@/resources/constants'

const state = {
  mode: constants.modes.place,
  locationAccessDenied: false
}

const getters = {
  mode: state => {
    return state.mode
  },
  locationAccessDenied: state => {
    return state.locationAccessDenied
  }
}

const mutations = {
  mode: (state, mode) => {
    state.mode = mode
  },
  locationAccessDenied: (state, value) => {
    state.locationAccessDenied = value
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
