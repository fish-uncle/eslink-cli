module.exports = {
	'env': {
		'browser': true, // 浏览器全局变量
		'es6': true // 启用 ES6 语法支持以及新的 ES6 全局变量或类型
	},
	'extends': [
		'plugin:vue/essential'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module',
		'parser': 'babel-eslint',
	},
	'plugins': [
		'vue'
	],
	'rules': {
		'vue/no-parsing-error': [2, { // vue 语法
			'x-invalid-end-tag': false
		}],
		'space-before-function-paren': 'off',  // 关闭 函数括号前需要空格
		'prefer-promise-reject-errors': 'off', // 关闭 要求使用Error对象作为Promise reject
		'template-curly-spacing': 'off', // 关闭 强制使用模板字符串中的间距
		'no-else-return': 'off', // 关闭 禁止在else 后 return
		'no-spaced-func': 'off', // 关闭 function 前不允许空格
		'object-curly-spacing': 'off', // 关闭 在花括号内强制保持一致的间距
		'indent': ['error', 'tab'], // 强制使用一致的缩进
		'no-var': ['error'], // 使用let, const代替var声明变量
		'lines-around-comment': ['error', { 'beforeBlockComment': true }], // 强制注释周围有空行
		'comma-dangle': ['error', 'never'], // 不允许尾随逗号
		'semi': ['error', 'never'], // 不允许分号语句的端部
		'eol-last': ['error', 'never'] // 强制文件不以换行符结尾
		// 'no-invalid-this': ['error'], // 禁止 this 关键字出现在类和类对象之外
	},
	'overrides': [
		{
			'files': ['*.vue'],
			'rules': {
				'indent': 'off',
				'vue/script-indent': ['error', 'tab', { 'baseIndent': 1 }], // vue script标签缩进设置
				'no-unused-vars': 'off',
				'vue/no-unused-vars': ['error', { // vue template for 循环未定义
					'ignorePattern': '^_'
				}]
			}
		}
	]
}