'use strict'
const webpack = require ('webpack')
const HTMLPlugin = require ('html-webpack-plugin')
const path = require ('path')
const merge = require ('webpack-merge')
const base = require ('./webpack.base.config')
const config = require ('./eslink.config')
const GLOBALS_ENV = require ('../../utils/env')
const { GLOBALS, env } = GLOBALS_ENV ('development')
const node_modules = path.resolve (__dirname, '../../../node_modules')
let pkg = require (path.join (process.cwd (), './package.json'))

module.exports = merge (base, {
	entry: [
		`${node_modules}/react-hot-loader/patch`,
		`${node_modules}/webpack-hot-middleware/client?noInfo=true&reload=true`,
	],
	output: {
		path: config.dev.path,
		filename: config.dev.filename,
		publicPath: config.dev.publicPath,
		chunkFilename: config.dev.chunkFilename
	},
	mode: 'development',
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
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				exclude: /node_modules/,
				use: {
					loader: `${node_modules}/url-loader`,
					options: {
						limit: 10000,
						esModule: false,
						name: `imgs/[path][name].[ext]?v=[hash:7]`,
						publicPath: `./${env === 'production' ? `prod` : 'test'}/${pkg.version}/`,
						outputPath: `./${env === 'production' ? 'prod' : 'test'}/${pkg.version}/`
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
						publicPath: `./${env === 'production' ? `prod` : 'test'}/${pkg.version}/`,
						outputPath: `./${env === 'production' ? 'prod' : 'test'}/${pkg.version}/`
					}
				},
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: {
					loader: `${node_modules}/url-loader`,
					options: {
						name: `fonts/[path][name].[ext]?v=[hash:7]`,
						publicPath: `./${env === 'production' ? `prod` : 'test'}/${pkg.version}/`,
						outputPath: `./${env === 'production' ? 'prod' : 'test'}/${pkg.version}/`
					}
				},
			}
		]
	},
	plugins: [
		new webpack.LoaderOptionsPlugin ({
			options: {
				productionGzip: true,
				productionGzipExtensions: ['js', 'css']
			}
		}),
		new HTMLPlugin (
			{
				favicon: config.favicon,
				template: config.dev.template,
				filename: 'index.html',
				title: pkg.name,
				env,
			}
		),
		new webpack.HotModuleReplacementPlugin (),
		new webpack.DefinePlugin (GLOBALS),
	]
})