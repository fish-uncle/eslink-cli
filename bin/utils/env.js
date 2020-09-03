module.exports = (env) => {
  const path = require('path')
  let pkg = require(path.join(process.cwd(), './package.json'))

  /**
   * @description 环境变量
   */
  process.env.NODE_ENV = env
  process.env.ESLINK_ENV = env

  /**
   * @description 注入全局变量
   */
  const GLOBALS = {
    'process.env.ESLINK_ENV': JSON.stringify(env),
    'process.env.NODE_ENV': JSON.stringify(env),
    'process.env.pkg.name': JSON.stringify(pkg.name),
    'process.env.pkg.version': JSON.stringify(pkg.version),
  }
  return {GLOBALS, env}
}