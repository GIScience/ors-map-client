describe('place component', () => {
  beforeEach(() => {
    cy.viewport(1848, 980)
  })
  it('renders coordinate correctly', () => {
    cy.visit('/#/place/@-48.467559814453125,-23.856953970230652,6')
    cy.get('.place-input-component input[type=text]').should('be.visible')
    cy.get('.custom-html-icon-div').should('have.length', 0)
    // TODO: map is currently not moved. See https://stackoverflow.com/questions/60987787/test-dragging-a-leaflet-map-in-cypress
    cy.get('#map-view')
      .trigger('mousedown', 'center')
      .trigger('mousemove', {movementX: 5, movementY: 5})
      .trigger('mouseup')
    // cy.url().should('not.contain', '-48.467559814453125,-23.856953970230652')
  })
  it('renders single place correctly', () => {
    cy.visit('/#/place/Salvador,BA,Brazil/@-38.421936,-12.964413,9/data/%7B"layer":"locality","country":"Brazil","zoom":9%7D')
    cy.get('.place-input-component input[type=text]')
    cy.get('.fit-all-features').click({force: true})
    cy.get('.custom-html-icon-div').should('be.visible')
    cy.get('.custom-html-icon-div').should('have.length', 1)
    cy.get('.custom-html-icon-div').eq(0).should('have.css', 'background-color', 'rgb(255, 0, 0)')
    cy.get('.leaflet-overlay-pane svg path.leaflet-interactive').should('have.length.gt', 0)
  })

  it('app page single place rendering', () => {
    cy.visit('/#/place/Heidelberg,BW,Germany/@8.692416,49.401247/data/%7B"zoom":8,"layer":"county","country":"Germany"%7D')
    cy.get('.place-input-component input[type=text]')
    cy.get('.place-input-component input[type=text]').should('have.value', 'Heidelberg, BW,Germany')
    cy.get('.custom-html-icon-div').should('have.length', 1).click({force: true})
    cy.get('.custom-html-icon-div').eq(0).should('have.css', 'background-color', 'rgb(255, 0, 0)')
    cy.get('.leaflet-popup')
    cy.get('.leaflet-popup-content').should('contain.text', 'Heidelberg, BW,Germany')
  })
})
