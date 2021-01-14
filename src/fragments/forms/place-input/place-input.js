import AppMode from '@/support/app-modes/app-mode'
import { PlacesSearch, ReverseGeocode } from '@/support/ors-api-runner'
import constants from '@/resources/constants'
import GeoUtils from '@/support/geo-utils'
import Place from '@/models/place'
import utils from '@/support/utils'
import appConfig from '@/config/app-config'

export default {
  data: () => ({
    debounceTimeoutId: null,
    searching: false,
    focused: false,
    localModel: null,
    placeInputFloatingMenu: false,
    focusIsAutomatic: false
  }),
  props: {
    index: {
      Required: true
    },
    isLast: {
      Type: Boolean,
      default: false
    },
    box: {
      Type: Boolean,
      default: false
    },
    model: {
      Type: Place,
      Required: true
    },
    single: {
      Type: Boolean,
      default: false
    },
    autofocus: {
      Type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 30
    },
    mb: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    supportDirections: {
      type: Boolean,
      default: true
    },
    supportDirectRouting: {
      type: Boolean,
      default: false
    },
    supportSearch: {
      type: Boolean,
      default: true
    },
    pickPlaceSupported: {
      type: Boolean,
      default: false
    },
    directionsButtonTooltip: {
      default: false,
      type: Boolean
    },
    directionsButtonTooltipPosition: {
      default: 'right',
      type: String
    },
    idPostfix: {
      default: '',
      type: String
    }

  },
  created () {
    // Create a local clone of the model passed via props (so we can modify if when necessary)
    const placeClone = new Place()
    this.localModel = Object.assign(placeClone, this.model)

    const context = this

    this.eventBus.$on('suggestionsUpdated', (data) => {
      context.suggestionUpdated(data)
    })
    this.resolveModel()
    this.focusIsAutomatic = this.autofocus
  },
  computed: {
    /**
     * Build and returns the input predictable id
     * @returns {String}
     */
    predictableId () {
      let id = `place-input-container-${this.idPostfix}-${this.index}`
      return id
    },
    /**
     * Determines if the automatic focus must be set or not
     * @returns {Boolean}
     */
    hasAutomaticFocus () {
      // If is a mobile device, do not use automatic
      // focus to avoid openning the keyboard
      if (this.isMobile) {
        return false
      }
      return this.focusIsAutomatic
    },
    /**
     * Determines if the device is mobile
     * @returns {Boolean}
     */
    isMobile () {
      let isMobile = utils.isMobile()
      return isMobile
    },
    /**
     * Determines if the pick a place button must show its tooltip
     * @returns {Boolean}
     */
    showInputPickPlaceTooltip () {
      let show = this.model.isEmpty() && !this.single && this.$store.getters.isSidebarVisible
      return show
    },
    /**
     * Get the input hint to be displayed
     * @returns {String}
     */
    hint () {
      let hint = ''
      if (this.model.isEmpty() && !this.single) {
        hint = this.$t('placeInput.fillOrRemoveInput')
      }
      return hint
    },
    /**
     * Determines if the input details must be hidden
     * @returns {Boolean}
     */
    hideDetails () {
      let hide =  this.single || (!this.focused && !this.hasAutomaticFocus)
      return hide
    },
    /**
     * Returns the place input rule required message if it is empty
     * @returns {Boolean|String}
     */
    placeNameRules () {
      return [
        v => !!v || this.$t('placeInput.placeNameRequired')
      ]
    },
    /**
     * Return the column breakpoint that must be applied to the input flex
     * @returns {String}
     */
    inputColumns () {
      const columns = 12 - (this.iconsBtnCounter * this.inputColumnFactor)
      return `xs${columns} sm${columns} md${columns} lg${columns}`
    },

    /**
     * Return the column breakpoint that must be applied to the input flex
     * @returns {String}
     */
    iconsColumns () {
      const columns = this.iconsBtnCounter * this.inputColumnFactor
      return `xs${columns} sm${columns} md${columns} lg${columns}`
    },

    /**
     * Defines the input colums factor based on the current resolution
     * @returns {Integer}
     */
    inputColumnFactor () {
      return this.$lowResolution ? 2 : 1
    },

    /**
     * Return the quantity of input icon button rendered
     * @returns {Integer}
     */
    iconsBtnCounter () {
      let btnColumns = 0

      if (this.deleteAvailable && !this.placeMenuAvailable) {
        btnColumns++
      }
      if (this.switchCoordsAvailable && !this.placeMenuAvailable) {
        btnColumns++
      }
      if (this.directionsAvailable && !this.placeMenuAvailable) {
        btnColumns++
      }
      if (this.directIsAvailable && !this.placeMenuAvailable) {
        btnColumns++
      }
      if (this.placeMenuAvailable) {
        btnColumns++
      }

      if (btnColumns > 1) {
        btnColumns = btnColumns + 0
      }

      return btnColumns
    },
    /**
     * Get the place input label based on the current view mode
     * @param {*} index
     */
    placeInputLabel () {
      let label = null
      if (this.disabled) {
        return label
      }
      if (this.supportDirections) {
        if (this.isLast) {
          label = `(${this.index + 1}) ${this.$t('placeInput.routeDestination')}`
        } else {
          if (this.single) {
            label = this.model.isEmpty() ? this.$t('placeInput.findAPlace') : this.$t('placeInput.place')
          } else {
            if (this.index === 0) {
              label = `(${this.index + 1}) ${this.$t('placeInput.startingPlace')}`
            } else {
              label = this.model.isEmpty() ? `(${this.index + 1}) ${this.$t('placeInput.addRouteStop')}` : `(${this.index + 1}) ${this.$t('placeInput.routePlace')}`
            }
          }
        }
      } else {
        label= `${this.$t('placeInput.findAPlace')}`
      }
      let labelData = {label: label, supportDirections: this.supportDirections, single: this.single, placeModel: this.model}
      this.$root.appHooks.run('placeInputLabelBuilt', labelData)
      return labelData.label
    },

    /**
     * Determines if the delete button is availabel for the current place input
     */
    deleteAvailable () {
      return this.index !== 0
    },
    /**
     * If a place input can have the direct option
     */
    directIsAvailable () {
      return this.supportDirectRouting && !this.isLast && (this.index > 0 || (!this.single && !this.model.isEmpty()))
    },
    // Switch the coordinates position ([lat, long] -> [long, lat] and [long, lat] -> [lat, long])
    switchCoordsAvailable () {
      const canSwitch = this.model.nameIsCoord()
      return canSwitch
    },
    searchAvailable () {
      let available = appConfig.supportsSearchMode
      return available
    },
    /**
     * Determines if the place input floating menu button is availabel for the current place input
     */
    placeMenuAvailable () {
      return this.$lowResolution && !this.single && (this.index > 0 || this.directIsAvailable || this.switchCoordsAvailable)
    },
    /**
     * Determines if the place input directions menu button is availabel for the current place input
     */
    directionsAvailable () {
      if (!this.supportDirections || !appConfig.supportsDirections) {
        return false
      } else {
        return this.single && this.index === 0
      }
    },
    /**
     * Determines if the current browser location option should be prepend to the suggestion lis of the current place input
     */
    showBrowserLocationInPlacesList () {
      return this.focused
    },
    /**
     * Return an array with the place's suggestion based on the model suggestion data
     */
    placeSuggestions () {
      if (!this.focused) {
        return []
      }
      let suggestions = []
      if (this.localModel.nameIsCoord()) {
        const lnglatArr = this.localModel.getLngLatArr()
        const rawCoordinatesPlace = new Place(lnglatArr[0], lnglatArr[1], this.localModel.placeName, { properties: { layer: 'rawCoordinate' } })
        rawCoordinatesPlace.rawCoordinate = true
        suggestions.push(rawCoordinatesPlace)
      }
      suggestions = suggestions.concat(this.localModel.suggestions)
      return suggestions
    },

    showSuggestion () {
      let show = this.focused && !this.focusIsAutomatic
      return show
    },
    appendBtn () {
      if (this.supportSearch) {
        return 'search'
      } else if (this.$lowResolution || this.localModel.isEmpty()) {
        return 'map'
      }
    }
  },
  watch: {
    // Update local model when the model prop change outside
    model: {
      handler: function (newVal) {
        this.localModel = newVal.clone()
        this.resolveModel()
      },
      deep: true
    },
    autofocus (newVal) {
      this.focusIsAutomatic = newVal
    }
  },
  methods: {
    inputFocused (event) {
      event.stopPropagation()
      event.preventDefault()
    },
    appendClicked(event) {
      console.log(event)
      event.stopPropagation()
      event.preventDefault()
    },
    /**
     * Handle the click on the pick a place btn
     */
    pickPlaceClick (event) {
      this.showInfo(this.$t('placeInput.clickOnTheMapToSelectAPlace'))
      this.localModel = new Place()
      this.setPickPlaceSource()
      if(this.$lowResolution) {
        this.$store.commit('setLeftSideBarIsOpen', false)
      }
      event.stopPropagation()
      event.preventDefault()
    },
    /**
     * Set the pick place input source
     * @uses index 
     * @uses predictableIda
     */
    setPickPlaceSource () {
      if (this.pickPlaceSupported) {
        this.$store.commit('pickPlaceIndex', this.index)
        this.$store.commit('pickPlaceId', this.predictableId)
      }
    },
    /**
     * Empty the pick place source
     */
    emptyPickPlaceSource () {
      this.$store.commit('pickPlaceIndex', null)
      this.$store.commit('pickPlaceId', null)   
    },
    /**
     * Run search if in search mode or resolve place if model is unresolved
     */
    resolveModel () {
      if (this.$store.getters.mode !== constants.modes.search && this.localModel.unresolved === true) {
        this.resolvePlace()
      }
    },
    /**
     * Resolve the coordinates of a place input index to a qualified location
     * @returns {Promise}
     */
    resolvePlace () {
      const place = this.localModel
      this.eventBus.$emit('showLoading', true)
      const context = this
      return new Promise((resolve, reject) => {
        context.searching = false
        place.resolve(this.$store.getters.appRouteData.options.zoom).then(() => {
          resolve(place)
        }).catch(err => {
          console.error(err)
          reject(err)
        }).finally(() => {
          context.searching = false
          context.eventBus.$emit('showLoading', false)
        })
      })
    },

    /**
     * Updates local suggestion list
     * @param {*} data
     */
    suggestionUpdated (data) {
      if (data.index === this.index) {
        this.localModel.suggestions = data.suggestions
      }
    },

    /**
     * Search fora place based on the place input value at the given index
     * @param {*} index
     */
    autocompleteSearch () {
      // Make sure that the local model is up to date
      if (this.localModel.placeName.length === 0) {
        this.localModel = this.model.clone()
      }
      if (this.localModel.nameIsCoord()) {
        this.autocompleteByCoords()
      } else {
        this.autocompleteByName()
      }
    },

    /**
     * Search a place by name
     *
     */
    autocompleteByName () {
      this.searching = true
      if (!this.localModel.placeName || this.model.placeName.length === 0) {
        this.localModel = new Place()
        this.searching = false
      } else {
        const context = this

        // Run the place search
        this.eventBus.$emit('showLoading', true)
        PlacesSearch(this.localModel.placeName, 10).then(places => {
          context.localModel.setSuggestions(places)
          context.focused = true
          this.focusIsAutomatic = false
          if (places.length === 0) {
            context.showInfo(context.$t('placeInput.noPlaceFound'))
          }
        }).catch(response => {
          console.log(response)
          context.showError(context.$t('placeInput.unknownSearchPlaceError'))
        }).finally(() => {
          context.searching = false
          context.eventBus.$emit('showLoading', false)
        })
      }
    },

    /**
     * Automplete input by coordinates
     *
     */
    autocompleteByCoords () {
      const latlng = this.localModel.getLatLng()
      this.eventBus.$emit('showLoading', true)
      const context = this
      ReverseGeocode(latlng.lat, latlng.lng, 10).then(places => {
        const place = new Place(latlng.lng, latlng.lat)
        place.setSuggestions(places)
        context.localModel = place
        context.focused = true
        this.focusIsAutomatic = false
      }).catch(response => {
        console.log(response)
      }).finally(() => {
        context.searching = false
        context.eventBus.$emit('showLoading', false)
      })
    },

    /**
     * Handles the input change with a debounce
     * @param {*} event
     */
    changed (event = null) {
      if (event) {
        const isPasteEvent = event instanceof ClipboardEvent
        // In case of a ClipboardEvent (ctr + v)
        // we must just ignore, since the input
        // model  has not changed yet and it will 
        // trigger another change event when it changes
        if (!isPasteEvent) {
          event.preventDefault()
          event.stopPropagation()
          clearTimeout(this.debounceTimeoutId)
          const context = this

          // Make sure that the changes in the input are debounced
          this.debounceTimeoutId = setTimeout(function () {
            if (context.supportSearch && (event.key === 'Enter')) {
              context.focused = false
              if (context.searchAvailable) {
                context.sendToSearchMode()
              } else {
                context.autocompleteSearch()
              }
            } else {
              context.autocompleteSearch()
            }
          }, 1000)
        }
      }
    },

    /**
     * Send the app to search mode
     */
    sendToSearchMode () {
      if (!this.model.placeName || this.model.placeName.length === 0) {
        this.showError(this.$t('placeInput.pleaseTypeSomething'))
        return
      } else {
        const previousMode = this.$store.getters.mode
        this.$store.commit('mode', constants.modes.search)
        const appMode = new AppMode(this.$store.getters.mode)
        const route = appMode.getRoute([this.localModel])
        this.$router.push(route)
        if (previousMode === constants.modes.search) {
          this.$emit('searchChanged')
        }
      }
    },

    /**
     * Set a a suggested place as the selected one for a given place input
     * @param {Place} place
     */
    selectPlace (place) {
      // We shall not reassign an external object, so we update each property
      this.model.placeName = place.properties.label || place.placeName
      this.model.placeId = place.properties.id
      this.model.setLnglat(place.lng, place.lat)
      this.model.properties = place.properties
      this.model.suggestions = []
      this.searching = false
      // If a place is selected from a suggestion
      // then no current location must be active.
      this.$store.commit('currentLocation', null)
    },

    /**
     * Set a suggestion item clicked as selected and emit the selected event
     * @param {Place} suggestedPlace
     */
    suggestionClicked (suggestedPlace) {
      // Only proceeed if it is being selected
      // a place different from the current one
      if (!suggestedPlace.equals(this.model)) {
        // If the suggested place is a ra coordinate, remove the layer attribute
        // because it is a placeholder, not a valid layer
        if (suggestedPlace.rawCoordinate) {
          delete suggestedPlace.properties.layer
        }
        this.selectPlace(suggestedPlace)
        this.$forceUpdate()
        this.selected()
      }
    },

    /**
     * Run the place selection hook and emit the selected event
     */
    selected () {
      this.focused = false
      let data =  { index: this.index, place: this.model, single: this.single }
      
      let expectedPromise = this.$root.appHooks.run('placeSelected', data)
      let context = this
      // If a promise is returned
      if (expectedPromise instanceof Promise) {
        expectedPromise.then(() => {
          context.$emit('selected', data)
        }).catch (err => {
          console.log(err)
        })
      } else { // if nothing was returned, just proceed
        context.$emit('selected', data)
      }      
      this.$forceUpdate()
    },

    /**
     * Check if a value is empty
     * @param {*} val
     * @returns boolean
     */
    isEmpty (val) {
      return (val === undefined || val == null || val.length <= 0)
    },

    /**
     * Deal with the remove a place input click 
     * by hidden the floating menu (if visible)
     * and by emitting the corresponding event
     */
    deletePlace () {
      this.placeInputFloatingMenu = false // When a place is removed we have to make sure that the floating menu is hidden
      this.$emit('delete', this.index)
    },

    /**
     * Deal with the start directions button click 
     * by emitting the corresponsing event
     */
    startDirections () {
      this.$emit('startDirections')
    },

    /**
     * Reset a place input at a given index
     * @param {*} index
     */
    placeCleared () {
      if (!this.model.isEmpty()) {
        this.$emit('cleared', this.index)
      }
      this.localModel = new Place()
      this.setFocus(true)
    },
    /**
     * Set the current input as having the focus
     * @param {*} data can be a boolean value or an Event. 
     * If it is the second case, we consider it as false
     */
    setFocus (data) {      
      // When the user clicks outside an input
      // this method is called and is intended to
      // set the focus as false in rhis case.
      // To do so, we check if the was previously focused
      // The parameters passed (automatically) by the click-outside
      // is expected to be MouseEvent object and no a boolean.
      if (typeof data === 'object' && data.clickedOutside) {
        if (this.inputWasActiveAndLostFocus(data)) {
          this.emptyPickPlaceSource()          
          this.focused = false
        }
      } else {
        this.focused = data // data is boolean in this case
        // If the input is focused, set the pick place source 
        this.setPickPlaceSource()  
      }
      // Once the focused was set to true based on a user
      // interaction event then it is not anymore in automatic mode
      if (this.focused) {
        this.focusIsAutomatic = false
      }
      // If the app is in the search mode, then run
      // the autocompleteSearch that will show the suggestions
      if (this.focused && this.$store.getters.mode === constants.modes.search) {
        this.autocompleteSearch()
      }
    },
    /**
     * Determines if the current place input was clicked outside
     * @returns {Boolean}
     */
    inputWasActiveAndLostFocus (event) {
      let isThisInputStored = this.$store.getters.pickPlaceIndex === this.index && this.$store.getters.pickPlaceId === this.predictableId
      let thisElIdWasOutsided = event.outsideEl.id === this.predictableId
      // Check if it matches the conditions
      if (thisElIdWasOutsided && isThisInputStored) {
        return true
      }
    },

    /**
     * Defines the place input values at the given index based in the browser location api
     * It will requires the users' authorization to access the browser location. Id denied
     * will show a toaster with an error message
     */
    setLocationFromBrowser () {
      this.focused = false
      const context = this

      // Se place function that receives
      // a location and builds a selectable place
      // and run functions to upate the view
      const setPlace = (location) => {
        let place = new Place(location.lng, location.lat, context.$t('placeInput.yourLocation'), {properties: {layer: 'venue'}})
        context.selectPlace(place)
        context.selected()
        context.$forceUpdate()
      }

      // Acquire location from browser
      GeoUtils.getBrowserLocation().then((location) => {
        setPlace(location)
      }).catch(error => {
        // Check if there is a location already determined by yhe ip addres
        // if so, use the ip based location to resolve the broser location
        if (context.$store.getters.currentLocation) {
          setPlace(context.$store.getters.currentLocation)
          context.showWarning(context.$t('placeInput.couldNotDetermineYourPreciseLocationUsingPreviousLocation'))
        } else {
          console.log(error)
          this.showError(this.$t('placeInput.couldNotDetermineYourLocation'))
        }
      })
    },
    /**
     * Switches the coords order
     *
     * @returns void
     */
    switchCoords () {
      if (this.model.nameIsCoord()) {
        let coordinates = this.model.getCoordsFromName()
        let switchedCords = coordinates.reverse()
        this.model.setLnglat(switchedCords[0], switchedCords[1])
        this.model.setCoordsAsName()
        this.localModel = this.model.clone()
        this.autocompleteByCoords()
      }
    },

    /**
     * Get the distance between the current map center and a suggestion location
     * @param {*} suggestedPlace
     */
    distance (suggestedPlace) {
      // Set origin and destination
      const fromLatlng = { lat: this.$store.getters.mapCenter.lat, lng: this.$store.getters.mapCenter.lng }
      const toLatlng = { lat: suggestedPlace.lat, lng: suggestedPlace.lng }

      // calculate the distance between the two points
      let distance = GeoUtils.calculateDistanceBetweenLocations(fromLatlng, toLatlng, this.$store.getters.mapSettings.unit)

      if (distance > 0) {
        distance = distance.toFixed(1)
      } else {
        distance = 0
      }
      return distance
    },
    /**
     * Toggle the input/place direct mode
     * by setting the value on the place input model
     */
    toggleDirect() {
      this.model.direct = !this.model.direct
      let data = { index: this.index, place: this.model }
      this.$emit('changedDirectPlace', data)
    },
    getNewGuid (prefix) {
      let guid = utils.guid(prefix)
      return guid
    }
  }
}
