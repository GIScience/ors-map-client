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

  it('should render place-input component with `find a place` label', async (done) => {
    await new AppLoader().fetchApiInitialData()
    const wrapper = await render(PlaceInput, {propsData: placeInputProps, i18n: i18n, store: store })
    expect(wrapper.text()).toContain(i18n.messages[i18n.locale].placeInput.findAPlace)
    done()
  })

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

    // When the input has completed the autocomplete task
    wrapper.vm.$on('autocompleted', async () => {
      // Wait a bit so that suggestions are rendered
      await new Promise(resolve => setTimeout(resolve, 200))
      expect(wrapper.findAll('.place-suggestion').length).toBeGreaterThan(2)
      expect(wrapper.vm.localModel.suggestions.length).toBeGreaterThan(2)
      expect(wrapper.vm.placeSuggestions.length).toBeGreaterThan(2)
      done()
    })
  })
})
