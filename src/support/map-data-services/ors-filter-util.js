
import OrsMapFilters from '@/config/ors-map-filters'
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

  let filter
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
 * Get a filter by ancestry and item index
 * @param {*} ancestry
 * @param {*} itemIndex
 * @returns {Object} accessor
 */
const getFilterByAncestryAndItemIndex = (ancestry, itemIndex = null) => {
  let path = buildAncestryAccessorString(ancestry, itemIndex)
  let OrsMapFiltersAccessor = OrsMapFilters
  let accessor = lodash.get(OrsMapFiltersAccessor, path)
  return accessor
}

/**
 * Build the ancestry accessor string as a goal to build a string
 * that represents the path to retrieve a target item present in
 * @see /resources/ors-map-filter.js.
 * The map filters is an array of objects that may contain
 * child objects under the `props` property, that, if defined,
 * also contains an array of child objects. Many levels of objects
 * with props and child objects is possible. This method creates
 * a string that represents the navigation required to access a target
 * object considering the index of each step
 * @param {*} ancestry
 * @param {*} itemIndex
 * @returns {String} path
 */
const buildAncestryAccessorString = (ancestry, itemIndex = null) => {
  let path
  // Multiple levels of ancestry is supported.
  // So, if ancestry is an array, then the first value
  // is the parent level of ancestry, and we have to
  // resolve it recursively
  if (Array.isArray(ancestry) && ancestry.length > 1) {
    if (Array.isArray(ancestry[0])) {
      let subPath = buildAncestryAccessorString(ancestry[0])
      // In case of recursive ancestry, the value in
      // position 1 is the immediate parent, and we must
      // assemble this with the sub-path generated
      path = `[${ancestry[1]}].props${subPath}`
    } else {
      // In case there is not recursive ancestry
      // just build the path using the immediate parent
      // and the target prop index
      path = `[${ancestry[1]}].props[${ancestry[0]}]`
    }
  } else {
    // ancestry is an integer pointing to a position in an index
    path = `[${ancestry}]`
  }
  // Item index is the last level of navigation towards the
  // target item, and we append it to the building path if it
  if (itemIndex !== null && itemIndex !== undefined && itemIndex >= 0) {
    path = `${path}.props[${itemIndex}]`
  }
  return path
}

/**
 * Set filter value by specified filter name
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
        if (filterValue[propName]) {
          setFilterValue(propName, filterValue[propName])
        }
      }
    } else {
      // If the filter value has a multiplier that must be used when extracting the value
      // we use this multiplier in reversed mode to set the value correctly
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



const filterUtil = {
  getFilterRefByName,
  getFilterIndexByName,
  getFilterRefByRootIndex,
  setFilterValue,
  getFilterByAncestryAndItemIndex
}

export default filterUtil
