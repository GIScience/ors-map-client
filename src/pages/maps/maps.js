import SimplePlaceSearch from '@/fragments/forms/simple-place-search/SimplePlaceSearch'
import PlacesCarousel from '@/fragments/places-carousel/PlacesCarousel'
import OrsFilterUtil from '@/support/map-data-services/ors-filter-util'
import Settings from '@/fragments/forms/settings/Settings.vue'
import Altitude from '@/fragments/charts/altitude/Altitude'
import MapView from '@/fragments/map-view/MapView.vue'
import PolygonUtils from '@/support/polygon-utils'
import AppMode from '@/support/app-modes/app-mode'
import MapViewData from '@/models/map-view-data'
import resolver from '@/support/routes-resolver'
import About from '@/fragments/about/About.vue'
import RouteUtils from '@/support/route-utils'
import appConfig from '@/config/app-config'
import constants from '@/resources/constants'
import { ResizeObserver } from 'vue-resize'
import Place from '@/models/place'
import lodash from 'lodash'
import {EventBus} from '@/common/event-bus'

export default {
  data: () => ({
    minimumMapViewHeight: 100,
    mapViewGuid: null,
    myLocation: false,
    isAltitudeModalOpen: false,
    isSettingsOpen: false,
    isAboutOpen: false,
    simpleMapSearchHeight: 65,
    defaultZoom: appConfig.initialZoomLevel,
    mapViewData: new MapViewData(),
    bottomNavActive: false,
    bottomNavHeight: 310,
    mapHeightOffset: 60,
    activePlaceIndex: 0,
    viewHeight: null,
    touchmoveDebounceTimeoutId: null,
    searchBtnAvailable: false,
    firstLoad: true,
    refreshingSearch: false,
    localAvoidPolygons: [],
    previousMapViewDataTimeStamp: null
  }),
  components: {
    MapView,
    SimplePlaceSearch,
    Altitude,
    About,
    Settings,
    PlacesCarousel,
    ResizeObserver
  },
  computed: {
    showMapViewClickPopups () {
      let show = ((!this.$store.getters.isSidebarVisible || this.$highResolution) || (this.$highResolution && this.$store.getters.leftSideBarPinned)) && !this.showBottomNav
      return show
    },
    /**
     * Determines if the map controls
     * must be shown based on the current
     * view resolution and the shrink value
     * @returns {Boolean} show
     */
    showMapControls () {
      let show = true
      if ((this.$store.getters.isSidebarVisible && this.$lowResolution) || this.$store.getters.embed) {
        show = false
      }
      return show
    },

    /**
     * Returns a reference to the custom map controls container
     */
    customMapControlsContainerRef () {
      return this.$refs.customMapControlsContainer
    },

    /**
     * Return the local avoid polygons
     * @returns {Array}
     */
    avoidPolygons () {
      return this.localAvoidPolygons
    },
    /**
     * Determines if the simple search component is visible
     * based on the embed mode value, the mapReady state and the sidebar visibility state
     * @returns {Boolean} isVisible
     */
    simpleSearchIsVisible () {
      let isVisible = !this.$store.getters.embed && this.$store.getters.mapReady && !this.$store.getters.isSidebarVisible
      return isVisible
    },
    /**
     * Get the current routing profile icon, if available
     * @returns {Object}
     */
    currentProfileIcon () {
      if (this.mapViewData.options.profile) {
        let profile = this.mapViewData.options.profile
        const filterRef = OrsFilterUtil.getFilterRefByName(constants.profileFilterName)
        if (filterRef.mapping[profile]) {
          return filterRef.mapping[profile].icon
        } else {
          for (let key in filterRef.mapping) {
            let hasNestedProfiles = filterRef.mapping[key].nestedProfiles && filterRef.mapping[key].nestedProfiles.includes(profile)
            let hasVehicleType = filterRef.mapping[key].vehicleTypes && filterRef.mapping[key].vehicleTypes.includes(profile)
            if (hasNestedProfiles || hasVehicleType) {
              return filterRef.mapping[key].icon
            }
          }
        }
      }
    },
    /**
     * Determines the map view height based on the view height,
     * the bottom nav visibility and the map height offset
     * @returns {Number} height
     */
    mapHeight () {
      let height = this.viewHeight
      if (this.showBottomNav) {
        height = (this.viewHeight - this.bottomNavHeight + this.mapHeightOffset)
      }
      return height
    },
    /**
     * Returns the zoom level tha must be used based on
     * the app route options and the default zoom level
     * @returns {Number} zoom
     */
    zoom () {
      const zoom = this.$store.getters.appRouteData.options.zoom || this.defaultZoom
      return zoom
    },
    /**
     * Determines if the bottom nav must be visible based on
     * the availability of the bottom nav
     * @returns {Boolean}
     */
    showBottomNav () {
      return this.bottomNavActive && appConfig.supportsSearchBottomCarousel
    },
    /**
     * Returns the bottom nav element top position value
     * based on the view height and the bottom nav height
     * @returns {Number}
     */
    bottomNavTop () {
      return this.viewHeight - this.bottomNavHeight
    },
    /**
     * Determines if the refresh search should be visible
     * based on the app mode and if the search btn is available
     * @returns {Boolean} available
     */
    refreshSearchAvailable () {
      const available = this.$store.getters.mode === constants.modes.search && this.searchBtnAvailable
      return available
    },
    /**
     * Determines if the bounds of the map
     * must be fitted based on differ of the last mapViewDta timestamp
     * and if it is the firs load
     * @returns {Boolean} fit
     *
     */
    fitMapBounds () {
      if (this.mapViewData.timestamp
        && this.previousMapViewDataTimeStamp !== this.mapViewData.timestamp
        && this.$store.getters.mapSettings.alwaysFitBounds) {
        return true
      } else if (this.firstLoad && (this.$store.getters.mode !== constants.modes.place || !this.$store.getters.appRouteData.options.zoom)) {
        return true
      }
      return false
    },
    /**
     * Returns the map center based on the app route data
     * of this is available. If it is not available, returns null
     * @returns {Latlng|null}
     */
    mapViewCenter () {
      let center = null
      if (this.$store.getters.appRouteData.options.center) {
        center = this.$store.getters.appRouteData.options.center
      } else { // set the map center based on the only place available (if it is the case)
        const filledPlaces = this.lodash.filter(this.$store.getters.appRouteData.places, (p) => { if (!p.isEmpty()) { return p } })
        if (filledPlaces.length === 1) {
          center = {lat: filledPlaces[0].lat, lng: filledPlaces[0].lng}
        }
      }
      return center
    },
    /**
     * Returns a boolean determining if the drawing tool
     * is available based on the app mode
     * @returns {Boolean}
     */
    supportsDrawingTool () {
      const modeWithDrawingTools = [constants.modes.directions, constants.modes.roundTrip]
      // If the app is in one of the modes that supports drawing tool
      return modeWithDrawingTools.includes(this.$store.getters.mode)
    }
  },
  beforeRouteUpdate (to, from, next) {
    // Although the mode is defined in the beforeEnter route event
    // when te browser back button is pressed, and we are changing from
    // similar types of route - like directions with two places and
    // directions with one (for round trip), then the beforeEnter is not triggered
    if (to.fullPath.startsWith(resolver.directions())) {
      RouteUtils.setDirectionsModeBasedOnRoute(to)
    }
    next()
  },
  watch: {
    $route: function () {
      this.hideMessages()
      this.loadRoute()
      this.setModalState()
      this.loadAvoidPolygonsFromAppRoute()
    }
  },
  methods: {
    mapReady (mapObject) {
      if (mapObject) {
        this.$store.commit('mapReady', true)
        this.$root.appHooks.run('mapReady', {context: this.$refs.mapView, map: mapObject})
      } else {
        this.$store.commit('mapReady', false)
      }
    },
    /**
     * Stores the new zoom value and set the
     * searchBtnAvailable flag as true, since
     * once the map has been moved, the user may want to
     * refresh the search to get features within the
     * visible map view
     * @param {Object} { zoom: Object, map: Object, context: Object}
     */
    zoomChanged (data) {
      this.$root.appHooks.run('zoomChanged', data)
      this.storeZoomValue(data.zoom)
      // Set searchBtnAvailable as true if in search mode
      this.searchBtnAvailable = this.$store.getters.mode === constants.modes.search

      if (this.$store.getters.mode === constants.modes.place) {
        const appMode = new AppMode(this.$store.getters.mode)
        let places = this.getCurrentMapPlaces()
        const route = appMode.getRoute(places, {zoom: data.zoom})
        if (route.params && Object.keys(route.params).length > 0) { // params contains data and placeName? props
          this.$router.push(route)
        }
      }
    },
    /**
     * Set the refreshing search flag as true,
     * the searchBtnAvailable flag as false
     * and emits the refreshSearch event
     * @emits refreshSearch via EventBus
     */
    refreshSearch () {
      // the refresh search event will
      // trigger a flow that will make other
      // components to redo the search
      // and update the data. During this cycle
      // we need a flag that tells us we are on
      // this state so that the computed fitMapBounds
      // can avoid returning the `fitMapBounds` as true
      // what should not happen in the case that
      // the map bounds have been already defined by the user
      this.refreshingSearch = true
      this.searchBtnAvailable = false
      EventBus.$emit('refreshSearch')
    },
    /**
     * Get current map place center
     * @returns {Array} okf Places
     */
    getCurrentMapPlaces () {
      let places = this.$store.getters.appRouteData.places || []
      if (places.length === 0) {
        let centerPlace = new Place(this.$store.getters.mapCenter.lng, this.$store.getters.mapCenter.lat, 'null')
        places.push(centerPlace)
      }
      return places
    },
    /**
     * Defines if the searchBtnAvailable based on
     * how much the map has been moved
     * @param {Object} data
     */
    mapCenterMoved (data) {
      if (this.$store.getters.appRouteData.places.length === 0) {
        const appMode = new AppMode(this.$store.getters.mode)
        let places = this.getCurrentMapPlaces()
        const route = appMode.getRoute(places, {zoom: data.zoom})
        if (route.params && Object.keys(route.params).length > 0) { // params contains data and placeName? props
          this.$router.push(route)
        }
      }

      // Only enables the refresh search btn
      // if the map has been moved more than 500 meters
      if (data.distance > 500) {
        this.searchBtnAvailable = true
      }
    },
    /**
     * Save the new map center in mapSettings when it changes
     * and emit a mapCenterChanged event via EventBus
     * @param {*} latLng
     * @emits mapCenterChanged [via EventBus]
     */
    mapCenterChanged (latLng) {
      let context = this
      let mapSettings = this.$store.getters.mapSettings
      mapSettings.mapCenter = latLng
      this.$store.dispatch('saveSettings', mapSettings).then(() => {
        context.$root.appHooks.run('mapCenterChanged', mapSettings.mapCenter)
        EventBus.$emit('mapCenterChanged', mapSettings.mapCenter)
      })
    },
    /**
     * Set the view height using the inner height
     */
    setViewHeight () {
      this.viewHeight = window.innerHeight
    },
    /**
     * Refresh the view size using a debounce-timeout
     * it respond to touch event, so we just want
     * to apply the new size when the event ends
     */
    refreshViewSizeAfterTouchMode () {
      clearTimeout(this.touchmoveDebounceTimeoutId)
      const context = this

      // Make sure that the changes in the input are debounced
      this.touchmoveDebounceTimeoutId = setTimeout(function () {
        context.setViewHeight()
      }, 100)
    },
    /**
     * Deal with the marker click event
     * by opening the bottom nav, setting the active place
     * and running the setViewHeight
     * @param {*} place
     */
    markerClicked (place) {
      // At least 100px height must be available for the map view
      if ((window.innerHeight > this.bottomNavHeight + this.minimumMapViewHeight) && this.$store.getters.mode === constants.modes.search) {
        const index = place.findIndex(this.mapViewData.places)
        this.activePlaceIndex = index
        this.bottomNavActive = true
        this.setViewHeight()
      }
    },
    /**
     * Remove place
     * @param {*} data
     */
    removePlace (data) {
      EventBus.$emit('removePlace', data)
    },
    /**
     * Remove place
     * @param {*} data
     */
    directChanged (data) {
      EventBus.$emit('directChanged', data)
    },
    /**
     * Close bottom nav component
     */
    closedBottomNav () {
      this.bottomNavActive = false
      this.setViewHeight()
    },
    /**
     * Handle place index selected and emits event via EventBus
     * @param {*} index
     * @emits placeFocusChanged [via EventBus]
     */
    placeIndexSelectedInBottomNav (index) {
      EventBus.$emit('placeFocusChanged', this.mapViewData.places[index])
    },
    /**
     * Set the map view data object and emit an event to redraw the map
     * @param {MapViewData} mapViewData
     */
    setMapDataAndUpdateMapView (mapViewData) {
      this.searchBtnAvailable = false

      // If the previous state of mapViewData
      // already had places, then it is changing
      // from to a new set of data and is not
      // first load anymore
      if (this.mapViewData.hasPlaces() || this.mapViewData.hasPois()) {
        this.firstLoad = false
      }

      this.previousMapViewDataTimeStamp = this.mapViewData.timestamp

      // The mapViewData is watched by the map
      // component and its content re-rendered
      // when it changes. So, by changing it here
      // the map component is refreshed
      this.mapViewData = mapViewData

      // Once the mapViewData is changed, the
      // possible refreshing search event
      // cycle is concluded
      this.refreshingSearch = false
    },

    /**
     * Set the view height and the bottom nav status
     */
    setViewHeightAndBottomNav () {
      // Make sure that bottom nav is closed if the app is not in search mode
      // At list 100px must available for the map view
      if (this.$store.getters.mode === constants.modes.search && window.innerHeight > this.bottomNavHeight + 100) {
        this.bottomNavActive = true
        this.activePlaceIndex = this.activePlaceIndex || 0
        this.setViewHeight()
      } else {
        this.closedBottomNav()
      }
    },

    /**
     * Store the zoom level
     * @param {Number} zoom
     */
    storeZoomValue (zoom = null) {
      const appRouteData = this.$store.getters.appRouteData
      appRouteData.options = appRouteData.options || {}
      zoom = zoom || appRouteData.options.zoom || this.defaultZoom
      appRouteData.options.zoom = zoom
      this.$store.commit('appRouteData', appRouteData)
    },
    /**
     * Load route, store zoom value and mode and store appRouteData
     * @param {*} appRouteFrom
     * @emits appRouteDataChanged
     */
    loadRoute () {
      EventBus.$emit('clearMap')
      // After clearing the map, wait a bit to load the new route

      let appRouteData = false

      if (this.$store.getters.mode !== constants.modes.pageNotFound) {
        appRouteData = AppMode.decodePath(this.$route)
        if (appRouteData === false) { // if there is no app route data, load default state
          this.$router.push({name: 'Maps'})
        } else {
          // TODO: When the zoom changes, the map moves a bit!
          this.$store.commit('appRouteData', appRouteData)
          if (this.$route.name !== 'MapLocation') {
            this.storeZoomValue()
            EventBus.$emit('appRouteDataChanged', appRouteData)
          }
        }
      }
    },

    /**
     * Store the current map view guid
     * in a local property. so in case
     * there are more than one map (future)
     * we can check which map must be accessed
     * @param {*} mapViewGuid
     */
    orsMapCreated (mapViewGuid) {
      this.mapViewGuid = mapViewGuid
    },
    /**
     * When a marker has been dragged
     * emits the markerDragged event (via EventBus)
     * @param {Object} marker
     * @emits markerDragged via EventBus
     */
    markerDragged (marker) {
      EventBus.$emit('markerDragged', marker)
    },

    /**
     * When a directions from point is hit,
     * emit a directionsFromPoint event via EventBus.
     * The map-view component does not emit events via
     * EventBus, only local events to its container (this component)
     * @param {Object} data
     * @emits directionsFromPoint via EventBus
     */
    directionsFromPoint (data) {
      EventBus.$emit('directionsFromPoint', data)
    },
    /**
     * Trigger directions based on the data passed
     * that includes a Place by clearing the map
     * and by emitting the directionsToPoint event (via EventBus)
     * The map-view component does not emit events via
     * EventBus, only local events to its container (this component)
     * @param {Object} data {place: Place}
     */
    directionsToPoint (data) {
      EventBus.$emit('clearMap')
      setTimeout(() => {
        this.mapViewData.places = [data.place]
        EventBus.$emit('directionsToPoint', data)
      }, 100)
      this.bottomNavActive = false
    },

    /**
     * Check if the data contains the pick place index
     * and emits the setInputPlace via EventBus
     * @param {*} data
     * @emits setInputPlace
     */
    setInputPlace (data) {
      if (data.pickPlaceIndex !== null) {
        EventBus.$emit('setInputPlace', data)
      }
    },
    /**
     * Navigate the app to the single place mode
     * @param {Place} place
     */
    gotToPlace (place) {
      this.$store.commit('mode', constants.modes.place)
      const appMode = new AppMode(this.$store.getters.mode)

      // Define new app route
      const route = appMode.getRoute([place])
      this.$store.commit('cleanMap', this.$store.getters.appRouteData.places.length === 0)
      this.$router.push(route)
      this.$store.commit('setLeftSideBarIsOpen', true)
      this.bottomNavActive = false
    },
    /**
     * When an `add isochrones center` option is hit,
     * emits an addAsIsochroneCenter event via EventBus.
     * The map-view component does not emit events via
     * EventBus, only local events to its container (this component)
     * @param {Object} data
     * @emits addAsIsochroneCenter via EventBus
     */
    addAsIsochroneCenter (data) {
      EventBus.$emit('addAsIsochroneCenter', data)
    },

    /**
     * When an `add route stop` option is hit,
     * emits an addRouteStop event via EventBus.
     * The map-view component does not emit events via
     * EventBus, only local events to its container (this component)
     * @param {Object} data
     * @emits addRouteStop via EventBus
     */
    addRouteStop (data) {
      EventBus.$emit('addRouteStop', data)
    },
    /**
     * When an `add destination to route` option is hit,
     * emits an addDestinationToRoute event via EventBus.
     * The map-view component does not emit events via
     * EventBus, only local events to its container (this component)
     * @param {Object} data
     * @emits addDestinationToRoute via EventBus
     */
    addDestinationToRoute (data) {
      EventBus.$emit('addDestinationToRoute', data)
    },
    /**
     * Set the `settings` open flag as false
     * and if the current route is MapSettings
     * clear the map and redirect the app the
     * `Maps` route
     */
    closeSettingsModal () {
      this.isSettingsOpen = false
      if (this.$route.name === 'MapSettings') {
        this.$store.commit('cleanMap', true)
        this.$router.push({ name: 'Maps' })
      }
    },
    /**
     * Set the `about` open flag as false
     * and if the current route is MapSettings
     * clear the map and redirect the app the
     * `Maps` route
     */
    closeAboutModal () {
      this.isAboutOpen = false
      if (this.$route.name === 'MapAbout') {
        this.$store.commit('cleanMap', true)
        this.$router.push({ name: 'Maps' })
      }
    },
    /**
     * When an avoid polygons option changes,
     * merge the avoid-polygons-array into a multiPolygon and
     * emits an avoidPolygonsChanged event via EventBus.
     * @param {Array} polygons
     * @emits avoidPolygonsChanged via EventBus
     */
    avoidPolygonsChanged (polygons) {
      if (polygons) {
        // As it is possible to have several polygons, we merge them into
        // a multiPolygon so that all them are considered (array of polygons is not supported)
        let multiPolygon = PolygonUtils.mergePolygonsIntoMultiPolygon(polygons)
        EventBus.$emit('avoidPolygonsChanged', multiPolygon)
      }
    },
    /**
     * Set the app `settings` and `about` modals' state (open or closed)
     * based on the store definitions. These definitions are saved based
     * on the app route
     */
    setModalState () {
      // Open settings if it was defined in map.route.js
      if (this.$store.getters.openSettings) {
        this.isSettingsOpen = true
        this.$store.commit('openSettings', false)
      } else {
        this.isSettingsOpen = false
      }
      // Open about if it was defined in map.route.js
      if (this.$store.getters.openAbout) {
        this.isAboutOpen = true
        this.$store.commit('openAbout', false)
      } else {
        this.isAboutOpen = false
      }
    },
    /**
     * Load avoid polygons from app route
     */
    loadAvoidPolygonsFromAppRoute () {
      let polygons = []
      let multiPolygon = lodash.get(this.$store.getters.appRouteData, constants.avoidPolygonsOptionsPath)
      if (multiPolygon) {
        polygons = PolygonUtils.splitMultiPolygonIntoPolygons(multiPolygon)
      }
      this.localAvoidPolygons = polygons
    }
  },

  created () {
    // Emit an event caught by the root App component
    // telling it to update the page title
    EventBus.$emit('titleChanged', this.$t('maps.pageTitle'))

    // Set sidebar initial state (open/closed)
    let sidebarStartOpen = false
    if (appConfig.sidebarStartsOpenInHighResolution && this.$highResolution) {
      sidebarStartOpen = true
    }
    this.$store.commit('setLeftSideBarIsOpen', sidebarStartOpen)

    const context = this
    // Listen to the mapViewDataChanged event and call the
    // necessary methods when it happens
    EventBus.$on('mapViewDataChanged', function (mapViewData) {
      context.$root.appHooks.run('mapViewDataChanged', mapViewData)
      context.setMapDataAndUpdateMapView(mapViewData)
      context.setViewHeightAndBottomNav()
    })

    // Set the modal open flags to true when
    // a show-<something> events happen
    EventBus.$on('showAltitudeModal', () => {
      context.isAltitudeModalOpen = true
    })
    EventBus.$on('showSettingsModal', () => {
      context.isSettingsOpen = true
    })
    EventBus.$on('showAboutModal', () => {
      context.isAboutOpen = true
    })
    EventBus.$on('loadAvoidPolygons', (avoidPolygons) => {
      context.localAvoidPolygons = avoidPolygons
    })

    EventBus.$on('togglePolygonVisibility', (polygonIndex) => {
      if (context.mapViewData.polygons[polygonIndex]) {
        context.mapViewData.polygons[polygonIndex].properties.visible = !context.mapViewData.polygons[polygonIndex].properties.visible
      }
    })

    EventBus.$on('setPolygonOpacity', (data) => {
      if (context.mapViewData.polygons[data.polygonIndex]) {
        context.mapViewData.polygons[data.polygonIndex].properties.fillOpacity = data.fillOpacity
      }
    })

    EventBus.$on('setRouteOpacity', (data) => {
      if (context.mapViewData.routes[data.routeIndex]) {
        context.mapViewData.routes[data.routeIndex].properties.opacity = data.opacity
      }
    })

    // When the touch move event occurs
    // the view size may change (mobile devices)
    // due to the url bar visibility
    document.addEventListener('touchmove', () => {
      this.refreshViewSizeAfterTouchMode()
    })

    // Run the init methods whe
    // this component is created
    this.loadRoute()
    this.setModalState()
    this.setViewHeight()
    this.loadAvoidPolygonsFromAppRoute()

    // If in pageNotfound mode, show the error message
    if (this.$store.getters.mode === constants.modes.pageNotFound) {
      this.showError(this.$t('maps.pageNotFound'), {timeout: 0})
    }
  }
}
