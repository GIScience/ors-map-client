# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.15.1](https://github.com/GIScience/ors-map-client/compare/v1.15.0...v1.15.1) (2021-08-04)


### Bug Fixes

* **map-left-click:** do not show place info when sidebar is open and map view is clicked ([318c2f9](https://github.com/GIScience/ors-map-client/commit/318c2f9169ead99b4dd0faff8067d6d71443ea5f))

## [1.15.0](https://github.com/GIScience/ors-map-client/compare/v1.14.1...v1.15.0) (2021-08-04)


### Features

* do not show sidebar automatically in mobile if directions started via a pointerTriggeredAction ([751805c](https://github.com/GIScience/ors-map-client/commit/751805c25305a7132817ef9eb994ab0f95058841))

### [1.14.1](https://github.com/GIScience/ors-map-client/compare/v1.14.0...v1.14.1) (2021-08-04)


### Bug Fixes

* hide place info box when no place is selected ([18096c2](https://github.com/GIScience/ors-map-client/commit/18096c2470279b28cf9fe3796fd63c7d577ceefc))

## [1.14.0](https://github.com/GIScience/ors-map-client/compare/v1.13.2...v1.14.0) (2021-08-04)


### Features

* improve controls visibility when sidebar is open ([af4dfbd](https://github.com/GIScience/ors-map-client/commit/af4dfbdf1bd4d7339dd9b7e3849ddb844a7782a3))


### Bug Fixes

* **map-form-mixin:** sidebar open state consider the app and embed mode ([1550460](https://github.com/GIScience/ors-map-client/commit/1550460214ed3900c7d311ba34ba7c6d89243fdd))

### [1.13.2](https://github.com/GIScience/ors-map-client/compare/v1.13.1...v1.13.2) (2021-08-03)


### Bug Fixes

* **floatingmenu:** size and layout ([44cbf98](https://github.com/GIScience/ors-map-client/commit/44cbf986ca720d98aaeb0da42b9e57c4f6a11b96))

### [1.13.1](https://github.com/GIScience/ors-map-client/compare/v1.13.0...v1.13.1) (2021-08-03)


### Bug Fixes

* **places-and-directions:** route limits error message ([c014481](https://github.com/GIScience/ors-map-client/commit/c014481216d1c0c010bad5658668e4eff056e3ab))

## [1.13.0](https://github.com/GIScience/ors-map-client/compare/v1.12.0...v1.13.0) (2021-08-03)


### Features

* map floating btns boxing and shadow ([840b132](https://github.com/GIScience/ors-map-client/commit/840b132639a33ccdc98b9e55fcc7d8f47b0119e8))

## [1.12.0](https://github.com/GIScience/ors-map-client/compare/v1.11.0...v1.12.0) (2021-08-03)


### Features

* adjust map floating btns style ([3951153](https://github.com/GIScience/ors-map-client/commit/3951153b46a1da96efb90083e37f550ddc04169c))


### Bug Fixes

* **settings.i18n.de-de.js:** wrong Italian translation in German ([7378c79](https://github.com/GIScience/ors-map-client/commit/7378c797f522c4834d4897d54358e120ced284b8)), closes [#165](https://github.com/GIScience/ors-map-client/issues/165)

## [1.11.0](https://github.com/GIScience/ors-map-client/compare/v1.10.0...v1.11.0) (2021-08-02)


### Features

* **about.vue:** create the aboutContentDefined hook ([424504f](https://github.com/GIScience/ors-map-client/commit/424504f2a94cd7d8f6a7daccb1d647505cc9bfb7))


### Code Refactoring

* **box.js:** remove unused parameter and changed variable name ([bf624f4](https://github.com/GIScience/ors-map-client/commit/bf624f48720cef61133341f2cfa6a79562050c70))

## [1.10.0](https://github.com/GIScience/ors-map-client/compare/v1.9.1...v1.10.0) (2021-08-02)


### Features

* **floating-menu:** add floatingMenuItemsDefined hook ([215f008](https://github.com/GIScience/ors-map-client/commit/215f008c8bbf86e60f9aefda1af629b6986db05d))

### [1.9.1](https://github.com/GIScience/ors-map-client/compare/v1.9.0...v1.9.1) (2021-08-02)


### Bug Fixes

* **places-and-directions.js:** direct flag of last place set to false after place removal ([21867d4](https://github.com/GIScience/ors-map-client/commit/21867d4b9b02290d1a976ccaf75f829e77867745))

## [1.9.0](https://github.com/GIScience/ors-map-client/compare/v1.8.0...v1.9.0) (2021-08-02)


### Features

* improve place suggestion UI ([5e8ed57](https://github.com/GIScience/ors-map-client/commit/5e8ed57ea0ff538008142283b08b1a08e7b39f5b))
* **map-view-leaflet.css:** do not increase layer control size when in touch mode ([557c64f](https://github.com/GIScience/ors-map-client/commit/557c64f23713244e1396e7d91b90693c92c20e50))
* **map-view.css:** square the accessibility-btn ([0186124](https://github.com/GIScience/ors-map-client/commit/018612418b8146414d3aff67025e4a32c67b4cae))
* **ors-l-polyline:** do not show route popup on new route when in low resolution or mobile devices ([9374d22](https://github.com/GIScience/ors-map-client/commit/9374d2252f17d4c96017050134f11cad9dd4b2d4))
* show new info badge instead of opening sidebar automatically when in low resolution ([ff0049e](https://github.com/GIScience/ors-map-client/commit/ff0049ebdf2ca29e9b8447e39319272212f40f9a))

## [1.8.0](https://github.com/GIScience/ors-map-client/compare/v1.7.1...v1.8.0) (2021-07-29)


### Features

* sidebar overflow and my-location btn visibility when height graph is open ([c1b64fc](https://github.com/GIScience/ors-map-client/commit/c1b64fc46e929cac699b6897162c8e17208bea73))

### [1.7.1](https://github.com/GIScience/ors-map-client/compare/v1.7.0...v1.7.1) (2021-07-29)


### Bug Fixes

* **map-view.js:** disable gestureHandling based on embed mode ([c47ba76](https://github.com/GIScience/ors-map-client/commit/c47ba767ee4a5809ecd395dc5c0542e60f487302))

## [1.7.0](https://github.com/GIScience/ors-map-client/compare/v1.6.1...v1.7.0) (2021-07-29)


### Features

* **hooks-example.js:** remove hook priority from appLoaded example ([a6622eb](https://github.com/GIScience/ors-map-client/commit/a6622eb3555f3bbbda272b64b50dbad9e6aa128a))
* improve map dynamic controls visibility ([8c2a857](https://github.com/GIScience/ors-map-client/commit/8c2a85767bee55d7c1556705b1d3040157659ecf))


### Bug Fixes

* disable swipe for tabs and sidebar ([6be0dad](https://github.com/GIScience/ors-map-client/commit/6be0dad0418431e85fb5d368af254dcb8a4e02c9))

### [1.6.1](https://github.com/GIScience/ors-map-client/compare/v1.6.0...v1.6.1) (2021-07-28)


### Bug Fixes

* **map-view:** uI elements z-index and positioning ([6ea7bca](https://github.com/GIScience/ors-map-client/commit/6ea7bcacdcd29834d117a4bb09e80ada7ee7c0cb))
* **sidebar:** use stateless naviagation drawer ([8125c9e](https://github.com/GIScience/ors-map-client/commit/8125c9e87d80c7d772b639fbffbae7c684283a57))
* improve right/letf map click handling ([609ad07](https://github.com/GIScience/ors-map-client/commit/609ad078b2e3237c12b12af991601f1417e2284d))
* moving marker on mobile with touch event ([d7bb23a](https://github.com/GIScience/ors-map-client/commit/d7bb23a56a8afd593fa1e837a41a64c67a060bf2))

## [1.6.0](https://github.com/GIScience/ors-map-client/compare/v1.5.1...v1.6.0) (2021-07-27)


### Features

* support for promise in directions and isochrone args hooks ([529e114](https://github.com/GIScience/ors-map-client/commit/529e1147e7f9a1e59249bd2157d85d2dd834ee6e))


### Code Refactoring

* **map-view.js:** remove unused reject ([6b362bb](https://github.com/GIScience/ors-map-client/commit/6b362bbdcc4df7b81381527f5b5fbb41bdc8f044))

### [1.5.1](https://github.com/GIScience/ors-map-client/compare/v1.5.0...v1.5.1) (2021-07-22)


### Bug Fixes

* **maps.route.js:** use max place inputs allowed declared on app-config.js ([d934e2b](https://github.com/GIScience/ors-map-client/commit/d934e2b370afc132056c4790edf75404b88b0d7d)), closes [#163](https://github.com/GIScience/ors-map-client/issues/163)

## [1.5.0](https://github.com/GIScience/ors-map-client/compare/v1.4.1...v1.5.0) (2021-07-20)


### Features

* **mapview.vue:** add opacity option for WMS tile layer ([bdf522f](https://github.com/GIScience/ors-map-client/commit/bdf522fcc10a0ba813f494acd20ce9817dccc901))

### [1.4.1](https://github.com/GIScience/ors-map-client/compare/v1.4.0...v1.4.1) (2021-07-20)


### Bug Fixes

* **app-hooks.js:** pass the arg throught multiple calls in runPluginHook ([af08fea](https://github.com/GIScience/ors-map-client/commit/af08feab0d9708c314193270458be944729cf2ba))
* **maps.css:** refresh button width set to min-width ([0b41af2](https://github.com/GIScience/ors-map-client/commit/0b41af2500e477c00043b54a907c8442f06d91da))
* **maps.vue:** activePlaceIndex name corrected ([4ab0ba3](https://github.com/GIScience/ors-map-client/commit/4ab0ba3972f93a8847011161a5401137a300292f))


### Others

* remove not used marker images ([c28e3a6](https://github.com/GIScience/ors-map-client/commit/c28e3a6f36a9636c01f067920305c72be55268dd))


### Code Refactoring

* **geo-utils.js:** change variable and method names ([883e66c](https://github.com/GIScience/ors-map-client/commit/883e66c89ca01bfee2000bd21034494e3f8d736e))
* **map-view.js:** simplified loadMapData and outsourced the focus place task ([f639ea8](https://github.com/GIScience/ors-map-client/commit/f639ea883ad4ef8c64d27540f31425e204617449))

## [1.4.0](https://github.com/GIScience/ors-map-client/compare/v1.3.0...v1.4.0) (2021-07-19)


### Features

* add layerProvidersLoaded hook ([2a4284e](https://github.com/GIScience/ors-map-client/commit/2a4284e545d943bcb3ad9a97df704e570c77da42))
* add support for WMS overlayer ([b759a38](https://github.com/GIScience/ors-map-client/commit/b759a38f18e7266a62c625b92fad56ba6b502d1a))

## [1.3.0](https://github.com/GIScience/ors-map-client/compare/v1.2.0...v1.3.0) (2021-07-19)


### Features

* **plugins:** simplify plugins load via hooks ([52d684f](https://github.com/GIScience/ors-map-client/commit/52d684f6a77b657c8b03174bfe6fbe72afe68ddf))


### Bug Fixes

* **admin area loader:** fix the admin area loader feature ([d140ab6](https://github.com/GIScience/ors-map-client/commit/d140ab6be9d1514bf851b14c464ad5820c026dd5))


### Code Refactoring

* **app-hooks.js:** fix spelling of priority parameter ([736adf1](https://github.com/GIScience/ors-map-client/commit/736adf18101b671351d3e4d649865f18e2381cdc))
* **map-view.js:** improve code and outsource tasks ([60829c4](https://github.com/GIScience/ors-map-client/commit/60829c4d9e1759beca2dba1350c1f8654bae1c0c))
* **maps.js:** fix spelling of property ([32ea7c4](https://github.com/GIScience/ors-map-client/commit/32ea7c4e8e04dcc5f81a103a788d96da6715a471))


### Docs

* **hooks-example.js:** fix spelling on hooks example docs ([c8abfcf](https://github.com/GIScience/ors-map-client/commit/c8abfcf087f6e4ee48e71cd9bbdc9ac71be081dd))
* **readme:** updated contribute section ([75f99e3](https://github.com/GIScience/ors-map-client/commit/75f99e3eab61956d077321565acf2e1607a1d71b))
* **readme.md:** remove the reference to the shared-services folder ([30e92a8](https://github.com/GIScience/ors-map-client/commit/30e92a8704c03639e4ede895f5f7268467c52a2c))

## [1.2.0](https://github.com/GIScience/ors-map-client/compare/v1.1.10...v1.2.0) (2021-07-08)


### Features

* add green and noise extra info ([61aff08](https://github.com/GIScience/ors-map-client/commit/61aff08109c2d84e5fb421a45d55336ce9778b21)), closes [#162](https://github.com/GIScience/ors-map-client/issues/162)


### Code Refactoring

* refactoring of the code for new eslint rules ([04d0a8e](https://github.com/GIScience/ors-map-client/commit/04d0a8e3258488104bae1f0e596f991b179daffd))


### Docs

* command to copy config files simplified ([2a81372](https://github.com/GIScience/ors-map-client/commit/2a813729dd1d8a9d51cb72081dd429edb78c393b))


### Others

* **en-translation-source-merged.json:** update the translation source merged file ([e49514a](https://github.com/GIScience/ors-map-client/commit/e49514a120a66392ee348e8b10969a0ff0909853))

### [1.1.10](https://github.com/GIScience/ors-map-client/compare/v1.1.9...v1.1.10) (2021-07-02)

### [1.1.9](https://github.com/GIScience/ors-map-client/compare/v1.1.8...v1.1.9) (2021-07-02)



### Others

- prepare changelog and add committing/versioning section in readme ([33b0795](https://github.com/GIScience/ors-map-client/commit/33b079541c8bbea9b33db4d23770f312ed9d505c))

* **package.json:** add commitizen ([4992ee3](https://github.com/GIScience/ors-map-client/commit/4992ee3fcb925af7d4bf7dc238e4fa8b7333c51c))
* **package.json and changelog.md:** add standard-version ([05787d2](https://github.com/GIScience/ors-map-client/commit/05787d20bac3cc94ad3a9dc76e3d77aebb0277c8))

### [1.1.8](https://github.com/GIScience/ors-map-client/compare/v1.1.7...v1.1.8) (2021-06-30)

### Features


- Total population to isochrones view and printable
- Fixed typo in map view

### Bug Fixes


- Rebuild the value of filter with conditional displaying rules

### 1.1.7 (2021-06-30)


### Others


- Updated link to ask to point to specific maps category
- Migrated links to constants file

### 1.1.6 (2021-06-29)


### Features


- Implemented printing template strategy
- Printing for Place
- Printing for Isochrones
- Printing for round trip

### Bug Fixes


- Profile params parameters only for certain profiles (wheelchair and hgv)

### Others


- Link for ask forum goes direct to maps category
- removed unused store related to sidebar UI
- removed unused data from App.js
- Removed logic for setting footer visibility (not used anymore)

### 1.1.5 (2021-06-25)

### Features



- Prefer green routes filter (only for Germany)
- Prefer quiet routes filter (only for Germany)
- Print route instructions
- Toggle isochrone visibility individually
- Adjust isochrone opacity individually
- Adjust route polyline opacity (to see street names covered by it)

### Bug Fixes


- Nested filters start open at page load when they have non default values
- Route polyline background (white)
- Typos in variables/methods and in comments

### Others


- Improved slider UI

### 1.1.4 (2021-06-21)

### Bug Fixes



- slider-combo reset action (remove any value)

### 1.1.3 (2021-06-16)

### Bug Fixes



- Visibility condition to max_speed filter in ors-map-filter.js
- Typos in variables and in internal documentation

### Features


- Properties that are not used anymore in Place model
- Temp places for directions in MapView.js

- Allow going to direction mode with only on place defined/filled
- Support for origin/destination placeholder in app URL
- Support for zoom level based on the only place defined when in directions
- Static method getFilledPlaces in Place model

### 1.1.2 (2021-06-10)

### Bug Fixes



- Typo in avoidPolygonsChangedInDirections hook name
- Typo in map-form-mixin avoidPolygonsFilterAccessor

### 1.1.1 (2021-06-09)

### Bug Fixes



- Typo in German translations and in Spanish

### 1.0.17 (2021-06-01)

### Bug Fixes



- Condition to apply isochrones time/distance range (ors-map-filter-example.js changed)

### 1.0.16 (2021-05-31)

### Bug Fixes



- Slow performance due to inadequate object watch in route-details.js

### 1.0.15 (2021-05-31)

### Bug Fixes



- Slow performance due to inadequate object watch in altitude.js

### 1.0.14 (2021-05-31)

### Bug Fixes



- Added support to the `visibleWhen` attribute to ors-map-filters
- Fixed the displaying of alternative routes using the visibleWhen attribute

### 1.0.13 (2021-05-28)

### Bug Fixes



- Spelling, formatting and grammar issues in the README.md, documentation, changelog and comments
- Spelling of variables and properties
- Hungarian typo
- Isochrones calculating msg duration
- Variables typo
- Automatically calculate a roundtrip when one place is defined and an option is changed

### Others


- Update ors-js lib to version 1.0.13 with timeout param support
- Hook event name from `avoidPolygonBtnTraslations` to `avoidPolygonBtnTranslations`
- Removed filter-dependency-service.js (merged with dependency-service.js)

### Features


- Support to filter value conditions dependency
- Define isochrone rages by profile and dynamic intervals based on range value

### 1.0.12 (2021-04-28)


### Features


- Add Hungarian language


### Bug Fixes


- Show slider current value as user moves the slider

### 1.0.11 (2021-04-23)


### Bug Fixes


- the processing of filter values that are invalid and were affecting some valid filters

### 1.0.10 (2021-04-20)


### Features


- Auto close download and settings modal after executing the main action
- Update map view when in directions mode, a place changes, but there is no valid route yet
- Only show marker with number inside when displaying a route
- File `src/config-examples/default-map-settings-example.js` updated

### Others

- Typos in places-and-directions
- Invalid filter values when profile changes




### 1.0.9 (2021-04-09)


### Features




- right click context menu 'Inspect data on OSM'

- Keep altitude chart/graph open when route changes
### 1.0.8 (2021-04-07)

### Features




- raw routing (skip all segments) option in advanced settings
- a field for custom over layer in settings

### Others


- file `src/config-examples/default-map-settings-example.js` (Update your config)

### 1.0.7 (2021-04-01)

### Features



- Show ascent and descent for each segment on route details component

### Others

- Removed altitude component i18n files, since it is not been used anymore

### 1.0.6 (2021-03-25)

### Features





- support for gpx, xml and kml multi segment routes

### Bug Fixes


- Fix building routes as alternative routes in file importer

### 1.0.5 (2021-03-25)


### Bug Fixes


- Stop displaying old route when the route way points changed, and a new route cannot be calculated
- Build extra info highlight color based on an item index or value

### 1.0.4 (2021-03-24)

### Bug Fixes



- Show place markers when the route cannot be calculated
- Show calculating toaster indefinitely (until an error or success toaster replace it)
- the adding of extra info to the request when a nested profile is active, like foot-hiking

### Features


- avoid_feature filters that are not supported anymore (update your local `ors-map-filters.js`)

### 1.0.3 (2021-03-22)


### Bug Fixes


- Fixed admin area loader filter for cases when no locality is available

### 1.0.2 (2021-03-22)

### Features




- Support to search by postal code
- Auto-select in place input by pressing enter/return also in the case of a single postal code layer result
- Changed template/example file `layer-zoom-mapping-example` to include postal code (update your config)

### 1.0.1 (2021-03-18)



## Features

- Allow to save default locale as preferred locale
- Changed sidebar foot height
- Updated About translation in French
