import defaultMapSettings from '@/config/default-map-settings'
import MapView from '@/fragments/map-view/MapView.vue'
import MapViewData from '@/models/map-view-data'
import PreparedVue from '@/common/prepared-vue.js'
import constants from '@/resources/constants'
import I18nBuilder from '@/i18n/i18n-builder'
import appConfig from '@/config/app-config'
import AppLoader from '@/app-loader'
import store from '@/store/store'

describe('Map rendering', () => {
  it('should render map-view component', async (done) => {
    await new AppLoader().fetchApiInitialData()
    const MapConstructor = PreparedVue.extend(MapView)
    let props = { 
      initialZoom: appConfig.initialZoomLevel, 
      avoidPolygons: [],  
      mapViewData: new MapViewData(),
      center: defaultMapSettings.mapCenter,
      showPopups: false,
      height: 900,
      fitBounds: true,
      showControls: true,
      shrunk: false,
      mode: constants.modes.place,
      supportsDrawingTool: true,
      routingProfileIcon: null
    }      
      
    let i18n = I18nBuilder.build()
    var mapInstance = new MapConstructor({ propsData: props, i18n: i18n, store: store})
    const vm = mapInstance.$mount()  
    
    let mapView = vm.$el.querySelector('#map-view')
    expect(mapView).toBeDefined()
    expect(mapView).not.toBeNull()
    done()
  })
})
