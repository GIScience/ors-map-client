describe('embedded mode', () => {
  it('renders correctly', () => {
    cy.visit('/#/place/Heidelberg,BW,Germany/@8.692416,49.401247/data/%7B%22zoom%22:8,%22layer%22:%22county%22,%22country%22:%22Germany%22%7D/embed/en-us')
    cy.get('.app-content')
    cy.get('#app')
    cy.get('#map-view').should('be.visible')
    cy.get('.view-on-ors').should('be.visible')

    cy.get('.leaflet-control-layers-toggle').should('not.be.visible')
    cy.get('.simple-place-search').should('not.exist')
    cy.get('.leaflet-control-zoom').should('not.exist')
    cy.get('.leaflet-draw').should('not.exist')
    cy.get('#polyline-measure-control').should('not.exist')
    cy.get('.my-location-btn').should('not.exist')
    cy.get('.accessibility-btn').should('not.exist')

    cy.get('.place-input-component input[type=text]')
    cy.get('.custom-html-icon-div').as('point')
    cy.get('@point')
      .should('have.css', 'background-color', 'rgb(255, 0, 0)')
    cy.get('@point').should('have.length', 1)
    cy.get('@point').click({force: true})
    cy.get('.leaflet-popup')
    cy.get('.leaflet-popup-content').should('contain.text', 'Heidelberg, BW,Germany')

    //  TODO: check scroll behaviour
  })
})
