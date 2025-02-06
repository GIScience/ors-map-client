import AppLoader from '@/app-loader'
import AppRootComponent from '@/App.vue'
import {EventBus} from '@/common/event-bus'


const main = {
  // Store the vue instance singleton
  vueInstance: null
}

let appLoader = new AppLoader()

appLoader.loadApp(AppRootComponent, '#app', '<App/>').then(vueInstance => {
  main.vueInstance = vueInstance
  main.vueInstance.appHooks.loadRegisteredHooks()
  EventBus.$emit('appLoaded')
  main.vueInstance.appHooks.run('appLoaded', main.vueInstance)
})


export default main
