
import dependencyService from '@/support/dependency-service.js'
import defaultMapSettings from '@/config/default-map-settings'
import SliderCombo from '../slider-combo/SliderCombo.vue'

export default {
  props: {
    parameters: {
      required: true
    },
    subPropsIndex: {
      required: false
    },
    isModal: {
      required: false,
      type: Boolean
    },
    parentIndex: {
      required: false,
      type: Number
    },
    level: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      subPropsModalActive: false,
      subPropsModalTitle: null,
      subPropsModalIndex: null,
      manualEditModalActive: false,
      manualEditingParameter: null
    }
  },
  created () {
    let context = this
    if (this.subPropsIndex) {
      this.subPropsModalIndex = this.subPropsIndex
    }
    this.updateFieldsStatus()

    // Every time the active console tab changes
    // we refresh the single parameter model
    this.eventBus.$on('filtersChangedExternally', () => {
      context.updateFieldsStatus()
      context.$forceUpdate()
    })
  },
  computed: {
    formParameters () {
      return this.parameters
    },
    isSideBarOpen: {
      get () {
        return this.$store.getters.isSidebarVisible && !this.$store.getters.embed
      },
      set (open) {
        this.$store.commit('setLeftSideBarIsOpen', open)
        // If the side bar is closed by a user's action, then
        // we can set the sidebar pined status as false
        if (open === false) {
          this.$store.commit('setLeftSideBarIsPinned', open)
        }
      }
    },
  },
  methods: {
    comboFilterParameter (index) {
      return this.formParameters[index]
    },
    /**
     * Determines f a field must be shown
     * @param {*} parameter
     */
    showField (parameter) {
      const show = !parameter.hidden && (!parameter.availableOnModes || parameter.availableOnModes.indexOf(this.$store.getters.mode) > -1)
      return show
    },
    /**
     * Set a ne random value for the random component
     * @param {*} index
     */
    setNewRandomValue (index) {
      const min = this.formParameters[index].min || 0
      const max = this.formParameters[index].max || 100
      const random = Math.floor(Math.random() * (max - min + 1) + min)
      this.formParameters[index].value = random
      this.fieldUpdated({ index: index })
    },
    /**
     * Get a new value for a random parameter
     * @param {Number} index
     * @returns {Number} value
     */
    getNewRandomValue (index) {
      const value = Math.floor((Math.random() * (this.formParameters[index].max + 1)) + this.formParameters[index].min)
      return value
    },

    /**
     * Update the status of all related fields based on the dependency
     * and also the count of disabled fields
     *
     */
    updateFieldsStatus () {
      let service = dependencyService
      service.updateFieldsStatus(this.formParameters)
    },

    /**
     * Check if the object has a valid child props attribute
     *
     * @param {*} parameter
     * @returns {Boolean}
     */
    hasValidChildProps (parameter) {
      if (parameter.type !== 'object') {
        return false
      } else {
        return parameter.props && Object.keys(parameter.props).length > 0
      }
    },

    /**
     * Check if the current form fields instance is an opened Modal
     * @param parameter
     * @returns {boolean}
     */
    isModalMultiSelect (parameter) {
      return (this.isModal === true && parameter.multiSelect)
    },

    /**
     * Emit the field update event if it is not in modal editing mode
     *
     * @param {*} data
     * @emits fieldUpdated [to parent]
     */
    fieldUpdated (data) {
      // If a parameter props is open or we are listing the props of a single parameter form
      // update the parent model with the JSON representation of the child props before
      // triggering the field update event
      if (this.subPropsModalActive) {
        this.updateModelAfterChildPropsChange(this.subPropsModalIndex)
        // If an field was updated using the modal nested `form-fields` component
        // we don't emit the event because when the modal operation is concluded
        // it will be emitted the event at `onModalFieldAssistedConfirm`
        return
      }
      let passingData = { index: data.index, value: data.value, parameter:  data.parameter}

      // There may be nested levels of paternity and these levels
      // must be represented in the parent index property.
      // When the passing data already has a parent index, then
      // parentIndex will be an array containing the direct parent
      // at index 0 and all the ancestry at the position 1.
      if ((Array.isArray(data.parentIndex) || data.parentIndex >= 0) && this.parentIndex >= 0) {
        passingData.parentIndex = [data.parentIndex, this.parentIndex]
      } else { // if it is a single level paternity, just set the immediate parent
        passingData.parentIndex = data.parentIndex || this.parentIndex
      }
      // Reset the search input value
      if (this.parameters[data.index]) {
        this.parameters[data.index].searchInput = ''
      }

      this.$emit('fieldUpdated', passingData)

      this.updateFieldsStatus()
      this.$forceUpdate()
    },

    /**
     * Update filed modal when the combo component triggers an update
     * @param {*} index 
     * @param {*} newVal 
     */
    sliderComboUpdated (index, newVal) {
      let parameter = this.parameters[index]
      this.fieldUpdated({index: index, parameter: parameter})
    },

    /**
     * Set the parameter as select to be used
     * by the modal, setting its `index` as selected and
     * the modal title
     *
     * @param {*} index
     */
    selectParameter (index) {
      // Set the title of the modal based on the parameter prop name and type
      this.subPropsModalTitle = `${this.formParameters[index].name} ${this.formParameters[index].label}`
      this.manualEditingParameter = this.formParameters[index]

      // Set the of the parameter to be edited
      this.subPropsModalIndex = index

      // Convert array in string format back to array object
      if (typeof this.formParameters[index].props === 'object') {
        for (const key in this.formParameters[index].props) {
          const prop = this.formParameters[index].props[key]
          this.formParameters[index].props[key].oldValue = prop.value
          if (prop.separator && prop.value && typeof prop.value !== 'object') {
            this.formParameters[index].props[key].value = prop.value.split(prop.separator)
          }
        }
      }
    },

    /**
     * Open a modal for assisted editing of the value
     * if the param is an object and contains nested props
     *
     * @param {*} index
     */
    maybeOpenAssistant (index) {
      const param = this.formParameters[index]
      if (this.subPropsModalActive === false && this.hasValidChildProps(param)) {
        this.selectParameter(index)
        if (this.formParameters[index].props) {
          this.parseChildrenPropsToJsonString(this.formParameters[index].props)
        }
        // Show the modal
        this.subPropsModalActive = true
      }
    },

    /**
     * Open a modal for text plain editing of the value
     * if the param is an object and contains nested props
     *
     * @param {*} index
     */
    maybeOpenManualEdit (index) {
      const param = this.formParameters[index]

      if (this.hasValidChildProps(param)) {
        // We need to wait a little so that the view is ready
        setTimeout(() => {
          this.selectParameter(index)
          this.manualEditModalActive = true
          this.editModalModel = true
        }, 100)
      }
    },

    /**
     * Get a list of selectable items from a enum/select input
     *
     * @param {*} parameter
     * @returns []
     */
    getSelectableItems (parameter) {
      let items = []
      if (parameter.filteredItems) {
        items = parameter.filteredItems
      } else if (parameter.items) {
        items = parameter.items
      } else {
        items = parameter.enum
      }

      return this.adjustItems(items, parameter)
    },

    /**
     * Set item option structure and translation
     * @param {Array} items
     * @return {Array} items
     */
    adjustItems (items, parameter) {
      for (let key in items) {
        let item = items[key]
        if (typeof item !== 'object' || !item.itemText) {
          if (typeof item === 'object') {
            for (const itemKey in item) {
              // Convert each defined property to string
              if (item[itemKey]) {
                item[itemKey] = item[itemKey].toString()
              }
            }
            // If the item object has texts for the current locale, get it and then set it as the item text
            item.itemText = item[this.$store.getters.mapSettings.locale] || item[defaultMapSettings.locale] || item.itemValue
          } else { // item is not an object, but a simple value
            let itemObj = {
              itemValue: item,
              itemText: this.getItemTranslation(item, parameter)
            }
            items[key] = itemObj
          }
        }
      }
      return items
    },

    /**
     * Get item translation by item value
     * @param {String} itemValue
     * @returns {String}
     */
    getItemTranslation (itemValue, parameter) {
      var translation = itemValue

      // if the value is not a number, find the translation
      if(isNaN(itemValue)) {

        // The translation can be either in the ors map filters translation
        // or in the global ors dictionary translation

        // Try first the orsMapFilters resource
        let translationKey = parameter.translation_key || parameter.name
        let translationObject = this.$t(`orsMapFilters.filters.${translationKey}`)
        if (translationObject.enum && translationObject.enum[itemValue]) {
          translation = translationObject.enum[itemValue]
        } else { // Fall back to orsDictionary
          let dicObj = this.$t('orsDictionary')
          translation = dicObj[itemValue]
        }
      } else { // if it is a number, then do not translate it
        translation = itemValue
      }
      return translation
    },

    /**
     * When manual edit modal is closed, reset the view state to default
     *
     */
    onEditModalOk () {
      try {
        this.manualEditModalActive = false
        this.editModalModel = true
        this.subPropsModalIndex = null
        this.manualEditingParameter = null
      } catch (e) {
        this.showError(this.$t('formFields.notValidJsonString').replace(':fieldName', this.parameters[this.subPropsModalIndex].name))
      }
    },

    /**
     * Build the parameter label using the example, apiDefault and label
     *
     * @param {*} parameter
     * @returns {String}
     */
    buildLabel (parameter) {
      if (!parameter) {
        return ''
      }
      let filterKey = `orsMapFilters.filters.${parameter.name}.label`
      let label = this.$t(filterKey)
      if (label === filterKey) {
        label = parameter.name
      }

      if (parameter.apiDefault) {
        label += (' ' + this.$t('formFields.defaultAbbreviation') + ' ' + parameter.apiDefault)
      } else if (parameter.example) {
        label += (' ' + this.$t('formFields.exampleAbbreviation') + ' ' + parameter.example)
      }
      return label
    },
    /**
     * Build the parameter description
     *
     * @param {*} parameter
     * @returns {String}
     */
    buildDescription (parameter) {
      if (!parameter) {
        return ''
      }
      let filterKey = `orsMapFilters.filters.${parameter.name}.description`
      let description = this.$t(filterKey)
      return description
    },

    /**
     * Get the values of the children and merge them into a json string representation.
     */
    parseChildrenPropsToJsonString (props) {
      // The above VueJS $set will remove all other parameters properties
      // so after executing it, we restore other properties of the parameter object
      for (const key in props) {
        if (key !== 'value') {
          props[key].value = this.getParamPropsValueStringified(props[key].props)
        }
        if (key === 'props') {
          this.parseChildrenPropsToJsonString(props[key].props)
        }
      }
    },

    /**
     * Update parent model after child changes
     *
     * @param {*} parentIndex
     */
    updateModelAfterChildPropsChange (parentIndex) {
      // By default consider the root level as being `parameters`
      let parameters = this.parameters
      // If modal is open, so we have to consider the scoped parameters (formParameters)
      if (this.subPropsModalActive) {
        parameters = this.formParameters
      }
      const stringifiedValue = this.getParamPropsValueStringified(parameters[parentIndex].props) || parameters[parentIndex].default

      const parameter = parameters[parentIndex]
      // Update model value and trigger update in the view
      // @see https://stackoverflow.com/questions/42077023/vuejs-dynamic-property-name-not-updating-value
      this.$set(parameters, parentIndex, { value: stringifiedValue })

      // The above VueJS $set will remove all other parameters properties
      // so after executing it, we restore other properties of the parameter object
      for (const key in parameter) {
        if (key !== 'value') {
          parameters[parentIndex][key] = parameter[key]
        }
      }
    },

    /**
     * When the modal assistant is closed with confirm
     * we parse the value of the props, set the parse result
     * as the value of the parent prop,
     * emit the field update event and reset the sub props modal data
     *
     */
    onModalFieldAssistedConfirm () {
      const index = this.subPropsModalIndex

      // Notify the parent about the update
      this.fieldUpdated(index, { index: index, value: this.formParameters[index].value })

      // Reset the modal to initial (closed) state
      this.subPropsModalActive = false

      // Refresh root level json object AFTER setting subPropsModalActive to false
      this.refreshSingleParameterModel()
      this.subPropsModalIndex = null
    },

    /**
     * Transform the value of the nested props in a string representing a JSON
     *
     * @param {Object} props
     * @returns {String}
     */
    getParamPropsValueStringified (props) {
      try {
        const values = {}
        for (const index in props) {
          if (props[index].separator && props[index].value && Array.isArray(props[index].value)) {
            if (props[index].value.length === 0 || props[index].disabled) {
              continue
            }
          }
          if (props[index].value && !props[index].disabled) {
            // ORS-core 4.7 pipe separated "arrays" need to be passed as pipe concatenated strings
            if (props[index].separator === '|') {
              values[props[index].name] = props[index].value.join('|')
            } else {
              values[props[index].name] = isNaN(props[index].value) || (props[index].items && props[index].items.type === 'string') ? props[index].value : parseInt(props[index].value)
            }
          }
        }
        let stringified = JSON.stringify(values)
        // If the value of a prop is already a string representing a JSON object
        // the stringify function will add escape characters that will break down
        // our json string. So we remove/replace then
        stringified = stringified.replace(/ /g, '').replace(/"{/g, '{').replace(/\\/g, '').replace(/}"/g, '}').replace(/"\[/g, '[').replace(/]"/g, ']')
        return stringified === '{}' ? null : stringified
      } catch (e) {
        for (const index in props) {
          props[index].value = props[index].oldValue || null
        }
        this.showError(this.$t('formFields.wrongInputValue'))
        return null
      }
    },

    /**
     * Determines if an expansion panel wrapper parameter should be displayed expanded
     *
     * @param {Object} filter
     * @returns {boolean}
     */
    showPanelExpanded (filter) {
      dependencyService.updateFieldsStatus(filter.props)
      const childHasContent = dependencyService.getChildrenFilterValue(filter)
      // By returning O, it is kept open and
      // by returning null it is kept collapsed
      return childHasContent ? 0 : null
    }
  },
  components: {
    SliderCombo,
    // Avoid cyclic dependency by loading components asynchronously
    'dialog-fields': () => import('../dialog-fields/DialogFields.vue'),
    'form-fields': () => import('./FormFields.vue')
  }
}
