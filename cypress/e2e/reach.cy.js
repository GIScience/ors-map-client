describe('reach component', () => {
  beforeEach(() => {
    cy.viewport(1848, 980)
  })
  it('has isochrones form in sidebar', () => {
    cy.visit('/#/reach')
    cy.get('.sidebar').should('be.visible')
    cy.get('.isochrones-tab-form').should('be.visible')
    cy.get('.places-and-directions-tab-form').should('not.be.visible')
  })
  it('renders isochrones correctly', () => {
    cy.visit('/#/reach/Rua Jataúba,Salvador,BA,Brazil/data/{"coordinates":"-38.48030090332032,-12.983147716796566","options":{"profile":"cycling-regular","range_type":"distance","range":[31000],"interval":15000,"zoom":18}}')
    cy.get('.place-input-component input[type=text]').should('have.value', 'Rua Jataúba, Salvador,BA,Brazil')
    cy.get('.custom-html-icon-div').click()
    cy.get('.custom-html-icon-div').should('be.visible')
    cy.get('.custom-html-icon-div').should('have.length', 1)
    cy.get('.custom-html-icon-div').should('have.css', 'background-color', 'rgb(255, 0, 0)')
    cy.get('.leaflet-popup')
    cy.get('.leaflet-popup-content').should('contain.text', 'Rua Jataúba, Salvador,BA,Brazil')
    cy.get('.sidebar').should('be.visible')
    cy.get('.sidebar li.polygons-header').should('have.length', 1)
    cy.get('.sidebar .polygon-area').should('have.length', 3)
  })
})
