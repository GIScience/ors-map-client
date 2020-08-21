import store from '@/store/store'
import router from '@/router/index'

const showMenuItem = function (item) {
  // a custom show menu item function can be passed
  // if passed, use the custom one. If not, use the default
  if (this.showMenuItemFn) {
    return this.showMenuItemFn(item)
  } else {
    if (store.getters.isAuthenticated) {
      return !item.requiresNotBeAuthenticated
    } else {
      return !item.requiresBeAuthenticated
    }
  }
}
const navigate = function (to) {
  if (to.external) {
    window.location = to.href
  } else {
    router.push(to.href)
  }
}

const getHref = function (to) {
  return to.href
}

const isActive = function (item) {
  item.active = false
  const activeRoute = location.hash.replace('#', '')
  const itemRoute = item.href.replace('/dev/#', '')
  if (activeRoute === itemRoute || (item.href === '/dev' && (activeRoute === '/login' || activeRoute === '/'))) {
    item.active = true
  }
  return item.active
}

export { showMenuItem }
export { navigate }
export { isActive }
export { getHref }
