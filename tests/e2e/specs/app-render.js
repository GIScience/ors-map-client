// eslint-disable-next-line no-undef
module.exports = {
  'app default mode rendering': function (browser) {
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
      .assert.not.elementPresent('.view-on-ors')
      .end()
  },
  'app embedded mode rendering': function (browser) {
    const embedModeUrl = `${browser.globals.devServerURL}/#/place/Heidelberg,BW,Germany/@8.692416,49.401247/data/%7B%22zoom%22:8,%22layer%22:%22county%22,%22country%22:%22Germany%22%7D/embed/en-us`

    browser
      .url(embedModeUrl)
      .waitForElementVisible('.app-content')
      .assert.elementPresent('#app')
      .assert.elementPresent('#map-view')
      .assert.not.elementPresent('.simple-place-search')
      .assert.not.visible('.leaflet-control-layers-toggle')
      .assert.not.elementPresent('.leaflet-control-zoom')
      .assert.not.elementPresent('.leaflet-draw')
      .assert.not.elementPresent('#polyline-measure-control')
      .assert.not.elementPresent('.my-location-btn')
      .assert.elementPresent('.view-on-ors')
      .end()
  },

  'app page not found mode rendering': function (browser) {
    const pageNotFoundUrl = `${browser.globals.devServerURL}/#/directions/Old%20Invercauld%20Bridge,Aberdeenshire,Scotland,United%20Kingdom/Old%20Deeside%20Road,Aberdeenshire,Schottland,Vereinigtes%20Königreich/Old%20Deeside%20Road,Aberdeenshire,S`

    browser
      .url(pageNotFoundUrl)
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
      .assert.elementPresent('.v-snack__content')
      .assert.visible('.v-snack__content')
      .assert.visible('.v-snack__wrapper.error')
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
      .assert.cssProperty('.custom-html-icon-div','background-color','rgba(255, 0, 0, 1)')      
      .click('.custom-html-icon-div')
      .assert.elementPresent('.leaflet-popup')      
      .assert.containsText('.leaflet-popup-content', 'Heidelberg, BW,Germany')
      .getValue('.place-input-component input[type=text]', function(result) {
        this.assert.equal(result.value, 'Heidelberg, BW,Germany')
      })
      .assert.cssProperty('.custom-html-icon-div','background-color','rgba(255, 0, 0, 1)') // red
      .expect.elements('.custom-html-icon-div').count.to.equal(1)
    browser.end()
  },

  'app page directions rendering': function (browser) {
    const directionsUrl = `${browser.globals.devServerURL}/#/directions/Mannheim,BW,Germany/Heidelberg,BW,Germany/data/%7B"coordinates":"8.492765,49.488789;8.692416,49.401247","options":%7B"zoom":8,"profile":"driving-car","preference":"recommended"%7D%7D`

    browser
      .url(directionsUrl)
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
      .assert.cssProperty({selector: '.custom-html-icon-div', index: 0},'background-color','rgba(0, 128, 0, 1)') // green
      .assert.cssProperty({selector: '.custom-html-icon-div', index: 1},'background-color','rgba(255, 0, 0, 1)') // red
      .expect.elements('.custom-html-icon-div').count.to.equal(2)
    browser.end()

    //browser.useXpath().assert.cssProperty({ selector: '//div[contains(@class, "custom-html-icon-div")]', index: 0},'background-color','rgba(0, 128, 0, 1)')
    //browser.useXpath().assert.cssProperty({ selector: '//div[contains(@class, "custom-html-icon-div")]', index: 1},'background-color','rgba(255, 0, 0, 1)')
  },
  'app page isochrones rendering': function (browser) {
    const isochronesUrl = `${browser.globals.devServerURL}/#/reach/Rua Jataúba,Salvador,BA,Brazil/data/{"coordinates":"-38.48030090332032,-12.983147716796566","options":{"profile":"cycling-regular","range_type":"distance","range":[31000],"interval":15000,"zoom":18}}`

    browser
      .url(isochronesUrl)
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
  'app settings open rendering': function (browser) {
    const aboutUrl = `${browser.globals.devServerURL}/#/settings`

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
      .assert.visible('.settings-modal')       
    browser.end()
  },
  'app search rendering': function (browser) {
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
      .waitForElementVisible('.places-nav')  
      .assert.elementCountAbove('.custom-html-icon-div', 20)
      .assert.elementCountAbove('.vhl-item', 20)
      .getValue('.place-input-component input[type=text]', function(result) {
        this.assert.equal(result.value, 'heidelberg')
      })
      .end()
  }
}

//browser.resizeWindow(1280, 800, done);
