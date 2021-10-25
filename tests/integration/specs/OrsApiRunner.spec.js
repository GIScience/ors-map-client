import { Directions, Isochrones, PlacesSearch, ReverseGeocode } from '@/support/ors-api-runner'
import mockupPlaces from '../mockups/places.js'
import constants from '@/resources/constants'
import AppLoader from '@/app-loader'
import store from '@/store/store'
import lodash from 'lodash'

describe('OrsApiRunner test', () => {
  it('fetch API data', async (done) => {
    await new AppLoader().fetchApiInitialData()
    expect(store.getters.mapSettings.apiKey).toBeDefined() 
    done()
  })
  it('should fetch API data and calculate a route', async (done) => {
    await new AppLoader().fetchApiInitialData()
    expect(store.getters.mapSettings.apiKey).toBeDefined() 
    let places = [mockupPlaces.FromToDirectionsPlaces.from, mockupPlaces.FromToDirectionsPlaces.to]
    store.commit('mode', constants.modes.directions)

    Directions(places).then(response => {
      expect(response.content.features.length).toEqual(1)
      expect(response.content.features[0].geometry.type).toEqual('LineString')      
      done()
    }).catch(result => {
      let error =lodash.get(result, 'response.response.body.error') || result.response
      done.fail(error)
    })
  })

  it('should fetch API data and calculate isochrone', async (done) => {
    await new AppLoader().fetchApiInitialData()
    expect(store.getters.mapSettings.apiKey).toBeDefined() 
    let places = [mockupPlaces.isochroneSinglePlace]
    store.commit('mode', constants.modes.isochrones)

    Isochrones(places).then(response => {
      expect(response.content.features.length).toEqual(1)
      expect(response.content.features[0].geometry.type).toEqual('Polygon')      
      done()
    }).catch(result => {
      let error = lodash.get(result, 'response.response.body.error') || result.response
      done.fail(error)
    })
  })

  it('should fetch API data and find places', async (done) => {
    await new AppLoader().fetchApiInitialData()
    expect(store.getters.mapSettings.apiKey).toBeDefined() 
    store.commit('mode', constants.modes.place)      

    PlacesSearch('Heidelberg').then(places => {
      expect(places.length).toBeGreaterThan(10)   
      done()
    }).catch(result => {
      let error = lodash.get(result, 'response.response.body.error') || result.response || result
      done.fail(error)
    })
  })

  it('should fetch API data and reverse geocode', async (done) => {
    await new AppLoader().fetchApiInitialData()
    expect(store.getters.mapSettings.apiKey).toBeDefined() 
    store.commit('mode', constants.modes.place)      

    ReverseGeocode(41.060067961642716, -8.543758392333986).then(places => {
      expect(places.length).toBeGreaterThan(9)   
      done()
    }).catch(result => {
      let error = lodash.get(result, 'response.response.body.error') || result.response
      done.fail(error)
    })
  })  
})
