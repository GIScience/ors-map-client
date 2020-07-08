import httpApi from '@/common/http-api'

/**
 * Model class that acts as an active record representation of the resource in a remote server
 * @param {*} value initial value
 * @param {*} endPoint relative url of the endpoint
 * @param {*} resourceName resource name
 * @param {*} options optional parameters object to customize the Model class behavior
 * - sendEmptyAttributes: tells the clean process to send resource attributes with empty values
 * - pk: defines a custom primary key attribute. the default is `id`
 * - transformRequest (function): executed before the request is made. Useful to change data in special circumstances.
 *   This function will receive an object with the endpoint and filters (when available) attributes. It is not intended to replace the axios
 *   request interceptor!
 * - transformResponse (function): executed after the request is made, passing the original response object received.
 */
class Model {
  /**
   *Creates an instance of Model.
   * @param {*} value
   * @param {*} endPoint
   * @param {*} resourceName
   * @param {*} options
   * @returns {Model}
   */
  constructor (value, endPoint, resourceName, options) {
    this.$options = options
    this.$endPoint = endPoint
    this.$name = resourceName

    // If the value is undefined, create a empty obj
    value = value || {}

    // Transform the empty Model object in a Model with values (active record)
    this.$extend(this, value)

    /**
     * Instance function and attributes that must be removed before sending to the remote server
     */
    this.$instanceKeywords = [
      '$extend', '$save', '$post', '$destroy',
      '$pending', '$update', '$copy',
      '$getName', '$strip', '$options',
      '$name', '$endPoint', '$create',
      '$clean', '$parseRequest', '$instanceKeywords'
    ]
  }

  /**
   * Get the model nice name
   *
   * @memberof Model
   */
  $getName = () => {
    return this.$name
  }

  /**
   * Extends a resource object based in a value object
   * @param {*} instance
   * @param {*} value
   */
  $extend (instance, value) {
    if (typeof value === 'object') {
      for (var key in value) {
        // Check also if property is not inherited from prototype
        if (value.hasOwnProperty(key)) {
          instance[key] = value[key]
        }
      }
    }
  }

  /**
   * Extends a resource object based in a value object
   * @param {*} instance
   * @param {*} value
   */
  $copy = () => {
    let copied = {}
    for (var key in this) {
      // Check also if property is not inherited from prototype
      if (this.hasOwnProperty(key)) {
        copied[key] = this[key]
      }
    }
    return copied
  }

  /**
   * Creates or updates the resource instance in the server, depending on the primary key be null or have a value
   */
  $save = () => {
    let pk = this.$options.pk || 'id'
    if (this[pk] && this[pk] !== false && this[pk] !== '') {
      return this.$update()
    } else { // If it is a create new resource
      return this.$create()
    }
  }

  /**
   * Post a request to the server
   *
   * @param {Object} {endPoint: String, filters: {}, resource: {}, running: String, endPointAppend: String}
   * @returns {Promise}
   */
  $post = (request) => {
    request = this.$parseRequest(request)
    let instance = this
    instance.$pending = true
    return new Promise((resolve, reject) => {
      if (instance.$options.transformRequest) {
        instance.$options.transformRequest(request)
      }
      httpApi.post(request.endPoint, request.resource).then((response) => {
        instance.$pending = false

        if (instance.$options.transformResponse) {
          instance.$options.transformResponse(response)
        }
        // Extend the value from the server to me
        if (response.data) {
          instance.$extend(instance, response.data)
        }
        let data = {resource: instance, message: response.data.message}
        resolve(data)
      }).catch((error) => {
        instance.$pending = true
        console.log(error)
        reject(error)
      })
    })
  }

  /**
   * Parse an request object, setting the default is not defined
   *
   * @memberof Model
   * @param {Request}
   * @returns {Request}
   */
  $parseRequest = (request) => {
    request = request || {}
    if (!request.endPoint && request.endPointAppend) {
      request.endPoint = this.$endPoint + request.endPointAppend
    }

    if (!request.resource) {
      request.resource = this.$clean(this)
    }
    return request
  }

  /**
   * Creates the resource instance in the server
   *
   * @returns {Promise}
   */
  $create = () => {
    let request = { endPoint: this.$endPoint, filters: {}, resource: this.$clean(this), running: 'create' }
    // $post will return a promise
    return this.$post(request)
  }

  /**
   * Performs a DELETE on this instance running
   * the delete action in the server passing the instance id
   *
   * If the item is associated with an array, it will automatically be removed
   * on successful delete.
   */
  $destroy = () => {
    let request = { endPoint: this.$endPoint, filters: {}, resource: this.$clean(this), running: 'destroy' }
    if (this.$options.transformRequest) {
      this.$options.transformRequest(request)
    }

    let pk = this.$options.pk || 'id'

    let destroyEndPoint = `${request.endPoint}/${request.resource[pk]}`
    return new Promise((resolve, reject) => {
      httpApi.delete(destroyEndPoint).then((response) => {
        let data = {resource: null, message: response.data.message}
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  /**
   * Update a resource
   */
  $update = () => {
    let instance = this
    let request = { endPoint: this.$endPoint, filters: {}, resource: this.$clean(instance), running: 'update' }
    if (instance.$options.transformRequest) {
      instance.$options.transformRequest(request)
    }
    let pk = instance.$options.pk || 'id'

    let updateEndPoint = `${request.endPoint}/${request.resource[pk]}`

    return new Promise((resolve, reject) => {
      httpApi.put(updateEndPoint, request.resource).then((response) => {
        if (instance.$options.transformResponse) {
          instance.$options.transformResponse(response)
        }
        if (response.data) {
          instance.$extend(instance, response.data)
        }
        let data = {resource: this, message: response.data.message}
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  /**
   * Stript reserved methods and attributes
   * @param {*} resource
   */
  $strip = (resource) => {
    let shallow = this.$copy(resource)
    if (shallow && typeof shallow === 'object') {
      for (var key in shallow) {
        // check also if property is not inherited from prototype
        if (shallow.hasOwnProperty(key)) {
          if (this.$instanceKeywords.indexOf(key) > -1) {
            delete shallow[key]
          }
        }
      }
    }
    return shallow
  }

  /**
   * Clean the resource removing reserved methods and attributes and empty attributes
   * The empty attributes action can be disabled by setting the sendEmptyAttributes option equals true
   * @param {*} resource
   */
  $clean = (resource) => {
    let shallow = this.$strip(resource)
    if (shallow && typeof shallow === 'object') {
      for (var key in shallow) {
        // check also if property is not inherited from prototype
        if (shallow.hasOwnProperty(key)) {
          if (shallow[key] === '' && !this.$options.sendEmptyAttributes) {
            delete shallow[key]
          }
        }
      }
    }
    return shallow
  }
}

export default Model
