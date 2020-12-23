import axios from 'axios'
import appConfig from '@/config/app-config'
import main from '@/main'
import store from '@/store/store'

/**
 * Function used to get the the menu items base url according the node env.
 * @returns {String}
 */
const getBaseUrl = () => {
  const env = process.env
  return env.NODE_ENV === 'production' ? appConfig.appMenu.prodBaseAPIUrl : appConfig.appMenu.devBaseAPIUrl
}

const httpApi = axios.create({
  baseURL: getBaseUrl(),
  headers: {
  }
})

/**
 * Modifies the request before it is sent
 *
 * @param {} config
 */
const requestInterceptors = (config) => {
  // Before each request, we check if the user is authenticated
  // This store isAuthenticated getter relies on the @/common/auth/auth.store.js module
  if (appConfig.requireAuth) {
    let VueInstance = main.getInstance()
    if (VueInstance && store.getters.isAuthenticated) {
      // if not, redirect to login page
      VueInstance.$router.replace('/login')
    } else {
      // if yes, show the loading and add the authorization header
      VueInstance.eventBus.$emit('showLoading', true)
      // Set/increase the pending request counter
      VueInstance.$pendingRequest = VueInstance.$pendingRequest ? VueInstance.$pendingRequest + 1 : 1
      config.headers.common.Authorization = 'Bearer ' + store.getters.user.token
    }
  }
  return config // you have to return the config, otherwise the request wil be blocked
}

/**
 * Modifies the response after it is returned
 * @param {*} response
 */
const responseInterceptors = (response) => {
  let VueInstance = main.getInstance()
  if (VueInstance) {
    // Decrease the pending request counter
    VueInstance.$pendingRequest--
  
    // If the the pending request counter is zero, so
    // we can hide the progress bar
    if (VueInstance.$pendingRequest === 0) {
      VueInstance.eventBus.$emit('showLoading', false)
    }
  }
  response = response.response || response
  response.data = response.data || {}
  return response
}

/**
 * Modifies the error/fail response after it is finished
 * @param {*} response
 */
const responseErrorInterceptors = (response) => {
  return new Promise((resolve, reject) => {
    let VueInstance = main.getInstance()
    if (VueInstance) {
      // Decrease the pending request counter
      VueInstance.$pendingRequest--
  
      // If the the pending request counter is zero, so
      // we can hide the progress bar
      if (VueInstance.$pendingRequest === 0) {
        VueInstance.eventBus.$emit('showLoading', false)
      }
    }
    response = response.response || response
    response.data = response.data || {}
    reject(response)
  })
}

httpApi.interceptors.request.use(requestInterceptors)
httpApi.interceptors.response.use(responseInterceptors, responseErrorInterceptors)

export default httpApi
