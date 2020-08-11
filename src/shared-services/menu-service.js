import ModelService from '@/crud/model-service'

const options = {
  pk: 'term_id',
  raw: true // we dont need each menu resource to be converted to a Model (@/core/model), because it is a read-only resource
}
const menuService = new ModelService('wp-api-menus/v2/menus', 'menu', options)

export default menuService
