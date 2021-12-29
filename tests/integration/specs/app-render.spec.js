import AppLoader from '@/app-loader'
import AppRootComponent from '@/App'

// Solves the 'RegeneratorRuntime is not defined' issue according to
// https://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import '@babel/polyfill'

describe('App render', () => {
  it('should render app', async (done) => {
    let appLoader = new AppLoader()
    let vueInstance = await appLoader.loadApp(AppRootComponent, '#app', '<App/>')
    vueInstance.appHooks.loadRegisteredHooks()
    vueInstance.appHooks.run('appLoaded', vueInstance)

    await vueInstance.$nextTick()
    let appContent = vueInstance.$el.querySelector('.app-content')
    expect(appContent).toBeDefined()
    expect(appContent).not.toBeNull()

    let mapView = vueInstance.$el.querySelector('#map-view')
    expect(mapView).toBeDefined()
    expect(mapView).not.toBeNull()

    await appContent.__vue__.$nextTick() 
    await new Promise(resolve => setTimeout(resolve, 200))
    let simplePlaceSearch = appContent.querySelector('.simple-place-search')
    expect(simplePlaceSearch).toBeDefined()
    expect(simplePlaceSearch).not.toBeNull()  
    done()    
  })
  it('should show progress linear on showLoading (true) event', async (done) => {
    let appLoader = new AppLoader()
    let vueInstance = await appLoader.loadApp(AppRootComponent, '#app', '<App/>')
    vueInstance.appHooks.loadRegisteredHooks()
    vueInstance.appHooks.run('appLoaded', vueInstance)

    await vueInstance.$nextTick()  
    vueInstance.eventBus.$on('showLoading', async () => {
      await new Promise(resolve => setTimeout(resolve, 200))
      let progress = vueInstance.$el.querySelector('.progress-linear')
      expect(progress).toBeDefined()
      expect(progress).not.toBeNull()
      done()
    })
    vueInstance.eventBus.$emit('showLoading', true)    
  })
  it('should hide progress linear on showLoading (false) event', async (done) => {
    let appLoader = new AppLoader()
    let vueInstance = await appLoader.loadApp(AppRootComponent, '#app', '<App/>')
    vueInstance.appHooks.loadRegisteredHooks()
    vueInstance.appHooks.run('appLoaded', vueInstance)

    await vueInstance.$nextTick()
    vueInstance.eventBus.$on('showLoading', async (state) => {
      if (state === false) {
        await new Promise(resolve => setTimeout(resolve, 1000))        
        let progress = vueInstance.$el.querySelector('.progress-linear')
        expect(progress).toBeDefined()
        expect(progress).not.toBeNull()
        done() 
      }
    })
    vueInstance.eventBus.$emit('showLoading', true)
    vueInstance.eventBus.$emit('showLoading', false)
  })
})
