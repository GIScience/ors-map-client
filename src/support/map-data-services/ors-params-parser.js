import OrsFilterUtil from '@/support/map-data-services/ors-filter-util'
import DependencyService from '@/support/dependency-service.js'
import OrsMapFilters from '@/config/ors-map-filters'
import constants from '@/resources/constants'
import AppLoader from '@/app-loader'
import Utils from '@/support/utils'
import store from '@/store/store'
import lodash from 'lodash'

const orsParamsParser = {
  /**
   * Build the args object to be used in autocomplete places request
   * @param {*} placeName
   * @param {Boolean} restrictToBbox - restrict the search to stored bbox
   * @returns {Object} args
   */
  buildPlaceSearchArgs: (placeName, restrictToBbox = false) => {
    // build the args object
    const args = {
      text: placeName,
      size: 8,
      focus_point: [store.getters.mapCenter.lat, store.getters.mapCenter.lng]
    }
    // If is set to restrict the search to current mapBounds,
    // then apply the restriction
    if (restrictToBbox) {
      let bbox = orsParamsParser.getCurrentBbox()
      // If the bounding box is valid, then add it to the args
      if (bbox) {
        args.boundary_bbox = bbox
        delete args.focus_point // if we restrict by boundary bbox focus point is not necessary
      }
    }

    // Add the filters defined in the ORS filters that are manipulated
    // directly by external components
    orsParamsParser.setFilters(args, OrsMapFilters, constants.services.autocomplete)
    AppLoader.getInstance().appHooks.run('placeSearchArgsCreated', args)
    return args
  },

  /**
   * Get current bbox based on the stored map bounds
   * @returns {Array} bbox
   */
  getCurrentBbox () {
    if (!store.getters.mapBounds) {
      return false
    }
    const mapBounds = store.getters.mapBounds
    let validBbox = true

    // Make sure that min and max lat are valid
    for (const val of ['min_lat', 'max_lat']) {
      if (mapBounds.rect[val] > 90 || mapBounds.rect[val] < -90) {
        validBbox = false
      }
    }
    // Make sure that min and max lng are valid
    for (const val of ['min_lon', 'max_lon']) {
      if (mapBounds.rect[val] > 180 || mapBounds.rect[val] < -180) {
        validBbox = false
      }
    }
    // If the bounding box is valid, then add it to the args
    if (validBbox) {
      let bbox = [
        [mapBounds.rect.min_lat, mapBounds.rect.min_lon],
        [mapBounds.rect.max_lat, mapBounds.rect.max_lon]
      ]
      return bbox
    } else {
      return false
    }
  },

  /**
   * Build the args object to be used in search POIs request
   * @param {Object} filters {
   *  category_group_ids: Array,
   *  category_ids: Array,
   *  name: Array [String],
   *  wheelchair: Array ['yes','no','limited','designated'],
   *  smoking: Array ['dedicated','yes','no','separated','isolated','outside'],
   *  fee: Array ['yes', 'no']
   * } @see https://openrouteservice.org/dev/#/api-docs/pois/post
   * @param {Number} limit
   * @param {Number} distanceBuffer
   */
  buildPoisSearchArgs: (filters, limit = 100, distanceBuffer = 100) => {
    // build the args object
    const args = {
      filters: filters,
      limit: limit,
      geometry: {
        geojson: {
          type: 'Point',
          coordinates: [store.getters.mapCenter.lng, store.getters.mapCenter.lat]
        },
        // bbox: orsParamsParser.getCurrentBbox(),
        buffer: distanceBuffer
      }
    }
    orsParamsParser.setFilters(args, OrsMapFilters, constants.filterTypes.geocodeSearch)
    AppLoader.getInstance().appHooks.run('poisSearchArgsCreated', args)
    return args
  },

  /**
   * Build reverse search args
   * @param {Number} lat
   * @param {Number} long
   * @param {Object} options
   * @returns {Object} args
   */
  buildReverseSearchArgs: (lat, long) => {
    // build the args object
    const args = {
      point: {
        lat_lng: [lat, long],
        radius: 1 // one km radius
      },
      size: 8
    }
    // Add the filters defined in the ORS filters that are manipulated
    // directly by external components
    orsParamsParser.setFilters(args, OrsMapFilters, constants.services.reverseGeocode)
    AppLoader.getInstance().appHooks.run('reverseSearchArgsCreated', args)
    return args
  },

  /**
   * Build reverse search args
   * @param {Array} places
   * @returns {Object} args
   */
  buildIsochronesArgs: (places) => {
    return new Promise((resolve) => {
      const locations = []
      for (const key in places) {
        const place = places[key]
        locations.push([place.lng, place.lat])
      }
      const args = {
        locations: locations,
        area_units: store.getters.mapSettings.unit,
        timeout: constants.orsApiRequestTimeout,
        attributes:['total_pop']
      }
      // Add the filters defined in the ORS filters that are manipulated
      // directly by external components
      orsParamsParser.setFilters(args, OrsMapFilters, constants.services.isochrones)

      // Adjust specific args
      if (args.range && !Array.isArray(args.range)) {
        args.range = [args.range]
      }
      if (args.range_time) {
        args.range = args.range_time
        delete args.range_time
      }
      if (args.range_distance) {
        args.range = args.range_distance
        delete args.range_distance
      }
      AppLoader.getInstance().appHooks.run('isochronesArgsCreated', args)

      let promiseOrArgs = AppLoader.getInstance().appHooks.run('isochronesArgsCreated', args)

      // If a promise is returned
      if (promiseOrArgs instanceof Promise) {
        promiseOrArgs.then((promiseArgs) => {
          resolve(promiseArgs)
        }).catch (err => {
          console.error(err)
        })
      } else { // returned value is already an args object
        resolve(promiseOrArgs)
      }
      return args
    })
  },

  /**
   * Build routing request args object
   * @param {Array} places
   * @returns {Object} args
   */
  buildRoutingArgs: (places) => {
    return new Promise((resolve) => {
      const coordinates = lodash.map(places, (p) => {
        return p.getLngLatArr()
      })
      const mapSettings = store.getters.mapSettings

      // Define the extra info that must be requested
      // based on the map settings
      const extraInfo = orsParamsParser.buildExtraInfoOptions(mapSettings)

      // Set args object
      const args = {
        coordinates: coordinates,
        format: 'geojson',
        elevation: mapSettings.elevationProfile,
        instructions_format: 'html',
        extra_info: extraInfo,
        language: mapSettings.routingInstructionsLocale,
        units: mapSettings.unit,
        timeout: constants.orsApiRequestTimeout
      }

      let skipSegments = []
      for (let pIndex in places) {
        if (places[pIndex].direct) {
          let segment = Number(pIndex) +1
          skipSegments.push(segment)
        }
      }
      if (skipSegments.length > 0) {
        args.skip_segments = skipSegments
      }
      // Add the filters defined in the ORS filters that are manipulated
      // directly by external components
      orsParamsParser.setFilters(args, OrsMapFilters, constants.services.directions)

      let promiseOrArgs = AppLoader.getInstance().appHooks.run('routingArgsCreated', args)

      // If a promise is returned
      if (promiseOrArgs instanceof Promise) {
        promiseOrArgs.then((promiseArgs) => {
          resolve(promiseArgs)
        }).catch (err => {
          console.error(err)
        })
      } else { // returned value is already an args object
        resolve(promiseOrArgs)
      }
      return args
    })
  },

  /**
   * Get active profile form OrsMapFilter
   * @returns {Object}
   */
  getActiveProfileObj () {
    const profileFilterRef = OrsFilterUtil.getFilterRefByName(constants.profileFilterName)
    let activeProfileObj = profileFilterRef.mapping[profileFilterRef.value]

    if (!activeProfileObj) {
      for (let key in profileFilterRef.mapping) {
        let profile = profileFilterRef.mapping[key]
        if (profile.nestedProfiles) {
          for (let nestedKey in profile.nestedProfiles) {
            let nestedProfile = profile.nestedProfiles[nestedKey]
            if (nestedProfile === profileFilterRef.value) {
              activeProfileObj = profile
              break
            }
          }
        }
        if (activeProfileObj) {
          break
        }
      }
    }
    return activeProfileObj
  },

  /**
   * Define the extra info that must be requested
   * @param {Object} mapSettings
   * @returns {Array} extraInfo
   */
  buildExtraInfoOptions (mapSettings) {
    const extraInfo = []

    let profileObj = orsParamsParser.getActiveProfileObj()

    // Add the extra info that are supported by each profile
    // according to what is defined in the ors-map-filter.js
    for (const key in constants.extraInfos) {
      if (mapSettings[key]) {
        if (key === constants.extraInfos.roadaccessrestrictions) {
          if (profileObj.supportsRoadAccessRestrictions) {
            extraInfo.push(constants.extraInfos[key])
          }
        } else if (key === constants.extraInfos.traildifficulty) {
          if (profileObj.supportsTrailDifficulty) {
            extraInfo.push(constants.extraInfos[key])
          }
        } else if (key === constants.extraInfos.tollways) {
          if (profileObj.supportsTollways) {
            extraInfo.push(constants.extraInfos[key])
          }
        } else if (key === constants.extraInfos.green) {
          if (profileObj.supportsGreen) {
            extraInfo.push(constants.extraInfos[key])
          }
        } else if (key === constants.extraInfos.noise) {
          if (profileObj.supportsNoise) {
            extraInfo.push(constants.extraInfos[key])
          }
        } else {
          extraInfo.push(constants.extraInfos[key])
        }
      }
    }
    return extraInfo
  },

  /**
   * Build routing request args object
   * @param {Array} places
   * @returns {Object} args
   */
  buildRoutingElevationArgs: (places) => {
    const coordinates = lodash.map(places, (p) => {
      return p.getLngLatArr()
    })

    // build the args object
    const args = {
      coordinates: coordinates,
      instructions_format: 'html',
      elevation: true,
      format: 'geojson'
    }
    orsParamsParser.setFilters(args, OrsMapFilters, constants.services.directions)
    AppLoader.getInstance().appHooks.run('routingElevationArgsCreated', args)
    return args
  },

  /**
   * Add OrsMapFilters to intoArgs object to a given service
   * @param {Object} intoArgs - target object to the filters that will be extracted from sourceFilters
   * @param {Object} orsFilters
   * @param {String} service
   * @returns {Array} intoArgs
   * @uses store.getters.mode
   */
  setFilters (intoArgs, sourceFilters, service) {
    for (const key in sourceFilters) {
      const filter = sourceFilters[key]
      // Define if the current filter is available fot the current app mode
      const available = !filter.availableOnModes || filter.availableOnModes.includes(store.getters.mode)

      // Check if the filter matches the conditions to be used
      if (available && !filter.onlyInFront && (!filter.useInServices || filter.useInServices.includes(service))) {

        // Update filter value and children's value based on their dependencies
        if (filter.props) {
          DependencyService.updateFieldsStatus(filter.props)
        }
        // Build the value for the current filter (if it has child filters, they are going to be built too)
        const filterValue = DependencyService.getFilterValue(filter)

        // If the value of the filter is valid, add in the intoArgs array
        if (orsParamsParser.isFilterValueValid(filter, filterValue)) {
          orsParamsParser.setFilterVal(filter, filterValue, intoArgs)
        } else if (intoArgs[filter.name] && !orsParamsParser.isFilterValueValid(intoArgs[filter.name])) {
          // If the filter is available and has not a valid value, remove it
          if (DependencyService.isAvailable(filter)) {
            delete intoArgs[filter.name]
          }
        }
      }
    }
    return intoArgs
  },

  /**
   * Set the filter value into an args object
   * @param {*} filter
   * @param {*} filterValue
   * @param {*} intoArgs
   * @hook mapFilterAdded
   */
  setFilterVal (filter, filterValue, intoArgs) {
    let filterName = filter.internalName || filter.name
    // If the parent is a wrapping object, and it is already defined in intoArgs, add it to the object
    if (filter.type === constants.filterTypes.wrapper && typeof intoArgs[filterName] !== 'undefined') {
      intoArgs[filterName] = orsParamsParser.getMergedParameterValues(intoArgs[filterName], filterValue)
    } else { // if not
      if (filter.valueAsObject && typeof filterValue === 'string') {
        const parsed = Utils.tryParseJson(filterValue)
        intoArgs[filterName] = parsed || filterValue
      } else {
        intoArgs[filterName] = filterValue
      }
    }
    let appHooks = AppLoader.getInstance().appHooks
    appHooks.run('mapFilterAdded', {filters: intoArgs, name: filter.name})
  },
  /**
   * Determines if a filter value is valid
   * @param {*} filterValue
   * @returns {Boolean}
   */
  isFilterValueValid (filter, filterValue) {
    const isValid = filterValue !== '' && filterValue !== undefined && filterValue !== null && filterValue !== '{}' && (typeof filterValue !== 'object' || Object.keys(filterValue).length > 0)
    return isValid
  },

  /**
   * Add a property and its value to an existing parameter
   * If the current parameter is stringified, it converts it
   * back to a json object, add the prop->value and then convert
   * it back to a string representation of the object
   *
   * @param {String} current a string representing an objet where a new prop will be added
   * @param {String|Object} adding an object or string representing an object that will be merged to a parent object
   * @returns {String} representing a stringified object
   */
  getMergedParameterValues (current, adding) {
    const addingParsedJson = typeof adding === 'string' ? Utils.tryParseJson(adding) : adding

    // If we want to add a stringified object
    // that was successfully parsed, continue this way
    if (addingParsedJson) {
      let newObj = null
      const existingParsedJson = Utils.tryParseJson(current)

      // If what we want to append is a parsable json
      if (existingParsedJson) {
        newObj = Object.assign(existingParsedJson, addingParsedJson)
      } else { // if not, it is an object, so we append the prop directly
        newObj = Object.assign(current, addingParsedJson)
      }
      const newStrJson = JSON.stringify(newObj)
      return newStrJson
    } else {
      // if it is not parsable, return the original object
      return current
    }
  },

  /**
   * Parse incoming options appRouteData url into filters object
   *
   * @param {*} filtersInto
   * @param {*} options
   */
  parseOptions (filtersInto, options) {
    for (const key in options) {
      for (const filtersKey in filtersInto) {
        const filter = filtersInto[filtersKey]

        if (filter.name === key || filter.internalName === key) {

          const available = !filter.availableOnModes || filter.availableOnModes.includes(store.getters.mode)

          // If the filter is available, it is not intended to be used only
          // in the interface and is not disabled, set its value
          if (available && !filter.onlyInFront && !filter.disabled) {
            const value = options[key]
            const parsedJson = Utils.tryParseJson(value)
            if (parsedJson) {
              this.parseOptions(filtersInto[filtersKey].props, parsedJson)
            } else {
              orsParamsParser.setFilterValueFromParam(filtersInto[filtersKey], options[key])

              // If the filter has validity conditions
              // make sure that the availability of the
              // filter is defined before using it
              if (filtersInto[filtersKey].validWhen) {
                DependencyService.setAvailability(filtersInto, filtersKey, filtersInto)
              }
            }
          }
        }
      }
    }
  },

  /**
   * Set the filter value based in a given value
   * @param {Object} filter
   * @param {*} paramValue
   */
  setFilterValueFromParam (filter, paramValue) {
    if (filter.type === constants.filterTypes.wrapper && filter.props && typeof paramValue === 'object') {
      for (const propKey in filter.props) {
        const prop = filter.props[propKey]
        if (paramValue[prop.name]) {
          OrsFilterUtil.setFilterValue(prop.name, paramValue[prop.name])
        }
      }
    } else {
      OrsFilterUtil.setFilterValue(filter.name, paramValue)
    }
  }
}

export default orsParamsParser
