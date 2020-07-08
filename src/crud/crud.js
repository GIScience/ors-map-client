/**
 * The CRUD controller class allows to add the common extended CRUD actions (get, index, save, update, destroy)
 * to a component using the RESTFull API pattern. It is intended to be used in conjunction with the class ModelService (required by the constructor)
 *
 * This crud class implements the full cycle to get and send data to/from a remote server, including before destroy confirmation dialog,
 * refresh listed data after save, destroy and update and success and confirmation messages.
 *
 * EXPORTS: this javascript module exports two objects: CRUDData and CRUD.
 * The first one must be injected in the vue data section, using the three dots notation, like this:
 *
 *  data: () => ({
 *    ...CRUDData // create the crud data objects (resource, resources and modelService)
 *  })
 *
 * The second one must be used to instantiate the crud class on the vue created event, like this:
 *
 *  created () {
 *    // extend this component, adding CRUD functionalities
 *    let options = {...}
 *    CRUD.set(this, myModelService, options)
 *  }
 *
 * @see @/core/model-service to understand how to create a myModelService to represent a resource/model
 *
 * TOASTS shown after each action use the following priority: server response message,
 * custom message specified in options or the default one (defined @crud/i18n/crud.i18n.en.js)
 *
 * @author <amoncaldas@gmail.com> Amon santana
 *
 * @param {*} vm the component content, that can be passed using ´this´
 * @param {*} modelService an instance of the ModelService class representing the service that provides the data service to a resource. @see @/core/model-service
 * @param {*} options object with optional parameters that allows to customize the CRUD behavior
 *
 * The options object may contain the following attributes:
 *  - queryOnStartup (boolean): if the index action must be ran on the first CRUD run
 *  - indexFailedMsg (string): custom message to be displayed on index action failure
 *  - getFailedMsg (string): custom message to be displayed on get single item action failure
 *  - saveFailedMsg (string): custom message to be displayed on save action failure
 *  - updatedMsg (string): custom message to be displayed on update action failure
 *  - confirmDestroyTitle (string): custom title to be displayed on the confirm dialog shown before destroy action
 *  - confirmDestroyText (string): custom text to be displayed on the confirm dialog shown before destroy action
 *  - destroyedMsg (string): custom message to be displayed after an resource has been destroyed
 *  - destroyFailedMsg (string): custom message to be displayed on destroy action failure
 *  - destroyAbortedMsg (string): custom message to be displayed when a destroy is aborted
 *
 *  - skipFormValidation (boolean): skips the auto form validation
 *  - skipAutoIndexAfterAllEvents (boolean) : skips the auto resources reload after data change events (update, destroy and save)
 *  - skipAutoIndexAfterSave (boolean) : skips the auto resources reload after save
 *  - skipAutoIndexAfterUpdate (boolean) : skips the auto resources reload after update
 *  - skipAutoIndexAfterDestroy (boolean) : skips the auto resources reload after destroy
 *  - skipServerMessages (boolean) : skip using server returned message and use only front end messages do display toasters
 *  - skipShowValidationMsg (boolean) : skit showing the validation error message via toaster when a form is invalid
 *  - formRef (string, optional) : the alternative name of the form ref you are using in the template. Used to auto validate the form. If not provided, it is assumed that the form ref name is `form`
 *  - [http-error-status-code-number] : defines the message to be used when an http error status code is returned by a request (only available fot status code from `300` to `505`)
 *
 * Crud events optional functions:
 * if the vue instance has one of the following defined methods, it is gonna be ran. If it returns false, the execution will be rejected and stopped
 *  - beforeIndex
 *  - beforeGet
 *  - beforeSave
 *  - beforeUpdate
 *  - beforeDestroy
 *  - beforeShowError
 *
 * If the vue `component` to which you are adding the CRUD has one of the following defined methods, it is gonna be called by the CRUD passing the related data

 * - afterIndex
 * - afterGet
 * - afterSave
 * - afterUpdate
 * - afterDestroy
 * - afterError
 *
 * Form validation:
 * if the current vue instance has a $ref named `form` and does not have the option `skipFormValidation` defined as true, the auto form validation will be ran before save and update
 */

import Form from './form'
class CRUD {
  constructor (vm, modelService, options) {
    this.vm = vm
    this.modelService = modelService

    // If options is not passed, initialize it
    this.options = options || {}

    this.run()
  }

