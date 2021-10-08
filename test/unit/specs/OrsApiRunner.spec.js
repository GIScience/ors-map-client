import { Directions, Isochrones } from '@/support/ors-api-runner'
import mockupPlaces from '../mockups/places.js'
import constants from '@/resources/constants'
import Place from '@/models/place'
import AppLoader from '@/app-loader'
import store from '@/store/store'
import lodash from 'lodash'

describe('OrsApiRunner test', () => {
  it('fetch API data and calculate a route', (done) => {
    new AppLoader().fetchApiInitialData().then(() => {
      expect(store.getters.mapSettings.apiKey).toBeDefined() 
      let places = [mockupPlaces.FromToDirectionsPlaces.from, mockupPlaces.FromToDirectionsPlaces.to]
      store.commit('mode', constants.modes.directions)

      Directions(places).then(response => {
        expect(response.content.features.length).toEqual(1)
        expect(response.content.features[0].geometry.type).toEqual('LineString')      
        done()
      }).catch(result => {
        const error = lodash.get(result, 'response.response.body.error') || result.response
        done.fail(error)
      })      
    }).catch(result => {
      done.fail(result)
    }) 
  })

  it('fetch API data and calculate isochrone', (done) => {
    new AppLoader().fetchApiInitialData().then(() => {
      expect(store.getters.mapSettings.apiKey).toBeDefined() 
      let places = [mockupPlaces.isochroneSinglePlace]
      store.commit('mode', constants.modes.isochrones)

      Isochrones(places).then(response => {
        expect(response.content.features.length).toEqual(1)
        expect(response.content.features[0].geometry.type).toEqual('Polygon')      
        done()
      }).catch(result => {
        const error = lodash.get(result, 'response.response.body.error') || result.response
        done.fail(error)
      })      
    }).catch(result => {
      done.fail(result)
    }) 
  })
})
