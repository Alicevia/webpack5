const { resolve } = require('path')
const { generateFileName } = require('./utils')
const glob = require('glob')
const HWP = require('html-webpack-plugin')
// ==================================================config
const srcPath = resolve(__dirname, '../src')
const pagesPath = resolve(__dirname, '../src/pages/*/*')

let shared = {
  import: ['axios'],
}
let dependOn = [
  'index', 'page1'
]//'all'
dependOn = []
shared = {}
// ======================================== lu
const { filePath, filenameAry } = generateFileName(pagesPath)
const getEntries = (filenameAry, shared, dependOn) => {
  let entry = {}
  filenameAry.forEach((value, key) => {
    if (dependOn === 'all') {
      entry[value] = {
        import: filePath[key],
        dependOn: 'shared'
      }
    } else {
      entry[value] = {
        import: filePath[key]
      }
    }
  })
  if (shared.import) {
    entry.shared = shared

  }
  if (dependOn !== 'all') {
    dependOn.forEach(name => {
      entry[name].dependOn = 'shared'
    })
  }
  return entry
}

const getHWP = (filenameAry, dependOn) => {
  if (dependOn === 'all') {
    dependOn = 'shared'
  }
  const HWPAry = []
  filenameAry.forEach(name => {
    HWPAry.push(
      new HWP({
        inlineSource: '.css$',
        title: name,
        filename: `${name}.html`,
        template: resolve(srcPath, `./pages/${name}/${name}.html`),
        chunks: [name, dependOn === 'shared' ? dependOn : dependOn.includes(name) ? 'shared' : ''],
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

exports.srcPath = srcPath
exports.pagesAllFile = glob.sync(`${srcPath}/pages/**/*`, { nodir: true })
exports.entry = getEntries(filenameAry, shared, dependOn)
exports.HWP = getHWP(filenameAry, dependOn)
