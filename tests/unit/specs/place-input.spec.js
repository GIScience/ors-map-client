import { mount } from '@vue/test-utils'
import PlaceInput from '@/fragments/forms/place-input/PlaceInput.vue'
import I18nBuilder from '@/i18n/i18n-builder'
import Place from '@/models/place'
import AppLoader from '@/app-loader'
import store from '@/store/store'
import { VTextField } from 'vuetify'
import '@babel/polyfill'

describe('Place-input', () => {
  it('should render place-input component', async (done) => {
    await new AppLoader().fetchApiInitialData()
    let props = {
      index: 0,
      isLast: true,
      box: true,
      model: new Place(),
      single: true,
      autofocus: true,
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
      
    let i18n = I18nBuilder.build()

    // const wrapper = await render(PlaceInput, {propsData: props, i18n: i18n, store: store })
    const wrapper = mount(PlaceInput, {propsData: props, i18n: i18n, store: store })   
    expect(wrapper.contains('.place-input')).toBe(true)

    const textInput = wrapper.find('input[type="text"]')
    const textField = wrapper.findComponent(VTextField) // => finds Bar by component instance
    expect(textField.exists()).toBe(true)
    await textInput.setValue('heidelberg')
    setTimeout(() => {
      let suggestions = wrapper.findAll('.place-suggestion')
      expect(suggestions.length).toBeGreaterThan(2)
      let placeInput = wrapper.find('.place-input-component')
      expect(placeInput.vm.placeSuggestions).toBeGreaterThan(2)
      done()
    }, 200)
  })
})
