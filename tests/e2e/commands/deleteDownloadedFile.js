/* eslint-disable no-undef */
const fs = require('fs')

function deleteDownloadedFile() {}

deleteDownloadedFile.prototype.command = function (fileName) {
  let path = `${__dirname}/../download/${fileName}`
  fs.unlinkSync(path)
}.bind(this)

module.exports = deleteDownloadedFile
