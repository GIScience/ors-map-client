
import OrsParamsParser from '@/support/map-data-services/ors-params-parser'
import OrsMapFilters from '@/resources/ors-map-filters'
import store from '@/store/store'

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
   * Contructor
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
   * @param {*} places
   * @returns {Object} - {name: ..., params: ...}
   */
  getRoute (places) {
    const newAppRouteData = this.getAppRouteData(places)
    store.commit('appRouteData', newAppRouteData)

    const options = this.getRouteOptions(newAppRouteData.options)
    var route = this.targetMode.getRoute(newAppRouteData, options)
    return route
  }

  /**
   * Build an appRouteData object based on the places given
   * @param {*} places
   * @returns {AppRouteData} newAppRouteData
   */
  getAppRouteData (places) {
    const options = this.getRouteOptions(store.getters.appRouteData.options)
    const newAppRouteData = this.targetMode.buildAppRouteData(places, options)
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
   * Extract valid options/filters for a request
   * checking if each prop is in a list of valid parameters
   * or the if is present in the OrsMapFilters @see '@/resources/ors-map-filters'
   * @param {*} options
   * @uses OrsMapFilters @see '@/resources/ors-map-filters'
   * @returns {*} validOptions
   */
  getRouteOptions = (options) => {
    const orsFilters = OrsMapFilters
    const validOptions = {}
    for (const propName in options) {
      let foundInFilters = false
      for (const filterKey in orsFilters) {
        const filter = orsFilters[filterKey]
        if (filter.name === propName) {
          validOptions[propName] = options[propName]
          foundInFilters = true
        }
      }
      if (!foundInFilters) {
        validOptions[propName] = options[propName]
      }
    }
    return validOptions
  }
}
// export the class
export default AppMode
