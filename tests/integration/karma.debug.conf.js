// eslint-disable-next-line no-undef
const baseKarmaDebugConf = require('../base-karma.debug.conf.js')

// eslint-disable-next-line no-undef
module.exports = function (config) {
  baseKarmaDebugConf.logLevel = config.LOG_DEBUG, //config.LOG_DISABLE, config.LOG_ERROR, config.LOG_INFO, config.LOG_DEBUG
  config.set(baseKarmaDebugConf)
}