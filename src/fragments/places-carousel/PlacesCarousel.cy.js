import PlacesCarousel from './PlacesCarousel.vue'
import mockPlaces from 'fixtures/mockPlaces.json'
import store from '@/store/store'
import I18nBuilder from '@/i18n/i18n-builder'
import constants from '@/resources/constants'
import MapViewData from '@/models/map-view-data'

const i18n = I18nBuilder.build()


describe('<PlacesCarousel />', () => {
  it('renders', () => {
    cy.viewport(700, 300)
    cy.intercept('GET', `${constants.worldImageryTileProviderBaseUrl}/*/*/*`, {fixture: 'map-pin.jpg'})
    cy.mount(PlacesCarousel, {
      propsData: {
        mapViewData: new MapViewData({places: mockPlaces}), activeIndex: 0
      }, i18n: i18n, store: store
    })
    cy.get('.carousel .vue-horizontal-list')
    cy.get('.vhl-list .vhl-item').should('have.length', 3)
    cy.get('.item.active')
  })
})
