import {ModelService} from 'vue-rest-client'
import appConfig from '@/config/app-config'
import main from '@/main'

const options = {
  httpClientOptions: {
    baseURL: appConfig.dataServiceBaseUrl, // String, an empty string is the default,
    getVueInstance: () => {
      return main.getInstance()
    }
  },
  pk: appConfig.appMenu.menuPrimaryKeyField,
  raw: true // we dont need each menu resource to be converted to a Model (@/core/model), because it is a read-only resource
}
const menuService = new ModelService(appConfig.appMenu.menuServiceEndpoint, 'menu', options)

export default menuService
