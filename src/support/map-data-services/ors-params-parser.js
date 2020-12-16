import store from '@/store/store'
import lodash from 'lodash'
import OrsMapFilters from '@/config/ors-map-filters'
import OrsFilterUtil from '@/support/map-data-services/ors-filter-util'
import DependencyService from '@/support/dependency-service.js'
import Utils from '@/support/utils'
import constants from '@/resources/constants'
import main from '@/main'

const orsParamsParser = {
  /**
   * Build the args object to be used in search places request
   * @param {String} placeName
   * @returns {Object} args
   */
  buildPlaceSearchArgs: (placeName) => {
    // build the args object
    const args = {
      text: placeName,
      size: 10,
      focus_point: [store.getters.mapCenter.lat, store.getters.mapCenter.lng]
    }

    orsParamsParser.addFilters(args, OrsMapFilters, constants.filterTypes.geocodeSearch)
    main.getInstance().appHooks.run('placeSearchArgsCreated', args)
    return args
  },

  /**
   * Build the args object to be used in atocomplete places request
   * @param {*} placeName
   * @param {Boolean} restrictToBbox - restricct the search to stored bbox
   * @returns {Object} args
   */
  buildAutocompleteArgs: (placeName, restrictToBbox = false) => {
    // build the args object
    const args = {
      text: placeName,
      size: 8,
      focus_point: [store.getters.mapCenter.lat, store.getters.mapCenter.lng]
    }
    // If is set to restrict the search to currrent mapBounds in store
    // and there is a mapBounds defined, then apply the restriction
    if (restrictToBbox && store.getters.mapBounds) {
      const mapBounds = store.getters.mapBounds
      let valideBbox = true

      // Make sure that min and max lat are valid
      const lats = ['min_lat', 'max_lat']
      for (const key in lats) {
        const prop = lats[key]
        if (mapBounds.rect[prop] > 90 || mapBounds.rect[prop] < -90) {
          valideBbox = false
        }
      }
      // Make sure that min and max lng are valid
      const lngs = ['min_lon', 'max_lon']
      for (const key in lngs) {
        const prop = lngs[key]
        if (mapBounds.rect[prop] > 180 || mapBounds.rect[prop] < -180) {
          valideBbox = false
        }
      }
      // If the bounding box is valid, then add it to the args
      if (valideBbox) {
        const bbox = [
          [mapBounds.rect.min_lat, mapBounds.rect.min_lon],
          [mapBounds.rect.max_lat, mapBounds.rect.max_lon]
        ]
        args.boundary_bbox = bbox
        delete args.focus_point // if we restrict by bounday bbox focus point is not necessary
      }
    }

    // Add the filters defined in the ORS filters that are manipulated
    // directly by external components
    orsParamsParser.addFilters(args, OrsMapFilters, constants.services.autocomplete)
    main.getInstance().appHooks.run('autocompleteArgsCreated', args)
    return args
  },

  /**
   * Build the args object to be used in search places request
   * @param {String} placeName
   * @returns {Object} args
   */
  buildPoisSearchArgs: (placeName) => {
    // build the args object
    const args = {
      name: placeName,
      // limit: 10,
      geometry: {
        geojson: {
          type: 'Point',
          coordinates: [store.getters.mapCenter.lat, store.getters.mapCenter.lng]
        },
        buffer: 500
      }
      // category_group_ids: [],
      // category_ids: []
    }

    // orsParamsParser.addFilters(args, OrsMapFilters, constants.filterTypes.geocodeSearch)
    main.getInstance().appHooks.run('poisSearchArgsCreated', args)
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
    orsParamsParser.addFilters(args, OrsMapFilters, constants.services.reverseGeocode)
    main.getInstance().appHooks.run('reverseSearchArgsCreated', args)
    return args
  },

  /**
   * Build reverse search args
   * @param {Array} places
   * @returns {Object} args
   */
  buildIsochronesArgs: (places) => {
    const locations = []
    for (const key in places) {
      const place = places[key]
      locations.push([place.lng, place.lat])
    }
    const args = {
      locations: locations,
      area_units: store.getters.mapSettings.unit
    }
    // Add the filters defined in the ORS filters that are manipulated
    // directly by external components
    orsParamsParser.addFilters(args, OrsMapFilters, constants.services.isochrones)
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
    main.getInstance().appHooks.run('isochronesArgsCreated', args)
    return args
  },

  /**
   * Build routing request args object
   * @param {Array} places
   * @returns {Object} args
   */
  buildRoutingArgs: (places) => {
    const coordinates = lodash.map(places, (p) => {
      return p.getLngLatArr()
    })
    const mapSettings = store.getters.mapSettings

    // Define the extra info that musbe be requested
    // based on the map settings
    const extraInfo = []

    for (const key in constants.extraInfos) {
      if (mapSettings[key]) {
        extraInfo.push(constants.extraInfos[key])
      }
    }

    // Set args object
    const args = {
      coordinates: coordinates,
      format: 'geojson',
      elevation: mapSettings.elevationProfile,
      instructions_format: 'html',
      api_version: 'v2',
      extra_info: extraInfo,
      language: mapSettings.routingInstructionsLocale,
      units: mapSettings.unit
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
    args.skip_segments

    // Add the filters defined in the ORS filters that are manipulated
    // directly by external components
    orsParamsParser.addFilters(args, OrsMapFilters, constants.services.directions)
    main.getInstance().appHooks.run('routingArgsCreated', args)
    return args
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
    orsParamsParser.addFilters(args, OrsMapFilters, constants.services.directions)
    main.getInstance().appHooks.run('routingElevationArgsCreated', args)
    return args
  },

  /**
   * Add OrsMapFilters to args object to a given service
   * @param {Object} args - taget object to the filters that will be extracted from orsFilters
   * @param {Object} orsFilters
   * @param {String} service
   * @returns {Array} args
   */
  addFilters (args, orsFilters, service) {
    let appHooks = main.getInstance().appHooks

    for (const key in orsFilters) {
      const filter = orsFilters[key]

      const available = !filter.availableOnModes || filter.availableOnModes.includes(store.getters.mode)
      if (available && !filter.onlyInFront && (!filter.useInServices || filter.useInServices.includes(service))) {
        const filterValue = OrsFilterUtil.getFilterValue(filter, service)

        // If the value of the filter is valid, add in the args array
        if (orsParamsParser.isFilterValueValid(filterValue)) {
          // If the parent is a wrapping object and it is already defined in args, add it to the object
          if (filter.type === constants.filterTypes.wrapper && typeof args[filter.name] !== 'undefined') {
            args[filter.name] = orsParamsParser.getMergedParameterValues(args[filter.name], filterValue)
          } else { // if not 
            if (filter.valueAsObject && typeof filterValue === 'string') {
              const parsed = Utils.tryParseJson(filterValue)
              args[filter.name] = parsed || filterValue
            } else {
              args[filter.name] = filterValue
            }
            appHooks.run('mapFilterAdded', {filters: args, name: filter.name})
          }
        } else {
          if (args[filter.name] && !orsParamsParser.isFilterValueValid(args[filter.name])) {
            delete args[filter.name]
          }
        }
      }
    }
    return args
  },
  /**
   * Determines if a filter value is valid
   * @param {*} filterValue
   * @returns {Boolean}
   */
  isFilterValueValid (filterValue) {
    const isValid = filterValue !== '' && filterValue !== undefined && filterValue !== null && filterValue !== '{}' && (typeof filterValue !== 'object' || Object.keys(filterValue).length > 0)
    return isValid
  },

  /**
   * Add a property and its value to an existing parameter
   * If the current parameter is stringified, it converts it
   * back to a json object, add the prop->value and then convert
   * it back to a string representation of the object
   *
   * @param {String} current an string representing an objet where a new prop will be added
   * @param {String|Object} adding an objet or string representing an object that will merged to a parent object
   * @returns {String} representing an object stringified
   */
  getMergedParameterValues (current, adding) {
    const addingParsedJson = typeof adding === 'string' ? Utils.tryParseJson(adding) : adding

    // If what we wanna add was an object stringfied
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
      // if it is not parsable, than retrn the original object
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

        if (filter.name === key) {
          // If the filter has dependencies
          // make sure that the visibility of the filter
          // is defined before checking its availability
          if (filter.validWhen) {
            DependencyService.setVisibility(filtersInto, filtersKey, filtersInto)
          }
          const available = !filter.availableOnModes || filter.availableOnModes.includes(store.getters.mode)

          // If the filter is available, it not intented to be used only
          // in the interface and is not disabled, set its value
          if (available && !filter.onlyInFront && !filter.disabled) {
            const value = options[key]
            const parsedJson = Utils.tryParseJson(value)
            if (parsedJson) {
              this.parseOptions(filtersInto[filtersKey].props, parsedJson)
            } else {
              orsParamsParser.setFilterValueFromParam(filtersInto[filtersKey], options[key])
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
