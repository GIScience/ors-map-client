import MapViewDataBuilder from '@/support/map-data-services/map-view-data-builder'
import OrsFilterUtil from '@/support/map-data-services/ors-filter-util'
import { Directions, Isochrones } from '@/support/ors-api-runner'
import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
import Place from '@/models/place'
import AppLoader from '@/app-loader'
import store from '@/store/store'

describe('OrsApiRunner test', () => {
  it('fetch API data and calculate a route', (done) => {
    new AppLoader().fetchApiInitialData().then(() => {
      expect(store.getters.mapSettings.apiKey).toBeDefined() 

      let placeFrom = new Place(7.888183593750001, 51.467696956223385, 'Schwarzer Weg, Arnsberg,NW,Germany')
      let placeTo = new Place(7.830505371093751, 51.66659318427356, 'Fritz-Reuter-Straße 9, Hamm,NW,Germany')
      let places = [placeFrom, placeTo]
      OrsFilterUtil.setFilterValue(constants.profileFilterName, store.getters.mapSettings.defaultProfile)

      Directions(places).then(response => {
        expect(response.content.features.length).toEqual(1)
        expect(response.content.features[0].geometry.type).toEqual('LineString')      
        MapViewDataBuilder.buildMapData(response.content, places).then((mapViewData) => {
          expect(mapViewData).toBeDefined()
          expect(mapViewData).toBeInstanceOf(MapViewData)
          done()
        })
      }).catch(result => {
        console.log(result)
        done()
      })      
    }).catch(result => {
      console.log(result)
      done()
    }) 
  })

  it('fetch API data and calculate isochrone', (done) => {
    new AppLoader().fetchApiInitialData().then(() => {
      expect(store.getters.mapSettings.apiKey).toBeDefined() 

      let placeFrom = new Place(7.888183593750001, 51.467696956223385, 'Schwarzer Weg, Arnsberg,NW,Germany')
      let placeTo = new Place(7.830505371093751, 51.66659318427356, 'Fritz-Reuter-Straße 9, Hamm,NW,Germany')
      let places = [placeFrom, placeTo]
      OrsFilterUtil.setFilterValue(constants.profileFilterName, store.getters.mapSettings.defaultProfile)

      Isochrones(places).then(response => {
        expect(response.content.features.length).toEqual(1)
        expect(response.content.features[0].geometry.type).toEqual('LineString')      
        MapViewDataBuilder.buildMapData(response.content, places).then((mapViewData) => {
          expect(mapViewData).toBeDefined()
          expect(mapViewData).toBeInstanceOf(MapViewData)
          done()
        })
      }).catch(result => {
        console.log(result)
        done()
      })      
    }).catch(result => {
      console.log(result)
      done()
    }) 
  })
})
