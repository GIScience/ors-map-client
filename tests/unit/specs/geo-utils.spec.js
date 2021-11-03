import GeoUtils from '@/support/geo-utils'
import mockupGeoUtils from '../mockups/geo-utils.js'

// Solves the 'RegeneratorRuntime is not defined' issue according to
// https://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import '@babel/polyfill'

describe('GeoUtils test', () => {
  it('should switch coordinates in an matrix of coordinates', (done) => {
    let result = GeoUtils.switchLatLonIndex(mockupGeoUtils.longLatCoordinates)
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockupGeoUtils.latLongCoordinates))
    done()
  }) 
  
  it('should build a latlng object', (done) => {
    let result = GeoUtils.buildLatLong(49.46092806407386, 8.591051101684572)
    expect(result.lng).toEqual(8.591051101684572)
    expect(result.lat).toEqual(49.46092806407386)
    done()
  }) 

  it('should normalize latlng object', (done) => {
    let latlng = {lat:549.46092806407386, lng: 185.591051101684572}
    GeoUtils.normalizeCoordinates(latlng)
    expect(latlng.lng).toEqual(-174.40894889831543)
    expect(latlng.lat).toEqual(-170.53907193592613)
    done()
  }) 
  
  it('should not change already normalized latlng object ', (done) => {
    let latlng = {lat:49.46092806407387, lng: 8.591051101684571}
    GeoUtils.normalizeCoordinates(latlng)
    expect(latlng.lng).toEqual(8.591051101684571)
    expect(latlng.lat).toEqual(49.46092806407387)
    done()
  }) 
})
