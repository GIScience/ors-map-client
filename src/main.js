import AppLoader from '@/app-loader'
import AppRootComponent from '@/App.vue'
import {EventBus} from '@/common/event-bus'


const main = {
  // Store the vue instance singleton
  vueInstance: null
}

let appLoader = new AppLoader()

appLoader.loadApp(AppRootComponent, '#app').then(app => {
  main.vueInstance = app
  app.config.globalProperties.$appHooks.loadRegisteredHooks()
  EventBus.$emit('appLoaded')
  app.config.globalProperties.$appHooks.run('appLoaded', app)
})


export default main
