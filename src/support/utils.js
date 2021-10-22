import tinyColor2 from 'tinycolor2'
import lzString from 'lz-string'
import lodash from 'lodash'

const Utils = {

  /**
   * Get a text color that has a good reading contrast
   * for a given background color
   * @param {*} backgroundColor 
   * @returns 
   */
  contrastingTextColor (backgroundColor) {
    const textColor = tinyColor2(backgroundColor).isLight() ? 'black' : 'white'
    return textColor
  },

  /**
   * Blur the active element in order to close
   * the mobile virtual keyboard if it is open
   */
  hideMobileKeyboard () {
    if (Utils.isMobile() && document.activeElement) {
      document.activeElement.blur()
    }
  },
 
  /**
   * Compare two objects and get the diffs
   * @param {*} a 
   * @param {*} b 
   * @returns {Object}
   */
  getObjectsDiff(a, b) {
    a = a || {}
    b = b || {}
    var result = { different: [], missing_from_first: [], missing_from_second: [] }
  
    lodash.reduce(a, function (result, value, key) {
      if ( Object.prototype.hasOwnProperty.call(b, key)) {
        if (lodash.isEqual(value, b[key])) {
          return result
        } else {
          if (typeof (a[key]) != typeof ({}) || typeof (b[key]) != typeof ({})) {
            //dead end.
            result.different.push(key)
            return result
          } else {
            var deeper = Utils.getObjectsDiff(a[key], b[key])
            result.different = result.different.concat(lodash.map(deeper.different, (sub_path) => {
              return key + '.' + sub_path
            }))
  
            result.missing_from_second = result.missing_from_second.concat(lodash.map(deeper.missing_from_second, (sub_path) => {
              return key + '.' + sub_path
            }))
  
            result.missing_from_first = result.missing_from_first.concat(lodash.map(deeper.missing_from_first, (sub_path) => {
              return key + '.' + sub_path
            }))
            return result
          }
        }
      } else {
        result.missing_from_second.push(key)
        return result
      }
    }, result)
  
    lodash.reduce(b, function (result, value, key) {
      if (Object.prototype.hasOwnProperty.call(a, key)) {
        return result
      } else {
        result.missing_from_first.push(key)
        return result
      }
    }, result)
  
    return result
  },
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
   * Get child elements of a given element
   * @param {*} el 
   * @param {*} childElType 
   * @returns 
   */
  getChildElements (el, childElType) {
    var results = []
    var search = function search (children) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0

      for (var index = 0; index < children.length; index++) {
        var child = children[index]
        if (child.localName === childElType) {
          results.push(child)
        } else {
          search(child.children, depth + 1)
        }
      }
      if (depth === 0) return results
    }

    return search(el.children)
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
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue
      if (typeof obj[key] === 'object') {
        const prop = clone[key]
        if (prop !== undefined) {
          clone[key] = Utils.clone(obj[key], prop)
        } else {
          clone[key] = Utils.clone(obj[key], null)
        }
      } else {
        clone[key] = obj[key]
      }
    }
    return clone
  },

  merge (original, changes) {
    let clone = Utils.clone(original)
    let merged = {...clone, ...changes}
    return merged
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
export default Utils
