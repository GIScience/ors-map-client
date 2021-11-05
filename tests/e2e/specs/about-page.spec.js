// eslint-disable-next-line no-undef
module.exports = {
  'app about open rendering': function (browser) {
    const aboutUrl = `${browser.globals.devServerURL}/#/about`

    browser
      .url(aboutUrl)
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
      .assert.visible('.v-dialog__content--active')
      .assert.visible('.about-modal')
    browser.end()
  },
}
