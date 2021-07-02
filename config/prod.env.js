'use strict'

const packageJson = require('../package.json')

module.exports = {
  NODE_ENV: '"production"',
  PACKAGE_JSON: JSON.stringify(packageJson)
}
