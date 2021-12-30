/* eslint-disable no-undef */
const fs = require('fs')

function checkDownloadFileIsValid() {}

checkDownloadFileIsValid.prototype.command = function (fileName) {
  let path = `${__dirname}/../downloads/${fileName}`

  if (fs.existsSync(path)) {
    var stats = fs.statSync(path)
    if (stats.size === 0) {
      throw new Error(`The file ${fileName} is empty`)
    }
  } else {
    throw new Error(`The file ${fileName} doesn't exist`)
  }
}.bind(this)

module.exports = checkDownloadFileIsValid
