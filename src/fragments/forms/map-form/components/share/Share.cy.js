import Share from './Share.vue'
import I18nBuilder from '@/i18n/i18n-builder'
import store from '@/store/store'

const mockUrl = 'https://mock_url_123.test'

describe('<Share />', () => {
  beforeEach(() => {
    cy.viewport(600, 562)
    cy.mount(Share, {
      i18n: I18nBuilder.build(), store: store, propsData: {
        url: mockUrl
      }
    })
  })
  it('renders, opens and closes modal', () => {
    cy.get('.share-container')
    cy.get('.share-modal').should('not.exist')
    cy.get('.open-share-btn').click()
    cy.get('.share-modal').should('be.visible')
    cy.get('.share-modal .box-header .close').click()
    cy.get('.share-modal').should('not.exist')
  })
  it('shows share link correctly, iframe code and ', () => {
    cy.get('.open-share-btn').click()
    cy.get('input[type="text"]').should('have.value', mockUrl)
  })
  it('shows iframe code correctly', () => {
    cy.get('.open-share-btn').click()
    const locale = 'en-us'
    store.commit('mapSettings', {locale: locale})
    let iframeCode = `<iframe style='border:none' width='100%' height='100%'  src="${mockUrl}/embed/${locale}"></iframe>`
    cy.get('textarea').should('have.value', iframeCode)
  })
  it('toggles short url', () => {
    cy.get('.open-share-btn').click()
    cy.intercept('GET', '**/v3/shorten*', (req) => {
      req.reply({
        'status_code': 200,
        'data': {
          'url': 'https://bit.ly/3ZHDUoZ',
        }
      })
    })
    cy.get('.toggle-short-url').click()
    cy.get('input[type="text"]').should('contain.value', 'https://bit.ly/')
    cy.get('.toggle-short-url').click()
    cy.get('input[type="text"]').should('have.value', mockUrl)
  })
})
