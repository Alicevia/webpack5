const { resolve } = require('path')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')
const { config } = require('./config')



module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',//source-map大而全  cheap-sourse-map么有列信息 单独文件
  //eval-source-map 没有单独的文件 行列信息完整 
  //inline-source-map base64格式 没有单独文件
  // cheap-module-eval-source-map dev
  //cheap-module-source-map prod可以用来查看错误问题
  // 参数	参数解释
  // eval	打包后的模块都使用 eval() 执行，行映射可能不准；不产生独立的 map 文件
  // cheap	map 映射只显示行不显示列，忽略源自 loader 的 source map
  // inline	映射文件以 base64 格式编码，加在 bundle 文件最后，不产生独立的 map 文件
  // module	增加对 loader source map 和第三方模块的映射
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, '../dist'),
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  devServer: config.dev.devServer,
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