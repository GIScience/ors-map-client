// eslint-disable-next-line no-undef
module.exports = {
  'reach landing rendering': function (browser) {
    const reachUrl = `${browser.globals.devServerURL}/#/reach`

    browser
      .url(reachUrl)
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
      .assert.visible('.sidebar')
      .click('.open-menu')
      .waitForElementVisible('.isochrones-tab-form')
      .assert.not.visible('.places-and-directions-tab-form')
      .end()
  },
  'isochrones rendering': function (browser) {
    const isochronesUrl = `${browser.globals.devServerURL}/#/reach/Rua Jataúba,Salvador,BA,Brazil/data/{"coordinates":"-38.48030090332032,-12.983147716796566","options":{"profile":"cycling-regular","range_type":"distance","range":[31000],"interval":15000,"zoom":18}}`

    browser
      .url(isochronesUrl)
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
      .waitForElementVisible('.custom-html-icon-div', 20000)
      .assert.cssProperty('.custom-html-icon-div','background-color','rgba(255, 0, 0, 1)') // red   
      .click('.custom-html-icon-div')
      .assert.elementPresent('.leaflet-popup')      
      .assert.containsText('.leaflet-popup-content', 'Rua Jataúba, Salvador,BA,Brazil')
      .getValue('.place-input-component input[type=text]', function(result) {
        this.assert.equal(result.value, 'Rua Jataúba, Salvador,BA,Brazil')
      })
      .assert.visible('.sidebar')
      .expect.elements('.custom-html-icon-div').count.to.equal(1)
    browser.expect.elements('.sidebar li.polygons-header').count.to.equal(1)
    browser.expect.elements('.sidebar .polygon-area').count.to.equal(3)      
    browser.end()
  },
}
