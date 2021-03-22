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

 ## [v1.0.3] - 2021-03-22 ##

### Fixed ###

- Fixed admin area loader filter for cases when no locality is available

## [v1.0.2] - 2021-03-22 ##

### Added ###

- Support to search by postal code

### Changed ###

- Auto select by hit enter/return also in the case of a single postal code layer result
- Template/example file `layer-zoom-mapping-example` was changed to include postal code (please update your config file to reflect this)

## [v1.0.1] - 2021-03-18 ##

### Changed ###

- Sidebar foot height
- About translation in French
- Allow saving default locale as preferred locale