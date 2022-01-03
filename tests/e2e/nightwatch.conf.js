
// https://www.davidmello.com/nightwatch-global-environment-variables/
/* eslint-disable no-undef */
require('@babel/register')
var config = require('../../config')

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['tests/e2e/specs'],
  output_folder: 'tests/e2e/reports',
  custom_assertions_path: ['tests/e2e/custom-assertions'],
  custom_commands_path: ['tests/e2e/commands'],
  // An object which will be made available on the main test api, throughout the test execution
  globals: { // https://nightwatchjs.org/guide/configuration/defaults.html

    // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
    // expect assertions
    waitForConditionTimeout: 10000,

    // controls the timeout value for async hooks. Expects the done() callback to be invoked within this time
    // or an error is thrown
    asyncHookTimeout: 10000,
  },

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },

  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      globals: {
        devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port)
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        'chromeOptions': {
          'args': [
            '--headless',
            '--disable-gpu',
            '--no-sandbox', // required to run without privileges in docker
            '--disable-dev-shm-usage', // https://svdoscience.com/2021-03-17/fix-session-deleted-page-crash-selenium-grid-chrome-docker
            // '--disable-web-security'
          ],
          prefs:{
            download:{
              prompt_for_download: false,
              default_directory:require('path').resolve(__dirname + '/downloads')
            }
          }
        }
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
        prefs:{
          download:{
            prompt_for_download: false,
            default_directory:require('path').resolve(__dirname + '/downloads')
          }
        }
      }
    }
  }
}
