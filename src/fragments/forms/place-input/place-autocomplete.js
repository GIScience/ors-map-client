import {PlacesSearch, ReverseGeocode} from '@/support/ors-api-runner'
import Utils from '@/support/utils'
import GeoUtils from '@/support/geo-utils'
import appConfig from '@/config/app-config'
import {EventBus} from '@/common/event-bus'
import Job from '@/models/job'
import Vehicle from '@/models/vehicle'
import Place from '@/models/place'

export default {
  data: () => ({
    model: new Place(),
    localModel: null,
    editSource: null,
    focused: false,
    searching: false,
    debounceTimeoutId: null,
    pickPlaceSupported: true,
    showEditBox: true
  }),
  props: {
    editId: {
      Type: Array,
      Required: true
    },
    jobs: {
      Type: Array[Job],
      Required: false
    },
    vehicles: {
      Type: Array[Vehicle],
      Required: false
    },
    newEndPoint: {
      Type: Boolean,
      Required: false
    },
    onlyStartPoint: {
      Type: Boolean,
      Required: false
    },
  },
  components: {
    EventBus
  },
  computed: {
    // Return an array with the place's suggestion based on the model suggestion data
    placeSuggestions () {
      if (!this.focused) {
        return []
      }
      let suggestions = []
      if (this.localModel.nameIsNumeric()) {
        const latLng = this.model.getLatLng()
        const rawCoordinatesPlace = new Place(latLng.lng, latLng.lat, `${latLng.lng},${latLng.lat}`, { properties: { layer: 'rawCoordinate' } })
        rawCoordinatesPlace.rawCoordinate = true
        suggestions.push(rawCoordinatesPlace)
      }
      suggestions = suggestions.concat(this.localModel.suggestions)
      return suggestions
    },
    appendBtn () {
      if (this.$lowResolution || this.localModel.isEmpty()) {
        return 'map'
      }
    }
  },
  created() {
    this.localModel = this.model.clone()
    this.getImgSrc = Utils.getImgSrc

    this.setSource()
  },
  methods: {
    setFocus (data) {
      // When the user clicks outside an input this method is called and is intended to
      // set the focus as false in this case. To do so, we check if the was previously focused
      // The parameters passed (automatically) by the click-outside is expected to be MouseEvent object and not a boolean.
      if (typeof data === 'object' && data.clickedOutside) {
        if (this.inputWasActiveAndLostFocus(data)) {
          this.emptyPickPlaceSource()
          this.focused = false
        }
      } else {
        this.focused = data // data is boolean in this case
      }
      // If the job location is in search mode, then run the autocompleteSearch that will show the suggestions
      if (this.focused) {
        this.autocompleteSearch()
      }
    },
    // set the parent source by checking which property was handed into this component
    setSource () {
      if (this.jobs) {
        this.editSource = 'jobs'
      } else if (this.newEndPoint) {
        this.editSource = 'vehicleEnd'
      } else if (this.vehicles) {
        this.editSource = 'vehicleStart'
      }
    },

    // Handle the click on the pick a place from the map btn
    pickPlaceMapClick (event) {
      this.showInfo(this.$t('placeInput.clickOnTheMapToSelectAPlace'))
      this.localModel = new Place()

      this.showEditBox = false
      EventBus.$emit('pickAPlace')

      this.setPickPlaceSource()
      event.stopPropagation()
      event.preventDefault()
    },
    // Set the pick place input source
    setPickPlaceSource () {
      if (this.pickPlaceSupported) {
        this.$store.commit('pickPlaceIndex', this.editId - 1)
        this.$store.commit('pickPlaceId', this.editId)
        this.$store.commit('pickEditSource', this.editSource)
      }
    },
    // Empty the pick place source
    emptyPickPlaceSource() {
      this.$store.commit('pickPlaceIndex', null)
      this.$store.commit('pickPlaceId', null)
      this.$store.commit('pickEditSource', null)
    },
    // highlight typed place name
    highlightedName (placeName) {
      let searchMask = this.localModel.placeName
      const regEx = new RegExp(searchMask, 'ig')
      let localPlaceName = this.localModel.placeName
      let replaceMask
      if ((placeName.toLowerCase()).indexOf(this.localModel.placeName.toLowerCase() + ' ') === 0) {
        localPlaceName = localPlaceName[0].toUpperCase() + localPlaceName.substring(1) + '&nbsp;'
      } else if ((placeName.toLowerCase()).indexOf(this.localModel.placeName.toLowerCase()) === 0 ) {
        localPlaceName = localPlaceName[0].toUpperCase() + localPlaceName.substring(1)
      } else if ((placeName.toLowerCase()).indexOf(this.localModel.placeName.toLowerCase()) > 0 ) {
        localPlaceName = '&nbsp;' + localPlaceName[0].toUpperCase() + localPlaceName.substring(1)
      }
      replaceMask = `<strong>${localPlaceName}</strong>`

      placeName = placeName.replace(regEx, replaceMask)
      return placeName.trim()
    },
    showAreaIcon (place) {
      return place.properties.layer === 'country' || place.properties.layer === 'region'
    },
    // Get layer translation based on the layer name or fall back to a default one if not available
    getLayerTranslation (layer) {
      let transKey = 'global.layers.'+ layer
      let translation = this.$t(transKey)
      if (translation !== transKey) {
        return translation
      } else {
        return this.$t('global.layers.notAvailable')
      }
    },
    // Get the distance between the current map center and a suggestion location
    distance (suggestedPlace) {
      // Set origin and destination
      const fromLatLng = { lat: this.$store.getters.mapCenter.lat, lng: this.$store.getters.mapCenter.lng }
      const toLatLng = { lat: suggestedPlace.lat, lng: suggestedPlace.lng }

      // calculate the distance between the two points
      let distance = GeoUtils.calculateDistanceBetweenLocations(fromLatLng, toLatLng, this.$store.getters.mapSettings.unit)

      if (distance > 0) {
        distance = distance.toFixed(1)
      } else {
        distance = 0
      }
      return distance
    },
    // Set a suggestion item clicked as selected and emit the selected event
    selectSuggestion (suggestedPlace) {
      // Only proceed if it is being selected
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
    // Set a suggested place as the selected one for a given place input
    selectPlace (place) {
      // We shall not reassign an external object, so we update each property
      this.model.placeName = place.properties.label || place.placeName
      this.model.placeId = place.properties.id
      this.model.setLngLat(place.lng, place.lat)
      this.model.properties = place.properties
      this.model.suggestions = []
      this.searching = false
      // If a place is selected from a suggestion then no current location must be active.
      this.$store.commit('currentLocation', null)
    },
    // Run the place selection hook and emit the selected event
    selected () {
      this.focused = false
      if (this.editSource === 'jobs') {
        this.jobs[this.editId-1].location = this.model.coordinates
      } else if (['vehicleStart', 'vehicleEnd'].includes(this.editSource)) {
        if (!this.newEndPoint) {
          if (this.onlyStartPoint) {
            this.vehicles[this.editId-1].start = this.model.coordinates
            this.onlyStartPoint = false
          } else {
            this.vehicles[this.editId-1].start = this.model.coordinates
            this.vehicles[this.editId-1].end = this.model.coordinates
          }
        } else {
          this.vehicles[this.editId-1].end = this.model.coordinates
          this.newEndPoint = false
        }
      }
    },
    // Handles the input change with a debounce-timeout
    locationInputChanged (event = null) {
      this.localModel = this.model.clone()
      if (event) {
        const isPasteEvent = event instanceof ClipboardEvent
        // In case of a ClipboardEvent (ctr + v) we must just ignore, since the input
        // model  has not changed yet, and it will trigger another change event when it changes
        if (!isPasteEvent) {
          event.preventDefault()
          event.stopPropagation()
          clearTimeout(this.debounceTimeoutId)
          const context = this

          // Resolve the model using a debounce to avoid unnecessary sequential requests
          // Make sure that the changes in the input are debounced
          this.debounceTimeoutId = setTimeout(function () {
            if (context.localModel.nameIsNumeric()) {
              let latLng = context.localModel.getLatLng()
              context.model.setLngLat(latLng.lng, latLng.lat)
            }
            if (event.key === 'Enter') {
              context.focused = false
              // We can only try to auto select the first result if the inputted text is not a coordinate
              if (!context.localModel.nameIsNumeric()) {
                if (appConfig.autoSelectFirstExactAddressMatchOnSearchEnter) {
                  EventBus.$emit('showLoading', true)
                  PlacesSearch(context.localModel.placeName, 10).then(places => {
                    // If the first result is an address and the match_type is exact, then we auto select the first item on the enter/return action
                    const addresses = context.lodash.filter(places, (p) => {
                      return (p.properties.layer === 'address' || p.properties.layer === 'postalcode') && p.properties.match_type === 'exact'
                    })

                    if (addresses.length === 1) {
                      context.selectSuggestion(addresses[0])
                    } else { // if not call the search handler
                      context.autocompleteSearch()
                    }
                  }).catch(response => {
                    console.log(response)
                    // In case of any fail, call the search mode handler
                    context.autocompleteSearch()
                  }).finally(() => {
                    EventBus.$emit('showLoading', false)
                  })
                } else {
                  context.autocompleteSearch()
                }
              } else { // If a coordinate was inputted, call the auto complete
                context.autocompleteSearch()
              }
            } else {
              context.autocompleteSearch()
            }
          }, 1000)
        }
      }
    },
    // Search for a place based on the place input value
    autocompleteSearch () {
      // Make sure that the local model is up-to-date
      if (!this.localModel || this.localModel.placeName.length === 0) {
        this.localModel = this.model.clone()
      }
      if (this.localModel.nameIsNumeric()) {
        const latLng = this.model.getLatLng()
        EventBus.$emit('showLoading', true)
        const context = this
        ReverseGeocode(latLng.lat, latLng.lng, 10).then(places => {
          const place = new Place(latLng.lng, latLng.lat)
          place.setSuggestions(places)
          context.localModel = place
          context.focused = true
          this.focusIsAutomatic = false
          if (places.length > 1) {
            Utils.hideMobileKeyboard()
          }
          context.$emit('autocompleted')
        }).catch(response => {
          console.log(response)
        }).finally(() => {
          context.searching = false
          EventBus.$emit('showLoading', false)
        })
      } else {
        this.searching = true
        if (!this.localModel.placeName || this.model.placeName.length === 0) {
          this.localModel = new Place()
          this.searching = false
        } else {
          const context = this
          // Run the place search
          EventBus.$emit('showLoading', true)
          PlacesSearch(this.localModel.placeName, 10).then(places => {
            context.localModel.setSuggestions(places)
            context.focused = true
            this.focusIsAutomatic = false
            if (places.length === 0) {
              context.showInfo(context.$t('placeInput.noPlaceFound'))
            } else if (places.length > 1) {
              Utils.hideMobileKeyboard()
            }
            context.$emit('autocompleted')
          }).catch(response => {
            console.log(response)
            context.showError(context.$t('placeInput.unknownSearchPlaceError'))
          }).finally(() => {
            context.searching = false
            EventBus.$emit('showLoading', false)
          })
        }
      }
    },
  }
}
