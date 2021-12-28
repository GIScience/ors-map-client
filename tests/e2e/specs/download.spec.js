/* eslint-disable no-undef */
module.exports = {

  'download route default file': function (browser) {
    const directionsUrl = `${browser.globals.devServerURL}/#/directions/Mannheim,BW,Germany/Heidelberg,BW,Germany/data/%7B"coordinates":"8.492765,49.488789;8.692416,49.401247","options":%7B"zoom":8,"profile":"driving-car","preference":"recommended"%7D%7D`
    const downloadFileNameAppend = `-${new Date().getTime()}`

    browser
      .url(directionsUrl)
      .waitForElementVisible('.app-content', 10000)
      .assert.elementPresent('#app')
      .click('.open-menu')
      .pause(1000)
      .click('.open-download-btn')
      .waitForElementVisible('.download-modal', 10000)
      .setValue('.export-file-name input[type=text]', downloadFileNameAppend)
      .clearDownloadedFiles()
      .click('.download')
      .pause(1000)
      .checkDownloadFileIsValid(`ors-route${downloadFileNameAppend}.json`)
      .clearDownloadedFiles()
      .end()
  },

  'download route json file': function (browser) {
    const directionsUrl = `${browser.globals.devServerURL}/#/directions/Mannheim,BW,Germany/Heidelberg,BW,Germany/data/%7B"coordinates":"8.492765,49.488789;8.692416,49.401247","options":%7B"zoom":8,"profile":"driving-car","preference":"recommended"%7D%7D`
    const downloadFileNameAppend = `-${new Date().getTime()}`

    browser
      .url(directionsUrl)
      .waitForElementVisible('.app-content', 10000)
      .assert.elementPresent('#app')
      .click('.open-menu')
      .clearDownloadedFiles()
      .pause(1000)
      .click('.open-download-btn')
      .waitForElementVisible('.download-modal', 10000)
      .setValue('.export-file-name input[type=text]', downloadFileNameAppend)
      .moveToElement('.export-file-name input[type=text]', 0, 0)
      .click('.download-format .v-select__selections')
      .pause(1000)
      .click({selector: '.menuable__content__active a', index: 0})
      .click('.download')
      .pause(1000)
      .checkDownloadFileIsValid(`ors-route${downloadFileNameAppend}.json`)
      .clearDownloadedFiles()
      .end()
  },

  'download route geojson file': function (browser) {
    const directionsUrl = `${browser.globals.devServerURL}/#/directions/Mannheim,BW,Germany/Heidelberg,BW,Germany/data/%7B"coordinates":"8.492765,49.488789;8.692416,49.401247","options":%7B"zoom":8,"profile":"driving-car","preference":"recommended"%7D%7D`
    const downloadFileNameAppend = `-${new Date().getTime()}`

    browser
      .url(directionsUrl)
      .waitForElementVisible('.app-content', 10000)
      .assert.elementPresent('#app')
      .click('.open-menu')
      .clearDownloadedFiles()
      .pause(1000)
      .click('.open-download-btn')
      .waitForElementVisible('.download-modal', 10000)
      .setValue('.export-file-name input[type=text]', downloadFileNameAppend)
      .moveToElement('.export-file-name input[type=text]', 0, 0)
      .click('.download-format .v-select__selections')
      .pause(1000)
      .click({selector: '.menuable__content__active a', index: 1})
      .click('.download')
      .pause(1000)
      .checkDownloadFileIsValid(`ors-route${downloadFileNameAppend}.json`)
      .clearDownloadedFiles()
      .end()
  },
  'download route ors gpx file': function (browser) {
    const directionsUrl = `${browser.globals.devServerURL}/#/directions/Mannheim,BW,Germany/Heidelberg,BW,Germany/data/%7B"coordinates":"8.492765,49.488789;8.692416,49.401247","options":%7B"zoom":8,"profile":"driving-car","preference":"recommended"%7D%7D`
    const downloadFileNameAppend = `-${new Date().getTime()}`

    browser
      .url(directionsUrl)
      .waitForElementVisible('.app-content', 10000)
      .assert.elementPresent('#app')
      .click('.open-menu')
      .clearDownloadedFiles()
      .pause(1000)
      .click('.open-download-btn')
      .waitForElementVisible('.download-modal', 10000)
      .setValue('.export-file-name input[type=text]', downloadFileNameAppend)
      .moveToElement('.export-file-name input[type=text]', 0, 0)
      .click('.download-format .v-select__selections')
      .pause(1000)
      .click({selector: '.menuable__content__active a', index: 2})
      .click('.download')
      .pause(1000)
      .checkDownloadFileIsValid(`ors-route${downloadFileNameAppend}.gpx`)
      .clearDownloadedFiles()
      .end()
  },
  'download route standard gpx file': function (browser) {
    const directionsUrl = `${browser.globals.devServerURL}/#/directions/Mannheim,BW,Germany/Heidelberg,BW,Germany/data/%7B"coordinates":"8.492765,49.488789;8.692416,49.401247","options":%7B"zoom":8,"profile":"driving-car","preference":"recommended"%7D%7D`
    const downloadFileNameAppend = `-${new Date().getTime()}`

    browser
      .url(directionsUrl)
      .waitForElementVisible('.app-content', 10000)
      .assert.elementPresent('#app')
      .click('.open-menu')
      .clearDownloadedFiles()
      .pause(1000)
      .click('.open-download-btn')
      .waitForElementVisible('.download-modal', 10000)
      .setValue('.export-file-name input[type=text]', downloadFileNameAppend)
      .moveToElement('.export-file-name input[type=text]', 0, 0)
      .click('.download-format .v-select__selections')
      .pause(1000)
      .click({selector: '.menuable__content__active a', index: 3})
      .click('.download')
      .pause(1000)
      .checkDownloadFileIsValid(`ors-route${downloadFileNameAppend}.gpx`)
      .clearDownloadedFiles()
      .end()
  },
  'download route kml file': function (browser) {
    const directionsUrl = `${browser.globals.devServerURL}/#/directions/Mannheim,BW,Germany/Heidelberg,BW,Germany/data/%7B"coordinates":"8.492765,49.488789;8.692416,49.401247","options":%7B"zoom":8,"profile":"driving-car","preference":"recommended"%7D%7D`
    const downloadFileNameAppend = `-${new Date().getTime()}`

    browser
      .url(directionsUrl)
      .waitForElementVisible('.app-content', 10000)
      .assert.elementPresent('#app')
      .click('.open-menu')
      .clearDownloadedFiles()
      .pause(1000)
      .click('.open-download-btn')
      .waitForElementVisible('.download-modal', 10000)
      .setValue('.export-file-name input[type=text]', downloadFileNameAppend)
      .moveToElement('.export-file-name input[type=text]', 0, 0)
      .click('.download-format .v-select__selections')
      .pause(1000)
      .click({selector: '.menuable__content__active a', index: 4})
      .click('.download')
      .pause(1000)
      .checkDownloadFileIsValid(`ors-route${downloadFileNameAppend}.kml`)
      .clearDownloadedFiles()
      .end()
  }
}
