const { resolve } = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const { CleanWebpackPlugin: CWP } = require('clean-webpack-plugin')
const MCEP = require('mini-css-extract-plugin')

const {HWP} = require('./config')

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
  module:{
    rules:[
      {
        test: /\.css$/,
        use: [
            MCEP.loader,
            'css-loader',
            'postcss-loader',
            {
                loader: 'px2rem-loader',
                options: {
                    remUnit: 75,
                    remPrecision: 8,
                },
            },
        ],
    },
    ]
  },
  plugins: [
    new MCEP({
      filename:'css/[name]_[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
    new CWP(),
    ...HWP
    // new HWP({
    //   title: 'app',
    //   filename: 'app.html',
    //   chunks: ['app'],
    // }),

  ]
})