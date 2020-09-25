'use strict'
const path = require('path')
const config = require('../../../config/react.config')
const node_modules = path.resolve(__dirname, '../../../node_modules')
const resolve = require('../../../config/resolve')
const devServer = require('../../../config/devServer')
const styleRules = require('../../../config/rules/styleRules')

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
	resolve: resolve('react'),
	devServer: devServer('react'),
	module: {
		rules: [
			{
				test: /\.md$/,
				loader: [`${node_modules}/html-loader`, `${node_modules}/markdown-loader`],
			},
			{
				test: /\.tsx|ts?$/, loader: `${node_modules}/awesome-typescript-loader`
			},
			{
				test: /\.js|jsx$/,
				exclude: /(node_modules|bower_components)/,
				loader: `${node_modules}/babel-loader`,
				options: {presets: config.babelPresets, plugins: config.babelPlugins}
			},
			...styleRules('react'),
			...config.rules
		]
	},
	plugins: [
		...config.webpackPlugin
	]
}