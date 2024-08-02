# ORS map client

[![Test](https://github.com/GIScience/ors-map-client/actions/workflows/test.yml/badge.svg)](https://github.com/GIScience/ors-map-client/actions/workflows/test.yml)

This application implements a map client for the [openrouteservice API](https://openrouteservice.org/dev/#/api-docs/) as
Single Page Application (SPA). It is a base application that can be used for multiple purposes,
customized via configurations and extended via plug-ins.

The base application is using Vue.js, Vuetify and a set of custom components, directives and services.
The structure uses a feature-by-folder design, allowing view, code and translation elements to be contained in a folder.

This app uses single file components and others non-native javascript code that are transpiled to native javascript
during the build process.
Therefore, the app needs to be compiled before running it either in dev or production mode.
The Vue.js components allow a better code organization, weak and clear coupling between components and an easier
code understanding.

![ORS map client](docs/ors-map-client.png?raw=true "ORS map client")

## Set up and run

The app can be run with `docker`, `docker-compose`, and `natively`.

First of all, checkout the repository to get the relevant code:

```sh
git clone https://github.com/GIScience/ors-map-client.git
# Go to your local repository root folder
cd ors-map-client
```

### Configure

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

2. Set the app-config.js values for `orsApiKey` to be used when not running the app from valid ors domains

3. The ORS menu is loaded/used by default. If you want to use a custom menu, have a look in the `hooks-example.js`.

The filters, theme and hooks of the map client can be [customized](#configuration-theming-customization-and-extension)
if needed.

### Run with `Docker`

```shell
# Build the image
docker build --tag ors-map-client:local .

# Run a container
docker run -d -it -v "$(pwd)"/nginx/logs:/var/log/nginx:rw -p 127.0.0.1:8080:80 --name ors-map-client ors-map-client:local

# Check the logs with
docker logs --follow ors-map-client
```

The app should now be running at http://127.0.0.1:8080.

### Run with `docker-compose`

```shell
# Build and run the image
docker-compose up -d

# Check the logs with
docker-compose logs -ft
```

The app should now be running at http://127.0.0.1:8080.

### Run `natively`

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

### Build and deploy

The app must be built before it is deployed. To do so, run:

```sh
cd <project-root-folder>/
pnpm build
```

The built files are meant to be served by a web server like nginx or apache.
You can try if everything works locally e.g. with:
```sh
pnpx http-server .
```

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

### Report a bug
If you identified a bug, please [create an issue](https://github.com/GIScience/ors-map-client/issues/new) with thorough description
and steps to reproduce it (e.g. URL, Screenshot or Screen recording). Feel free to [contribute a fix](#contribute)

### Feature improvements
If you have an idea for a new feature or want to improve an existing one, please also
[create an issue](https://github.com/GIScience/ors-map-client/issues/new) first to discuss the idea.
We are happy if you also want to [contribute](#contribute) a pull request.

### Contribute

Make sure to [set up](#set-up-and-run) and [configure](#configuration) the project, branch of current `main` and prefix
your branch name with `feat/` for features and `fix/` for bug fixes e.g.
```sh
git switch -c feat/leaflet-control-for-statistics
# or
git switch -c fix/map-moving-all-the-time
```

#### set up pre-commit git hooks

We use `pre-commit` to make sure contributions have the same basic quality.
Before you commit make sure that your commit satisfies all `pre-commit` checks.
For details on individual checks see `.pre-commit-config.yaml`.

```bash
# Install the pre-commit git hooks to be automatically executed before committing.
pre-commit install --hook-type commit-msg --hook-type pre-push --hook-type pre-commit
# Manually run all pre-commits. The first execution will setup the environment and can take some time.
pre-commit run --all
```

#### Commits

- This app uses [conventional commit syntax](https://www.conventionalcommits.org/en/v1.0.0/#summary) to automate
  changelog entries.
  You can use e.g. [conventional-commits-plugin](https://plugins.jetbrains.com/plugin/13389-conventional-commit) for
  JetBrains IDEs or a global installation of the [commitizen npm package](https://github.com/commitizen/cz-cli) to help
  you with the syntax.

> Note:
> Don't add `closing` or `fixes` keywords in commits but rather tag the issue in the pull request that solves it.
> This avoids multiple references in the issues after your branch is rebased on newer changes.


#### Add language

##### - Generate a translation file

If you just want to translate the application strings for a certain language, but you don't have the skills to `"code"`
it into the app, just download the [en-translation-source-merged.json](/docs/en-translation-source-merged.json),
translate it, and contact us.

\*_Check the file [src/i18n/i18n-builder.js](src/i18n/i18n-builder.js) to see how to generate merged translation sources_

##### - Add a language to the app

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
      (e.g. `i18n.messages['fr-fr'] = frFRTranslations.build()`).

  - Save all the files changed and rebuild the application.

#### Debug

If you are using [WebStorm](https://www.jetbrains.com/webstorm/download) you should set the
_webpack config_ (settings -> Languages & Frameworks -> JavaScript -> Webpack) to
`{path to ors-map-client}/build/webpack.base.conf.js` to resolve file paths correctly.

To debug the application you must run it in [`dev` mode](#set-up-and-run).
For better debugging in your browser install the [Vue.js devtools](https://github.com/vuejs/vue-devtools#installation)
extension.
After doing that, open the application in the browser and press F12 and select the tab `Console`, `Vue` or `Sources`
(and then expand e.g.: `webpack://src`).

#### USB debugging

To debug the client on a mobile phone you can follow e.g. [this guide](https://chenhuijing.com/blog/debugging-firefox-on-android/#%F0%9F%8F%80).

### Releasing a new Version

1. Create a `chore/release-v*.*.*` branch with the new version from `main` branch (use [semantic versioning](https://semver.org/))
    ```sh
    git checkout main && git switch -c chore/release-v*.*.*
    ```
2. Run the release script to bump version, create changelog entries and release tag
    ```sh
   pnpm release
    ```
3. Make sure the changelog & version is what you expected and adjust if needed
   - adjust branch name: `git branch -m chore/release-<new-version>`
   - adjust changelog or version in files. Then amend commit and re-tag:
     ```sh
     git commit --amend
     git tag -fa v*.*.* -m 'v*.*.*'
     ```
4. Push the release branch to remote
    ```sh
    git push --set-upstream origin $(git_current_branch)
   ```
5. Click on the link to open a pull request for the release branch, create it and link relevant issues

> Note:
Pre-commit hooks and test:ci tasks are run for every pull request and any change to it.

### Deployment

Deployments happen automatically if the conditions for the [environment](https://github.com/GIScience/ors-map-client/settings/environments) are met:

| Environment | Condition                                                     | Target                                    | Workflow dispatch  |
|-------------|---------------------------------------------------------------|-------------------------------------------|--------------------|
| Staging     | open pull request for / push to `chore/release-v*.*.*` branch | https://maps-staging.openrouteservice.org | :heavy_check_mark: |
| Production  | merge `chore/release-v*.*.*` branch to `main`                 | https://maps.openrouteservice.org         | :heavy_check_mark: |
| HEAL        | push to `heal` branch                                         | https://heal.openrouteservice.org         | :no_entry_sign:    |

Use the workflow dispatch to deploy e.g. a feature branch to staging or an intermediate state of `main` to production.

### Additional documentation

There is additional software documentation in the `/docs` folder:

- [docs/dynamic-inputs.md](docs/dynamic-inputs.md) - describes how the inputs are rendered using a custom engine
- [docs/search-results-criteria.md](docs/search-results-criteria.md) - explains the criteria for search results
- [docs/plugins.md](docs/plugins.md) - explains how to add plugins

For a detailed explanation on how webpack works, check out the [guide](http://vuejs-templates.github.io/webpack/) and
[docs for vue-loader](http://vuejs.github.io/vue-loader).

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
