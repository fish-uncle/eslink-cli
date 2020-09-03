const webpack = require('webpack');
const config = require('../config/webpack.pro.config');
const {chalkError, chalkProcessing} = require('../../utils/chalkConfig');
const info = require('../../utils/info');
module.exports = () => {
  info.support();
  webpack(config).run((error, stats) => {
    if (error) {
      chalkError(error);
      return 1;
    } else {
      chalkProcessing(`Webpack stats: ${stats}`);
      return 0;
    }
  });
  info.project();
}