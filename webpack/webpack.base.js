const { resolve, join } = require('path')
const webpack = require('webpack')
const PCP = require('purgecss-webpack-plugin')

const { entry, srcPath, pagesAllFile, HWP } = require('./config')
module.exports = {
  // 目前 webpack-dev-server 在配置 browserslist 的时候无法启用 live reloading & HMR, 需要加上下面的配置
  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
  context: srcPath,
  entry,
  // entry: () => ({
  //   index: {
  //     import: './pages/index/index.js',
  //     dependOn: 'shared',
  //   },
  //   app: {
  //     import: './pages/page1/page1.js'
  //   },
  //   shared: ['axios']
  // }),
  resolve: {
    alias: {
      '@': srcPath
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除 node_modules 文件夹
        use: [
          {
            loader: 'thread-loader', // 将后面的 loader 放置在一个 worker 池里面运行，以达到多线程构建。
            options: {
              workers: 3, // 配置 thread-loader 的 worker 数
            },
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 开启 babel-loader 缓存
            },
          },
          // 'eslint-loader', // 配置 eslint 进行代码检查
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 4000, // 图片小于 4000 Bytes 会使用 base64 打包插入 HTML
          name: 'images/[name][hash:8].[ext]',
          // publicPath: '/images/', // 很多 loader 可以单独设置 publicPath
        },
      },
      {
        test: /\.(woff|woff2|eot|otf|ttf)$/,
        loader: 'url-loader',
        options: {
          limit: 3000, // 字体小于 4000 Bytes 会使用 base64 打包插入 HTML
          name: 'fonts/[name].[hash:8].[ext]',
        },
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      // _axios : 'axios',
    }),
    // new webpack.DllReferencePlugin({
    //   manifest:resolve(__dirname,'../dll/manifest.json')
    // }),
    // new AddAssetHtmlWebpackPlugin({
    //   filepath: resolve(__dirname, '../dll/*.dll.js')  
    // }),
    new PCP({ paths: pagesAllFile }),//css useless
    ...HWP,
  ],
  optimization: {
    // 代码分割
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minRemainingSize: 0,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      usedExports: true,
      cacheGroups: {
        // 新的 chunk 被复用，或者来自 node_modules 目录。
        // 新的 chunk 大于 30Kb(min+gzip前）。
        // 按需加载 chunk 的并发请求数量小于等于 5 个。
        // 页面初始加载时的并发请求数量小于等于 3 个。
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          minChunks: 2,//只要引入了包就打到venders里
          priority: 10,
          reuseExistingChunk: true,
        },
        common: {//同一个文件被其他模块引入了2次就被打包进这里
          test: /[\\/]src[\\/]/,
          minChunks: 2,
          priority: 9,
          name: 'common',
          reuseExistingChunk: true,
          minSize: 0,
        },
        default: {
          filename: 'js/default.js'
        },

      },
    },
  },
}