const { defineConfig } = require("cypress");
const config = require('./config');
const webpackPreprocessor = require('@cypress/webpack-preprocessor')

module.exports = defineConfig({
  projectId: '2npvgh',
  video: false,
  e2e: {
    specPattern: [
      "cypress/e2e/*.{cy,spec}.{js,jsx,ts,tsx}",
      "src/**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}"
    ],
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const options = {
        // send in the options from your webpack.config.js, so it works the same
        // as your app's code
        webpackOptions: require('./build/webpack.base.conf'),
        watchOptions: {},
      }

      on('file:preprocessor', webpackPreprocessor(options))
    },
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'webpack',
      // optionally pass in webpack config
      webpackConfig: require('./build/webpack.cypress.conf'),
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    excludeSpecPattern: "src/**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}"
  },

});
