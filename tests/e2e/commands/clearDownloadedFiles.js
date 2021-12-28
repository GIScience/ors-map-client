/* eslint-disable no-undef */
const fs = require('fs')

function clearDownloadedFiles() {}

clearDownloadedFiles.prototype.command = function () {

  let folder =__dirname + '/../download/'

  fs.readdir(folder, (err, files) => {
    if (err) throw err  
    for (const file of files) {      
      console.log(`File ${file} deleted successfully`)      
      fs.unlinkSync(folder+file)      
    }    
    console.log('Download folder cleared successfully')       
  })
}.bind(this)

module.exports = clearDownloadedFiles
