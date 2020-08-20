import OrsMapFilters from '@/resources/ors-map-filters'
import utils from '@/support/utils'
import lodash from 'lodash'

/**
 * Update the status and data of the parameters based on the dependencies declared
 * @param {*} scopedParameters
 */
const getFilterWithValueUpdated = (parameter) => {
  let parameterClone = utils.clone(parameter)
  let globalParameters = OrsMapFilters
  setValue(parameterClone, globalParameters)
  return parameterClone
}

/**
 * Set the parameter disabled attribute at the specified key, which will define its visibility
 * @param {*} scopedParameters
 * @param {*} key
 */
const isAvailable = (parameter) => {
  let globalParameters = OrsMapFilters
  if (parameter.validWhen) {
    let matchesRules = getMatchesDependencyRules(parameter, globalParameters, 'validWhen')
    if (!matchesRules) {
      return false
    }
  }
  return true
}

/**
 * Set the parameter disabled attribute at the specified key, which will define its visibility
 * @param {*} scopedParameters
 * @param {*} globalParameters
 */
const setValue = (parameter, globalParameters) => {
  if (parameter.validWhen) {
    let matchesRules = getMatchesDependencyRules(parameter, globalParameters, 'validWhen')
    if (!matchesRules) {
      parameter.value = null
    }
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
  for (let ruleKey in parameter[dependencyKey]) {
    let rule = parameter[dependencyKey][ruleKey]
    let dependsOn = null
    if (rule.ref === 'self') {
      dependsOn = parameter
    } else {
      dependsOn = getDependencyRelationTargetObj(globalParameters, rule)
    }
    if (dependsOn) {
      let value = getParsedValue(dependsOn.value, dependsOn.apiDefault)
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
    if (rule.hasOwnProperty('value') && rule.value !== undefined) {
      matchesRule = matchForExistingRuleValue(paramValue, ruleValue)
    } else if (rule.hasOwnProperty('valueNot')) {
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

  if (rule.min !== undefined && paramValue < rule.min) {
    matchesRule = false
  }

  if (rule.max !== undefined && paramValue < rule.max) {
    matchesRule = false
  }

  return matchesRule
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
  let type = value === 'true' || value === 'false' || typeof value === 'boolean' ? 'boolean' : null
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
  let rootTargetObject = lodash.find(globalParameters, function (p) { return p.name === rootParameterName })

  // If the target has a child path find it inside
  // the root target parameter object and return it
  if (childPath) {
    return getChildProp(rootTargetObject, childPath)
  }
  // If no child path is defined, return the root target parameter
  return rootTargetObject
}

const getChildProp = (rootObject, propPath) => {
  if (propPath.indexOf('props.') !== -1 && Array.isArray(rootObject.props)) {
    let childPath = propPath.replace('props.', '')
    if (childPath.indexOf('props.') > -1) {
      let subRootName = childPath.split('.')[0]
      let subRoot = lodash.find(rootObject.props, function (p) { return p.name === subRootName })
      return getChildProp(subRoot, childPath.replace(`${subRootName}.`, ''))
    } else {
      let childTargetObject = lodash.find(rootObject.props, function (p) { return p.name === childPath })
      return childTargetObject
    }
  } else {
    let child = lodash.get(rootObject, propPath)
    return child
  }
}

/**
 * Return html string of required parameter settings for this parameter
 * @param parameter
 * @param translations
 * @returns {*}
*/
/**
 * Service exported object/methods
 */
const dependencyService = {
  getFilterWithValueUpdated,
  isAvailable
}

export default dependencyService
