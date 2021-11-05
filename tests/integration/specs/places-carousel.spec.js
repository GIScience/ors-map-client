import PlacesCarousel from '@/fragments/places-carousel/PlacesCarousel'
import mapViewDataTemplates from '../mockups/map-view-data.js'
import I18nBuilder from '@/i18n/i18n-builder'
import { mount } from '@vue/test-utils'
import store from '@/store/store'

describe('PlacesCarousel', () => {
  var i18n = I18nBuilder.build()
   
  it('should render PlacesCarousel with place results', (done) => {    
    const wrapper = mount(PlacesCarousel, {propsData: {mapViewData: mapViewDataTemplates.placeSearchResults, activeIndex: 0}, i18n: i18n, store: store })

    let carouselList = wrapper.vm.$el.querySelector('.carousel .vue-horizontal-list')
    expect(carouselList).toBeDefined()
    expect(carouselList).not.toBeNull()

    wrapper.vm.$nextTick(() => { 
      setTimeout(() => {
        let placeItems = wrapper.vm.$el.querySelectorAll('.vhl-list .vhl-item')
        expect(placeItems.length).toBe(40) 

        let firstItemActive = placeItems[0].querySelector('.item.active')
        expect(firstItemActive).toBeDefined()
        expect(firstItemActive).not.toBeNull()
        done()
      }, 200)
    })
    
  })
})
