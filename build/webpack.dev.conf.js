'use strict'
const {resolveRoot, styleLoaders} = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const portfinder = require('portfinder')
const CopyWebpackPlugin = require("copy-webpack-plugin")

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  stats: "normal",
  module: {
    rules: styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    client: {
      logging: 'verbose',
      overlay: { warnings: false, errors: true },
    },
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'dev.html') }
      ],
    },
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: false,
    static: {
      directory: 'src/assets',
      publicPath: '/static',
    },
    proxy: config.dev.proxyTable
  },
  watchOptions: {
    poll: 1000,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: resolveRoot("node_modules/leaflet/dist/images"),
        to: resolveRoot("images")
      }]
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'dev.html',
      template: 'dev.html',
      inject: true
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      resolve(devWebpackConfig)
    }
  })
})
