const { resolve } = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const { CleanWebpackPlugin: CWP } = require('clean-webpack-plugin')
const HWP = require('html-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  // webpack 5 新特性，开启缓存，缓存默认只在 development 模式下开启，有 memery 和 filesystem 两种，具体参考文档

  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, '../dist'),
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  cache: {
    type: 'memory',
  },
  plugins: [
    new CWP(),
    new HWP({
      title: 'index',
      filename: 'index.html',
      chunks: ['index', 'shared'],
    }),
    new HWP({
      title: 'app',
      filename: 'app.html',
      chunks: ['app'],
    }),

  ]
})