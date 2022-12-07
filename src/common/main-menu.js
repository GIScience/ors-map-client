import menuManager from '@/support/menu-manager'
import appConfig from '@/config/app-config'
import AppLoader from '@/app-loader'
import store from '@/store/store'

/**
 * Load the primary menu by its slug defined app config
 * from remote server and then run the local customization over it
 */
const loadItems = () => {
  return new Promise((resolve) => {
    if (appConfig.appMenu.useORSMenu) {
      menuManager.getMenu(appConfig.appMenu.mainMenuId).then((menu) => {
        resolve(menu)
      }).catch(error => {
        console.error(error)
        resolve([])
      })
    } else {
      let expectedPromise = AppLoader.getInstance().appHooks.run('loadMenuItems')
      if (expectedPromise instanceof Promise) {
        expectedPromise.then((result) => {
          resolve(result)
        }).catch (err => {
          console.log(err)
        })
      } else {
        resolve([])
      }
    }
  })
}

const adjustMenu = () => {
  AppLoader.getInstance().appHooks.run('modifyMenu', store.getters.mainMenu)
}

/**
 * Return Main menu
 */
const MainMenu = {
  loadItems,
  adjustMenu
}

export default MainMenu
