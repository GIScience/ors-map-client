import {ModelService} from 'vue-rest-client'
import AppLoader from '@/app-loader'

const options = {
  httpClientOptions: {
    baseURL: 'https://nominatim.openstreetmap.org',
    getVueInstance: () => {
      return AppLoader.getInstance()
    }
  },
  pk: 'id',
  raw: true,
  transformResponse: (response) => {
    response.data = response.data || []
  }
}
const adminPolygonService = new ModelService('search.php', 'menu', options)

export default adminPolygonService
