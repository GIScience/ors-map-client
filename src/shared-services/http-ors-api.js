import axios from 'axios'
import VueInstance from '@/main'

const httpOrsApi = axios.create({
  headers: {
  }
})

/**
 * Modifies the request before it is sent
 *
 * @param {} config
 */
const requestInterceptors = (config) => {
  // if yes, show the loading and add the authorization header
  VueInstance.eventBus.$emit('showLoading', true)
  // Set/increase the pending request counter
  VueInstance.$orsApiPendingRequest = VueInstance.$orsApiPendingRequest ? VueInstance.$orsApiPendingRequest + 1 : 1
  config.metadata = {startTime: new Date()}
  return config // you have to return the config, otherwise the request wil be blocked
}

/**
 * Modifies the response after it is returned
 * @param {*} response
 */
const responseInterceptors = (response) => {
  // Decrease the pending request counter
  VueInstance.$orsApiPendingRequest--

  // If the the pending request counter is zero,
  // so we can hide the progress bar
  if (VueInstance.$orsApiPendingRequest === 0) {
    VueInstance.eventBus.$emit('showLoading', false)
  }
  response = response.response || response
  response.data = response.data || {}

  response.config.metadata.endTime = new Date()
  response.duration = response.config.metadata.endTime - response.config.metadata.startTime
  return response
}

/**
 * Modifies the error/fail response after it is finished
 * @param {*} response
 */
const responseErrorInterceptors = (response) => {
  return new Promise((resolve, reject) => {
    // Decrease the pending request counter
    VueInstance.$orsApiPendingRequest--

    // If the the pending request counter is zero, so
    // we can hide the progress bar
    if (VueInstance.$orsApiPendingRequest === 0) {
      VueInstance.eventBus.$emit('showLoading', false)
    }
    response = response.response || response
    response.data = response.data || {}
    reject(response)
  })
}

httpOrsApi.interceptors.request.use(requestInterceptors)
httpOrsApi.interceptors.response.use(responseInterceptors, responseErrorInterceptors)

export default httpOrsApi
