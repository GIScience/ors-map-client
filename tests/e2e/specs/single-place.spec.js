// eslint-disable-next-line no-undef
module.exports = {
  'app page single place rendering': function (browser) {
    const placeModeUrl = `${browser.globals.devServerURL}/#/place/Heidelberg,BW,Germany/@8.692416,49.401247/data/%7B"zoom":8,"layer":"county","country":"Germany"%7D`

    browser
      .url(placeModeUrl)
      .waitForElementVisible('.app-content')
      .assert.elementPresent('#app')
      .assert.elementPresent('.simple-place-search')
      .assert.elementPresent('#map-view')
      .assert.elementPresent('.leaflet-control-layers')
      .assert.elementPresent('.leaflet-control-zoom')
      .assert.elementPresent('.leaflet-draw')
      .assert.elementPresent('#polyline-measure-control')
      .assert.elementPresent('.my-location-btn')
      .assert.not.elementPresent('.view-on-ors')
      .assert.elementPresent('.place-input-component input[type=text]')
      .assert.elementPresent('.custom-html-icon-div')
      .assert.cssProperty('.custom-html-icon-div', 'background-color', 'rgba(255, 0, 0, 1)')
      .click('.custom-html-icon-div')
      .assert.elementPresent('.leaflet-popup')
      .assert.containsText('.leaflet-popup-content', 'Heidelberg, BW,Germany')
      .getValue('.place-input-component input[type=text]', function (result) {
        this.assert.equal(result.value, 'Heidelberg, BW,Germany')
      })
      .assert.cssProperty('.custom-html-icon-div', 'background-color', 'rgba(255, 0, 0, 1)') // red
      .expect.elements('.custom-html-icon-div').count.to.equal(1)
    browser.end()
  },
}
