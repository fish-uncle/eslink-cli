const path = require('path')
const fs = require('fs')
const {chalkSuccess} = require('./chalkConfig')
const pkg = require(path.join(process.cwd(), './package.json'))
const _pkg = require(path.join(__dirname, '../../package.json'))
module.exports = {
  project: function () {
    chalkSuccess('当前环境变量')
    console.log('')
    chalkSuccess(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)
    chalkSuccess(`process.env.ESLINK_ENV: ${process.env.ESLINK_ENV}`)
    chalkSuccess(`process.env.pkg.name: ${pkg.name}`)
    chalkSuccess(`process.env.pkg.version: ${pkg.version}`)
  },
  support:function () {
    let support = fs.readFileSync(path.join(__dirname, './support'))
    support = support.toString().replace('@version', `${_pkg.name} v${_pkg.version}`)
    chalkSuccess(support.toString())
    chalkSuccess('正在生成压缩过的捆绑包。这需要一点时间...')
  }
}