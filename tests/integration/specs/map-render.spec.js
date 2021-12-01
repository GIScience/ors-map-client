import mapViewDataTemplates from '../mockups/map-view-data.js'
import MapView from '@/fragments/map-view/MapView.vue'
import MapViewProps from '../mockups/map-view-props.js'
import PreparedVue from '@/common/prepared-vue.js'
import I18nBuilder from '@/i18n/i18n-builder'
import AppLoader from '@/app-loader'
import store from '@/store/store'

describe('Map rendering', () => {
  it('should render map-view with single place', async (done) => {
    await new AppLoader().fetchApiInitialData()
    const MapConstructor = PreparedVue.extend(MapView)
    let props = {...MapViewProps, ...{mapViewData: mapViewDataTemplates.singlePlace }}
      
    let i18n = I18nBuilder.build()
    var mapInstance = new MapConstructor({ propsData: props, i18n: i18n, store: store})
    const vm = mapInstance.$mount()  
    
    let mapView = vm.$el.querySelector('#map-view')
    expect(mapView).toBeDefined()
    expect(mapView).not.toBeNull()
    done()
  })
  it('should render map-view with place search results', async (done) => {
    await new AppLoader().fetchApiInitialData()
    const MapConstructor = PreparedVue.extend(MapView)
    let props = {...MapViewProps, ...{mapViewData: mapViewDataTemplates.placeSearchResults }}   
      
    let i18n = I18nBuilder.build()
    var mapInstance = new MapConstructor({ propsData: props, i18n: i18n, store: store})
    const vm = mapInstance.$mount()  
    
    let mapView = vm.$el.querySelector('#map-view')
    expect(mapView).toBeDefined()
    expect(mapView).not.toBeNull()
    done()
  })
})
