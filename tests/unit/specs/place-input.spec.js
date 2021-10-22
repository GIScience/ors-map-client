import PlaceInput from '@/fragments/forms/place-input/PlaceInput.vue'
import { render } from '@vue/server-test-utils'
import I18nBuilder from '@/i18n/i18n-builder'
import AppLoader from '@/app-loader'
import Place from '@/models/place'
import store from '@/store/store'

// Solves the 'RegeneratorRuntime is not defined' issue according to
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
})
