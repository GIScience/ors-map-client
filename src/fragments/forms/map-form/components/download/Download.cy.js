import Download from './Download.vue'
import mapViewDataTemplates from 'fixtures/map-view-data'
import I18nBuilder from '@/i18n/i18n-builder'
import store from '@/store/store'

const downloadsFolder = Cypress.config('downloadsFolder')

describe('<Download />', () => {
  beforeEach(() => {
    cy.mount(Download, {
      propsData: {
        mapViewData: mapViewDataTemplates.route
      }, i18n: I18nBuilder.build(), store: store
    })
    cy.get('.download-container')
    cy.get('.open-download-btn').click()
    cy.get('.download-modal')
    cy.get('.download-format').click()
  })

  it('downloads json route', () => {
    let format = 'ORS JSON'
    let ext = 'json'
    choose_format_change_name_and_download(format, ext)
    cy.get('@output').its('places').should('have.length', 2)
    cy.get('@output').its('routes').should('not.be.empty')
  })

  it('downloads GeoJSON route', () => {
    let format = 'GeoJSON'
    let ext = 'json'
    choose_format_change_name_and_download(format, ext)
    cy.get('@output').its('features').should('have.length', 3)
    cy.get('@output').its('type').should('equal', 'FeatureCollection')
  })

  it('downloads ors gpx route', () => {
    const mockUrl = 'http://localhost:8080/mockUrl'
    store.commit('mapSettings',{
      apiKey: 'test',
      apiBaseUrl: mockUrl,
      endpoints: {
        directions: '/directions'
      }
    })
    cy.intercept(`${mockUrl}/v2/directions/*/*`, (req) => {
      req.reply({
        statusCode: 200,
        body: '<gpx version="1.0" creator="openrouteservice" xmlns="https://raw.githubusercontent.com/GIScience/openrouteservice-schema/master/gpx/v2/ors-gpx.xsd"><metadata>Mock</metadata></gpx>'
      })
    })
    let format = 'ORS API GPX'
    let ext = 'gpx'
    choose_format_change_name_and_download(format, ext)
    cy.get('@output').should('match', /^<gpx version="1\.0" creator="openrouteservice".*<\/gpx>$/)
  })

  it('downloads standard GPX route', () => {
    let format = 'Standard GPX'
    let ext = 'gpx'
    choose_format_change_name_and_download(format, ext)
    // using Whitespace & Non-Whitespace characters as * doesn't work with line breaks
    // TODO: https://github.com/GIScience/ors-map-client/issues/321
    cy.get('@output').should('match', /^<gpx [\S\s]*<\/gpx>$/)
  })

  it('downloads KML route', () => {
    let format = 'KML'
    let ext = 'kml'
    choose_format_change_name_and_download(format, ext)
    cy.get('@output').should('match', /^<\?xml version="1.0" encoding="UTF-8"\?><kml.*<\/kml>$/)
  })

  function choose_format_change_name_and_download(format, ext) {
    cy.get('.v-list__tile__content').contains(format).click()
    cy.get('.v-text-field__slot > input').clear()
    cy.get('.v-text-field__slot > input').type(format)
    cy.get('.download-modal .download').click()
    cy.get('.download-modal').should('not.exist')
    cy.readFile(`${downloadsFolder}/${format}.${ext}`).as('output')
  }
})
