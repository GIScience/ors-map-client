/**
 * This is an example of a simple plugin aiming at demonstrating how you can add
 * custom behavior to the maps-client. To make the plugin work it is necessary
 * to import this class in the hooks.js, instantiate it and run the plugin methods
 * on hooks defined on hooks.js
 * @see /src/config/hook-example.js
 *
 * It is possible to use values from the store, like, for example:
 * store.getters.mapCenter, store.getters.mapBounds and store.getters.mode
 * It is also possible to emit events using the EventBus. For example:
 * EventBus.$emit('mapViewDataChanged', mapViewDataChanged)
 */
class PluginExample {
  /**
   * PluginExample constructor.
   * IMPORTANT: this constructor is expected
   * to be called on the hooks.js the `appLoaded` hook
   */
  constructor (vueInstance) {
    this.vueInstance = vueInstance
  }

  /**
   * Is called when the app is loaded and the map view is ready
   *
   * IMPORTANT: this method is expected to be called on
   * hooks.js on the mapReady hook or automatically via catchAll
   * @param {Object} hookData
   */
  mapReady (hookData) {
    console.log('PluginExample: mapReady callback', hookData)
    // hookData has the following structure {context: Object, map: Object}
    // The leaflet `map` object is passed, and
    // you can potentially change it by adding or removing controls
  }

  /**
   * Method to get the current mapViewData and potentially
   * change it. As it is an object, when you change it you are
   * changing the original object.
   * The MapView is watching to changes to this object and
   * will re-render the displayed content on the map view
   * when it is changed.
   * IMPORTANT: this method is expected to be called on
   * hooks.js on the mapViewDataChanged hook.
   * @param {*} mapViewData
   */
  mapViewDataChanged (mapViewData) {
    console.log('PluginExample: mapViewDataChanged callback', mapViewData)
    // change the mapViewData object
    // so that it will update the map view
  }
}
// export the AppHooks json builder class
export default PluginExample
