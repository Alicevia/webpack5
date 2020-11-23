const { resolve } = require('path')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')


module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, '../dist'),
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    hot: true,
    open: true,
    openPage: '',//以contentBase为根文件夹
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'less-loader', options: { sourceMap: true } },
        ],
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
})