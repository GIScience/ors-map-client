import AppLoader from '@/app-loader'
import AppRootComponent from '@/App'

describe('App rendering', () => {
  it('should render app initial page', (done) => {
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
          setTimeout(() => {
            let simplePlaceSearch = appContent.querySelector('.simple-place-search')
            expect(simplePlaceSearch).toBeDefined()
            expect(simplePlaceSearch).not.toBeNull()  
            done()            
          }, 200)
        })
      })      
    }).catch ( err => {
      done.fail(err)
    })
  })
})
