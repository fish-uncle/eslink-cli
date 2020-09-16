module.exports = (type, env) => {
  const config = require (`../${type}.config`)
  let e = ''
  switch (env) {
    case 'development':
      e = 'dev'
      break
    case 'production':
      e = 'prod'
      break
    case 'test':
      e = 'test'
      break
  }
  return {
    path: config[e].path,
    filename: config[e].filename,
    publicPath: config[e].publicPath,
    chunkFilename: config[e].chunkFilename
  }
}