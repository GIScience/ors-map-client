/* eslint-disable no-undef */
import resolver from '@/support/routes-resolver'
import appConfig from '@/config/app-config'
import AppLoader from '@/app-loader'
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const history = appConfig.urlMode === 'history'
  ? createWebHistory(resolver.homeUrl())
  : createWebHashHistory(resolver.homeUrl())

const router = createRouter({
  history,
  // We use the feature-by-folder strategy, so
  // each component declares its routes and
  // these routes are loaded below, with the loader helper
  routes: []
})

router.beforeEach((to, from, next) => {
  AppLoader.checkAndSetEmbedState().then(() => {
    next()
  })
})



// load and get all routes from components with name following the pattern *.route.js
const pageRoutes = import.meta.glob('@/pages/**.route.js', { eager: true})

// load and get all routes from plugins with name following the pattern *.route.js
const pluginRoutes = import.meta.glob('@/plugins/**.route.js', { eager: true})

let routeFiles = [ ...Object.values(pageRoutes), ...Object.values(pluginRoutes)]

routeFiles.forEach(routeFile => {
  if (Array.isArray(routeFile)) {
    routeFile.forEach(route => {
      router.addRoute(route)
    })
  } else {
    //register route from default export
    routeFile.default.forEach(route => {
      router.addRoute(route)
    })
  }
})

export default router
