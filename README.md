# ORS map client

[![Test](https://github.com/GIScience/ors-map-client/actions/workflows/test.yml/badge.svg)](https://github.com/GIScience/ors-map-client/actions/workflows/test.yml)

This application implements a map client for the [openrouteservice API](https://openrouteservice.org/dev/#/api-docs/) as
Single Page Application (SPA). It is a base application that can be used for multiple purposes,
customized via configurations and extended via plug-ins.

The base application is using VueJS, Vuetify and a set of custom components, directives and services.
The structure uses a feature-by-folder design, allowing view, code and translation elements to be contained in a folder.

This app uses single file components and others non-native javascript code that are transpiled to native javascript
during the build process.
Therefore, the app needs to be compiled before running it either in dev or production mode.
The VueJS components allow a better code organization, weak and clear coupling between components and an easier
code understanding.

![ORS map client](docs/ors-map-client.png?raw=true "ORS map client")

## Sections

- [Set up and run](#set-up-and-run)
- [App folders](#app-folders)
- [App flow overview](#app-flow-overview)
- [Feature-by-folder design](#feature-by-folder-design)
- [Reserved methods and accessors](#reserved-methods-and-accessors)
- [pages](#pages)
- [Configuration, theming, customization and extension](#configuration-theming-customization-and-extension)
- [Add language](#add-language)
- [Menu](#menu)
- [Debug](#debug)
- [Build and deploy](#build-and-deploy)
- [Tests](#tests)
- [Contribute](#contribute)
- [Additional documentation](#additional-documentation)

### Set up and run

The app can be run with `docker`, `docker-compose`, and `natively`.

First of all, checkout the repository to get the relevant code:

```sh
git clone https://github.com/GIScience/ors-map-client.git
# Go to your local repository root folder
cd ors-map-client
```

##### Configure

In order to run the app either with `docker`, `docker-compose`, or `native`, you have to configure you application
first.

1. Copy the files in the `src/config-example` to `src/config`, without `-example` in their names. The files are:

- app-config-`example`.js => **app-config.js**
- ors-map-filters`-example`.js => **ors-map-filters.js**
- layer-zoom-mapping`-example`.js => **layer-zoom-mapping.js**
- hooks`-example`.js => **hooks.js**
- theme`-example`.js => **theme.js**
- default-map-settings`-example`.js => **default-map-settings.js**
- settings-options`-example`.js => **settings-options.js**

  If you are using a linux/unix compatible terminal, you can do that by running:

  ```sh
  cd src && cp config-examples/* config && for i in config/*-example.js; do mv -- "$i" "${i%-example.js}.js"; done
  ```

2. Set the app-config.js values for:

- `orsApiKey` - ORS API key to be used when ot running the app from localhost or ors valid domains
- `bitlyApiKey` - the Bitly key (used to shorten the share URL)
- `bitlyLogin` - the Bitly login (used to shorten the share URL)

3. The ORS menu is loaded/used by default. If you want to use a custom menu, have a look in the `hooks-example.js`.

The filters, theme and hooks of the map client can be customized if needed.

##### Run with `Docker`

```shell
# Build the image
docker build --tag ors-map-client:local .

# Run a container
docker run -d -it -v "$(pwd)"/nginx/logs:/var/log/nginx:rw -p 127.0.0.1:8080:80 --name ors-map-client ors-map-client:local

# Check the logs with
docker logs --follow ors-map-client
```

The app should now be running at http://127.0.0.1:8080.

##### Run with `docker-compose`

```shell
# Build and run the image
docker-compose up -d

# Check the logs with
docker-compose logs -ft
```

The app should now be running at http://127.0.0.1:8080.

##### Run `natively`

Run the app locally without docker in three steps: set the environment up, and define a configuration file.

1. To manage dependencies and pack the app it is necessary to have Node version 16.
   If you already have it, skip this step.
   If you don't, please install it by running:

```sh
curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
apt-get update && \
apt-get install -y nodejs && \
npm install -g pnpm && \
npm update -g
# The installation of dependencies is required before running the app:
pnpm install
```

At this point the app is ready to run in `dev` mode. Do it by executing the following command in the app root folder:

```sh
pnpm dev
# This will start a standalone http node server and the host and port to access it will be displayed
```

### App folders

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

### App flow overview

This is a Single Page Application (SPA). This means that the client app is loaded in the browser and defines which
components and pages are processed based on the browser URL.
The app watches every change in the browser URL and updates its state based on that.
These URL changes don't trigger a request to the back-end directly, but the components loaded/updated will decide which
requests must be run to load the required data.
Meaning, that the front-end (this app) is decoupled from the back-ends (ORS API and ORS website)

The app load cycle follows these steps:

1. Execute the `main.js` file and add global extensions, mixins components and external libs. The file `main.js` also includes the main files of the router, vuex-store and i18n-translations, which will internally load all `.router.js` ,`.store.js` and `.i18n.js` files from sub-folders.
2. `main.js` will run a request to get necessary data from a service and then create a VueJS app instance and load the `App.vue`. At this point `AppHooks` is set up and attached to the main VueJS instance and then the `appLoaded` hook is called.
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

### Feature-by-folder design

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

### Reserved methods and accessors

All the VueJS components created (including the fragments) will have, by default, the following methods/accessors
defined in the main vue instance app:

- `showMessage (msg, theme, options)` - shows a message using the toaster with specified theme and options

- `showError (msg, options)` - shows an error message using the toaster with the specified options

- `showWarning (msg, options)` - shows a warning message using the toaster with the specified options

- `showInfo (msg, options)` - shows an info message using the toaster with the specified options

- `showSuccess (msg, options)` - shows a success message using the toaster with the specified options

- `confirmDialog (title, text, options)` - shows a confirm-dialog with the specified title, text and options and returns
  a promise. If the user clicks `yes`, the promise will be resolved, if s/he clicks on `no`, the promise will be rejected.

- `$store` - accessor to app vuex-store

### Pages

- `maps` - the page where the user can search places, routes and create isochrones.

### Configuration, theming, customization and extension

The map client app can be configured, customized and extended. Several aspects can be defined/changed in order to
disable features, customize visual identity and change/extend its features/behaviors.
It is also possible to add custom plug-ins to the app and subscribe to hooks, listen and emit events.
The items of the menu can also be customized via hooks.

It is possible to define your custom settings and plug-ins and keep getting updates from the ORS repository because
the `src/plugins` and `src/config` folders are not versioned.
To keep the original ors-map-client as a secondary repository, do the following:

```sh
# Rename the original remote
git remote rename origin ors-map-client-origin

# Add your remote as the origin one
git remote add origin <git-repo-url>

# Set your new origin as the default upstream
git branch --set-upstream-to=origin/master
```

After doing this we recommend you to remove from `.gitignore` the lines that tell git to ignore the folders
`/src/config`, `src/plugins` and eventually `/static`.
Then, run the initial push to the just defined new origin repository, with the following command:

```sh
git push -u origin master
```

The ways to change/extend the app are:

1. Define custom settings (see files in `src/config`) that will change the standard way that the app works.
1. Add hook listeners in `src/config/hooks.js` and run custom code inside those hooks
1. Create a plug-in that has its methods linked to hooks called during the app flow
   (see `src/plugins/example-plugin/`)

#### Configuration

It is possible to configure/disable some app features and behaviors by changing the values
of the `src/config/app-config.js`. It is also possible to change the app theme/colors by changing the values of
`src/config/theme.js`.
The app logo can also be changed in the `src/config/app-config` file.
The available filters/options to be used in the services are defined in the `src/config/ors-map-filters.js`.
They can be adjusted according the needs. Other files can be used to adjust app configurations are the
`layer-zoom-mapping.js`, `settings-options.js` and the `default-map-settings.js`.

#### Plug-ins

It is possible to add plug-ins to the application in order to change its behavior or extend it.
Please check [docs/plugins.md](docs/plugins.md) for more details.

### Add language

#### - Generate a translation file

If you just want to translate the application strings for a certain language, but you don't have the skills to `"code"`
it into the app, just download the [en-translation-source-merged.json](/docs/en-translation-source-merged.json),
translate it, and contact us.

\*_Check the file [src/i18n/i18n-builder.js](src/i18n/i18n-builder.js) to see how to generate merged translation sources_

#### - Add a language to the app

The app uses a feature-by-folder design, so each component might have its own translation strings.
That is why there is no single translation file. If you want to add a translation and `"implement"` it into the app,
follow the steps below.

- Create a copy of the /src/i18n/translations/`en-us` folder giving it the identification of the target language.
  For example: if you are adding the French from France, then the folder should be called `fr-fr`.

- Edit the `builder.js` file inside the just created folder in order to replace the language pattern to the one you are
  creating.
  For example, similar to `/\.i18n\.en-us\.js$` add `/\.i18n\.fr-fr\.js$`.

- Translate the language strings for each key in the `global.js` file

- Search for each file inside the `/src` folder that ends with `i18n.en-us.js` and create a copy of it and each one so
  that each new created file now ends with `i18n.fr-fr.js`. If you are using a linux/unix compatible terminal, you can do that by running:

  ```sh
  find . -name "*i18n.en-us.js" -exec bash -c 'cp "$0" "${0/i18n.en-us.js/i18n.fr-fr.js}"' {} \;
  # where the last occurrence of locale id (in this case `fr-fr`) is the one you are creating
  ```

- Translate the language strings for each key in all the files created in the previous step.

- Edit `/src/config/settings-options.js` and add the new locale object to the `appLocales` array (e.g.
  `{ text: 'Français FR', value: 'fr-fr' }`).

- Open the src/i18n/`i18n-builder.js` file and apply the following changes:

  - Import the object from the new language builder that you just created
    (e.g. `import frFRTranslations from './translations/fr-fr/builder'`)

  - Inside the `build` method, add:

    - the new language placeholder object to the messages object (e.g. `, 'fr-fr': {}`).

    - the result of the new language building to the previously created message object
      (e.g. `i18n.messages['fr-fr'] = frFRTranslations.build()`.

  - Save all the files changed and rebuild the application.

### Menu

The menu displayed in the header and in the sidebar (low resolution and mobile devices) is loaded from the ORS website
back-end and adjusted to be shown according the resolution.

The menu items are fetched on the app load (`src/app-loader.js`).
It dispatches the store `fetchMainMenu` and `@/common/main-menu.js` retrieves the menu that uses
`@/support/menu-manager.js` and `@/support/model-service.js`.
Once the items from the back-end are loaded, `MenuManager` adds or removes custom items and defines icons for sidebar
items.
The items displayed on the menu can be changed by running custom code on the `loadMenuItems` and/or the
`modifyMenu` hooks. Check the `/src/config-example/hooks-example.js` to see more details.

### Debug

If you are using [WebStorm](https://www.jetbrains.com/webstorm/download) you should set the
_webpack config_ (settings -> Languages & Frameworks -> JavaScript -> Webpack) to
`{path to ors-map-client}/build/webpack.base.conf.js` to resolve file paths correctly.

To debug the application you must run it in [`dev` mode](#set-up-and-run).
For better debugging in your browser install the [VueJS devtools](https://github.com/vuejs/vue-devtools#installation)
extension.
After doing that, open the application in the browser and press F12 and select the tab `Console`, `Vue` or `Sources`
(and then expand e.g.: `webpack://src`).

### Build and deploy

The app must be built before it is deployed. To do so, run:

```sh
cd <project-root-folder>/
pnpm build
```

_Important:_ to run the built application you have to set up a web server and put this repository (after the build)
there.
The `index.html` at the root of this repository will load the app.

For a detailed explanation on how webpack works, check out the [guide](http://vuejs-templates.github.io/webpack/) and
[docs for vue-loader](http://vuejs.github.io/vue-loader).

### Tests

Testing is done using the [cypress](https://docs.cypress.io) testing framework.

All tests (End-to-end(e2e), component and unit) can be executed by running:

```sh
pnpm test:ci
```

During development, you start the development server and use the following command which opens the cypress UI interface
to view the test output and hot reload after making changes:

```shell
# and do 'pnpm dev' before
pnpm test
```

You can run tests in any standard browser that you have installed.
If you are new to cypress check out the "[Getting started](https://docs.cypress.io/guides/getting-started/opening-the-app)"
documentation, and keep it close.
An overview on the usable [assertions](https://docs.cypress.io/guides/references/assertions) will help with simple
test cases.

#### Structure

Component tests should be written in the component itself e.g.
`../fragments/MyComponent.cy.js` for `../fragments/MyComponent.vue`

Unit tests for js source files should be created in a separate `./__tests__` folder next to the source file and for the sake of
clarity be named the same e.g. `../support/__tests__/utils.cy.js` for `../support/utils.js`

End-to-end tests should be created in `./cypress/e2e/test-name.cy.js`

### Contribute

#### pre-commit git hooks

We use `pre-commit` to make sure contributions have the same basic quality.
Before you commit make sure that your commit satisfies all `pre-commit` checks.
For details on individual checks see `.pre-commit-config.yaml`.

```bash
# Install the pre-commit git hooks to be automatically executed before committing.
pre-commit install --hook-type commit-msg --hook-type pre-push --hook-type pre-commit
# Manually run all pre-commits. The first execution will setup the environment and can take some time.
pre-commit run --all
```

#### Commits and versioning

- This app uses the `commitizen` plugin to generate standardized commit types/messages. After applying any change in a feature branch, use `git add .` and then `pnpm commit` (instead of `git commit ...`)
- The plugin `standard-version` is used to generate changelog entries, version tag and to bump the app version in package.json.

Deployment flow:

1. Apply the changes in a feature branch and test it locally

   _Important_: to run the tests, `src/config/app-config.js` must contain:

- `orsApiKey`: 'a-valid-ors-api-key-here',
- `useUserKey`: true,

By default, `src/config/app-config.js` is ignored by git. So, the changes are just local and used to run the tests.

```sh
# Run automated tests
pnpm test:ci
```

_Important:_ Besides the automated tests, some manual/human tests are also recommended

2. Once the feature is ready, merge it to `master`, and run the tests

   ```sh
   git checkout master
   git merge feature/<name-of-my-future-branch>
   # Run automated tests after merge
   pnpm test
   ```

3. If the tests pass, create a release

   ```sh
   # Create a release. This will :
   # - bump the app version,
   # - generate a new release commit
   # - create a new git tag with the app version
   # - Create an entry in CHANGELOG.md
   pnpm release
   ```

4. Push the changes applied to master

   _Important_: the release command will output a command, but We `DON'T USE the whole outputted command`, since there is no npm package to be published.

   ```sh
   # The command outputted is expected to be:
   # `git push --follow-tags origin master && pnpm publish`

   # We must use/run only
   git push --follow-tags origin master

   # Once you push it, the automated tests will be triggered on Github actions
   # Check the automated tests results on https://github.com/GIScience/ors-map-client/actions
   ```

_For more details about `commitizen` and `standard-version` see [this article](https://medium.com/tunaiku-tech/automate-javascript-project-versioning-with-commitizen-and-standard-version-6a967afae7)_ and [standard-version documentation](https://github.com/conventional-changelog/standard-version)

#### Branch policy

The `master` branch is used as the stable and most updated branch. Any new feature goes to feature branch, then it is tested, committed and finally merged into `master`. So, master has always the latest version and the production version.
Considering this, any merge request must be done targeting `master`.

Like almost every team, we have limited workforce, and we have to define priorities.

`Bugs`:
If you think you have identified any bug and that you can help to fix it, please create an issue first, instead of directly submitting a push request. So the people involved will have the opportunity to discuss it.

`New features`:

If you want to contribute by adding a new feature or improve an existing one, please also create an issue.
We do want contributions, and the community effort is very important to us, but features may add complexity and future
maintenance effort.
Because of this, we have also to analyze the trade-off of such contributions.
We just have to decide about them together before the hands on.
This approach is intended to create cohesion and keep the project sustainable.

### Additional documentation

There are additional documents that are part of the software documentation. they are in the folder `/docs` and are listed below:

- [docs/dynamic-inputs.md](docs/dynamic-inputs.md) - describe how the inputs are rendered using a custom engine and not hard-coded
- [docs/search-results-criteria.md](docs/search-results-criteria.md) - explains what are the criteria for the search results
- [docs/plugins.md](docs/plugins.md) - explains how the plugins can be added to the maps client
