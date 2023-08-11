/// <reference types="cypress" />
import defaultMapSettings from '../../src/config/default-map-settings'
import appConfig from '../../src/config/app-config'

describe('Ors map client', () => {
  beforeEach(() => {
    cy.viewport(1848, 980)
    cy.visit('/')
  })
  it('loads with correct url', () => {
    let coords = defaultMapSettings.mapCenter
    cy.url().should('contain', coords.lat).should('contain', coords.lng).
      should('contain', appConfig.initialZoomLevel.toString())
  })
  it('has correct layout', () => {
    cy.get('.app-content')
    cy.get('#app')
    cy.get('.simple-place-search')
    cy.get('#map-view')
    cy.get('.leaflet-control-layers')
    cy.get('.leaflet-control-zoom')
    cy.get('.leaflet-draw')
    cy.get('#polyline-measure-control')
    cy.get('.my-location-btn')
    cy.get('.over-brand')
    cy.get('.accessibility-btn')
    cy.get('.view-on-ors').should('not.exist')
  })
  it('left-click interaction works', () => {
    cy.get('#map-view').click()
    cy.get('.left-context-menu')
  })

  it('toggles the sidebar with menu button', () => {
    // wait for top menu to hide as menu button lies behind it
    cy.get('.ors-toolbar').should('be.hidden')
    cy.get('.sidebar').should('not.be.visible')
    cy.get('.open-menu').click()
    cy.get('.sidebar').should('be.visible')
    cy.get('.places-and-directions-tab-form')
  })

  it('toggles the sidebar correctly', () => {
    cy.get('.toggle-sidebar').as('sb')
    cy.get('@sb').click()
    cy.get('.sidebar').should('be.visible')
    cy.get('@sb').click()
    cy.get('.sidebar').should('not.be.visible')
  })
})
