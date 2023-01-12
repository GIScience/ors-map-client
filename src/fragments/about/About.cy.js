import About from './About.vue'
import I18nBuilder from '@/i18n/i18n-builder'
import store from '@/store/store'

describe('<About />', () => {
  const i18n = I18nBuilder.build()


  it('renders', () => {
    // see: https://test-utils.vuejs.org/guide/
    cy.mount(About, {store: store, i18n: i18n})

    cy.get('.about-container')
  })
})
