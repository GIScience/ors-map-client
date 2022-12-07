describe('search place', () => {
  it('renders correctly', () => {
    cy.visit('/#/search/heidelberg/@50.92381327191293,9.052734375000002/z/6')

    cy.get('.place-input-component input[type=text]')
    cy.get('.places-nav')
    cy.get('.custom-html-icon-div').should('have.length.gt', 20)
    cy.get('.vhl-item').should('have.length.gt', 20)
    cy.get('.place-input-component input[type=text]').should('have.value', 'heidelberg')
  })
})
