import lodash from 'lodash'

/**
 * AppHooks class
 */
class AppHooks {
  /**
   * MapViewData constructor
   */
  constructor () {
    this.hooks = []
  }

  /**
   * Load registered hooks defined in src/config/hooks.js
   */
  loadRegisteredHooks () {
    require('@/config/hooks')
  }

  /**
   * Add a hook
   * @param {string} hookName
   * @param {Function} runFunction
   * @param {Integer} priotity
   */
  add (hookName, runFunction,  priotity = 1) {
    this.hooks.push({name: hookName, runFunction: runFunction, priotity: priotity})
  }

  /**
   * Remove a hook
   * @param {string} hookName
   * @param {Integer} priotity
   */
  remove (hookName, priotity = 1) {
    this.hooks = lodash.remove(this.hooks, function(h) {
      return h.name === hookName && h.priotity === priotity
    })
  }

  /**
   * Add a hook
   * @param {string} hookName
   * @param {*} arg
   */
  run (hookName, arg = null) {
    let targetHooks = lodash.filter(this.hooks, function(h) { return h.name === hookName })

    // Only continue if there hooks
    if (targetHooks.length > 0) {
      // Order the hooks so that we run then in the correct order
      let orderedHooks = lodash.sortBy(targetHooks, [function(h) { return h.priotity }])

      // Loop and run each hook
      for(let key in orderedHooks) {
        if (arg) {
          return orderedHooks[key].runFunction(arg)
        } else {
          return orderedHooks[key].runFunction()
        }
      }
    } else {
      return arg
    }
  }
}
// export the AppHooks json builder class
export default AppHooks
