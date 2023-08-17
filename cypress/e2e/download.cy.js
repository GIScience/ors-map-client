import path from 'path'
describe('download functionality', function () {
  beforeEach(()  => {
    cy.viewport(1848, 980)
    cy.visit('/#/directions/Mannheim,BW,Germany/Heidelberg,BW,Germany/data/%7B"coordinates":"8.612543, 49.472737;8.611746, 49.472586","options":%7B"zoom":18,"profile":"driving-car","preference":"recommended"%7D%7D')
  })

  function downloadFile(typeTitle, ext) {
    const cleanName = typeTitle.replace(' ', '_')
    cy.get('.open-download-btn').click()
    cy.get('.download-modal')
    cy.get('.export-file-name input[type=text]').clear().type(cleanName)
    cy.get('.download-format .v-select__selections').click()
    cy.get('.v-menu__content--fixed > .v-select-list > .v-list')
      .contains('div > .v-list__tile > ' +
    '.v-list__tile__content > .v-list__tile__title', typeTitle).click({force: true})
    cy.get('.download').click()
    let fileName = `${cleanName}.${ext}`
    return path.join(Cypress.config('downloadsFolder'), fileName)
  }

  it('downloads route json file', () => {
    const filePath = downloadFile('ORS JSON', 'json')
    cy.readFile(filePath).its('options').should('deep.equal',
      {
        'zoom': 18,
        'profile': 'driving-car',
        'preference': 'recommended'
      })
    // TODO: extend download tests. Aliasing the readFile with as(..) doesn't work
    // cy.get('@response').its('places[0].placeName').should('eq', 'Mannheim, BW,Germany')
    // cy.get('@response').its('mode').should('eq', 'directions')
    // cy.get('@response').its('isRouteData').should('eq', 'directions')
  })
  it('downloads a geojson file', () => {
    const filePath = downloadFile('GeoJSON', 'json')
    cy.readFile(filePath).its('features').should('have.length', 3)
  })
  it('downloads a gpx file', () => {
    const filePath = downloadFile('ORS API GPX', 'gpx')
    cy.readFile(filePath)
  })
  it('downloads a gpx file', () => {
    const filePath = downloadFile('Standard GPX', 'gpx')
    cy.readFile(filePath)
  })
  it('downloads a kml file', () => {
    const filePath = downloadFile('KML', 'kml')
    cy.readFile(filePath)
  })
})
