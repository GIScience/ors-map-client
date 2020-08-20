import OrsMapFilters from '@/resources/ors-map-filters'
import lodash from 'lodash'

/**
 * Update the status and data of the parameters based on the dependencies declared
 * @param {*} scopedParameters
 */
const updateFieldsStatus = (scopedParameters) => {
  const globalParameters = OrsMapFilters
  for (const key in scopedParameters) {
    setVisibility(scopedParameters, key, globalParameters)
    applyItemsFilter(scopedParameters, key, globalParameters)
  }
}

/**
 * Set the parameter disabled attribute at the specified key, which will define its visibility
 * @param {*} scopedParameters
 * @param {*} key
 * @param {*} globalParameters
 */
const setVisibility = (scopedParameters, key, globalParameters) => {
  const parameter = scopedParameters[key]
  if (parameter.validWhen) {
    const matchesRules = getMatchesDependencyRules(parameter, globalParameters, 'validWhen')
    scopedParameters[key].disabled = !matchesRules
  }
}

/**
 * Get the declared dependency expected value
 * @param {*} parameter
 * @param {*} globalParameters
 * @param {*} dependencyKey
 * @returns {boolean} matchRule
 */
const getMatchesDependencyRules = (parameter, globalParameters, dependencyKey) => {
  let matchRule = true
  for (const ruleKey in parameter[dependencyKey]) {
    const rule = parameter[dependencyKey][ruleKey]
    const dependsOn = getDependencyRelationTargetObj(globalParameters, rule)
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
  if (Array.isArray(paramValue)) {
    match = lodash.includes(paramValue, ruleValue)
    return invertMatch ? !match : match
  } else if (Array.isArray(ruleValue)) {
    match = lodash.find(ruleValue, (element) => { return valueMatchesRule(paramValue, element) }) !== undefined
    return invertMatch ? !match : match
  } else {
    match = valueMatchesRule(paramValue, ruleValue)
    return invertMatch ? !match : match
  }
}

/**
 * Run a rule on a parameter to determine if it matches the role requirement or not
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
 * apply the filter rules
 * @param {*} scopedParameters
 * @param {*} key
 * @param {*} globalParameters
 */
const applyItemsFilter = (scopedParameters, key, globalParameters) => {
  const parameter = scopedParameters[key]
  if (parameter.itemRestrictions) {
    for (const ruleKey in parameter.itemRestrictions) {
      const rule = parameter.itemRestrictions[ruleKey]
      const validWhen = getDependencyRelationTargetObj(globalParameters, rule)
      if (validWhen) {
        setFilteredItems(scopedParameters, key, validWhen, rule)
        setFilteredItemsForNullAndUndefined(scopedParameters, key, validWhen, rule)
      }
    }
  } else if (parameter.props) {
    for (const propKey in parameter.props) {
      applyItemsFilter(parameter.props, propKey, globalParameters)
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
 * @param {*} globalParameters
 * @param {*} rule
 * @returns {*} rootTargetObject
 */
const getDependencyRelationTargetObj = (globalParameters, rule) => {
  let rootParameterName = rule.ref
  let childPath = null
  if (!rule.skipRootPathLookup && rule.ref.includes('.')) {
    rootParameterName = rule.ref.split('.')[0]
    childPath = rule.ref.replace(`${rootParameterName}.`, '')
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
