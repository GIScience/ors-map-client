import Vue from 'vue'
import Router from 'vue-router'
import loader from '@/support/loader'
import resolver from '@/support/routes-resolver'
import AppLoader from '@/app-loader'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
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

pageRoutes.forEach(pageRoute => {
  if (Array.isArray(pageRoute)) {
    router.addRoutes(pageRoute)
  } else {
    router.addRoute(pageRoute)
  }
})

export default router
