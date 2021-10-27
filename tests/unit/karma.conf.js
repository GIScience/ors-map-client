// eslint-disable-next-line no-undef
const baseKarmaConf = require('../base-karma.conf.js')

// eslint-disable-next-line no-undef
module.exports = function (config) {
  baseKarmaConf.logLevel = config.LOG_WARN, //config.LOG_DISABLE, config.LOG_ERROR, config.LOG_INFO, config.LOG_DEBUG
  config.set(baseKarmaConf)
}