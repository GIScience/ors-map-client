import About from '@/fragments/about/About.vue'
import I18nBuilder from '@/i18n/i18n-builder'
import { mount } from '@vue/test-utils'
import AppLoader from '@/app-loader'
import store from '@/store/store'

// Solves the 'RegeneratorRuntime is not defined' issue according to
// https://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import '@babel/polyfill'

describe('About', () => {
  var i18n = I18nBuilder.build()
  it('should render about page', async (done) => {
    await new AppLoader().fetchApiInitialData()
    const wrapper = mount(About, {i18n: i18n, store: store })   
    
    expect(wrapper.contains('.about-container')).toBe(true)
    expect(wrapper.findComponent(About).exists()).toBe(true)
    done()
  })
})
