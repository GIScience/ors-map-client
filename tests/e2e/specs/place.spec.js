// eslint-disable-next-line no-undef
module.exports = {

  'place location rendering': function (browser) {
    const placeLocationUrl = `${browser.globals.devServerURL}/#/place/@-48.467559814453125,-23.856953970230652,6`

    browser
      .resizeWindow(1848, 980)
      .url(placeLocationUrl)
      .waitForElementVisible('.app-content', 10000)
      .assert.elementPresent('#app')
      .assert.elementPresent('.simple-place-search')
      .assert.visible('#map-view')
      .assert.visible('.leaflet-control-layers')
      .assert.visible('.leaflet-control-zoom')
      .assert.visible('.leaflet-draw')
      .assert.visible('#polyline-measure-control')
      .assert.visible('.my-location-btn')
      .assert.not.elementPresent('.view-on-ors')
      .assert.visible('.place-input-component input[type=text]')
      .assert.elementCount('.custom-html-icon-div', 0)
      .moveToElement('#map-view',10,10)
      .mouseButtonDown(0)
      .moveToElement('#map-view',50,50)
      .mouseButtonUp(0)
      // .verify.url(newUrl)
      .end()

  },
  'single place rendering': function (browser) {
    const singlePlaceUrl = `${browser.globals.devServerURL}/#/place/Salvador,BA,Brazil/@-38.421936,-12.964413,9/data/%7B"layer":"locality","country":"Brazil","zoom":9%7D`

    browser
      .url(singlePlaceUrl)
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
      .waitForElementVisible('.fit-all-features', 10000)
      .click('.fit-all-features')
      .waitForElementVisible('.custom-html-icon-div', 10000)
      .assert.cssProperty({
        selector: '.custom-html-icon-div',
        index: 0
      }, 'background-color', 'rgba(255, 0, 0, 1)') // red
      .expect.elements('.custom-html-icon-div').count.to.equal(1)
    browser.assert.elementCountAbove('.leaflet-overlay-pane svg path.leaflet-interactive', 0)
      .end()
  },

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
