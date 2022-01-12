import FormFields from '@/fragments/forms/fields-container/components/form-fields/FormFields.vue'
import OrsParamsParser from '@/support/map-data-services/ors-params-parser'
import OrsMapFilters from '@/config/ors-map-filters'
import constants from '@/resources/constants'
import I18nBuilder from '@/i18n/i18n-builder'
import { mount } from '@vue/test-utils'
import AppLoader from '@/app-loader'
import store from '@/store/store'

// Solves the 'RegeneratorRuntime is not defined' issue according to
// https://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import '@babel/polyfill'

describe('Form-fields', () => {
  var i18n = I18nBuilder.build()
  
  it('should render and update form fields', async (done) => {
    await new AppLoader().fetchApiInitialData()
    store.commit('mode', constants.modes.directions)
    let options = {zoom: 10}
    OrsParamsParser.setFilters(options, OrsMapFilters, constants.services.directions)
    var props = { parameters: OrsMapFilters, parentIndex: 0, level: 0 } 
    const wrapper = mount(FormFields, {propsData: props, i18n: i18n, store: store })
    expect(wrapper.contains('.form-fields')).toBe(true)
    expect(wrapper.findComponent(FormFields).exists()).toBe(true)
    await wrapper.vm.$el.querySelectorAll('.form-fields-autocomplete input')[0].click()   
    await wrapper.vm.$el.querySelectorAll('.form-fields-autocomplete')[0].querySelectorAll('.v-menu a')[0].click()
    expect(wrapper.emitted().fieldUpdated).toBeTruthy()
    
    let  multiSelect = wrapper.find('.multi-select input')
    await multiSelect.trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$el.querySelectorAll('.multi-select')[0].querySelectorAll('.v-menu a')[1].click()
    await wrapper.vm.$el.querySelectorAll('.multi-select')[0].querySelectorAll('.v-menu a')[0].click()
    expect(wrapper.emitted().fieldUpdated).toBeTruthy()
    done()
  })

  it('should react to filters changed externally', async (done) => {
    await new AppLoader().fetchApiInitialData()
    store.commit('mode', constants.modes.directions)
    let options = {zoom: 10}
    OrsParamsParser.setFilters(options, OrsMapFilters, constants.services.directions)
    var props = { parameters: OrsMapFilters, parentIndex: 0, level: 0 } 
    const wrapper = mount(FormFields, {propsData: props, i18n: i18n, store: store })
    expect(wrapper.contains('.form-fields')).toBe(true)
    expect(wrapper.findComponent(FormFields).exists()).toBe(true)
    wrapper.vm.eventBus.$emit('filtersChangedExternally')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().updated).toBeTruthy()
    done()
  })

  it('should render form-fields with level 1', async (done) => {
    await new AppLoader().fetchApiInitialData()
    store.commit('mode', constants.modes.directions)
    let options = {zoom: 10}
    OrsParamsParser.setFilters(options, OrsMapFilters, constants.services.directions)
    var props = { parameters: OrsMapFilters, parentIndex: 0, level: 1 } 
    const wrapper = mount(FormFields, {propsData: props, i18n: i18n, store: store }) 
    expect(wrapper.contains('.form-fields')).toBe(true)
    expect(wrapper.findComponent(FormFields).exists()).toBe(true)
    done()
  })

  it('should render form-fields with parent index', async (done) => {
    await new AppLoader().fetchApiInitialData()
    store.commit('mode', constants.modes.directions)
    let options = {zoom: 10}
    OrsParamsParser.setFilters(options, OrsMapFilters, constants.services.directions)
    var props = { parameters: OrsMapFilters[8], parentIndex: 8, level: 0 } 
    
    const wrapper = mount(FormFields, {propsData: props, i18n: i18n, store: store }) 
    expect(wrapper.contains('.form-fields')).toBe(true)
    expect(wrapper.findComponent(FormFields).exists()).toBe(true)
    done()
  })

  it('should render form-fields in isochrones', async (done) => {
    await new AppLoader().fetchApiInitialData()
    store.commit('mode', constants.modes.isochrones)
    let options = {zoom: 10}
    OrsParamsParser.setFilters(options, OrsMapFilters, constants.services.directions)
    var props = { parameters: OrsMapFilters, parentIndex: 0, level: 0 } 
    
    const wrapper = mount(FormFields, {propsData: props, i18n: i18n, store: store }) 
    expect(wrapper.contains('.form-fields')).toBe(true)
    expect(wrapper.findComponent(FormFields).exists()).toBe(true)
    let slider = wrapper.find('.v-slider input')
    await slider.setValue(30)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().updated).toBeTruthy()

    let  sliderComboInput = wrapper.find('.form-fields-slider-text-input input[type="number"]')
    sliderComboInput.trigger('focus')
    await sliderComboInput.setValue(5)
    await sliderComboInput.trigger('keyup')
    await  wrapper.vm.$nextTick()
    expect(wrapper.emitted().updated).toBeTruthy()
    done()
  })

  it('should render form-fields in roundtrip', async (done) => {
    await new AppLoader().fetchApiInitialData()
    store.commit('mode', constants.modes.roundTrip)
    OrsParamsParser.setFilters({zoom: 10}, OrsMapFilters, constants.services.directions)
    var props = { parameters: OrsMapFilters, parentIndex: 0, level: 0 } 
    
    const wrapper = mount(FormFields, {propsData: props, i18n: i18n, store: store }) 
    expect(wrapper.contains('.form-fields')).toBe(true)
    expect(wrapper.findComponent(FormFields).exists()).toBe(true)
    await new Promise(resolve => setTimeout(resolve, 5000))    
    await wrapper.find('.generate-random').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().fieldUpdated).toBeTruthy()
    done()
  })
})
