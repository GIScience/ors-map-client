// eslint-disable-next-line no-undef
module.exports = {
  'app embedded mode rendering': function (browser) {
    const embeddedModeUrl = `${browser.globals.devServerURL}/#/place/Heidelberg,BW,Germany/@8.692416,49.401247/data/%7B%22zoom%22:8,%22layer%22:%22county%22,%22country%22:%22Germany%22%7D/embed/en-us`

    browser
      .url(embeddedModeUrl)
      .waitForElementVisible('.app-content')
      .assert.elementPresent('#app')
      .assert.visible('#map-view')
      .assert.not.elementPresent('.simple-place-search')
      .assert.not.visible('.leaflet-control-layers-toggle')
      .assert.not.elementPresent('.leaflet-control-zoom')
      .assert.not.elementPresent('.leaflet-draw')
      .assert.not.elementPresent('#polyline-measure-control')
      .assert.not.elementPresent('.my-location-btn')
      .assert.not.elementPresent('.accessibility-btn')
      .assert.visible('.view-on-ors')
      .assert.elementPresent('.place-input-component input[type=text]')
      .assert.elementPresent('.custom-html-icon-div')
      .assert.cssProperty('.custom-html-icon-div', 'background-color', 'rgba(255, 0, 0, 1)') // red
      .click('.custom-html-icon-div')
      .assert.elementPresent('.leaflet-popup')
      .assert.containsText('.leaflet-popup-content', 'Heidelberg, BW,Germany')
      .getValue('.place-input-component input[type=text]', function (result) {
        this.assert.equal(result.value, 'Heidelberg, BW,Germany')
      })
      .assert.elementCount('.custom-html-icon-div', 1)
      .end()
  },
}
