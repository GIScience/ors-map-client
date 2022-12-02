describe('About page', () => {
  it('renders correctly', () => {
    cy.visit('/#/about')
    cy.get('.v-dialog__content--active').should('be.visible')
    cy.get('.about-modal').should('be.visible')
  })
})
