#!/usr/bin/env node
const yargs = require('yargs');
const path = require('path');
const {chalkWarning} = require('./utils/chalkConfig');
const cli = yargs
  .command('start type', '启动服务', (yargs) => {
  }, (argv) => {
    switch (argv.type) {
      case 'vue':
        require('./vue/build/start')();
        break;
      case 'react':
        require('./react/build/start')();
        break;
      default:
        chalkWarning('Dou you want `fish start vue` or `fish start react` ?');
    }
  })
  .command('build env type', '打包服务', (yargs) => {
  }, (argv) => {
    if (argv.env === 'prod' && argv.type === 'vue') {
      require('./vue/build/build')();
    }
    if (argv.env === 'prod' && argv.type === 'react') {
      require('./react/build/build')();
    }
    if (argv.env === 'test' && argv.type === 'vue') {
      require('./vue/build/test')();
    }
    if (argv.env === 'test' && argv.type === 'react') {
      require('./react/build/test')();
    }
  })
  .command('upload', '上传服务', (yargs) => {
  }, (argv) => {
    require('./upload/index')()
  })
  .command('init', '初始化服务', (yargs) => {
  }, (argv) => {
    require('./init/index')()
  })
  .option('help', {
    alias: 'h',
    describe: '显示帮助'
  })
  .option('version', {
      alias: 'v',
      describe: '显示版本号'
    }
  )
  .argv;