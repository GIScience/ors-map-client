import MapView from '@/fragments/map-view/MapView.vue'
import SimplePlaceSearch from '@/fragments/forms/simple-place-search/SimplePlaceSearch'
import AppMode from '@/support/app-modes/app-mode'
import Altitude from '@/fragments/charts/altitude/Altitude'
import MapViewData from '@/models/map-view-data'
import About from '@/fragments/about/About.vue'
import Settings from '@/fragments/forms/settings/Settings.vue'
import constants from '@/resources/constants'
import { ResizeObserver } from 'vue-resize'
import PlacesCarousel from '@/fragments/places-carousel/PlacesCarousel'
import RouteUtils from '@/support/route-utils'
import resolver from '@/support/routes-resolver'

export default {
  data: () => ({
    mapViewGuid: null,
    myLocation: false,
    isAltitudeModalOpen: false,
    isSettingsOpen: false,
    isAboutOpen: false,
    simpleMapSearcHeight: 65,
    defaultZoom: 12,
    mapViewData: new MapViewData(),
    bottomNavActive: false,
    bottomNavHeight: 310,
    mapHeightOffset: 60,
    activeplaceIndex: 0,
    viewHeight: null,
    touchmoveDebounceTimeoutId: null,
    searchBtnAvailable: false,
    firstLoad: true,
    previousRoute: null
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
    mapHeight () {
      let height = this.viewHeight
      if (this.showBottomNav) {
        height = (this.viewHeight - this.bottomNavHeight + this.mapHeightOffset)
      }
      return height
    },
    zoom () {
      const zoom = this.$store.getters.appRouteData.options.zoom || this.defaultZoom
      return zoom
    },
    showBottomNav () {
      return this.bottomNavActive
    },
    bottomNavTop () {
      return this.viewHeight - this.bottomNavHeight
    },
    refreshSearchAvailable () {
      const available = this.$store.getters.mode === constants.modes.search && this.searchBtnAvailable
      return available
    },
    fitMapBounds () {
      let fit = true
      const directionsMode = constants.modes.directions
      const routeChanged = this.previousRoute && this.previousRoute.name !== this.$route.name

      if (!this.firstLoad && !routeChanged && this.$store.getters.mode === directionsMode && !this.$store.getters.mapSettings.alwaysFitBounds) {
        fit = false
      }
      return fit
    },
    mapViewCenter () {
      let center = null
      if (this.$store.getters.appRouteData.options.center) {
        center = this.$store.getters.appRouteData.options.center
      }
      return center
    },
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
      this.previousRoute = from
      this.loadRoute()
      this.setModalState()
    }
  },
  methods: {
    zoomChanged () {
      this.storeZoomValue()
      this.searchBtnAvailable = true
    },
    refreshSearch () {
      this.searchBtnAvailable = false
      this.eventBus.$emit('refreshSearch')
    },
    mapCenterMoved (data) {
      // Only enables the refresh search btn
      // if the map is moved more than 500 meters
      if (data.distance > 500) {
        this.searchBtnAvailable = true
      }
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
      this.mapViewData = mapViewData
      this.searchBtnAvailable = false

      // If the previous state of mapViewData
      // already had places, then it is changing
      // from to a new set of data and is not
      // first load anymore
      if (this.mapViewData.hasPlaces()) {
        this.firstLoad = false
      }

      // The mapViewData is watched by the map
      // component and the content re-rendered
      // when it changes. So, by changing it here
      // the map component is refresed
      this.mapViewData = mapViewData
    },

    /**
     * Set the view height and the bottom nav status
     */
    setViewHeightAndBottomNav () {
      // Make sure that bottom nav is clsed if the app is not in search mode
      // At list 100 x must available for the map view
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

    orsMapCreated (mapViewGuid) {
      this.mapViewGuid = mapViewGuid
    },
    markerDragged (marker) {
      this.eventBus.$emit('markerDragged', marker)
    },

    directionsFromPoint (data) {
      this.eventBus.$emit('directionsFromPoint', data)
    },
    directionsToPoint (data) {
      let context = this
      this.eventBus.$emit('clearMap')
      setTimeout(() => {
        this.mapViewData.places = [data.place]
        context.eventBus.$emit('directionsToPoint', data)
      }, 100)
    },
    addAsIsochroneCenter (data) {
      this.eventBus.$emit('addAsIsochroneCenter', data)
    },

    addRouteStop (data) {
      this.eventBus.$emit('addRouteStop', data)
    },
    addDestinationToRoute (data) {
      this.eventBus.$emit('addDestinationToRoute', data)
    },
    closeAltitudeModal () {
      this.isAltitudeModalOpen = false
    },
    closeSettingsModal () {
      this.isSettingsOpen = false
      if (this.$route.name === 'MapSettings') {
        this.$store.commit('cleanMap', true)
        this.$router.push({ name: 'Maps' })
      }
    },
    closeAboutModal () {
      this.isAboutOpen = false
      if (this.$route.name === 'MapAbout') {
        this.$store.commit('cleanMap', true)
        this.$router.push({ name: 'Maps' })
      }
    },
    avoidPolygonsChanged (polygons) {
      this.eventBus.$emit('avoidPolygonsChanged', polygons)
    },
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
    }
  },

  created () {
    // emit the an event catch by root App component
    // telling it to update the page title
    this.eventBus.$emit('titleChanged', this.$t('maps.pageTitle'))
    this.$store.commit('setDisplayFooter', false)
    this.$store.commit('setLeftSideBarIsOpen', false)

    const context = this
    this.eventBus.$on('mapViewDataChanged', function (mapViewData) {
      context.setMapDataAndUpdateMapView(mapViewData)
      context.setViewHeightAndBottomNav()
    })

    this.eventBus.$on('showAltitudeModal', function () {
      context.isAltitudeModalOpen = true
    })
    this.eventBus.$on('showSettingsModal', function () {
      context.isSettingsOpen = true
    })
    this.eventBus.$on('showAboutModal', function () {
      context.isAboutOpen = true
    })
    this.loadRoute()
    this.setModalState()
    this.setViewHeight()

    // When the touch move event occours
    // the view size may change (mobile devices)
    // due to the url bar visibility
    document.addEventListener('touchmove', () => {
      this.refreshViewSizeAfterTouchMode()
    })
  }
}
