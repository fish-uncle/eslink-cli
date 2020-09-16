const path = require ('path')
let pkg = require (path.join (process.cwd (), './package.json'))
const HTMLPlugin = require ('html-webpack-plugin')

module.exports = (type, env) => {
  const config = require (`../${type}.config`)
  return new HTMLPlugin (
    {
      favicon: config.favicon,
      template: config.prod.template,
      filename:
        env === 'development' ? 'index.html' :
          path.join (process.cwd (), `./dist/${pkg.name}/${env === 'production' ? `prod` : 'test'}/index.html`),
      title: pkg.name,
      env,
      chunks: {
        head: 'index'
      }
    }
  )
}