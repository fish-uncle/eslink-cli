module.exports = (type) => {
  const config = require (`../${type}.config`)
  return {
    clientLogLevel: 'none',
    host: config.host,
    hotOnly: true,
    inline: true,
    hot: true,
    open: true,
    compress: true,
  }
}