const path = require ('path')
const node_modules = path.resolve (__dirname, '../../node_modules')
let pkg = require (path.join (process.cwd (), './package.json'))

module.exports = (env) => {
  const publicPath = env === 'development' ?
    `./${env === 'production' ? `prod` : 'test'}/${pkg.version}/` : `./${pkg.version}/`
  const outputPath = env === 'development' ?
    `./${env === 'production' ? 'prod' : 'test'}/${pkg.version}/` : `./${pkg.version}/`
  return [
    {
      test: /\.(png|jpe?g|gif)(\?.*)?$/,
      exclude: /node_modules/,
      use: {
        loader: `${node_modules}/url-loader`,
        options: {
          limit: 10000,
          esModule: false,
          name: `imgs/[path][name].[ext]?v=[hash:7]`,
          publicPath,
          outputPath
        }
      },
    },
    {
      test: /\.(mp3|mp4)$/,
      exclude: /node_modules/,
      use: {
        loader: `${node_modules}/url-loader`,
        options: {
          name: `medias/[path][name].[ext]?v=[hash:7]`,
          publicPath,
          outputPath
        }
      },
    },
    {
      test: /\.(ttf|woff|woff2|eot|svg)$/,
      use: {
        loader: `${node_modules}/url-loader`,
        options: {
          name: `fonts/[path][name].[ext]?v=[hash:7]`,
          publicPath,
          outputPath
        }
      },
    }
  ]
}