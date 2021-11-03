// eslint-disable-next-line no-undef
const baseKarmaConf = require('./base-karma.conf.js')

baseKarmaConf.files = [
  { pattern: 'unit/specs/*[sS]pec.js', watched: false, served: true, included: true },
  { pattern: 'integration/specs/*[sS]pec.js', watched: false, served: true, included: true },
],

baseKarmaConf.preprocessors = {
  'unit/specs/*[sS]pec.js': ['webpack'],
  'integration/specs/*[sS]pec.js': ['webpack'],
  '**/src/*.js': ['coverage']
},

// eslint-disable-next-line no-undef
module.exports = function (config) {
  baseKarmaConf.logLevel = config.LOG_WARN, //config.LOG_DISABLE, config.LOG_ERROR, config.LOG_INFO, config.LOG_DEBUG
  config.set(baseKarmaConf)
}