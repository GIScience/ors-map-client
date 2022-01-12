/* eslint-disable no-undef */
module.exports = {

  'download route json file': function (browser) {
    const directionsUrl = `${browser.globals.devServerURL}/#/directions/Mannheim,BW,Germany/Heidelberg,BW,Germany/data/%7B"coordinates":"8.492765,49.488789;8.692416,49.401247","options":%7B"zoom":8,"profile":"driving-car","preference":"recommended"%7D%7D`
    const downloadFileNameAppend = `-${new Date().getTime()}`
    let fileName = `ors-route${downloadFileNameAppend}.json`

    browser
      .resizeWindow(1848, 980)
      .url(directionsUrl)
      .waitForElementVisible('.app-content', 10000)
      .assert.elementPresent('#app')
      .pause(1000)
      .click('.open-download-btn')
      .waitForElementVisible('.download-modal', 10000)
      .setValue('.export-file-name input[type=text]', downloadFileNameAppend)
      .moveToElement('.export-file-name input[type=text]', 0, 0)
      .click('.download-format .v-select__selections')
      .pause(1000)
      .click({selector: '.menuable__content__active a', index: 0})// index 0 = json
      .click('.download')
      .pause(1000)
      .checkDownloadFileIsValid(fileName)
      .deleteDownloadedFile(fileName)
      .end()
  },

  'download route geojson file': function (browser) {
    const directionsUrl = `${browser.globals.devServerURL}/#/directions/Mannheim,BW,Germany/Heidelberg,BW,Germany/data/%7B"coordinates":"8.492765,49.488789;8.692416,49.401247","options":%7B"zoom":8,"profile":"driving-car","preference":"recommended"%7D%7D`
    const downloadFileNameAppend = `-${new Date().getTime()}`
    let fileName = `ors-route${downloadFileNameAppend}.json`

    browser
      .resizeWindow(1848, 980)
      .url(directionsUrl)
      .waitForElementVisible('.app-content', 10000)
      .assert.elementPresent('#app')
      .pause(1000)
      .click('.open-download-btn')
      .waitForElementVisible('.download-modal', 10000)
      .setValue('.export-file-name input[type=text]', downloadFileNameAppend)
      .moveToElement('.export-file-name input[type=text]', 0, 0)
      .click('.download-format .v-select__selections')
      .pause(1000)
      .click({selector: '.menuable__content__active a', index: 1}) // index 1 = geojson
      .click('.download')
      .pause(1000)
      .checkDownloadFileIsValid(fileName)
      .deleteDownloadedFile(fileName)
      .end()
  },
  'download route ors gpx file': function (browser) {
    const directionsUrl = `${browser.globals.devServerURL}/#/directions/Mannheim,BW,Germany/Heidelberg,BW,Germany/data/%7B"coordinates":"8.492765,49.488789;8.692416,49.401247","options":%7B"zoom":8,"profile":"driving-car","preference":"recommended"%7D%7D`
    const downloadFileNameAppend = `-${new Date().getTime()}`
    let fileName = `ors-route${downloadFileNameAppend}.gpx`

    browser
      .resizeWindow(1848, 980)
      .url(directionsUrl)
      .waitForElementVisible('.app-content', 10000)
      .assert.elementPresent('#app')
      .pause(1000)
      .click('.open-download-btn')
      .waitForElementVisible('.download-modal', 10000)
      .setValue('.export-file-name input[type=text]', downloadFileNameAppend)
      .moveToElement('.export-file-name input[type=text]', 0, 0)
      .click('.download-format .v-select__selections')
      .pause(1000)
      .click({selector: '.menuable__content__active a', index: 2})// index 2 = ors-gpx
      .click('.download')
      .pause(3000)
      .checkDownloadFileIsValid(fileName)
      .deleteDownloadedFile(fileName)
      .end()
  },
  'download route standard gpx file': function (browser) {
    const directionsUrl = `${browser.globals.devServerURL}/#/directions/Mannheim,BW,Germany/Heidelberg,BW,Germany/data/%7B"coordinates":"8.492765,49.488789;8.692416,49.401247","options":%7B"zoom":8,"profile":"driving-car","preference":"recommended"%7D%7D`
    const downloadFileNameAppend = `-${new Date().getTime()}`
    let fileName = `ors-route${downloadFileNameAppend}.gpx`

    browser
      .resizeWindow(1848, 980)
      .url(directionsUrl)
      .waitForElementVisible('.app-content', 10000)
      .assert.elementPresent('#app')
      .pause(1000)
      .click('.open-download-btn')
      .waitForElementVisible('.download-modal', 10000)
      .setValue('.export-file-name input[type=text]', downloadFileNameAppend)
      .moveToElement('.export-file-name input[type=text]', 0, 0)
      .click('.download-format .v-select__selections')
      .pause(1000)
      .click({selector: '.menuable__content__active a', index: 3})// index 3 = standard gpx
      .click('.download')
      .pause(3000)
      .checkDownloadFileIsValid(fileName)
      .deleteDownloadedFile(fileName)
      .end()
  },
  'download route kml file': function (browser) {
    const directionsUrl = `${browser.globals.devServerURL}/#/directions/Mannheim,BW,Germany/Heidelberg,BW,Germany/data/%7B"coordinates":"8.492765,49.488789;8.692416,49.401247","options":%7B"zoom":8,"profile":"driving-car","preference":"recommended"%7D%7D`
    const downloadFileNameAppend = `-${new Date().getTime()}`
    let fileName = `ors-route${downloadFileNameAppend}.kml`

    browser
      .resizeWindow(1848, 980)
      .url(directionsUrl)
      .waitForElementVisible('.app-content', 10000)
      .assert.elementPresent('#app')
      .pause(1000)
      .click('.open-download-btn')
      .waitForElementVisible('.download-modal', 10000)
      .setValue('.export-file-name input[type=text]', downloadFileNameAppend)
      .moveToElement('.export-file-name input[type=text]', 0, 0)
      .click('.download-format .v-select__selections')
      .pause(1000)
      .click({selector: '.menuable__content__active a', index: 4}) // index 4 = kml
      .click('.download')
      .pause(1000)
      .checkDownloadFileIsValid(fileName)
      .deleteDownloadedFile(fileName)
      .end()
  }
}
