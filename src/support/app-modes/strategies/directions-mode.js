import OrsParamsParser from '@/support/map-data-services/ors-params-parser'
import OrsMapFilters from '@/config/ors-map-filters'
import AppRouteData from '@/models/app-route-data'
import constants from '@/resources/constants'
import RouteUtils from '@/support/route-utils'
import GeoUtils from '@/support/geo-utils'
import appConfig from '@/config/app-config'
import AppLoader from '@/app-loader'
import Utils from '@/support/utils'
import Place from '@/models/place'
import store from '@/store/store'

/**
 * DirectionsMode class
 */
class DirectionsMode {
  buildAppRouteData (places) {

    const appRouteData = store.getters.appRouteData || new AppRouteData()
    appRouteData.places = places

    // All directions request filters will be extracted from the OrsMapFilters
    // object that is an in memory object used by all the filters
    // rendered as model in its respective key
    let options = {zoom: appRouteData.options.zoom}
    OrsParamsParser.setFilters(options, OrsMapFilters, constants.services.directions)
    appRouteData.options = options
    let layer = appRouteData.options.layer

    // If only one place is defined, then
    // define the zoom level by the place layer
    let filledPlaces = Place.getFilledPlaces(appRouteData.places)
    if (filledPlaces.length === 1) {
      layer = filledPlaces[0].properties.layer
    }
    if (layer) {
      appRouteData.options.zoom = GeoUtils.zoomLevelByLayer(layer)
    }
    if (!appRouteData.options.zoom) {
      appRouteData.options.zoom = appConfig.initialMapMaxZoom
    }
    return appRouteData
  }

  /**
   * Build a directions route
   * @param {*} appRouteData
   * @returns {Object} route like {name: 'MapDirections', params: {...} }
   */
  getRoute = (appRouteData, options = null) => {
    options = options || appRouteData.options
    // Get only the valid params for directions
    const validOptions = {}
    const validParams = ['profile', 'preference']
    for (const key in validParams) {
      const paramName = validParams[key]
      if (options[paramName]) {
        validOptions[paramName] = options[paramName]
      }
    }
    const params = RouteUtils.buildRouteParams(appRouteData, validOptions)
    // Build the route object
    const route = { name: 'MapDirections', params: params }
    return route
  }

  /**
   * Decode single place path
   * @param {*} currentRoute
   * @param {Object} data
   * @returns {AppRouteData}
   */
  decodePath = (currentRoute) => {
    const data = RouteUtils.decodeDataParam(currentRoute.params.data)
    const appRouteData = new AppRouteData()

    // Get coordinates and options from the param
    appRouteData.options = data.options

    // In the 'directions' mode, the options parameter may contain an options object
    // that is expected to be used as the ORS API request options (avoid_polygons, avoid_features etc.)
    // They are stringified in the url, we try to parse them back to an object
    if (appRouteData.options && appRouteData.options.options) {
      appRouteData.options.options = Utils.tryParseJson(appRouteData.options.options) || appRouteData.options.options
    }

    appRouteData.places = RouteUtils.getRoutePlaces(currentRoute)

    // If there are direct waypoints (at least 2)
    // add their indexes to the options
    if (appRouteData.options.directPlaces) {
      appRouteData.options.directPlaces.forEach(index => {
        appRouteData.places[index].direct = true
      })
    }

    // If there are poi places, mark them as POIs
    if (appRouteData.options.poiPlaces) {
      appRouteData.options.poiPlaces.forEach(index => {
        appRouteData.places[index].isPoi = true
      })
    }

    AppLoader.getInstance().appHooks.run('afterDirectionsPathDecoded', appRouteData)
    return appRouteData
  }
}
// export the class
export default DirectionsMode
