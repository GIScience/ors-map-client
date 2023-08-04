// noinspection HttpUrlsUsage

import menuService from './menu-service'
import appConfig from '@/config/app-config'
import Vue from 'vue'

/**
 * Get a menu from remove service by its slug
 * As the menu in the back-end are managed, we can not be sure about the
 * id of the menu we want to load, but we expect that the menu has a specific
 * slug. Unfortunately, the menu api does not allow getting a single menu based in its
 * slug. So, we load a list of menus, iterate over them and get the id of the menu
 * that has as slug the slug passed and then make a second request to get the desired menu
 *
 * @param {string} slug - slug of the menu
 */
const getMenu = (slug) => {
  return new Promise((resolve) => {
    menuService.query()
      .then(response => {
        const menuBySlug = Vue.lodash.find(response.data, (menu) => {
          return menu.slug === slug
        })
        menuService.get(menuBySlug.term_id)
          .then(resource => {
            resolve(parseMenu(resource.items))
          })
      })
      .catch(error => {
        resolve([])
        console.log(error)
      })
  })
}

/**
 * Add external URL to menu item
 * @param {*} item
 */
const addBaseExternalUrl = (item) => {
  if (!item.href.startsWith('http')) {
    item.href = appConfig.appMenu.baseMenuExternalUrl + item.href
  }
  if (item.items) {
    for (const key in item.items) {
      item.items[key] = addBaseExternalUrl(item.items[key])
    }
  }
  return item
}

/**
 * Parse a collection of menu items to a structure expected locally
 *
 * @param {*} items
 */
const parseMenu = (items) => {
  const menu = []
  Vue.lodash.each(items, (item) => {
    const parsedItem = parseItem(item)
    menu.push(parsedItem)
  })
  return menu
}

/**
 * Parse a menu item to a structure expected locally
 *
 * @param {*} item
 */
const parseItem = (item) => {
  const parsedItem = {
    href: item.url,
    external: true,
    title: item.title,
    icon: 'link',
    notInHeader: false,
    requiresBeAuthenticated: false,
    active: false
  }

  setItemActiveStatus(parsedItem)

  /* If the menu item has children, parse the children too */
  if (item.children && Array.isArray(item.children)) {
    parsedItem.items = []
    Vue.lodash.each(item.children, (child) => {
      parsedItem.items.push(parseItem(child))
    })
  }
  return parsedItem
}

/**
 * Define if the menu item is active or not
 * @param {*} item
 * @param {} router to object
 */
const setItemActiveStatus = (item, to) => {
  if (item.href !== undefined && item.href !== null) {
    let activeRoute = (to === undefined) ? location.hash.replace('#', '') : to.path
    if (activeRoute.indexOf('?') !== -1) {
      activeRoute = activeRoute.split('?')[0]
    }
    const itemRoute = item.href === '/' ? '/' : item.href.replace('/dev/#', '')

    // initialize as not active
    item.active = false

    // Include customization to set current dashboard main menu item as active
    if (activeRoute === itemRoute) {
      item.active = true
    } else {
      // Include customization to set current dashboard main menu item as active
      if (item.href === '/dev' && (activeRoute === '/login' || activeRoute === '/' || activeRoute === '/home')) {
        item.active = true
      }
    }
  }
}

/**
 * Run over each menu item and set the active status of each one
 * @param {*} menuItems
 * @param {} router to object
 */
const setMenuActiveStatus = (menuItems, to) => {
  Vue.lodash.each(menuItems, (item) => {
    setItemActiveStatus(item, to)
  })
}

/**
 * Replace a menu item by a replacement according its ending href string
 * @param {*} menu
 * @param string itemEnding
 * @param {*} replacement
 */
const replaceItemEndingWith = (menu, itemEnding, replacement) => {
  const replaceItemIndex = Vue.lodash.findIndex(menu, (item) => {
    if (!item.href) return false
    const href = item.href.endsWith('/') ? item.href.substr(0, (item.href.length - 1)) : item.href
    return href && href.endsWith(itemEnding)
  })
  if (replaceItemIndex !== undefined && replaceItemIndex !== null) {
    menu[replaceItemIndex] = replacement
  } else {
    menu.push(replacement)
  }
}

/**
 * Replace a menu item by a replacement by its starting href string
 * @param {*} menu
 * @param string itemStart
 * @param {*} replacement
 */
const replaceItemStartingWith = (menu, itemStart, replacement) => {
  const replaceItemIndex = Vue.lodash.findIndex(menu, (item) => {
    if (!item.href) return false
    const href = item.href.replace('http://', '').replace('https://', '')
    return href && href.startsWith(itemStart)
  })
  if (replaceItemIndex > -1) {
    menu[replaceItemIndex] = replacement
  } else {
    menu.push(replacement)
  }
}

/**
 * Inject a menu item before another item, identified by its ending href string
 * @param {*} menu
 * @param {*} beforeItemEnding
 * @param {*} injectItem
 */
const injectBeforeItemEndingWith = (menu, beforeItemEnding, injectItem) => {
  const beforeItemIndex = Vue.lodash.findIndex(menu, (item) => {
    if (!item.href) return false
    const href = item.href.endsWith('/') ? item.href.substr(0, (item.href.length - 1)) : item.href
    return href && href.endsWith(beforeItemEnding)
  })
  if (beforeItemIndex > 1) {
    menu.splice(beforeItemIndex, 0, injectItem)
  }
}

/**
 * Inject a menu item in a given index
 * @param {*} menu
 * @param {*} atIndex
 * @param {*} injectItem
 */
const injectAt = (menu, atIndex, injectItem) => {
  menu.splice(atIndex, 0, injectItem)
}

/**
 * Remove a menu item by its ending href string
 * @param {*} menu
 * @param {*} itemEnding
 */
const removeItemEndingWith = (menu, itemEnding) => {
  const removeItemIndex = Vue.lodash.findIndex(menu, (item) => {
    if (!item.href) return false
    const href = item.href.endsWith('/') ? item.href.substr(0, (item.href.length - 1)) : item.href
    return href && href.endsWith(itemEnding)
  })
  if (removeItemIndex > -1) {
    menu.splice(removeItemIndex, 1)
  }
}

/**
 * Return menu manager
 */
const MenuManager = {
  getMenu,
  replaceItemEndingWith,
  removeItemEndingWith,
  injectBeforeItemEndingWith,
  replaceItemStartingWith,
  injectAt,
  setMenuActiveStatus,
  addBaseExternalUrl
}

export default MenuManager
