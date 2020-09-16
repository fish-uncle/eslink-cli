const path = require ('path')
const node_modules = path.resolve (__dirname, '../../node_modules')
module.exports = [
  // {
  //   enforce: 'pre',
  //   test: /\.js|jsx|vue$/,
  //   exclude: /node_modules/,
  //   loader: `${node_modules}/eslint-loader`,
  //   options: {
  //     formatter: require (`${node_modules}/eslint-friendly-formatter`),
  //     configFile: path.join (__dirname, './.eslintrc.js'),
  //   },
  // },
]