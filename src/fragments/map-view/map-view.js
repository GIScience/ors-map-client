/**
 * MapView component.
 * Renders a leaflet/vue2-leaflet map based on the mapViewData passed via props. Capture the map events, dealing with them or emitting events.
 * @uses storage defined in @see /src/store/modules/map-state
 *
 * Events that this component listens to:
 * @listens redrawAndFitMap [via EventBus] - event that will trigger a map redraw and refit bounds - expects {isMaximized: Boolean, guid: String}
 * @listens clearMap [via EventBus] - event that will trigger a map clear
 * @listens changeActiveRouteIndex [via EventBus] - event that will trigger active route index change
 * @listens placeFocusChanged [via EventBus] - updates the map center when a new place is selected *
 * Events emitted via EventBus:
 * @emits activeRouteIndexChanged
 * @emits setSideBarStatus
 * @emits mapLeftClicked
 * @emits mapRightClicked
 *
 * Local events emitted:
 * @emits zoomChanged
 * @emits markerDragged
 * @emits markerClicked
 * @emits onCreate
 * @emits mapCenterChanged
 * @emits directionsFromPoint
 * @emits directionsToPoint
 * @emits addRouteStop
 * @emits addDestinationToRoute
 * @emits setInputPlace
 */

import {
  LMap,
  LTileLayer,
  LLayerGroup,
  LTooltip,
  LPopup,
  LControlZoom,
  LControlAttribution,
  LControlScale,
  LWMSTileLayer,
  LControlLayers,
  LGeoJson,
  LPolygon,
  LCircle,
  LCircleMarker
} from 'vue2-leaflet'

import routeData from '@/support/map-data-services/ors-response-data-extractors/route-data'
import ExtraInfoHighlight from './components/extra-info-highlight/ExtraInfoHighlight'
import MapRightClick from './components/map-right-click/MapRightClick'
import MapViewMarkers from './components/map-view-markers/MapViewMarkers'
import LControlPolylineMeasure from 'vue2-leaflet-polyline-measure'
import MapLeftClick from './components/map-left-click/MapLeftClick'
import OrsLPolyline from './components/ors-l-polyline/OrsLPolyline'
import AdminAreaLoader from '@/support/admin-area-loader'
import MyLocation from './components/my-location/MyLocation'
import { GestureHandling } from 'leaflet-gesture-handling'
import orsDictionary from '@/resources/ors-dictionary'
import LHeightGraph from 'vue2-leaflet-height-graph'
import PolygonUtils from '@/support/polygon-utils'
import MapViewData from '@/models/map-view-data'
import drawLocales from 'leaflet-draw-locales'
import mapDefinitions from './map-definitions'
import constants from '@/resources/constants'
import I18nBuilder from '@/i18n/i18n-builder'
import appConfig from '@/config/app-config'
import GeoUtils from '@/support/geo-utils'
import Utils from '@/support/utils'
import theme from '@/config/theme'
import Place from '@/models/place'
import {EventBus} from '@/common/event-bus'
import 'vue2-leaflet-draw-toolbar'
import Leaflet from 'leaflet'
import lodash from 'lodash'

// Import leaflet-related styles
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'
import 'leaflet-measure/dist/leaflet-measure.css'
import 'vue-resize/dist/vue-resize.css'
import 'leaflet/dist/leaflet.css'

