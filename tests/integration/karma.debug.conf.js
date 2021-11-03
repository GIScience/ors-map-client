// eslint-disable-next-line no-undef
const baseKarmaDebugConf = require('../base-karma.debug.conf.js')

baseKarmaDebugConf.files = [
  { pattern: 'specs/*[sS]pec.js', watched: true, served: true, included: true },
],

baseKarmaDebugConf.coverageReporter = null

// eslint-disable-next-line no-undef
module.exports = function (config) {
  baseKarmaDebugConf.logLevel = config.LOG_DEBUG, //config.LOG_DISABLE, config.LOG_ERROR, config.LOG_INFO, config.LOG_DEBUG
  config.set(baseKarmaDebugConf)
}