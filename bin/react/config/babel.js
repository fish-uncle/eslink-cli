const path = require ('path')
const node_modules = path.resolve (__dirname, '../../../node_modules')
module.exports = {
	'presets': [
		[
			`${node_modules}/@babel/preset-env`,
			{
				'targets': {
					'browsers': [
						'Firefox >= 20',
						'Safari >= 6',
						'Explorer >= 9',
						'Chrome >= 12',
						'ChromeAndroid >= 4.0',
						'iOS >= 6',
						'IE 11'
					]
				},
				'useBuiltIns': false,
				'corejs': false
			}
		],
		`${node_modules}/@babel/preset-react`
	],
	'plugins': [
		`${node_modules}/@babel/plugin-proposal-function-bind`,
		`${node_modules}/@babel/plugin-proposal-export-default-from`,
		`${node_modules}/@babel/plugin-proposal-logical-assignment-operators`,
		[
			`${node_modules}/@babel/plugin-proposal-optional-chaining`,
			{
				'loose': false
			}
		],
		[
			`${node_modules}/@babel/plugin-proposal-pipeline-operator`,
			{
				'proposal': 'minimal'
			}
		],
		[
			`${node_modules}/@babel/plugin-proposal-nullish-coalescing-operator`,
			{
				'loose': false
			}
		],
		`${node_modules}/@babel/plugin-proposal-do-expressions`,
		[
			`${node_modules}/@babel/plugin-proposal-decorators`,
			{
				'legacy': true
			}
		],
		`${node_modules}/@babel/plugin-proposal-function-sent`,
		`${node_modules}/@babel/plugin-proposal-export-namespace-from`,
		`${node_modules}/@babel/plugin-proposal-numeric-separator`,
		`${node_modules}/@babel/plugin-proposal-throw-expressions`,
		`${node_modules}/@babel/plugin-syntax-dynamic-import`,
		`${node_modules}/@babel/plugin-syntax-import-meta`,
		[
			`${node_modules}/@babel/plugin-proposal-class-properties`,
			{
				'loose': true
			}
		],
		`${node_modules}/@babel/plugin-transform-runtime`,
		`${node_modules}/@babel/plugin-proposal-json-strings`,
		`${node_modules}/react-hot-loader/babel`
	]
}