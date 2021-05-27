import OrsMapFilters from '@/config/ors-map-filters'
import OrsFilterUtil from '@/support/map-data-services/ors-filter-util'
import lodash from 'lodash'

/**
 * Update the status and data of the parameters based on the dependencies declared
 * @param {*} scopedParameters
 */
const updateFieldsStatus = (scopedParameters) => {
  const globalParameters = OrsMapFilters
  for (const key in scopedParameters) {
    setVisibility(scopedParameters, key)
    applyFilterRestrictions(scopedParameters, key, globalParameters)
  }
}

/**
 * Set the parameter disabled attribute at the specified key, which will define its visibility
 * @param {*} scopedParameters
 * @param {*} key
 * @param {*} globalParameters
 */
const setVisibility = (scopedParameters, key) => {
  const parameter = scopedParameters[key]
  if (parameter.validWhen) {
    const matchesRules = getMatchesDependencyRules(parameter, 'validWhen')
    scopedParameters[key].disabled = !matchesRules
  }
}

/**
 * Determines if the parameter matches the expected value according the rule
 * @param {*} parameter
 * @param {*} globalParameters
 * @param {*} dependencyKey
 * @returns {boolean} matchRule
 */
const getMatchesDependencyRules = (parameter, dependencyKey) => {
  let matchesRule = true
  for (const ruleKey in parameter[dependencyKey]) {
    const rule = parameter[dependencyKey][ruleKey]
    const dependsOn = getDependencyRelationTargetObj(rule.ref, rule.skipRootPathLookup)
    if (dependsOn) {
      const value = getParsedValue(dependsOn.value, dependsOn.apiDefault)
      matchesRule = applyValueRule(rule, value, matchesRule)
      matchesRule = applyConditionRule(rule, value, matchesRule)
    }
    if (!matchesRule) break
  }
  return matchesRule
}

/**
 * Checks if a given value matches a rule
 * @param {*} value
 * @param {*} ruleValue
 * @returns {boolean}
 */
const valueMatchesRule = (value, ruleValue) => {
  // Check for collection Values like "cycling-*"
  if (typeof ruleValue === 'string' && ruleValue.endsWith('*')) {
    return value.startsWith(ruleValue.replace('*', ''))
  } else {
    return value === ruleValue
  }
}

/**
 * Checks whenever the param value matches a dependency required value
 * @param {*} paramValue
 * @param {*} ruleValue
 * @param {*} invertMatch
 * @returns {Boolean}
 */
const matchForExistingRuleValue = (paramValue, ruleValue, invertMatch = false) => {
  let match
  if (Array.isArray(paramValue)) { // if paramValue is an array, check if it contains the ruleValue
    match = lodash.includes(paramValue, ruleValue)
    return invertMatch ? !match : match // consider if the rule is inverted (not match value)
  } else if (Array.isArray(ruleValue)) { // if ruleValue is an array, check if it contains the paramValue
    match = lodash.find(ruleValue, (element) => { return valueMatchesRule(paramValue, element) }) !== undefined
    return invertMatch ? !match : match // consider if the rule is inverted (not match value)
  } else {
    match = valueMatchesRule(paramValue, ruleValue)
    return invertMatch ? !match : match // consider if the rule is inverted (not match value)
  }
}

/**
 * Run a rule on a parameter to determine if it matches the rule requirement or not
 * @param {*} rule
 * @param {*} paramValue
 * @param {*} matchesRule
 * @returns {boolean}
 */
const applyValueRule = (rule, paramValue, matchesRule) => {
  // If the the rule requires a value and the object does not have this value
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
    // If the rule does not required a specific value, then it just requires any value
    // We just check if it has an assigned value
    if (paramValue === null || paramValue === undefined) {
      matchesRule = false
    }
  }
  return matchesRule
}

/**
 * Apply conditional values based on items length and contains
 * @param {*} rule
 * @param {*} paramValue
 * @param {*} matchesRule
 * @returns {boolean}
 */
const applyConditionRule = (rule, paramValue, matchesRule) => {
  if (rule.length !== undefined && paramValue.length !== rule.length) {
    matchesRule = false
  }

  if (rule.contains !== undefined && paramValue !== undefined && !paramValue.includes(rule.value)) {
    matchesRule = false
  }

  return matchesRule
}

/**
 * Apply the filter rules
 * @param {*} scopedParameters
 * @param {*} key
 * @param {*} globalParameters
 */
const applyFilterRestrictions = (scopedParameters, key, globalParameters) => {
  const parameter = scopedParameters[key]
  if (parameter.itemRestrictions) {
    applyItemRestrictions(scopedParameters, key)
  } else if (parameter.valuesRestrictions) {
    applyValuesRestrictions(scopedParameters, key)
  } else if (parameter.props) {
    for (const propKey in parameter.props) {
      applyFilterRestrictions(parameter.props, propKey, globalParameters)
    } 
  }
}

