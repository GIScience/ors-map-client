import FormFields from './FormFields.vue'
import store from '@/store/store'
import OrsMapFilters from '@/config/ors-map-filters'
import OrsParamsParser from '@/support/map-data-services/ors-params-parser'
import I18nBuilder from '@/i18n/i18n-builder'
import constants from '@/resources/constants'
import AppLoader from '@/app-loader'

describe('<FormFields />', () => {
  const i18n = I18nBuilder.build()
  store.commit('mode', constants.modes.directions)
  OrsParamsParser.setFilters(
    {zoom: 10},
    OrsMapFilters,
    constants.services.directions
  )

  it('renders and updates form fields', () => {
    // see: https://test-utils.vuejs.org/guide/
    new AppLoader().fetchApiInitialData()
    cy.mount(FormFields, {
      propsData: {
        parameters: OrsMapFilters,
        parentIndex: 0
      },
      i18n: i18n,
      store: store
    })
    cy.spy(FormFields.methods, 'fieldUpdated').as('fieldUpdatedSpy')
    cy.get('.form-fields')
    cy.get('.form-fields-autocomplete input').click()
    cy.get('.v-menu a').first().click()
    cy.get('@fieldUpdatedSpy').should('have.been.calledOnce')

    cy.get('.v-expansion-panel').first().click()
    cy.get('.multi-select input').first().click()
    cy.get('.multi-select').first().find('.v-menu a').eq(1).click()
    cy.get('@fieldUpdatedSpy').should('have.been.calledOnce')
    cy.get('.multi-select').first().find('.v-menu a').eq(0).click()
    cy.get('@fieldUpdatedSpy').should('have.been.calledOnce')
  })

  it.skip('should react to filters changed externally', () => {
    new AppLoader().fetchApiInitialData()

    store.commit('mode', constants.modes.directions)
    const options = {zoom: 10}
    OrsParamsParser.setFilters(options, OrsMapFilters, constants.services.directions)
    const props = {parameters: OrsMapFilters, parentIndex: 0, level: 0}
    cy.mount(FormFields, {propsData: props, i18n: i18n, store: store})
    cy.spy(FormFields, 'updated').as('updatedSpy')
    cy.get('.form-fields')
    // Todo: trigger eventBus emit
    // cy.window().its('Vue').its('eventBus').trigger('$emit','filtersChangedExternally')
    // cy.trigger('filtersChangedExternally')
    cy.get('@updatedSpy').should('have.been.called')
  })

  it('should render form-fields with level 1', () => {
    new AppLoader().fetchApiInitialData()
    store.commit('mode', constants.modes.directions)
    let options = {zoom: 10}
    OrsParamsParser.setFilters(options, OrsMapFilters, constants.services.directions)
    const props = { parameters: OrsMapFilters, parentIndex: 0, level: 1 }
    cy.mount(FormFields, {propsData: props, i18n: i18n, store: store})
    cy.get('.form-fields')
  })

  it('should render form-fields with parent index', () => {
    new AppLoader().fetchApiInitialData()
    store.commit('mode', constants.modes.directions)
    let options = {zoom: 10}
    OrsParamsParser.setFilters(options, OrsMapFilters, constants.services.directions)
    const props = { parameters: OrsMapFilters[8], parentIndex: 8, level: 0 }

    cy.mount(FormFields, {propsData: props, i18n: i18n, store: store})
    cy.get('.form-fields')
  })

  it('should render form-fields in isochrones', () => {
    new AppLoader().fetchApiInitialData()
    store.commit('mode', constants.modes.isochrones)
    let options = {zoom: 10}
    OrsParamsParser.setFilters(options, OrsMapFilters, constants.services.directions)
    const props = { parameters: OrsMapFilters, parentIndex: 0, level: 0 }

    cy.mount(FormFields, {propsData: props, i18n: i18n, store: store})
    cy.spy(FormFields, 'updated').as('updatedSpy')
    cy.get('.form-fields')
    cy.get('.v-slider input').first().as('slider')
    cy.get('@slider').invoke('val', '30').trigger('change')
    // TODO: this change triggers a change in the base app, which is not present in the test
    cy.get('@updatedSpy').should('have.been.called')

    cy.get('.form-fields-slider-text-input input[type="number"]').eq(1).as('sliderComboInput2')
    cy.get('@sliderComboInput2').focus()
    cy.get('@sliderComboInput2').invoke('val', 5).trigger('change')
    cy.get('@updatedSpy').should('have.been.called')
  })

  it('should render form-fields in roundtrip', () => {
    new AppLoader().fetchApiInitialData()
    store.commit('mode', constants.modes.roundTrip)
    OrsParamsParser.setFilters({zoom: 10}, OrsMapFilters, constants.services.directions)
    const props = { parameters: OrsMapFilters, parentIndex: 0, level: 0 }

    cy.mount(FormFields, {propsData: props, i18n: i18n, store: store})
    cy.spy(FormFields.methods, 'fieldUpdated').as('fieldUpdatedSpy')
    cy.get('.form-fields')
    cy.get('.generate-random').click()
    cy.get('@fieldUpdatedSpy').should('have.been.calledOnce')
  })
})
