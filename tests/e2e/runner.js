/* eslint-disable no-undef */
// 1. start the dev server using production config
process.env.NODE_ENV = 'testing'

const webpack = require('webpack')
const DevServer = require('webpack-dev-server')
const devConfigPromise = require('../../build/webpack.dev.conf')

devConfigPromise.then(devConfig => {
  makeServer(devConfig).then(server => {
    runTests(server) 
  })    
})

/**
 * Run the nightwatch tests against the server
 * @param {Object} server 
 */
function runTests (server) {
  // Run the nightwatch test suite against it to run in additional browsers:
  //    1. add an entry in test/e2e/nightwatch.conf.json under "test_settings"
  //    2. add it to the --env flag below
  // or override the environment flag, for example: `npm run e2e -- --env chrome,firefox`
  // For more information on Nightwatch's config file, see
  // http://nightwatchjs.org/guide#settings-file
  let opts = process.argv.slice(2)
  if (opts.indexOf('--config') === -1) {
    opts = opts.concat(['--config', 'tests/e2e/nightwatch.conf.js'])
  }
  if (opts.indexOf('--env') === -1) {
    opts = opts.concat(['--env', 'chrome'])
  }

  const spawn = require('cross-spawn')
  const runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' })

  runner.on('exit', function (code) {
    server.close()
    process.exit(code)
  })

  runner.on('error', function (err) {
    server.close()
    throw err
  })
}

/**
 * Create a server and wait for compiler and bundle to be ready
 * @param {Object} config 
 * @returns {Promise}
 * @see https://newbedev.com/wait-until-webpack-dev-server-is-ready
 */
function makeServer(config) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(config)

    let compiled = false
    let listening = false

    compiler.hooks.done.tap('done', () => {
      if (listening) resolve(server)
      else compiled = true
    })

    let options = {...config.devServer, ...{progress: false}}
    const server = new DevServer(compiler, options)

    server.listen(config.devServer.port, config.devServer.host, err => {
      if (err) return reject(err)
      console.log('Preparing and compiling the app. The tests will start after that. Please wait...')
      if (compiled) resolve(server)
      else listening = true
    })
  })
}
