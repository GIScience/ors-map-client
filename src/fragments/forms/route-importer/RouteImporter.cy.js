import RouteImporter from './RouteImporter.vue'
import I18nBuilder from '@/i18n/i18n-builder'
import store from '@/store/store'

describe('<RouteImporter />', () => {
  it('renders', () => {
    cy.mount(RouteImporter, {i18n: I18nBuilder.build(), store: store})
    cy.get('.route-importer-container')
    cy.get('.route-importer-btn button').click()
    cy.get('.route-importer-modal')
    cy.get('#dropzone')
  })
  context('file imports', () => {
    beforeEach(() => {
      cy.mount(RouteImporter, {i18n: I18nBuilder.build(), store: store})
      cy.spy(RouteImporter.methods, 'fileAdded').as('fileAddedSpy')
      cy.spy(RouteImporter.methods, 'sendDataToMap').as('sendDataToMapSpy')
      cy.get('.route-importer-btn button').click()
    })

    afterEach(() => {
      cy.get('.route-importer-modal').should('not.exist')
      cy.get('@fileAddedSpy').should('have.been.calledOnce')
      cy.get('@sendDataToMapSpy').should('have.been.calledOnce')
    })

    it('imports .geojson route file', () => {
      cy.fixture('ors-route.geojson', {encoding: null}).as('geojsonRoute')
      cy.get('#dropzone').selectFile('@geojsonRoute', {
        action: 'drag-drop'
      })
    })

    it('imports .json route file', () => {
      cy.fixture('ors-route.json', {encoding: null}).as('jsonRoute')
      cy.get('#dropzone').selectFile('@jsonRoute', {
        action: 'drag-drop'
      })
    })

    it('imports .gpx route file', () => {
      cy.fixture('ors-route.gpx', {encoding: null}).as('gpxRoute')
      cy.get('#dropzone').selectFile('@gpxRoute', {
        action: 'drag-drop'
      })
    })

    it('imports .kml route file', () => {
      cy.fixture('ors-route.kml', {encoding: null}).as('kmlRoute')
      cy.get('#dropzone').selectFile('@kmlRoute', {
        action: 'drag-drop'
      })
    })

    it('imports .txt route file file with valid xml', () => {
      cy.fixture('ors-route.xml.txt', {encoding: null}).as('xmlTxtRoute')
      cy.get('#dropzone').selectFile('@xmlTxtRoute', {
        action: 'drag-drop'
      })
    })
  })
})
