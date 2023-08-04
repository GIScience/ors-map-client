import GeoUtils from '../geo-utils'

const longLatCoordinates = [
  [ 8.609088, 49.469343, 106 ],
  [ 8.609031, 49.469324, 105 ],
  [ 8.608745, 49.469206, 104.5 ],
  [ 8.608382, 49.469103, 104.6 ],
  [ 8.607994, 49.469053, 104.7 ]
]
const latLongCoordinates = [
  [ 49.469343, 8.609088, 106 ],
  [ 49.469324, 8.609031, 105 ],
  [ 49.469206, 8.608745, 104.5 ],
  [ 49.469103, 8.608382, 104.6 ],
  [ 49.469053, 8.607994, 104.7 ]
]

describe('GeoUtils test', () => {
  it('should switch coordinates in an matrix of coordinates', (done) => {
    let result = GeoUtils.switchLatLonIndex(longLatCoordinates)
    expect(JSON.stringify(result)).to.equal(JSON.stringify(latLongCoordinates))
    done()
  })

  it('should build a lat-lng object', (done) => {
    let result = GeoUtils.buildLatLong(49.46092806407386, 8.591051101684572)
    expect(result.lng).to.equal(8.591051101684572)
    expect(result.lat).to.equal(49.46092806407386)
    done()
  })

  it('should normalize lat-lng object', (done) => {
    let latLng = {lat:549.46092806407386, lng: 185.591051101684572}
    GeoUtils.normalizeCoordinates(latLng)
    expect(latLng.lng).to.equal(-174.40894889831543)
    expect(latLng.lat).to.equal(-170.53907193592613)
    done()
  })

  it('should not change already normalized lat-lng object ', (done) => {
    let latLng = {lat:49.46092806407387, lng: 8.591051101684571}
    GeoUtils.normalizeCoordinates(latLng)
    expect(latLng.lng).to.equal(8.591051101684571)
    expect(latLng.lat).to.equal(49.46092806407387)
    done()
  })
})
