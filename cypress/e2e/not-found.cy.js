describe('invalid urls', function () {
  it('renders error on broken url', () => {
    cy.visit('/#/directions/Old%20Invercauld%20Bridge,Aberdeenshire,Scotland,United%20Kingdom/Old%20Deeside%20Road,Aberdeenshire,Schottland,Vereinigtes%20Königreich/Old%20Deeside%20Road,Aberdeenshire,S')
    cy.get('.v-snack__content').should('be.visible')
    cy.get('.v-snack__wrapper.error').should('be.visible')
  })
  it('renders page not found for invalid page', () => {
    cy.visit('/#/dummy-page')
    cy.get('.v-snack__content').should('be.visible')
    cy.get('.v-snack__wrapper.error').should('be.visible')
  })
})
