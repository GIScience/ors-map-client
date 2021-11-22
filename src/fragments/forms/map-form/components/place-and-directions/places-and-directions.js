import MapViewDataBuilder from '@/support/map-data-services/map-view-data-builder'
import FieldsContainer from '@/fragments/forms/fields-container/FieldsContainer'
import OrsParamsParser from '@/support/map-data-services/ors-params-parser'
import OrsFilterUtil from '@/support/map-data-services/ors-filter-util'
import PlaceInput from '@/fragments/forms/place-input/PlaceInput.vue'
import MapFormBtn from '@/fragments/forms/map-form-btn/MapFormBtn'
import { Directions } from '@/support/ors-api-runner'
import AppMode from '@/support/app-modes/app-mode'
import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
import appConfig from '@/config/app-config'
import GeoUtils from '@/support/geo-utils'
import Draggable from 'vuedraggable'
import Place from '@/models/place'
import lodash from 'lodash'

// Local components:
import AltitudePreview from './components/altitude-preview/AltitudePreview'
import RouteDetails from './components/route-details/RouteDetails.vue'
import PlaceDetails from './components/place-details/PlaceDetails.vue'
import RoundTrip from './components/round-trip/RoundTrip.vue'
import FormActions from '../form-actions/FormActions'
import MapFormMixin from '../map-form-mixin'

