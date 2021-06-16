# Changelog #

All notable changes to this project will be documented in this file.

The format is based on [Keep a changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic versioning](http://semver.org/spec/v2.0.0.html).

<!--
This is how a changelog entry should look like:

## [version] - YYYY-MM-DD

### Added
- for new features.
### Changed
- existing functionality.
### Deprecated
- soon-to-be removed features.
### Removed
- now removed features.
### Fixed
- any bug.
### Security
- in case of vulnerabilities. (Use for vulnerability fixes)

RELEASING:
1. Change Unreleased to new release number
2. Add today's Date
3. Change unreleased link to compare new release:
[unreleased]: https://github.com/GIScience/openrouteservice/compare/vnew...HEAD
4. Add new compare link below
[new]: https://github.com/GIScience/openrouteservice/compare/vlast...vnew
5. Git tag release commit with vX.X.X to enable links
6. Double check issue links are valid
7. Run 'grunt up' for patch, 'grunt up:minor' or 'grunt up:major' versions
8. Add version to docker-compose.yml (grunt version always adds 1 on top the current version ...)
 -->

## [v1.1.3] -  2021-06-16 ##

### Fixed ###

- Visibility condition to max_speed filter in ors-map-filter.js
- Typos in variables and in internal documentation

### Removed ###

- Properties that are not used anymore in Place model
- Temp places for directions in MapView.js

### Added ###

- Allow going to direction mode with only on place defined/filled
- Support for origin/destination placeholder in app URL
- Support for zoom level based on the only place defined when in directions
- Static method getFilledPlaces in Place model

## [v1.1.2] -  2021-06-10 ##

### Fixed ###

- Typo in avoidPolygonsChangedInDirections hook name
- Typo in map-form-mixin avoidPolygonsFilterAccessor

## [v1.1.1] -  2021-06-09 ##

### Fixed ###

- Typo in German translations and in Spanish

## [v1.0.17] -  2021-06-01 ##

### Fixed ###

- Condition to apply isochrones time/distance range (ors-map-filter-example.js changed)

## [v1.0.16] -  2021-05-31 ##

### Fixed ###

- Slow performance due to inadequate object watch in route-details.js

## [v1.0.15] -  2021-05-31 ##

### Fixed ###

- Slow performance due to inadequate object watch in altitude.js

## [v1.0.14] -  2021-05-31 ##

### Fixed ###

- Added support to the `visibleWhen` attribute to ors-map-filters
- Fixed the displaying of alternative routes using the visibleWhen attribute

## [v1.0.13] -  2021-05-28 ##

### Fixed ###

- Spelling, formatting and grammar issues in the README.md, documentation, changelog and comments
- Spelling of variables and properties
- Hungarian typo
- Isochrones calculating msg duration
- Variables typo
- Automatically calculate a roundtrip when one place is defined and an option is changed

### Changed ###

- Update ors-js lib to version 1.0.13 with timeout param support
- Hook event name from `avoidPolygonBtnTraslations` to `avoidPolygonBtnTranslations`
- Removed filter-dependency-service.js (merged with dependency-service.js)

### Added ###

- Support to filter value conditions dependency
- Define isochrone rages by profile and dynamic intervals based on range value

## [v1.0.12] - 2021-04-28 ##

### Added ###

- Hungarian language

### Changed ###

- Show slider current value as user moves the slider

## [v1.0.11] - 2021-04-23 ##

### Fixed ###

- the processing of filter values that are invalid and were affecting some valid filters

## [v1.0.10] - 2021-04-20 ##

### Changed ###

- Auto close download and settings modal after executing the main action
- Update map view when in directions mode, a place changes, but there is no valid route yet
- Only show marker with number inside when displaying a route
- file `src/config-examples/default-map-settings-example.js` (Update your config)

### Fixed

- typos in places-and-directions

### Removed

- invalid filter values when profile changes

## [v1.0.9] - 2021-04-09 ##

### Added

- right click context menu 'Inspect data on OSM'

### Changed ###

- Keep altitude chart/graph open when route changes

## [v1.0.8] - 2021-04-07 ##

### Added

- raw routing (skip all segments) option in advanced settings
- a field for custom over layer in settings

### Changed

- file `src/config-examples/default-map-settings-example.js` (Update your config)

## [v1.0.7] - 2021-04-01 ##

### Changed ###

- Show ascent and descent for each segment on route details component

### Removed

- altitude component i18n files, since it is not been used anymore

## [v1.0.6] - 2021-03-25 ##

### Added

- support for gpx, xml and kml multi segment routes

### Fixed ###

- Fix building routes as alternative routes in file importer

## [v1.0.5] - 2021-03-25 ##

### Fixed ###

- Stop displaying old route when the route way points changed, and a new route cannot be calculated
- Build extra info highlight color based on an item index or value

## [v1.0.4] - 2021-03-24 ##

### Fixed ###

- Show place markers when the route cannot be calculated
- Show calculating toaster indefinitely (until an error or success toaster replace it)
- the adding of extra info to the request when a nested profile is active, like foot-hiking

### Removed ###

- avoid_feature filters that are not supported anymore (update your local `ors-map-filters.js`)

## [v1.0.3] - 2021-03-22 ##

### Fixed ###

- Fixed admin area loader filter for cases when no locality is available

## [v1.0.2] - 2021-03-22 ##

### Added ###

- Support to search by postal code

### Changed ###

- Auto-select by pressing enter/return also in the case of a single postal code layer result
- Template/example file `layer-zoom-mapping-example` to include postal code (update your config)

## [v1.0.1] - 2021-03-18 ##

## Added

- allowing to save default locale as preferred locale

### Changed ###

- Sidebar foot height
- About translation in French
