import OrsParamsParser from '@/support/map-data-services/ors-params-parser'
import OrsMapFilters from '@/config/ors-map-filters'
import AppRouteData from '@/models/app-route-data'
import RouteUtils from '@/support/route-utils'
import constants from '@/resources/constants'
import appConfig from '@/config/app-config'
import AppLoader from '@/app-loader'
import Utils from '@/support/utils'
import store from '@/store/store'

/**
 * App mode for fleet scheduling using the optimization endpoint
 */
class OptimizationMode {
  buildAppRouteData (places, options = {}) {
    const appRouteData = store.getters.appRouteData || new AppRouteData()
    appRouteData.places = places

    OrsParamsParser.setFilters(options, OrsMapFilters, constants.services.optimization)
    appRouteData.options = options
    appRouteData.options.zoom = appConfig.initialMapMaxZoom
    return appRouteData
  }

  /**
   * Build an optimization route
   * @param {*} appRouteData
   * @returns {Object} route like {name: 'MapDirections', params: {...} }
   */
  getRoute = (appRouteData, options = null) => {
    options = options || appRouteData.options
    const params = RouteUtils.buildRouteParams(appRouteData, options)
    // Build and return the route object
    const route = { name: 'MapOptimization', params: params }
    return route
  }

  /**
   * Decode single place path
   * @param {*} currentRoute
   * @returns {AppRouteData}
   */
  decodePath = (currentRoute) => {
    const appRouteData = new AppRouteData()
    const data = RouteUtils.decodeDataParam(currentRoute.params.data)

    // Get coordinates and options from the param
    appRouteData.options = data.options

    // In the 'directions' mode, the options parameter may contain an options object
    // that is expected to be used as the ORS API request options (avoid_polygons, avoid_features etc.)
    // So, as they are stringified on the url, we try to parse them back to an object
    if (appRouteData.options && appRouteData.options.options) {
      appRouteData.options.options = Utils.tryParseJson(appRouteData.options.options) || appRouteData.options.options
    }

    appRouteData.places = RouteUtils.getRoutePlaces(currentRoute)
    AppLoader.getInstance().appHooks.run('afterOptimizationPathDecoded', appRouteData)
    return appRouteData
  }
}
// export the class
export default OptimizationMode
