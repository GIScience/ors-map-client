// eslint-disable-next-line no-undef
module.exports = {
  'app default mode rendering': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const appUrl = browser.globals.devServerURL

    browser
      .url(appUrl)
      .waitForElementVisible('.app-content')
      .assert.elementPresent('#app')
      .assert.elementPresent('.simple-place-search')
      .assert.elementPresent('#map-view')
      .assert.elementPresent('.leaflet-control-layers')
      .assert.elementPresent('.leaflet-control-zoom')
      .assert.elementPresent('.leaflet-draw')
      .assert.elementPresent('#polyline-measure-control')
      .assert.elementPresent('.my-location-btn')
      .end()
  },
  'app embedded mode rendering': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const embedModeUrl = `${browser.globals.devServerURL}/#/place/Heidelberg,BW,Germany/@8.692416,49.401247/data/%7B%22zoom%22:8,%22layer%22:%22county%22,%22country%22:%22Germany%22%7D/embed/en-us`

    browser
      .url(embedModeUrl)
      .waitForElementVisible('.app-content')
      .assert.elementPresent('#app')
      .assert.elementPresent('#map-view')
      .assert.not.elementPresent('.simple-place-search')
      .assert.not.visible('.leaflet-control-layers-toggle')
      .assert.not.elementPresent('.leaflet-control-zoom')
      .assert.not.elementPresent('.leaflet-draw')
      .assert.not.elementPresent('#polyline-measure-control')
      .assert.not.elementPresent('.my-location-btn')
      .end()
  }
}
