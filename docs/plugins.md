# Plugins

The ORS maps app has support for plug-ins that can add new features or change existing features.
A custom created plug-ins engine is responsible for checking the existence of plug-ins in the `src/plugins` and
running hooks that will call specific methods of each plug-in.

## Files involved

The services, classes and components that are involved with the support for plugins are:

- `@/support/app-hooks` - class responsible for running actions related to the plugin engine cycle, like `add` and `run`.
- `@/common/global-mixins` - set a pointer to an instance of `AppHooks` to the main vue instance.
- `@/config/hooks` - register the plugin hooks
- `@/main` - loads the registered hooks and runs the `appLoaded` hook.

## Plugin structure

Each plug-in must be contained in a folder created under the `src/plugins` folder.
For example: src/plugin/my-awesome-plugin. No file should be directly put in the root of the `plugins` folder.

Each plug-in must be a class with methods that can be called on hooks defined in the hooks.js.
Check the ExamplePlugin in `plugin-example/plugin-example.js`.

## Creating and registering a plugin

There are events, or hooks, that are called during the app execution and when certain actions take place.
These hooks are run by executing AppHooks `run`, passing the event/hook name as first parameter and the event
parameters as the second argument.
On its turn, the run method will check if there are active plug-ins that are listening for that hook/event.
If that is the case, the every plug-in listening for that hook will be called. The way to add a listener for a hook in
a plug-in is by adding a method with the name of a hook.
The `@/plugins/plugin-example` folder contains an example of plugin.
Check an excerpt of it below:

```js
class PluginExample {
  // Declare a class constructor to receive the main vueInstance
  constructor(vueInstance) {
    this.vueInstance = vueInstance;
  }

  // mapReady is the name of a hook and is declared as a method.
  mapReady(hookData) {
    console.log("PluginExample: mapReady callback", hookData);
  }
}
```

In order to activate the PluginExample an entry to the `config/hooks.js` must be added:

```js
// Import the plugin module
import PluginExample from "@/plugins/plugin-example/plugin-example.js";

// Import AppLoader to have access to appHooks.add
import AppLoader from "@/app-loader";

// Get appHooks instance reference
const appHooks = AppLoader.getInstance().appHooks;

// Add a listener to the `appLoaded` hook, and register the plugin when it is called
appHooks.add("appLoaded", (vueInstance) => {
  const pluginExample = new PluginExample(vueInstance);
  appHooks.attachPlugin(pluginExample, vueInstance);
});
```

## What can be used in a plug-in ?

In addition to the parameters passed to each method via hook call, inside a plug-in you can use the values stored in the
[vuex](https://vuex.vuejs.org/guide/) store.
In order to access the app store you need to import store from '@/store/store') and access it via, for example
`store.getters.mapBounds`.

You can also use the app constants to compare values. For this import `constants` from `@/resources/constants`.

Within the plug-in you can also set listeners to events emitted via `evenBus`, for example `mapViewDataChanged`,
as well as emit those events.
Some events emitted via `EventBus` are:

- `mapViewDataChanged`
- `loadAvoidPolygons`
- `showLoading`
- `removePlace`
- `markerDragged`
- `filtersChangedExternally`
- `directionsFromPoint`
- `directionsToPoint`
- `addRouteStop`
- `appRouteDataChanged`

You can search the entire app for `EventBus.$on(` to find all the events emitted via EventBus.

## List of all hooks available

Check below the list of all hooks available, how they are expected to be declared (as methods), the arguments passed
and what is expected to be returned in each declared method (in the case something is expected to be returned).

