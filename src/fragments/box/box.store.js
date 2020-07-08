import VueInstance from '@/main'

const state = {
  boxMaximizedStack: null
}

const getters = {
  boxMaximizedStack: state => {
    return state.boxMaximizedStack
  }
}

const mutations = {
  boxMaximizedStack: (state, value) => {
    state.boxMaximizedStack = value
    VueInstance.eventBus.$emit('boxMaximizedStackChanged', value)
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
