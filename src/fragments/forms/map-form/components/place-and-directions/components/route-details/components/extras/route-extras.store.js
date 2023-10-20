const state = {
  extraHighlight: {}
}

const getters = {
  extraHighlight: state => {
    return state.extraHighlight
  }
}

const mutations = {
  extraHighlight: (state, extraHighlight) => {
    state.extraHighlight = extraHighlight
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