  /**
   * Set the crud for he given view model, service and options
   * @param {*} vm
   * @param {*} modelService
   * @param {*} options
   */
  static set (vm, modelService, options) {
    return new CRUD(vm, modelService, options)
  }

  /**
   * The initial function is executed when the class is built
   * if the option queryOnStartup is true, it will also load the resources automatically.
   */
  run () {
    this.vm.resource = this.modelService.newModelInstance()

    // Add the CRUD methods to the view model (vm) passed to the constructor
    this.vm.index = this.index
    this.vm.get = this.get
    this.vm.save = this.save
    this.vm.update = this.update
    this.vm.destroy = this.destroy
    this.vm.confirmAndDestroy = this.confirmAndDestroy

    // If quey on start up is enabled,
    // run the initial query
    if (this.options.queryOnStartup) {
      this.vm.index().then((resources) => {
        this.vm.resources = resources
        this.vm.crudReady = true
      })
    }
  }

  /**
   * Action that queries the model service API, retrieve data and transform, by default,
   * Each resource of the result will be an active record like instance @see https://en.wikipedia.org/wiki/Active_record_pattern)
   * @param {*} filters
   * @returns {Promise}
   */
  index = (filters) => {
    let context = this
    return new Promise((resolve, reject) => {
      let proceed = context.runProceedCallBack('beforeIndex', reject)

      if (proceed) {
        // in the index action we do not use the resource model instance, but each
        // resource returned will be transformed into an active record instance bt the Model
        // you can skip this by defining the `raw` attribute equal true in the model service
        // @see @/core/model-service and @/core/model to read more
        context.modelService.query(filters).then((resources) => {
          // Each returned resource, will be, by default an Model (@core/model) instance, that supports instance methods, like $save, $destroy etc
          context.vm.resources = resources

          // runs the optional after callback (if the function is defined in the Vue component) an pass the data
          context.runAfterCallBack('afterIndex', this.vm.resources)

          // In the default CRUD usage, it is not necessary to
          // listen to the promise result
          // if the promise is not being listened
          // it can raise an error when rejected/resolved.
          // This is not a problem!
          resolve(resources)
        },
        errorResponse => {
          // Handle the error response
          context.handleError(errorResponse, context.options.indexFailedMsg, context.vm.$t('crud.failWhileTryingToGetTheResource'))

          // if it is being run because of a queryOnStartup flag, so we need to tell
          // the client that the crud request is done
          if (context.options.queryOnStartup) {
            context.vm.crudReady = true
          }
        })
      }
    })
  }

  /**
   * Get a single resource data and transform in a Model instance
   * @see @/core/model-service and @/core/model to read more
   *
   * @param {*} pkValue
   * @returns {Promise}
   */
  get = (pkValue) => {
    let context = this
    return new Promise((resolve, reject) => {
      let proceed = context.runProceedCallBack('beforeGet', reject)

      if (proceed) {
        context.modelService.get(pkValue).then((resource) => {
          // The returned resource, will be, by default an Model (@core/model) instance, that supports instance methods, like $save, $destroy etc
          context.vm.resource = resource

          // runs the optional after callback (if the function is defined in the Vue component) an pass the data
          context.runAfterCallBack('afterGet', context.vm.resource)

          // In the default CRUD usage, it is not necessary to
          // listen to the promise result
          // if the promise is not being listened
          // it can raise an error when rejected/resolved.
          // context is not a problem!
          resolve(context.vm.resource)
        },
        errorResponse => {
          // Handle the error response
          context.handleError(errorResponse, context.options.getFailedMsg, context.vm.$t('crud.failWhileTryingToGetTheResource'))

          // In the default CRUD usage, it is not necessary to
          // listen to the promise result
          // if the promise is not being listened
          // it can raise an error when rejected/resolved.
          // This is not a problem!
          reject(errorResponse)
        })
      }
    })
  }

