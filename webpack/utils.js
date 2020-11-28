
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
exports.generateFileName = (pages) => {
  let filenameAry = []
  let filePath = []
  let reg = /(.*\/)*([^.]+).(js|ts)/ig
  glob.sync(pages).forEach(item => {
    if (reg.test(item)) {
      filePath.push(item)
      filenameAry.push(item.replace(reg, '$2'))
    }
  })
  return {
    filenameAry, filePath
  }
}

exports.isNullObj = (obj) => {
  return Object.keys(obj).length === 0
}

exports.getEntries = (filenameAry, filePath, venders = [], dependOns = {}) => {
  let entry = {}
  //生成所有的vender
  venders.forEach(item => {
    entry[[].concat(item).join('-')] = { import: [].concat(item) }
    // entry[item] = { import: item }
  })
  // 生成所有的入口引用并且引入对应的依赖
  filenameAry.forEach((name, index) => {
    entry[name] = {
      import: filePath[index],
    }
    if (dependOns[name]) {
      entry[name].dependOn = dependOns[name]
    }
  })
  console.log(entry)

  // entry: () => ({
  //   index: {
  //     import: './pages/index/index.js',
  //     dependOn: 'shared',
  //   },
  //   app: {
  //     import: './pages/page1/page1.js'
  //   },
  //   shared1: ['axios','moment'],
  //   shared2: ['axios','moment'],
  // }),
  return entry
}

exports.getHWP = (filenameAry, dependOns, srcPath) => {

  const HWPAry = []

  filenameAry.forEach(name => {
    // if (dependOns[name]) {
    //   chunks.push(...dependOns[name], name)
    // } else {
    //   chunks.push(name)
    // }
    console.log(dependOns[name])
    HWPAry.push(
      new HtmlWebpackPlugin({
        inlineSource: '.css$',
        title: name,
        filename: `${name}.html`,
        template: resolve(srcPath, `./pages/${name}/${name}.html`),
        chunks: [name, ...dependOns[name] || ''],
        // excludeChunks: ['common1'], // 这里有个没有解决的问题就是 splitChunk 分离出来的包会加到所有入口中去，即使该入口中没有用到这个模块
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    )
  })
  return HWPAry

}
