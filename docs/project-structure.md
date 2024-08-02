# Project structure

App folder structure under `src`:

- `assets` - images and icons storage
- `common` - available mixins, http client, main menu, Vue with Vuetify and theme
- `directives` - custom directives
- `filters` - custom filters
- `fragments` - all app fragments used by pages
- `i18n` - internationalization resources
- `models` - models used to deal transport ors response data and deals with app state and transitions
- `pages` - app pages (currently only the `maps` page is available)
- `resources` - support files like the loader lib, definitions and options used to process requests and responses
- `router` - router component based on vue-router components
- `store` - app store definitions
- `support` - support utilities, like geo-utils, ors-api-runner, routes-resolver and app modes

## App flow overview

This is a Single Page Application (SPA). This means that the client app is loaded in the browser and defines which
components and pages are processed based on the browser URL.
The app watches every change in the browser URL and updates its state based on that.
These URL changes don't trigger a request to the back-end directly, but the components loaded/updated will decide which
requests must be run to load the required data.
Meaning, that the front-end (this app) is decoupled from the back-ends (ORS API and ORS website)

The app load cycle follows these steps:

1. Execute the `main.js` file and add global extensions, mixins components and external libs. The file `main.js` also includes the main files of the router, vuex-store and i18n-translations, which will internally load all `.router.js` ,`.store.js` and `.i18n.js` files from sub-folders.
2. `main.js` will run a request to get necessary data from a service and then create a Vue.js app instance and load the `App.vue`. At this point `AppHooks` is set up and attached to the main Vue.js instance and then the `appLoaded` hook is called.
3. `App.vue` includes all basic navigation components, like menu, sidebar, footer etc.
4. After loading all routes (including the ones in the `pages` sub folder) the page with the `/` route (`Maps.vue`) will
   also be rendered in the `<router-view></router-view>` slot in `App.vue` component.

Data flow, state and requests to services, in a simplified view, happens as follows:

- The app is loaded
  1. the API data are fetched from ORS website service and if `appConfig.appMenu.useORSMenu` is **true**, the menu items
     are loaded in `src/main.js` using `src/app-loader.js`.
  2. the app `mode` is defined based on the matching URL in the `maps.route.js`
  3. the `maps` page, uses the app mode utility to define the app state using the current `mode`.
     This utility will also populate the values of the `ors-map-filters` based on the URL and build the `AppRouteData`
     (in src/models/app-route-data.js).
  4. based on the app mode/state certain components are activated/displayed
  5. Every component, once activated, may use the data in `src/config/ors-map-filters` to render its elements and may
     run requests to the ORS api using the `src/support/ors-api-runner`.
     Once the request succeed, the response data will be used to fill the `MapViewData` object.
  6. Once an input is changed the app goes to a new URL and this makes the flow restart at the step 2.
  7. If a component changes the `MapViewData` model, it emits an event to the `maps` page, that passes the current
     `MapViewData` object to the `MapView` component.
  8. Interactions via `MapView` may result in events sent back to `maps` page, that may notify other child components,
     that in their turn may change the URL and trigger the step 2 again.
  9. Several app hooks are called during the app flow, and it is possible to listen to these hooks and run custom code
     to modify some app behavior.
     The available hooks are listed in `src/config-examples/hooks-example.js` and must be coded in `src/config/hooks.js`.

## Feature-by-folder design

This app uses feature by folder components and predefined folders where the business code should be placed in.
Example of this design usage:

Page:

- my-page-name (folder)
  - MyPageName.vue (main VueJS component file)
  - my-page-name.css (styles for the page, included by the MyPageName.vue component)
  - my-page-name`.store.js` (Vuex store module for the page, included by the store/store.js loader)
  - my-page-name`.route.js` (route to reach this page, included by the router/index loader)
  - i18n (folder)
    - my-page-name`.i18n.en.js` (in this example containing the EN resources for the page)

Component:

- my-fragment-name (folder under `src/fragments/`)

  - MyFragmentName.vue (main VueJS component file)
  - my-fragment-name.css (styles for the page, included by the MyFragmentName.vue component)
  - my-fragment-name`.store.js` (Vuex store module for the fragment, included by the store/store.js loader)
  - i18n (folder)
    - my-fragment-name`.i18n.en.js` (in this example containing the EN resources for the component)

The app will automatically load:

- all the locale resources in i18n folder ending with `.i18n.*.js` where `*` is the locale
- the defined routes in files ending with `.routes.js`
- the store definitions in files ending with `.store.js`

## Reserved methods and accessors

All the Vue.js components created (including the fragments) will have, by default, the following methods/accessors
defined in the main vue instance app:

- `showMessage (msg, theme, options)` - shows a message using the toaster with specified theme and options

- `showError (msg, options)` - shows an error message using the toaster with the specified options

- `showWarning (msg, options)` - shows a warning message using the toaster with the specified options

- `showInfo (msg, options)` - shows an info message using the toaster with the specified options

- `showSuccess (msg, options)` - shows a success message using the toaster with the specified options

- `confirmDialog (title, text, options)` - shows a confirm-dialog with the specified title, text and options and returns
  a promise. If the user clicks `yes`, the promise will be resolved, if s/he clicks on `no`, the promise will be rejected.

- `$store` - accessor to app vuex-store

## Pages

- `maps` - the page where the user can search places, routes and create isochrones.

## Menu

The menu displayed in the header and in the sidebar (low resolution and mobile devices) is loaded from the ORS website
back-end and adjusted to be shown according the resolution.

The menu items are fetched on the app load (`src/app-loader.js`).
It dispatches the store `fetchMainMenu` and `@/common/main-menu.js` retrieves the menu that uses
`@/support/menu-manager.js` and `@/support/model-service.js`.
Once the items from the back-end are loaded, `MenuManager` adds or removes custom items and defines icons for sidebar
items.
The items displayed on the menu can be changed by running custom code on the `loadMenuItems` and/or the
`modifyMenu` hooks. Check the `/src/config-example/hooks-example.js` to see more details.
