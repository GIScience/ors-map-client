import Utils from '../utils'

describe('Utils rgbDecimalToHex', () => {
  it('should return normal hex colors', (done) => {
    let res_black = Utils.rgbDecimalToHex(0,0,0)
    expect(res_black).to.equal('#000000')
    let res_white = Utils.rgbDecimalToHex(255,255,255)
    expect(res_white).to.equal('#ffffff')
    done()
  })
})

describe('Utils decimalToHex', () => {
  it('should convert decimals to 2 digit hex values', (done) => {
    expect( Utils.decimalToHex(15)).to.equal('0f')
    expect( Utils.decimalToHex(0)).to.equal('00')
    expect( Utils.decimalToHex(16)).to.equal('10')
    expect( Utils.decimalToHex(255)).to.equal('ff')
    done()
  })
})
