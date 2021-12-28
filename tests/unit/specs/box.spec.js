import { mount } from '@vue/test-utils'
import Box from '@/fragments/box/Box.vue'
import I18nBuilder from '@/i18n/i18n-builder'
import Utils from '@/support/utils'
import store from '@/store/store'

// Solves the 'RegeneratorRuntime is not defined' issue according to
// https://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import '@babel/polyfill'

describe('Box', () => {
  var i18n = I18nBuilder.build()
  
  var defaultBoxProps = {
    closable: true,
    vModel: true,
    fillHeight: true,
    resizable: true,
    background: 'white',
    customClass: 'custom-class',
    headerBg: 'red',
    topBorderPalette: 'primary',
    topBgColor: 'white',
    noTopBorder: false,
    right: false,
    noShadow: false,
    noBorder: false,
    value: true,// model (v-model parameter) that indicates if the box must be shown or not
    tag: 'div'
  }  

  it('should render , resize, and close default box', async (done) => {
    const wrapper = mount(Box, {propsData: defaultBoxProps, i18n: i18n, store: store, slots: { default: '<div style="min-width:600px" class="default-box-slot"/>', header: 'Test box' } })   
    expect(wrapper.findComponent(Box).exists()).toBe(true)
    expect(wrapper.vm.$el.querySelector(`#${wrapper.vm.guid}`)).toBeTruthy()
    expect(wrapper.get('.default-box-slot')).toBeTruthy()
    expect(wrapper.find('.box-header')).toBeTruthy()
    expect(wrapper.vm.$el.querySelector('.resize')).toBeTruthy()
    expect(wrapper.vm.$el.querySelector('.close')).toBeTruthy()
    expect(wrapper.find(`#${wrapper.vm.guid}`).attributes().style).toBe('background: white; z-index: auto; border-top: 5px solid rgb(198, 40, 40);')

    await wrapper.get('.resize').trigger('click')
    expect(wrapper.emitted().resized).toBeTruthy()

    await wrapper.get('.close').trigger('click')
    expect(wrapper.emitted().closed).toBeTruthy()

    done()
  })

  it('should render section box', async (done) => {
    let boxProps = Utils.merge(defaultBoxProps, {tag: 'section'})
    const wrapper = mount(Box, {propsData: boxProps, i18n: i18n, store: store, slots: { default: '<div class="default-box-slot"/>' } })   
    expect(wrapper.findComponent(Box).exists()).toBe(true)
    expect(wrapper.get('section')).toBeTruthy()
    expect(wrapper.get('.default-box-slot')).toBeTruthy()
    expect(wrapper.find('.box-header')).toBeTruthy()
    done()
  })

  it('should render non-closable box', async (done) => {
    let boxProps = Utils.merge(defaultBoxProps, {closable: false})
    const wrapper = mount(Box, {propsData: boxProps, i18n: i18n, store: store, slots: { default: '<div class="default-box-slot"/>' } })   
    expect(wrapper.findComponent(Box).exists()).toBe(true)
    expect(wrapper.get('.default-box-slot')).toBeTruthy()
    expect(wrapper.find('.box-header')).toBeTruthy()
    expect(wrapper.vm.$el.querySelector('.close')).not.toBeTruthy()
    expect(wrapper.vm.closable).toBe(false)    
    done()
  })

  it('should render non-resizable box', async (done) => {
    let boxProps = Utils.merge(defaultBoxProps, {resizable: false})
    const wrapper = mount(Box, {propsData: boxProps, i18n: i18n, store: store, slots: { default: '<div class="default-box-slot"/>' } })   
    expect(wrapper.findComponent(Box).exists()).toBe(true)
    expect(wrapper.get('.default-box-slot')).toBeTruthy()
    expect(wrapper.find('.box-header')).toBeTruthy()
    expect(wrapper.vm.$el.querySelector('.resize')).not.toBeTruthy()
    expect(wrapper.vm.resizable).toBe(false)    
    done()
  })
})
