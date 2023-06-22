import mapViewDataTemplates from 'fixtures/map-view-data.js'
import MapView from './MapView.vue'
import MapViewProps from 'fixtures/map-view-props.js'
import I18nBuilder from '@/i18n/i18n-builder'
import AppLoader from '@/app-loader'
import store from '@/store/store'

describe('Map rendering', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://tile.openstreetmap.org/*/*/*.png', {fixture: 'map-pin.jpg'})
  })
  it('should render map-view with single place', () => {
    new AppLoader().fetchApiInitialData()
    let props = {... MapViewProps, ... {mapViewData: mapViewDataTemplates.singlePlace}}
    cy.mount(MapView, {propsData: props, i18n: I18nBuilder.build(), store: store})

    cy.get('#map-view')
  })
  it('should render map-view with place search results', () => {
    new AppLoader().fetchApiInitialData()
    let props = {... MapViewProps, ... {mapViewData: mapViewDataTemplates.placeSearchResults}}
    cy.mount(MapView, {propsData: props, i18n: I18nBuilder.build(), store: store})
    cy.get('#map-view')
  })
})
