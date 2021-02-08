import Vue from 'vue'
import Router from 'vue-router'
import loader from '@/support/loader'
import resolver from '@/support/routes-resolver'
import appConfig from '@/config/app-config'
import AppLoader from '@/app-loader'

Vue.use(Router)

const router = new Router({
  mode: appConfig.urlMode,
  base: resolver.homeUrl(),
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
const pageRoutes = loader.load(require.context('@/pages/', true, /\.route\.js$/))

// load and get all routes from plugins with name following the pattern *.route.js
const pluginRoutes = loader.load(require.context('@/plugins/', true, /\.route\.js$/))

let routeFiles = pageRoutes.concat(pluginRoutes)

routeFiles.forEach(routeFile => {
  if (Array.isArray(routeFile)) {
    router.addRoutes(routeFile)
  } else {
    router.addRoute(routeFile)
  }
})

export default router
