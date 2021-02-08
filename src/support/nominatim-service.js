import {ModelService} from 'vue-rest-client'
import main from '@/main'

const options = {
  httpClientOptions: {
    baseURL: 'https://nominatim.openstreetmap.org', // String, an empty string is the default,
    getVueInstance: () => {
      return main.getInstance()
    }
  },
  pk: 'id',
  raw: true, // we dont need each menu resource to be converted to a Model (@/core/model), because it is a read-only resource
  transformResponse: (response) => {
    response.data = response.data || []
  }
}
const adminPolygonService = new ModelService('search.php', 'menu', options)

export default adminPolygonService
