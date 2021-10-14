'use strict'

const packageJson = require('../package.json')

let ORSKEY = process.env.ORSKEY

let env = {
  NODE_ENV: '"production"',
  PACKAGE_JSON: JSON.stringify(packageJson)
}

if (ORSKEY) {
  env.ORSKEY = `"${ORSKEY}"`
}

module.exports = env
