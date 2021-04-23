
import OrsMapFilters from '@/config/ors-map-filters'
import FilterDependencyService from './filter-dependency-service'
import store from '@/store/store'
import constants from '@/resources/constants'
import lodash from 'lodash'

/**
 * Get filter object reference by filter name
 * @param {*} OrsMapFiltersAccessor
 * @param {*} filterName
 * @returns {*|false} filter object or false
 */
const getFilterRefByName = (filterName, OrsMapFiltersAccessor = null, onlyIfEnabled = false) => {
  OrsMapFiltersAccessor = OrsMapFiltersAccessor || OrsMapFilters

  var filter
  for (const filterKey in OrsMapFiltersAccessor) {
    const f = OrsMapFiltersAccessor[filterKey]
    // Don't get disabled filters if the
    // onlyIfEnabled param is true
    if (!onlyIfEnabled || !f.disabled) {
      if (f.name === filterName) {
        filter = f
        break
      } else if (f.type === constants.filterTypes.wrapper && Array.isArray(f.props)) {
        filter = getFilterRefByName(filterName, f.props)
      }
    }
    if (filter) {
      break
    }
  }
  return filter || false
}

/**
 * Get the filter value considering its attributes and dependencies
 * @param {*} filter
 * @param {*} service
 * @returns {*} filterValue
 */
const getFilterValue = (filter, service) => {
  let filterValue = null
  const filterAvailable = !filter.availableOnModes || filter.availableOnModes.includes(store.getters.mode)
  const filterClone = FilterDependencyService.getFilterWithValueUpdated(filter)
  // Proceed only if filter is available considering other filter's value
  if (filterAvailable && FilterDependencyService.isAvailable(filterClone)) {
    // Get the filter with value updated considering dependencies and filter rules
    if (filterClone.type === constants.filterTypes.wrapper && filterClone.props) {      
      filterValue = getChildrenFilterValue(filterClone, service)
      filterValue = filterClone.valueAsObject ? filterValue : JSON.stringify(filterValue)
      // Apply filter conditions like min, multiplier etc
      filterValue = applyFilterValueConditions(filterClone, filterValue)
    } else {
      filterValue = adjustdFilterValue(filterClone, filterValue)
    }
  }

  return filterValue
}

/**
 * Adjust filter value
 * @param {Object} filter
 * @param {*} filterValue
 * @returns {*} filterValue
 */
const adjustdFilterValue = (filter, filterValue) => {
  if (filter.name === 'range') {
    console.log(filter)
  }
  // Check if the filter value must be extracted as an array and do it if so
  if (filter.type === constants.filterTypes.array && Array.isArray(filter.value) && !filter.valueAsArray) {
    const separator = filter.separator || ','
    filterValue = filter.value.join(separator)
  } else if (filter.valueAsArray && !Array.isArray(filter.value)) {
    let val = filter.value
    if (val === undefined || val === null) {
      val = filter.min
    }
    if (val !== undefined && val !== null) {
      val = applyFilterValueConditions(filter, val)
      filterValue = [val]
    }
  } else { // In the other cases, just get the filter raw value
    filterValue = filter.value
    // Apply filter conditions like min, multiplier etc
    filterValue = applyFilterValueConditions(filter, filterValue)
  }
  return filterValue
}

/**
 * Get a filter by acestry and item index
 * @param {*} ancestry
 * @param {*} itemIndex
 * @returns {Object} accessor
 */
const getFilterByAncestryAndItemIndex = (ancestry, itemIndex = null) => {
  let path = buildAncestryAcessorString(ancestry, itemIndex)
  let OrsMapFiltersAccessor = OrsMapFilters
  let accessor = lodash.get(OrsMapFiltersAccessor, path)
  return accessor
}

/**
 * Build the ancestry accessor string as a goal to build a string
 * that represents the path to retrive a target item present in
 * @see /resources/ors-map-filter.js.
 * The map filters is a array of objects that may contains
 * child objects under the `props` prperty, that, if defined,
 * also contains an array of child objects. Many levels of objects
 * with props and child objets is possible. This method creates
 * a string that represets the navigation required to access a target
 * object considering the index of each step
 * @param {*} ancestry
 * @param {*} itemIndex
 * @returns {String} path
 */
