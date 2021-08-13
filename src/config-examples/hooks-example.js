// This is an example file and is expected to be cloned 
// without the -example on the same folder that it resides.


// THE CODE BELOW IS COMMENTED OUT BECAUSE THEY ARE JUST EXAMPLES

/*
import AppLoader from '@/app-loader'
import PluginExample from '@/plugins/plugin-example/plugin-example.js'

const appHooks = AppLoader.getInstance().appHooks

// When adding a hook, three parameters can be passed:
// the name of the hook (string) to be listened, the 
// function to be run and the priority (number).

// Below are examples of hook event that happen in the app.
// Some behaviors of the app can be modified by changing the 
// parameter value that is passed when the hook is run.

appHooks.add('appLoaded', (vueInstance) => {
  const pluginExample = new PluginExample(vueInstance)
  appHooks.attachPlugin(pluginExample, vueInstance)
  // Do something when the app is loaded
})

// #### INDIVIDUAL HOOKS DEFINITION ###

// The catch all hook allows, as the name says, catching all
// the hooks. It receives as parameters not only the hook parameter
// arg, but also the hook name. It can be used to run plugin functions 
// with the same name of the hook. By using this hook in combination with 
// a plugin you avoid having to define every hook individually and inside
// these hooks call a plugin method/function.

appHooks.add('catchAll', (hookName, hookData) => {
  if (pluginExample && typeof pluginExample[hookName] === 'function') {
    return pluginExample[hookName](hookData)
  } else {
    return hookData // this return is always necessary
  }
}, 1)

// If you want to define the hooks individually, 
// then the templates are shown below.

appHooks.add('mapViewDataChanged', (mapViewData) => {
  pluginExample.mapViewDataChanged(mapViewData)
}, 1)

appHooks.add('mapReady', (hookData) => {
  // hookData has the following structure {context: Object, map: Object}
  // custom map controls/components can be added via map objects 
  // or via hookData.context.customMapControlsContainer (a vue ref for an empty container inside the map view)
  pluginExample.mapReady(hookData)
}, 1)

appHooks.add('loadMenuItems', () => {
  // This hook is called if appConfig.appMenu.useORSMenu is not true
  // A promise is expected to be returned.
  return new Promise((resolve, reject) => {
    let items = [] // `items` is expected to contain an array of menu items
    resolve(items)
  })
}, 1)

appHooks.add('placeSelected', (hookData) => {
  // hookData has the following structure {index: Number, place: Place, single: Boolean}
  // A promise is expected to be returned.
  return new Promise((resolve, reject) => {
    resolve(true) // if rejected the place selection will be stopped
  })
}, 1)

// If the app is set not to use load and use ORS menu
// then add two menu items mock p to show that menu  is working
appHooks.add('modifyMenu', (menu) => {
  // If in app settings is set not  to load/use ORS menu items, then
  // two items will be added to the menu as a sample. It is just to 
  // demonstrate that the menu is working. You can remove the code 
  // below if you want an empty menu or customize the item of the menu.
  if (!appConfig.appMenu.useORSMenu) {
    menu.push({
      href: 'https://domain.tld/path',
      title: 'Menu item 1',
      target: '_blank',
      icon: 'library_books',
      requiresBeAuthenticated: false,
      showIcon: true
    })
    menu.push({
      href: 'https://domain.tld/path2',
      title: 'Menu item 2',
      target: '_blank',
      icon: 'Links'
    })
  }
}, 1)

// The hooks below are just for demonstration about what 
// can be used. If you are not using, you can remove them.
appHooks.add('afterGetRouteOptions', (options) => {
  // Do something when the route options is built
}, 1)

appHooks.add('appModeRouteReady', (routeObj) => {
  // Do something when the route object is ready
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

appHooks.add('avoidPolygonsChangedInDirections', (polygons) => {
  // Do something
}, 1)

appHooks.add('beforeUseNewDeviceLocation', (location) => {
  // Do something
}, 1)

appHooks.add('avoidPolygonCreated', (hookData) => {
  // hookData has the following structure {polygon: Object, map: Object, context: Object}
  return new Promise((resolve, reject) => {
    resolve(result)
  })
}, 1)

appHooks.add('avoidPolygonRemoved', (hookData) => {
  // hookData has the following structure {polygon: Object, map: Object, context: Object}
  return new Promise((resolve, reject) => {
    resolve(result)
  })
}, 1)

appHooks.add('avoidPolygonEdited', (hookData) => {
  // hookData has the following structure {polygon: Object, map: Object, context: Object}
  return new Promise((resolve, reject) => {
    resolve(result)
  })
}, 1)

appHooks.add('mapBoundsChanged', (hookData) => {
  // hookData  = {mapBounds, Object, map: Object, context: Object}
  // Do something
}, 1)

appHooks.add('mapSettingsChanged', (mapSettings) => {
  // Do something
}, 1)

appHooks.add('appModeChanged', (mode) => {
  // Do something
}, 1)


appHooks.add('poisMarkersCreated', (markers) => {
  // Do something
  return markers
}, 1)

// When markers that represent the 
// routing places or searched places are created
appHooks.add('markersCreated', (markers) => {
  // Do something

  // Code example for customizing icons using material design icons https://material.io/resources/icons/

  // ### BEGINNING OF EXAMPLE

  // let markerIcoStyle = 'transform: rotate(+45deg); margin-left: 4px;margin-top: 2px;'

  // for (let key in markers) {
  //   let markerColor = '#c30b82' // maybe change the color based on the place properties ?
  //  let iconDivMarkerStyle = `width: 30px;height: 30px;border-radius: 50% 50% 50% 0;background: ${markerColor};position: absolute;transform: rotate(-45deg);left: 50%;top: 50%;margin: -15px 0 0 -15px;`
  //  let markerIcon = 'hotel' // maybe change the icon based on the place properties ?
    
  //  markers[key].icon = Leaflet.divIcon({
  //    className: 'custom-div-icon',
  //    html: `<div style='${iconDivMarkerStyle}'><i style='${markerIcoStyle}' class='material-icons'>${markerIcon}</i></div>`,
  //    iconSize: [30, 42],
  //    iconAnchor: [15, 42]
  //  })
  // ### END OF EXAMPLE
  // }
  return markers
}, 1)

appHooks.add('mapFiltersAdded', (filters) => {
  // Do something
}, 1)

appHooks.add('placeSearchArgsCreated', (args) => {
  // Do something
}, 1)

appHooks.add('autocompleteArgsCreated', (args) => {
  // Do something
}, 1)

appHooks.add('poisSearchArgsCreated', (args) => {
  // Do something
}, 1)

appHooks.add('reverseSearchArgsCreated', (args) => {
  // Do something
}, 1)

appHooks.add('isochronesArgsCreated', (args) => {
  // Do something
}, 1)

appHooks.add('routingArgsCreated', (args) => {
  // Do something
}, 1)

appHooks.add('routingElevationArgsCreated', (args) => {
  // Do something
}, 1)

appHooks.add('mapCenterChanged', (latlng) => {
  // Do something
}, 1)

appHooks.add('beforeOpenMarkerPopup', (hookData) => {
  // hookData has the following structure {marker: Object, markerPopupContainer: HtmlNode}
  // `markerPopupContainer` is an HTML node and can be manipulated.
  // It possible to remove and change existing content, as well
  // as add new VueJS component. See the example below.

  // ### BEGINNING OF EXAMPLE

  // The line below would remove the inner text

  // markerPopupContainer.innerText = ''

  // the line below would remove the inner html

  // markerPopupContainer.innerHTML = ''
  
  // this hook will be invoked every time the popup is about
  // to render. So, to avoid content multiple times
  // we check it the component was not already added
  
  //let buttons = markerPopupContainer.querySelectorAll('a')

  // If the VueJS component was not already added
  // if (buttons.length == 0) {
  // Don't forget to the the imports in the header 
  // for this example, it would be: 
  // import Vue from 'vue'
  // import {VBtn} from 'vuetify'
  //  var ComponentClass = Vue.extend(VBtn) // don't forget to add 
  //  var instance = new ComponentClass({ propsData: { color: 'primary' } })
  //  instance.$slots.default = [ 'Click me!' ]
  //  instance.$on(['click'], e => { console.log('event', e) })
  //  instance.$mount() // pass nothing
   
    // Finally append the instantiated vue 
    // component to the markerPopupContainer
    // markerPopupContainer.appendChild(instance.$el)
  // } 
  // ### END OF EXAMPLE
}, 1)

appHooks.add('beforeShowResolvedPlaceInfo', (hookData) => {
  
  // hookData has the following structure: 
  // { 
  //  placeInfo: { placeName: String, containerArea: String, clickInsidePolygon: Boolean, latlng: {lat:..., lng:...}},
  //  placeInfoContainer: HtmlNode
  // }
  // If the placeInfo.customHtml prop is set,
  // its content will be shown in the place
  // info box. If the prop hideDirectionsTo is set
  // the the hideDirectionsTo btn is not shown

  // It possible to remove and change existing content, as well
  // as add new VueJS component in the popupHtmlFragment. 
  // See the example in `beforeOpenMarkerPopup`
}, 1)

appHooks.add('beforeShowAvoidPolygonPopup', (hookData) => {
  // hookData has the following structure {polygon: Object, popupHtmlFragment: HtmlNode}
  // It possible to remove and change existing content, as well
  // as add new VueJS component in the popupHtmlFragment. 
  // See the example in `beforeOpenMarkerPopup`
}, 1)

appHooks.add('avoidPolygonEditModeEnabled', (polygonLayer) => {
  // Do something
}, 1)

appHooks.add('placeInputLabelBuilt', (hookData) => {
  // hookData has the following structure {label: String, supportDirections: Boolean, single: Boolean, placeModel: Place}
  // Do something
}, 1)

appHooks.add('drawingOptionsBuilt', (options) => {
  // Do something
}, 1)

appHooks.add('polylineMeasureOptionsBuilt', (options) => {
  // Do something
}, 1)

appHooks.add('beforeOpenIsochronePopup', (hookData) => {
  // hookData has the following structure {polygon: Object, isochronePopupContainer: HtmlNode}
  // isochronePopupContainer = an HTML node and can be manipulated,
  // It possible to remove and change existing content, as well
  // as add new VueJS component. See the example below.
  // See the example in `beforeOpenMarkerPopup`
  // Do something
}, 1)

appHooks.add('placeSearchAddressArgsDefined', (args) => {
  // Do something
})

appHooks.add('placeSearchPoisArgsDefined', (args) => {
  // Do something
})

appHooks.add('placeSearchResultPrepared', (places) => {
  // Do something

  // An array of places is expected to be returned
  return places
})

appHooks.add('placeSearchPromisesDefined', (promises) => {
  // Two promises, one for address/administrative localities and other for venus are created.
  // You could potentially replace one of them or both for custom requests.

  // ### BEGINNING OF EXAMPLE
  // let filters = { category_group_ids: [100] } // define a category that would be searched
  // let promise = Pois(filters, 100) // you would have to import pois, like: import { Pois } from '@/support/ors-api-runner'
  // return [promise]
  // ### END OF EXAMPLE
 return promises
})

appHooks.add('beforeUseMarkerClusterOptions', (options) => {
  // Do something

  // An options object must be returned
  return options
})

appHooks.add('beforeHandleDirectionsError', (response) => {
  // Do something
})

appHooks.add('beforeHandleIsochronesError', (response) => {
  // Do something
})

appHooks.add('beforeBuildIsochronesMapViewData', (responseData) => {
  // Do something
  return responseData // if null or false is returned, then the building will be aborted
})

appHooks.add('beforeBuildDirectionsMapViewData', (responseData) => {
  // Do something
  return responseData // if null or false is returned, then the building will be aborted
})

appHooks.add('avoidPolygonBtnTranslations', (translationsObject) => {
  // Do something
})

appHooks.add('zoomChanged', (hookData) => {
  // hookData has the following structure { zoom: Object, map: Object, context: Object}
  // Do something
})

appHooks.add('rightClickContentReady', (hookData) => {
  // hookData has the following structure = {context: Object, containerRef: Object, latlng: Object}
  // Do something
})

appHooks.add('layerProvidersLoaded', (hookData) => {
  // hookData has the following structure = {tileProviders: Object, overlayerTileProviders: Object, context: Object}
  // Do something
})

appHooks.add('floatingMenuItemsDefined', (menuItems) => {
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
  return menuItems
})

appHooks.add('aboutContentDefined', (hookData) => {
  // hookData has the following structure = {customAbout: HtmlNode, aboutContainer: HtmlNode, aboutLogo: HtmlNode}
  // Do something
})

*/