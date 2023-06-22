// // Solves the 'RegeneratorRuntime is not defined' issue according to
// // https://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import '@babel/polyfill'

import AppLoader from '@/app-loader'
import store from '@/store/store'
import I18nBuilder from '@/i18n/i18n-builder'
import router from '@/router'
import AppRootComponent from '@/App.vue'
import Footer from '@/fragments/footer/Footer'
import {EventBus} from '@/common/event-bus'

describe('<App />', () => {
  beforeEach(() => {
    cy.spy(EventBus, '$on').as('eventBusRegisterSpy')
    cy.spy(EventBus, '$emit').as('eventBusEmitSpy')
    cy.intercept('GET', 'https://tile.openstreetmap.org/*/*/*.png', {fixture: 'map-pin.jpg'})
    new AppLoader().fetchApiInitialData()
    cy.stub(Footer.computed, 'appVersion', () => {
      // appVersion reads from process.env, which isn't available in browser during testing
      return 'X.X.X'
    })
    cy.mount(AppRootComponent, {i18n: I18nBuilder.build(), store: store, router: router})
  })
  it('renders the app component', () => {
    cy.get('.app-content')
    cy.get('#map-view')
    cy.get('.simple-place-search')
    cy.get('.progress-linear').should('have.class', 'progress-linear-disabled')
  })

  it('should toggle progress bar correctly', () => {
    cy.get('@eventBusRegisterSpy').should('have.been.calledWith', 'showLoading')
    cy.get('@eventBusRegisterSpy').should('have.been.calledWith', 'titleChanged')
    cy.get('@eventBusRegisterSpy').should('have.been.calledWith', 'appLoaded')
    cy.get('@eventBusEmitSpy').should('have.been.calledWith', 'titleChanged')

    // check progress bar hidden after initial page load and set loading true
    cy.get('.progress-linear').should('have.class', 'progress-linear-disabled').then(() => {
      EventBus.$emit('showLoading', true)
    })
    cy.get('@eventBusEmitSpy').should('have.been.calledWith', 'showLoading', true)

    // check bar is enabled and set loading false again
    cy.get('.progress-linear').should('not.have.class', 'progress-linear-disabled').then(() => {
      EventBus.$emit('showLoading', false)
    })
    cy.get('@eventBusEmitSpy').should('have.been.calledWith', 'showLoading', false)
    cy.get('.progress-linear').should('have.class', 'progress-linear-disabled')
  })
})
