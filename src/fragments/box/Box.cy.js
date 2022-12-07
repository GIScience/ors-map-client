import Box from './Box.vue'
import I18nBuilder from '@/i18n/i18n-builder'
import store from '@/store/store'
//
// // Solves the 'RegeneratorRuntime is not defined' issue according to
// // https://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
// import '@babel/polyfill'

describe('Box', () => {
  const i18n = I18nBuilder.build()

  const defaultBoxProps = {
    resizable: true,
    closable: true,
    customClass: 'custom-class',
    headerBg: 'red',
    topBorderPalette: 'primary',
    topBgColor: 'white',
    fillHeight: true,
    background: 'white'
  }

  it('should render , resize, and close default box', () => {
    const resizeSpy = cy.spy().as('resizeSpy')
    const closedSpy = cy.spy().as('closedSpy')
    cy.mount(
      Box, {
        propsData: {
          ...defaultBoxProps,
          onResize: resizeSpy,
          onClosed: closedSpy,
        }, i18n: i18n, store: store, slots: {
          default: '<div style="min-width:600px" class="default-box-slot"/>',
          header: 'Test box'
        }
      }
    )
    cy.get('.box')
    cy.get('.default-box-slot')
    cy.get('.box-header').should('contain.text', 'Test box')
    cy.get('.box').should(
      'have.css', 'z-index','auto')
      .and('have.css', 'background-color', 'rgb(255, 255, 255)')
      .and('have.css', 'border-top', '5px solid rgb(198, 40, 40)')
    cy.get('.resize').click()
    // TODO: make listening to events work
    // cy.get('@resizeSpy').should('have.been.calledOnce')
    cy.get('.close').click()
    // cy.get('@closedSpy').should('have.been.calledOnce')
  })

  it('should render section box', () => {
    let boxProps = {...defaultBoxProps, ...{tag: 'section'}}
    cy.mount(Box, {propsData: boxProps, i18n: i18n, store: store, slots: { header: 'Test box' } })
    cy.get('section')
  })

  it('should render non-closable box', () => {
    let boxProps = {...defaultBoxProps, ...{closable: false}}
    cy.mount(Box, {propsData: boxProps, i18n: i18n, store: store, slots: { header: 'Test box' } })
    cy.get('.close').should('not.exist')
    cy.get('.resize')
  })

  it('should render non-resizable box', () => {
    let boxProps = {...defaultBoxProps, ...{resizable: false}}
    cy.mount(Box, {propsData: boxProps, i18n: i18n, store: store, slots: { header: 'Test box' } })
    cy.get('.resize').should('not.exist')
    cy.get('.close')
  })
})