  /**
   * Save the current Model instance defined in this.vm.resource.
   * As the user should see only one form (that represents a resource) per time
   * there is no need to accept a resource (Model) as parameter
   *
   * @returns {Promise}
   */
  save = () => {
    let context = this

    // We return a promise and resolve/reject it because optionally, the developer
    // can have its own save method, and after it is finished do something special
    return new Promise((resolve, reject) => {
      let validForm = context.formIsValid(reject)
      let proceed = context.runProceedCallBack('beforeSave', reject)

      if (validForm && proceed) {
        let postResource = context.vm.resource.$strip(context.vm.resource)
        if (Object.keys(postResource).length === 0) {
          let msg = context.options.resourceEmptyMsg || context.vm.$t('crud.resourceEmptyMsg').replace(':resource', context.vm.resource.$getName())
          context.vm.showError(context.capitalize(msg), {mode: 'multi-line'})
          reject(msg)
        } else {
          context.vm.resource.$save().then((data) => {
            // the return is an object containing a resource/Model instance and a (optional) message property
            context.vm.resource = data.resource

            // Define the save confirmation message to be displayed
            let msg = data.message || context.options.savedMsg || context.vm.$t('crud.resourceSaved').replace(':resource', context.vm.resource.$getName())

            // Capitalize and use multiline to be sure that the message won be truncated (we don't know the how big the messages from server can be)
            context.vm.showSuccess(context.capitalize(msg), {mode: 'multi-line'})

            // Reload the data listed
            if (!context.options.skipAutoIndexAfterSave && !context.options.skipAutoIndexAfterAllEvents) {
              context.vm.index()
            }

            // runs the optional after callback (if the function is defined in the Vue component) an pass the data
            context.runAfterCallBack('afterSave', context.vm.resource)

            // In the default CRUD usage, it is not necessary to
            // listen to the promise result
            // if the promise is not being listened
            // it can raise an error when rejected/resolved.
            // This is not a problem!
            resolve(context.vm.resource)
          },
          errorResponse => {
            // Handle the error response
            context.handleError(errorResponse, context.options.saveFailedMsg, context.vm.$t('crud.failWhileTryingToSaveResource'))

            // In the default CRUD usage, it is not necessary to
            // listen to the promise result
            // if the promise is not being listened
            // it can raise an error when rejected/resolved.
            // This is not a problem!
            reject(errorResponse)
          })
        }
      }
    })
  }

  /**
   * Update the current Model instance defined in this.vm.resource.
   * As the user should see only one form (that represents a resource) per time
   * there is no need to accept a resource (Model) as parameter
   *
   * @returns {Promise}
   */
  update = () => {
    let context = this
    return new Promise((resolve, reject) => {
      let validForm = context.formIsValid(reject)
      let proceed = context.runProceedCallBack('beforeUpdate', reject)

      if (validForm && proceed) {
        context.vm.resource.$update().then((data) => {
          // the return is an object containing a resource/Model instance and a (optional) message property
          context.vm.resource = data.resource

          // Define the save confirmation message to be displayed
          let msg = data.message || context.options.updatedMsg || context.vm.$t('crud.resourceUpdated').replace(':resource', context.vm.resource.$getName())

          // Capitalize and use multiline to be sure that the message won be truncated (we don't know the how big the messages from server can be)
          context.vm.showSuccess(context.capitalize(msg), {mode: 'multi-line'})

          // Reload the data listed
          if (!context.options.skipAutoIndexAfterUpdate && !context.options.skipAutoIndexAfterAllEvents) {
            context.vm.index()
          }

          // runs the optional after callback (if the function is defined in the Vue component) an pass the data
          context.runAfterCallBack('afterUpdate', context.vm.resource)

          // In the default CRUD usage, it is not necessary to
          // listen to the promise result
          // if the promise is not being listened
          // it can raise an error when rejected/resolved.
          // This is not a problem!
          resolve(context.vm.resource)
        },
        errorResponse => {
          // Handle the error response
          context.handleError(errorResponse, context.options.updateFailedMsg, context.vm.$t('crud.failWhileTryingToUpdateResource'))

          // In the default CRUD usage, it is not necessary to
          // listen to the promise result
          // if the promise is not being listened
          // it can raise an error when rejected/resolved.
          // This is not a problem!
          reject(errorResponse)
        })
      }
    })
  }