```js
class PluginExample {
  mapReady(hookData) {
    // hookData has the following structure {context: Object, map: Object}
    // The leaflet `map` object is passed and
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
   * @param {MapViewData}
   */
  mapViewDataChanged(mapViewData) {
    console.log("PluginExample: mapViewDataChanged callback", mapViewData);
    // change the mapViewData object
    // so that it will update the map view
  }

  loadMenuItems() {
    // This hook is called if appConfig.appMenu.useORSMenu is not true
    // A promise is expected to be returned.
    return new Promise((resolve, reject) => {
      let items = []; // `items` is expected to contain an array of menu items
      resolve(items);
    });
  }

  placeSelected(hookData) {
    // hookData has the following structure {index: Number, place: Place, single: Boolean}
    // A promise is expected to be returned.
    return new Promise((resolve, reject) => {
      resolve(true); // if rejected the place selection will be stopped
    });
  }

  // If the app is set not to use load and use ORS menu
  // then add two menu items mock p to show that menu  is working
  modifyMenu(menu) {
    // If in app settings is set not  to load/use ORS menu items, then
    // two items will be added to the menu as a sample. It is just to
    // demonstrate that the menu is working. You can remove the code
    // below if you want an empty menu or customize the item of the menu.
    if (!appConfig.appMenu.useORSMenu) {
      menu.push({
        href: "https://domain.tld/path",
        title: "Menu item 1",
        target: "_blank",
        icon: "library_books",
        requiresBeAuthenticated: false,
        showIcon: true,
      });
      menu.push({
        href: "https://domain.tld/path2",
        title: "Menu item 2",
        target: "_blank",
        icon: "Links",
      });
    }
  }

  // The hooks below are just for demonstration about what
  // can be used. If you are not using, you can remove them.
  afterGetRouteOptions(options) {
    // Do something when the route options is built
  }

  appModeRouteReady(routeObj) {
    // Do something when the route object is ready
  }

  appLoaded(vueInstance) {
    // Do something when the app is loaded
  }

  afterDirectionsPathDecoded(appRouteData) {
    // Do something when the app is loaded
  }

  afterRoundtripPathDecoded(appRouteData) {
    // Do something
  }

  afterPlacePathDecoded(appRouteData) {
    // Do something
  }

  afterIsochronesPathDecoded(appRouteData) {
    // Do something
  }

  avoidPolygonsChangedInIsochrones(polygons) {
    // Do something
  }

  avoidPolygonsChangedInDirections(polygons) {
    // Do something
  }

  beforeUseNewDeviceLocation(location) {
    // Do something
  }

  avoidPolygonCreated(hookData) {
    // hookData has the following structure {polygon: Object, map: Object, context: Object}
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  }

  avoidPolygonRemoved(hookData) {
    // hookData has the following structure {polygon: Object, map: Object, context: Object}
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  }

  avoidPolygonEdited(hookData) {
    // hookData has the following structure {polygon: Object, map: Object, context: Object}
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  }

  mapBoundsChanged(hookData) {
    // hookData  = {mapBounds, Object, map: Object, context: Object}
    // Do something
  }

  mapSettingsChanged(mapSettings) {
    // Do something
  }

  appModeChanged(mode) {
    // Do something
  }

  poisMarkersCreated(markers) {
    // Do something
    return markers;
  }

  // When markers that represent the
  // routing places or searched places are created
  markersCreated(markers) {
    // Code example for customizing icons using material design icons https://material.io/resources/icons/

    let markerIcoStyle =
      "transform: rotate(+45deg); margin-left: 4px;margin-top: 2px;";

    for (let key in markers) {
      let markerColor = "#c30b82"; // maybe change the color based on the place properties ?
      let iconDivMarkerStyle = `width: 30px;height: 30px;border-radius: 50% 50% 50% 0;background: ${markerColor};position: absolute;transform: rotate(-45deg);left: 50%;top: 50%;margin: -15px 0 0 -15px;`;
      let markerIcon = "hotel"; // maybe change the icon based on the place properties ?

      markers[key].icon = Leaflet.divIcon({
        className: "custom-div-icon",
        html: `<div style='${iconDivMarkerStyle}'><i style='${markerIcoStyle}' class='material-icons'>${markerIcon}</i></div>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
      });
    }
    return markers;
  }

  mapFiltersAdded(filters) {
    // Do something
  }

  placeSearchArgsCreated(args) {
    // Do something
  }

  autocompleteArgsCreated(args) {
    // Do something
  }

  poisSearchArgsCreated(args) {
    // Do something
  }

  reverseSearchArgsCreated(args) {
    // Do something
  }

  isochronesArgsCreated(args) {
    // Do something
  }

  routingArgsCreated(args) {
    // Do something
  }

  routingElevationArgsCreated(args) {
    // Do something
  }

  mapCenterChanged(latLng) {
    // Do something
  }

  beforeOpenMarkerPopup(hookData) {
    // hookData has the following structure {marker: Object, markerPopupContainer: HtmlNode}
    // `markerPopupContainer` is an HTML node and can be manipulated.
    // It possible to remove and change existing content, as well
    // as add new VueJS component. See the example below.

    markerPopupContainer.innerText = "";

    // this hook will be invoked every time the popup is about
    // to render. So, to avoid content multiple times
    // we check it the component was not already added
    let buttons = markerPopupContainer.querySelectorAll("a");

    // If the VueJS component was not already added
    if (buttons.length == 0) {
      // Don't forget to the the imports in the header
      // for this example, it would be:
      // import Vue from 'vue'
      // import {VBtn} from 'vuetify'
      var ComponentClass = Vue.extend(VBtn); // don't forget to add
      var instance = new ComponentClass({ propsData: { color: "primary" } });
      instance.$slots.default = ["Click me!"];
      instance.$on(["click"], (e) => {
        console.log("event", e);
      });
      instance.$mount(); // pass nothing
      // Finally append the instantiated vue
      // component to the markerPopupContainer
      markerPopupContainer.appendChild(instance.$el);
    }
  }

  beforeShowResolvedPlaceInfo(hookData) {
    // hookData has the following structure:
    // {
    //  placeInfo: { placeName: String, containerArea: String, clickInsidePolygon: Boolean, latLng: {lat:..., lng:...}},
    //  placeInfoContainer: HtmlNode
    // }
    // If the placeInfo.customHtml prop is set,
    // its content will be shown in the place
    // info box. If the prop hideDirectionsTo is set
    // the the hideDirectionsTo btn is not shown
    // It possible to remove and change existing content, as well
    // as add new VueJS component in the popupHtmlFragment.
    // See the example in `beforeOpenMarkerPopup`
  }

  beforeShowAvoidPolygonPopup(hookData) {
    // hookData has the following structure {polygon: Object, popupHtmlFragment: HtmlNode}
    // It possible to remove and change existing content, as well
    // as add new VueJS component in the popupHtmlFragment.
    // See the example in `beforeOpenMarkerPopup`
  }

  avoidPolygonEditModeEnabled(polygonLayer) {
    // Do something
  }

  placeInputLabelBuilt(hookData) {
    // hookData has the following structure {label: String, supportDirections: Boolean, single: Boolean, placeModel: Place}
    // Do something
  }

  drawingOptionsBuilt(options) {
    // Do something
  }

  polylineMeasureOptionsBuilt(options) {
    // Do something
  }

  beforeOpenIsochronePopup(hookData) {
    // hookData has the following structure {polygon: Object, isochronePopupContainer: HtmlNode}
    // isochronePopupContainer = an HTML node and can be manipulated,
    // It possible to remove and change existing content, as well
    // as add new VueJS component. See the example below.
    // See the example in `beforeOpenMarkerPopup`
    // Do something
  }

  placeSearchAddressArgsDefined(args) {
    // Do something
  }

  placeSearchPoisArgsDefined(args) {
    // Do something
  }

  placeSearchResultPrepared(places) {
    // Do something
    // An array of places is expected to be returned
    return places;
  }

  placeSearchPromisesDefined(promises) {
    // Two promises, one for address/administrative localities and other for venus are created.
    // You could potentially replace one of them or both for custom requests.

    let filters = { category_group_ids: [100] }; // define a category that would be searched
    let promise = Pois(filters, 100); // you would have to import pois, like: import { Pois } from '@/support/ors-api-runner'
    return [promise];
  }

  beforeUseMarkerClusterOptions(options) {
    // An options object must be returned
    return options;
  }

  beforeHandleDirectionsError(response) {
    // Do something
  }

  beforeHandleIsochronesError(response) {
    // Do something
  }

  beforeBuildIsochronesMapViewData(responseData) {
    // Do something
    return responseData; // if null or false is returned, then the building will be aborted
  }

  beforeBuildDirectionsMapViewData(responseData) {
    // Do something
    return responseData; // if null or false is returned, then the building will be aborted
  }

  avoidPolygonBtnTranslations(translationsObject) {
    // Do something
  }

  zoomChanged(hookData) {
    // hookData has the following structure { zoom: Object, map: Object, context: Object}
    // Do something
  }

  rightClickContentReady(hookData) {
    // hookData has the following structure = {context: Object, containerRef: Object, latLng: Object}
    // Do something
  }

  layerProvidersLoaded(hookData) {
    // hookData has the following structure = {tileProviders: Object, overlayerTileProviders: Object, context: Object}
    // Do something
  }

  floatingMenuItemsDefined(menuItems) {
    // menuItems is an array in which each item has following structure:
    // {
    //   id: String,
    //   show: boolean,
    //   href: String (optional),
    //   title: String,
    //   text: String,
    //   icon: String (corresponding to a valid material design icon),
    //   target: String (like '_blank')
    // }
    return menuItems;
  }

  aboutContentDefined(hookData) {
    // hookData has the following structure = {customAbout: HtmlNode, aboutContainer: HtmlNode, aboutLogo: HtmlNode}
    // Do something
  }
}
```
