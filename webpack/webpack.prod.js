const { resolve } = require('path')
const { merge } = require('webpack-merge')
const MCEP = require('mini-css-extract-plugin')
const CMWP = require('css-minimizer-webpack-plugin')

const TWP = require('terser-webpack-plugin')

const { CleanWebpackPlugin: CWP } = require('clean-webpack-plugin')
const baseConfig = require('./webpack.base')


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

  externals: ['axios'],//axios不打包 这个地方要注意vender优先级低于该配置 只要配置了vender就不会有
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
    new CWP(),

    new MCEP({
      filename: 'css/[name]_[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:4].css',
    }),
    // new HWP({
    //   title: 'app',
    //   filename: 'app.html',
    //   chunks: ['app'],
    // }),

  ],
  optimization: {
    minimize: true,
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