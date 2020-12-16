import MainMenu from '@/common/main-menu'
import appConfig from '@/config/app-config'

const state = {
  leftSideBarOpen: appConfig.sidebarStartsOpenInheighResolution,
  leftSideBarPinned: false,
  topBarOpen: true,
  displayFooter: true,
  pickPlaceIndex: null,
  pickPlaceId: null,
  mainMenu: [],
  footerFullHeight: 74,
  footerMiniHeight: 140,
  sidebarFullWidth: 400,
  sidebarShrinkeWidth: 290,
  sidebarHeaderHeight: 160
}

const getters = {
  leftSideBarOpen: state => {
    // if the sidebar is pinned it is not 
    // considered open but pinned!
    return !state.leftSideBarPinned && state.leftSideBarOpen
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
  sidebarShrinkeWidth: state => {
    return state.sidebarShrinkeWidth
  },
  isSidebarVisible: state => {
    return state.leftSideBarOpen || state.leftSideBarPinned
  },
  pickPlaceIndex: state => {
    return state.pickPlaceIndex
  },
  pickPlaceId: state => {
    return state.pickPlaceId
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
  pickPlaceIndex: (state, index) => {
    state.pickPlaceIndex = index
  },
  pickPlaceId: (state, id) => {
    state.pickPlaceId = id
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
