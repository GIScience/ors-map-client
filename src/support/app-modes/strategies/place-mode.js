import AppRouteData from '@/models/app-route-data'
import RouteUtils from '@/support/route-utils'
import GeoUtils from '@/support/geo-utils'
import AppLoader from '@/app-loader'
import utils from '@/support/utils'
import Place from '@/models/place'
import store from '@/store/store'

/**
 * PlaceMode class
 */
class PlaceMode {
  // eslint-disable-next-line no-unused-vars
  buildAppRouteData (places, options = {}) {
    const appRouteData = store.getters.appRouteData || new AppRouteData()
    appRouteData.places = places

    if (appRouteData.places.length > 0) {
      // when we are in single place mode, there are place properties that
      // must be copied to the appRouteData.options. The list of properties
      // that must be copied to options are defined at @/resources/constants
      // layer', 'country'
      appRouteData.options.layer = appRouteData.places[0].properties.layer || appRouteData.options.layer
      appRouteData.options.country = appRouteData.places[0].properties.country || appRouteData.options.country

      // Update the zoom according to the place type/layer
      appRouteData.options.zoom = GeoUtils.zoomLevelByLayer(appRouteData.options.layer)
    }
    return appRouteData
  }

  /**
   * Build a place route
   * @param {*} appRouteData
   * @param {*} options
   * @returns {Object} route like {name: 'MapDirections', params: {...} }
   */
  getRoute = (appRouteData, options) => {
    if (appRouteData.places.length > 0) {
      const place = appRouteData.places[0]
      const name = place.placeName ? place.placeName.replace(/, /g, ',') : ''

      // Transform the coordinates into a comma separated value (easier to put in the url)
      const lngLatStr = place.isEmpty() ? '' : `${place.lng},${place.lat}`

      options = JSON.stringify(options)

      const data = store.getters.mapSettings.compressDataUrlSegment ? utils.compressTxt(options) : options

      // Create the route object
      const params = { placeName: name, coordinates: lngLatStr, data: data }
      const route = { name: 'MapPlace', params: params }
      return route
    } else {
      store.commit('cleanMap', true)
      const route = { name: 'Maps' }
      return route
    }
  }

  /**
   * Decode single place path
   * @param {*} currentRoute
   * @returns {AppRouteData}
   */
  decodePath = (currentRoute) => {
    const appRouteData = new AppRouteData()
    const data = RouteUtils.decodeDataParam(currentRoute.params.data)
    if (data && data !== '') {
      appRouteData.options = data
    }

    if (currentRoute.params.coordinates) {
      const lnglat = currentRoute.params.coordinates.split(',')

      // Get and format the place name
      const placeName = currentRoute.params.placeName.replace(/, /g, ',').replace(',', ', ')
      // Recreate the place object
      const place = new Place(lnglat[0], lnglat[1], placeName, { properties: data })

      // Add the single place to the route data
      appRouteData.places.push(place)
    }
    // Return the object
    AppLoader.getInstance().appHooks.run('afterPlacePathDecoded', appRouteData)
    return appRouteData
  }
}
// export the class
export default PlaceMode
