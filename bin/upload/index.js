const fs = require('fs')
const join = require('path').join
const ProgressBar = require('./progress-bar')
const pb = new ProgressBar('上传进度', 50)
const COS = require('cos-nodejs-sdk-v5')
const cos = new COS({
  SecretId: 'AKIDUv9RZYYuJUXN0QE6GD6kU1LPHNE0qqTO',
  SecretKey: '4ye6LLAl7EAsLbebKp7D5jAOSIwOdfed'
})
const info = require('../utils/info')
const upload = () => {
  info.support()
  getJsonFiles(join(process.cwd(), './dist'))
}
function getJsonFiles(jsonPath) {
  let jsonFiles = []
  function findJsonFile(path) {
    let files = fs.readdirSync(path)
    files.forEach(function (item, index) {
      let fPath = join(path, item)
      let stat = fs.statSync(fPath)
      if (stat.isDirectory() === true) {
        findJsonFile(fPath)
      }
      if (stat.isFile() === true) {
        if (!/.*node_modules.*/.test(fPath)) {
          jsonFiles.push(fPath)
        }
      }
    })
  }
  findJsonFile(jsonPath)
  let num = 0, total = jsonFiles.length
  pb.render({completed: num, total: total}) // 更新进度条
  jsonFiles.forEach(item => {
    let name = item.replace(join(process.cwd(), './dist'), '')
    name = name.replace(/\\/g, '/')
    uploadFile(name, item, () => {
      num++
      if (num <= total) {
        pb.render({completed: num, total: total}) // 更新进度条
      }
    })
  })
}

const uploadFile = (name, localFile, callback = () => {
}) => {
  cos.getObject({
    Bucket: 'web-ct-1258601646',
    Region: 'ap-shanghai',
    Key: name,
    Output: fs.createWriteStream(join(process.cwd(), './.cosCache')),
  }, function (err, data) {
    cos.putObject({
      Bucket: 'web-ct-1258601646',
      Region: 'ap-shanghai',
      Key: name,
      StorageClass: 'STANDARD',
      Body: fs.readFileSync(localFile),
      onProgress: function (progressData) {
      }
    }, function (err, data) {
      if (err) {
        console.log(err)
      }
      if (data) {
        callback()
      }
    })
  })
}

module.exports = upload