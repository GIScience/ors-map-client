
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

    let mode = `${this.modeTo}Mode`
    this.targetMode = new modes[mode]()
  }
  /**
   * Get a route object based on the places given and the app mode
   * @param {*} places
   * @returns {Object} - {name: ..., params: ...}
   */
  getRoute (places) {
    let newAppRouteData = this.getAppRouteData(places)
    store.commit('appRouteData', newAppRouteData)

    let options = this.getRouteOptions(newAppRouteData.options)
    var route = this.targetMode.getRoute(newAppRouteData, options)
    return route
  }

  /**
   * Build an appRouteData object based on the places given
   * @param {*} places
   * @returns {AppRouteData} newAppRouteData
   */
  getAppRouteData (places) {
    // let options = this.getRouteOptions(store.getters.appRouteData.options)
    // let newAppRouteData = this.targetMode.buildAppRouteData(places, options)

    // We are about to build a new appRouteData using the passed places
    // and the values stored in the @see ors-map-filter object in memory.
    // We have identified that in this case we should not use the previous
    // options in the old appRouteData and pass it as a second parameter
    // for the method below
    let newAppRouteData = this.targetMode.buildAppRouteData(places)
    return newAppRouteData
  }

  /**
   * Decode app mode path from current route
   * @param {*} currentRoute
   * @returns {AppRouteData} appRouteData
   */
  static decodePath (currentRoute) {
    // return appRouteData
    let appMode = new AppMode(store.getters.mode)
    let appRouteData = appMode.targetMode.decodePath(currentRoute)
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
    let orsFilters = OrsMapFilters
    let validOptions = {}
    for (let propName in options) {
      let foundInFilters = false
      for (let filterKey in orsFilters) {
        let filter = orsFilters[filterKey]
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
