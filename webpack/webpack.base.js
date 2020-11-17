const { resolve } = require('path')
const HWP = require('html-webpack-plugin')
const { CleanWebpackPlugin: CWP } = require('clean-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  mode: 'development',
  context: resolve(__dirname, '../src'),
  devtool: 'eval',//cheap 只有行的 module 源代码
  entry: () => ({
    main: {
      import: './main.js',
      dependOn: 'shared',
    },
    app: {
      import: './app'
    },
    shared: ['axios']
  }),
  output: {
    filename: '[name]/[name].js',
    path: resolve(__dirname, '../dist'),
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  devServer: {
    contentBase: './dist',
    open: true,
    openPage: 'main/main.html',
    // hot: true,
    host: 'localhost',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new CWP(),
    new HWP({
      title: 'main',
      filename: 'main/main.html',
      chunks: ['main', 'shared'],
    }),
    new HWP({
      title: 'app',
      filename: 'app/app.html',
      chunks: ['app'],
    }),
  ]
}