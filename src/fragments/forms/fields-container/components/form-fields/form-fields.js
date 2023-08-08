import dependencyService from '@/support/dependency-service.js'
import defaultMapSettings from '@/config/default-map-settings'
import SliderCombo from '../slider-combo/SliderCombo.vue'
import {EventBus} from '@/common/event-bus'

export default {
  props: {
    parameters: {
      required: true
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
      debounceTimeoutId: null
    }
  },
  created () {
    let context = this
    this.updateFieldsStatus()

    // Every time the active console tab changes
    // we refresh the single parameter model
    EventBus.$on('filtersChangedExternally', () => {
      context.updateFieldsStatus()
      context.$forceUpdate()
    })
  },
  updated () {
    this.$emit('updated')
  },
  computed: {
    formParameters () {
      return this.parameters
    }
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
     * Set a new random value for the random component
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
     * Update the status of all related fields based on the dependency
     * and also the count of disabled fields
     *
     */
    updateFieldsStatus () {
      let service = dependencyService
      service.updateFieldsStatus(this.formParameters)
    },

    /**
     * Handle the multi select change, applying a debounce-timeout
     * for sequential changes to avoid multiple refreshes
     * @param {*} args
     */
    multiSelectChanged (args) {
      if (args.parameter.multiSelect) {
        const context = this
        if (this.debounceTimeoutId) {
          clearTimeout(this.debounceTimeoutId)
        }
        this.debounceTimeoutId = setTimeout(function () {
          context.fieldUpdated(args)
        }, 2000)
      } else {
        this.fieldUpdated(args)
      }
    },

    /**
     * Emit the field update event if it is not in modal editing mode
     *
     * @param {*} data
     * @emits fieldUpdated [to parent]
     */
    fieldUpdated (data) {
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
    sliderComboUpdated (index) {
      let parameter = this.parameters[index]
      this.fieldUpdated({index: index, parameter: parameter})
    },

    /**
     * Get a list of selectable items from an enum/select input
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
            item.itemValue = item[parameter.itemValue]
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
      let translation = itemValue

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
    'form-fields': () => import('./FormFields.vue')
  }
}
