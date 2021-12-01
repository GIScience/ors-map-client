import { mount } from '@vue/test-utils'
import RouteImporter from '@/fragments/forms/route-importer/RouteImporter.vue'
import I18nBuilder from '@/i18n/i18n-builder'
import AppLoader from '@/app-loader'
import store from '@/store/store'
import orsRouteGeojson from '../mockups/ors-route.geojson'
import orsRouteJson from '../mockups/ors-route.json'
import orsRouteGpx from '../mockups/ors-route.gpx'
import orsRouteKml from '../mockups/ors-route.kml'


// Solves the 'RegeneratorRuntime is not defined' issue according to
// https://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import '@babel/polyfill'

describe('Route-importer', () => {
  it('should import geojson route', async (done) => {
    await new AppLoader().fetchApiInitialData()
    const wrapper = mount(RouteImporter, {i18n: I18nBuilder.build(), store: store })

    expect(wrapper.contains('.route-importer-container')).toBe(true)
    expect(wrapper.findComponent(RouteImporter).exists()).toBe(true)

    await wrapper.find('.route-importer-btn button').trigger('click')
    await new Promise((resolve) => { setTimeout(() => { resolve(true)}, 2000)})

    let importerModal = document.querySelector('.route-importer-modal')
    expect(importerModal).toBeDefined()
    expect(importerModal).not.toBeNull()
    
    const dataTransfer = new DataTransfer()
    const aFileParts = [orsRouteGeojson]
    dataTransfer.items.add(new File([new Blob(aFileParts, { type: 'application/geo+json' })], 'ors-route.geojson'))    

    let dropzone = document.querySelector('#dropzone')
    expect(dropzone).toBeDefined()
    expect(dropzone).not.toBeNull()
    dropzone.dispatchEvent(new DragEvent('drop', {dataTransfer: dataTransfer}))
    
    wrapper.vm.$on('contentUploaded', async (content) => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      importerModal = document.querySelector('.route-importer-modal') 
      expect(importerModal).toBeNull()
      console.log(content)
      done()
    })   
  })

  it('should import json route', async (done) => {
    await new AppLoader().fetchApiInitialData()
    const wrapper = mount(RouteImporter, {i18n: I18nBuilder.build(), store: store })

    expect(wrapper.contains('.route-importer-container')).toBe(true)
    expect(wrapper.findComponent(RouteImporter).exists()).toBe(true)

    await wrapper.find('.route-importer-btn button').trigger('click')
    await new Promise((resolve) => { setTimeout(() => { resolve(true)}, 2000)})

    let importerModal = document.querySelector('.route-importer-modal')
    expect(importerModal).toBeDefined()
    expect(importerModal).not.toBeNull()
    
    const dataTransfer = new DataTransfer()
    const aFileParts = [JSON.stringify(orsRouteJson)]
    dataTransfer.items.add(new File([new Blob(aFileParts, { type: 'application/json' })], 'ors-route.json'))    

    let dropzone = document.querySelector('#dropzone')
    expect(dropzone).toBeDefined()
    expect(dropzone).not.toBeNull()
    dropzone.dispatchEvent(new DragEvent('drop', {dataTransfer: dataTransfer}))
    
    wrapper.vm.$on('contentUploaded', async (content) => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      importerModal = document.querySelector('.route-importer-modal') 
      expect(importerModal).toBeNull()
      console.log(content)
      done()
    })   
  })

  it('should import gpx route', async (done) => {
    await new AppLoader().fetchApiInitialData()
    const wrapper = mount(RouteImporter, {i18n: I18nBuilder.build(), store: store })

    expect(wrapper.contains('.route-importer-container')).toBe(true)
    expect(wrapper.findComponent(RouteImporter).exists()).toBe(true)

    await wrapper.find('.route-importer-btn button').trigger('click')
    await new Promise((resolve) => { setTimeout(() => { resolve(true)}, 2000)})

    let importerModal = document.querySelector('.route-importer-modal')
    expect(importerModal).toBeDefined()
    expect(importerModal).not.toBeNull()
    
    const dataTransfer = new DataTransfer()
    const aFileParts = [orsRouteGpx]
    dataTransfer.items.add(new File([new Blob(aFileParts, { type: 'application/gpx+xml' })], 'ors-route.gpx'))    

    let dropzone = document.querySelector('#dropzone')
    expect(dropzone).toBeDefined()
    expect(dropzone).not.toBeNull()
    dropzone.dispatchEvent(new DragEvent('drop', {dataTransfer: dataTransfer}))
    
    wrapper.vm.$on('contentUploaded', async (content) => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      importerModal = document.querySelector('.route-importer-modal') 
      expect(importerModal).toBeNull()
      console.log(content)
      done()
    })   
  })

  it('should import gpx route', async (done) => {
    await new AppLoader().fetchApiInitialData()
    const wrapper = mount(RouteImporter, {i18n: I18nBuilder.build(), store: store })

    expect(wrapper.contains('.route-importer-container')).toBe(true)
    expect(wrapper.findComponent(RouteImporter).exists()).toBe(true)

    await wrapper.find('.route-importer-btn button').trigger('click')
    await new Promise((resolve) => { setTimeout(() => { resolve(true)}, 2000)})

    let importerModal = document.querySelector('.route-importer-modal')
    expect(importerModal).toBeDefined()
    expect(importerModal).not.toBeNull()
    
    const dataTransfer = new DataTransfer()
    const aFileParts = [orsRouteKml]
    dataTransfer.items.add(new File([new Blob(aFileParts, { type: 'application/vnd.google-earth.kml+xml' })], 'ors-route.kml'))    

    let dropzone = document.querySelector('#dropzone')
    expect(dropzone).toBeDefined()
    expect(dropzone).not.toBeNull()
    dropzone.dispatchEvent(new DragEvent('drop', {dataTransfer: dataTransfer}))
    
    wrapper.vm.$on('contentUploaded', async () => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      importerModal = document.querySelector('.route-importer-modal') 
      expect(importerModal).toBeNull()
      done()
    })   
  })
})
