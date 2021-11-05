import Header from '@/fragments/header/Header'
import I18nBuilder from '@/i18n/i18n-builder'
import { mount } from '@vue/test-utils'
import AppLoader from '@/app-loader'
import store from '@/store/store'


// Solves the 'RegeneratorRuntime is not defined' issue according to
// https://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import '@babel/polyfill'

describe('Header', () => {
  var i18n = I18nBuilder.build()
   
  it('should render header with menu items', async (done) => {
    let appLoader = new AppLoader()
    await appLoader.fetchApiInitialData()
    await appLoader.loadAppData()
    
    const wrapper = mount(Header, {propsData: {}, i18n: i18n, store: store })

    let toolBar = wrapper.vm.$el.querySelector('.ors-toolbar')
    expect(toolBar).toBeDefined()
    expect(toolBar).not.toBeNull()

    wrapper.vm.$nextTick(() => { 
      setTimeout(() => {
        let appBtnMh = wrapper.vm.$el.querySelectorAll('.app-btn-mh')
        expect(appBtnMh.length).toBeGreaterThan(2) 
        
        let logo = wrapper.vm.$el.querySelector('a img')
        expect(logo).toBeDefined()
        expect(logo).not.toBeNull()
        done()
      }, 200)
    })
    
  })
})
