import { mount } from '@vue/test-utils'
import { render } from '@vue/server-test-utils'
import PlaceInput from '@/fragments/forms/place-input/PlaceInput.vue'
import I18nBuilder from '@/i18n/i18n-builder'
import AppLoader from '@/app-loader'
import Utils from '@/support/utils'
import Place from '@/models/place'
import store from '@/store/store'

// Solves the 'RegeneratorRuntime is not defined' issue according to
// https://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import '@babel/polyfill'

describe('Place-input', () => {
  var i18n = I18nBuilder.build()
  
  var placeInputProps = {
    index: 0,
    isLast: false,
    box: true,
    model: new Place(),
    single: true,
    autofocus: false,
    supportDirections: true,
    supportDirectRouting: false,
    supportSearch: true,
    pickPlaceSupported: false,
    directionsButtonTooltip: true,
    directionsButtonTooltipPosition: 'right',
    idPostfix: '',
    height: 30,
    mb: 0,
    disabled: false
  } 

  it('should render place-input component with `startingPlace`', async (done) => {
    await new AppLoader().fetchApiInitialData()
    let placeInputParams = Utils.merge(placeInputProps, {single: false, model: new Place(10,14)})
    const wrapper = await render(PlaceInput, {propsData: placeInputParams, i18n: i18n, store: store })
    expect(wrapper.text()).toContain(i18n.messages[i18n.locale].placeInput.startingPlace)
    done()
  })

  it('should show suggestions when a place name is inputted', async (done) => {
    placeInputProps.isLast = false
    await new AppLoader().fetchApiInitialData()
    const wrapper = mount(PlaceInput, {propsData: placeInputProps, i18n: i18n, store: store })   
    
    expect(wrapper.contains('.place-input')).toBe(true)
    expect(wrapper.findComponent(PlaceInput).exists()).toBe(true)

    const textInput = wrapper.find('input[type="text"]')    
    await textInput.setValue('heidelberg')
    await textInput.trigger('keyup')

    await new Promise(resolve => setTimeout(resolve, 5000))
    expect(wrapper.findAll('.place-suggestion').length).toBeGreaterThan(2)
    expect(wrapper.vm.localModel.suggestions.length).toBeGreaterThan(2)
    expect(wrapper.vm.placeSuggestions.length).toBeGreaterThan(2)
    done()
  })

  it('should show suggestions when coordinates are inputted', async (done) => {
    placeInputProps.isLast = false
    await new AppLoader().fetchApiInitialData()
    const wrapper = mount(PlaceInput, {propsData: placeInputProps, i18n: i18n, store: store })   
    
    expect(wrapper.contains('.place-input')).toBe(true)
    expect(wrapper.findComponent(PlaceInput).exists()).toBe(true)

    const textInput = wrapper.find('input[type="text"]')    
    await textInput.setValue('-37.97321319580079,-12.489208068615273')
    await textInput.trigger('keyup')

    await new Promise(resolve => setTimeout(resolve, 4000))
    expect(wrapper.findAll('.place-suggestion').length).toBeGreaterThan(2)
    let rawCoordinates = wrapper.findAll('.place-suggestion').wrappers[0].find('.raw-coord .v-list__tile__title button strong')
    expect(rawCoordinates.element.innerText).toBe('-37.97321319580079,-12.489208068615273')
    expect(wrapper.vm.localModel.suggestions.length).toBeGreaterThan(2)
    expect(wrapper.vm.placeSuggestions.length).toBeGreaterThan(2)

    await wrapper.findAll('.switch-coords').trigger('click')
    await new Promise(resolve => setTimeout(resolve, 3000))
    rawCoordinates = wrapper.findAll('.place-suggestion').wrappers[0].find('.raw-coord .v-list__tile__title button strong')
    expect(rawCoordinates.element.innerText).toBe('-12.489208068615273,-37.97321319580079')  
    expect(wrapper.emitted().autocompleted).toBeTruthy() 
    let suggestions = wrapper.findAll('.place-suggestion')
    expect(suggestions.length).toBe(2)   
    done()
  })  

  it('should not show suggestions when no text is inputted', async (done) => {
    placeInputProps.isLast = false
    await new AppLoader().fetchApiInitialData()
    const wrapper = mount(PlaceInput, {propsData: placeInputProps, i18n: i18n, store: store })   
    
    expect(wrapper.contains('.place-input')).toBe(true)
    expect(wrapper.findComponent(PlaceInput).exists()).toBe(true)

    const textInput = wrapper.find('input[type="text"]')    
    await textInput.setValue('')
    await wrapper.trigger('keydown.enter')

    await new Promise(resolve => setTimeout(resolve, 5000))
    expect(wrapper.findAll('.place-suggestion').length).toBe(0)    
    done()
  }) 

  it('should switch to search mode on search action', async (done) => {
    placeInputProps.isLast = false
    placeInputProps.supportSearch = true
    await new AppLoader().fetchApiInitialData()
    const wrapper = mount(PlaceInput, {propsData: placeInputProps, i18n: i18n, store: store })   
    
    expect(wrapper.contains('.place-input')).toBe(true)
    expect(wrapper.findComponent(PlaceInput).exists()).toBe(true)

    const textInput = wrapper.find('input[type="text"]')    
    await textInput.setValue('heidelberg') 
    await wrapper.findAll('.place-input .search').trigger('click')

    wrapper.vm.$nextTick()
    expect(wrapper.findAll('.place-suggestion').length).toBe(0)       
    expect(wrapper.emitted().switchedToSearchMode).toBeTruthy() 
    done()
  }) 
})
