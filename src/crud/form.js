class CrudForm {
  constructor (formRef, context, options) {
    this.formRef = formRef
    this.vm = context
    this.options = options || {}
  }

  /**
   * Validate a form by running the default form validate and addition check for required field
   * If any field is invalid, sets the field as invalid, set it error message and shows a toaster with the error
   */
  validate () {
    if (this.options.skipFormValidation) {
      return true
    }
    let validForm = this.formRef.validate()

    // Validate the native `required` input attribute
    // that is not validated by the form.validate()
    if (!this.validateRequiredFields()) {
      validForm = false
    }

    if (!validForm && !this.options.skipShowValidationMsg) {
      let errorMsg = this.options.invalidForm || this.vm.$t('crud.invalidForm')
      // as we are not sure about the error message size, use multi-line model for the toaster
      this.vm.showError(this.capitalize(errorMsg), {mode: 'multi-line'})
    }
    return validForm
  }

  /**
   * Validate the required input attribute
   *
   * @param {Object} form
   * @returns {Boolean}
   * @memberof CRUD
   */
  validateRequiredFields () {
    let validForm = true
    CrudForm.getInputs(this.formRef).forEach(input => {
      // We only validate the  required attribute if the input is not yet invalid
      if (input.valid && input.required && (input.inputValue === undefined || input.inputValue === null || input.inputValue === '')) {
        input.valid = validForm = false
        let errorMsg = `${input.label} ${this.vm.$t('crud.required')}` || this.vm.$t('crud.inputRequired')
        input.errorBucket.push(errorMsg)
      }
    })
    return validForm
  }

  /**
   * Retrieve all the form inputs
   *
   * @param {*} form
   * @returns Array
   * @memberof CrudForm
   */
  static getInputs (form) {
    var results = []
    var search = function search (children) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0

      for (var index = 0; index < children.length; index++) {
        var child = children[index]
        if (child.errorBucket !== undefined) {
          results.push(child)
        } else {
          search(child.$children, depth + 1)
        }
      }
      if (depth === 0) return results
    }

    return search(form.$children)
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
}

export default CrudForm
