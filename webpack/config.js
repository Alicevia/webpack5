const { resolve } = require('path')
const { generateFileName, getEntries, getHWP } = require('./utils')
const glob = require('glob')
// ==================================================config


const config = {
  base: {
    venders: [],//['axios', ['axios', 'moment']] 每一项表示要单独打出来的第三方包，内部的数组表示这个包包含多个
    dependOns: {
      // index: ['axios'],
      // page1: ['axios-moment'],//表示要引入的是第二个项目 
      // page2: ['axios-moment', 'axios']
    },//venders和depondOns用来给页面 设定 自己的包自己引入 不会产生 自己的包其他页面也引用
    srcPath: resolve(__dirname, '../src'),//src的绝对地址
    pagesPath: resolve(__dirname, '../src/pages/*/*'),//pages所有一级目录下的文件地址
    resolve: {
      alias: {
        '@': resolve(__dirname, '../src')
      }
    },
  },
  dev: {
    devServer: {
      contentBase: './dist',
      host: 'localhost',
      hot: true,
      open: true,
      openPage: '',//以contentBase为根文件夹
    },
  },
  prod: {
    externals: ['axios', 'moment']
  }
}

console.log(config)
const { filePath, filenameAry } = generateFileName(config.base.pagesPath)
exports.config = config
exports.pagesAllFile = glob.sync(`${config.base.srcPath}/pages/**/*`, { nodir: true })
exports.entry = getEntries(filenameAry, filePath, config.base.venders, config.base.dependOns)
exports.HWP = getHWP(filenameAry, config.base.dependOns, config.base.srcPath)


