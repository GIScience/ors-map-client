import AppLoader from '@/app-loader'
import AppRootComponent from '@/App'

// Solves the 'RegeneratorRuntime is not defined' issue according to
// https://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import '@babel/polyfill'

describe('App rendering', () => {
  it('should render app', (done) => {
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
})
