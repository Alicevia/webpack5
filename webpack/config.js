const { resolve } = require('path')
const {generateFileName} = require('./utils')
const glob = require('glob')
const HWP = require('html-webpack-plugin')
// ==================================================config
const srcPath = resolve(__dirname,'../src')
exports.srcPath = srcPath
exports.pagesAllFile =glob.sync(`${srcPath}/pages/**/*`,{nodir:true})
const pagesPath = resolve(__dirname, '../src/pages/*/*')


let shared={
  import :['axios'],
}
let dependOn = [
  'index','page2'
]
// ======================================== lu
const {filePath,filenameAry} = generateFileName(pagesPath)
const getEntries = (filenameAry,shared,dependOn) => {
  let entry = {}
  filenameAry.forEach((value,key)=>{
    entry[value]={
      import:filePath[key]
    }
  })
  entry.shared=shared
  dependOn.forEach(name=>{
    entry[name].dependOn='shared'
  })
  return entry
}
exports.entry = getEntries(filenameAry,shared,dependOn)

const getHWP = (filenameAry)=>{
  const HWPAry = []
  filenameAry.forEach(name=>{
    HWPAry.push(
      new HWP({
        title: name,
        filename: `${name}.html`,
        chunks: [name, dependOn.includes(name)?'shared':''],
      })
    )
  })
  return HWPAry

}
exports.HWP = getHWP(filenameAry)
