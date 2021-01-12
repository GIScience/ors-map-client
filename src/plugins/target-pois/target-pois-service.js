import {ModelService} from 'vue-rest-client'
import targetPoisConfig from './target-pois-config'
import main from '@/main'

const options = {
  httpClientOptions: {
    baseURL: targetPoisConfig.baseDisasterUrl, // String, an empty string is the default,
    getVueInstance: () => {
      return main.getInstance()
    }
  },
  pk: 'id',
  raw: true, // we dont need each menu resource to be converted to a Model (@/core/model), because it is a read-only resource
  transformResponse: (response) => {
    response.data = response.data || {}
    if (response.config.method === 'get' && response.data.elements) {
      response.data = response.data.elements
    }
  }
}
const diasterAreaService = new ModelService('api/interpreter', 'menu', options)

export default diasterAreaService


