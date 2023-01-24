import {Directions, Isochrones, PlacesSearch, ReverseGeocode, Pois} from '@/support/ors-api-runner'
import Place from '@/models/place'
import mockupPlaces from 'fixtures/places'
import constants from '@/resources/constants'
import AppLoader from '@/app-loader'
import store from '@/store/store'

describe('OrsApiRunner test', () => {
  beforeEach(() => {
    new AppLoader().fetchApiInitialData()
    // TODO: test actual requests and responses instead of just checking if the response has the correct structure
    // store.commit('mapSettings', {
    //   apiKey: 'mock',
    //   apiBaseUrl: 'http://localhost:8080',
    //   endpoints: {
    //     directions: 'mock_endpoint'
    //   }
    // })
    assert.isDefined(store.getters.mapSettings.apiKey, 'apiKey exists in mapSettings')
  })
  it('fetches API data and calculate a route', () => {
    return new Promise((resolve, reject) => {
      Directions([new Place(8.34, 48.32), new Place(8.35, 48.32)]).then(response => {
        expect(response.content.features.length).to.equal(1)
        expect(response.content.features[0].geometry.type).to.equal('LineString')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  })

  it('fetches API data and calculates an isochrone', () => {
    let places = [mockupPlaces.isochroneSinglePlace]
    store.commit('mode', constants.modes.isochrones)

    return new Promise((resolve, reject) => {
      Isochrones(places).then(response => {
        expect(response.content.features.length).to.equal(1)
        expect(response.content.features[0].geometry.type).to.equal('Polygon')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  })

  it('fetches API data and finds a place', () => {
    return new Promise((resolve, reject) => {
      PlacesSearch('Heidelberg').then(places => {
        expect(places.length).to.be.greaterThan(10)
        assert.instanceOf(places[0], Place)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  })

  it('fetches API data and reverse geocodes', () => {
    return new Promise((resolve, reject) => {
      ReverseGeocode(41.060067961642716, -8.543758392333986).then(places => {
        expect(places.length).to.be.greaterThan(9)
        assert.instanceOf(places[0], Place)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  })

  it('fetches API data and gets pois', () => {
    return new Promise((resolve, reject) => {
      Pois({category_group_ids: [420]}).then(response => {
        expect(response.features.length).to.be.greaterThan(0)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  })
})
