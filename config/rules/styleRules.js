const path = require ('path')
const node_modules = path.resolve (__dirname, '../../node_modules')
module.exports = (type) => {
  const config = require (`../${type}.config`)
  return [
    {
      test: /\.css$/,
      exclude: /\.module\.css$/,
      use: [ `${node_modules}/vue-style-loader`, `${node_modules}/style-loader`, {
        loader: `${node_modules}/css-loader`,
      }, {
        loader: `${node_modules}/postcss-loader`,
        options: { plugins: config.postCssPlugins }
      } ]
    },
    {
      test: /\.module\.css$/,
      use: [ `${node_modules}/vue-style-loader`, `${node_modules}/style-loader`, {
        loader: `${node_modules}/css-loader`,
        options: {
          modules: {
            localIdentName: '[name]__[local]--[hash:base64:5]'
          }
        }
      }, {
        loader: `${node_modules}/postcss-loader`,
        options: { plugins: config.postCssPlugins }
      } ]
    },
    {
      test: /\.less$/,
      exclude: /\.module\.less$/,
      use: [ `${node_modules}/style-loader`, {
        loader: `${node_modules}/css-loader`,
      }, {
        loader: `${node_modules}/postcss-loader`,
        options: { plugins: config.postCssPlugins }
      }, {
        loader: `${node_modules}/less-loader`,
        options: {
          modifyVars: config.modifyVars,
          javascriptEnabled: true,
        }
      } ]
    },
    {
      test: /\.module\.less$/,
      use: [
        `${node_modules}/style-loader`,
        {
          loader: `${node_modules}/css-loader`,
          options: {
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          }
        },
        {
          loader: `${node_modules}/postcss-loader`,
          options: { plugins: config.postCssPlugins }
        },
        {
          loader: `${node_modules}/less-loader`,
          options: {
            modifyVars: config.modifyVars,
            javascriptEnabled: true,
          }
        }
      ]
    },
  ]
}