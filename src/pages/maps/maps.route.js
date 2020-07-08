import Maps from '@/pages/maps/Maps'
import store from '@/store/store'
import RoutesResolver from '@/support/routes-resolver'
import constants from '@/resources/constants'
import lodash from 'lodash'

let rootPath = RoutesResolver.homeUrl()
let placePath = RoutesResolver.place()
let directionsPath = RoutesResolver.directions()
let searchPath = RoutesResolver.search()
let isochronesPath = RoutesResolver.isochronesPath()

export default [
  {
    path: '/',
    name: 'Maps',
    component: Maps,
    beforeEnter: (to, from, next) => {
      // The root route is being matched only
      //  when a more specific route is being loaded (MapPlace, MapDirections ...)
      // As this was causing a weird redirection we had to tell vue router to
      // go the target route in this case
      let currentPath = location.hash.replace('#', '')
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
    path: `${placePath}:placeName/@:coordinates/data/:data`,
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
    path: `${directionsPath}:placeName1/:placeName2?/:placeName3?/:placeName4?/:placeName5?/:placeName6?/:placeName7?/:placeName8?/:placeName9?/:placeName10?/:placeName11?/:placeName12?/:placeName13?/:placeName14?/:placeName15?/data/:data`,
    name: 'MapDirections',
    component: Maps,
    beforeEnter: (to, from, next) => {
      var placeNameParams = lodash.pickBy(to.params, function (value, key) {
        return key.startsWith('placeName') && value !== undefined
      })
      let placeNameParamsAmount = Object.keys(placeNameParams).length
      let currentMode = placeNameParamsAmount === 1 ? constants.modes.roundTrip : constants.modes.directions
      store.commit('mode', currentMode)
      next()
    }
  },
  {
    path: `${searchPath}:term/@:center`,
    name: 'MapSearch',
    component: Maps,
    beforeEnter: (to, from, next) => {
      store.commit('mode', constants.modes.search)
      next()
    }
  },
  {
    path: `${isochronesPath}:placeName1/:placeName2?/:placeName3?/:placeName4?/:placeName5?/:placeName6?/:placeName7?/:placeName8?/:placeName9?/:placeName10?/:placeName11?/:placeName12?/:placeName13?/:placeName14?/:placeName15?/data/:data`,
    name: 'MapIsochrones',
    component: Maps,
    beforeEnter: (to, from, next) => {
      store.commit('mode', constants.modes.isochrones)
      next()
    }
  },
  {
    path: `${isochronesPath}`,
    name: 'MapIsochrones',
    component: Maps,
    beforeEnter: (to, from, next) => {
      store.commit('mode', constants.modes.isochrones)
      next()
    }
  },
  {
    path: `/settings`,
    name: 'MapSettings',
    component: Maps,
    beforeEnter: (to, from, next) => {
      store.commit('mode', constants.modes.place)
      store.commit('openSettings', true)
      next()
    }
  },
  {
    path: `/about`,
    name: 'MapAbout',
    component: Maps,
    beforeEnter: (to, from, next) => {
      store.commit('mode', constants.modes.place)
      store.commit('openAbout', true)
      next()
    }
  }
]
