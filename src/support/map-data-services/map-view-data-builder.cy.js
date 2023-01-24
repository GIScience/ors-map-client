import buildMapData from 'fixtures/build-map-data'
import MapViewDataBuilder from './map-view-data-builder'
import MapViewData from '@/models/map-view-data'


describe('MapViewData building', () => {
  context('buildMapViewData()', () => {
    it('builds with directions map data', () => {
      return new Promise((resolve, reject) => {
        MapViewDataBuilder.buildMapData(buildMapData.directionsMapData, []).then(
          response => {
            assert.isDefined(response)
            expect(response).to.be.instanceOf(MapViewData)
            expect(response.routes).to.have.length(1)
            expect(response.places).to.have.length(2)
            expect(response.mode).to.equal('directions')
            resolve()
          }).catch(error => {
          reject(error)
        })
      })
    })
    it('builds with isochrones map data', () => {
      return new Promise((resolve, reject) => {
        MapViewDataBuilder.buildMapData(buildMapData.isochronesMapData, []).then(
          response => {
            assert.isDefined(response)
            expect(response).to.be.instanceOf(MapViewData)
            expect(response.polygons).to.have.length(1)
            expect(response.places).to.have.length(1)
            expect(response.mode).to.equal('isochrones')
            resolve()
          }).catch(error => {
          reject(error)
        })
      })
    })
  })
  context.skip('getSourceType()', () => {
    it.skip('gets the source type', () => {
      //  TODO
    })
  })
  context.skip('setMapExtractorBuilder()', () => {
    it.skip('sets the map data builder', () => {
      //  TODO
    })
  })
  context.skip('buildMapData()', () => {
    it.skip('builds the map data', () => {
      //  TODO
    })
  })
})
