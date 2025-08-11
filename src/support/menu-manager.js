// noinspection HttpUrlsUsage

import Vue from 'vue'

/**
 * Get a menu from remove service by its slug
 * As the menu in the back-end are managed, we can not be sure about the
 * id of the menu we want to load, but we expect that the menu has a specific
 * slug. Unfortunately, the menu api does not allow getting a single menu based in its
 * slug. So, we load a list of menus, iterate over them and get the id of the menu
 * that has as slug the slug passed and then make a second request to get the desired menu
 */
const getMenu = () => {
  return new Promise((resolve) => {
    const resource = {
      'ID': 17,
      'name': 'primary_menu',
      'slug': 'primary_menu',
      'description': '',
      'count': 34,
      'items': [{
        'title': '\u2665 Donate',
        'url': 'https://openrouteservice.org/donations/',
        'object': 'page',
        'object_slug': 'donations',
        'type': 'post_type',
      }, {
        'title': 'Services',
        'url': 'https://openrouteservice.org/services/',
        'object': 'page',
        'object_slug': 'services',
        'type': 'post_type',
      }, {
        'title': 'Tools',
        'url': '',
        'object_slug': 'maps',
        'children': [{
          'title': 'Disaster Maps',
          'url': 'https://disaster.openrouteservice.org',
          'object_slug': 'disaster-maps',
        }, {
          'title': 'Maps Client',
          'url': 'https://maps.openrouteservice.org/',
          'object_slug': 'beta-map',
        }, {
          'title': 'Classic Maps Client',
          'url': 'https://classic-maps.openrouteservice.org',
          'object_slug': 'maps-2',
        }, {
          'title': 'QGIS Plugin',
          'url': 'https://github.com/GIScience/orstools-qgis-plugin',
          'object_slug': 'qgis-plugin',
        }, {
          'title': 'Python SDK',
          'url': 'https://github.com/GIScience/openrouteservice-py',
          'object_slug': 'python-sdk',
        }, {
          'title': 'JavaScript SDK',
          'url': 'https://github.com/GIScience/openrouteservice-js',
          'object_slug': 'javascript-sdk',
        }, {
          'title': 'R SDK',
          'url': 'https://github.com/GIScience/openrouteservice-r',
          'object_slug': 'r-sdk',
        }]
      }, {
        'title': 'Examples',
        'url': 'https://github.com/GIScience/openrouteservice-examples/',
        'object_slug': 'examples',
        'children': [{
          'title': 'Leverage fleet scheduling for disaster response',
          'url': 'https://openrouteservice.org/disaster-optimization/',
          'object_slug': 'leverage-fleet-scheduling-for-disaster-response',
        }, {
          'title': 'Avoid Flooded Areas',
          'url': 'https://openrouteservice.org/example-avoid-flooded-areas-with-ors',
          'object_slug': 'avoid-flooded-areas',
        }, {
          'title': 'Healthcare Access Analysis',
          'url': 'https://openrouteservice.org/example-healthcare-access-analysis-with-ors',
          'object_slug': 'healthcare-access-analysis',
        }, {
          'title': 'Optimize your Pubcrawl \u2665',
          'url': 'https://openrouteservice.org/example-optimize-pub-crawl-with-ors/',
          'object_slug': 'optimize-your-pubcrawl',
        }, {
          'title': 'Avoid construction sites for routing',
          'url': 'https://openrouteservice.org/example-avoid-obstacles-while-routing/',
          'object_slug': 'avoid-construction-sites-for-routing',
        }, {
          'title': 'Dieselgate: avoid banned streets in Berlin 2019',
          'url': 'https://openrouteservice.org/dieselgate-avoid-berlin-banned-diesel-streets/',
          'object_slug': 'dieselgate-avoid-banned-streets-in-berlin-2019',
        }, {
          'title': 'Apartment search with openrouteservice',
          'url': 'https://openrouteservice.org/example-apartment-search-with-ors/',
          'object_slug': 'apartment-search-with-ors',
        }, {
          'title': 'Centrality analysis using export endpoint',
          'url': 'https://openrouteservice.org/centrality-analysis-using-export-endpoint',
          'object_slug': 'centrality-analysis-using-export-endpoint',
        }]
      }, {
        'title': 'Ask us!',
        'url': 'https://ask.openrouteservice.org',
        'object_slug': 'forum',
      }, {
        'title': 'Plans',
        'url': 'https://openrouteservice.org/plans/',
        'object': 'page',
        'object_slug': 'plans',
        'type': 'post_type',
      }, {
        'title': 'Jobs',
        'url': 'https://heigit.org/join-the-team/',
        'object_slug': 'jobs',
      }, {
        'title': 'API Playground',
        'url': 'https://openrouteservice.org/dev/#/api-docs',
        'object_slug': 'apis',
        'children': [{
          'title': 'Directions',
          'url': 'https://openrouteservice.org/dev/#/api-docs/v2/directions/%7Bprofile%7D/get',
          'object_slug': 'openrouteservice-api',
        }, {
          'title': 'Export',
          'url': 'https://openrouteservice.org/dev/#/api-docs/v2/export/%7Bprofile%7D/post',
          'object_slug': 'export',
        }, {
          'title': 'Isochrones',
          'url': 'https://openrouteservice.org/dev/#/api-docs/v2/isochrones/%7Bprofile%7D/post',
          'object_slug': 'isochrones',
        }, {
          'title': 'Matrix',
          'url': 'https://openrouteservice.org/dev/#/api-docs/v2/matrix/%7Bprofile%7D/post',
          'object_slug': 'matrix',
        }, {
          'title': 'Snap',
          'url': 'https://openrouteservice.org/dev/#/api-docs/v2/snap/%7Bprofile%7D/post',
          'object_slug': 'snap',
        }, {
          'title': 'Geocode',
          'url': 'https://openrouteservice.org/dev/#/api-docs/geocode',
          'object_slug': 'geocoding',
        }, {
          'title': 'Pois',
          'url': 'https://openrouteservice.org/dev/#/api-docs/pois/post',
          'object_slug': 'pois',
        }, {
          'title': 'Elevation',
          'url': 'https://openrouteservice.org/dev/#/api-docs/elevation',
          'object_slug': 'elevation',
        }, {
          'title': 'Optimization',
          'url': 'https://openrouteservice.org/dev/#/api-docs/optimization',
          'object_slug': 'optimization',
        }]
      }]
    }
    resolve(parseMenu(resource.items))
  })
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
 * @param to router to object
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
 * @param to router to object
 */
const setMenuActiveStatus = (menuItems, to) => {
  Vue.lodash.each(menuItems, (item) => {
    setItemActiveStatus(item, to)
  })
}

/**
 * Replace a menu item by a replacement according its ending href string
 * @param {*} menu
 * @param {string} itemEnding
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
 * @param {string} itemStart
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
  setMenuActiveStatus
}

export default MenuManager
