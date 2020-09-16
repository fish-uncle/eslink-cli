const path = require ('path')

module.exports = (type) => {
  const config = require (`../${type}.config`)
  return {
    extensions: [ '.js', '.vue', '.json', '.jsx', '.tsx', '.ts' ],
    alias: {
      '@': path.join (process.cwd (), './', 'src'),
      '_': path.join (process.cwd (), './'),
      '@babel/runtime/regenerator': path.join (__dirname, '../../node_modules/@babel/runtime/regenerator'),
      '@babel/runtime/helpers/asyncToGenerator': path.join (__dirname, '../../node_modules/@babel/runtime/helpers/asyncToGenerator'),
      '@babel/runtime/helpers/defineProperty': path.join (__dirname, '../../node_modules/@babel/runtime/helpers/defineProperty'),
      '@babel/runtime/helpers/toConsumableArray': path.join (__dirname, '../../node_modules/@babel/runtime/helpers/toConsumableArray'),
      '@vue/babel-helper-vue-jsx-merge-props': path.join (__dirname, '../../node_modules/@vue/babel-helper-vue-jsx-merge-props'),
      '@babel/runtime/helpers/classCallCheck': path.join (__dirname, '../../node_modules/@babel/runtime/helpers/classCallCheck'),
      '@babel/runtime/helpers/possibleConstructorReturn': path.join (__dirname, '../../node_modules/@babel/runtime/helpers/possibleConstructorReturn'),
      '@babel/runtime/helpers/inherits': path.join (__dirname, '../../node_modules/@babel/runtime/helpers/inherits'),
      '@babel/runtime/helpers/jsx': path.join (__dirname, '../../node_modules/@babel/runtime/helpers/jsx'),
      '@babel/runtime/helpers/tdz': path.join (__dirname, '../../node_modules/@babel/runtime/helpers/tdz'),
      '@babel/runtime/helpers/set': path.join (__dirname, '../../node_modules/@babel/runtime/helpers/set'),
      '@babel/runtime/helpers/typeof': path.join (__dirname, '../../node_modules/@babel/runtime/helpers/typeof'),
      '@babel/runtime/helpers/newArrowCheck': path.join (__dirname, '../../node_modules/@babel/runtime/helpers/newArrowCheck'),
      '@babel/runtime/helpers/getPrototypeOf': path.join (__dirname, '../../node_modules/@babel/runtime/helpers/getPrototypeOf'),
      '@babel/runtime/helpers/createClass': path.join (__dirname, '../../node_modules/@babel/runtime/helpers/createClass'),
      ...config.alias
    }
  }
}