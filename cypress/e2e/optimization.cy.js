
describe('Directions component', () => {
  context('loads route from URL link', () => {
    it('shows optimization page and features correctly', () => {
      cy.visit('/#/optimize/49.419614285204595,8.688426017761232/data/{"coordinates":"8.688426017761232,49.419614285204595","options":{"center":{"lat":49.41743941444882,"lng":8.681871455062602},"zoom":18,"vehicles":[{"id":1,"start":[8.678770065307619,49.4197817871778],"end":[8.678770065307619,49.4197817871778],"profile":"driving-car","time_window":[45000,50420],"capacity":[5],"skills":[1]}],"jobProps":[{"id":1,"skills":[1],"service":3600,"delivery":[1],"pickup":[1]}]}}')
      cy.viewport(1848, 980)
      cy.get('#app')
      cy.get('.app-content')
      cy.get('#map-view')
      cy.get('.sidebar')

      // shows the map view correctly
      cy.get('.simple-place-search').should('not.exist')
      cy.get('.view-on-ors').should('not.exist')
      cy.get('.v-snack__content')
      cy.get('.ors-toolbar').should('not.be.visible')
      cy.get('.leaflet-control-layers').should('be.visible')
      cy.get('.leaflet-control-zoom').should('be.visible')
      cy.get('.leaflet-draw').should('be.visible')
      cy.get('#polyline-measure-control').should('be.visible')
      cy.get('.my-location-btn').should('be.visible')

      // shows the sidebar correctly
      cy.get('.sidebar-header')
      cy.get('.sidebar-content')

      // shows routes correctly
      cy.get('.optimization-routes').should('have.length', 1)
      cy.get('.optimization-routes').contains('Distance')
      cy.get('.optimization-routes').contains('Duration')
      cy.get('.optimization-routes').contains('Service time')
      cy.get('.optimization-routes').contains('Deliveries')
      cy.get('.optimization-routes').contains('Pickups')
      cy.get('.route-details').should('have.length', 1)
      cy.get('.step').should('have.length', 3)

      // shows buttons
      cy.get('.skill-opt-btn')
      cy.get('.add-place-btn')

    })

    it('shows job correctly', () => {
      cy.visit('/#/optimize/49.419614285204595,8.688426017761232/data/{"coordinates":"8.688426017761232,49.419614285204595","options":{"center":{"lat":49.41743941444882,"lng":8.681871455062602},"zoom":18,"vehicles":[{"id":1,"start":[8.678770065307619,49.4197817871778],"end":[8.678770065307619,49.4197817871778],"profile":"driving-car","time_window":[45000,50420],"capacity":[5],"skills":[1]}],"jobProps":[{"id":1,"skills":[1],"service":3600,"delivery":[1],"pickup":[1]}]}}')
      cy.viewport(1848, 980)
      cy.get('#app')
      cy.get('.app-content')
      cy.get('#map-view')
      cy.get('.sidebar')

      cy.get('.manage-jobs').should('be.visible')
      cy.get('.hide-button').should('be.visible')
      cy.get('.job-inputs').should('have.length', 1)

      cy.get('.no-shadow').contains('Job 1')
      cy.get('.no-shadow').contains('8.6884260, 49.419614')
      cy.get('.no-shadow').contains('Deliveries')
      cy.get('.no-shadow').contains('Pickups')
      cy.get('.no-shadow').contains('Skills')
      cy.get('.no-shadow').contains('Service time')
    })

    it('shows vehicle correctly', () => {
      cy.visit('/#/optimize/49.419614285204595,8.688426017761232/data/{"coordinates":"8.688426017761232,49.419614285204595","options":{"center":{"lat":49.41743941444882,"lng":8.681871455062602},"zoom":18,"vehicles":[{"id":1,"start":[8.678770065307619,49.4197817871778],"end":[8.678770065307619,49.4197817871778],"profile":"driving-car","time_window":[45000,50420],"capacity":[5],"skills":[1]}],"jobProps":[{"id":1,"skills":[1],"service":3600,"delivery":[1],"pickup":[1]}]}}')
      cy.viewport(1848, 980)
      cy.get('#app')
      cy.get('.app-content')
      cy.get('#map-view')
      cy.get('.sidebar')

      cy.get('.manage-jobs').should('be.visible')
      cy.get('.vehicle-inputs').should('have.length', 1)

      cy.get('.no-shadow').contains('Vehicle 1')
      cy.get('.no-shadow').contains('driving-car')
      cy.get('.no-shadow').contains('Capacity')
      cy.get('.no-shadow').contains('Skills')
      cy.get('.no-shadow').contains('Time window')
    })
  })
})
