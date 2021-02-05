import Maps from '@/pages/maps/Maps'
import store from '@/store/store'
import RoutesResolver from '@/support/routes-resolver'
import constants from '@/resources/constants'
import RouteUtils from '@/support/route-utils'

const rootPath = RoutesResolver.homeUrl()
const placePath = RoutesResolver.place()
const directionsPath = RoutesResolver.directions()
const searchPath = RoutesResolver.search()
const isochronesPath = RoutesResolver.isochronesPath()
const embedParameters = '/:embed?/:locale?'

// Build the optional placesNames Path
var optionalplaceNamesPath = ''
for (let index = 2; index <= 15; index++) {
  optionalplaceNamesPath += `/:placeName${index}?`  
}

const mapRoutes = [
  {
    path: '/',
    name: 'Maps',
    component: Maps,
    beforeEnter: (to, from, next) => {
      // The root route is being matched only
      //  when a more specific route is being loaded (MapPlace, MapDirections ...)
      // As this was causing a weird redirection we had to tell vue router to
      // go the target route in this case
      const currentPath = location.hash.replace('#', '')
      // Only laod the root route if the cleanMap flag is true
      if (currentPath !== '' && currentPath !== '/' && currentPath !== rootPath && !store.getters.cleanMap) {
        // In case of loading root route, set the
        // default mode as place mode
        store.commit('mode', constants.modes.place)
        // Go to the child route
        next(currentPath)
      } else {
        // Otherwise load the root route
        next()
      }
    }
  },
  {
    path: `${placePath}:placeName/@:coordinates/data/:data${embedParameters}`,
    name: 'MapPlace',
    component: Maps,
    beforeEnter: (to, from, next) => {
      store.commit('mode', constants.modes.place)
      next()
    }
  },
  {
    // The maximum number of places/points of a route is 15. so, we can have 15 places more the data parameter that contains the coordinates for all the palces in que query encoded in base64 format
    // The minimum is one (becaue of round trip needs only one place)
    path: `${directionsPath}:placeName1${optionalplaceNamesPath}/data/:data${embedParameters}`,
    name: 'MapDirections',
    component: Maps,
    beforeEnter: (to, from, next) => {
      RouteUtils.setDirectionsModeBasedOnRoute(to)
      next()
    }
  },
  {
    path: `${searchPath}:term/@:center/z/:zoom${embedParameters}`,
    name: 'MapSearch',
    component: Maps,
    beforeEnter: (to, from, next) => {
      store.commit('mode', constants.modes.search)
      next()
    }
  },
  {
    path: `${isochronesPath}:placeName1${optionalplaceNamesPath}/data/:data${embedParameters}`,
    name: 'MapIsochrones',
    component: Maps,
    beforeEnter: (to, from, next) => {
      store.commit('mode', constants.modes.isochrones)
      next()
    }
  },
  {
    path: `${isochronesPath}`,
    name: 'MapIsochronesHome',
    component: Maps,
    beforeEnter: (to, from, next) => {
      store.commit('mode', constants.modes.isochrones)
      next()
    }
  },
  {
    path: '/settings',
    name: 'MapSettings',
    component: Maps,
    beforeEnter: (to, from, next) => {
      store.commit('mode', constants.modes.place)
      store.commit('openSettings', true)
      next()
    }
  },
  {
    path: '/about',
    name: 'MapAbout',
    component: Maps,
    beforeEnter: (to, from, next) => {
      store.commit('mode', constants.modes.place)
      store.commit('openAbout', true)
      next()
    }
  }
]

export default mapRoutes
