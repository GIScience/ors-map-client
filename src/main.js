import AppLoader from '@/app-loader'
import AppRootComponent from '@/App'
import store from '@/store/store'

const main = {
  /**
   * Get the main app vue instance
   * @returns {Vue} instance
   */
  getInstance: () => {
    return main.vueInstance || store.getters.mainAppInstanceRef
  },
  // Store the vue instance singleton
  vueInstance: null
}

let appLoader = new AppLoader()

appLoader.loadApp(AppRootComponent, '#app', '<App/>').then(vueInstance => {
  main.vueInstance = vueInstance
  main.vueInstance.appHooks.loadRegisteredHooks()
  main.vueInstance.appHooks.run('appLoaded', main.vueInstance)
})


export default main
