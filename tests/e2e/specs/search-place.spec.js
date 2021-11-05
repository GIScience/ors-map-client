// eslint-disable-next-line no-undef
module.exports = {
  'search place rendering': function (browser) {
    const searchUrl = `${browser.globals.devServerURL}/#/search/heidelberg/@50.92381327191293,9.052734375000002/z/6`

    browser
      .url(searchUrl)
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
      .waitForElementVisible('.places-nav', 10000)
      .assert.elementCountAbove('.custom-html-icon-div', 20)
      .assert.elementCountAbove('.vhl-item', 20)
      .getValue('.place-input-component input[type=text]', function (result) {
        this.assert.equal(result.value, 'heidelberg')
      })
      .end()
  }
}
