import AppRouteData from '@/models/app-route-data'
import GeoUtils from '@/support/geo-utils'
import Place from '@/models/place'
import store from '@/store/store'

/**
 * SearchMode class
 */
class SearchMode {
  // eslint-disable-next-line no-unused-vars
  buildAppRouteData (places, options) {
    const appRouteData = store.getters.appRouteData || new AppRouteData()
    appRouteData.places = places
    appRouteData.options.search = true
    appRouteData.options.center = store.getters.mapCenter
    return appRouteData
  }

  /**
   * Build a directions route
   * @param {*} appRouteData
   * @returns {Object} route like {name: 'MapDirections', params: {...} }
   */
  // eslint-disable-next-line no-unused-vars
  getRoute = (appRouteData) => {
    let name = ''
    if (appRouteData.places.length > 0) {
      const place = appRouteData.places[0]
      name = place.placeName ? place.placeName.replace(/, /g, ',') : ''
    }
    // Create the route object
    const center = `${appRouteData.options.center.lat},${appRouteData.options.center.lng}`
    const params = { term: name, center: center, zoom: appRouteData.options.zoom}
    const route = { name: 'MapSearch', params: params }
    return route
  }

  /**
   * Decode single place path
   * @param {*} currentRoute
   * @returns {AppRouteData}
   */
  decodePath = (currentRoute) => {
    const appRouteData = new AppRouteData()
    appRouteData.options.search = true

    const coords = currentRoute.params.center.split(',')
    const latLng = GeoUtils.buildLatLong(coords[0], coords[1])
    appRouteData.options.center = latLng
    appRouteData.options.zoom = Number(currentRoute.params.zoom)

    // Get and format the place name
    const placeName = currentRoute.params.term.replace(/, /g, ',').replace(',', ', ')
    // Recreate the place object
    const place = new Place(0, 0, placeName, { resolve: true })

    // Add the single place to the route data
    appRouteData.places.push(place)

    // Return the object
    return appRouteData
  }
}
// export the class
export default SearchMode
