'use strict';
const path = require('path');
const merge = require('webpack-merge');
const HTMLPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.config');
const webpack = require('webpack');
const config = require('./eslink.config');
const GLOBALS_ENV = require('../../utils/env');
const {GLOBALS, env} = GLOBALS_ENV('test');
const node_modules = path.resolve(__dirname, '../../../node_modules');
let pkg = require(path.join(process.cwd(), './package.json'));

module.exports = merge(base, {
  output: {
    path: path.join(process.cwd(), `./dist/${pkg.name}/${env === 'production' ? 'prod' : 'test'}`),
    filename: `${pkg.version}/js/[name].js?v=[hash:7]`,
    publicPath: config.test.publicPath,
    chunkFilename: `${pkg.version}/js/[name].js?[hash:7]`
  },
  mode: 'production',
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        use: {
          loader: `${node_modules}/url-loader`,
          options: {
            limit: 10000,
            esModule: false,
            name: `imgs/[path][name].[ext]?v=[hash:7]`,
            publicPath: `./${pkg.version}/`,
            outputPath: `./${pkg.version}/`
          }
        },
      },
      {
        test: /\.(mp3|mp4)$/,
        exclude: /node_modules/,
        use: {
          loader: `${node_modules}/url-loader`,
          options: {
            name: `medias/[path][name].[ext]?v=[hash:7]`,
            publicPath: `./${pkg.version}/`,
            outputPath: `./${pkg.version}/`
          }
        },
      },
      {
        test: /\.(ttf|svg|woff|woff2|eot|svg)$/,
        use: {
          loader: `${node_modules}/url-loader`,
          options: {
            name: `fonts/[path][name].[ext]?v=[hash:7]`,
            publicPath: `./${pkg.version}/`,
            outputPath: `./${pkg.version}/`
          }
        },
      }
    ]
  },
  plugins: [
    new HTMLPlugin(
      {
							 favicon: config.favicon,
        template: config.test.template,
        filename: path.join(process.cwd(), `./dist/${pkg.name}/test/index.html`),
        title: pkg.name,
        env,
        chunks: {
          head: 'index'
        }
      }
    ),
    new webpack.DefinePlugin(GLOBALS),
  ]
});
