
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

      cy.get('[data-cy="manage-jobs"]').should('be.visible')
      cy.get('[data-cy="hide-jobs"]').as('hide').should('be.visible')
      cy.get('[data-cy="job-inputs"]').should('have.length', 1)

      cy.get('[data-cy="job-list"]').as('jobs').should('be.visible')
      cy.get('@jobs').contains('Job 1').should('be.visible')
      cy.get('@jobs').contains('8.6884260, 49.419614').should('be.visible')
      cy.get('@jobs').contains('Deliveries').should('be.not.visible')
      cy.get('@jobs').contains('Pickups').should('be.not.visible')
      cy.get('@jobs').contains('Skills').should('be.not.visible')
      cy.get('@jobs').contains('Service time').should('be.not.visible')
      //expand job
      cy.get('@jobs').click()
      cy.get('@jobs').contains('Deliveries').should('be.visible')
      cy.get('@jobs').contains('Pickups').should('be.visible')
      cy.get('@jobs').contains('Skills').should('be.visible')
      cy.get('@jobs').contains('Service time').should('be.visible')

      //hide job correctly
      cy.get('@hide').click()
      cy.get('[data-cy="hidden-jobs"]').contains('Saved Jobs: 1')
    })

    it('shows vehicle correctly', () => {
      viewPage('/#/optimize/49.419614285204595,8.688426017761232/data/' +
        '{"coordinates":"8.688426017761232,49.419614285204595",' +
        '"options":{"center":{"lat":49.41743941444882,"lng":8.681871455062602},"zoom":18,' +
        '"vehicles":[{"id":1,"start":[8.678770065307619,49.4197817871778],"end":[8.678770065307619,49.4197817871778],' +
        '"profile":"driving-car","time_window":[45000,50420],"capacity":[5],' +
        '"skills":[1]}],' +
        '"jobProps":[{"id":1,"skills":[1],"service":3600,"delivery":[1],"pickup":[1]}]}}')

      cy.get('[data-cy="manage-vehicles"]').should('be.visible')
      cy.get('[data-cy="vehicle-inputs"]').should('have.length', 1)

      cy.get('[data-cy="vehicle-list"]').as('vehicles').should('be.visible')
      cy.get('@vehicles').contains('Vehicle 1')
      cy.get('@vehicles').contains('driving-car')
      cy.get('@vehicles').contains('Capacity')
      cy.get('@vehicles').contains('Skills')
      cy.get('@vehicles').contains('Time window')
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

      cy.get('[data-cy="manage-jobs"]').click()

      // shows dialog and card content correctly
      cy.get('.edit-header-btn')
      cy.get('.download-container')
      cy.get('[data-cy="dataCards"]').as('dataCards').should('have.length', 1)
      cy.get('[data-cy="cardText"]').as('cardText')

      cy.get('@dataCards').contains('edit').should('be.visible')
      cy.get('@dataCards').contains('copy').should('be.visible')
      cy.get('@dataCards').contains('delete').should('be.visible')

      cy.get('@cardText').contains('Service time').should('be.visible')
      cy.get('@cardText').contains('Skills').should('be.visible')
      cy.get('@cardText').contains('Deliveries').should('be.visible')
      cy.get('@cardText').contains('Pickups').should('be.visible')

      //expand card and change job
      cy.get('@cardText').click()
      cy.get('@dataCards').contains('check').should('be.visible')

      cy.get('[data-cy="delivery"]').clear()
        .type('2')
      cy.get('[data-cy="pickup"]').clear()
        .type('2')
      cy.get('[data-cy="service"]').clear()
        .type('0')
      cy.get('@cardText').contains('drop_down').click()
      cy.contains('settings').should('be.visible')
      cy.contains('check_box').click()

      // close dialog with x and check if job has not changed
      cy.get('[data-cy="edit-dialog"]').contains('close').click()
      cy.get('[data-cy="job-list"]').as('jobs').click()
      cy.get('@jobs').contains('Job 1').should('be.visible')
      cy.get('@jobs').contains('8.6884260, 49.419614').should('be.visible')
      cy.get('@jobs').contains('Deliveries: 1').should('be.visible')
      cy.get('@jobs').contains('Pickups: 1').should('be.visible')
      cy.get('@jobs').contains('Skills: 1').should('be.visible')
      cy.get('@jobs').contains('Service time: 1').should('be.visible')
    })

    it('picks place from map', () => {
      viewPage('/#/optimize/49.419614285204595,8.688426017761232/data/' +
        '{"coordinates":"8.688426017761232,49.419614285204595",' +
        '"options":{"center":{"lat":49.41743941444882,"lng":8.681871455062602},"zoom":18,' +
        '"vehicles":[{"id":1,"start":[8.678770065307619,49.4197817871778],"end":[8.678770065307619,49.4197817871778],' +
        '"profile":"driving-car","time_window":[45000,50420],"capacity":[5],' +
        '"skills":[1]}],' +
        '"jobProps":[{"id":1,"skills":[1],"service":3600,"delivery":[1],"pickup":[1]}]}}')

      cy.get('[data-cy="manage-jobs"]').click()
      cy.get('[data-cy="cardText"]').click()

      cy.contains('search').click()
      cy.get('[data-cy="location-input"]').should('be.visible')
      cy.contains('map').should('be.visible')
        .click()

      cy.get('[data-cy="edit-dialog"]').should('not.exist')

      cy.get('#map-view').click()
      cy.get('[data-cy=save]').click()
      cy.get('[data-cy="job-list"]').contains('Job 1')
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
