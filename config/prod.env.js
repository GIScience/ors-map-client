'use strict'

const packageJson = require('../package.json')

let ORSKEY = process.env.ORSKEY
let BITLYLOGIN = process.env.BITLYLOGIN
let BITLYAPIKEY = process.env.BITLYAPIKEY

let env = {
  NODE_ENV: '"production"',
  PACKAGE_JSON: JSON.stringify(packageJson)
}

if (ORSKEY) {
  env.ORSKEY = `"${ORSKEY}"`
}
if (BITLYLOGIN) {
  env.BITLYLOGIN = `"${BITLYLOGIN}"`
}
if (BITLYAPIKEY) {
  env.BITLYAPIKEY = `"${BITLYAPIKEY}"`
}

module.exports = env
