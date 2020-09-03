const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const configWebpack = require('../config/webpack.dev.config');
const config = require('../config/eslink.config');
const bundler = webpack(configWebpack);
const {chalkError} = require('../../utils/chalkConfig');
const info = require('../../utils/info');
const { createProxyMiddleware } = require('http-proxy-middleware');

let httpProxy = [];
for (let key in config.proxy) {
  httpProxy.push(createProxyMiddleware(key,config.proxy[key]))
}
module.exports = () => {
  const pkg = require(path.join(process.cwd(), './package.json'));
  if (/(@|\/)/.test(pkg.name)) {
    chalkError('your package.json \'s name has @|\/ ,this is not allowed')
  } else {
    info.support();
    browserSync({
      logPrefix: 'eslink-cli',
      port: config.port,
      ui: false,
      server: {
        baseDir: path.join(process.cwd(), 'src'),
        middleware: [
          ...httpProxy,
          historyApiFallback(),
          webpackDevMiddleware(bundler, {
            publicPath: configWebpack.output.publicPath,
            stats: 'errors-only',
          }),
          webpackHotMiddleware(bundler),
        ],
      },
      files: [],
    });
    info.project();
  }
}