export default {
  mixins: [MapFormMixin],
  data: () => ({
    mapViewData: new MapViewData(),
    places: [new Place()],
    roundTripActive: false,
    placeFocusIndex: null
  }),
  components: {
    PlaceInput,
    PlaceDetails,
    RouteDetails,
    Draggable,
    FieldsContainer,
    AltitudePreview,
    RoundTrip,
    FormActions,
    MapFormBtn
  },
  created () {
    this.setListeners()
    this.loadData()
  },
  watch: {
    '$store.getters.isSidebarVisible': function (newVal) {
      if (newVal === true && this.places.length === 1) {
        this.setFocusedPlaceInput(0)
      }
    }
  },
  computed: {
    disabledActions () {
      return appConfig.disabledActionsForPlacesAndDirections
    },
    getPlaces () {
      if (this.places.length === 0) {
        this.addPlaceInput()
      }
      return this.places
    },
    /**
     * Return a boolean determining if the place details must be visible
     *
     */
    showPlaceDetails () {
      if (this.$store.getters.mode === constants.modes.place && this.mapViewData.places.length === 1 && !this.searching && !this.places[0].isEmpty() && this.mapViewData) {
        return true
      }
      return false
    },
    /**
     * Determines if a route is ready to be rendered
     * @returns boolean
     */
    routeReady () {
      let ready = false
      if (this.$store.getters.mode === constants.modes.directions) {
        ready = this.mapViewData && this.mapViewData.places.length > 1
      }
      return ready
    },
    /**
     * Determines if route details must be shown
     * @return {Boolean} show
     */
    showRouteDetails () {
      let show = false
      let summaryProp = lodash.get(this.mapViewData, `routes[${this.$store.getters.activeRouteIndex}].summary`)
      if (summaryProp)
        show = true
      return show
    },

    /**
     * Determines if the inputs support directions mode
     */
    inputSupportsDirections () {
      let supports = this.$store.getters.mode === constants.modes.place || this.$store.getters.mode === constants.modes.directions
      return supports
    },

    /**
     * Determines if altitude preview must be shown
     * @returns {Boolean} show
     */
    showAltitudePreview () {
      const show = this.mapViewData.hasRoutes() && this.$store.getters.mapSettings.elevationProfile === true && appConfig.showAltitudeOnSidebar
      return show
    }
  },

  methods: {
    /**
     * Add place input as a direct result of user interaction with the add place btn
     */
    addInput () {
      this.addPlaceInput()
      this.setFocusedPlaceInput(this.places.length - 1)
    },
    /**
     * Every time the appRouteData changes
     * and it has at least one place defined
     * the map data is reloaded, so we keep the
     * the map search and synchronized with the url
     */
    reloadAfterAppRouteDataChanged (appRouteData) {
      if (appRouteData && appRouteData.places.length > 0) {
        this.loadData()
      } else {
        this.places = [new Place()]
      }
    },

    /**
     * Update the value in the filter when a parameter is updated in form-fields
     * and then change the app route
     *
     * @param {*} data
     */
    filterUpdated (data) {      
      // Make sure that the OrsMapFilter object has the ost updated value
      if (data.value !== undefined) {
        if (data.parentIndex !== undefined) {
          let parent = OrsFilterUtil.getFilterByAncestryAndItemIndex(data.parentIndex, data.index)
          parent.value = data.value
        } else {
          this.OrsMapFiltersAccessor[data.index].value = data.value
        }
      }
      this.updateAppRoute()      
    },

    /**
     * Set the place focus index
     * @param {*} index
     */
    setFocusedPlaceInput(index) {
      this.placeFocusIndex = index
      setTimeout(() => {
        this.$forceUpdate()
      }, 200)
    },

    /**
     * Set event listeners
     */
    setListeners () {
      const context = this

      // When the simple map search send a place
      // set the sent place as the destination of a route
      this.eventBus.$on('openDirectionsMode', (place) => {
        context.setTargetPlaceForDirections(place)
        context.setViewMode(constants.modes.directions)
        context.updateAppRoute()
      })

      // When the simple map search sends a place
      // set the sent place as the destination of a route
      this.eventBus.$on('switchToDirections', () => {
        if (context.places.length === 1) {
          context.addPlaceInput()
        }
        if (context.places[0].isEmpty()) {
          context.setFocusedPlaceInput(0)
        } else {
          context.setFocusedPlaceInput(context.places.length - 1)
        }
      })

      // When a marker drag finishes, update
      // the place coordinates and re render the map
      this.eventBus.$on('markerDragged', (marker) => {
        if (context.active) {
          context.places[marker.inputIndex].setLnglat(marker.position.lng, marker.position.lat)
          // remove the name so that the resolve will use only the coordinates
          context.places[marker.inputIndex].placeName = ''
          // Resolve the place to update its name and properties
          context.places[marker.inputIndex].resolve().then(() => {
            // Only updates the app route if we are already in
            // directions or roundtrip mode
            if (context.$store.getters.mode !== constants.modes.place) {
              context.updateAppRoute()
            }
          })
        }
      })
      // When a marker is marked as a start place of
      // a direct segment
      this.eventBus.$on('directChanged', (data) => {
        if (context.active) {
          context.places[data.index] = data.place
          context.updateAppRoute()
        }
      })

      // When the filters object has changed externally, reprocess the app route
      this.eventBus.$on('filtersChangedExternally', () => {
        // Filters are only used to calculate route (directions or round trip)
        // so we must update the app route if we are already
        // in directions/round trip mode if all the place inputs are filled
        // and. If the app is, for example in place mode
        // there is nothing to be done
        let readyToDirections = (context.$store.getters.mode === constants.modes.directions)
        let hasRoundTripInAppRoute = lodash.get(context, '$store.getters.appRouteData.options.options.round_trip')
        let readyToRoundTrip = (context.$store.getters.mode === constants.modes.roundTrip && hasRoundTripInAppRoute)

        if (context.active && (readyToDirections || readyToRoundTrip)) {
          context.updateAppRoute()
        }
      })

      // When the user click on the map and select a point as the route start
      this.eventBus.$on('directionsFromPoint', (data) => {
        this.$store.commit('pointerTriggeredAction', true)
        context.directionsFromPoint(data)
      })

      // When the user click on the map and select a point as the route end
      this.eventBus.$on('directionsToPoint', (data) => {
        this.$store.commit('pointerTriggeredAction', true)
        context.directionsToPoint(data)
      })

      // When the user click on the map and select to add this point to the route
      this.eventBus.$on('addRouteStop', (data) => {
        this.$store.commit('pointerTriggeredAction', true)
        context.addRouteStop(data)
      })

      // When the user click on a marker to remove it
      this.eventBus.$on('removePlace', (data) => {
        if (context.active) {
          context.removePlaceInput(data, true)
        }
      })

      // When the user click on the map and select to add this point as an additional destination in the route
      this.eventBus.$on('addDestinationToRoute', (data) => {
        context.addDestinationToRoute(data)
      })

      // Avoid polygons changed, so recalculate the route
      this.eventBus.$on('avoidPolygonsChanged', (polygons) => {
        if (context.active) {
          context.$root.appHooks.run('avoidPolygonsChangedInDirections', polygons)
          context.avoidPolygonsFilterAccessor.value = polygons
          if (context.getFilledPlaces().length > 1) {
            context.updateAppRoute()
          }
        }
      })

      // If the app is in a low resolution mode
      // hide the sidebar when route sections are highlighted
      this.eventBus.$on('highlightPolylineSections', () => {
        const sidebarVisible = !context.$lowResolution
        context.setSidebarIsOpen(sidebarVisible)
      })

      // reload the map data after the app route has changed
      this.eventBus.$on('appRouteDataChanged', (appRouteData) => {
        context.reloadAfterAppRouteDataChanged(appRouteData)
      })

      // Update local object when a mapViewData is uploaded
      this.eventBus.$on('mapViewDataUploaded', (mapViewData) => {
        if (context.active) {
          context.mapViewData = mapViewData
          context.places = mapViewData.places
        }
      })
      /**
       * If the map data view has changed and this component
       * is not active, then reset its data to the initial state
       */
      this.eventBus.$on('mapViewDataChanged', () => {
        if (!context.active) {
          context.mapViewData = new MapViewData()
          context.places = [new Place()]
        }
      })

      this.eventBus.$on('setInputPlace', (data) => {
        if (context.active) {
          context.places[data.pickPlaceIndex] = data.place
          let filledPlaces = context.getFilledPlaces()
          if (context.places.length == filledPlaces.length && filledPlaces.length > 1) {
            context.updateAppRoute()
          } else {
            context.setSidebarIsOpen(true)
            context.$forceUpdate()
          }
        }
      })
    },

    /**
     * When the user click on the map and select a point as the route start
     * @param {*} latlng
     */
    directionsFromPoint (data) {
      // If there is already a place selected and
      // directions from a selected point is triggered
      // then we consider that the existing point is
      // the destination, and then goes to position 1
      let filledPlaces = this.getFilledPlaces()
      if (filledPlaces.length === 1) {
        this.places[1] = filledPlaces[0]
      }
      this.places[0] = data.place || new Place(data.latlng.lng, data.latlng.lat, '', { resolve: true })
      const context = this
      this.resolvePlace(this.places[0]).then(() => {
        context.setViewMode(constants.modes.directions)
        if (context.places.length === 1) {
          context.addPlaceInput()
        }
        context.updateAppRoute()
      
        if (context.places.length === 1) {
          setTimeout(() => {
            context.setFocusedPlaceInput(this.places.length - 1)
            if (context.$highResolution) {
              context.setSidebarIsOpen(true)
            }
          }, 200)
        }
      }).catch((err) => {
        console.log(err)
        context.showError(this.$t('placesAndDirections.notPossibleToCalculateRoute'), { timeout: 0 })
      })
    },

    /**
     * Resolve place based on its coordinates
     * retrieving more place data
     * @param {*} place
     * @returns {Promise}
     */
    resolvePlace (place) {
      let context = this
      return new Promise((resolve, reject) => {
        if (!place.unresolved) {
          resolve(place)
        } else {
          this.eventBus.$emit('showLoading', true)
          context.searching = true
          place.resolve(this.$store.getters.appRouteData.options.zoom).then(() => {
            resolve(place)
          }).catch(err => {
            console.error(err)
            reject(err)
          }).finally(() => {
            context.searching = false
            context.eventBus.$emit('showLoading', false)
          })
        }
      })
    },

    /**
     * When the user click on the map and select a point as the route ending
     * @param {*} data
     */
    directionsToPoint (data) {
      const toPlace = data.place || new Place(data.latlng.lng, data.latlng.lat, '', { resolve: true })
      let placeIndex = null
      if (this.places.length === 1) {
        this.addPlaceInput()
        placeIndex = 1
      } else { // if there are more than one input, the destination goes in at the last slot
        placeIndex = this.places.length - 1 
      }   
      this.places[placeIndex] = toPlace

      const context = this

      this.resolvePlace(this.places[placeIndex]).then(() => {
        context.setViewMode(constants.modes.directions)
        context.updateAppRoute()

        // It is necessary to wait a bit updateAppRoute
        // process before proceeding the place inputs
        // verification and changes
        setTimeout(() => {
          if (context.places.length === 1) {
            // After adding a place input it
            // is necessary to wait a bit
            // before reordering the places
            setTimeout(() => {
              context.places.reverse()
              context.setFocusedPlaceInput(0)
              if (context.$highResolution) {
                context.setSidebarIsOpen(true)
              }
            }, 200)
          }
        }, 200)
      }).catch((err) => {
        console.log(err)
        context.showError(this.$t('placesAndDirections.notPossibleToCalculateRoute'), { timeout: 0 })
      })
    },

    /**
     * When the user click on the map and select a point as the route start
     * @param {*} data {latlng: ..., place:...}
     */
    addDestinationToRoute (data) {
      this.places.push(new Place(data.latlng.lng, data.latlng.lat, '', { resolve: true }))
      const lastPlaceIdex = this.places.length - 1
      const context = this
      this.resolvePlace(this.places[lastPlaceIdex]).then(() => {
        context.updateAppRoute()
      }).catch((err) => {
        console.log(err)
        context.showError(this.$t('placesAndDirections.notPossibleToCalculateRoute'), { timeout: 0 })
      })
    },

    /**
     * When the user click on the map and select to add this point to the route
     *
     * @param {*} data {latlng: ..., place:...}
     */
    addRouteStop (data) {
      // Only one place input, so the selected point will be the 'from'
      if (this.places.length === 1) {
        this.directionsFromPoint(data)
      } else {
        let closestPlaceIndex = data.injectIndex
        if (closestPlaceIndex === null || closestPlaceIndex === undefined) {
          closestPlaceIndex = GeoUtils.getClosestPlaceIndex(data.latlng, this.places)
        }
        let convertStopAfterRouteEndingToDestination = this.$store.getters.mapSettings.convertStopAfterRouteEndingToDestination
        // If the selected point is after the last route point and
        // If `convertStopAfterRouteEndingToDestination`is not true, then the slot must
        // be decreased so that the stops happen before the destination
        if (closestPlaceIndex === this.places.length - 1 && !convertStopAfterRouteEndingToDestination) {
          closestPlaceIndex--
        }
        // In the other cases, we have to 'inject' a route point between the exiting points
        // To do that we add a place input, set its coordinates and then
        // we change the app url so that the route will be recalculated
        const injectedIndex = this.injectPlaceAndReturnIndex(data.latlng, closestPlaceIndex)
        const context = this
        this.resolvePlace(this.places[injectedIndex]).then(() => {
          context.updateAppRoute()
          context.setSidebarIsOpen()
        }).catch((err) => {
          console.log(err)
          context.showError(this.$t('placesAndDirections.notPossibleToCalculateRoute'), { timeout: 0 })
        })
      }
    },

    /**
     * Inject a place input at the closest place and return the chosen slot
     * @param {*} latlng
     * @param {*} closestPlaceIndex
     * @returns {Integer} slot index
     */
    injectPlaceAndReturnIndex (latlng, closestPlaceIndex) {
      const newPlaces = []
      const insertSlotPlaceIndex = closestPlaceIndex + 1

      const newLength = this.places.length + 1
      for (let index = 0; index < newLength; index++) {
        if (index === insertSlotPlaceIndex) {
          const place = new Place(latlng.lng, latlng.lat, '', { resolve: true })
          newPlaces.push(place)
        } else {
          const sourceIndex = index > insertSlotPlaceIndex ? index - 1 : index
          newPlaces.push(this.places[sourceIndex])
        }
      }
      this.places = newPlaces
      return insertSlotPlaceIndex
    },

    /**
     * Load the map data from the url
     * rebuilding the place inputs and it values
     * and render the map with these data (place or route)
     */
    loadData () {
      const validModes = [constants.modes.place, constants.modes.directions, constants.modes.roundTrip]
      this.places = this.$store.getters.appRouteData.places.slice(0)
      if (validModes.includes(this.$store.getters.mode) && this.places.length > 0) {
        // Gets the data extracted from the app route (from the url) and parse and populate
        // the values into the OrsMapFilters object that is used by OrsParamsParser
        // to build the request before run a call to the ors API
        OrsParamsParser.parseOptions(this.OrsMapFiltersAccessor, this.$store.getters.appRouteData.options)

        // The appRouteData options must be copied to
        // the mapViewData options, because it is used by the view
        Object.assign(this.mapViewData.options, this.$store.getters.appRouteData.options)

        this.updateMapViewAndData()
      }
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
      this.eventBus.$emit('mapViewDataChanged', this.mapViewData)
    },

    /**
     * Update map data by setting the view mode, 
     * and calculating the directions or seeing a single place state
     */
    updateMapViewAndData () {
      // This method does not deal with search mode, because when in search mode
      // th SimplePlaceSearch component will catch this case and list the results
      if (this.$store.getters.mode !== constants.modes.search) {
        const isRoundTrip = this.$store.getters.mode === constants.modes.roundTrip

        // Just enter here if we are dealing with directions round trip.
        // If there are more then 1 place, then it is directions mode.
        // If there is only one place and it is round trip, then we are also
        // dealing with directions, but an special directions (a round trip directions!)
        let context = this
        if (isRoundTrip && this.getFilledPlaces().length === 1) {
          this.calculateDirections().then((mapViewData) => {
            context.mapViewData = mapViewData
          })
        } else if (this.places.length > 1) {
          this.prepareDirectionsViewAndData()
        } else if (this.places.length === 1) {
          this.setViewMode(constants.modes.place)
          this.loadSinglePlace(0)
        }
      }
    },

    /**
     * Prepare the view and the data for the directions/routing mode
     * according the amount of filled places
     * @emits mapViewDataChanged
     */
    prepareDirectionsViewAndData () {
      this.setViewMode(constants.modes.directions)
      this.setSidebarIsOpen()
      this.eventBus.$emit('newInfoAvailable')

      // Only calculate a route if there are more then one place defined
      if (this.getFilledPlaces().length > 1) {
        let context = this
        this.calculateDirections().then((mapViewData) => {
          context.mapViewData = mapViewData
        })
      } else { // The app might be in directions mode, but containing for example, only the destination
        this.mapViewData.places = this.places
        this.eventBus.$emit('mapViewDataChanged', this.mapViewData)
      }
    },
    /**
     * Get the browser location and store it in our store
     * If fail, shows a toaster to the user
     * @param {*} location
     */
    setLocationFromBrowser (location) {
      this.$store.commit('browserLocation', location)
      this.myLocation = true

      // Build a place object to be used
      const placeName = this.$t('placesAndDirections.yourLocation')
      const place = new Place(location.lon, location.lat, placeName, {})

      // Adjust the data according the view mode
      if (this.$store.getters.mode === constants.modes.place && this.places[0].isEmpty()) {
        this.places[0] = place
        this.updateAppRoute()
      } else {
        this.addPlaceInput(place)
      }
    },

    /**
     * When the user reorder the place inputs, recalculates thr route
     */
    onReordered () {
      // If the user has changed the order
      // and all place inputs are filled
      // we have to change the app route
      // and reload the map
      if (this.getFilledPlaces().length === this.places.length) {
        this.updateAppRoute()
      }
    },

    /**
     * Request and draw a route based on the value of multiples places input
     * @returns {Promise}
     */
    calculateDirections () {
      const context = this
      return new Promise((resolve) => {
        const places = context.getFilledPlaces()

        if (places.length > 1 || context.$store.getters.mode === constants.modes.roundTrip) {
          context.showInfo(context.$t('placesAndDirections.calculatingRoute'), { timeout: 0 })
          context.eventBus.$emit('showLoading', true)

          // Calculate the route
          Directions(places).then(data => {
            data.options.translations = context.$t('global.units')
            data = context.$root.appHooks.run('beforeBuildDirectionsMapViewData', data)
            if (data) {
              MapViewDataBuilder.buildMapData(data, context.$store.getters.appRouteData).then((mapViewData) => {
                mapViewData.places = context.places // places from context have more fine data, so use it
                context.mapViewData = mapViewData
                context.eventBus.$emit('newInfoAvailable', true)
                context.showSuccess(context.$t('placesAndDirections.routeReady'), {timeout: 3})
                context.eventBus.$emit('mapViewDataChanged', mapViewData)
                context.setSidebarIsOpen()
                resolve(mapViewData)
              })
            }
          }).catch(result => {
            context.handleCalculateDirectionsError(result)
            context.mapViewData.places = context.places // in case of failure, use the places on the app context
            context.mapViewData.routes = []
            context.mapViewData.timestamp = new Date().getTime()
            context.eventBus.$emit('mapViewDataChanged', context.mapViewData)
          }).finally(() => {
            context.eventBus.$emit('showLoading', false)
          })
        } else {
          // There are no enough places or round trip to be routed
          resolve({})
        }
      })
    },

    /**
     * Handle the route places error response displaying the correct message
     * @param {*} result
     * @param {*} args
     */
    handleCalculateDirectionsError (result) {
      this.$root.appHooks.run('beforeHandleDirectionsError', result)

      const errorCode = this.lodash.get(result.response, constants.responseErrorCodePath)
      if (errorCode) {
        const errorKey = `placesAndDirections.apiError.${errorCode}`
        let errorMsg = this.$t(errorKey)
        if (errorMsg === errorKey) {
          errorMsg = this.$t('placesAndDirections.genericErrorMsg')
        }
        this.showError(errorMsg, { timeout: 0, mode: 'multi-line' })
        console.error('Original error', this.lodash.get(result, 'response.response.body.error'))
      } else {
        if (this.hasRouteFilters(result.args)) {
          this.showError(this.$t('placesAndDirections.notRouteFoundWithFilters'), { timeout: 0 })
        } else {
          this.showError(this.$t('placesAndDirections.notRouteFound'))
        }
        console.error(result)
      }
    },

    /**
     * Checks if the args used to a request has route filters
     *
     * @param {*} args
     * @returns {Boolean}
     */
    hasRouteFilters (args) {
      if (args.options || args.preference) {
        return true
      }
      return false
    },

    /**
     * Set the view mode
     * @param {String} mode directions|place|roundTrip|null
     */
    setViewMode (mode = null) {
      if (mode === null) {
        if (this.places.length === 1) {
          // Set roundTrip mode if appRouteData options contains round trip data
          if (this.lodash.get(this.$store.getters.appRouteData.options, constants.roundTripOptionsPath)) {
            mode = constants.modes.roundTrip
          } else {
            mode = constants.modes.place
          }
        } else {
          mode = constants.modes.directions
        }
      }
      this.$store.commit('mode', mode)
    },

    /**
     * When the user hits the start routing button
     * we switch the place index values so that the
     * first searched/selected place will be the the destination
     * of the route, or the place at the index 1
     */
    switchPlaceInputsValues () {
      const filled = this.getFilledPlaces()
      // If we are starting a route, the selected place must the be second one, the target
      if (filled.length === 1 && this.places.length === 2) {
        const place1 = this.places[1]
        this.places[1] = this.places[0]
        this.places[0] = place1
      }
    },

    /**
     * Prepare the form for the routing mode
     */
    startDirections () {
      this.addPlaceInput()
      this.setFocusedPlaceInput(this.places.length - 1)
      this.switchPlaceInputsValues()
      this.setViewMode(constants.modes.directions)
      this.eventBus.$emit('clearMap')
      this.updateAppRoute()
    },

    /**
     * Updates the current component places based in a place sent by other component
     * @param {Place} place
     */
    setTargetPlaceForDirections (place) {
      this.places = []
      this.addPlaceInput()

      if (!place.isEmpty()) {
        this.places[0] = place
        this.setFocusedPlaceInput(0)
        this.propagatePlaceChange(0)
        if (this.places.length === 1) {
          this.addPlaceInput()
          this.propagatePlaceChange(1)
        }
      }
      this.switchPlaceInputsValues()
    },

    /**
     * Remove a place input at a given index
     * @param {Object} data {index: Number, place: Place}
     * @param {Boolean} keepDirectionsMode
     */
    removePlaceInput (data, keepDirectionsMode = false) {
      let placeInputsBeforeRemoval = this.places.length
      this.places.splice(data.index, 1)

      // If the last place has the direct flag, set it to false
      if (this.places[data.index -1] && this.places[data.index -1].direct) {
        this.places[data.index -1].direct = false
      }
      // Set the view mode constants.modes.directions or constants.modes.place
      this.setViewMode()
      this.updateAppRoute()

      // If there was two inputs before one
      // place input removal, then the
      // updateAppRoute will switch to place
      // mode. To keep two place inputs
      // in order to allow the user to continue to
      // use the directions mode, add a place input
      if (keepDirectionsMode && placeInputsBeforeRemoval === 2) {
        this.eventBus.$emit('newInfoAvailable', false)
        setTimeout(() => {
          this.addInput()
          this.setViewMode(constants.modes.directions)
        }, 100)
      }
    },

    /**
     * After each change on the map form we redirect the user to a new route
     * the data will be loaded from the route and the map will be updated, keeping the
     * url synchronized with the current map status
     */
    updateAppRoute () {
      // It the app is tin the search mode but the only place name is
      // empty then switch to the default `place` mode
      if (this.$store.getters.mode === constants.modes.search && this.places[0].placeName === '') {
        this.setViewMode(constants.modes.place)
      }
      const appMode = new AppMode(this.$store.getters.mode)
      const route = appMode.getRoute(this.places)
      if (Object.keys(route.params).length > 1) { // params contains data and placeName? props
        this.$store.commit('cleanMap', this.$store.getters.appRouteData.places.length === 0)
        this.$router.push(route)
      }
    },

    /**
     * Load a single place into the map
     * @param {*} index
     */
    loadSinglePlace (index) {
      const filledPlaces = this.getFilledPlaces()
      this.setViewMode(constants.modes.place)

      // save current options in a temp object
      const options = this.mapViewData.options || {}

      // Create a MapViewData from scratch and set
      // places and options
      this.mapViewData = new MapViewData()
      this.mapViewData.mode = constants.modes.place
      this.mapViewData.places = [filledPlaces[index]]
      this.mapViewData.options = options

      // Notify the listeners that the MapViewData has changed
      this.eventBus.$emit('mapViewDataChanged', this.mapViewData)

      // Update the place view for the place input
      // at index 0 (the only one)
      this.updatePlaceView(0)
    },

    /**
     * Set a a suggested place as the selected one for a given place input
     * @param {*} data
     */
    selectPlace (data) {
      this.places[data.index] = data.place
      if (this.places.length === 1) {
        this.resetStateToSinglePlace()
      }
      const filledPlaces = this.getFilledPlaces()
      if (this.places.length === filledPlaces.length) {
        this.updateAppRoute()
      } else if (filledPlaces.length > 0) {
        this.mapViewData.places = filledPlaces
        this.eventBus.$emit('mapViewDataChanged', this.mapViewData)
      }
      this.searching = false
    },

    /**
     * When the direct property of a place changes
     * updates the app route so that a new route is
     * calculated
     * @param {*} data
     */
    changedDirectPlace (data) {
      this.places[data.index].direct = data.place.direct
      const filledPlaces = this.getFilledPlaces()
      if (this.places.length === filledPlaces.length && this.places.length > 1) {
        this.updateAppRoute()
      }
    },

    /**
     * Reset state to single place
     */
    resetStateToSinglePlace () {
      const appRouteData = this.$store.getters.appRouteData
      appRouteData.options = {}
      this.$store.commit('appRouteData', appRouteData)
      this.mapViewData = new MapViewData()
      this.eventBus.$emit('mapViewDataChanged', this.mapViewData)
    },
    /**
     * Reset a place input at a given index
     * @param {*} index
     */
    placeCleared (index) {
      this.places[index] = new Place()

      if (this.places.length === 1) {
        this.resetStateToSinglePlace()
      }
      this.searching = true
    },

    /**
     * Toggle the round trip state view mode
     * @param {Boolean} roundTripActive
     */
    toggleRoundTrip () {
      // If it is in roundTrip mode, we must be reset to single place mode
      // It it is in single place or directions mode, it must be reset
      // to single place. So, in all cases, we must run resetStateToSinglePlace
      this.mapViewData = new MapViewData()
      const appRouteData = this.$store.getters.appRouteData

      if (this.$store.getters.mode === constants.modes.roundTrip) {
        // Remove roundtrip from appRouteData if present
        let filterPath = `appRouteData.options.options[${constants.roundTripFilterName}]`
        if (this.lodash.get(appRouteData, filterPath)) {
          delete appRouteData.options.options[constants.roundTripFilterName]
        }
        this.$store.commit('appRouteData', appRouteData)
        this.setViewMode(constants.modes.place)
      } else {
        if (this.$store.getters.mode === constants.modes.directions) {
          appRouteData.places = this.places = this.getFilledPlaces().slice(0, 1)
          this.$store.commit('appRouteData', appRouteData)
        }
        this.setViewMode(constants.modes.roundTrip)
      }
      this.updateAppRoute()
    },

    /**
     * Handles the round trip filter change
     * If only one place is filled, update the app route
     */
    roundTripFilterChanged () {
      if (this.places.length === 1 && !this.places[0].isEmpty()) {
        this.updateAppRoute()
      }
    },

    /**
     * Determines if a place input at a given index must be focused
     * @param {*} index
     * @returns {Boolean}
     */
    autofocusEnabled (index) {
      let enabled = this.placeFocusIndex === index
      return enabled
    }
  }
}