  /**
   * Open a dialog to confirm the action and then run the destroy Destroy (delete) the current Model instance defined in this.vm.resource.
   * This method is intended to be used in a listing view, so it is necessary to pass the resource/Model
   *
   * @returns {Promise}
   */
  confirmAndDestroy = (resource) => {
    let context = this
    return new Promise((resolve, reject) => {
      // Define the conformation modal title to be displayed before destroying
      let confirmTitle = context.options.confirmDestroyTitle || context.vm.$t('crud.removalConfirmTitle')

      // Define the conformation modal text to be displayed before destroying
      let confirmMessage = context.options.confirmDestroyText || context.vm.$t('crud.doYouReallyWantToRemove').replace(':resource', context.vm.resource.$getName())

      // Open the confirmation modal and wait for the response in a promise
      context.vm.confirmDialog(confirmTitle, confirmMessage).then(() => {
        // if the user confirms the destroy, run it
        context.vm.destroy(resource).then(
          // In the default CRUD usage, it is not necessary to
          // listen to the promise result
          // if the promise is not being listened
          // it can raise an error when rejected/resolved.
          // This is not a problem!
          resolve,
          reject
        )
      }, (error) => { // If the user has clicked `no` in the dialog, abort the destroy and show an aborted message
        // Define the error message to be displayed
        let msg = context.options.destroyAbortedMsg || context.vm.$t('crud.destroyAborted')

        // show the abort message as an info
        context.vm.showInfo(msg)

        // In the default CRUD usage, it is not necessary to
        // listen to the promise result
        // if the promise is not being listened
        // it can raise an error when rejected/resolved.
        // This is not a problem!
        reject(error)
      })
    })
  }

  /**
   * Run the destroy directly, without confirmation
   *
   * @param {*} resource to be destroyed
   * @returns {Promise}
   */
  destroy = (resource) => {
    let context = this
    return new Promise((resolve, reject) => {
      let proceed = context.runProceedCallBack('beforeDestroy', reject)

      if (proceed) {
        resource.$destroy().then((data) => {
          // Define the save confirmation message to be displayed
          let msg = data.message || context.options.destroyedMsg || context.vm.$t('crud.resourceDestroyed').replace(':resource', context.vm.resource.$getName())

          // Capitalize and use multiline to be sure that the message won be truncated (we don't know the how big the messages from server can be)
          context.vm.showSuccess(context.capitalize(msg), {mode: 'multi-line'})

          // Reload the data listed
          if (!context.options.skipAutoIndexAfterDestroy && !context.options.skipAutoIndexAfterAllEvents) {
            context.vm.index()
          }

          // runs the optional after callback (if the function is defined in the Vue component) an pass the data
          context.runAfterCallBack('afterDestroy', resource)

          // In the default CRUD usage, it is not necessary to
          // listen to the promise result
          // if the promise is not being listened
          // it can raise an error when rejected/resolved.
          // This is not a problem!
          resolve()
        },
        errorResponse => {
          // Handle the error response
          context.handleError(errorResponse, context.options.destroyFailedMsg, context.vm.$t('crud.failWhileTryingToDestroyResource'))

          // In the default CRUD usage, it is not necessary to
          // listen to the promise result
          // if the promise is not being listened
          // it can raise an error when rejected/resolved.
          // This is not a problem!
          reject(errorResponse)
        })
      }
    })
  }

  /**
   * Handle the error response
   *
   * @param {*} response
   * @param {*} actionMsg
   * @param {*} defaultCrudMsg
   * @memberof CRUD
   */
  handleError (response, actionMsg, defaultCrudMsg) {
    // There is no response message in this case, so we define the message considering the options custom message, the options status msg or the default one
    let treatment = this.getErrorTreatment(response, actionMsg, defaultCrudMsg)
    if (treatment !== false) {
      if (typeof treatment !== 'function') {
        this.showErrorMessage(response, treatment)
      } else {
        treatment(response, actionMsg, defaultCrudMsg)
      }
    }
    this.runAfterCallBack('afterError', response)
  }

  /**
   * Build the error message
   *
   * @param {*} errorResponse
   * @param {*} crudErrorMessage
   * @param {*} eventMsg
   * @returns {String|false|function} (if false, means no error message should be displayed)
   * @memberof CRUD
   */
  getErrorTreatment (errorResponse, eventMsg, crudErrorMessage) {
    // the event message is the priority, so if it is defined, use it
    if (eventMsg !== null && eventMsg !== undefined) {
      return eventMsg
    }

    // We try to get the error message to the returned http status code
    // If available, use it
    if (errorResponse.status && this.options[errorResponse.status] !== undefined) {
      return this.options[errorResponse.status]
    }

    // If none works, use the default crudErrorMessage
    return crudErrorMessage.replace(':resource', this.vm.resource.$getName())
  }

