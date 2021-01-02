const { resolve } = require('path')
const { merge } = require('webpack-merge')
const MCEP = require('mini-css-extract-plugin')
const CMWP = require('css-minimizer-webpack-plugin')

const TWP = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin: CWP } = require('clean-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const baseConfig = require('./webpack.base')
const { config } = require('./config')

module.exports = merge(baseConfig, {
  mode: 'production',
  // webpack 5 新特性，开启缓存，缓存默认只在 development 模式下开启，有 memery 和 filesystem 两种，具体参考文档
  cache: {
    type: 'memory',
  },
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, '../dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },

  externals: config.prod.externals,//axios不打包 这个地方要注意vender优先级低于该配置 只要配置了vender就不会有
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MCEP.loader,
          'css-loader',
          'postcss-loader',
          // {
          //   loader: 'px2rem-loader',
          //   options: {
          //     remUnit: 75,
          //     remPrecision: 8,
          //   },
          // },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackTagsPlugin({
      tags: [
        // 'https://cdn.bootcdn.net/ajax/libs/axios/0.21.0/axios.js',
        // 'https://cdn.bootcdn.net/ajax/libs/vue/2.6.12/vue.common.dev.min.js'
      ],
      publicPath: false,//可以配置通用的地址https
    }),
    new CWP(),
    // new CompressionPlugin(),//gzip
    new MCEP({
      filename: 'css/[name]_[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:4].css',
    }),


  ],
  optimization: {
    concatenateModules:true,//开启scope-hosting 作用域提升
    usedExports:true,//标记没用的树叶
    minimize: true,//开始tree-shaking
    minimizer: [
      new TWP({
        //开启多线程提升速度
        extractComments: false, // 不生成 license.text
        parallel: true,
        terserOptions: {
          compress: {
            unused: true,
            drop_debugger: true,
            drop_console: true,
            dead_code: true,
          }
        }
      }),
      new CMWP({
        parallel: true, // 开启并行压缩
      })
    ]
  }
})