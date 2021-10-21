import { mount } from '@vue/test-utils'
import { render } from '@vue/server-test-utils'
import PlaceInput from '@/fragments/forms/place-input/PlaceInput.vue'
import I18nBuilder from '@/i18n/i18n-builder'
import Place from '@/models/place'
import AppLoader from '@/app-loader'
import store from '@/store/store'

// Solve the 'RegeneratorRuntime is not defined' issue according to
// https://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import '@babel/polyfill'

describe('Place-input', () => {
  var i18n = I18nBuilder.build()
  
  var placeInputProps = {
    index: 0,
    isLast: true,
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

  it('should render place-input component', async (done) => {
    await new AppLoader().fetchApiInitialData()
    const wrapper = await render(PlaceInput, {propsData: placeInputProps, i18n: i18n, store: store })
    expect(wrapper.text()).toContain('Destination')
    done()
  })

  it('should show suggestions when a place name is inputted', async (done) => {
    await new AppLoader().fetchApiInitialData()
    const wrapper = mount(PlaceInput, {propsData: placeInputProps, i18n: i18n, store: store })   
    
    expect(wrapper.contains('.place-input')).toBe(true)
    expect(wrapper.findComponent(PlaceInput).exists()).toBe(true)

    const textInput = wrapper.find('input[type="text"]')    
    await textInput.setValue('heidelberg')
    await textInput.trigger('keyup')

    // When the input has completed the autocomplete task
    wrapper.vm.$on('autocompleted', () => {
      // Wait a bit so that suggestions are rendered
      setTimeout(() => {
        expect(wrapper.findAll('.place-suggestion').length).toBeGreaterThan(2)
        expect(wrapper.vm.localModel.suggestions.length).toBeGreaterThan(2)
        expect(wrapper.vm.placeSuggestions.length).toBeGreaterThan(2)
        done()        
      }, 200)
    })
  })
})
