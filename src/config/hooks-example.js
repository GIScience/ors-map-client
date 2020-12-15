import main from '@/main'
import store from '@/store/store'
const appHooks = main.getInstance().appHooks

// It is possible to use values from the store, like, for example:
// store.getters.mapCenter, store.getters.mapBounds and store.getters.mode

// When adding a hook, three parameters can be passed:
// the name of the hook (string) to be listened, the function to be run and the priority (number).
// Below are examples of hook event that happen in the app.
// Some behaviors of the app can be modified
// by changing the parameter value that is passed
// when the hook is run 

appHooks.add('afterGetRouteOptions', (options) => {
    // Do something when the route options are ready
}, 1)

appHooks.add('appLoaded', (vueInstance) => {
    // Do something when the app is loaded
}, 1)

appHooks.add('appLoaded', (vueInstance) => {
    // Do something when the app is loaded
}, 1)

appHooks.add('afterDirectionsPathDecoded', (appRouteData) => {
    // Do something when the app is loaded
}, 1)

appHooks.add('afterRoundtripPathDecoded', (appRouteData) => {
    // Do something
}, 1)

appHooks.add('afterPlacePathDecoded', (appRouteData) => {
    // Do something
}, 1)

appHooks.add('afterIsochronesPathDecoded', (appRouteData) => {
    // Do something
}, 1)

appHooks.add('avoidPolygonsChangedInIsochrones', (polygons) => {
    // Do something
}, 1)

appHooks.add('avoidPolygonsChangedInDrections', (polygons) => {
    // Do something
}, 1)

appHooks.add('mapViewDataChanged', (mapViewData) => {
    // Do something
}, 1)

appHooks.add('mapReady', () => {
    // Do something
}, 1)

appHooks.add('beforeStoreNewCurrentLocation', (location) => {
    // Do something
}, 1)

appHooks.add('polygonCreated', (polygon) => {
    // Do something
}, 1)

appHooks.add('polygonDeleted', (polygon) => {
    // Do something
}, 1)

appHooks.add('polygonEdited', (polygon) => {
    // Do something
}, 1)

appHooks.add('mapBoundsChanged', (mapBounds) => {
    // Do something
}, 1)

appHooks.add('mapSettingsChanged', (mapSettings) => {
    // Do something
}, 1)

appHooks.add('appModeChanged', (mode) => {
    // Do something
}, 1)














