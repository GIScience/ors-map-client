'use strict'
const { resolveRoot } = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')


const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolveRoot('src'), resolveRoot('test')],
  exclude: [resolveRoot('tests/integration/mockups')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  plugins: [
    // fix "process is not defined" error:
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ],
  context: resolveRoot(),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    assetModuleFilename: '[base]',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': resolveRoot('src'),
      'vue$': 'vue/dist/vue.esm.js',
      'fixtures': resolveRoot('cypress/fixtures')
    },
    extensions: ['.vue', '.js', '.json'],
    fallback: {
      timers: require.resolve('timers-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolveRoot('src/'),
          resolveRoot('test/'),
          resolveRoot('node_modules/webpack-dev-server/client/')],
        options: {
          plugins: [ '@babel/plugin-proposal-object-rest-spread' ]
        }
      },{
        test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset',
        exclude: resolveRoot('src/plugins')
      },{
        test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset',
        include: resolveRoot('src/plugins'),
        generator: {
          filename: 'static/img/[name][ext]'
        }
      },{
        test: /\.(geojson|kml|gpx|txt)$/i,
        type: 'asset/source',
      }
    ]
  }
}
