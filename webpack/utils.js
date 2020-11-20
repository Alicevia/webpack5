
const glob = require('glob')

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