'use strict'
const webpack = require ('webpack')
const path = require ('path')
const merge = require ('webpack-merge')
const base = require ('./webpack.base.config')
const config = require ('../../../config/react.config')
const GLOBALS_ENV = require ('../../utils/env')
const env = 'development'
const { GLOBALS } = GLOBALS_ENV (env)
const node_modules = path.resolve (__dirname, '../../../node_modules')
const urlRules = require ('../../../config/rules/urlRules')
const HTMLPlugin = require ('../../../config/HTMLPlugin')
const output = require ('../../../config/output')

module.exports = merge (base, {
  entry: [
    `${node_modules}/react-hot-loader/patch`,
    `${node_modules}/webpack-hot-middleware/client?noInfo=true&reload=true`,
  ],
  output: output ('react', env),
  mode: env,
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    clientLogLevel: 'warning',
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 500,
    poll: 1000
  },
  module: {
    rules: [
      ...urlRules (env)
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin ({
      options: {
        productionGzip: true,
        productionGzipExtensions: [ 'js', 'css' ]
      }
    }),
    HTMLPlugin ('vue', env),
    new webpack.HotModuleReplacementPlugin (),
    new webpack.DefinePlugin (GLOBALS),
  ]
})