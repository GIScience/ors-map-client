
import OrsMapFilters from '@/resources/ors-map-filters'
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
  for (let filterKey in OrsMapFiltersAccessor) {
    let f = OrsMapFiltersAccessor[filterKey]
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
 * Get the filter value considering its attributes
 * @param {*} filter
 * @param {*} service
 * @returns {*} filterValue
 */
const getFilterValue = (filter, service) => {
  let filterValue = null
  let filterAvailable = !filter.availableOnModes || filter.availableOnModes.includes(store.getters.mode)
  if (filterAvailable) {
    let filterClone = FilterDependencyService.getFilterWithValueValueUpdated(filter)

    if (filterClone.type === constants.filterTypes.wrapper && filterClone.props) {
      if (FilterDependencyService.isAvailable(filterClone)) {
        filterValue = getChildrenFilterValue(filterClone, service)
        filterValue = filterClone.valueAsObject ? filterValue : JSON.stringify(filterValue)
      }
    } else {
      if (filterClone.type === constants.filterTypes.array && Array.isArray(filterClone.value) && !filterClone.valueAsArray) {
        let separator = filterClone.separator || ','
        filterValue = filterClone.value.join(separator)
      } else {
        if (filterClone.min === undefined || filterClone.min === null || filterClone.value >= filterClone.min) {
          filterValue = filterClone.value
        }
      }
    }
    filterValue = applyFilterValueConditions(filterClone, filterValue)
  }

  return filterValue
}

/**
 * Get a filter by acestry and item index
 * @param {*} ancestry
 * @param {*} itemIndex
 * @returns {Object}
 */
const getFilterByAncestryAndItemIndex = (ancestry, immediateParent = null) => {
  let path = buildAncestryAcessorString(ancestry, immediateParent)
  let OrsMapFiltersAccessor = OrsMapFilters
  let accessor = lodash.get(OrsMapFiltersAccessor, path)
  return accessor
}

/**
 * Build the ancestry accessor string
 * @param {*} ancestry
 * @param {*} immediateParent
 * @returns {String}
 */
const buildAncestryAcessorString = (ancestry, itemIndex = null) => {
  let path
  if (Array.isArray(ancestry) && ancestry.length > 1) {
    if (Array.isArray(ancestry[0])) {
      let subPath = buildAncestryAcessorString(ancestry[0])
      path = `[${ancestry[1]}].props${subPath}`
    } else {
      path = `[${ancestry[0]}].props[${ancestry[1]}]`
    }
  } else {
    path = `[${ancestry}]`
  }
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
  if (filterClone.offset && filterClone.step && filterClone.value > filterClone.step) {
    filterValue = filterValue - filterClone.offset
  }
  if (filterValue < filterClone.min) {
    filterValue = null
  }
  if (filterValue && filterClone.multiplyValueBy) {
    filterValue = filterValue * filterClone.multiplyValueBy
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
    let prop = filter.props[propKey]
    let childValue = getFilterValue(prop, service)
    if (childValue !== undefined && childValue !== null) {
      childFilter[prop.name] = childValue
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
  let filter = getFilterRefByName(filterName, OrsMapFiltersAccessor, true)
  if (typeof filter === 'object') {
    let value = filterValue
    if (filter.type === constants.filterTypes.array && typeof optionValue === 'string' && !filter.valueAsArray) {
      let separator = filter.separator || ','
      value = filterValue.split(separator)
    } else if (filter.type === constants.filterTypes.wrapper) {
      for (let key in filter.props) {
        let propName = filter.props[key].name
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
  let filter = OrsMapFiltersAccessor[index]
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
  let filterIndex = lodash.findIndex(OrsMapFiltersAccessor, (f) => {
    return f.name === name
  })
  return filterIndex
}

/**
 * Determines if the round trip filter is active
 * @returns {Boolean} isRoundTrip
 */
const isRoundTripFilterActive = () => {
  let roundTripFilter = getFilterRefByName(constants.roundTripFilterName)
  let roundTripValue = getFilterValue(roundTripFilter, constants.services.directions)
  let isRoundTrip = roundTripValue !== null
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
