
import OrsParamsParser from '@/support/map-data-services/ors-params-parser'
import OrsMapFilters from '@/config/ors-map-filters'
import AppLoader from '@/app-loader'
import utils from '@/support/utils'
import store from '@/store/store'
import lodash from 'lodash'

// Modes
import directionsMode from './strategies/directions-mode'
import roundtripMode from './strategies/roundtrip-mode'
import searchMode from './strategies/search-mode'
import placeMode from './strategies/place-mode'
import isochronesMode from './strategies/isochrones-mode'

/**
 * AppState
 */
class AppMode {
  /**
   * Constructor
   * @param {String} modeTo - constants.modes
   */
  constructor (modeTo) {
    this.modeTo = modeTo
    const modes = { directionsMode, placeMode, roundtripMode, searchMode, isochronesMode }

    const mode = `${this.modeTo}Mode`
    this.targetMode = new modes[mode]()
  }

  /**
   * Get a route object based on the places given and the app mode
   * @param {Array} places
   * @returns {Object} - {name: ..., params: ...}
   */
  getRoute (places = null,  options = {}) {
    places =  places || store.getters.appRouteData.places
    const newAppRouteData = this.getAppRouteData(places,  this.getRouteOptions(options))
    store.commit('appRouteData', newAppRouteData)
    const route = this.targetMode.getRoute(newAppRouteData)
    AppLoader.getInstance().appHooks.run('appModeRouteReady', route)
    return route
  }

  /**
   * Build an appRouteData object based on the places given
   * @param {*} places
   * @returns {AppRouteData} newAppRouteData
   */
  getAppRouteData (places, options = {}) {
    // We are about to build a new appRouteData using the passed places
    // and the values stored in the @see ors-map-filter object in memory.
    // We have identified that in this case we should not use the previous
    // options in the old appRouteData and pass it as a second parameter
    // for the method below
    const newAppRouteData = this.targetMode.buildAppRouteData(places, options)
    newAppRouteData.options = lodash(newAppRouteData.options).omitBy(lodash.isUndefined).omitBy(lodash.isNull).value()
    return newAppRouteData
  }

  /**
   * Decode app mode path from current route
   * @param {*} currentRoute
   * @returns {AppRouteData} appRouteData
   */
  static decodePath (currentRoute) {
    // return appRouteData
    const appMode = new AppMode(store.getters.mode)
    const appRouteData = appMode.targetMode.decodePath(currentRoute)
    OrsParamsParser.parseOptions(OrsMapFilters, appRouteData.options)
    return appRouteData
  }

  /**
   * Run the afterGetRouteOptions hook and return the options
   * @param {*} options
   * @returns {*} options
   */
  getRouteOptions = (options) => {
    options = utils.merge(store.getters.appRouteData.options, options)
    AppLoader.getInstance().appHooks.run('afterGetRouteOptions', options)
    return options
  }
}
// export the class
export default AppMode
