'use strict'
const path = require('path')
const babel = require('./vue.babel.js')
const ip = require('../bin/utils/ip')
const node_modules = path.resolve(__dirname, "../node_modules")
const host = ip() || '127.0.0.1'
let pkg = require(path.join(process.cwd(), './package.json'))
let config = {
  alias: {},
  webpackPlugin: [],
  rules: [],
  entry: path.join(process.cwd(), './src/index.js'),
  postCssPlugins: [
    require(`${node_modules}/autoprefixer`)({overrideBrowserslist: ['last 5 versions']}),
    require(`${node_modules}/cssnano`)()
  ],
  babelPresets: babel.presets,
  babelPlugins: babel.plugins,
  modifyVars: {},
  host,
  port: 3000,
  jsx: false,
  proxy: {},
  favicon: path.join (__dirname, '../favicon.ico'),
  dev: {
    filename: `${pkg.version}/js/[name].js?v=[hash:7]`,
    path: path.join (process.cwd (), `./dist/${pkg.name}/test`),
    template: path.resolve (__dirname, '../index-dev.html'),
    publicPath:  undefined,
    chunkFilename: undefined,
  },
  prod: {
    filename: `${pkg.version}/js/[name].js?v=[hash:7]`,
    path: path.join (process.cwd (), `./dist/${pkg.name}/prod`),
    template: path.resolve (__dirname, '../index-prod.html'),
    publicPath: './',
    chunkFilename: `${pkg.version}/js/[name].js?[hash:7]`,
  },
  test: {
    filename: `${pkg.version}/js/[name].js?v=[hash:7]`,
    path: path.join (process.cwd (), `./dist/${pkg.name}/test`),
    template: path.resolve (__dirname, '../index-test.html'),
    publicPath:  './',
    chunkFilename: `${pkg.version}/js/[name].js?[hash:7]`,
  }
}
try {
  const userConfig = require(path.join(process.cwd(), './eslink.config.js'))
  if (userConfig) {
    for (let key in config) {
      if (userConfig[key]) {
        if (key === 'prod' || key === 'dev') {
          for (let childKey in config[key]) {
            userConfig[key][childKey] ? config[key][childKey] = userConfig[key][childKey] : void 0
          }
        } else if (Object.prototype.toString.call(config[key]) === '[object Object]') {
          config[key] = Object.assign({}, config[key], userConfig[key])
        } else if (typeof config[key] === 'string' || typeof config[key] === 'number') {
          config[key] = userConfig[key]
        } else if (config[key] instanceof Array) {
          config[key] = [...config[key], ...userConfig[key]]
        }
      }
      if (typeof userConfig[key] === 'boolean') {
        config[key] = userConfig[key]
      }
    }
  }
  if (config.jsx) {
    config.babelPresets.push([`${node_modules}/@vue/babel-preset-jsx`])
  }
} catch (e) {

}

module.exports = config