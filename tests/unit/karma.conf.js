// eslint-disable-next-line no-undef
const baseKarmaConf = require('../base-karma.conf.js')

// run only integration tests (point to local specs folder)
baseKarmaConf.files = [
  { pattern: 'specs/*[sS]pec.js', watched: true, served: true, included: true },
],

// Do not include `coverage`, since the coverage
// is only generated when running the all-tests command
baseKarmaConf.reporters = ['mocha', 'kjhtml'],

// Do not include `coverage` reporter, since the coverage
// is only generated when running the all-tests command
baseKarmaConf.preprocessors = {
  'specs/*[sS]pec.js': ['webpack'],
},

// eslint-disable-next-line no-undef
module.exports = function (config) {
  baseKarmaConf.logLevel = config.LOG_WARN, //config.LOG_DISABLE, config.LOG_ERROR, config.LOG_INFO, config.LOG_DEBUG
  config.set(baseKarmaConf)
}