/// <reference types="cypress" />
import defaultMapSettings from '../../src/config/default-map-settings'
import appConfig from '../../src/config/app-config'

describe('Ors map client', () => {
  it('successfully loads', () => {
    cy.viewport(1848, 980)
    cy.visit('/')
    let coords = defaultMapSettings.mapCenter
    cy.url().should('contain', coords.lat).should('contain', coords.lng).
      should('contain', appConfig.initialZoomLevel.toString())
  })
  it('toggles the sidebar correctly', () => {
    cy.get('.sidebar').should('not.be.visible')
    cy.get('.toggle-sidebar').as('sb')
    cy.get('@sb').click()
    cy.get('.sidebar').should('be.visible')
    // TODO: get re-toggle test working
    // cy.get('@sb').click()
    // cy.get('.sidebar').should('not.be.visible')
  })
})
