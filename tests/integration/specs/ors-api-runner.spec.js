import { Directions, Isochrones, PlacesSearch, ReverseGeocode, Pois } from '@/support/ors-api-runner'
import Place from '@/models/place'
import mockupPlaces from '../mockups/places.js'
import constants from '@/resources/constants'
import AppLoader from '@/app-loader'
import store from '@/store/store'
import lodash from 'lodash'

describe('OrsApiRunner test', () => {
  it('fetch API data', async () => {
    await new AppLoader().fetchApiInitialData()
    expect(store.getters.mapSettings.apiKey).toBeDefined()
  })
  it('should fetch API data and calculate a route', async () => {
    await new AppLoader().fetchApiInitialData()
    expect(store.getters.mapSettings.apiKey).toBeDefined()
    let places = [mockupPlaces.FromToDirectionsPlaces.from, mockupPlaces.FromToDirectionsPlaces.to]
    store.commit('mode', constants.modes.directions)

    return new Promise((resolve, reject) => {
      Directions(places).then(response => {
        expect(response.content.features.length).toEqual(1)
        expect(response.content.features[0].geometry.type).toEqual('LineString')
        resolve()
      }).catch(result => {
        let error =lodash.get(result, 'response.response.body.error') || result.response
        console.log(error)
        reject(error)
      })
    })
  })

  it('should fetch API data and calculate isochrone', async () => {
    await new AppLoader().fetchApiInitialData()
    expect(store.getters.mapSettings.apiKey).toBeDefined()
    let places = [mockupPlaces.isochroneSinglePlace]
    store.commit('mode', constants.modes.isochrones)

    return new Promise((resolve, reject) => {
      Isochrones(places).then(response => {
        expect(response.content.features.length).toEqual(1)
        expect(response.content.features[0].geometry.type).toEqual('Polygon')
        resolve()
      }).catch(result => {
        let error = lodash.get(result, 'response.response.body.error') || result.response
        console.log(error)
        reject(error)
      })
    })
  })

  it('should fetch API data and find places', async () => {
    await new AppLoader().fetchApiInitialData()
    expect(store.getters.mapSettings.apiKey).toBeDefined()

    return new Promise((resolve, reject) => {
      PlacesSearch('Heidelberg').then(places => {
        expect(places.length).toBeGreaterThan(10)
        expect(places[0]).toBeInstanceOf(Place)
        resolve()
      }).catch(result => {
        let error = lodash.get(result, 'response.response.error.stack') || result.response.text
        reject(error)
      })
    })
  })

  it('should fetch API data and reverse geocode', async () => {
    await new AppLoader().fetchApiInitialData()
    expect(store.getters.mapSettings.apiKey).toBeDefined()

    return new Promise((resolve, reject) => {
      ReverseGeocode(41.060067961642716, -8.543758392333986).then(places => {
        expect(places.length).toBeGreaterThan(9)
        expect(places[0]).toBeInstanceOf(Place)
        resolve()
      }).catch(result => {
        let error = lodash.get(result, 'response.response.body.error') || result.response
        reject(error)
      })
    })
  })

  it('should fetch API data and get pois', async () => {
    await new AppLoader().fetchApiInitialData()
    expect(store.getters.mapSettings.apiKey).toBeDefined()

    return new Promise((resolve, reject) => {
      Pois({category_group_ids: [420]}).then(response => {
        expect(response.features.length).toBeGreaterThan(0)
        resolve()
      }).catch(result => {
        let error = lodash.get(result, 'response.response.body.error') || result.response
        reject(error)
      })
    })
  })
})
