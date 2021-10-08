module.exports = {
  'app render': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 10000)
      .assert.elementPresent('.simple-place-search')
      .assert.elementPresent('#map-view')
      .end()
  }
}
