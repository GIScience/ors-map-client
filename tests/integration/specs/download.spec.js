import Download from '@/fragments/forms/map-form/components/download/Download'
import mapViewDataTemplates from '../mockups/map-view-data.js'
import I18nBuilder from '@/i18n/i18n-builder'
import { mount } from '@vue/test-utils'
import AppLoader from '@/app-loader'
import store from '@/store/store'

// importing files
import orsRouteGeojson from '../mockups/ors-route.geojson'


// Solves the 'RegeneratorRuntime is not defined' issue according to
// https://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import '@babel/polyfill'

describe('Download route', () => {

  let exporterDefaultProps = {
    mapViewData: mapViewDataTemplates.route,
    downloadFormatsSupported: ['json', 'ors-gpx', 'geojson', 'to-gpx', 'gpx', 'kml']
  }
  it('should export json route', async () => {
    await new AppLoader().fetchApiInitialData()
    const wrapper = mount(Download, {propsData: exporterDefaultProps, i18n: I18nBuilder.build(), store: store })

    expect(wrapper.contains('.download-container')).toBe(true)
    expect(wrapper.findComponent(Download).exists()).toBe(true)

    await wrapper.find('.open-download-btn').trigger('click')
    await new Promise(resolve => setTimeout(resolve, 2000))
    let downloadModal = document.querySelector('.download-modal')
    expect(downloadModal).toBeTruthy()
    await wrapper.findAll('.download-format').trigger('click')
    await wrapper.findAll('.download-format a').wrappers[0].trigger('click')
    wrapper.vm.downloadFormat = 'json'
    expect(wrapper.vm.downloadFormat).toBe('json')
    await wrapper.find('.download').trigger('click')    
    await new Promise(resolve => setTimeout(resolve, 2000))
    expect(document.querySelector('.download-modal') ).toBeNull() 
  })

  it('should export gpx route', async () => {
    await new AppLoader().fetchApiInitialData()
    const wrapper = mount(Download, {propsData: exporterDefaultProps, i18n: I18nBuilder.build(), store: store })

    await wrapper.find('.open-download-btn').trigger('click')
    await new Promise(resolve => setTimeout(resolve, 2000))
    await wrapper.find('.download-format').trigger('click')
    wrapper.vm.downloadFormat = 'to-gpx'
    await wrapper.find('.download').trigger('click')    
    await new Promise(resolve => setTimeout(resolve, 2000))
    expect(document.querySelector('.download-modal') ).toBeNull() 
  })

  it('should export geojson route', async () => {
    await new AppLoader().fetchApiInitialData()
    const wrapper = mount(Download, {propsData: exporterDefaultProps, i18n: I18nBuilder.build(), store: store })

    await wrapper.find('.open-download-btn').trigger('click')
    await new Promise(resolve => setTimeout(resolve, 2000))
    await wrapper.find('.download-format').trigger('click')
    wrapper.vm.downloadFormat = 'geojson'
    await wrapper.find('.download').trigger('click')    
    await new Promise(resolve => setTimeout(resolve, 2000))
    expect(document.querySelector('.download-modal') ).toBeNull() 
  })

  it('should export kml route', async () => {
    await new AppLoader().fetchApiInitialData()
    const wrapper = mount(Download, {propsData: exporterDefaultProps, i18n: I18nBuilder.build(), store: store })

    await wrapper.find('.open-download-btn').trigger('click')
    await new Promise(resolve => setTimeout(resolve, 2000))
    await wrapper.find('.download-format').trigger('click')
    wrapper.vm.downloadFormat = 'kml'
    await wrapper.find('.download').trigger('click')    
    await new Promise(resolve => setTimeout(resolve, 2000))
    expect(document.querySelector('.download-modal') ).toBeNull() 
  })

  it('should export ors-gpx route', async () => {
    await new AppLoader().fetchApiInitialData()
    const wrapper = mount(Download, {propsData: exporterDefaultProps, i18n: I18nBuilder.build(), store: store })

    await wrapper.find('.open-download-btn').trigger('click')
    await new Promise(resolve => setTimeout(resolve, 2000))
    await wrapper.find('.download-format').trigger('click')
    wrapper.vm.downloadFormat = 'ors-gpx'
    await wrapper.find('.download').trigger('click')    
    await new Promise(resolve => setTimeout(resolve, 2000))
    expect(document.querySelector('.download-modal') ).toBeNull() 
  })
})
