'use strict'
const merge = require ('webpack-merge')
const base = require ('./webpack.base.config')
const webpack = require ('webpack')
const config = require ('../../../config/react.config')
const GLOBALS_ENV = require ('../../utils/env')
const env = 'test'
const { GLOBALS } = GLOBALS_ENV (env)
const urlRules = require ('../../../config/rules/urlRules')
const HTMLPlugin = require ('../../../config/HTMLPlugin')
const output = require ('../../../config/output')

module.exports = merge (base, {
  output: output ('react', env),
  mode: env,
  performance: {
    hints: false
  },
  module: {
    rules: [
      ...urlRules (env)
    ]
  },
  plugins: [
    HTMLPlugin ('vue', env),
    new webpack.DefinePlugin (GLOBALS),
  ]
})
