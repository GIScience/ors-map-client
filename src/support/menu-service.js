import ModelService from '@/crud/model-service'
import appConfig from '@/config/app-config'

const options = {
  pk: appConfig.appMenu.menuPrimaryKeyField,
  raw: true // we dont need each menu resource to be converted to a Model (@/core/model), because it is a read-only resource
}
const menuService = new ModelService(appConfig.appMenu.menuServiceEndpoint, 'menu', options)

export default menuService
