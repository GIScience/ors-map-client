import OrsFilterUtil from '@/support/map-data-services/ors-filter-util'
import OrsMapFilters from '@/config/ors-map-filters'
import constants from '@/resources/constants'
import utils from '@/support/utils'
import store from '@/store/store'
import lodash from 'lodash'

/**
 * Update the status and data of the parameters based on the dependencies declared
 * @param {*} scopedFilters
 */
const updateFieldsStatus = (scopedFilters) => {
  for (const key in scopedFilters) {
    setAvailability(scopedFilters, key)
    setVisibility(scopedFilters, key)
    applyFilterRestrictions(scopedFilters, key)
  }
}
/**
 * Get the filter value considering its attributes and dependencies
 * @param {*} filter
 * @param {*} service
 * @returns {*} filterValue
 */
const getFilterValue = (filter) => {
  let filterValue = null
  const filterAvailable = !filter.availableOnModes || filter.availableOnModes.includes(store.getters.mode)
  const filterClone = getFilterWithValueUpdated(filter)
  // Proceed only if filter is available considering other filter's value
  if (filterAvailable && isAvailable(filterClone)) {
    // Get the filter with value updated considering dependencies and filter rules
    if (filterClone.type === constants.filterTypes.wrapper && filterClone.props) {
      filterValue = getChildrenFilterValue(filterClone)
      filterValue = filterClone.valueAsObject ? filterValue : JSON.stringify(filterValue)
      // Apply filter conditions like min, multiplier etc
      filterValue = applyFilterValueConditions(filterClone, filterValue)
    } else {
      // adjustFilterValue internally use applyFilterValueConditions
      filterValue = adjustFilterValue(filterClone, filterValue)
    }
  }

  return filterValue
}

/**
 * Apply filter value conditions
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
 * Get filter children value
 * @param {*} filter
 * @param {*} service
 * @returns {*}
 */
const getChildrenFilterValue = (filter) => {
  const childFilter = {}
  for (let propKey in filter.props) {
    const prop = filter.props[propKey]
    // Filter may have dependency and only be available
    // if other filters have a certain value.
    if (isAvailable(prop)) {
      const childValue = getFilterValue(prop)
      if (childValue !== undefined && childValue !== null) {
        childFilter[prop.name] = childValue
      }
    }
  }
  return Object.keys(childFilter).length > 0 ? childFilter : null
}

/**
 * Determines if the round trip filter is active
 * @returns {Boolean} isRoundTrip
 */
const isRoundTripFilterActive = () => {
  const roundTripFilter = OrsFilterUtil.getFilterRefByName(constants.roundTripFilterName)
  const roundTripValue = getFilterValue(roundTripFilter)
  const isRoundTrip = roundTripValue !== null
  return isRoundTrip
}


/**
 * Adjust filter value
 * @param {Object} filter
 * @param {*} filterValue
 * @returns {*} filterValue
 */
