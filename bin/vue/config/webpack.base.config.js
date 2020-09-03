'use strict'
const path = require ('path')
const VueLoaderPlugin = require ('vue-loader/lib/plugin')
const config = require ('./eslink.config')
const node_modules = path.resolve (__dirname, '../../../node_modules')

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
					minChunks: 2,
					maxInitialRequests: 5,
					minSize: 0
				},
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					priority: 10,
					enforce: true
				}
			}
		}
	},
	resolve: {
		extensions: ['.js', '.vue', '.json', 'jsx'],
		alias: {
			'@': path.join (process.cwd (), './', 'src'),
			'_': path.join (process.cwd (), './'),
			'@babel/runtime/regenerator': path.join (__dirname, '../../../node_modules/@babel/runtime/regenerator'),
			'@babel/runtime/helpers/asyncToGenerator': path.join (__dirname, '../../../node_modules/@babel/runtime/helpers/asyncToGenerator'),
			'@babel/runtime/helpers/defineProperty': path.join (__dirname, '../../../node_modules/@babel/runtime/helpers/defineProperty'),
			'@babel/runtime/helpers/toConsumableArray': path.join (__dirname, '../../../node_modules/@babel/runtime/helpers/toConsumableArray'),
			'@vue/babel-helper-vue-jsx-merge-props': path.join (__dirname, '../../../node_modules/@vue/babel-helper-vue-jsx-merge-props'),
			...config.alias
		}
	},
	devServer: {
		clientLogLevel: 'none',
		host: config.host,
		hotOnly: true,
		inline: true,
		hot: true,
		open: true,
		compress: true,
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js|jsx|vue$/,
				exclude: /node_modules/,
				loader: `${node_modules}/eslint-loader`,
				options: {
					formatter: require (`${node_modules}/eslint-friendly-formatter`),
					configFile: path.join (__dirname, './.eslintrc.js'),
				},
			},
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
				options: { presets: config.babelPresets, plugins: config.babelPlugins }
			},
			{
				test: /\.css$/, use: [`${node_modules}/vue-style-loader`, `${node_modules}/style-loader`, {
					loader: `${node_modules}/css-loader`,
				}, {
					loader: `${node_modules}/postcss-loader`,
					options: { plugins: config.postCssPlugins }
				}]
			},
			{
				test: /\.less$/, use: [`${node_modules}/style-loader`, {
					loader: `${node_modules}/css-loader`,
				}, {
					loader: `${node_modules}/postcss-loader`,
					options: { plugins: config.postCssPlugins }
				}, {
					loader: `${node_modules}/less-loader`,
					options: {
						modifyVars: config.modifyVars,
						javascriptEnabled: true,
					}
				}]
			},
			...config.rules
		]
	},
	plugins: [
		new VueLoaderPlugin (),
		...config.webpackPlugin
	]
}
