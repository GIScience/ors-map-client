'use strict'
const {assetsPath, resolveRoot} = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/dev.env')
  : require('../config/prod.env')

console.log(env)

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  stats: 'errors-warnings',
  module: {
    // rules: utils.styleLoaders({
    //   sourceMap: config.build.productionSourceMap,
    //   extract: true,
    //   usePostCSS: true
    // })
    rules: [{
      test: /\.(sa|sc|c)ss$/,
      exclude: [
        resolveRoot("node_modules/leaflet/dist"),
        resolveRoot("node_modules/leaflet-measure/dist"),
        resolveRoot("node_modules/vue2-leaflet-height-graph"),
        resolveRoot("node_modules/leaflet/dist"),
      ],
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader",
        "sass-loader",
      ],
    },{
      test: /\.(styl|stylus)$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader",
        "stylus-loader"
      ]
    },{
      test: /\.css$/,
      include: [
        resolveRoot("node_modules/leaflet/dist"),
        resolveRoot("node_modules/leaflet-measure/dist"),
        resolveRoot("node_modules/vue2-leaflet-height-graph"),
        resolveRoot("node_modules/leaflet/dist"),
        ],
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader",
      ],
      generator: {
        outputPath: 'static/img',
      }
    }
    ]
  },
  resolve: {
    alias: {
      "favicon.ico": "static/img/favicon.ico",
    }
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: resolveRoot(),
    filename: 'static/js/[name].[contenthash].js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new CssMinimizerPlugin({})
    ]
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: assetsPath('css/[name].[fullhash].css'),
      chunkFilename: "[id].[contenthash].css",
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'dev.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.ids.HashedModuleIdsPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin({
        patterns: [{
            from: resolveRoot("src/assets"),
            to: resolveRoot("static")
          }]
      }),
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
