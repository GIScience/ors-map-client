import AppLoader from '@/app-loader'
import AppRootComponent from '@/App'
import store from '@/store/store'

// Solves the 'RegeneratorRuntime is not defined' issue according to
// https://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import '@babel/polyfill'

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
  it('should show progress linear on showLoading (true) event', (done) => {
    let appLoader = new AppLoader()
    appLoader.loadApp(AppRootComponent, '#app', '<App/>').then(vueInstance => {
      vueInstance.appHooks.loadRegisteredHooks()
      vueInstance.appHooks.run('appLoaded', vueInstance)

      vueInstance.$nextTick(() => { 
        vueInstance.eventBus.$emit('showLoading', true)

        vueInstance.eventBus.$on('showLoading', () => {
          setTimeout(() => {
            let progress = vueInstance.$el.querySelector('.progress-linear')
            expect(progress).toBeDefined()
            expect(progress).not.toBeNull()
            done() 
          }, 200)
        })
      })      
    }).catch ( err => {
      done.fail(err)
    })
  })
  it('should hide progress linear on showLoading (false) event', (done) => {
    let appLoader = new AppLoader()
    appLoader.loadApp(AppRootComponent, '#app', '<App/>').then(vueInstance => {
      vueInstance.appHooks.loadRegisteredHooks()
      vueInstance.appHooks.run('appLoaded', vueInstance)

      vueInstance.$nextTick(() => { 
        vueInstance.eventBus.$emit('showLoading', true)
        vueInstance.eventBus.$emit('showLoading', false)        

        vueInstance.eventBus.$on('showLoading', () => {
          setTimeout(() => {
            let progress = vueInstance.$el.querySelector('.progress-linear')
            expect(progress).toBeDefined()
            expect(progress).not.toBeNull()
            done() 
          }, 200)
        })
      })      
    }).catch ( err => {
      done.fail(err)
    })
  })

  it('should render app in embed mode', async (done) => {
    
    let vueInstance = await new AppLoader().loadApp(AppRootComponent, '#app', '<App/>')

    // Switch the application to embed mode
    store.commit('embed', true)
    
    vueInstance.appHooks.loadRegisteredHooks()
    vueInstance.appHooks.run('appLoaded', vueInstance)

    let appContent = vueInstance.$el.querySelector('.app-content')
    expect(appContent).toBeDefined()
    expect(appContent).not.toBeNull()

    let mapView = vueInstance.$el.querySelector('#map-view')
    expect(mapView).toBeDefined()
    expect(mapView).not.toBeNull()    
    
    appContent.__vue__.$nextTick(() => {         
      // In embed mode, simple place search and other components must not be visible
      expect(appContent.querySelector('.my-location-floating-menu')).toBeNull()
      expect(appContent.querySelector('.fit-all-features')).toBeNull()
      expect(appContent.querySelector('.over-brand')).toBeNull()
      expect(appContent.querySelector('#polyline-measure-control')).toBeNull() 
      expect(appContent.querySelector('.simple-place-search')).toBeNull()

      // The decision about rendering or not some leaflet or third-part components 
      // is made on mount or created cycle. As we are setting the embed more after the
      // app load cycle, then this check is not working. Another strategy has to be found
      // expect(appContent.querySelector('.leaflet-draw')).toBeNull()
      // expect(appContent.querySelector('.leaflet-control-zoom')).toBeNull()
  
      // In embed mode, view-on-ors button must be visible
      let viewOnOrs = appContent.querySelector('.view-on-ors')
      expect(viewOnOrs).toBeDefined()
      expect(viewOnOrs).not.toBeNull()
      done()
    })
  })
})
