import AppRouteData from '@/models/app-route-data'
import GeoUtils from '@/support/geo-utils'
import Place from '@/models/place'
import store from '@/store/store'
import utils from '@/support/utils'
import RouteUtils from '@/support/route-utils'
import appConfig from '@/config'

/**
 * PlaceMode class
 */
class PlaceMode {
  buildAppRouteData (places, options = {}) {
    let appRouteData = store.getters.appRouteData || new AppRouteData()
    appRouteData.places = places

    if (appRouteData.places.length > 0) {
      // when we are in single place mode, there are place properties that
      // must be copied to the appRouteData.options. The list of properties
      // that must be copied to options are defined at @/resources/constants
      // layer', 'country'
      appRouteData.options['layer'] = appRouteData.places[0].properties['layer'] || appRouteData.options['layer']
      appRouteData.options['country'] = appRouteData.places[0].properties['country'] || appRouteData.options['country']

      // Update the zoom acording the place type/layer
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
      let place = appRouteData.places[0]
      let name = place.placeName ? place.placeName.replace(/, /g, ',') : ''

      // Transform the coordinates into a comma separated value (easier to put in the url)
      let lngLatStr = place.isEmpty() ? '' : `${place.lng},${place.lat}`

      options = JSON.stringify(options)

      let data = appConfig.useCompressedUrlData ? utils.compressTxt(options) : options

      // Create the route object
      let params = {placeName: name, coordinates: lngLatStr, data: data}
      let route = { name: 'MapPlace', params: params }
      return route
    } else {
      store.commit('cleanMap', true)
      let route = {name: 'Maps'}
      return route
    }
  }

  /**
   * Decode single place path
   * @param {*} currentRoute
   * @returns {AppRouteData}
   */
  decodePath = (currentRoute) => {
    let appRouteData = new AppRouteData()
    let data = RouteUtils.decodeDataParam(currentRoute.params.data)
    if (data && data !== '') {
      appRouteData.options = data
    }

    if (currentRoute.params.coordinates) {
      let lnglat = currentRoute.params.coordinates.split(',')

      // Get and format the place name
      let placeName = currentRoute.params.placeName.replace(/, /g, ',').replace(',', ', ')
      // Recreate the place object
      let place = new Place(lnglat[0], lnglat[1], placeName, {properties: data})

      // Add the single place to the route data
      appRouteData.places.push(place)
    }
    // Return the object
    return appRouteData
  }
}
// export the class
export default PlaceMode