export default {
  components: {
    LMap,
    LTileLayer,
    OrsLPolyline,
    LLayerGroup,
    LTooltip,
    LPopup,
    LControlZoom,
    LControlAttribution,
    LControlScale,
    LControlLayers,
    'l-wms-tile-layer': LWMSTileLayer,
    LGeoJson,
    LPolygon,
    LCircle,
    LCircleMarker,
    LControlPolylineMeasure,
    ExtraInfoHighlight,
    MapRightClick,
    MapLeftClick,
    MyLocation,
    LHeightGraph,
    MapViewMarkers
  },
  props: {
    mapViewData: {
      required: true,
      type: MapViewData
    },
    height: {
      default: 300
    },
    initialZoom: {
      required: true,
      type: Number
    },
    showPopups: {
      type: Boolean,
      default: true
    },
    showControls: {
      type: Boolean,
      default: true
    },
    fitBounds: {
      type: Boolean,
      default: true
    },
    center: {
      type: Object,
      required: false
    },
    customTileProviderUrl: {
      type: String,
      required: false
    },
    shrunk: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      required: true
    },
    supportsDrawingTool: {
      type: Boolean,
      default: false
    },
    routingProfileIcon: {
      type: String,
      required: false
    },
    avoidPolygons: {
      type: Array,
      required: false
    },
  },
  data () {
    return {
      tileProviders: [], // list of tiles provider that will be set via setProviders
      overlayerTileProviders: [], // list of overlay tiles provider that will be set via setProviders
      wmsOverlayerTileProviders: [], // list of WMS overlay tiles provider that will be set via setProviders
      layersPosition: 'topright',
      map: null, // map object reference
      zoomLevel: null,
      mapDataBuilder: null,
      initialMaxZoom: appConfig.initialMapMaxZoom,
      localMapViewData: new MapViewData(), // we use a local copy of the mapViewData to be able to modify it
      mainRouteColor: theme.primary,
      alternativeRouteColor: constants.alternativeRouteColor,
      routeBackgroundColor: constants.routeBackgroundColor,
      guid: null,
      clickLatLng: null,
      myLocationActive: false,
      setDrawingTimeout: null,
      markerMoveTimeoutId: null,
      drawControlRef: null, // a reference to the drawing polygon component
      clickInsidePolygon: null,
      currentInnerHeight: null,
      showClickPopups: true,
      showActiveRouteData: true,
      showAlternativeRouteTooltip: true,
      dataBounds: null, // the current bounds of features displayed on the map
      myLocationMenuOpen: false,
      focusedPlace: null, // the place that must be focused among the ones visible on the map view (for search mode)
      highlightedRoutePointIndex: null, // a point on the route that must be highlighted (a Leaflet latLng)
      isAltitudeModalOpen: false,
      extraInfo: null, // Extra route info (waytypes, surface, steepness etc)
      featuresJustFitted: false,
      localAvoidPolygons: null,
      mapDataViewChangeDebounceTimeoutId: null
    }
  },
  computed: {

    showMyLocationControl () {
      return this.supportsMyLocationBtn && !this.isAltitudeModalOpen && this.showControls
    },
    /**
     * Determines if the 'my location' button is available
     * @returns {Boolean}
     */
    supportsMyLocationBtn () {
      let available = appConfig.supportsMyLocationBtn && !this.$store.getters.embed
      return available
    },
    /**
     * Determines if the distance measure tool is available
     * @returns {Boolean}
     */
    distanceMeasureToolAvailable () {
      let available = appConfig.distanceMeasureToolAvailable
      return available
    },
    /**
     * Determines if the accessibility tool is available
     * @returns {Boolean}
     */
    accessibilityToolAvailable () {
      let available = appConfig.accessibilityToolAvailable && this.showControls
      return available
    },
    /**
     * Determines if click on the map to pick a location is active
     * @returns {Boolean}
     */
    clickToPickActive () {
      return this.$store.getters.pickPlaceIndex !== null
    },
    /**
     * Returns the non embedded mode URL.
     * When in embedded mode, a 'view on ors' btn is displayed and
     * the target url of this btn is the not embedded versions
     * @returns {String} url
     */
    nonEmbedUrl () {
      let url = location.href.split('/embed')[0]
      return url
    },
    /**
     * Return the current applicable zoom level
     * based either on the zoomLevel attribute or
     * on the maxZoom
     * @returns {Number} zoom
     */
    zoom () {
      const zoom = this.zoomLevel > 0 ? this.zoomLevel : this.maxZoom
      return zoom
    },

    /**
     * Returns the map options
     * based on the embed mode value
     * and the show controls computed prop
     * @returns {Object}
     */
    mapOptions () {
      let options = {
        zoomControl: this.showControls,
        attributionControl: true,
        measureControl: true,
        gestureHandling: this.$store.getters.embed,
        gestureHandlingOptions: {
          text: this.$t('mapView.gestureHandling'),
          duration: 1000
        }
      }
      return options
    },
    /**
     * Build and return the map center
     * based on the current map center defined/set in the store
     * @returns {Object} LatLng
     */
    mapCenter () {
      let latLng = GeoUtils.buildLatLong(this.$store.getters.mapCenter)
      return latLng
    },
    /**
     * Determines if only one marker if on the map view
     * @returns {Boolean}
     */
    hasOnlyOneMarker () {
      return this.markers && this.markers.length === 1
    },
    /**
     * Determines if the brand over the
     * map view must be shown
     * @returns {Boolean}
     */
    showBrand () {
      return this.mapHeight > 450 || this.$store.getters.embed
    },
    /**
     * Build and return the GeoJSON options based on the
     * color defined as main
     * @returns {Object}
     */
    geoJsonOptions () {
      return {
        style: { color: this.mainRouteColor, weight: '5' },
      }
    },
    /**
     * Return the GeoJSON style options
     * using the value in constants object
     * @returns {Object}
     */
    geoJsonOutlineOptions () {
      return { style: { color: constants.routeBackgroundColor, weight: '9' } }
    },
    /**
     * Build and return the active route data
     * based on the $store.getters.activeRouteIndex
     * @returns {Array} of latLng
     */
    activeRouteData () {
      if (this.localMapViewData.hasRoutes()) {
        // We must not change the original object
        const toBeTransformedMapViewData = this.localMapViewData.clone()

        // get the coordinates of the active route
        const route = toBeTransformedMapViewData.routes[this.$store.getters.activeRouteIndex]

        // Vue2-Leaflet, the component used to render data on the map, expect the coordinates in the [lat,lon] order,
        // but the GeoJSON format returned by ORS API contains coordinates in the [lon,lat] order.
        // So we invert them to provide what the component expects
        route.geometry.coordinates = GeoUtils.switchLatLonIndex(route.geometry.coordinates)
        return route
      }
    },
    /**
     * Build and return an array of alternative routes
     * to be rendered on the map view
     * @returns {Array} alternativeRoutesData objects
     */
    alternativeRoutes () {
      const alternativeRoutesData = []
      if (this.localMapViewData.hasRoutes()) {
        // We must not change the original object
        const toBeTransformedMapViewData = this.localMapViewData.clone()

        for (const key in toBeTransformedMapViewData.routes) {
          const index = Number(key)
          if (index !== this.$store.getters.activeRouteIndex) {
            // Vue2-Leaflet, the component used to render data on the map, expect the coordinates in the [lat,lon] order,
            // but the GeoJSON format returned by ORS API contains coordinates in the [lon,lat] order.
            // So we invert them to provide what the component expects
            toBeTransformedMapViewData.routes[key].geometry.coordinates = GeoUtils.switchLatLonIndex(toBeTransformedMapViewData.routes[key].geometry.coordinates)
            toBeTransformedMapViewData.routes[key].properties.index = index
            alternativeRoutesData.push(toBeTransformedMapViewData.routes[key])
          }
        }
      }
      return alternativeRoutesData
    },
    /**
     * Build and return the polygons to be rendered
     * on the map view based on the polygons
     * defined in the localMapViewData object.
     * As the renderer expect the polygons coords in the
     * [lat,lon] order, we switch the coords of each polygon
     * and also set the color and label based on the polygon
     * data and translations
     * @returns {Array} polygons
     */
    polygons () {
      const polygons = []
      if (this.localMapViewData) {
        // We must not change the original object
        const mapViewDataToBeTransformed = this.localMapViewData.clone()

        for (const key in mapViewDataToBeTransformed.polygons) {
          const polygon = mapViewDataToBeTransformed.polygons[key]

          // Vue2-Leaflet, the component used to render data on the map, expect the coordinates in the [lat,lon] order,
          // but the GeoJSON format returned by ORS API contains coordinates in the [lon,lat] order.
          // So we invert them to provide what the component expects
          let flattenCoords = PolygonUtils.flatCoordinates(polygon.geometry.coordinates)
          polygon.latLngs = GeoUtils.switchLatLonIndex(flattenCoords)
          polygons.push(polygon)
        }
      }
      return polygons
    },
    /**
     * Build and return an array of marker objects
     * based on the places defined on the localMapViewData
     * @returns {Array} of markers
     */
    markers () {
      let markersMapViewData = this.localMapViewData.clone()
      if (markersMapViewData.places.length > 0) {
        let isRoute = markersMapViewData.hasRoutes() || this.mode === constants.modes.directions
        let markers = GeoUtils.buildMarkers(markersMapViewData.places, isRoute, this.focusedPlace)
        markers = this.$root.appHooks.run('markersCreated', markers)
        return markers
      }
    },
    /**
     * Build and return an array of marker objects
     * based on the POIs places
     * @returns {Array} of markers
     */
    pois () {
      if (this.localMapViewData.pois.length > 0) {
        let poisMarkers = GeoUtils.buildMarkers(this.localMapViewData.pois)
        poisMarkers = this.$root.appHooks.run('poisMarkersCreated', poisMarkers)
        return poisMarkers
      } else {
        return []
      }
    },
    /**
     * Determines the max zoom applicable
     * for the map based on the map view data nax zoom or on the
     * initial max zoom
     * @returns {Number}
     */
    maxZoom () {
      if (this.localMapViewData.maxZoom) {
        return this.localMapViewData.maxZoom
      } else  {
        let activeTileProvider = lodash.find(this.tileProviders, (t) => {
          return t.id === this.$store.getters.mapSettings.defaultTilesProvider
        })
        if (activeTileProvider){
          return activeTileProvider.maxZoom
        }
        return this.initialMaxZoom
      }
    },
    /**
     * Build and return the circle marker
     * based on the clickLatLng position
     * to show to the user where s/he has clicked
     * @returns {Object}
     */
    circleMarker () {
      if (this.clickLatLng) {
        return {
          center: GeoUtils.buildLatLong(this.clickLatLng.lat, this.clickLatLng.lng),
          radius: 8
        }
      }
    },
    /**
     * Build and return the 'my position' marker object
     * based on the current location stored in the store
     * @returns {Object}
     */
    myPositionMarker () {
      if (this.$store.getters.currentLocation) {
        const markerData = {
          center: GeoUtils.buildLatLong(this.$store.getters.currentLocation.lat, this.$store.getters.currentLocation.lng),
          radius: 9,
          accuracy: this.$store.getters.currentLocation.accuracy,
          opacity: 0.7
        }
        return markerData
      }
    },
    /**
     * Determines if a route stop can be added
     */
    canAddStop () {
      const can = !Array.isArray(this.markers) || this.markers.length < appConfig.maxPlaceInputs
      return can
    },
    /**
     * Return the current map polyline measures options
     * @returns {Object} options
     */
    polylineMeasureOptions () {
      const options = mapDefinitions.polylineMeasureOptions(this.$t('mapView.polylineMeasure'))
      this.$root.appHooks.run('polylineMeasureOptionsBuilt', options)
      return options
    },

    /**
     * Return the current map drawing options
     * @returns {Object} options
     */
    drawOptions () {
      const options = mapDefinitions.drawOptions(this.$t('mapView.youCantIntersectPolygons'))
      this.$root.appHooks.run('drawingOptionsBuilt', options)
      return options
    },

    /**
     * Returns the current map height prop
     * @returns {Number} height
     */
    mapHeight () {
      return this.height
    },

    /**
     * Determines if the directions mode is active
     */
    isInDirectionsMode () {
      return constants.modes.directions === this.mode
    },

    /**
     * If polyline is draggable
     * @returns {Boolean}
     */
    isPolylineDraggable () {
      return this.isInDirectionsMode && !this.$store.getters.embed
    },
    /**
     * Determines if the fit features button is visible
     * @returns boolean
     */
    canFitFeatures () {
      let available = appConfig.fitAllFeaturesToolAvailable
      return available && (this.localMapViewData.hasPlaces() || this.localMapViewData.hasRoutes() || this.localAvoidPolygons.length > 0)
    },
    /**
     * If an active route data must be shown
     * @returns {Boolean} show
     */
    displayActiveRouteData () {
      const show = this.activeRouteData && this.showActiveRouteData
      return show
    },

    /**
     * Determines if the current active
     * route is draggable based on app mode
     * @returns {Boolean} isDraggable
     */
    activeRouteIsDraggable () {
      let isDraggable = this.mode === constants.modes.directions
      return isDraggable
    },
    /**
     * Return the accessibility btn top position
     * based on the current map view height
     * @returns {String} height
     */
    accessibilityBtnTopPosition () {
      const height = `${this.height - 60}px`
      return height
    },
    /**
     * Returns the options object for the height graph component
     * @returns {Object}
     */
    lHeightGraphOptions () {
      let mappings = undefined
      let activeRoute = this.localMapViewData.routes[this.$store.getters.activeRouteIndex]
      let heightGraphTranslations = this.$t('mapView.heightGraph')

      // Build the mapping for the extra info
      // that will be displayed in the graph
      // including the translation and the color
      // associated to each extra value
      let extras = lodash.get(activeRoute, 'properties.extras')
      if (extras) {
        let dict = orsDictionary
        let translations = this.$t('orsDictionary')
        mappings = {}
        // Set the mapping for each extra info key
        for (let extraKey in extras) {
          mappings[extraKey] = {}
          let extra = extras[extraKey]
          let extraDict = dict[extraKey]

          // Build the map for each extra summary value
          for (let summaryKey in extra.summary) {
            let summary = extra.summary[summaryKey]
            let map = {
              text: translations[extraDict[summary.value]] || extraDict[summary.value],
              color: dict.colors[extraKey][summaryKey]
            }
            mappings[extraKey][summary.value] = map
          }
        }
      }
      let options = { parser: 'ors', mappings: mappings, translation: heightGraphTranslations }
      return options
    },
    /**
     * Build the map view data for leaflet height graph
     * As leaflet height graph does not support alternative routes
     * we have to put the active feature (according the active route index)
     * in the first index (0) where the component wil looks for
     * @returns {Object} rawData
     */
    localMapViewDataRawData () {
      let mapViewData = this.localMapViewData.clone()
      mapViewData.rawData.features[0] = mapViewData.rawData.features[this.$store.getters.activeRouteIndex]
      return mapViewData.rawData
    }
  },
  watch: {
    /**
     * Every time the response data changes
     * the map builder is reset and the
     * map data is reloaded
     */
    mapViewData: {
      handler: function () {
        this.refreshMapViewData()
      },
      deep: true
    },
    avoidPolygons: {
      handler: function () {
        // When the avoidPolygons prop changes, we copy its value to a
        // local instance so that we can modify it when necessary
        this.localAvoidPolygons = Utils.clone(this.avoidPolygons)
        this.loadAvoidPolygons()
      },
      deep: true
    },
    /**
     * When the prop supportsDrawingTool
     * changes run the setDrawingTool
     * if the prop value is true
     * @param {Boolean} newVal
     */
    supportsDrawingTool (newVal) {
      if (newVal) {
        this.setDrawingTool()
      }
    },
    /**
     * Once the map view is shrunk
     * we have to run the setDrawingTool
     * utility again
     */
    shrunk () {
      this.setDrawingTool()
    },
    /**
     * When the prop showPopups changes
     * copy its value to the local
     * attribute
     * @param {*} newVal
     */
    showPopups (newVal) {
      this.showClickPopups = newVal
    },
    /**
     * When the prop height changes
     * run the adjust map method
     * to make sure that it fits the
     * current view
     */
    height () {
      this.adjustMap()
    },
    /**
     * When the prop mode changes
     * set the isAltitudeModalOpen attribute
     * based on the current mode
     */
    mode () {
      // Altitude modal must be hidden if mode is not directions or roundTrip
      if (this.mode !== constants.modes.directions && this.mode !== constants.modes.roundTrip) {
        this.isAltitudeModalOpen = false
      }
    },
    /**
     * When the center prop value changes
     * run the centerChanged method that will
     * store the current location on localStorage
     */
    center: {
      handler: function (newVal, oldVal) {
        // Center might contain a new object, but with the same values
        // We make this check before triggering centerChanged
        if (oldVal && newVal && newVal.toString() !== oldVal.toString()) {
          this.centerChanged()
        }
      },
      deep: true
    }
  },
  methods: {
    /**
     * Refresh map view data after the prop mapViewData has changed
     * We use a debounce-timeout in order to apply only the last change
     */
    refreshMapViewData () {
      // When the mapViewData prop changes, we copy its value to a
      // local instance so that we can modify it when necessary
      const context = this
      if (this.mapDataViewChangeDebounceTimeoutId) {
        clearTimeout(this.mapDataViewChangeDebounceTimeoutId)
      }
      this.mapDataViewChangeDebounceTimeoutId = setTimeout(function () {
        // Create a new instance of MapViewData and set all the props into the local instance
        context.localMapViewData = context.mapViewData.clone()

        let changes = Utils.getObjectsDiff(context.localMapViewData, context.mapViewData)
        let different = changes.different
        // Only refresh local data if the change was not only the opacity
        if (different.length !== 1 || (different.length === 1 && different[0].indexOf('.opacity') > 0)) {
          context.loadMapData()
          context.refreshAltitudeModal()
        }

      }, 500)
    },
    /**
     * Refresh the altitude modal (force a 'destroy' and a 'rebuild')
     * with the new data
     */
    refreshAltitudeModal () {
      let previousAltitudeModalState = this.isAltitudeModalOpen
      this.isAltitudeModalOpen = false
      const context = this
      setTimeout(() => {
        context.isAltitudeModalOpen = previousAltitudeModalState
      }, 100)
    },
    /**
     * Move the map center according the direction
     * @param {String} direction
     */
    moveMapCenter(direction) {
      let offset
      switch (direction) {
        case 'left':
          offset = this.map.getSize().x*0.15
          this.map.panBy(new Leaflet.Point(-offset, 0), {animate: true})
          break
        case 'right':
          offset = this.map.getSize().x*0.15
          this.map.panBy(new Leaflet.Point(offset, 0), {animate: true})
          break
        case 'up':
          offset = this.map.getSize().y*0.15
          this.map.panBy(new Leaflet.Point(0, -offset), {animate: true})
          break
        case 'down':
          offset = this.map.getSize().y*0.15
          this.map.panBy(new Leaflet.Point(0, offset), {animate: true})
          break
      }
    },
    /**
     * Update the view center
     */
    centerChanged () {
      if (this.center) {
        this.setMapCenter(this.center)
        // If current location is defined, update it
        if (this.$store.getters.currentLocation || this.mode === constants.modes.search) {
          const currentLocation = {lat: this.center.lat, lng: this.center.lng, accuracy: 50}
          this.$store.commit('currentLocation', currentLocation)
        }
      }
    },
    /**
     * Handles the marker clicked event by
     * preventing the propagation and emitting
     * a local event
     * @param {*} place
     * @param {*} event
     * @emits markerClicked
     */
    markerClicked (place) {
      this.$emit('markerClicked', place)
    },

    /**
     * Handle the isochrone polygon clicked event
     * @param {Number} index
     * @param {Object} polygon
     * @param {Event} event
     */
    isochroneClicked (index, polygon) {
      let isochronePopupContainerRef = this.$refs[`isochronePopupContainer${index}`]
      isochronePopupContainerRef = Array.isArray(isochronePopupContainerRef) ? isochronePopupContainerRef[0] : isochronePopupContainerRef
      this.$root.appHooks.run('beforeOpenIsochronePopup', {isochronePopupContainerRef, polygon})
    },
    /**
     * Deals with the map center changed event triggered by the vue2-leaflet
     * component. Get the current map center, set it via setMapCenter and
     * define the current myLocationActive based on the last map center
     * @param {*} event
     * @emits mapCenterMoved
     */
    mapMoved (event) {
      const center = event.target.getCenter()

      const distance = GeoUtils.calculateDistanceBetweenLocations(this.$store.getters.mapCenter, center, 'm')
      // We only consider that the center changed if it
      // changes more than 50 meters from the previous center
      if (distance > 50) {
        this.setMapCenter(center)
        this.storeMapBoundsAndSetMapAsReady()
        const data = { center: this.$store.getters.mapCenter, distance: distance }
        this.$emit('mapCenterMoved', data)
      }
      // If the map is moved by the user the myLocation is reset it in order to define if
      // my location circle should continue to appear as map center
      if (this.myLocationActive) {
        const distance = GeoUtils.calculateDistanceBetweenLocations(this.$store.getters.currentLocation, center, 'm')
        // For some unknown reason, when a new map center
        // is defined it may vary from the location acquired
        // via browser location api. So, we are considering that
        // if this distance is less than 50 meters, then the 'my location'
        // must still be considered as active
        this.myLocationActive = (distance < 50)
      }
    },
    /**
     * Handle the alternative route index selected event
     * @param {*} index
     * @param {*} event
     * @emits activeRouteIndexChanged
     */
    alternativeRouteIndexSelected (index, event) {
      event.originalEvent.stopPropagation()
      event.originalEvent.preventDefault()
      EventBus.$emit('activeRouteIndexChanged', index)
      this.setActiveRouteIndex(index)
    },
    /**
     * Change the current active route index
     * @param {*} index
     */
    setActiveRouteIndex (index) {
      const context = this
      this.$store.commit('activeRouteIndex', index)

      // We just want to disable the showClickPopups
      // temporarily, so we get the original state
      // set it as false and after two seconds
      // we restore the original value
      const showPopupBefore = this.showClickPopups
      this.showClickPopups = false
      setTimeout(() => {
        context.showClickPopups = showPopupBefore
      }, 2000)

      // Force the active route polyline to render again
      // after a timeout in order to make sure it
      // is over the other polylines
      const showActiveRouteDataBefore = this.showActiveRouteData
      this.showActiveRouteData = false
      setTimeout(() => {
        context.showActiveRouteData = showActiveRouteDataBefore
      }, 100)
    },

    /**
     * When a layer is selected in the layer control
     * remove the expand-class, so it is closed
     * after the selection
     */
    baseLayerChanged (newTileProvider) {
      const layerControl = document.querySelector('.leaflet-control-layers')
      if (layerControl) {
        layerControl.classList.remove('leaflet-control-layers-expanded')
      }
      // Get the new active tile object based on its url
      let activeTileProvider = lodash.find(this.tileProviders, (t) => {
        return t.url === newTileProvider.layer._url
      })
      // Retrieve the mapSettings and set the profile id
      let mapSettings = this.$store.getters.mapSettings
      mapSettings.defaultTilesProvider = activeTileProvider.id

      // This will take effect immediately
      this.$store.commit('mapSettings', mapSettings)

      // This is an asynchronous operation, necessary to be executed
      // to propagate the new settings state
      this.$store.dispatch('saveSettings', mapSettings).then(() => {
        console.log('map settings updated')
      })
    },
    /**
     * We watch the box model for changes and update the internal closed data that is used to control the visibility of the box
     * @param {Object} event
     * @emits zoomChanged
     */
    zoomed (event) {
      if (this.zoomLevel !== event.sourceTarget._zoom) {
        this.zoomLevel = event.sourceTarget._zoom
        if (!this.featuresJustFitted && !this.hasOnlyOneMarker) {
          this.storeMapBoundsAndSetMapAsReady()
        } else {
          // If the zoom was changed programmatically
          // reset the flag to false, as it has already
          // been accomplished its goal for one zoom event cycle
          this.featuresJustFitted = false
        }
        this.$emit('zoomChanged', {zoom: event.sourceTarget._zoom, map: this.map, context: this})
      }
    },

    /**
     * Set the map tile providers available
     */
    setProviders () {
      this.tileProviders = mapDefinitions.getProviders()
      this.overlayerTileProviders = mapDefinitions.getOverlayerProviders()
      this.wmsOverlayerTileProviders = mapDefinitions.getWmsOverlayerTileProviders()

      let hookData = {
        tileProviders: this.tileProviders,
        overlayerTileProviders: this.overlayerTileProviders,
        wmsOverlayerTileProviders: this.wmsOverlayerTileProviders,
        context: this
      }
      this.$root.appHooks.run('layerProvidersLoaded', hookData)
    },
    /**
    * Update markers label
    */
    updateMarkersLabel () {
      // Before returning the markers update the label of the marker using the places data in the localMapViewData storage
      if (this.localMapViewData.hasPlaces()) {
        for (const key in this.localMapViewData.places) {
          const humanizedIndex = Number(key) + 1
          this.localMapViewData.places[key].index = humanizedIndex
        }
      }
    },
    /**
     * Handles the marker move
     * by creating a debounce-timeout in order to
     * recalculate the route and update the map
     * view. A 1-second delay is applied to avoid
     * subsequent marker move updates and get the new
     * position only when the movement has ended
     * @param {*} event
     */
    markerMoved (event) {
      // Only marker changes that are a result of user interaction are treated here.
      // With vue2-leaflet version 2.5.2 the event.originalEvent is not  an instance of
      // window.PointerEvent anymore and use parent window.MouseEvent instead
      if (event.originalEvent instanceof window.MouseEvent || event.originalEvent instanceof window.TouchEvent) {
        clearTimeout(this.markerMoveTimeoutId)
        this.markerMoveTimeoutId = setTimeout(() => {
          this.markerDragEnd(event)
        }, 1000)
      }
    },
    /**
     * Add stop via polyline drag
     * @param {*} data
     * @emits addRouteStop
     */
    addStopViaPolylineDrag (data) {
      let closestPlaceIndex
      data.latlng = data.event.target.getLatLng()
      // Get the closest index based on the use stop/route optimization setting
      if (this.$store.getters.mapSettings.useStopOptimization) {
        closestPlaceIndex = GeoUtils.getClosestPlaceIndex(data.latlng, this.localMapViewData.places)
      } else {
        const activeRouteDataPolyline = this.activeRouteData.geometry.coordinates
        closestPlaceIndex = GeoUtils.getStopIndexFromSourcePoint(this.localMapViewData.places, activeRouteDataPolyline, data.draggedFromIndex)
      }
      data.injectIndex = closestPlaceIndex
      this.$emit('addRouteStop', data)
    },
    /**
     * Remove a marker/place when in directions or isochrones mode
     * @param {*} event
     * @param {*} markerIndex
     * @emits removePlace
     */
    removePlace (markerIndex) {
      if (this.markers[markerIndex]) {
        let place = this.markers[markerIndex].place
        let data = {place, index: markerIndex}
        this.$emit('removePlace', data)
      }
    },
    /**
     * Remove a marker/place when in directions or isochrones mode
     * @param {*} event
     * @param {*} markerIndex
     * @emits directChanged
     */
    markAsDirectFromHere (markerIndex) {
      if (this.markers[markerIndex]) {
        this.markers[markerIndex].place.direct = !this.markers[markerIndex].place.direct
        let place = this.markers[markerIndex].place
        let data = {place, index: markerIndex}
        this.$emit('directChanged', data)
      }
    },
    /**
     * Deal with the marker drag end event
     * getting the marker index and emitting and event
     * @param {*} event
     * @emits markerDragged
     */
    markerDragEnd (event) {
      const targetLatLng = event.oldLatLng
      let markerIndex = null

      // Find the marker index by comparing the lat and long
      for (let index = 0; index < this.markers.length; index++) {
        const markerP = this.markers[index].position
        if (markerP.lat === targetLatLng.lat && markerP.lng === targetLatLng.lng) {
          // update the marker position
          this.markers[index].position.lat = event.latlng.lat
          this.markers[index].position.lng = event.latlng.lng

          // set the marker index
          markerIndex = index
          break
        }
      }
      // If found, emits the markerDragged event
      if (markerIndex !== null) {
        const marker = this.markers[markerIndex]
        marker.inputIndex = markerIndex
        this.$emit('markerDragged', marker)
      }
    },

    /**
     * Set the map center
     * @param {*} latLng
     * @use localStorage
     * @emits mapCenterChanged
     */
    setMapCenter (latLng) {
      if (latLng) {
        let mapSettings = this.$store.getters.mapSettings
        const previousCenter = Utils.clone(mapSettings.mapCenter)

        if (previousCenter.toString() !== latLng.toString()) {
          this.$emit('mapCenterChanged', latLng)
        }
      } else {
        // TODO: stop using appRouteData, receive places as a prop?
        const routePlaces = this.$store.getters.appRouteData.places
        if (routePlaces.length === 0 || routePlaces[0].isEmpty()) {
          if (this.center) {
            this.setMapCenter(this.center)
          } else {
            this.setPreviousMapCenter()
          }
        } else {
          this.setPreviousMapCenter()
        }
      }
    },

    /**
     * Set the previous center as map center
     */
    setPreviousMapCenter () {
      let mapSettings = this.$store.getters.mapSettings
      if (mapSettings.mapCenter) {
        this.setMapCenter(mapSettings.mapCenter)
      }
    },

    /**
     * Store map bounds and set map as ready
     * @emits mapReady
     * @stores mapBounds
     */
    storeMapBoundsAndSetMapAsReady () {
      const buildBoundaries = (bounds) => {
        const boundary = {
          rect: {
            min_lon: bounds._southWest.lng,
            max_lon: bounds._northEast.lng,
            min_lat: bounds._southWest.lat,
            max_lat: bounds._northEast.lat
          }
        }

        return boundary
      }
      this.getMapObject().then((map) => {
        const bounds = map.getBounds()
        const mapBounds = buildBoundaries(bounds)
        let newBounds = JSON.stringify(bounds)
        let oldBounds = JSON.stringify(this.$store.getters.mapBounds)
        if (newBounds !== oldBounds) {
          this.$store.commit('mapBounds', mapBounds)
          this.$root.appHooks.run('mapBoundsChanged', {mapBounds, map: map, context: this})
        }
        this.$emit('mapReady', map)
      })
    },

    /**
     * To load map data we use the map builder service
     * and then once it is ready, we set the local data from
     * the data returned by the builder
     * and then set the bounds, fit the bounds and redraw the map
     * If the response data does not contain a GeoJSON
     * then the promise resolver will return an object with the expected
     * props but all of them containing null values. This will not cause a fail
     *
     */
    loadMapData () {
      if (this.localMapViewData.hasPlaces()) {
        this.defineActiveRouteIndex()
        this.updateMarkersLabel()
        if (this.hasOnlyOneMarker && this.fitBounds) {
          this.setFocusedPlace(this.localMapViewData.places[0])
        }
        if (this.mode === constants.modes.place && this.hasOnlyOneMarker && appConfig.showAdminAreaPolygon) {
          this.loadAdminArea()
        } else {
          this.fitFeaturesBounds()
        }
      }
    },

    /**
     * Set the map view zom level when focused on a specific place
     * @param {Place} place
     */
    setFocusedPlace (place) {
      let layer = place.layer || place.properties.layer
      if (layer) {
        this.zoomLevel = GeoUtils.zoomLevelByLayer(layer)
        this.setMapCenter(place.getLatLng())
      }
    },
    /**
     * Load admin area for region, city and county
     */
    loadAdminArea () {
      let place = this.markers[0].place
      let adminAreaLoader = new AdminAreaLoader()
      let context = this
      adminAreaLoader.getAdminAreaPolygon(place).then(polygons => {
        if (Array.isArray(polygons) && polygons.length > 0) {
          context.localMapViewData.polygons = context.localMapViewData.polygons.concat(polygons)
          context.fitFeaturesBounds()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * Build and set bounds based on localMapViewData
     */
    buildAndSetBounds () {
      let polylineData = []

      if (this.extraInfo) {
        polylineData = this.buildExtraInfoBoundsPolyline()
        this.dataBounds = GeoUtils.getBounds([], polylineData)
      } else {
        // Add the routes coordinates to the polyline that must
        // be considered to the all features bounds
        for (const rKey in this.localMapViewData.routes) {
          if (this.localMapViewData.routes[rKey].geometry.coordinates) {
            const coords = this.localMapViewData.routes[rKey].geometry.coordinates
            polylineData = polylineData.concat(coords)
          }
        }
        // Add the polygons coordinates to the polyline that must
        // be considered to  the all features bounds
        for (const pKey in this.localMapViewData.polygons) {
          const polygon = this.localMapViewData.polygons[pKey]
          if (polygon) {
            const coords = PolygonUtils.flatCoordinates(polygon.geometry.coordinates)
            polylineData = polylineData.concat(coords)
          }
        }
        // Build the all features bounds taking into consideration
        // the places and the routes/polygons polyline
        if (this.localMapViewData.hasPlaces() || polylineData.length > 0) {
          let places = Place.getFilledPlaces(this.localMapViewData.places)
          this.dataBounds = GeoUtils.getBounds(places, polylineData)
        } else {
          this.dataBounds = null
        }
      }
    },
    /**
     * Build the polyline that contains the extra info to be used in the bounds definition
     * @returns {Array} polylineData
     */
    buildExtraInfoBoundsPolyline () {
      let polylineData = []
      const coordinates = this.localMapViewData.routes[this.$store.getters.activeRouteIndex].geometry.coordinates
      const highlightData = routeData.buildHighlightedPolylines(coordinates, this.extraInfo)
      for (let key in highlightData) {
        let polylines = highlightData[key].polylines
        for (let plKey in polylines) {
          polylineData = polylineData.concat(polylines[plKey])
        }
      }
      return polylineData
    },
    /**
     * Make sure the active route index is valid
     */
    defineActiveRouteIndex () {
      if (this.localMapViewData.hasRoutes()) {
        const maxRouteIndexValid = this.localMapViewData.routes.length - 1
        if (this.$store.getters.activeRouteIndex > maxRouteIndexValid) {
          this.setActiveRouteIndex(0)
        }
      }
    },
    /**
     * Redraw the map component by faking a window resize event
     * This is a hack to force leaflet redraw/resize correctly the maps
     * in the case when there are two map viewers and the container of one of them
     * is resized.
     * The candidates map.invalidateSize() and map.eachLayer(function(layer){layer.redraw();});
     * have not worked at all on this case
     * @see https://github.com/Leaflet/Leaflet/issues/694
     * @dispatch resize event
     */
    redrawMap () {
      return new Promise((resolve) => {
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'))
          resolve()
        }, 10)
      })
    },

    /**
     * Emit the right click event according the parameter received
     * This method emits only one of the events listed below at a time
     * @param {Object} data { eventName:..., clickLatLng: ...}
     * @emits directionsFromPoint
     * @emits directionsToPoint
     * @emits addRouteStop
     * @emits addDestinationToRoute
     */
    handleRightClickEvent (data) {
      if (data.eventName === 'centerHere') {
        this.setMapCenter(data.clickLatlng)
      } else {
        this.prepareDataAndEmitRightClickEvent(data)
      }
    },

    /**
     * Update localMapViewData places
     * @param {Object} data {clickLatLng: latLng, eventName:String}
     * @emits directionsFromPoint
     * @emits directionsToPoint
     * @emits addRouteStop
     * @emits addDestinationToRoute
     */
    prepareDataAndEmitRightClickEvent (data) {
      let place = new Place(data.clickLatLng.lng, data.clickLatLng.lat)
      place.resolve().then(() =>{
        const dataPassed = { latLng: data.clickLatLng, place}
        this.$emit(data.eventName, dataPassed)
      })
    },

    /**
     * Emit the event that will trigger the Set the
     * directions to place contained in the data object
     * @param {*} data
     * @emits directionsToPoint
     */
    directionsToPoint (data) {
      this.$emit('directionsToPoint', data)
    },
    /**
     * Emit the event that will trigger the setInputPlace to place contained in the data object
     * @param {Number} placeIndex
     * @param {Place} place
     * @emits setInputPlace
     */
    setInputPlace (placeIndex, placeInputId, place) {
      let data = {pickPlaceIndex: placeIndex, placeInputId: placeInputId, place: place}
      this.$emit('setInputPlace', data)
    },

    /**
     * Determines if the given bounds Array is valid
     * @param {*} dataBounds
     * @returns Boolean
     */
    isValidBounds (dataBounds) {
      if (!dataBounds || !Array.isArray(dataBounds) || dataBounds.length < 2) {
        return false
      }
      return dataBounds[0].lat !== null && dataBounds[0].lon !== null && dataBounds[1].lat !== null && dataBounds[1].lon !== null
    },
    /**
     * Fit all the features by adjusting the zoom level
     * @param force - force the fit ignoring fit options
     */
    fitFeaturesBounds (force = false) {
      if (this.fitBounds === true || force) {
        const context = this

        // get and use the fit bounds option to determine if the fit should be run
        const maxFitBoundsZoom = this.hasOnlyOneMarker ? context.zoomLevel : this.maxZoom

        return new Promise((resolve) => {
          context.buildAndSetBounds()
          // If the map object is already defined
          // then we can directly access it
          if (context.map && context.isValidBounds(context.dataBounds)) {
            context.fit(maxFitBoundsZoom)
          } else {
            // If not, it wil be available only in the next tick
            context.$nextTick(() => {
              context.buildAndSetBounds()
              if (context.$refs.map && context.isValidBounds(context.dataBounds)) {
                context.map = context.$refs.map.mapObject // Work as expected when wrapped in a $nextTick
                context.fit(force, maxFitBoundsZoom)
              }
              resolve()
            })
          }
        })
      }
    },

    /**
     * Handles the fit features hit btn and
     * emits a setSidebarStatus event that will adjust
     * the map to show all loaded features
     * @emits setSidebarStatus
     */
    fitAllFeatures () {
      this.fitFeaturesBounds(true)

      // If the app is in a low resolution mode
      // hide the sidebar so that the features can be seen
      if (this.$lowResolution) {
        EventBus.$emit('setSidebarStatus', false)
      }
    },

    /**
     * Fit the bounds of the map considering the data bounds defined
     * @param {Boolean} force
     * @param {Number} maxFitBoundsZoom integer
     */
    fit (maxFitBoundsZoom) {
      if (this.dataBounds) {
        // We set the max zoom in level and then fit the bounds
        // Temporally disabled the zoom Level setting to check impacts (it seems not to be necessary anymore)

        // To make it work properly we have to wait a bit
        // before fitting the map bounds
        const context = this
        setTimeout(() => {
          // The fit may affect the zoom level.
          // So we set the zoom flag programmatically to let
          // other methods have this information,
          // especially the `zoomed` method
          context.featuresJustFitted = true
          context.map.fitBounds(context.dataBounds, { padding: [20, 20], maxZoom: maxFitBoundsZoom })
          context.storeMapBoundsAndSetMapAsReady()

          // Yeah, it is not nice to have nested timeout,
          // but we need it to make sure that this flag is only
          // set as false after a while so other components
          // have time to treat this before it is set to false again
          setTimeout(() => {
            context.featuresJustFitted = false
          }, 500)
        }, 400)
      }
    },
    /**
     * Handle the polygon click event and show the polygon data in a pop-up
     * @param {*} polygon
     */
    polygonInfoClick (polygon) {
      this.infoDialog(polygon.label, null, { code: polygon.data, resizable: true, zIndex: 1001 })
    },

    /**
     * Handle the map right click event,
     * Set the clickLatLng current value
     * and emits events that will trigger the displaying
     * of the right click floating-context menu
     * @param {Object} event
     * @emits mapRightClicked (via EventBus)
     */
    mapRightClick (event) {
      if (this.showClickPopups) {
        const insidePolygon = this.isPointInsidePolygons(event.latlng)
        if (!insidePolygon) {
          const mapEl = this.$refs.map.$el
          GeoUtils.normalizeCoordinates(event.latlng)
          const data = { event, mapEl, canAddStop: this.canAddStop }
          // Event to be caught by the MapRightClick.vue component
          EventBus.$emit('mapRightClicked', data)
        }
        this.clickLatLng = { lat: event.latlng.lat, lng: event.latlng.lng }
      } else if (this.$store.getters.isSidebarVisible) {
        EventBus.$emit('setSidebarStatus', false)
      }
    },

    /**
     * Handle the map left click event
     * Set the clickLatLng current value
     * and emits events that will trigger the displaying
     * of the place info pop up box
     * @param {Object} event
     * @emits setSidebarStatus (via EventBus)
     * @emits mapLeftClicked (via EventBus)
     */
    mapLeftClick (event) {
      if (this.$store.getters.pickPlaceIndex !== null) {
        this.pickPlaceViaClick(event)
      } else {
        let polygonInEditMode = this.isThereAnPolygonInEditMode()
        if (polygonInEditMode) {
          this.getMapObject().then(map => {
            this.saveAvoidPolygonChanges(polygonInEditMode, map)
          })
        } else {
          // If in low resolution and sidebar is open, then left-click on the map
          // must close the sidebar to allow the user to interact with the map.
          // If not then the normal left click handler must be executed
          if (this.$store.getters.isSidebarVisible && this.$lowResolution) {
            EventBus.$emit('setSidebarStatus', false)
          }
          this.handleShowLeftClickPlaceInfo(event)
        }
      }
    },

    /**
     * Check if a polygon is in edit mode
     * and if yes, return it
     * @returns {Object|false}
     */
    isThereAnPolygonInEditMode () {
      let polygons = this.extractAvoidPolygonsFromMap()
      for (let key in polygons) {
        let polygon = polygons[key]
        if (polygon.editing && polygon.editing._enabled) {
          return polygon
        }
      }
      return false
    },

    /**
     * Handle the left click when the place info box must be shown
     * @param {*} event
     * @emits mapLeftClicked
     */
    handleShowLeftClickPlaceInfo (event) {
      const drawPolygonToolbarActive = this.lodash.get(this.drawControlRef, '_toolbars.draw._activeMode')
      const clickedOverPolyline = event.originalEvent && event.originalEvent.clickedOverPolyline === true
      if (this.showClickPopups && !drawPolygonToolbarActive && !clickedOverPolyline) {
        const insidePolygon = this.isPointInsidePolygons(event.latlng)
        GeoUtils.normalizeCoordinates(event.latlng)
        const data = { event, insidePolygon }
        EventBus.$emit('mapLeftClicked', data)
        this.clickLatLng = { lat: event.latlng.lat, lng: event.latlng.lng }
      }
    },

    /**
     * Pick place via click when and cal setInputPlace that will emit 'setInputPlace'
     * @param {*} event
     * @uses pickPlaceIndex store getter
     */
    pickPlaceViaClick (event) {
      let place = new Place(event.latlng.lng, event.latlng.lat)
      let context = this
      let pickPlaceIndex = context.$store.getters.pickPlaceIndex
      let pickPlaceId = context.$store.getters.pickPlaceId
      place.resolve().then(() => {
        context.setInputPlace(pickPlaceIndex, pickPlaceId, place)
        // Once a place was picked up,
        // remove the store pick place data
        context.$store.commit('pickPlaceIndex', null)
        context.$store.commit('pickPlaceId', null)
      })
    },

    /**
     * Check if the lat lng point is inside one of the map polygons
     * If it is returned the polygon points array
     * @param {Leaflet.LatLng} latLng
     * @returns {Boolean|Array}
     */
    isPointInsidePolygons (latLng) {
      for (const key in this.localAvoidPolygons) {
        let polygon = this.localAvoidPolygons[key]
        const coords = GeoUtils.switchLatLonIndex(polygon.geometry.coordinates[0])
        const inside = PolygonUtils.isInsidePolygon(latLng, coords)
        if (inside) {
          return coords
        }
      }
      return false
    },
    /**
     * Adjust the map dimensions and redraw it according the current window size
     * @dispatch resize event
     */
    adjustMap () {
      window.dispatchEvent(new Event('resize'))

      const context = this

      // After map container box is resized
      // we need to wait a bit
      // to redraw the map and then
      // wait a bit more to fit the bounds
      setTimeout(() => {
        // Redraw the map and then wait
        context.redrawMap().then(() => {
          setTimeout(() => {
            // After redrawing and waiting
            // fit the bounds
            context.fitFeaturesBounds()
          }, 500)
        })
      }, 500)
    },

    /**
     * Update the current browser's/user's location on the map
     * If the location can not be determined, show a toaster with this error
     * @param {Boolean} showLocation
     * @uses currentLocation
     */
    updateMyLocation  (showLocation = false) {
      const context = this
      if (showLocation) {
        GeoUtils.getBrowserLocation().then((location) => {
          context.$store.commit('currentLocation', location)
          context.myLocationActive = showLocation

          // Set returned location as map center
          const latLng = GeoUtils.buildLatLong(location.lat, location.lng)
          this.setMapCenter(latLng)
        }).catch(error => {
          const message = this.getPositionErrorMessage(error)
          context.showWarning(message, { timeout: 0 })
          context.myLocationActive = false
          console.log(error)
        })
      } else {
        context.myLocationActive = false
      }
    },

    /**
     * Get position error message according error code
     * @param {*} error
     * @returns {String} message
     * @see https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError
     */
    getPositionErrorMessage (error) {
      // Set the default message
      let message = this.$t('mapView.acquirePositionErrors.generic')

      if (typeof error === 'object') {
        switch (error.code) {
          case 1:
            message = this.$t('mapView.acquirePositionErrors.permissionDenied') // PERMISSION_DENIED
            break
          case 2:
            message = this.$t('mapView.acquirePositionErrors.unavailable') // POSITION_UNAVAILABLE
            break
          case 3:
            message = this.$t('mapView.acquirePositionErrors.timeout') // TIMEOUT
            break
        }
      }
      return message
    },
    /**
     * Get map Object
     * @returns {Promise}
     */
    getMapObject () {
      let context = this
      return new Promise((resolve) => {
        if (context.map) {
          resolve(context.map)
        } else {
          context.$nextTick(() => {
            context.map = context.$refs.map.mapObject
            resolve(context.map)
          })
        }
      })
    },
    /**
     * Set the drawing tool. Avoid multiple calls by debouncing
     */
    setDrawingTool () {
      if (!this.$store.getters.embed && appConfig.supportsAvoidPolygonDrawing) {
        if (this.setDrawingTimeout) {
          clearTimeout(this.setDrawingTimeout)
        }

        // If the map object is already defined, go ahead
        if (this.$refs.map && this.$refs.map.mapObject) {
          this.setAvoidPolygonDrawingTool()
        } else { // if not, wait a second and execute it again
          this.setDrawingTimeout = setTimeout(() => {
            this.setDrawingTool()
          }, 1000)
        }
      }
    },
    /**
     * Set drawing polygon tool to the map object
     * @see https://github.com/DenisCarriere/Leaflet.draw.locales to check the locales supported
     * @listens map.draw:created
     */
    setAvoidPolygonDrawingTool () {
      // Get a reference to the map object
      const map = this.$refs.map.mapObject

      if (!this.showControls && this.drawControlRef) {
        map.removeControl(this.drawControlRef)
        this.drawControlRef = null
      } else {
        // If the drawing controller is already attached
        // we have nothing to do here
        if (this.drawControlRef) {
          return
        }

        // Tell the leaflet drawing locale to use the current app locale
        let shortLocale = I18nBuilder.getShortLocale(this.$i18n.locale)
        let locale
        try {
          locale = drawLocales(shortLocale)
        } catch (error) {
          shortLocale = I18nBuilder.getShortLocale(this.$i18n.fallbackLocale)
          locale = drawLocales(shortLocale)
        }

        // Override the tooltip message
        let avoidPolygonBtnTranslations = {
          avoidPolygon: this.$t('mapView.defineAvoidPolygon'),
          avoidRectangle: this.$t('mapView.defineAvoidRectangle')
        }
        // Run the hook that mey modify the translations
        this.$root.appHooks.run('avoidPolygonBtnTranslations', avoidPolygonBtnTranslations)

        // Set the translations to the buttons
        locale.draw.toolbar.buttons.polygon = avoidPolygonBtnTranslations.avoidPolygon
        locale.draw.toolbar.buttons.rectangle = avoidPolygonBtnTranslations.avoidRectangle

        // Set th custom draw locale to the leaflet draw locale
        Leaflet.drawLocal = locale

        // Add the draw control with custom locale to the map
        this.drawControlRef = new Leaflet.Control.Draw(this.drawOptions)
        map.addControl(this.drawControlRef)

        const context = this

        // Add listener to draw created,
        map.on('draw:created', function (e) {
          context.avoidPolygonCreated(e, map)
        })
      }
    },

    /**
     * Set polygon properties
     * @param {Object} polygon
     * @param {Object} polygonData
     */
    setAvoidPolygonProperties (polygon, polygonData = null) {
      // define polygon feature prop.
      // It will be returned when we get the GeoJSON
      // representation of the polygon
      polygon.feature = polygon.feature || {}
      polygon.feature.type = polygon.feature.type || 'Feature'
      polygon.feature.properties = polygon.feature.properties || {}
      polygon.feature.properties.avoidPolygon = true

      // Append the properties from polygon data
      if (polygonData && polygonData.properties) {
        for (let key in polygonData.properties) {
          polygon.feature.properties[key] = polygonData.properties[key]
        }
      }
    },

    /**
     * Handle polygon created
     * @param {Object} event
     * @param {Object} map
     */
    avoidPolygonCreated (event, map) {
      const polygon = event.layer
      this.setAvoidPolygonProperties(polygon)
      polygon.feature.properties.type = event.layerType
      let context = this
      polygon.addTo(map)
      polygon.on('click', function () { context.onAvoidPolygonClicked(polygon, map) })
      let expectedPromise = this.$root.appHooks.run('avoidPolygonCreated', {polygon, map, context})

      // If a promise is returned
      if (expectedPromise instanceof Promise) {
        expectedPromise.then(() => {
          context.notifyAvoidPolygonsChanged()
        }).catch (err => {
          console.log(err)
        })
      } else {
        context.notifyAvoidPolygonsChanged()
        context.showSuccess(context.$t('mapView.avoidPolygonSaved'))
      }
    },
    /**
     * Save avoid polygon changes
     * @param {Object} polygon
     * @param {Object} map
     */
    saveAvoidPolygonChanges (polygon, map) {
      let context = this
      let expectedPromise = this.$root.appHooks.run('avoidPolygonEdited', {polygon, map, context})

      // If a promise is returned
      if (expectedPromise instanceof Promise) {
        expectedPromise.then(() => {
          polygon.editing.disable()
          polygon.closePopup()
          context.notifyAvoidPolygonsChanged()
        }).catch (err => {
          console.log(err)
        })
      } else {
        polygon.editing.disable()
        polygon.closePopup()
        context.showSuccess(context.$t('mapView.avoidPolygonSaved'))
        context.notifyAvoidPolygonsChanged()
      }
    },
    /**
     * Delete avoid polygon layer and run corresponding hook
     * @param {Object} polygon
     */
    deleteAvoidPolygon (polygon) {
      let context = this
      this.getMapObject().then((map) => {
        let expectedPromise = this.$root.appHooks.run('avoidPolygonRemoved', {polygon, map, context})
        // If a promise is returned
        if (expectedPromise instanceof Promise) {
          expectedPromise.then(() => {
            context.notifyAvoidPolygonsChanged()
          }).catch (err => {
            console.log(err)
          })
        } else {
          map.removeLayer(polygon)
          context.notifyAvoidPolygonsChanged()
          context.showSuccess(context.$t('mapView.avoidPolygonRemoved'))
        }
      })
    },

    /**
     * Enable polygon shape edit and run the corresponding hook
     * @param {*} polygon
     */
    enableAvoidPolygonShapeEdit(polygon) {
      polygon.editing.enable()
      polygon.closePopup()
      this.$root.appHooks.run('avoidPolygonEditModeEnabled', polygon)
      this.showInfo(this.$t('mapView.polygonEditModeEnabled'), {timeout: 10000})
    },

    /**
     * Remove all avoid polygons from map
     */
    removeAllAvoidPolygons() {
      if (this.map) {
        let map = this.map
        map.eachLayer(function (layer) {
          if (layer instanceof Leaflet.Polygon) {
            if (lodash.get(layer, 'feature.properties.avoidPolygon')) {
              map.removeLayer(layer)
            }
          }
        })
      }
    },

    /**
     * Load all avoid polygons from the localAvoidPolygons
     */
    loadAvoidPolygons () {
      let context = this
      this.getMapObject().then((map) => {
        context.removeAllAvoidPolygons()
        for (const key in context.localAvoidPolygons) {
          const polygonData = context.localAvoidPolygons[key]
          const coordinates = GeoUtils.switchLatLonIndex(polygonData.geometry.coordinates[0])
          const polygonOptions = PolygonUtils.buildPolygonOptions(polygonData, context.drawOptions.draw.polygon.shapeOptions.color)
          let polygonShapeType = GeoUtils.geoJsonShapeType(polygonData)
          let polygon = PolygonUtils.createPolygon(coordinates, polygonOptions, polygonShapeType)
          context.setAvoidPolygonProperties(polygon, polygonData)
          polygon.addTo(map)

          // Add handler for the polygon click event
          polygon.on('click', function () {
            context.onAvoidPolygonClicked(polygon, map)
          })
        }
      })
    },

    /**
     * Get all the polygons from the map object
     * @returns {Array} avoidPolygon
     */
    extractAvoidPolygonsFromMap (inGeoJsonFormat = false) {
      const mapAvoidPolygons = []

      if (this.map) {
        // Extract each polygon from the map object
        this.map.eachLayer(function (layer) {
          if (layer instanceof Leaflet.Polygon) {
            let polygonGeoJson = layer.toGeoJSON()

            // properties defined via feature.properties in layer are accessible via
            // .properties when the layer is converted to GeoJSON.
            if (polygonGeoJson.properties && polygonGeoJson.properties.avoidPolygon) {
              if (inGeoJsonFormat) {
                mapAvoidPolygons.push(polygonGeoJson)
              } else {
                mapAvoidPolygons.push(layer)
              }
            }
          }
        })
      }
      return mapAvoidPolygons
    },
    /**
     * Enable edit mode for polygon by adding an edit popup when clicked
     * @param {*} polygon
     */
    onAvoidPolygonClicked (polygon, map) {
      // polygon is already in edit mode
      // So the click is used to sav the changes
      if (polygon.editing._enabled) {
        this.saveAvoidPolygonChanges(polygon, map)
      } else { // build the standard popup, run the popup hook and open the popup
        let popupHtmlFragment = this.buildPolygonClickPopupContent(polygon)
        this.$root.appHooks.run('beforeShowAvoidPolygonPopup', {popupHtmlFragment, polygon})
        polygon.bindPopup(popupHtmlFragment).openPopup()
      }
    },

    /**
     * Build polygon clicked popup content
     * @param {Object} polygon
     * @returns {DocumentFragment}
     */
    buildPolygonClickPopupContent (polygon) {
      const popupContentWrapper = document.createElement('div')

      let editShapeEl = document.createElement('a')
      editShapeEl.onclick = () => {this.enableAvoidPolygonShapeEdit(polygon)}
      editShapeEl.innerText = 'flip_to_front' // material close icon will be rendered
      editShapeEl.title = this.$t('mapView.editShape')
      editShapeEl.className = 'material-icons leaflet-draw-custom-actions'

      let deleteEl = document.createElement('a')
      deleteEl.onclick = () => {this.deleteAvoidPolygon(polygon)}
      deleteEl.innerText = 'delete' // material close icon will be rendered
      deleteEl.title = this.$t('mapView.remove')
      deleteEl.className = 'material-icons leaflet-draw-custom-actions'

      popupContentWrapper.appendChild(editShapeEl)
      popupContentWrapper.appendChild(deleteEl)

      return popupContentWrapper
    },
    /**
     * Get all the polygons and  notify the parent component when
     * an avoid polygon is created
     * @emits avoidPolygonsChanged
     */
    notifyAvoidPolygonsChanged () {
      if (this.$refs.map.mapObject) {
        this.localAvoidPolygons = this.extractAvoidPolygonsFromMap(true)
        this.$emit('avoidPolygonsChanged', this.localAvoidPolygons)
      }
    },
    /**
     * Highlight a route point on the active route index
     * @param {*} routePointIndex
     */
    highlightRoutePoint (routePointIndex) {
      const activeRouteCoordinates = this.localMapViewData.routes[this.$store.getters.activeRouteIndex].geometry.coordinates
      if (activeRouteCoordinates[routePointIndex]) {
        this.highlightedRoutePointIndex = routePointIndex
      }
    },
    /**
     * When altitude info over map close is hit
     */
    closeAltitudeInfo () {
      this.isAltitudeModalOpen = false
      this.removeRoutePoint()
    },
    /**
     * Remove route highlight point
     */
    removeRoutePoint () {
      this.highlightedRoutePointIndex = null
    },
    /**
     * Disable pick a place mode by
     * setting the pick pace index as null
     * @param event
     */
    disablePickPlaceMode (event) {
      if (event.which === 27) { // esc
        this.$store.commit('pickPlaceIndex', null)
      }
    },
    clearMap () {
      this.mapDataBuilder = null
      // When the clearMap event is triggered, we reset places and routes
      this.localMapViewData.places = []
      this.localMapViewData.routes = []
      this.localMapViewData.polygons = []
      this.clickLatLng = null
      this.$store.commit('currentLocation', null)
    },
    /**
     * When a place focus is changed (a new place is selected among the
     * ones listed on the map) updates the map center if the distance
     * between the old center and the new is greater than 50 meters
     */
    placeFocusChanged (place) {
      this.focusedPlace = place

      const distance = GeoUtils.calculateDistanceBetweenLocations(this.$store.getters.mapCenter, place.getLatLng(), 'm')

      // We only consider that the center changed if it
      // changes more than 50 meters from the previous center
      if (distance > 50) {
        this.setFocusedPlace(place)
      }
    },
    /**
     * Highlight polyline sections on the map view by fitting the zoom to focus only the passed extra info
     * @param {*} extraInfo
     */
    highlightPolylineSections (extraInfo) {
      this.extraInfo = extraInfo
      if (this.$store.getters.mapSettings.autoFitHighlightedBounds) {
        this.buildAndSetBounds()
        this.fit()
      }
    },
    /**
     * Add map view initial EventBus listeners
     * @listens redrawAndFitMap (via EventBus)
     * @listens clearMap (via EventBus)
     * @listens clearMap (via EventBus)
     * @listens placeFocusChanged (via EventBus)
     * @listens changeActiveRouteIndex (via EventBus)
     * @listens altitudeChartHoverIndexChanged (via EventBus)
     * @listens mouseLeftChartAltitudeChart (via EventBus)
     * @listens showAltitudeModal (via EventBus)
     * @listens highlightPolylineSections (via EventBus)
     */
    setListeners () {
      const context = this

      EventBus.$on('clearMap', context.clearMap)

      EventBus.$on('changeActiveRouteIndex', context.setActiveRouteIndex)

      EventBus.$on('altitudeChartHoverIndexChanged', context.highlightRoutePoint)

      EventBus.$on('mouseLeftChartAltitudeChart', context.removeRoutePoint)

      EventBus.$on('showAltitudeModal', () => { context.isAltitudeModalOpen = true })

      EventBus.$on('mapSettingsChanged', context.setProviders)

      EventBus.$on('placeFocusChanged', context.placeFocusChanged)

      EventBus.$on('highlightPolylineSections', context.highlightPolylineSections)

      EventBus.$on('redrawAndFitMap', (data) => {
        if (data.guid && data.guid === context.guid) {
          context.adjustMap()
        }
      })
    },

    /**
     * Toggle the accessible mode by
     * storing the flag under the mapSettings store
     * to do so we get the current setting object, update it,
     * convert it to a stringified representation and
     * save it to the browsers local storage
     * @uses localStorage
     */
    toggleAccessibleMode () {
      let mapSettings = this.$store.getters.mapSettings
      mapSettings.accessibleModeActive = !mapSettings.accessibleModeActive

      this.$store.dispatch('saveSettings', mapSettings).then(() => {
        console.log('Settings saved')
      })
    },
  },

  /**
   * Set the initial state of the map when the component is mounted
   * and call calling loadMapData, setProviders, setDrawingTool, storeMapBoundsAndSetMapAsReady.
   * @emits onCreate
   * @listens map.addInitHook and add a handler
   */
  mounted () {
    this.zoomLevel = this.initialZoom

    // Define a unique identifier to the map component instance
    this.guid = Utils.guid()

    // When the box is created, it emits
    // an event to its parent telling the parent its guid
    this.$emit('onCreate', this.guid)

    this.setListeners()

    // Add the gesture handling so that when the user is
    // scrolling a page (embed state) with an ors map it
    // will actually scroll the page and not the map
    Leaflet.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling)

    // Once the map component is mounted, load the map data
    this.loadMapData()
    this.setDrawingTool()
    this.storeMapBoundsAndSetMapAsReady()
  },
  /**
   * Set the local showClickPopups value
   * and set the map center on create
   */
  created () {
    // Copy the prop value to a local prop,
    // so it can be modified locally
    this.getImgSrc = Utils.getImgSrc
    this.showClickPopups = this.showPopups
    this.localAvoidPolygons = this.avoidPolygons
    this.loadAvoidPolygons()
    this.setProviders()
    this.setMapCenter()
    window.addEventListener('keyup', this.disablePickPlaceMode)
  }
}
