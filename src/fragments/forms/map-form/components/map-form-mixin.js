import MapViewDataBuilder from '@/support/map-data-services/map-view-data-builder'
import OrsFilterUtil from '@/support/map-data-services/ors-filter-util'
import OrsMapFilters from '@/config/ors-map-filters'
import AppRouteData from '@/models/app-route-data'
import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
import Place from '@/models/place'
import {EventBus} from '@/common/event-bus'

export default {
  props: {
    active: {
      default: true,
      type: Boolean
    }
  },
  watch: {
    active: function (newVal) {
      this.activeChanged(newVal)
    }
  },
  computed: {
    /**
     * Provides an accessor to the ors map filters object
     * @return {Object} OrsMapFilters
     */
    OrsMapFiltersAccessor() {
      return OrsMapFilters
    },
    /**
     * Get the avoid_polygons filter on the ors-filters array
     * @returns {Object}
     */
    avoidPolygonsFilterAccessor() {
      const filterRef = OrsFilterUtil.getFilterRefByName(constants.avoidPolygonsFilterName)
      return filterRef
    },
    /**
     * Determines if the sidebar is open
     * @returns {Boolean}
     */
    isSidebarOpen() {
      return this.$store.getters.isSidebarVisible
    }
  },
  methods: {
    /**
     * If the active state changes
     * reset the places array
     * @param {Boolean} isActive
     */
    activeChanged(isActive) {
      if (isActive) {
        // this.places = [new Place()]
      }
    },
    /**
     * Toggle round trip
     */
    toggleRoundTrip() {
      this.roundTripActive = !this.roundTripActive
    },
    /**
     * Add a place input
     * @param place object
     */
    addPlaceInput(place = null) {
      place = place || new Place()
      this.places.push(place)
    },
    /**
     * Remove a place input at a given index as a result of user remove input action
     * @param {*} index
     */
    removePlaceInput(index) {
      this.places.splice(index, 1)
      this.mapViewData.places = this.places
      // If there are no more places, then
      // there may not be routes
      if (!this.mapViewData.hasPlaces()) {
        this.mapViewData.routes = []
      }
      this.updateAppRoute()
    },

    /**
     * Get place input objects from place inputs that are filled
     * @returns {Array} of filled places
     */
    getFilledPlaces() {
      let filledPlaces = Place.getFilledPlaces(this.places)
      return filledPlaces
    },

    /**
     * When the user click on a mpa view marker and click to remove it
     *
     * @param {*} data {index: ..., place:...}
     */
    removePlace(data) {
      if (this.places[data.index]) {
        // call the specialized script method
        this.removePlaceInput(data.index)
        this.updatePlaceView(data.index)
      }
    },
    /**
     * Set the visibility of the sidebar depending on the screen breakpoint, embed mode and app mode
     * @param open boolean|null
     */
    setSidebarIsOpen(open) {
      if (typeof open !== 'boolean' && !this.$store.getters.embed) {
        let filledPlaces = Place.getFilledPlaces(this.places).length
        let startDirections = this.$store.getters.mode === constants.modes.directions && filledPlaces === 1 && !this.$store.getters.pointerTriggeredAction
        open = this.$store.getters.leftSideBarPinned || this.$mdAndUpResolution || startDirections
      }
      this.$store.commit('pointerTriggeredAction', null)
      this.$store.commit('setLeftSideBarIsOpen', open)
    },
    /**
     * Reset the places input to its default status (only one empty input)
     */
    clearPlaces() {
      this.places = []
      this.mapViewData = new MapViewData()
      this.addPlaceInput()
      this.$store.commit('appRouteData', new AppRouteData())
      this.$store.commit('mode', constants.modes.place)
      EventBus.$emit('mapViewDataChanged', this.mapViewData)
      EventBus.$emit('clearMap')
      this.updateAppRoute()
    },
    /**
     * Reverse the route places
     */
    reverseRoute() {
      this.places = this.places.reverse()
      this.updateAppRoute()
    },
    /**
     * Deal with the content uploaded
     * @param {*} data {content:..., options: ...}
     */
    contentUploaded(data) {
      const context = this
      data.options.translations = context.$t('global.units')
      MapViewDataBuilder.buildMapData(data, context.$store.getters.appRouteData).then((mapViewData) => {
        context.$store.commit('mode', mapViewData.mode)

        if (context.$lowResolution) {
          context.setSidebarIsOpen(true)
          // Emits the event that will be caught by the sidebar
          // and that will trigger the display of an info icon
          // on the right side of the main menu letting the user
          // know that there are new information
          EventBus.$emit('newInfoAvailable')
        }
        EventBus.$emit('mapViewDataChanged', mapViewData)
        setTimeout(() => {
          EventBus.$emit('mapViewDataUploaded', mapViewData)
          context.showSuccess(context.$t('mapForm.uploadedContentRendered'))
        }, 200)
      }).catch((error) => {
        console.error(error)
        context.showError(context.$t('mapForm.errorRenderingContentUploaded'))
      })
    },

    /**
     * Update the place input view
     * @param {*} index
     */
    updatePlaceView(index) {
      // Propagate place view notifies Vue, that an object inside an array has changed
      this.propagatePlaceChange(index)
      // Force a digest
      this.$forceUpdate()
    },

    /**
     * Let vue know that an item in an array has been updated
     * @param {*} index
     */
    propagatePlaceChange(index) {
      let place = this.places[index]
      if (place) {
        // Tell VueJS that the and object property (coordinates)  at the
        // given index has changed (so the view will be updated)
        let freshPlace = new Place(place.lng, place.lat, place.placeName)
        this.$set(this.places, index, freshPlace)

        // The above VueJS $set will remove all other parameters properties
        // so after executing it, we restore other properties of the parameter object
        for (let key in place) {
          if (key !== 'coordinates') {
            this.places[index][key] = place[key]
          }
        }
      } else {
        this.$set(this.places, index, new Place())
      }
    }
  }
}
