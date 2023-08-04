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
  buildAppRouteData (places) {
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
      if (!appRouteData.options.zoom) {
        appRouteData.options.zoom = GeoUtils.zoomLevelByLayer(appRouteData.options.layer)
      }
    }
    return appRouteData
  }

  /**
   * Build a place route
   * @param {*} appRouteData
   * @param {*} options
   * @returns {Object} route like {name: 'MapDirections', params: {...} }
   */
  getRoute = (appRouteData) => {
    if (appRouteData.places.length > 0) {
      const place = appRouteData.places[0]
      const name = place.placeName ? place.placeName.replace(/, /g, ',') : ''

      // Transform the coordinates into a comma separated value (easier to put in the url)
      let lngLatStr = place.isEmpty() ? '' : `${place.lng},${place.lat}`
      if (appRouteData.options.zoom) {
        lngLatStr = `${lngLatStr},${appRouteData.options.zoom}`
      }



      // Create the route object
      const params = { coordinates: lngLatStr}
      let route = { name: 'MapLocation' }

      if (name && name !== 'null' && Object.keys(appRouteData.options).length > 1) {
        params.placeName= name
        route.name = 'MapPlace'
        let options = JSON.stringify(appRouteData.options)
        params.data = store.getters.mapSettings.compressDataUrlSegment ? utils.compressTxt(options) : options
      }
      route.params = params
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
      const coordinates = currentRoute.params.coordinates.split(',')
      appRouteData.options.center =  GeoUtils.buildLatLong(coordinates[1], coordinates[0])
      if (coordinates.length > 2) {
        appRouteData.options.zoom = Number(coordinates[2])
      }

      // Get and format the place name
      if (currentRoute.params.placeName) {
        const placeName = currentRoute.params.placeName.replace(/, /g, ',').replace(',', ', ')
        if (placeName && placeName !== 'null') {
          // Recreate the place object
          const place = new Place(coordinates[0], coordinates[1], placeName, { properties: data })
          // Add the single place to the route data
          appRouteData.places.push(place)
        }
      }
    }
    // Return the object
    AppLoader.getInstance().appHooks.run('afterPlacePathDecoded', appRouteData)
    return appRouteData
  }
}
// export the class
export default PlaceMode
