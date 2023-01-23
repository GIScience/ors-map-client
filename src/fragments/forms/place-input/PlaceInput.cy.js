import PlaceInput from './PlaceInput.vue'
import Place from '@/models/place'
import I18nBuilder from '@/i18n/i18n-builder'
import store from '@/store/store'
import AppLoader from '@/app-loader'
import router from '@/router'
import defaultMapSettings from '@/config/default-map-settings'

const i18n = I18nBuilder.build()

function mock_reverse_geocode() {
  cy.intercept(`${defaultMapSettings.apiBaseUrl}/geocode/reverse*`, (req) => {
    req.reply({
      fixture: 'geocode_reverse_mock.json'
    })
  })
}

function mock_geocode() {
  cy.intercept(`${defaultMapSettings.apiBaseUrl}/geocode/search*`, (req) => {
    req.reply({
      fixture: 'geocode_mock.json'
    })
  })
}

describe('<PlaceInput />', () => {
  const testPlace = new Place(48, 8)

  it('renders', () => {
    cy.mount(PlaceInput, {
      propsData: {
        index: 0, model: testPlace
      }, i18n: i18n, store: store
    })
  })

  it('renders with starting place text', () => {
    cy.mount(PlaceInput, {
      propsData: {
        index: 0, model: testPlace
      }, i18n: i18n, store: store
    })
    cy.get('.v-input').should('contain.text', i18n.messages[i18n.locale].placeInput.startingPlace)
  })

  it('shows suggestions when typing', () => {
    mock_reverse_geocode()
    new AppLoader().fetchApiInitialData()
    cy.mount(PlaceInput, {
      propsData: {
        index: 0, model: testPlace
      }, i18n: i18n, store: store
    })
    cy.get('.place-input').should('exist')
    cy.get('input').clear()
    cy.get('input').type('heidelberg')

    cy.get('.place-suggestion').first()
    cy.get('.place-suggestion').should('have.length.gt', 2)
  })

  it('shows suggestions for coordinates', () => {
    mock_reverse_geocode()
    mock_geocode()
    new AppLoader().fetchApiInitialData()
    cy.mount(PlaceInput, {
      propsData: {
        index: 0, model: testPlace
      }, i18n: i18n, store: store
    })
    cy.get('.place-input').should('exist')
    cy.get('input').clear()
    cy.get('input').type('-37.97321319580079,-12.489208068615273')
    cy.get('.place-suggestion').first()
    cy.get('.place-suggestion').should('have.length.gt', 2)
    cy.get('.place-suggestion').first().should('contain.text', '-37.97321319580079,-12.489208068615273')
  })

  it('makes switch available for coordinates', () => {
    mock_reverse_geocode()
    new AppLoader().fetchApiInitialData()
    cy.mount(PlaceInput, {
      propsData: {
        index: 0, model: testPlace
      }, i18n: i18n, store: store
    })
    cy.viewport(1848, 980)
    cy.get('input[type="text"]').clear()
    cy.get('input[type="text"]').type('3,6')
    cy.get('.switch-coords').click()
    cy.get('.place-suggestion').first().should('contain.text', '6,3')
    // TODO: test emits
    // expect(wrapper.emitted().autocompleted).toBeTruthy()
  })

  it.skip('shows no suggestions when clearing input', () => {
    // TODO: suggestions not cleared with previous coordinate input
    // see https://github.com/GIScience/ors-map-client/issues/322
    mock_geocode()
    cy.intercept(`${defaultMapSettings.apiBaseUrl}/geocode/reverse*`, (req) => {
      req.reply({
        fixture: 'geocode_reverse_mock.json'
      })
    })
    new AppLoader().fetchApiInitialData()
    cy.mount(PlaceInput, {
      propsData: {
        index: 0, model: testPlace
      }, i18n: i18n, store: store
    })
    cy.get('.place-input').should('exist')
    cy.get('input').click()
    cy.get('.place-suggestion')
    cy.get('input').clear()
    cy.get('.place-suggestion').should('not.exist')
  })

  it('switches to search mode on enter', () => {
    mock_geocode()
    mock_reverse_geocode()
    new AppLoader().fetchApiInitialData()
    cy.mount(PlaceInput, {
      propsData: {
        index: 0, model: testPlace
      }, i18n: i18n, store: store, router: router
    })
    cy.get('.place-input').should('exist')
    cy.get('input').clear()
    cy.get('input').type('heidelberg')
    cy.get('.place-suggestion').should('have.length.gt', 2)
    cy.get('input').type('{enter}')
    cy.get('.place-suggestion').should('have.length', 0)

    // TODO: test emits
    // expect(wrapper.emitted().switchedToSearchMode).to.beTruthy()
  })
})
