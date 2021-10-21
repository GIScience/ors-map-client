import PlaceInput from '@/fragments/forms/place-input/PlaceInput.vue'
import { render } from '@vue/server-test-utils'
import I18nBuilder from '@/i18n/i18n-builder'
import Place from '@/models/place'
import AppLoader from '@/app-loader'
import store from '@/store/store'

// Solve the 'RegeneratorRuntime is not defined' issue according
// https://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
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

    const wrapper = await render(PlaceInput, {propsData: props, i18n: i18n, store: store })
    expect(wrapper.text()).toContain('Destination')
    done()
  })
})
