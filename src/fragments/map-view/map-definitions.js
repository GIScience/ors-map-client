import appConfig from '@/config/app-config'
import AppLoader from '@/app-loader'
import store from '@/store/store'

const mapDefinitions = {
  /**
   * Reorder the values of an array of coordinates switching the position of lat and long of each coordinate
   * @param {*} coordinatesArr
   * @returns {Array} of reordered coordinates
   */
  polylineMeasureOptions: (polylineMeasureTranslations) => {
    // eslint-disable-block no-multi-spaces
    const options = {
      // language options
      ...polylineMeasureTranslations,
      // other options
      position: 'topleft', // Position to show the control. Values: 'topright', 'topleft', 'bottomright', 'bottomleft'
      clearMeasurementsOnStop: true, // Clear all the measurements when the control is unselected
      showBearings: true, // Whether bearings are displayed within the tooltips
      showClearControl: false, // Show a control to clear all the measurements
      clearControlClasses: [], // Classes to apply to clear control button
      showUnitControl: true, // Show a control to change the units of measurements
      distanceShowSameUnit: true, // Keep same unit in tooltips in case of distance less than 1 km/mi/nm
      tempLine: { // Styling settings for the temporary dashed line
        color: '#00f', // Dashed line color
        weight: 5 // Dashed line weight
      },
      fixedLine: { // Styling for the solid line
        color: '#00f', // Solid line color
        weight: 5 // Solid line weight
      },
      startCircle: { // Style settings for circle marker indicating the starting point of the polyline
        color: '#000', // Color of the border of the circle
        weight: 1, // Weight of the circle
        fillColor: '#4caf50', // Fill color of the circle
        fillOpacity: 1, // Fill opacity of the circle
        radius: 6 // Radius of the circle
      },
      intermedCircle: { // Style settings for all circle markers between startCircle and endCircle
        color: '#000', // Color of the border of the circle
        weight: 2, // Weight of the circle
        fillColor: '#2196f3', // Fill color of the circle
        fillOpacity: 1, // Fill opacity of the circle
        radius: 6 // Radius of the circle
      },
      currentCircle: { // Style settings for circle marker indicating the latest point of the polyline during drawing a line
        color: '#000', // Color of the border of the circle
        weight: 2, // Weight of the circle
        fillColor: '#000', // Fill color of the circle
        fillOpacity: 1, // Fill opacity of the circle
        radius: 6 // Radius of the circle
      },
      endCircle: { // Style settings for circle marker indicating the last point of the polyline
        color: '#000', // Color of the border of the circle
        weight: 2, // Weight of the circle
        fillColor: '#f44336', // Fill color of the circle
        fillOpacity: 1, // Fill opacity of the circle
        radius: 6 // Radius of the circle
      }
    }
    return options
  },
  /**
   * Build the draw options object
   * @param {*} cantIntersectMsg
   */
  drawOptions (cantIntersectMsg) {
    const options = {
      position: 'topleft',
      draw: {
        polyline: false,
        rectangle: true,
        marker: false,
        circlemarker: false,
        circle: false, // circle is not supported as an avoid area
        polygon: {
          allowIntersection: false, // Restricts shapes to simple polygons
          drawError: {
            color: '#e1e100', // Color the shape will turn when intersects
            message: cantIntersectMsg // Message that will show when intersect
          },
          shapeOptions: {
            color: 'blue'
          },
          showArea: true,
          showLength: true
        }
      }
    }
    return options
  },

  /**
   * Build map providers array
   */
  getProviders () {
    const defaultTilesProvider = store.getters.mapSettings.defaultTilesProvider
    let providers = appConfig.mapTileProviders

    // Add custom tile service if defined in settings
    const customTileProviderUrl = store.getters.mapSettings.customTileProviderUrl
    let vueInstance = AppLoader.getInstance()
    if (customTileProviderUrl) {
      const customTileService = [
        {
          name: vueInstance.$t('global.custom'),
          id: 'custom',
          visible: false,
          attribution: vueInstance.$t('mapView.customTileProvider'),
          url: customTileProviderUrl.toString(),
          maxZoom: appConfig.initialMapMaxZoom
        }
      ]
      providers = providers.concat(customTileService)
    }
    // Se the tile provider that is visible by default
    for (let key in providers) {
      providers[key].visible = providers[key].id === defaultTilesProvider
    }
    return providers
  },
  getOverlayerProviders () {
    let providers = []
    // Add custom over layer tile service if defined in settings
    const customOverlayerTileProviderUrl = store.getters.mapSettings.customOverlayerTileProviderUrl
    let vueInstance = AppLoader.getInstance()
    if (customOverlayerTileProviderUrl) {
      const overlayerTileService =
      {
        name: vueInstance.$t('global.customOverlayer'),
        id: 'custom-overlayer',
        visible: true,
        attribution: vueInstance.$t('mapView.customTileProvider'),
        url: customOverlayerTileProviderUrl.toString()
      }

      providers.push(overlayerTileService)
    }
    return providers
  },
  getWmsOverlayerTileProviders () {
    const providers = appConfig.wpsOverlayerTileProviders || []
    return providers
  }
}
export default mapDefinitions
