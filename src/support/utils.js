import lzString from 'lz-string'

const utils = {
  /**
   * Get the GET/query url params present in the url as an key value object
   * @param {*} query
   */
  getUrlParams: (query) => {
    if (!query) {
      query = location.search
    }
    if (!query) {
      return {}
    }

    return (/^[?#]/.test(query) ? query.slice(1) : query)
      .split('&')
      .reduce((params, param) => {
        const [key, value] = param.split('=')
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : ''
        return params
      }, {})
  },

  /**
   * Get the camel case version of the string provided
   * @param {String} input
   * @returns {String}
   */
  camelCase: (input) => {
    return input.toLowerCase().replace(/_(.)/g, (match, group1) => {
      return group1.toUpperCase()
    })
  },

  /**
   * Get the slugged version of a string
   * @param {String}
   * @returns {String}
   */
  slug: (input) => {
    input = input.toLowerCase().replace(/\//g, '_')
    input = input.toLowerCase().replace(/\./g, '_')
    input = input.toLowerCase().replace(/ /g, '_')
    return input
  },

  /**
   * Generates pseudo unique id based in random values and current date time;
   * @return String -  the pseudo unique id
   */
  guid: (prefix) => {
    prefix = prefix ? `${prefix}-` : 'guid-'
    function s4 () {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    const random = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    const dateTime = new Date().getTime()
    return `${prefix}${random}-${dateTime}`
  },

  /**
   * Remove invalid characters from and string that represents and id for html markup
   */
  getValidId: (str) => {
    return str.replace(/\./g, '').replace(/}/g, '').replace(/{/g, '').replace(/\//g, '_')
  },

  /**
   * Check if a value is empty
   * @param {*} val
   * @returns boolean
   */
  isEmpty: (val) => {
    return (val === undefined || val == null || val.length <= 0)
  },

  /**
   * TRies to parse a string into a JSON object
   * @param {String} str
   * @returns {Object|false}
   */
  tryParseJson: (str) => {
    if (isNaN(str)) {
      try {
        const obj = JSON.parse(str)
        return obj
      } catch (e) {
        return false
      }
    }
    return false
  },
  /**
   * Determines if the current device is a mobile one
   * @returns {Boolean}
   */
  isMobile () {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    return isMobile
  },
  /**
   * Clone an object
   * @param {*} obj
   * @param {*} intoObj
   * @param {String} type
   * @returns{*}
   */
  clone (obj, intoObj = null, type = null) {
    type = type || Array.isArray(obj) ? 'array' : 'object'

    let clone = intoObj
    if (obj === null) {
      return null
    }
    if (!clone) {
      if (type.toLowerCase() === 'object') {
        clone = {}
      } else if (type.toLowerCase() === 'array') {
        clone = []
      }
    }
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        const prop = clone[key]
        if (prop !== undefined) {
          clone[key] = utils.clone(obj[key], prop)
        } else {
          clone[key] = utils.clone(obj[key], null)
        }
      } else {
        clone[key] = obj[key]
      }
    }
    return clone
  },

  /**
   * Compress a text to a unit 8 array
   * @param {*} txt
   */
  compressTxt (txt) {
    const compressed = lzString.compressToUint8Array(txt)
    return compressed
  },
  /**
   * Decompress a text compressed as unit 8 array
   * @param {*} data
   */
  decompressTxt (data) {
    let numericArr = []
    // Make sure that we are processing an array of numbers
    if (typeof data === 'string' && data.indexOf(',') > -1) {
      const arr = data.split(',')
      for (const key in arr) {
        numericArr.push(Number(arr[key]))
      }
    } else {
      numericArr = data
    }
    let decompressed = data
    try {
      decompressed = lzString.decompressFromUint8Array(numericArr)
    } catch (error) {
      console.log('Not decompressible data')
    }
    return decompressed
  }
}
export default utils
