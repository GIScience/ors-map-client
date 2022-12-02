/// <reference types="cypress" />
import defaultMapSettings from '../../src/config/default-map-settings'
import appConfig from '../../src/config/app-config'

describe('Ors map client', () => {
  it('successfully loads', () => {
    cy.visit('/')
    let coords = defaultMapSettings.mapCenter
    cy.url().should('contain', coords.lat).should('contain', coords.lng).
      should('contain', appConfig.initialZoomLevel.toString())
  })
})
