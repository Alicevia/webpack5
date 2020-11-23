const {resolve}=require('path')
const webpack = require('webpack')
const TWP = require('terser-webpack-plugin')
const {CleanWebpackPlugin:CWP} = require('clean-webpack-plugin')


module.exports = {
  entry:{
    manifest:['axios'],

  },
  output:{
    filename:'[name].[chunkhash].dll.js',
    path:resolve(__dirname,'../dll'),
    library:'[name]'
  },
  plugins:[
    new CWP(),
    new TWP({
      extractComments: false, // 不生成 license.text
      parallel: true, // 开启并行压缩
    }),
    new webpack.DllPlugin({
      name:'[name]',
      path:resolve(__dirname,'../dll/[name].json')
    })
  ]
}