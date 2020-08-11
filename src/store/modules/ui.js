import MainMenu from '@/common/main-menu'

const state = {
  leftSideBarOpen: false,
  leftSideBarPinned: false,
  topBarOpen: true,
  displayFooter: true,
  mainMenu: []
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
  displayFooter: state => {
    return state.displayFooter
  },
  mainMenu: state => {
    return state.mainMenu
  },
  footerFullHeight: state => {
    return 74
  },
  footerMiniHeight: state => {
    return 40
  },
  sidebarHeaderHeight: state => {
    return 135
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
  setDisplayFooter: (state, display) => {
    state.displayFooter = display
  },
  mainMenu: (state, items) => {
    state.mainMenu = items
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
