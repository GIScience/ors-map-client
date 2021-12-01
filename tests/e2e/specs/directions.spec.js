// eslint-disable-next-line no-undef
module.exports = {

  'directions rendering': function (browser) {
    const directionsUrl = `${browser.globals.devServerURL}/#/directions/Mannheim,BW,Germany/Heidelberg,BW,Germany/data/%7B"coordinates":"8.492765,49.488789;8.692416,49.401247","options":%7B"zoom":8,"profile":"driving-car","preference":"recommended"%7D%7D`

    browser
      .resizeWindow(1848, 980)
      .url(directionsUrl)
      .waitForElementVisible('.app-content', 10000)
      .assert.elementPresent('#app')
      .assert.not.elementPresent('.simple-place-search')
      .assert.visible('#map-view')
      .assert.visible('.leaflet-control-layers')
      .assert.visible('.leaflet-control-zoom')
      .assert.visible('.leaflet-draw')
      .assert.visible('#polyline-measure-control')
      .assert.visible('.my-location-btn')
      .assert.not.elementPresent('.view-on-ors')
      .assert.visible('.place-input-component input[type=text]')
      .assert.cssProperty({
        selector: '.custom-html-icon-div',
        index: 0
      }, 'background-color', 'rgba(0, 128, 0, 1)') // green
      .assert.cssProperty({
        selector: '.custom-html-icon-div',
        index: 1
      }, 'background-color', 'rgba(255, 0, 0, 1)') // red
      .assert.elementCount('.custom-html-icon-div', 2)
      .waitForElementVisible('.leaflet-popup')
      .assert.visible('.sidebar')
      .click('.expand-altitude-btn')
      .waitForElementVisible('.heightgraph')
      .assert.visible('svg.heightgraph-container')
      .assert.elementCountAbove('#map-view svg.heightgraph-container g path', 2)
      .assert.visible('#rightArrowSelection')
      .assert.visible('#leftArrowSelection')
      .assert.visible('#selectionText')
      .assert.visible('.heightgraph-close-icon')
      .assert.elementCount('#map-view .leaflet-map-pane svg g path', 2)
      .assert.visible('#map-view .leaflet-map-pane svg')
      .click('#rightArrowSelection')
      .assert.elementCountAbove('svg.heightgraph-container g path', 2)
      .assert.elementCount('.places-and-directions-tab-form .place-inputs .place-input-component', 2)
      .assert.visible('.legend-hover')
      .moveToElement('.legend-hover', 0, 0, () => {
        browser.assert.elementCountAbove('svg.heightgraph-container g.legend', 0)
        browser.waitForElementVisible('svg.heightgraph-container g.legend')
      })
      .click('.heightgraph-close-icon')
      .assert.not.elementPresent('svg.heightgraph-container')
      .assert.elementPresent('.places-and-directions-tab-form .form-actions-btns .add-place-btn')
      .assert.elementPresent('.places-and-directions-tab-form .form-actions-btns .clear-route-btn')
      .assert.elementPresent('.places-and-directions-tab-form .form-actions-btns .reverse-route-btn')
      .assert.elementPresent('.places-and-directions-tab-form .form-actions-btns .round-trip-btn')
      .assert.elementPresent('.places-and-directions-tab-form .form-actions-btns .route-importer')
      .end()

  },
  'roundtrip rendering': function (browser) {
    const roundtripUrl = `${browser.globals.devServerURL}/#/directions/Heidelberg,BW,Germany/data/%7B"coordinates":"8.769869,49.37625","options":%7B"profile":"foot-walking","options":%7B"round_trip":%7B"length":10000,"points":3,"seed":0%7D%7D,"zoom":18%7D%7D`

    browser
      .url(roundtripUrl)
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
      .waitForElementVisible('.custom-html-icon-div')
      .assert.cssProperty({
        selector: '.custom-html-icon-div',
        index: 0
      }, 'background-color', 'rgba(255, 0, 0, 1)') // red
      .expect.elements('.custom-html-icon-div').count.to.equal(1)
    browser.assert.elementCountAbove('.leaflet-overlay-pane svg path.leaflet-interactive', 0)
      .click('.open-menu')
      .assert.visible('.round-trip-btn .opt-btn i.primary--text')
      .end()
  },
}
