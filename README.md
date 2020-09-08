
# eslink-cli

![version](https://img.shields.io/badge/version-v1.1.7-brightgreen.svg?style=flat-square) [![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

---

## 快速上手
   
下载
```
npm i eslink-cli -g
```
初始化项目
```
mkdir hello-world && cd hello-world && eslink init
```
开发环境服务
```
eslink start vue 
eslink start react 
```
打包
```
eslink build prod vue // 生产环境
eslink build test vue // 测试环境
eslink build prod react // 测试环境
eslink build test react // 测试环境
```
配置
```
~root/eslink.config.js
{
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
	dev: {
		filename: `${pkg.version}/js/[name].js?v=[hash:7]`,
		path: path.join(process.cwd(), `./dist/${pkg.name}/test`),
		template: path.resolve(__dirname, '../../../index-dev.html'),
		publicPath: undefined,
		chunkFilename: undefined,
	},
	prod: {
		filename: `${pkg.version}/js/[name].js?v=[hash:7]`,
		path: path.join(process.cwd(), `./dist/${pkg.name}/prod`),
		template: path.resolve(__dirname, '../../../index-prod.html'),
		publicPath: './',
		chunkFilename: `${pkg.version}/js/[name].js?[hash:7]`,
	},
	test: {
		filename: `${pkg.version}/js/[name].js?v=[hash:7]`,
		path: path.join(process.cwd(), `./dist/${pkg.name}/test`),
		template: path.resolve(__dirname, '../../../index-test.html'),
		publicPath: undefined,
		chunkFilename: `${pkg.version}/js/[name].js?[hash:7]`,
	}
}
```