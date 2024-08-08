
describe('Optimization component', () => {
  context('loads route from URL link', () => {
    it('shows optimization page and features correctly', () => {
      viewPage('/#/optimize/49.419614285204595,8.688426017761232/data/' +
        '{"coordinates":"8.688426017761232,49.419614285204595",' +
        '"options":{"center":{"lat":49.41743941444882,"lng":8.681871455062602},"zoom":18,' +
        '"vehicles":[{"id":1,"start":[8.678770065307619,49.4197817871778],"end":[8.678770065307619,49.4197817871778],' +
        '"profile":"driving-car","time_window":[45000,50420],"capacity":[5],' +
        '"skills":[1]}],' +
        '"jobProps":[{"id":1,"skills":[1],"service":3600,"delivery":[1],"pickup":[1]}]}}')

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
      cy.get('[data-cy=optimization-routes]').as('routes')
      cy.get('@routes').should('have.length', 1)
      cy.get('@routes').contains('Distance')
      cy.get('@routes').contains('Duration')
      cy.get('@routes').contains('Service time')
      cy.get('@routes').contains('Deliveries')
      cy.get('@routes').contains('Pickups')
      cy.get('.route-details').should('have.length', 1)
      cy.get('.step').should('have.length', 3)

      // shows buttons
      cy.get('[data-cy="manage-skills"]').should('be.visible')
    })

    it('shows job correctly', () => {
      viewPage('/#/optimize/49.419614285204595,8.688426017761232/data/' +
        '{"coordinates":"8.688426017761232,49.419614285204595",' +
        '"options":{"center":{"lat":49.41743941444882,"lng":8.681871455062602},"zoom":18,' +
        '"vehicles":[{"id":1,"start":[8.678770065307619,49.4197817871778],"end":[8.678770065307619,49.4197817871778],' +
        '"profile":"driving-car","time_window":[45000,50420],"capacity":[5],' +
        '"skills":[1]}],' +
        '"jobProps":[{"id":1,"skills":[1],"service":3600,"delivery":[1],"pickup":[1]}]}}')

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
      viewPage('/#/optimize/49.419614285204595,8.688426017761232/data/' +
        '{"coordinates":"8.688426017761232,49.419614285204595",' +
        '"options":{"center":{"lat":49.41743941444882,"lng":8.681871455062602},"zoom":18,' +
        '"vehicles":[{"id":1,"start":[8.678770065307619,49.4197817871778],"end":[8.678770065307619,49.4197817871778],' +
        '"profile":"driving-car","time_window":[45000,50420],"capacity":[5],' +
        '"skills":[1]}],' +
        '"jobProps":[{"id":1,"skills":[1],"service":3600,"delivery":[1],"pickup":[1]}]}}')

      cy.get('.manage-jobs').should('be.visible')
      cy.get('.vehicle-inputs').should('have.length', 1)

      cy.get('.no-shadow').contains('Vehicle 1')
      cy.get('.no-shadow').contains('driving-car')
      cy.get('.no-shadow').contains('Capacity')
      cy.get('.no-shadow').contains('Skills')
      cy.get('.no-shadow').contains('Time window')
    })
  })

  context('opens edit dialog', () => {
    it('shows manageJobs and features correctly', () => {
      viewPage('/#/optimize/49.419614285204595,8.688426017761232/data/' +
        '{"coordinates":"8.688426017761232,49.419614285204595",' +
        '"options":{"center":{"lat":49.41743941444882,"lng":8.681871455062602},"zoom":18,' +
        '"vehicles":[{"id":1,"start":[8.678770065307619,49.4197817871778],"end":[8.678770065307619,49.4197817871778],' +
        '"profile":"driving-car","time_window":[45000,50420],"capacity":[5],' +
        '"skills":[1]}],' +
        '"jobProps":[{"id":1,"skills":[1],"service":3600,"delivery":[1],"pickup":[1]}]}}')

      cy.get('.manage-jobs').click()

      // shows dialog and card content correctly
      cy.get('.edit-header-btn')
      cy.get('.download-container')
      cy.get('[data-cy="dataCards"]').should('have.length', 1)
      cy.get('[data-cy="cardText"]').as('cardText')

      cy.contains('edit').should('be.visible')
      cy.get('@cardText').contains('Service time')
      cy.get('@cardText').contains('Skills')
      cy.get('@cardText').contains('Deliveries')
      cy.get('@cardText').contains('Pickups')

      cy.get('@cardText').click()

      cy.contains('check').should('be.visible')

      cy.get('[data-cy="delivery"]').clear().type(2)
      cy.get('[data-cy="pickup"]').clear().type(2)
      cy.get('[data-cy="service"]').clear().type(0)
      // TODO: add skill selector check

      // TODO: test closing by the x in the top corner and whether changes hare not saved when cancelled
    })

    it('picks place from map', () => {
      viewPage('/#/optimize/49.419614285204595,8.688426017761232/data/' +
        '{"coordinates":"8.688426017761232,49.419614285204595",' +
        '"options":{"center":{"lat":49.41743941444882,"lng":8.681871455062602},"zoom":18,' +
        '"vehicles":[{"id":1,"start":[8.678770065307619,49.4197817871778],"end":[8.678770065307619,49.4197817871778],' +
        '"profile":"driving-car","time_window":[45000,50420],"capacity":[5],' +
        '"skills":[1]}],' +
        '"jobProps":[{"id":1,"skills":[1],"service":3600,"delivery":[1],"pickup":[1]}]}}')

      cy.get('.manage-jobs').click()
      cy.get('[data-cy="cardText"]').click()

      cy.contains('search').click()
      cy.get('.locationInput').should('be.visible')
      cy.contains('map').should('be.visible')
      cy.contains('map').click()

      cy.get('.edit-header-btn').should('not.exist')

      cy.get('#map-view').click()
      cy.get('[data-cy=save]').click()
    })
  })
  function viewPage(url) {
    cy.visit(url)
    cy.viewport(1848, 980)
    cy.get('#app')
    cy.get('.app-content')
    cy.get('#map-view')
    cy.get('.sidebar')
  }
})
