import I18nBuilder from '@/i18n/i18n-builder'
import EditDialog from './EditDialog.vue'
import store from '@/store/store'

//const i18n = I18nBuilder.build()

describe('<EditDialog />', () => {
  const data = []
  const skills= []
  it('renders', () => {
    cy.mount(EditDialog, {
      propsData: {
        data: data, skills: skills, editProp: 'jobs'
      }, i18n: I18nBuilder.build(), store: store
    })
  })
})
