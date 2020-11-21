const { resolve } = require('path')
const {generateFileName} = require('./utils')
const glob = require('glob')
const HWP = require('html-webpack-plugin')
// ==================================================config
const srcPath = resolve(__dirname,'../src')
const pagesPath = resolve(__dirname, '../src/pages/*/*')

let shared={
  import :['axios'],
}
let dependOn = [
  'index','page2'
]//'all'
dependOn='all'
// ======================================== lu
const {filePath,filenameAry} = generateFileName(pagesPath)
const getEntries = (filenameAry,shared,dependOn) => {
  let entry = {}
  filenameAry.forEach((value,key)=>{
    if (dependOn==='all') {
      entry[value]={
        import:filePath[key],
        dependOn:'shared'
      }
    }else{
      entry[value]={
        import:filePath[key]
      }
    }
  })
  entry.shared=shared
  if (dependOn!=='all') {
    dependOn.forEach(name=>{
      entry[name].dependOn='shared'
    })
  }
  return entry
}

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

exports.srcPath = srcPath
exports.pagesAllFile =glob.sync(`${srcPath}/pages/**/*`,{nodir:true})
exports.entry = getEntries(filenameAry,shared,dependOn)
exports.HWP = getHWP(filenameAry)