/**
 * Apply items restriction based on rules defined in filter object
 * @param {*} scopedParameters 
 * @param {*} key 
 * @param {*} globalParameters 
 */
const applyItemRestrictions = (scopedParameters, key) => {
  const parameter = scopedParameters[key]
  for (const ruleKey in parameter.itemRestrictions) {
    const rule = parameter.itemRestrictions[ruleKey]
    const validWhen = getDependencyRelationTargetObj(rule.ref, rule.skipRootPathLookup)
    if (validWhen) {
      setFilteredItems(scopedParameters, key, validWhen, rule)
      setFilteredItemsForNullAndUndefined(scopedParameters, key, validWhen, rule)
      removeInvalidValue(scopedParameters[key])
    }
  }
}

/**
 * Apply values restrictions based on rules defined in filter object
 * @param {*} scopedParameters 
 * @param {*} key 
 * @param {*} globalParameters 
 */
const applyValuesRestrictions = (scopedParameters, key) => {
  const parameter = scopedParameters[key]
  for (const ruleKey in parameter.valuesRestrictions) {
    const rule = parameter.valuesRestrictions[ruleKey]
    const validWhen = getDependencyRelationTargetObj(rule.ref, rule.skipRootPathLookup)
    if (validWhen) {
      setFilteredValues(scopedParameters, key, validWhen, rule)
    }
  }
}

/**
 * Set the filter values based on the dependencies rules
 * @param {*} scopedParameters
 * @param {*} key
 * @param {*} validWhen
 * @param {*} rule
 */
 const setFilteredValues = (scopedParameters, key, validWhen, rule) => {
  if (rule.valuesWhen && scopedParameters[key]) {    
    Object.keys(rule.valuesWhen).forEach(function (ruleKey) {
      if ((validWhen.value === ruleKey) || (ruleKey.endsWith('*') && validWhen.value.startsWith(ruleKey.replace('*', '')))) {
        if (rule.valuesWhen[ruleKey].value !== undefined) {
          scopedParameters[key].value = getRuleValue(rule, ruleKey, "value")
        }
        if (rule.valuesWhen[ruleKey].min !== undefined) {
          scopedParameters[key].min = getRuleValue(rule, ruleKey, "min")
        }
        if (rule.valuesWhen[ruleKey].max !== undefined) {
          scopedParameters[key].max = getRuleValue(rule, ruleKey, "max")
          if (scopedParameters[key].min > scopedParameters[key].max) {
            scopedParameters[key].min = scopedParameters[key].max
          }
        }
        if (rule.valuesWhen[ruleKey].multiplyValueBy !== undefined) {
          scopedParameters[key].multiplyValueBy = getRuleValue(rule, ruleKey, "multiplyValueBy")
        }
        if (rule.valuesWhen[ruleKey].step !== undefined) {
          scopedParameters[key].step = getRuleValue(rule, ruleKey, "step")
        }
        return false
      }
    })
  }
}

/**
 * Get a rule value based on routeKey and valueName
 */
const getRuleValue = (rule, ruleKey, valueName) => {
  let value = null
  let valueProp = rule.valuesWhen[ruleKey][valueName]
  if (valueProp !== undefined) {
    if (Array.isArray(valueProp)) {
      let valueRule = valueProp[0]
      const globalParameters = OrsMapFilters      
      let filter = OrsFilterUtil.getFilterRefByName(valueRule.ref, globalParameters, true)
      if ((!filter || filter.value === undefined) && valueProp.length === 2) {
        value = valueProp[1]
      } else {
        value = filter.value
      }
    } else {
      value = rule.valuesWhen[ruleKey][valueName]
    }
  }
  return value
}


/**
 * Remove invalid values from filter
 * @param {Object} filter
 */
