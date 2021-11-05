// eslint-disable-next-line no-undef
module.exports = {
  'landing page rendering': function (browser) {
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
      .assert.elementPresent('.over-brand')
      .assert.elementPresent('.accessibility-btn')
      .assert.not.elementPresent('.view-on-ors')
      .moveToElement('#map-view', 0, 0, () => {
        browser.click('#map-view')
        browser.waitForElementVisible('.left-context-menu')
      })
      .click('.open-menu')
      .waitForElementVisible('.places-and-directions-tab-form')
      .end()
  },
}

//browser.resizeWindow(1280, 800, done);
//browser.useXpath().assert.cssProperty({ selector: '//div[contains(@class, "custom-html-icon-div")]', index: 0},'background-color','rgba(0, 128, 0, 1)')
//browser.useXpath().assert.cssProperty({ selector: '//div[contains(@class, "custom-html-icon-div")]', index: 1},'background-color','rgba(255, 0, 0, 1)')
