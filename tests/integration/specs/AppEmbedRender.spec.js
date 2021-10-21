import AppLoader from '@/app-loader'
import AppRootComponent from '@/App'
import store from '@/store/store'

describe('App embed rendering', () => {
  it('should render app initial page in embed mode', (done) => {
    let appLoader = new AppLoader()
    appLoader.loadApp(AppRootComponent, '#app', '<App/>').then(vueInstance => {
      vueInstance.appHooks.loadRegisteredHooks()
      vueInstance.appHooks.run('appLoaded', vueInstance)

      vueInstance.$nextTick(() => { 
        let appContent = vueInstance.$el.querySelector('.app-content')
        expect(appContent).toBeDefined()
        expect(appContent).not.toBeNull()

        let mapView = vueInstance.$el.querySelector('#map-view')
        expect(mapView).toBeDefined()
        expect(mapView).not.toBeNull()
        
        appContent.__vue__.$nextTick(() => { 
          // Switch the application to embed mode
          store.commit('embed', true)

          setTimeout(() => {
            let simplePlaceSearch = appContent.querySelector('.simple-place-search')
            expect(simplePlaceSearch).toBeNull() // in embed mode, simple place search must not be visible

            // in embed mode, view on ors button must be visible
            let viewOnOrs = appContent.querySelector('.view-on-ors')
            expect(viewOnOrs).toBeDefined()
            expect(viewOnOrs).not.toBeNull()
            done()            
          }, 200)
        })
      })      
    }).catch ( err => {
      done.fail(err)
    })
  })
})
