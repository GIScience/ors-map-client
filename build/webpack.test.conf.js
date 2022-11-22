'use strict'
// This is the webpack config used for unit tests.

const utils = require('./utils')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require("copy-webpack-plugin")
const {resolveRoot} = require("./utils")

const webpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules: utils.styleLoaders()
  },
  devtool: 'inline-source-map',
  resolveLoader: {
    alias: {
      // necessary to make lang="scss" work in test when using vue-loader's ?inject option
      // see discussion at https://github.com/vuejs/vue-loader/issues/724
      'scss-loader': 'sass-loader'
    }
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: resolveRoot("src/assets"),
        to: "static"
      }]
    }),
  ],
  resolve: {
    fallback: {
      fs: false,
      module: false,
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      vm: require.resolve('vm-browserify')
    },
  }
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
