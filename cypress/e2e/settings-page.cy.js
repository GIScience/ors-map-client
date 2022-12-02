describe('landing page', () => {
  it('renders correctly', () => {
    cy.visit('/#/settings')
    cy.get('.v-dialog__content--active')
    cy.get('.settings-modal')
  })
})