const buildAncestryAcessorString = (ancestry, itemIndex = null) => {
  let path
  // Multiple levels of ancestry is suppported.
  // So, if ancestry is an array, then the first value
  // is the parent level of ancestry and we have to
  // resolve it recursively
  if (Array.isArray(ancestry) && ancestry.length > 1) {
    if (Array.isArray(ancestry[0])) {
      let subPath = buildAncestryAcessorString(ancestry[0])
      // In case of recursive ancestry, the value in
      // position 1 is the immediate parent and we must
      // assembly this with the subpath generated
      path = `[${ancestry[1]}].props${subPath}`
    } else {
      // In case there is not recursive ancestry
      // just build the path using the immediate parent
      // and the target prop index
      path = `[${ancestry[1]}].props[${ancestry[0]}]`
    }
  } else {
    // ancestry is jut an integer,
    // pointing to a position in a index
    path = `[${ancestry}]`
  }
  // Item index is the last level of navigation towards the
  // target item and we append it to the building path if it
  if (itemIndex !== null && itemIndex !== undefined && itemIndex >= 0) {
    path = `${path}.props[${itemIndex}]`
  }
  return path
}

/**
 * Apply filtervalue conditions
 * @param {*} filterClone
 * @param {*} filterValue
 * @returns {*} filterValue
 */
const applyFilterValueConditions = (filterClone, filterValue) => {
  if (!Object.is(filterValue) && !Array.isArray(filterValue)) {
    if (filterClone.offset && filterClone.step && filterClone.value > filterClone.step) {
      filterValue = filterValue - filterClone.offset
    }
    if (filterClone.min !== null && filterClone.min !== undefined && filterValue < filterClone.min) {
      filterValue = null
    }
    if (filterValue && filterClone.multiplyValueBy) {
      filterValue = filterValue * filterClone.multiplyValueBy
    }
  }
  return filterValue
}

/**
 * Get filter children value stringfied
 * @param {*} filter
 * @param {*} service
 * @returns {String}
 */
const getChildrenFilterValue = (filter, service) => {
  var childFilter = {}
  for (let propKey in filter.props) {
    const prop = filter.props[propKey]
    // Filter may have dependency and only be available
    // if other filters have a certain value.
    if (FilterDependencyService.isAvailable(prop)) {
      const childValue = getFilterValue(prop, service)
      if (childValue !== undefined && childValue !== null) {
        childFilter[prop.name] = childValue
      }
    }
  }
  return Object.keys(childFilter).length > 0 ? childFilter : null
}

/**
 * Set filter value by specifiing filter name
 * @param {*} filterName
 * @param {*} filterValue
 * @param {*} OrsMapFiltersAccessor
 * @returns {Boolean} set
 */
const setFilterValue = (filterName, filterValue, OrsMapFiltersAccessor = null) => {
  const filter = getFilterRefByName(filterName, OrsMapFiltersAccessor, true)
  if (typeof filter === 'object') {
    let value = filterValue
    if (filter.type === constants.filterTypes.array && typeof optionValue === 'string' && !filter.valueAsArray) {
      const separator = filter.separator || ','
      value = filterValue.split(separator)
    } else if (filter.type === constants.filterTypes.wrapper) {
      for (const key in filter.props) {
        const propName = filter.props[key].name
        setFilterValue(propName, filterValue[propName])
      }
    } else {
      // we are populating the filter value
      // so, if has a multiplier that must be used when extracting the value
      // we must use this multiplier in reversed mode to set the value correctly
      if (filter.multiplyValueBy) {
        filter.value = value / filter.multiplyValueBy
      } else {
        filter.value = value
      }
    }
    return true
  } else {
    return false
  }
}

/**
 * Get filter object reference by filter name
 * @param {*} OrsMapFiltersAccessor
 * @param {*} index
 * @returns {*} filter object
 */
const getFilterRefByRootIndex = (index, OrsMapFiltersAccessor = null) => {
  OrsMapFiltersAccessor = OrsMapFiltersAccessor || OrsMapFilters
  const filter = OrsMapFiltersAccessor[index]
  return filter
}

/**
 * Get filter index by filter name
 * @param {*} OrsMapFiltersAccessor
 * @param {*} name
 * @returns {*} filter object
 */
const getFilterIndexByName = (name, OrsMapFiltersAccessor = null) => {
  OrsMapFiltersAccessor = OrsMapFiltersAccessor || OrsMapFilters
  const filterIndex = lodash.findIndex(OrsMapFiltersAccessor, (f) => {
    return f.name === name
  })
  return filterIndex
}

/**
 * Determines if the round trip filter is active
 * @returns {Boolean} isRoundTrip
 */
const isRoundTripFilterActive = () => {
  const roundTripFilter = getFilterRefByName(constants.roundTripFilterName)
  const roundTripValue = getFilterValue(roundTripFilter, constants.services.directions)
  const isRoundTrip = roundTripValue !== null
  return isRoundTrip
}

const filterUtil = {
  getFilterRefByName,
  getFilterIndexByName,
  getFilterRefByRootIndex,
  setFilterValue,
  getFilterValue,
  isRoundTripFilterActive,
  getFilterByAncestryAndItemIndex
}

export default filterUtil