const removeInvalidValue = (filter) => {
  if (filter.value !== null && filter.value !== undefined && filter.filteredItems) {
    if (Array.isArray(filter.value)) {
      for (let arrKey in filter.value) {
        let val = filter.value[arrKey]
        var valueIndex = filter.filteredItems.findIndex(function(v) {
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
 * @param {*} scopedParameters
 * @param {*} key
 * @param {*} validWhen
 * @param {*} rule
 */
const setFilteredItems = (scopedParameters, key, validWhen, rule) => {
  if (rule.itemsWhen) {
    if (validWhen.multiSelect && Array.isArray(validWhen.value)) {
      let filteredItems = []
      for (const valueKey in validWhen.value) {
        const value = validWhen.value[valueKey]
        filteredItems = filteredItems.concat(rule.itemsWhen[value])
      }
      scopedParameters[key].filteredItems = filteredItems
    } else {
      if (validWhen.value !== undefined && validWhen.value !== null) {
        let items = rule.itemsWhen[validWhen.value]

        if (!items) {
          Object.keys(rule.itemsWhen).forEach(function (key) {
            if (key.endsWith('*') && validWhen.value.startsWith(key.replace('*', ''))) {
              items = rule.itemsWhen[key]
              return false
            }
          })
        }

        scopedParameters[key].filteredItems = items || []
      }
      setFilteredItemsForNullAndUndefined(scopedParameters, key, validWhen, rule)
    }
  }
}

/**
 * Set the field items based on the dependency field value
 * @param {*} scopedParameters
 * @param {*} key
 * @param {*} validWhen
 * @param {*} rule
 */
const setFilteredItemsForNullAndUndefined = (scopedParameters, key, validWhen, rule) => {
  if (validWhen.value === undefined && rule.itemsWhen.undefined) {
    scopedParameters[key].filteredItems = rule.itemsWhen.undefined
  }
  if (validWhen.value === null && rule.itemsWhen.null) {
    scopedParameters[key].filteredItems = rule.itemsWhen.null
  }
}

/**
 * Get the dependency target object value parsed
 * @returns {*} value
 * @param value
 * @param defaultValue
 * @returns {*}
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
  //  as isNaN(null) results in false -> conversion to undefined
  } else if (value === null) {
    value = undefined
  } else {
    value = isNaN(value) ? value : parseInt(value)
  }
  return value
}

/**
 * Get the parameter object that is the target of a dependency relation
 * It will use the dependency declaration ref to navigate thought the globalParameters
 * and get the target parameter object
 * @param {*} ref
 * @param {*} skipRootPathLookup
 * @returns {*} rootTargetObject
 */
const getDependencyRelationTargetObj = (ref, skipRootPathLookup = false) => {
  const globalParameters = OrsMapFilters
  let rootParameterName = ref
  let childPath = null
  if (!skipRootPathLookup && ref.includes('.')) {
    rootParameterName = ref.split('.')[0]
    childPath = ref.replace(`${rootParameterName}.`, '')
  }

  // First get the object in the root node of global parameters where the dependency ref points to
  const rootTargetObject = lodash.find(globalParameters, function (p) { return p.name === rootParameterName })

  // If the target has a child path find it inside
  // the root target parameter object and return it
  if (childPath) {
    return lodash.get(rootTargetObject, childPath)
  }
  // If no child path is defined, return the root target parameter
  return rootTargetObject
}

/**
 * Return html string of required parameter settings for this parameter
 * @param parameter
 * @param translations
 * @returns {*}
 */
const buildHtmlDisabledTooltip = (parameter, translations) => {
  let tooltip = translations.requires

  const buildTooltipRuleValueArray = (ruleValue) => {
    let valueCount = ruleValue.length
    for (const valueKey in ruleValue) {
      const value = ruleValue[valueKey]
      tooltip += ' <b>' + value + '</b>'
      tooltip += valueCount === 1 ? '' : ' <i>' + translations.or + '</i> '
      valueCount--
    }
  }

  const buildTooltipRuleValue = (rule) => {
    const ruleValue = rule.value || rule.valueNot
    tooltip += ' <b>' + rule.ref + '</b> '
    if (Object.prototype.hasOwnProperty.call(rule, 'value') && rule.value !== undefined) {
      tooltip += translations.toBe + ' '
    } else if (Object.prototype.hasOwnProperty.call(rule, 'valueNot')) {
      tooltip += translations.notToBe + ' '
    }
    if (Array.isArray(ruleValue)) {
      buildTooltipRuleValueArray.call(this, ruleValue)
    } else {
      tooltip += '<b>' + ruleValue + '</b>'
    }
  }

  const buildTooltipRule = (key, counter) => {
    const rule = parameter.validWhen[key]
    if (Object.prototype.hasOwnProperty.call(rule, 'value') || rule.value === undefined) {
      rule.value = typeof rule.value === 'boolean' ? rule.value.toString() : rule.value
    } else if (Object.prototype.hasOwnProperty.call(rule, 'valueNot')) {
      rule.valueNot = typeof rule.valueNot === 'boolean' ? rule.valueNot.toString() : rule.valueNot
    }
    if (rule.value || rule.valueNot) {
      buildTooltipRuleValue.call(this, rule)
    } else {
      tooltip += ' <b>' + rule.ref + '</b>'
    }
    if (counter < parameter.validWhen.length) {
      tooltip += '<br><i>' + translations.and + '</i>'
    }
  }

  if (parameter.validWhen) {
    let counter = 1
    for (const key in parameter.validWhen) {
      buildTooltipRule.call(this, key, counter)
      counter++
    }
    return tooltip
  }
}

/**
 * Service exported object/methods
 */
const dependencyService = {
  updateFieldsStatus,
  setVisibility,
  buildHtmlDisabledTooltip
}

export default dependencyService
