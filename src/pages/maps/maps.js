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
import lodash from 'lodash'

export default {
  data: () => ({
    mapViewGuid: null,
    myLocation: false,
    isAltitudeModalOpen: false,
    isSettingsOpen: false,
    isAboutOpen: false,
    simpleMapSearcHeight: 65,
    defaultZoom: appConfig.initialZoomLevel,
    mapViewData: new MapViewData(),
    bottomNavActive: false,
    bottomNavHeight: 310,
    mapHeightOffset: 60,
    activeplaceIndex: 0,
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
     * based on the embed mode value, the mapready and the sidebar visibility
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
      if (this.mapViewData.timestamp && this.previousMapViewDataTimeStamp !== this.mapViewData.timestamp && this.$store.getters.mapSettings.alwaysFitBounds) {
        return true
      } else if (this.firstLoad) {
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
      }
      return center
    },
    /**
     * Retursn a boolean determining if the drawing tool
     * is available based on the app mode
     * @returns {Boolean}
     */
    supportsDrawingTool () {
      const modeWithDrawingTools = [constants.modes.directions, constants.modes.roundTrip]
      // If the app is in one of the modes that supports drawing tool
      if (modeWithDrawingTools.includes(this.$store.getters.mode)) {
        return true
      }
      return false
    }
  },
  beforeRouteUpdate (to, from, next) {
    // Altough the mode is defined in the beforeEnter route event
    // when te browser back button is pressed and we are changing from
    // similar types of route - like directions with two places and
    // directins with one (for round trip), then the beforeEnter is not trigered
    if (to.fullPath.startsWith(resolver.directions())) {
      RouteUtils.setDirectionsModeBasedOnRoute(to)
    }
    next()
  },
  watch: {
    $route: function (to, from) {
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
     * Stores the new zomm value and set the
     * searchBtnAvailable flag as true, since
     * once the map has been moved, the user may wants to
     * refresh the search to get features within the
     * visible map view
     * @param {Object} { zoom: Object, map: Object, context: Object} 
     */
    zoomChanged (data) {
      this.$root.appHooks.run('zoomChanged', data)
      this.storeZoomValue(data.zoom)
      this.searchBtnAvailable = true
    },
    /**
     * Set the refreshing search flag as true,
     * the searchBtnAvailable flag as false
     * and emits the refreshSearch event
     * @emits refreshSearch via eventBus
     */
    refreshSearch () {
      // the refresh search event will
      // trigger a flow that will make other
      // components to re do the search
      // and update the data. During this cycle
      // we need a flag that tells us we are on
      // this state so that the computed fitMapBounds
      // can avoid returning the `fitMapBounds` as true
      // what should not happen in the case that
      // the map bounds have been already defined by the user
      this.refreshingSearch = true
      this.searchBtnAvailable = false
      this.eventBus.$emit('refreshSearch')
    },
    /**
     * Defines if the searchBtnAvailable based on 
     * how much the map has been moved
     * @param {Object} data 
     */
    mapCenterMoved (data) {
      // Only enables the refresh search btn
      // if the map has been moved more than 500 meters
      if (data.distance > 500) {
        this.searchBtnAvailable = true
      }
    },
    /**
     * Save the new map center in mapSettings when it changes
     * and emit a mapcenterchanged event via eventBus
     * @param {*} latlng
     * @emits mapCenterChanged [via eventBus]
     */
    mapCenterChanged (latlng) {
      let context = this
      let mapSettings = this.$store.getters.mapSettings
      mapSettings.mapCenter = latlng
      this.$store.dispatch('saveSettings', mapSettings).then(() => {
        context.$root.appHooks.run('mapCenterChanged', mapSettings.mapCenter)
        context.eventBus.$emit('mapCenterChanged', mapSettings.mapCenter)
      })      
    },
    /**
     * Set the view height using the iner height
     */
    setViewHeight () {
      this.viewHeight = window.innerHeight
    },
    /**
     * Refresh the view size using a debounce
     * it respond to touch event, so we just want
     * to aply the new size when the event ends
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
     * by opennning the bottom nav, setting the active place
     * and running the setViewHeight
     * @param {*} place
     */
    markerClicked (place) {
      // At least 100px height must be available for the map view
      if ((window.innerHeight > this.bottomNavHeight + 100) && this.$store.getters.mode === constants.modes.search) {
        const index = place.findIndex(this.mapViewData.places)
        this.activeplaceIndex = index
        this.bottomNavActive = true
        this.setViewHeight()
      }
    },
    /**
     * Remove place
     * @param {*} data
     */
    removePlace (data) {
      this.eventBus.$emit('removePlace', data)
    },
    /**
     * Remove place
     * @param {*} data
     */
    directChanged (data) {
      this.eventBus.$emit('directChanged', data)
    },
    /**
     * Close bottom nav component
     */
    closedBottomNav () {
      this.bottomNavActive = false
      this.setViewHeight()
    },
    /**
     * Handle place index selected and emitts event via evetBus
     * @param {*} index
     * @emits placeFocusChanged [via eventBus]
     */
    placeIndexSelectedInBottomNav (index) {
      this.eventBus.$emit('placeFocusChanged', this.mapViewData.places[index])
    },
    /**
     * Set the map view data object and emit a event to redraw the map
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
      // component and the content re-rendered
      // when it changes. So, by changing it here
      // the map component is refresed
      this.mapViewData = mapViewData

      // once the mapViewData is changed, the
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
        this.activeplaceIndex = this.activeplaceIndex || 0
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
      this.eventBus.$emit('clearMap')
      // After clearing the map, wait a bit to load the new route
      let context = this

      const appRouteData = AppMode.decodePath(context.$route)

      if (appRouteData === false) { // if there is no app route data, load default state
        context.$router.push({name: 'Maps'})
      } else {
        context.$store.commit('appRouteData', appRouteData)
        context.storeZoomValue()
        context.eventBus.$emit('appRouteDataChanged', appRouteData)
      }
    },

    /**
     * Store the current map view guid
     * in a local property. so in case
     * there are more then one map (future)
     * we can check which map must be accessed
     * @param {*} mapViewGuid 
     */
    orsMapCreated (mapViewGuid) {
      this.mapViewGuid = mapViewGuid
    },
    /**
     * When a marker has been dragged
     * emits the markerDragged event (via eventbus)
     * @param {Object} marker 
     * @emits markerDragged via eventbus
     */
    markerDragged (marker) {
      this.eventBus.$emit('markerDragged', marker)
    },

    /**
     * When a directions from point is hit, 
     * emit a directionsFromPoint event via eventbus.
     * The map-view component does not emit events via
     * eventBus, only local events to its container (this component)
     * @param {Object} data 
     * @emits directionsFromPoint via eventbus
     */
    directionsFromPoint (data) {
      this.eventBus.$emit('directionsFromPoint', data)
    },
    /**
     * Trigger directions based on the data passed
     * that includes a Place by clearing the map
     * and by emitting the directionsToPoint evet (via eventBus)
     * The map-view component does not emit events via
     * eventBus, only local events to its container (this component)
     * @param {Objet} data {place: Place}
     */
    directionsToPoint (data) {
      let context = this
      this.eventBus.$emit('clearMap')
      setTimeout(() => {
        this.mapViewData.places = [data.place]
        context.eventBus.$emit('directionsToPoint', data)
      }, 100)
      this.bottomNavActive = false
    },

    /**
     * Check if the data contaisn the pick place index
     * and emits the setInputPlace via eventBus
     * @param {*} data 
     * @emits setInputPlace
     */
    setInputPlace (data) {
      if (data.pickPlaceIndex !== null) {
        this.eventBus.$emit('setInputPlace', data)
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
     * emits an addAsIsochroneCenter event via eventbus.
     * The map-view component does not emit events via
     * eventBus, only local events to its container (this component)
     * @param {Object} data 
     * @emits addAsIsochroneCenter via eventbus
     */
    addAsIsochroneCenter (data) {
      this.eventBus.$emit('addAsIsochroneCenter', data)
    },

    /**
     * When an `add route stop` option is hit, 
     * emits an addRouteStop event via eventbus.
     * The map-view component does not emit events via
     * eventBus, only local events to its container (this component)
     * @param {Object} data 
     * @emits addRouteStop via eventbus
     */
    addRouteStop (data) {
      this.eventBus.$emit('addRouteStop', data)
    },
    /**
     * When an `add destination to route` option is hit, 
     * emits an addDestinationToRoute event via eventbus.
     * The map-view component does not emit events via
     * eventBus, only local events to its container (this component)
     * @param {Object} data 
     * @emits addDestinationToRoute via eventbus
     */
    addDestinationToRoute (data) {
      this.eventBus.$emit('addDestinationToRoute', data)
    },
    /**
     * Set the altitude modal open flag as false
     */
    closeAltitudeModal () {
      this.isAltitudeModalOpen = false
    },
    /**
     * Set the `settings` open flag as false
     * and if the current route is MapSettings
     * clear the map and redirect the app the the
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
     * clear the map and redirect the app the the
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
     * merge the avoid polygons array into a multipolygon and
     * emits an avoidPolygonsChanged event via eventbus.
     * @param {Array} polygons 
     * @emits avoidPolygonsChanged via eventbus
     */
    avoidPolygonsChanged (polygons) {
      if (polygons) {
        // As it is possible to have several polygons, we merge them into
        // a multipolygon so that all them are considered (array of polygons is not supported)
        let multiPolygon = PolygonUtils.mergePolygonsIntoMultiPolygon(polygons)
        this.eventBus.$emit('avoidPolygonsChanged', multiPolygon)
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
    // Emit the an event catch by root App component
    // telling it to update the page title
    this.eventBus.$emit('titleChanged', this.$t('maps.pageTitle'))
    this.$store.commit('setDisplayFooter', false)

    // Set sidebar initial state (open/closed)
    let sidebarStartOpen = false
    if (appConfig.sidebarStartsOpenInHeighResolution && this.$highResolution) {
      sidebarStartOpen = true
    }
    this.$store.commit('setLeftSideBarIsOpen', sidebarStartOpen)

    const context = this
    // Listen to the mapViewDataChanged event and call the
    // necessary methods when it happes
    this.eventBus.$on('mapViewDataChanged', function (mapViewData) {
      context.$root.appHooks.run('mapViewDataChanged', mapViewData)
      context.setMapDataAndUpdateMapView(mapViewData)
      context.setViewHeightAndBottomNav()
    })

    // Set the modal open falgs to true when
    // a show-<something> events happen
    this.eventBus.$on('showAltitudeModal', () => {
      context.isAltitudeModalOpen = true
    })
    this.eventBus.$on('showSettingsModal', () => {
      context.isSettingsOpen = true
    })
    this.eventBus.$on('showAboutModal', () => {
      context.isAboutOpen = true
    })
    this.eventBus.$on('loadAvoidPolygons', (avoidPolygons) => {
      context.localAvoidPolygons = avoidPolygons
    })
  
    // When the touch move event occours
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
  }
}
