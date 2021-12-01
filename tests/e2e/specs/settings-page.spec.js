// eslint-disable-next-line no-undef
module.exports = {
  'app settings page rendering': function (browser) {
    const aboutUrl = `${browser.globals.devServerURL}/#/settings`

    browser
      .url(aboutUrl)
      .waitForElementVisible('.app-content', 10000)
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
      .assert.visible('.settings-modal')
    browser.end()
  },
}
