const state = {
  browserLocation: null,
  activeRouteIndex: 0,
  mapCenter: null,
  mapBounds: null,
  currentLocation: null
}

const getters = {
  browserLocation: state => {
    return state.browserLocation
  },
  activeRouteIndex: state => {
    return state.activeRouteIndex
  },
  mapCenter: state => {
    return state.mapCenter
  },
  mapBounds: state => {
    return state.mapBounds
  },
  currentLocation: state => {
    return state.currentLocation
  }
}

const mutations = {
  browserLocation: (state, browserLocation) => {
    state.browserLocation = browserLocation
  },
  activeRouteIndex: (state, activeRouteIndex) => {
    state.activeRouteIndex = activeRouteIndex
  },
  mapCenter: (state, mapCenter) => {
    state.mapCenter = mapCenter
  },
  mapBounds: (state, mapBounds) => {
    state.mapBounds = mapBounds
  },
  currentLocation: (state, currentLocation) => {
    state.currentLocation = currentLocation
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
