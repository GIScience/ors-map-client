/**
 * Simple Place Search component
 * @emits openDirectionsMode
 * @emits switchToDirections
 */

import PlaceInput from '@/fragments/forms/place-input/PlaceInput.vue'
import AppMode from '@/support/app-modes/app-mode'
import MapViewData from '@/models/map-view-data'
import { PlacesSearch } from '@/support/ors-api-runner'
import constants from '@/resources/constants'
import Place from '@/models/place'
import {EventBus} from '@/common/event-bus'

export default {
  data: () => ({
    rawResponse: null,
    place: new Place(),
    searching: false,
    extraProfilesOpen: false,
    myLocation: false,
    autoFocusOnMap: true,
    openingRouteMode: false,
    newInfoAvailable: false,
    showDirectionsBtnTooltip: false
  }),
  props: {
    height: {
      default: 65
    }
  },
  created () {
    this.setEventListeners()
    this.setPlace()
    this.loadData()
    this.setShowDirectionsBtnTooltip()
  },
  components: {
    PlaceInput
  },
  watch: {
    '$store.getters.isSidebarVisible': function () {
      this.setShowDirectionsBtnTooltip()
    }
  },
  computed: {
    visible () {
      let isVisible = this.$lowResolution
      if (this.$store.getters.isSidebarVisible) {
        isVisible = false
      }
      return isVisible
    },
    showNewInfo () {
      return this.newInfoAvailable
    },
    showRouteDetailsTooltip () {
      return this.showNewInfo && !this.$store.getters.isSidebarVisible
    }
  },

  methods: {
    setShowDirectionsBtnTooltip () {
      setTimeout(() => {
        this.showDirectionsBtnTooltip = !this.$store.getters.isSidebarVisible
      }, 1000)
    },
    /**
     * Se the place model if the app is in place mode,
     * and it there is only one place in appRouteData
     */
    setPlace () {
      const showPlaceNameModes = [constants.modes.place, constants.modes.roundTrip, constants.modes.search, constants.modes.isochrones]
      if (showPlaceNameModes.includes(this.$store.getters.mode) && this.$store.getters.appRouteData.places.length === 1) {
        this.place = this.$store.getters.appRouteData.places[0]
      }
    },
    /**
     * Every time the appRouteData changes,
     * and it has at least one place defined
     * the map data is reloaded, so we keep the
     * map search and synchronized with the url
     */
    reloadAfterAppRouteDataChanged (appRouteData) {
      if (appRouteData && appRouteData.places.length > 0) {
        this.loadData()
      }
    },
    /**
     * Set event listeners
     */
    setEventListeners () {
      const context = this
      // Set marker clicked event listener
      // When in search place mode, if the marker is clicked, we select it as the target
      // for the inputIndex
      EventBus.$on('markerClicked', (marker) => {
        const lat = marker.data.geometry.coordinates[1]
        const lng = marker.data.geometry.coordinates[0]
        const placeOptions = { resolve: false, id: marker.data.properties.id }
        const place = new Place(lng, lat, marker.label, placeOptions)
        this.selectPlace(place)
      })

      // When a marker drag finishes, update
      // the place coordinates and re-render the map
      EventBus.$on('markerDragged', (marker) => {
        context.place.coordinates = [marker.position.lng, marker.position.lat]
        context.loadData()
      })

      // reload the map data after the app route has changed
      EventBus.$on('appRouteDataChanged', (appRouteData) => {
        context.reloadAfterAppRouteDataChanged(appRouteData)
      })

      // When there are changes in the route and the
      // sidebar is not opened, notify visually that there
      // new data about the route calculated that can be seen
      // by opening the sidebar
      EventBus.$on('newInfoAvailable', (available) => {
        if (!context.$store.getters.isSidebarVisible) {
          context.newInfoAvailable = available
        }
      })

      EventBus.$on('searched', () => {
        if (!context.$store.getters.isSidebarVisible) {
          context.newInfoAvailable = true
        }
        context.$emit('searched')
      })

      EventBus.$on('refreshSearch', () => {
        context.refreshSearch()
      })

      // When the user click on a marker to remove it
      // and there is only one place
      EventBus.$on('removePlace', () => {
        if (context.$store.getters.mode === constants.modes.place) {
          context.place = new Place()
        }
      })
    },

    refreshSearch() {
      const appMode = new AppMode(this.$store.getters.mode)
      const newRoute = appMode.getRoute([this.place])

      // Only navigate to a new route if params has changed
      const zoomChanged =  Number(newRoute.params.zoom) !== Number(this.$route.params.zoom)
      const centerChanged = newRoute.params.center !== this.$route.params.center
      const termChanged = newRoute.params.term !== this.$route.params.term
      if (zoomChanged || termChanged || centerChanged) {
        this.$router.push(newRoute)
      }
    },

    /**
     * Load the map data from the url
     * rebuilding the place inputs, and it values
     * and render the map with these data (place or route)
     */
    loadData () {
      const places = this.$store.getters.appRouteData.places.slice(0)

      if (places.length === 1) {
        this.place = places[0]
      }
      if (this.$store.getters.mode === constants.modes.search) {
        if (!this.place.nameIsNumeric()) {
          let mapSettings = this.$store.getters.mapSettings
          mapSettings.mapCenter = this.$store.getters.appRouteData.options.center
          this.$store.dispatch('saveSettings', mapSettings).then(() => {
            this.search()
            this.$forceUpdate()
          })
        }
      } else {
        this.$forceUpdate()
      }

    },
    /**
     * When the menu btn is clicked, open the main
     * map form by setting the setLeftSideBarIsOpen
     */
    openMenu () {
      this.$store.commit('setLeftSideBarIsOpen', true)
      this.newInfoAvailable = false
    },

    inputFocused () {
      this.newInfoAvailable = false
    },

    /**
     * When there is already a place selected
     * and the route action is called, open the
     * sidebar and emit and event passing the current
     * place to the map-search component
     * @emits openDirectionsMode
     * @emits switchToDirections
     */
    openDirectionsMode () {
      this.$store.commit('setLeftSideBarIsOpen', true)
      // If the app is in search mode and the search has returned only one
      // place, then it is assumed that the directions button was hit and then
      // the only search result place must auto selected as target
      if (this.$store.getters.mode === constants.modes.search && this.mapViewData.places.length === 1) {
        this.place = this.mapViewData.places[0]
        EventBus.$emit('openDirectionsMode', this.place)
      } else {
        if (this.place.isEmpty()) { // place has no lat and lng
          // Make sure that the place will
          // not be resolved using its name
          // if it is empty when switching to directions
          // It must be resolved using its coordinates
          this.place.placeName = ''
          this.place.unresolved = false
          EventBus.$emit('switchToDirections')
        } else {
          EventBus.$emit('openDirectionsMode', this.place)
        }
      }
      this.openingRouteMode = true
      this.place = new Place()
    },

    /**
     * After each change on the map search we redirect the user to the built target app route
     * The data will be loaded from the path and the map will be updated, keeping the
     * url synchronized with the current map status
     */
    updateAppRoute () {
      if (this.$store.getters.mode !== constants.modes.directions && this.place.placeName === '') {
        this.$store.commit('mode', constants.modes.place)
      }
      const appMode = new AppMode(this.$store.getters.mode)
      const places = this.place.isEmpty() ? [] : [this.place]
      const route = appMode.getRoute(places)
      this.$router.push(route)
    },

    /**
     * Update map places to be displayed
     * @param {*} places
     */
    showSearchResults (places) {
      this.mapViewData = this.mapViewData || new MapViewData()
      this.mapViewData.places = places
      this.mapViewData.routes = []
      this.mapViewData.timestamp = Date.now()
      EventBus.$emit('mapViewDataChanged', this.mapViewData)
    },

    /**
     * Set a suggested place as the selected one for a given place input
     * @param {*} data - can be the place object or an object containing the place
     */
    selectPlace (data) {
      if (data.place) {
        this.place = data.place
      } else {
        this.place = data
      }

      this.$store.commit('mode', constants.modes.place)
      const appMode = new AppMode(this.$store.getters.mode)

      // Define new app route
      const route = appMode.getRoute([this.place])
      this.$store.commit('cleanMap', this.$store.getters.appRouteData.places.length === 0)
      this.$router.push(route)
    },

    /**
     * Reset the place input
     */
    placeCleared () {
      this.place = new Place()
      EventBus.$emit('clearMap')
      this.$forceUpdate()
      this.searching = true
      this.updateAppRoute()
    },

    /**
     * Search a place by name
     *
     */
    search () {
      this.searching = true
      const context = this

      // Run the place search
      EventBus.$emit('showLoading', true)
      PlacesSearch(this.place.placeName).then(places => {
        if (places.length === 0) {
          this.showInfo(this.$t('simplePlaceSearch.noPlaceFound'))
        } else {
          context.showSearchResults(places)
        }
      }).catch(response => {
        console.log(response)
        context.showError(context.$t('simplePlaceSearch.unknownSearchPlaceError'))
      }).finally(() => {
        context.searching = false
        EventBus.$emit('showLoading', false)
      })
    }
  }
}
