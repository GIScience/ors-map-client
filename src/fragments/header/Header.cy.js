import Header from './Header.vue'
import store from '@/store/store'
import I18nBuilder from '@/i18n/i18n-builder'

describe('<Header />', () => {
  const i18n = I18nBuilder.build()
  const dummyMenu = [{
    active: false,
    external: true,
    href: 'https://openrouteservice.org/donations/',
    icon: 'link',
    notInHeader: false,
    requiresBeAuthenticated: false,
    title: '♥ Donate'
  },{
    active: true,
    external: false,
    href: '/plans',
    icon: 'link',
    notInHeader: false,
    requiresBeAuthenticated: false,
    title: 'Plans'
  }]
  it('renders', () => {
    cy.viewport(1800, 900)

    store.commit('mainMenu', dummyMenu)
    store.commit('setTopBarIsOpen', true)
    cy.mount(Header, {i18n: i18n, store: store})
    // TODO: Header only starts open on continuous test runs, not on first
    cy.get('.ors-toolbar')
    cy.get('nav').should('be.visible')
    cy.get('a img').should('be.visible')

    // header auto hides after some seconds
    cy.get('.v-icon').should('have.text', 'keyboard_arrow_down')
    cy.get('nav').should('have.class', 'hidden')

    // show nav again
    cy.get('.v-icon').click()
    cy.get('.app-btn-mh').should('have.length', 2)
    cy.get('.active').should('contain.text', 'Plans')
  })
})
