import AppLoader from '@/app-loader'
import AppRootComponent from '@/App'

describe('App render', () => {
  it('should render app initial page', (done) => {
    let appLoader = new AppLoader()
    appLoader.loadApp(AppRootComponent, '#app', '<App/>').then(vueInstance => {
      vueInstance.appHooks.loadRegisteredHooks()
      vueInstance.appHooks.run('appLoaded', vueInstance)
      expect(vueInstance.$el.querySelector('#app')).toBeDefined()
      expect(vueInstance.$el.querySelector('.simple-place-search')).toBeDefined()
      expect(vueInstance.$el.querySelector('.app-content')).toBeDefined()
      expect(vueInstance.$el.querySelector('#map-view')).toBeDefined()
      done()  
    })
  })
})
