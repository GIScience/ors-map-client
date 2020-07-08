import OrsParamsParser from '@/support/map-data-services/ors-params-parser'
import AppRouteData from '@/models/app-route-data'
import OrsMapFilters from '@/resources/ors-map-filters'
import constants from '@/resources/constants'
import store from '@/store/store'
import Utils from '@/support/utils'
import RouteUtils from '@/support/route-utils'

/**
 * RoundTripMode class
 */
class RoundTripMode {
  buildAppRouteData (places, options = {}) {
    let appRouteData = store.getters.appRouteData || new AppRouteData()
    appRouteData.places = places

    // The round_trip filter will be extracted from the OrsMapFilters
    // object that is an in memory object used by all the filters
    // rendered as model in in its respective key
    OrsParamsParser.addFilters(options, OrsMapFilters, constants.services.directions)
    appRouteData.options = options
    appRouteData.options.zoom = constants.initialMapMaxZoom
    return appRouteData
  }

  /**
   * Build a directions route
   * @param {*} appRouteData
   * @returns {Object} route like {name: 'MapDirections', params: {...} }
   */
  getRoute = (appRouteData, options) => {
    let params = RouteUtils.buildRouteParams(appRouteData, options)
    // Build and return the route object
    let route = { name: 'MapDirections', params: params }
    return route
  }

  /**
   * Decode single place path
   * @param {*} currentRoute
   * @returns {AppRouteData}
   */
  decodePath = (currentRoute) => {
    let appRouteData = new AppRouteData()
    let data = RouteUtils.decodeDataParam(currentRoute.params.data)

    // Get coordinates and options from the param
    appRouteData.options = data.options

    // In the directions mode, the options parameter may contains an options object
    // that is expected to be used as the ORS API request options (avoid_polygons, avoid_features etc)
    // So, as they are stringfied on the url, we try to parse them to convert them back to an object
    if (appRouteData.options.options) {
      appRouteData.options.options = Utils.tryParseJson(appRouteData.options.options) || appRouteData.options.options
    }

    // Get the collection of coordinates from the decoded data param object
    appRouteData.places = RouteUtils.getRoutePlaces(currentRoute)
    return appRouteData
  }
}
// export the class
export default RoundTripMode
