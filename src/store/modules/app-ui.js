import MainMenu from '@/common/main-menu'

const state = {
  leftSideBarOpen: false,
  leftSideBarPinned: false,
  topBarOpen: true,
  pickPlaceIndex: null,
  pickPlaceId: null,
  mainMenu: [],
  footerFullHeight: 89,
  footerMiniHeight: 140,
  sidebarFullWidth: 400,
  sidebarShrunkWidth: 290,
  sidebarHeaderHeight: 175,
  pointerTriggeredAction: false
}

const getters = {
  leftSideBarOpen: state => {
    return state.leftSideBarOpen
  },
  leftSideBarPinned: state => {
    return state.leftSideBarPinned
  },
  topBarOpen: state => {
    return state.topBarOpen
  },
  mainMenu: state => {
    return state.mainMenu
  },
  footerFullHeight: state => {
    return state.footerFullHeight
  },
  footerMiniHeight: state => {
    return state.footerMiniHeight
  },
  sidebarHeaderHeight: state => {
    return state.sidebarHeaderHeight
  },
  sidebarFullWidth: state => {
    return state.sidebarFullWidth
  },
  sidebarShrunkWidth: state => {
    return state.sidebarShrunkWidth
  },
  isSidebarVisible: state => {
    return state.leftSideBarOpen || state.leftSideBarPinned
  },
  pickPlaceIndex: state => {
    return state.pickPlaceIndex
  },
  pickPlaceId: state => {
    return state.pickPlaceId
  },
  pointerTriggeredAction: state => {
    return state.pointerTriggeredAction
  }
}

const mutations = {
  setLeftSideBarIsOpen: (state, isOpen) => {
    state.leftSideBarOpen = isOpen
  },
  setLeftSideBarIsPinned: (state, isPined) => {
    state.leftSideBarPinned = isPined
    // When the sidebar is pinned, we also
    // set is as open
    if (isPined) {
      state.leftSideBarOpen = true
    }
  },
  setTopBarIsOpen: (state, isOpen) => {
    state.topBarOpen = isOpen
  },
  pickPlaceIndex: (state, index) => {
    state.pickPlaceIndex = index
  },
  pickPlaceId: (state, id) => {
    state.pickPlaceId = id
  },
  mainMenu: (state, items) => {
    state.mainMenu = items
  },
  pointerTriggeredAction: (state, value) => {
    return state.pointerTriggeredAction = value
  }
}

const actions = {
  fetchMainMenu ({ getters, commit }) {
    return new Promise((resolve) => {
      if (getters.mainMenu.length > 0) {
        resolve(getters.mainMenu)
      }
      MainMenu.loadItems().then((items) => {
        commit('mainMenu', items)
        resolve(items)
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