  /**
   * Run the before proceed optional callback function
   * id the function returns false, stop the flow
   *
   * @param {*} callbackFunc
   * @param {*} reject promise reject pointer
   * @returns boolean
   */
  runProceedCallBack (callbackFunc, reject, data) {
    let proceed = true
    if (this.vm.hasOwnProperty(callbackFunc)) {
      proceed = this.vm[callbackFunc](data)
    }

    if (proceed === false) {
      let error = `proceed stopped on ${callbackFunc} function`
      console.log(error)
      let errorMsg = this.options.operationAborted || this.vm.$t('crud.operationAborted')
      this.vm.showInfo(this.capitalize(errorMsg), {mode: 'multi-line'})

      // In the default CRUD usage, it is not necessary to
      // listen to the promise result
      // if the promise is not being listened
      // it can raise an error when rejected/resolved.
      // This is not a problem!
      reject(error)
    }

    return proceed === true || proceed === null || proceed === undefined
  }

  /**
   * Run the after optional callback function
   * If the function returns false, stop the flow
   * @param {*} callbackFunc
   * @param {*} data data to be passed
   */
  runAfterCallBack (callbackFunc, data) {
    if (this.vm.hasOwnProperty(callbackFunc)) {
      this.vm[callbackFunc](data)
    }
  }

  /**
   * Checks whenever the default form $rf exists and if so, if it is valid
   * If invalid, reject the promise and show the invalid form error message
   *
   * @param {*} reject
   * @returns boolean
   */
  formIsValid (reject) {
    let validForm = true // init as valid
    let formRef = this.options.formRef || 'form' // get the form ref (custom or default one)
    let form = this.vm.$refs[formRef] || null // get the form object using the formRef

    let crudForm = new Form(form, this.vm, this.options)
    validForm = crudForm.validate()
    if (!validForm) {
      let errorMsg = this.options.invalidForm || this.vm.$t('crud.invalidForm')
      // In the default CRUD usage, it is not necessary to
      // listen to the promise result
      // if the promise is not being listened
      // it can raise an error when rejected/resolved.
      // This is not a problem!
      reject(errorMsg)
    }
    // Validate the form
    return validForm
  }

  /**
   * Capitalize a string
   *
   * @param {*} string
   * @returns String
   */
  capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  /**
   * Show the response error message or the default error message passed
   * @param {*} errorResponse
   * @param {*} defaultErrorMessage
   */
  showErrorMessage (errorResponse, frontEndErrorMessage) {
    let showError = true

    // If the message is set as `false` so we shall not display any message
    if (frontEndErrorMessage === false) {
      showError = false
    }

    if (this.vm.hasOwnProperty('beforeShowError')) {
      errorResponse.showError = showError // add the current showError status to the object passed to the call back
      showError = this.vm['beforeShowError'](errorResponse)
    }

    if (showError === true) {
      // As we don't want to show a raw error to the user, if the status code is == 500 (internal server error)
      // or there is no error response we show a friendly error message
      if (errorResponse === undefined || errorResponse.status === 500 || (!errorResponse.data || !errorResponse.data.message)) {
        // if it this and 500 case, we show only a friendly message, and log the error and log the error
        // as we are not sure about the error message size, use multi-line model for the toaster
        this.vm.showError(this.capitalize(frontEndErrorMessage), {mode: 'multi-line'})
        console.log(errorResponse)
      } else {
        // Define the error message to be used
        // either the front end message or the server one (if available)
        let errorMsg = frontEndErrorMessage
        if (!this.options.skipServerMessages) {
          errorMsg = errorResponse.message || errorResponse.data.message
        }

        // We show the response error message
        // As we are not sure about the error message size, use multi-line model for the toaster
        this.vm.showError(this.capitalize(errorMsg), {mode: 'multi-line'})
      }
    }
  }
}

/**
 * CRUD data object that must be used to be injected as a collection of
 * data attribute in the vue data section
 */
const CRUDData = {
  resource: null,
  resources: [],
  crudReady: false,
  modelService: null
}

// Export the CRUD and the CRUDData objects
export {CRUD}
export {CRUDData}
