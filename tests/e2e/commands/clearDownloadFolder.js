/* eslint-disable no-undef */
const fs = require('fs')

function clearDownloadFolder() {}

clearDownloadFolder.prototype.command = function () {

  let folder =__dirname + '/../downloads/'

  fs.readdir(folder, (err, files) => {
    if (err) throw err  
    for (const file of files) {      
      console.log(`File ${file} deleted successfully`)      
      fs.unlinkSync(folder+file)      
    }    
    console.log('Downloads folder cleared successfully')       
  })
}.bind(this)

module.exports = clearDownloadFolder
