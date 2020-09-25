'use strict'
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('../../../config/vue.config')
const resolve = require('../../../config/resolve')
const devServer = require('../../../config/devServer')
const styleRules = require('../../../config/rules/styleRules')
const eslintRules = require('../../../config/rules/eslintRules')
const node_modules = path.resolve(__dirname, '../../../node_modules')

module.exports = {
	entry: [config.entry],
	optimization: {
		runtimeChunk: {
			name: 'manifest'
		},
		splitChunks: {
			cacheGroups: {
				common: {
					chunks: 'initial',
					name: 'common',
					minChunks: 1,
					maxAsyncRequests: 30,
					maxInitialRequests: 30,
					maxSize: 200 * 1024,
				},
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					priority: 10,
					maxSize: 200 * 1024,
					enforce: true
				}
			}
		}
	},
	resolve: resolve('vue'),
	devServer: devServer('vue'),
	module: {
		rules: [
			...eslintRules,
			{
				test: /\.md$/,
				loader: [`${node_modules}/html-loader`, `${node_modules}/markdown-loader`],
			},
			{
				test: /\.vue$/,
				loader: [`${node_modules}/vue-loader`],
			},
			{
				test: /\.js|jsx$/,
				exclude: /(node_modules|bower_components)/,
				loader: `${node_modules}/babel-loader`,
				options: {presets: config.babelPresets, plugins: config.babelPlugins}
			},
			...styleRules('vue'),
			...config.rules
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		...config.webpackPlugin
	]
}