const adjustFilterValue = (filter, filterValue) => {
  // Check if the filter value must be extracted as an array and do it if so
  if (filter.type === constants.filterTypes.array && Array.isArray(filter.value) && !filter.valueAsArray) {
    const separator = filter.separator || ','
    filterValue = filter.value.join(separator)
  } else if (filter.valueAsArray && !Array.isArray(filter.value)) {
    let val = filter.value
    if ((val === undefined || val === null) && filter.min !== undefined) {
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
 * Checks whenever the param value matches a dependency required value
 * @param {*} filterValue
 * @param {*} ruleValue
 * @param {Boolean} invertedMatch
 * @returns {Boolean}
 */
const matchForExistingRuleValue = (filterValue, ruleValue, invertedMatch = false) => {
  let match
  if (Array.isArray(filterValue)) {
    match = lodash.includes(filterValue, ruleValue)
    return invertedMatch ? !match : match
  } else if (Array.isArray(ruleValue)) {
    match = lodash.find(ruleValue, (element) => { return valueMatchesRule(filterValue, element) }) !== undefined
    return invertedMatch ? !match : match
  } else {
    match = valueMatchesRule(filterValue, ruleValue)
    return invertedMatch ? !match : match
  }
}

/**
 * Determines if a given value matches a given rule
 * @param {*} value
 * @param {*} ruleValue
 * @returns {boolean}
 */
const valueMatchesRule = (value, ruleValue) => {
  // Check for collection Values like 'cycling-*'
  if (typeof ruleValue === 'string' && ruleValue.endsWith('*')) {
    return value.startsWith(ruleValue.replace('*', ''))
  } else {
    return value === ruleValue
  }
}

/**
 * Get the declared dependency expected value
 * @param {Object} filter
 * @param {String} dependencyKey
 * @returns {boolean} matchRule
 */
const getMatchesDependencyRules = (filter, dependencyKey) => {
  let matchRule = true

  for (const ruleKey in filter[dependencyKey]) {
    const rule = filter[dependencyKey][ruleKey]
    let dependsOn = null
    if (rule.ref === 'self') {
      dependsOn = filter
    } else {
      dependsOn = getDependencyRelationTargetObj(rule.ref)
    }
    if (dependsOn) {
      const value = getParsedValue(dependsOn.value, dependsOn.apiDefault)
      matchRule = applyValueRule(rule, value, matchRule)
      matchRule = applyConditionRule(rule, value, matchRule)
    }
    if (!matchRule) break
  }
  return matchRule
}

/**
 * Apply conditional values based on items length and contains
 * @param {Object} rule
 * @param {*} paramValue
 * @param {Boolean} matchesRule
 * @returns {boolean}
 */
const applyConditionRule = (rule, paramValue, matchesRule) => {
  if (rule.length !== undefined && paramValue.length !== rule.length) {
    matchesRule = false
  }

  if (rule.contains !== undefined && paramValue !== undefined && !paramValue.includes(rule.value)) {
    matchesRule = false
  }

  if (rule.min !== undefined && paramValue < rule.min) {
    matchesRule = false
  }

  if (rule.max !== undefined && paramValue < rule.max) {
    matchesRule = false
  }

  return matchesRule
}

/**
 * Run a rule on a parameter to determine if it matches the role requirement or not
 * @param {Object} rule
 * @param {*} paramValue
 * @param {*} matchesRule
 * @returns {boolean}
 */
const applyValueRule = (rule, paramValue, matchesRule) => {
  // If the rule requires a value and the object does not have this value
  // then the dependent object matchesRule is set to false
  let ruleValue = rule.value || rule.valueNot
  ruleValue = getParsedValue(ruleValue)
  if (ruleValue !== undefined && paramValue !== undefined) {
    if (Object.prototype.hasOwnProperty.call(rule, 'value') && rule.value !== undefined) {
      matchesRule = matchForExistingRuleValue(paramValue, ruleValue)
    } else if (Object.prototype.hasOwnProperty.call(rule, 'valueNot')) {
      matchesRule = matchForExistingRuleValue(paramValue, ruleValue, true)
    }
  } else {
    // If the rule does not require a specific value, then it just requires any value
    // We just check if it has an assigned value
    if (paramValue === null || paramValue === undefined) {
      matchesRule = false
    }
  }
  return matchesRule
}

/**
 * Update the status and data of the parameters based on the dependencies declared
 * @param {Object} filter
 * @returns {Object} filterClone
 */
const getFilterWithValueUpdated = (filter) => {
  const filterClone = utils.clone(filter)
  if (filterClone.dependsOnFilter) {
    const matchRules = getMatchesDependencyRules(filter, 'validWhen')
    if (!matchRules) {
      filter.value = null
    }
  }
  return filterClone
}

/**
 * Set the parameter disabled attribute at the specified key, which will define its visibility
 * @param {*} scopedFilters
 * @param {*} key
 */
const setAvailability = (scopedFilters, key) => {
  const parameter = scopedFilters[key]
  if (parameter.validWhen) {
    const matchesRules = getMatchesDependencyRules(parameter, 'validWhen')
    scopedFilters[key].disabled = !matchesRules
  }
}

/**
 * Set the parameter disabled attribute at the specified key, which will define its visibility
 * @param {*} scopedFilters
 * @param {*} key
 */
const setVisibility = (scopedFilters, key) => {
  const parameter = scopedFilters[key]
  if (parameter.visibleWhen) {
    const matchesRules = getMatchesDependencyRules(parameter, 'visibleWhen')
    scopedFilters[key].hidden = !matchesRules
  }
}



/**
 * Determines if the filter is available based on dependency rules
 * @param {*} filter
 * @returns {Boolean}
 */
const isAvailable = (filter) => {
  if (filter.validWhen) {
    let matchesRules = getMatchesDependencyRules(filter, 'validWhen')
    if (!matchesRules) {
      return false
    }
  }
  return true
}

/**
 * Apply the filter rules
 * @param {*} scopedFilters
 * @param {*} key
 */
const applyFilterRestrictions = (scopedFilters, key) => {
  const parameter = scopedFilters[key]
  if (parameter.itemRestrictions) {
    applyItemRestrictions(scopedFilters, key)
  } else if (parameter.valuesRestrictions) {
    applyValuesRestrictions(scopedFilters, key)
  } else if (parameter.props) {
    for (const propKey in parameter.props) {
      applyFilterRestrictions(parameter.props, propKey)
    }
  }
}

/**
 * Apply items restriction based on rules defined in filter object
 * @param {*} scopedFilters
 * @param {*} key
 */
const applyItemRestrictions = (scopedFilters, key) => {
  const filter = scopedFilters[key]
  for (const ruleKey in filter.itemRestrictions) {
    const rule = filter.itemRestrictions[ruleKey]
    const dependsOnFilter = getDependencyRelationTargetObj(rule.ref)
    if (filter) {
      setFilteredItems(scopedFilters, key, dependsOnFilter, rule)
      setFilteredItemsForNullAndUndefined(scopedFilters, key, dependsOnFilter, rule)
      removeInvalidValue(scopedFilters[key])
    }
  }
}

/**
 * Apply values restrictions based on rules defined in filter object
 * @param {*} scopedFilters
 * @param {*} key
 */
const applyValuesRestrictions = (scopedFilters, key) => {
  const filter = scopedFilters[key]
  for (const ruleKey in filter.valuesRestrictions) {
    const rule = filter.valuesRestrictions[ruleKey]
    const dependsOnFilter = getDependencyRelationTargetObj(rule.ref)
    if (dependsOnFilter) {
      setFilteredValues(scopedFilters, key, dependsOnFilter, rule)
    }
  }
}

/**
 * Set the filter values based on the dependence rules
 * @param {*} scopedFilters
 * @param {*} key
 * @param {*} validWhen
 * @param {*} rule
 */
const setFilteredValues = (scopedFilters, key, dependsOnFilter, rule) => {
  if (rule.valuesWhen && scopedFilters[key]) {
    Object.keys(rule.valuesWhen).forEach(function (ruleKey) {
      if (dependsOnFilter.value) {
        if ((dependsOnFilter.value === ruleKey) || (ruleKey.endsWith('*') && dependsOnFilter.value.startsWith(ruleKey.replace('*', '')))) {
          if (rule.valuesWhen[ruleKey].value !== undefined) {
            scopedFilters[key].value = getRuleValue(rule, ruleKey, 'value')
          }
          if (rule.valuesWhen[ruleKey].min !== undefined) {
            scopedFilters[key].min = getRuleValue(rule, ruleKey, 'min')
          }
          if (rule.valuesWhen[ruleKey].max !== undefined) {
            scopedFilters[key].max = getRuleValue(rule, ruleKey, 'max')
            if (scopedFilters[key].min > scopedFilters[key].max) {
              scopedFilters[key].min = scopedFilters[key].max
            }
          }
          if (rule.valuesWhen[ruleKey].multiplyValueBy !== undefined) {
            scopedFilters[key].multiplyValueBy = getRuleValue(rule, ruleKey, 'multiplyValueBy')
          }
          if (rule.valuesWhen[ruleKey].step !== undefined) {
            scopedFilters[key].step = getRuleValue(rule, ruleKey, 'step')
          }
          return false
        }
      }
    })
  }
}

/**
 * Get a rule value based on routeKey, propName and value rule dependencies
 * @param {Object} rule
 * @param {String} ruleKey
 * @param {String} propName
 * @returns {*} value
 */
const getRuleValue = (rule, ruleKey, propName) => {
  let value = null
  let propValue = rule.valuesWhen[ruleKey][propName]
  if (propValue !== undefined) {
    if (Array.isArray(propValue)) {
      let valueRule = propValue[0]
      let dependsOnFilter = getDependencyRelationTargetObj(valueRule.ref)
      // if the first option does not have a valid value, get the second
      if ((!dependsOnFilter || dependsOnFilter.value === undefined) && propValue.length === 2) {
        value = propValue[1]
      } else {
        if (valueRule.calc) {
          let prop = valueRule.prop || 'value'
          if (valueRule.calc.dividedBy) {
            value = Math.round(dependsOnFilter[prop] / valueRule.calc.dividedBy)
          } else if (valueRule.calc.multipliedBy) {
            value = Math.round(dependsOnFilter[prop] / valueRule.calc.multipliedBy)
          }
          if (value < valueRule.min)  {
            value = valueRule.min
          }
        } else {
          value = dependsOnFilter.value
        }
      }
    } else {
      value = propValue
    }
  }
  return value
}


/**
 * Remove invalid values from a filter object
 * @param {Object} filter
 */
const removeInvalidValue = (filter) => {
  if (filter.value !== null && filter.value !== undefined && filter.filteredItems) {
    if (Array.isArray(filter.value)) {
      for (let arrKey in filter.value) {
        let val = filter.value[arrKey]
        const valueIndex = filter.filteredItems.findIndex(function (v) {
          return val === v || val === v.itemValue
        })
        if (valueIndex === -1) {
          filter.value.splice(Number(arrKey), 1)
        }
      }
    } else {
      if (!filter.filteredItems.includes(filter.value)) {
        filter.value = null
      }
    }
  }
}

/**
 * Set the field items based on the dependencies rules
 * @param {*} scopedFilters
 * @param {*} key
 * @param {*} filter
 * @param {*} rule
 */
const setFilteredItems = (scopedFilters, key, filter, rule) => {
  if (rule.itemsWhen) {
    if (filter.multiSelect && Array.isArray(filter.value)) {
      let filteredItems = []
      for (const valueKey in filter.value) {
        const value = filter.value[valueKey]
        filteredItems = filteredItems.concat(rule.itemsWhen[value])
      }
      scopedFilters[key].filteredItems = filteredItems
    } else {
      if (filter.value !== undefined && filter.value !== null) {
        let items = rule.itemsWhen[filter.value]

        if (!items) {
          Object.keys(rule.itemsWhen).forEach(function (key) {
            if (key.endsWith('*') && filter.value.startsWith(key.replace('*', ''))) {
              items = rule.itemsWhen[key]
              return false
            }
          })
        }

        scopedFilters[key].filteredItems = items || []
      }
      setFilteredItemsForNullAndUndefined(scopedFilters, key, filter, rule)
    }
  }
}

/**
 * Set the field items based on the dependency field value
 * @param {*} scopedFilters
 * @param {*} key
 * @param {*} filter
 * @param {*} rule
 */
const setFilteredItemsForNullAndUndefined = (scopedFilters, key, filter, rule) => {
  if (filter.value === undefined && rule.itemsWhen.undefined) {
    scopedFilters[key].filteredItems = rule.itemsWhen.undefined
  }
  if (filter.value === null && rule.itemsWhen.null) {
    scopedFilters[key].filteredItems = rule.itemsWhen.null
  }
}

/**
 * Get the dependency target object value parsed
 * @param value
 * @param defaultValue
 * @returns {*} value
 */
const getParsedValue = (value, defaultValue = null) => {
  if (value === undefined || value === null || value === '') {
    value = defaultValue
  }
  const type = value === 'true' || value === 'false' || typeof value === 'boolean' ? 'boolean' : null
  if (type === 'boolean') {
    if (typeof value !== 'boolean') {
      value = value === 'true'
    }
  } else if (value === null) {
    value = undefined
  } else {
    value = isNaN(value) ? value : parseFloat(value)
  }
  return value
}


/**
 * Get the parameter object that is the target of a dependency relation
 * It will use the dependency declaration ref to navigate thought the globalParameters
 * and get the target parameter object
 * @param {String} path
 * @param {Array} filters
 * @param {Boolean} checkAvailability
 * @returns {*} rootTargetObject
 */
const getDependencyRelationTargetObj = (path, filters) => {
  const globalFilters = filters || OrsMapFilters
  let rootFilterName = path
  let childPath = null
  if (path.includes('.')) {
    rootFilterName = path.split('.')[0]
    childPath = path.replace(`${rootFilterName}.`, '')
  }
  const rootTargetObject = lodash.find(globalFilters, function (filter) {
    return filter.name === rootFilterName
  })

  // If the target has a child path find it inside
  // the root target parameter object and return it
  if (rootTargetObject && childPath) {
    return getChildProp(rootTargetObject, childPath)
  }
  // If no child path is defined, return the root target parameter
  return rootTargetObject
}

/**
 * Get filter child prop based on a string path
 * @param {*} rootObject
 * @param {*} propPath
 * @returns {Object}
 */
const getChildProp = (rootObject, propPath) => {
  if (propPath.indexOf('props.') !== -1 && Array.isArray(rootObject.props)) {
    const childPath = propPath.replace('props.', '')
    if (childPath.indexOf('props.') > -1) {
      const subRootName = childPath.split('.')[0]
      const subRoot = lodash.find(rootObject.props, function (p) { return p.name === subRootName })
      return getChildProp(subRoot, childPath.replace(`${subRootName}.`, ''))
    } else {
      const childTargetObject = lodash.find(rootObject.props, function (p) { return p.name === childPath })
      return childTargetObject
    }
  } else {
    const child = lodash.get(rootObject, propPath)
    return child
  }
}

/**
 * Service exported object/methods
 */
const dependencyService = {
  updateFieldsStatus,
  setAvailability,
  getFilterValue,
  getChildrenFilterValue,
  isRoundTripFilterActive,
  getFilterWithValueUpdated,
  isAvailable,
  getDependencyRelationTargetObj
}

export default dependencyService
