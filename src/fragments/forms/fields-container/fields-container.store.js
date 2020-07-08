const state = {
  parameters: []
}

const getters = {
  parameters: state => {
    return state.parameters
  }
}

const mutations = {
  parameters: (state, parameters) => {
    state.parameters = parameters
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
