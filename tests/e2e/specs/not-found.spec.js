// eslint-disable-next-line no-undef
module.exports = {
  'app page broken url rendering': function (browser) {
    const pageNotFoundUrl = `${browser.globals.devServerURL}/#/directions/Old%20Invercauld%20Bridge,Aberdeenshire,Scotland,United%20Kingdom/Old%20Deeside%20Road,Aberdeenshire,Schottland,Vereinigtes%20Königreich/Old%20Deeside%20Road,Aberdeenshire,S`

    browser
      .url(pageNotFoundUrl)
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
      .assert.elementPresent('.v-snack__content')
      .assert.visible('.v-snack__content')
      .assert.visible('.v-snack__wrapper.error')
      .end()
  },
  'app page not found mode rendering': function (browser) {
    const pageNotFoundUrl = `${browser.globals.devServerURL}/#/dummy-page`

    browser
      .url(pageNotFoundUrl)
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
      .assert.elementPresent('.v-snack__content')
      .assert.visible('.v-snack__content')
      .assert.visible('.v-snack__wrapper.error')
      .end()
  },
}
