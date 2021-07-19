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
    // eslint-disable-next-line no-undef
    require('@/config/hooks')
  }

  /**
   * Add a hook
   * @param {string} hookName
   * @param {Function} functionToRun
   * @param {Integer} priority
   */
  add (hookName, functionToRun,  priority = 1) {
    this.hooks.push({name: hookName, functionToRun: functionToRun, priority: priority})
  }

  /**
   * Remove a hook
   * @param {string} hookName
   * @param {Integer} priority
   */
  remove (hookName, priority = 1) {
    this.hooks = lodash.remove(this.hooks, function(h) {
      return h.name === hookName && h.priority === priority
    })
  }

  /**
   * Add a hook
   * @param {string} hookName
   * @param {*} arg
   */
  run (hookName, arg = null) {
    let targetHooks = lodash.filter(this.hooks, function(h) { return h.name === hookName })

    arg = this.executeCatchAllHooks(hookName, arg)
    
    // Only continue if there hooks
    if (targetHooks.length > 0) {
      // Order the hooks so that we run then in the correct order
      let orderedHooks = lodash.sortBy(targetHooks, [function(h) { return h.priority }])

      // Loop and run each hook
      for(let key in orderedHooks) {
        let hook = orderedHooks[key]
        return hook.functionToRun(arg)
      }
    } else {
      return arg
    }
  }

  /**
   * Execute the defined catch all hooks,
   * if they are defined
   * @param {Object} hookName
   * @param {String} arg
   * @returns {Object} arg
   */
  executeCatchAllHooks (hookName, arg) {
    // Find and execute catch all hooks, if they are defined
    let catchAllHooks = lodash.filter(this.hooks, function(h) { return h.name === 'catchAll' })

    if (catchAllHooks.length > 0) {
      // Order the hooks so that we run then in the correct order
      let orderedCatchAllHooks = lodash.sortBy(catchAllHooks, [function(h) { return h.priority }])

      // Loop and run each hook
      for(let key in orderedCatchAllHooks) {
        let catchAllHookObject = orderedCatchAllHooks[key]
        arg = catchAllHookObject.functionToRun(hookName, arg)
      }
    }
    return arg
  }
}
// export the AppHooks json builder class
export default AppHooks
