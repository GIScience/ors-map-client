# ORS map client #

This application implements a map client for the [openrouteservice API](https://openrouteservice.org/dev/#/api-docs/) as Single Page Application (SPA).

The base application is built using VueJS, Vuetify and a set of custom components, directives and services. The structure uses a feature-by-folder design, allowing view, code and translation elements to be contained in a folder.

This app uses single file components and others non-native javascript code that are transpiled to native javascript during the build process. That is way the app needs to be compiled before running it either in dev or production mode.
The VueJS components allow a better code organization, weak and clear coupling between components and an easier code understanding.

## Sections ##

- [Set up and run locally](#set-up-and-run-locally)
- [App folders](#app-folders)
- [App flow overview](#app-flow-overview)
- [Feature-by-folder design](#feature-by-folder-design)
- [CRUD component](#crud-component)
- [Reserved methods and accessors](#reserved-methods-and-accessors)
- [pages](#pages)
- [Configuration and theming](#configuration-and-theming)
- [plug-ins](#plug-ins)
- [Add language](#add-language)
- [Menu](#menu)
- [Debug](#debug)
- [Build and deploy](#build-and-deploy)
- [Contribute](#contribute)

### Set up and run locally ###

Run the app locally in three steps: set the environment up, get the code and define a configuration file.

1. To manage dependencies and pack the app it is necessary to have Node version 12. If you already have it, skip this step. If you don't, please install it by running:

```sh
curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
apt-get update && \
apt-get install -y nodejs && \
npm install -g npm && \
npm update -g
```

2. Clone the repository of the ORS Map Client, go to the root folder and install the dependencies:

```sh
git clone https://github.com/GIScience/ors-map-client.git

# Go to your local repository root folder
cd ors-map-client

# The installation of dependencies is required before running the app:
npm install
```

3. In the `src/config` folder, create a copy of the following files, without `-example` in their names:

- app-config-`example`.js => **app-config.js**
- ors-map-filters`-example`.js => **ors-map-filters.js**
- layer-zoom-mapping`-example`.js => **layer-zoom-mapping.js**
- hooks`-example`.js => **hooks.js**
- theme`-example`.js => **theme.js**
- default-map-settings`-example`.js => **default-map-settings**
- settings-options`-example`.js => **settings-options**

4. Set the app-config.js values for:

- `userApiKey` - ORS API key to be used when ot running the app from localhost or ors valid domains
- `bitlyApiKey` - the bitly key that will be used to shorten the share URL
- `bitlyLogin` - the bitly login that will be used to shorten the share URL

5. The ORS menu is loaded/used by default. If you want to use a custom menu, have a look in the hooks-example.js

The map client filters, the theme and the hooks can be customized, if you need.

At this point the app is ready to run in `dev` mode. Do it by executing the following command in the app root folder:

```sh
npm run dev
# This will start a standalone http node server and the host and port to access it will be displayed
```

### App folders ###

App folder structure under `src`:

- `assets` - where the images and icon sare stored
- `common` - available mixins, http client, main menu, Vue with Vuetify and theme
- `crud` - custom CRUD solution to interact with data repository
- `directives` - custom directives
- `filters` - custom filters
- `fragments` - all app fragments used by pages
- `i18n` - internationalization resources
- `models` - models used to deal transport ors response data and deals with app state and transitions
- `pages` - app pages. currently only the `maps` page is available
- `resoures` - where support files like the loader lib, definitions and options used to process requests, responses are placed
- `router` - router component based on vue-router
- `shared-services` - shared services that can be used by various components
- `store` - app store definitions
- `support` - support utilities, like geo-utils, ors-api-runner, routes-resolver and app modes

### App flow overview ###

This is a Single Page Application (SPA). This means that the client app is loaded on the browser and defines which components and pages are processed based on the browser URL. The app watches every change in the browser URL and updates its state based on that. These URL changes don't trigger a request to the back-end directly, but the components loaded/updated will decide which RESTfull requests must be run to load the required data. In other words, it means that the front-end (this app) is decoupled from the back-ends (ORS API and ORS website)

The app load cycle follows these steps:

1. Execute the `main.js` file and add global extensions, mixins components and external libs.
2. The registered hooks are loaded and the `appLoaded` hook is run.
3. The `main.js` also includes the main router script, the main vuex store and the main i18n file, that will internally, each one, load all the additional `.router.js` files, `.store.js` files and `.i18n.js` files.
4. `main.js` file will create a VueJS app instance and load the `App.vue`. At this point `AppHooks` is set up and attached to the main VueJS instance and the hook `appLoaded` is run.
5. `App.vue` includes all basic navigation components, like menu, sidebar, footer and etc.
6. As soon as all the routes are loaded, including the ones in the `pages` sub folder, the page with the `/` route will also be rendered in the `<router-view></router-view>` in `App.vue` component.

Data flow, state and requests to services, in a simplified view, happens as follows:

- The app is loaded
  1. the API data are fetched from ORS website service and if `appConfig.appMenu.useORSMenu` is **true**, the menu items are loaded in `src/main.js` using `src/app-loader.js`.
  2. the app `mode` is defined based on the matching URL in the `maps.route.js`
  3. the `maps` page, uses the app mode utility to define the app state using the current `mode`. This utility will also populate the values of the `ors-map-filters` based on the URL and build the `AppRouteData` (in src/models/app-route-data.js).
  4. based on the app mode/state certain components are activated/displayed
  5. Every component, once activated, may use the data in `src/config/ors-map-filters` to render its elements and  may run requests to the ORS api using the `src/support/ors-api-runner`. Once the request succeed, the response data will be used to fill the `MapViewData` object.
  6. Once an input is changed the app goes to a new URL and this makes the flow restart at the step 2.
  7. If a component changes the `MapViewData` model, it emits an event to the `maps` page, that passes the current `MapViewData` object to the `MapView` component.
  8. Interactions via `MapView` may result in events sent back to `maps` page, that may notify other child components, that in their turn may change the URL and trigger the step 2 again.
  9. Several app hooks are called during the app flow and and it is possible to listen to these hooks and run custom code to modify some of the app behavior. The available hooks are listed in `src/config/hook-example.js` and must be coded in `src/config/hooks.js`.

### Feature-by-folder design ###

This app uses feature by folder components and predefined folders where the business code should be placed in. Example of this design usage:

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

### CRUD component ###

The generic crud solution allows the communication with a back-end api with minimum code.
You just need to define the endpoint of a resource and add the crud to a component by instantiating it to a vue.js component. See more at [CRUD docs](docs/crud.md)

### Reserved methods and accessors ###

All the VueJS components created (including the fragments) will have, by default, the following methods/accessors define din the main vue instance app:

- `showMessage (msg, theme, options)` - shows a message using the toaster with specified theme and options

- `showError (msg, options)` - shows an error message using the toaster with the specified options

- `showWarning (msg, options)` - shows a warning message using the toaster with the specified options

- `showInfo (msg, options)` - shows an info message using the toaster with the specified options

- `showSuccess (msg, options)` - shows a success message using the toaster with the specified options

- `confirmDialog (title, text, options)` - shows a confirm dialog with the specified title, text and options and returns a promise. If the user clicks `yes`, the promise will be resolved, if s/he clicks on `no`, the promise will be rejected.

- `eventBus` - accessor to global event bus object, that allows to broadcast and get events in all components

- `$http` - accessor to custom wrapped axios http client, encapsulating authentication and loading bar status

- `$store` - accessor to app store that used vuex

- `lodash` - accessor to lodash lib, useful for manipulate arrays an objects.

### Pages ###

- `maps` - the page where the user can search places, routes and create isochrones.

### Configuration and theming ###

It is possible to configure/disable some app features and behaviors by changing the values
of the `src/config/app-config.js` values. Some of the configurable items are:
disabledActionsForIsochrones,  disabledActionsForPlacesAndDirections, logoImgSrc, footerDevelopedByLink,
supportsPlacesAndDirections, supportsIsochrones, supportsMapFiltersOnSidebar, sidebarStartsOpenInheighResolution,
mapTileProviders, defaultTileProvider. Check the config file to see all the possibilities.

It is possible to change the app theme colors by changing the values of `src/config/theme.js`

### Plug-ins ###

It is possible to add plug-ins to the application to change its behavior or extend it.
Please check the `src/plugins folder, the [plugins readme](src/plugins/readme.md) readme and the and the [plugin example](src/plugins/plugin-example/plugin-example.js) for more details.

### Add language ###

Follow the steps below to add a language.

- Create a copy of the /src/i18n/translations/`en-us` folder giving it the identification of the target language. For example: if you are adding the French from France, then the folder should be called `fr-fr`.

- Edit the builder.js file inside the just created folder in order to replace the language pattern to the one you are creating. For example, where is /\.i18n\.`en-us\`.js$, put /\.i18n\.`fr-fr`\.js$

- Translate the language strings for each key in the `global.js` file

- Search for each file inside the `/src` folder that ends with `i18n.en-en.js` and create a copy of it and each one so that each new created file now ends with `i18n.fr-fr.js`

- Translate the language strings for each key in all the files created in the previous step.

- Edit the /src/config/`settings-options.js`and add the new locale object to the `appLocales` array. For this example, you would add { text: 'Français FR', value: 'fr-fr' }

- Open the src/i18n/`i18n-builder.js` file and apply the following changes:
  - Import the object from the new language builder that you just created. For this example it would be `import frFRTranslations from './translations/fr-fr/builder`'

  - Inside the `build` method, add the new language placeholder object to the messages object. For this example you would add `, 'fr-fr': {}`
  
  - Still inside the `build` method, add the result of the new language building to the previously created message object. In this example you would add: `i18n.messages['en-us'] = frFRTranslations.build()`
  
  - Save all the files changed and rebuild the application.

### Menu ###

The menu displayed in the header and in the sidebar (low resolution and mobile devices) is loaded from the ORS website back-end server and adjusted to be shown according the resolution.

The menu items are fetched on the `created` event of the `@/fragments/Header` component.
It dispatches the store `fetchMainMenu` and the menu is retrieved by `@/common/main-menu.js` that internally uses `@/support/menu-manager.js` and `@/support/model-service.js`.
Once the items from the back-end are loaded, they are used to add/remove custom items and define sidebar item icons in `@/common/main-menu.js`.

### Debug ###

If you are using [WebStorm](https://www.jetbrains.com/webstorm/download) you should set the
_webpack config_ (settings -> Languages & Frameworks -> JavaScript -> Webpack) to `{path to ors-map-client}/build/webpack.base.conf.js` so the file paths are resolved correctly.

To debug the application you must run it in [`dev` mode](#set-up-and-run-locally).
For better debugging in your browser install the [VueJS devtools](https://github.com/vuejs/vue-devtools#installation) extension.
After doing that, open the application in the browser and press F12 and select the tab `Console`, `Vue` or `Sources` (and then expand e.g.: `webpack://src`).

### Build and deploy ###

The app must be built before it is deployed. To do so, run:

```sh
cd <project-root-folder>/
npm run build
```

*Important:* to run the built application you must to set up a web server and put this repository (after the build) there. The `index.html` at the root of this repository is expected to load the app.

For a detailed explanation on how webpack works, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### Contribute ###

Any comment, feedback or contribution is very welcomed!

But, like almost every team, we have limited workforce and we have to define priorities.

`Bugs`:
If you have identified any bug and think that you can help fixing it, please create an issue first, instead of directly submitting a push request. So the people involved will have the opportunity to discuss it.

`New festures`:
If you want to contribute by adding a new feature or improve an existing one, please also create an issue. We do want contributions and the community effort is very important to us, but features may add complexity and future maintenance effort. Because of this, we have also to analyze the trade off of such contributions. We just have to decide about them together before the hands on. This approach is intended to create cohesion and keep the project sustainable.

#### Current needs ####

As you may notice, this project is an on going project and thus, there is a lot of room for improvement. We already have in mind some of these possible improvements and some of them are listed below:

- `Tests` (unit, e2e) - we need it, but we were not able to implement it yet. It is one of the priorities of our list. So, if you can contribute with it, please let us know.
- `Rendering performance` - we are continuously looking for performance improvement. If you think you can suggest a better way to deal with the rendering phase in a way that it improves the speed, please tell us. We are relying on [Vue2leaflet](https://github.com/vue-leaflet/Vue2Leaflet) for this.
- `Accessibility` of the app for people with special needs
- `User test` to check that the app works in multiple browsers, resolutions and devices (versions of Mac, Windows, Linux, Android and Iphone) and their multiple possible browsers
