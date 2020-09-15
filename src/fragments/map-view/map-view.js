/**
 * MapView component.
 * Renders an leaflet map based on the mapViewData passed via props. Capture the map events, dealing with them or emitting events
 * @uses storage defined in @see /src/store/modules/map-state
 *
 * Events that this component listens to:
 * @listens redrawAndFitMap [via eventBus] - event that will trigger a map redraw and refit bounds - expects {isMaximized: Boolean, guid: String}
 * @listens clearMap [via eventBus] - event that will trigger a map clear
 * @listens changeActiveRouteIndex [via eventBus] - event that will trigger active rounte index change
 * @listens placeFocusChanged [via eventBus] - updates the map center when a new place is seleted
 *
 * Events emitted via eventBus:
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
 */

import { LMap, LTileLayer, LMarker, LPolyline, LLayerGroup, LTooltip, LPopup, LControlZoom, LControlAttribution, LControlScale, LControlLayers, LGeoJson, LPolygon, LCircle, LCircleMarker } from 'vue2-leaflet'
import routeData from '@/support/map-data-services/ors-response-data-extractors/route-data'
import ExtraInfoHighlight from './components/extra-info-highlight/ExtraInfoHighlight'
import MapRightClick from './components/map-right-click/MapRightClick'
import { EditableMap, EditablePolyline } from 'vue2-leaflet-editable'
import OrsExtendedPolyline from './components/ors-extended-polyline'
import LControlPolylineMeasure from 'vue2-leaflet-polyline-measure'
import MapLeftClick from './components/map-left-click/MapLeftClick'
import AltitudeInfo from './components/altitude-info/AltitudeInfo'
import MyLocation from './components/my-location/MyLocation'
import { GestureHandling } from 'leaflet-gesture-handling'
import LDrawToolbar from 'vue2-leaflet-draw-toolbar'
import PolygonUtils from '@/support/polygon-utils'
import MapViewData from '@/models/map-view-data'
import drawLocales from 'leaflet-draw-locales'
import mapDefinitions from './map-definitions'
import constants from '@/resources/constants'
import GeoUtils from '@/support/geo-utils'
import utils from '@/support/utils'
import theme from '@/common/theme'
import Place from '@/models/place'

// imported styles
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'
import 'leaflet-measure/dist/leaflet-measure.css'
import 'vue-resize/dist/vue-resize.css'
import Leaflet from 'leaflet'
import geoUtils from '../../support/geo-utils'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
    LLayerGroup,
    LTooltip,
    LPopup,
    LControlZoom,
    LControlAttribution,
    LControlScale,
    LControlLayers,
    LGeoJson,
    LPolygon,
    LCircle,
    LCircleMarker,
    LControlPolylineMeasure,
    LDrawToolbar,
    EditablePolyline,
    EditableMap,
    ExtraInfoHighlight,
    MapRightClick,
    MapLeftClick,
    MyLocation,
    AltitudeInfo
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
    shrinked: {
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
    }
  },
  data () {
    return {
      tileProviders: [], // list fo tiles provider that will be set via setProviders
      layersPosition: 'topright',
      map: null, // map object reference. it will will be defined later
      zoomLevel: constants.initialZoomLevel,
      mapDataBuilder: null,
      initialMaxZoom: constants.initialMapMaxZoom,
      localMapViewData: new MapViewData(), // we use a local copy of the mapViewData to be able to modify it
      mainRouteColor: theme.primary,
      alternativeRouteColor: constants.alternativeRouteColor,
      routeBackgroundColor: constants.routeBackgroundColor,
      guid: null,
      clickLatlng: null,
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
      highlightedRoutePoint: null, // a point on the route that must be highlighted (a Leaflet latLng)
      highlightedRoutePointAltitude: null,
      isAltitudeModalOpen: false,
      extraInfo: null, // Extra route info (waytypes, surface, steepness etc)
      tempPlaces: null, // a place selected by the user on the map but not yet used for computing directions,
      polylineIsEdibale: false,
      orsExtendedPolyline: new OrsExtendedPolyline()
    }
  },
  computed: {
    // When in embedded mode, a 'view on ors' btn is displayed and
    // thhe target url of this btn is the not embedded versios
    nonEmbedUrl() {
      let url = location.href.split('/embed')[0]
      return url
    },
    zoom () {
      const zoom = this.zoomLevel > 0 ? this.zoomLevel : this.maxZoom
      return zoom
    },
    showControls () {
      let show = true
      if (this.shrinked && this.$lowResolution) {
        show = false
      }
      return show
    },
    mapOptions () {
      return {
        zoomControl: this.showControls,
        attributionControl: true,
        measureControl: true,
        gestureHandling:this.$store.getters.embed
      }
    },
    mapCenter () {
      if (this.hasOnlyOneMarker) {
        const singlePlaceCenter = GeoUtils.buildLatLong(this.markers[0].position.lat, this.markers[0].position.lng)
        return singlePlaceCenter
      } else {
        return this.$store.getters.mapCenter
      }
    },
    hasOnlyOneMarker () {
      return this.markers && this.markers.length === 1
    },
    showBrand () {
      return this.currentInnerHeight > 450
    },
    geojsonOptions () {
      const tooltip = this.routeToolTip(0)
      return {
        style: { color: this.mainRouteColor, weight: '5' },
        onEachFeature: (feature, layer) => {
          layer.bindTooltip(tooltip, { permanent: false, sticky: true })
        }
      }
    },
    geojsonOutlineOptions () {
      return { style: { color: constants.routeBackgroundColor, weight: '9' } }
    },
    activeRouteData () {
      if (this.localMapViewData.hasRoutes()) {
        // get the coordinates of the active route
        const coords = this.localMapViewData.routes[this.$store.getters.activeRouteIndex].geometry.coordinates

        // Vue2-Leaflet,used to render data on the mpa, expect the coordinates in the [lat,lon] order,
        // but the GeoJSON format returned by ORS API contains coordinates in the [lon lat] order.
        // So we invert them to provide to the component what is expected
        const activeRoute = GeoUtils.switchLatLonIndex(coords)
        return activeRoute
      }
    },
    alternativeRoutes () {
      const alternativeRoutesData = []
      if (this.localMapViewData.hasRoutes()) {
        for (const key in this.localMapViewData.routes) {
          const index = Number(key)
          if (index !== this.$store.getters.activeRouteIndex) {
            // Vue2-Leaflet,used to render data on the mpa, expect the coordinates in the [lat,lon] order,
            // but the GeoJSON format returned by ORS API contains coordinates in the [lon lat] order.
            // So we invert them to provide to the component what is expected
            const coords = GeoUtils.switchLatLonIndex(this.localMapViewData.routes[key].geometry.coordinates)
            const alternativeRoute = { polyline: coords, index: index }
            alternativeRoutesData.push(alternativeRoute)
          }
        }
      }
      return alternativeRoutesData
    },
    polygons () {
      const polygons = []
      if (this.localMapViewData) {
        const translations = this.$t('global.units')
        translations.polygon = this.$t('global.polygon')
        for (const key in this.localMapViewData.polygons) {
          const polygon = this.localMapViewData.polygons[key]
          polygon.color = PolygonUtils.buildPolygonColor(key)
          polygon.label = PolygonUtils.buildPolygonLabel(polygon, translations)

          // Vue2-Leaflet,used to render data on the mpa, expect the coordinates in the [lat,lon] order,
          // but the GeoJSON format returned by ORS API contains coordinates in the [lon lat] order.
          // So we invert them to provide to the component what is expected
          polygon.latlngs = GeoUtils.switchLatLonIndex(polygon.geometry.coordinates[0])
          polygons.push(polygon)
        }
      }
      return polygons
    },
    markers () {
      let tempMapViewData
      if (this.tempPlaces) {
        tempMapViewData = new MapViewData()
        tempMapViewData.places = this.tempPlaces
      } else {
        tempMapViewData = this.localMapViewData
      }
      if (tempMapViewData.places.length > 0) {
        const markers = GeoUtils.buildMarkers(tempMapViewData, this.focusedPlace)
        return markers
      }
    },
    maxZoom () {
      if (this.localMapViewData.maxZoom) {
        return this.localMapViewData.maxZoom
      }
      return this.initialMaxZoom
    },
    circleMarker () {
      if (this.clickLatlng) {
        return {
          center: Leaflet.latLng(this.clickLatlng.lat, this.clickLatlng.lng),
          radius: 8
        }
      }
    },
    myPositionMarker () {
      if (this.$store.getters.currentLocation) {
        const markerData = {
          center: Leaflet.latLng(this.$store.getters.currentLocation.lat, this.$store.getters.currentLocation.lng),
          radius: 9,
          accuracy: this.$store.getters.currentLocation.accuracy,
          opacity: 0.7
        }
        return markerData
      }
    },
    canAddStop () {
      const can = !Array.isArray(this.markers) || this.markers.length < 15
      return can
    },
    polylineMeasureOptions () {
      const options = mapDefinitions.polylineMeasureOptions(this.$t('mapView.polylineMeasure'))
      return options
    },

    drawOptions () {
      const options = mapDefinitions.drawOptions(this.$t('mapView.youCantIntersectPolygons'))
      return options
    },

    mapHeight () {
      return this.height
    },
    markerIsDraggable () {
      const draggableModes = [constants.modes.directions, constants.modes.roundTrip, constants.modes.isochrones]
      const isDraggable = draggableModes.includes(this.mode)
      return isDraggable
    },
    markerIsRemovable () {
      let markerRemovableModes = [constants.modes.directions, constants.modes.roundTrip, constants.modes.isochrones]
      let isRemovable = markerRemovableModes.includes(this.mode)
      return isRemovable
    },
    showMarkerPopup () {
      const show = this.mode !== constants.modes.search
      return show
    },
    /**
     * Determines if the fit features button is visible
     * @returns boolean
     */
    canFitFeatures () {
      if (this.mapViewData.hasPlaces() || this.mapViewData.hasRoutes()) {
        return true
      }
      return false
    },
    /**
     * If an active route data must be shown
     * @returns {Boolean} show
     */
    showActivRouteData () {
      const show = this.activeRouteData && this.showActiveRouteData
      return show
    },

    activeRouteIsDraggable () {
      let isDraggable = this.mode === constants.modes.directions
      return isDraggable
    }
  },
  watch: {
    /**
     * Every time the response data changes
     * the map builder is reseted and the
     * map data is reloaded
     */
    mapViewData: {
      handler: function () {
        // When the mapViewData prop changes, we copy its value to a
        // local instance so that we can modify it when necessary

        // Create a new instace of MapViewData and set all the props into the local instance
        this.localMapViewData = this.mapViewData.clone()
        this.tempPlaces = null
        this.loadMapData()
        this.isAltitudeModalOpen = false
      },
      deep: true
    },
    supportsDrawingTool (newVal) {
      if (newVal) {
        this.setDrawingTool()
      }
    },
    shrinked () {
      // Once the map view is shrinked
      // we have to run the setDrawingTool
      // utility again
      this.setDrawingTool()
    },
    showPopups (newVal) {
      this.showClickPopups = newVal
    },
    /**
     * Rebuild providers when a custom one is set
     */
    customTileProviderUrl () {
      this.setProviders()
    },
    height () {
      this.adjustMap()
    },
    mode () {
      // Altitude modal must be hidden if mode is not directions or roundTrip
      if (this.mode !== constants.modes.directions && this.mode !== constants.modes.roundTrip) {
        this.isAltitudeModalOpen = false
      }
    },
    center: {
      handler: function () {
        this.centerChanged()
      },
      deep: true
    }
  },
  methods: {
    /**
     * Move the map center according the direction
     * @param {String} direction 
     */
    moveMapCenter(direction) {
      console.log(direction)
      // Calculate the offset
      var offsset
      switch (direction) {
        case 'left':
          var offset = this.map.getSize().x*0.15;
          this.map.panBy(new L.Point(-offset, 0), {animate: true})
          break;
        case 'right':
          var offset = this.map.getSize().x*0.15;
          this.map.panBy(new L.Point(offset, 0), {animate: true})
          break;
        case 'up':
          var offset = this.map.getSize().y*0.15;
          this.map.panBy(new L.Point(0, -offset), {animate: true})
          break;
        case 'down':
          var offset = this.map.getSize().y*0.15;
          this.map.panBy(new L.Point(0, offset), {animate: true})
          break;
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
     * peventing the propagation and emitting
     * a local event
     * @param {*} place
     * @param {*} event
     */
    markerClicked (place, event) {
      // Only prevent the default click, that shows the
      // place name if the app is not in the search mode
      if (this.mode === constants.modes.search) {
        event.originalEvent.preventDefault()
        event.originalEvent.stopPropagation()
      }
      this.$emit('markerClicked', place)
    },
    /**
     * Builds the route tooltip string
     * @param {*} index
     * @returns {String} tooltip
     */
    routeToolTip (index) {
      if (this.localMapViewData) {
        const summaryCopy = Object.assign({}, this.localMapViewData.routes[index].summary)
        const tooltip = this.humanizeRouteToolTip(summaryCopy)
        return tooltip
      }
    },
    /**
     * Deals with the map center changed event trigerred by the vue2leaflet
     * component. Get the current map center, set it via setMapCenter and
     * define the current myLocationActive based on the last map center
     * @param {*} event
     */
    mapMoved (event) {
      const center = event.target.getCenter()

      const distance = GeoUtils.calculateDistanceBetweenLocations(this.$store.getters.mapCenter, center, 'm')
      // We only consider that the center changed if it
      // changes more than 50 meters from the previous center
      if (distance > 50) {
        this.setMapCenter(center)
        const data = { center: this.$store.getters.mapCenter, distance: distance }
        this.$emit('mapCenterMoved', data)
      }
      // If the map is moved by the user the myLocation is reset it in order to define if
      // my location circle should continue to appear as map center
      if (this.myLocationActive) {
        const distance = GeoUtils.calculateDistanceBetweenLocations(this.$store.getters.currentLocation, center, 'm')
        // For some unknow reason, when a new map center
        // is defined it may varies from the location acquired
        // via browser location api. So, we are considering that
        // if this distance is less then 50 meters, then the my
        // location must still be considered as active
        this.myLocationActive = distance < 50
      }
    },
    /**
     * Handle the alternative route index seleted event
     * @param {*} index
     * @param {*} event
     */
    alternativeRouteIndexSelected (index, event) {
      event.originalEvent.stopPropagation()
      event.originalEvent.preventDefault()
      this.eventBus.$emit('activeRouteIndexChanged', index)
      this.setActiveRouteIndex(index)
    },
    /**
     * Change the current active route index
     * @param {*} index
     * @param {*} event
     * @emits activeRouteIndexChanged
     */
    setActiveRouteIndex (index) {
      const context = this
      this.$store.commit('activeRouteIndex', index)

      // We just want to disalbe the showClickPopups
      // temporaly, so we get the original state
      // set it as false and after a two seconds
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

      // Show the route selected data
      // if in low resolution mode.
      // If not in low resolution, the route
      // data is visible on the sidebar
      if (this.localMapViewData.hasRoutes()) {
        // get tooltip message without the html tags
        const message = this.routeToolTip(index).replace(/<(?:.|\n)*?>/gm, ' ')
        this.showInfo(message)
      }
    },

    /**
     * When a layer is selected in the layer control
     * remove the expand class so that it is closed
     * after the selection
     */
    baseLayerChanged () {
      const layerControl = document.querySelector('.leaflet-control-layers')
      layerControl.classList.remove('leaflet-control-layers-expanded')
    },
    /**
     * We watch the box model for changes and update the internal closed data that is used to control the visibility of the box
     * @emits zoomChanged
     */
    zoomed (event) {
      this.zoomLevel = event.sourceTarget._zoom
      this.$emit('zoomChanged', event.sourceTarget._zoom)
    },

    /**
     * Set the map tile providers available
     */
    setProviders () {
      this.tileProviders = mapDefinitions.getProviders()
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
     * by creating a debounce in order to
     * recalculate the route and update the map
     * view. A 1 second dealy is applied to avoid
     * subsequent marker move updates and get the new
     * position only when the movement has ended
     * @param {*} event
     */
    markerMoved (event) {
      // only marker changes that are a result
      // of user interaction are treated here
      // with vue2-leaflet v 2.5.2 the event.originalEvent was no instance of window.PointerEvent anymore
      // use parent window.MouseEvent instead
      if (event.originalEvent instanceof window.MouseEvent) {
        clearTimeout(this.markerMoveTimeoutId)
        this.markerMoveTimeoutId = setTimeout(() => {
          this.markerDragEnd(event)
        }, 1000)
      }
    },
    /**
     * Add stop via polyline drag
     * @param {*} data 
     */
    addStopViaPolylineDrag (data) {
      data.latlng = data.event.target.getLatLng()
      const closestPlaceIndex = GeoUtils.getStopInjectIndexFromPolyline(data.latlng, this.mapViewData.places, this.activeRouteData, data.draggedFromIndex)
      data.injectIndex = closestPlaceIndex
      this.$emit('addRouteStop', data)
    },
    followPolyline (latlng) {
      // implement show the point altitude
      // console.log(latlng)
    },
    /**
     * Remove a marker/place when in directions or isochrones mode
     * @param {*} event
     * @param {*} markerIndex
     */
    removePlace (event, markerIndex) {
      if (this.markers[markerIndex]) {
        let place = this.markers[markerIndex].place
        let data = {place, index: markerIndex}
        this.$emit('removePlace', data)
      }
    },
    /**
     * Deal with the marker drag end event
     * getting the marker index and emitting and event
     * @param {*} event
     * @emits markerDragged
     */
    markerDragEnd (event) {
      const targetLatlng = event.oldLatLng
      let markerIndex = null

      // Find the marker index by comparing the lat and long
      for (let index = 0; index < this.markers.length; index++) {
        const markerP = this.markers[index].position
        if (markerP.lat === targetLatlng.lat && markerP.lng === targetLatlng.lng) {
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
     * @param {*} latlng
     * @use localStorage
     * @emits mapCenterChanged
     */
    setMapCenter (latlng) {
      if (latlng) {
        const previousCenter = this.$store.getters.mapCenter
        this.$store.commit('mapCenter', latlng)
        this.storeMapBounds()

        // Store current map center
        localStorage.setItem('mapCenter', JSON.stringify(latlng))

        if (previousCenter) {
          // Notify about the current map center change
          this.$emit('mapCenterChanged', this.$store.getters.mapCenter)
        }
      } else {
        const routePlaces = this.$store.getters.appRouteData.places

        // Run the utility that may define a more
        // appropriate map center if appRouteData is empty
        if (routePlaces.length === 0 || routePlaces[0].isEmpty()) {
          if (this.center) {
            this.setMapCenter(this.center)
          } else {
            this.setPreviousOrDefaultCenter()
          }
        } else {
          this.setPreviousOrDefaultCenter()
        }
      }
    },

    /**
     * Set the default or previous center
     */
    setPreviousOrDefaultCenter () {
      const storedMapCenter = localStorage.getItem('mapCenter')
      if (storedMapCenter) {
        this.setMapCenter(JSON.parse(storedMapCenter))
      } else {
        // By default the center is Heidelberg (Germany))
        const defaultCenter = GeoUtils.buildLatLong(49.510944, 8.76709)
        this.setMapCenter(defaultCenter)
      }
    },

    /**
     * Set map bounds
     */
    storeMapBounds () {
      const buildBondaryes = (bounds) => {
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
      if (!this.map && this.$refs.map) {
        this.map = this.$refs.map.mapObject
      }
      if (this.map) {
        const bounds = this.map.getBounds()
        const mapBounds = buildBondaryes(bounds)
        this.$store.commit('mapBounds', mapBounds)
        this.$store.commit('mapReady', true)
      } else {
        this.$nextTick(() => {
          this.map = this.$refs.map.mapObject
          const bounds = this.map.getBounds()
          const mapBounds = buildBondaryes(bounds)
          this.$store.commit('mapBounds', mapBounds)
          this.$store.commit('mapReady', true)
        })
      }
    },

    /**
     * To load map data we use the map builder service
     * and then once it is ready, we set the local data from
     * the data returned by the builder
     * and then set the bounds, fit the bounds and redraw the map
     * If the response data does not contains a geojson
     * then the promise resolver will return an object with the expected
     * props but all of then containing null values. This will not cause a fail
     *
     */
    loadMapData () {
      if (this.localMapViewData.hasPlaces()) {
        this.defineMapViewMaxZoom()
        this.defineActiveRouteIndex()
        this.updateMarkersLabel()
        this.fitFeaturesBounds()
        this.loadAvoidPolygons()
      }
    },
    /**
     * Defines the appropriate max zoom level to be used
     */
    defineMapViewMaxZoom () {
      this.localMapViewData.maxZoom = this.localMapViewData.maxZoom ? this.localMapViewData.maxZoom : this.initialMaxZoom
    },
    /**
     * Build and set bounds based on localMapViewData
     */
    buildAndSetBounds () {
      const bounds = this.localMapViewData.bbox || [{ lon: 0, lat: 0 }, { lon: 0, lat: 0 }]
      let polylineData = []

      if (this.extraInfo) {
        polylineData = this.buildExtraInfoBoundsPolyline()
        this.dataBounds = GeoUtils.getBounds(bounds, [], polylineData)
      } else {
        // Add the routes coordinates to the polyline that must
        // be considered to  the all features databound
        for (const rKey in this.localMapViewData.routes) {
          if (this.localMapViewData.routes[rKey].geometry.coordinates) {
            // Vue2-Leaflet,used to render data on the mpa, expect the coordinates in the [lat,lon] order,
            // but the GeoJSON format returned by ORS API contains coordinates in the [lon lat] order.
            // So we invert them to provide to the component what is expected
            const coords = GeoUtils.switchLatLonIndex(this.localMapViewData.routes[rKey].geometry.coordinates)
            polylineData = polylineData.concat(coords)
          }
        }
        // Add the polygons coordinates to the polyline that must
        // be considered to  the all features databound
        for (const pKey in this.polygons) {
          if (this.polygons[pKey].latlngs) {
            polylineData = polylineData.concat(this.polygons[pKey].latlngs)
          }
        }
        // Build the all features databounds taking into consideration
        // the places and the roues/polygons polyline
        if (this.localMapViewData.hasPlaces() || polylineData.length > 0) {
          this.dataBounds = GeoUtils.getBounds(bounds, this.localMapViewData.places, polylineData)
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
      const highlightData = routeData.buildHighlightedPolylines(this.activeRouteData, this.extraInfo)
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
     * Set zoom level based on the layer when has only asingle maker rendered
     * @param {Object} leaflet map object
     * @return {Boolean} zoom changed
     */
    setZoomLevel (mapObj) {
      const curretMapZoom = mapObj.getZoom()
      if (curretMapZoom !== this.zoomLevel) {
        mapObj.setZoom(this.zoomLevel)
        return true
      }
      return false
    },
    /**
     * Redraw the map component by faking a window resize event
     */
    redrawMap () {
      return new Promise((resolve, reject) => {
        // This is a hack to force leaflet redraw/resize correctly the maps
        // in the case when there are two map viewers and the container of one of them
        // is resized.
        // The candidates map.invalidateSize() and map.eachLayer(function(layer){layer.redraw();});
        // have not worked at all on this case
        // @see https://github.com/Leaflet/Leaflet/issues/694
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'))
          resolve()
        }, 10)
      })
    },

    /**
     * Emit the right click event according the parameter received
     * This methods emits only one of the events listed below at a time
     * @param {Object} data { eventName:..., clickLatlng: ...}
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
     */
    prepareDataAndEmitRightClickEvent (data) {
      let place = new Place(data.clickLatlng.lng, data.clickLatlng.lat)
      place.resolve().then(() =>{
        // If the app is in the place mode (no route yet drawn on the map)
        // and the user is selecting points to calculate a route, then
        // show this points as markers on the map view. These points will
        // not be synchronized with the app url, so we just add them in the
        // localMapViewData and we do not emit a mapViewDatachanged event. 
        // This will only happens when two points are selected (then the app 
        // goes to the directions mode)
        if (this.mode === constants.modes.place && data.eventName === 'directionsToPoint' || data.eventName === 'directionsFromPoint') {
          let placesCopy = [... this.localMapViewData.places]
          placesCopy.push(place)
          this.tempPlaces = placesCopy
        }
        const dataPassed = { latlng: data.clickLatlng, place}
        this.$emit(data.eventName, dataPassed)
      })
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
      const context = this

      // get and use the fit bounds option to determine if the fit should be run
      const maxFitBoundsZoom = this.hasOnlyOneMarker ? context.zoomLevel : this.maxZoom

      return new Promise((resolve, reject) => {
        context.buildAndSetBounds()
        // If the map object is already defined
        // then we can directly access it
        if (context.map && context.isValidBounds(context.dataBounds)) {
          context.fitAndZoom(force, maxFitBoundsZoom)
        } else {
          // If not, it wil be available only in the next tick
          context.$nextTick(() => {
            context.buildAndSetBounds()
            if (context.$refs.map && context.isValidBounds(context.dataBounds)) {
              context.map = context.$refs.map.mapObject // work as expected when wrapped in a $nextTick
              context.fitAndZoom(force, maxFitBoundsZoom)
            }
            resolve()
          })
        }
      })
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
      // hidde the sidebar so that the featues can be seen
      if (this.$lowResolution) {
        this.eventBus.$emit('setSidebarStatus', false)
      }
    },

    /**
     * Define the zoom level or fit the bounds function
     */
    fitAndZoom (force, maxFitBoundsZoom) {
      if (this.dataBounds && (this.fitBounds === true || force === true)) {
        // we set the max zoom in level and then fit the bounds
        // Temporally disabled the zoomlevel seeting to check impacts (it seems not to be necessary anymore)
        // this.zoomLevel = this.initialMaxZoom

        // To make it work properly we have to wait a bit
        // before fitting the map bounds
        const context = this
        setTimeout(() => {
          context.map.fitBounds(context.dataBounds, { padding: [20, 20], maxZoom: maxFitBoundsZoom })
        }, 400)
      }
    },
    /**
     * Handle the polygon click event and show the polygon data in a pop up
     * @param {*} polygon
     */
    polygonInfoClick (polygon) {
      this.infoDialog(polygon.label, null, { code: polygon.data, resizable: true, zIndex: 1001 })
    },

    /**
     * Handle the map right cick event, showing the options pop up box
     */
    mapRightClick (event) {
      if (this.showClickPopups) {
        // To be catch by the MapRightClick.vue component
        const insidePolygon = this.isPointInsidePolygons(event.latlng.lat, event.latlng.lng)
        if (!insidePolygon) {
          const mapEl = this.$refs.map.$el
          const data = { event, mapEl, canAddStop: this.canAddStop }
          this.eventBus.$emit('mapRightClicked', data)
        }
        this.clickLatlng = { lat: event.latlng.lat, lng: event.latlng.lng }
      }
    },

    /**
     * Handle the map left cick event, showing the place info pop up box
     */
    mapLeftClick (event) {
      // If in low resolution and sidebar is open, then left click on the map
      // must close the side bar to allow the user to interact with the map.
      // If not then the normal left click handlr must be executed
      if (this.$store.getters.leftSideBarOpen && this.$lowResolution) {
        this.eventBus.$emit('setSidebarStatus', false)
      } else {
        const drawPolygonToolbarActive = this.lodash.get(this.drawControlRef, '_toolbars.draw._activeMode')
        if (this.showClickPopups && !drawPolygonToolbarActive) {
          const insidePolygon = this.isPointInsidePolygons(event.latlng.lat, event.latlng.lng)
          const data = { event, insidePolygon }
          this.eventBus.$emit('mapLeftClicked', data)
          this.clickLatlng = { lat: event.latlng.lat, lng: event.latlng.lng }
        }
      }
    },

    /**
     * Check if the a lat lng point is inside in one of the map polygons
     * If it is returnd the polygon points array
     * @param {*} lat
     * @param {*} lng
     * @returns Boolean|Array
     */
    isPointInsidePolygons (lat, lng) {
      const polygons = this.extractPolygonsFromMap()
      for (const key in polygons.coordinates) {
        const coords = polygons.coordinates[key][0]
        const inside = GeoUtils.isPointInsidePolygon(lat, lng, coords)
        if (inside) {
          return coords
        }
      }
      return false
    },
    /**
     * Get the polyline humanized tool tip if the response contains a route summary
     * @returns {Array} coordinates
     */
    humanizeRouteToolTip (tooltipData) {
      if (tooltipData && typeof tooltipData === 'object' && tooltipData.distance && tooltipData.unit && tooltipData.duration) {
        const humanizedData = GeoUtils.getHumanizedTimeAndDistance(tooltipData, this.$t('mapView'))
        const formattedTooltip = `${this.$t('mapView.distance')} ${humanizedData.distance}<br>${this.$t('mapView.duration')} ${humanizedData.duration}`
        return formattedTooltip
      }
    },
    /**
     * Adjust the map dimensions and redraw it according the current window size
     */
    adjustMap () {
      window.dispatchEvent(new Event('resize'))

      const context = this

      // After map container box is resized
      // we need to wait a little bit
      // to redraw the map and then
      // wait a little bit more to fit the bounds
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
     * @param {Boolean} showMarker
     */
    updateMyLocation  (showMarker = false) {
      const context = this
      GeoUtils.getBrowserLocation().then((location) => {
        context.$store.commit('currentLocation', location)
        context.myLocationActive = showMarker

        // Set returned location as map center
        const latlng = GeoUtils.buildLatLong(location.lat, location.lng)
        this.setMapCenter(latlng)
      }).catch(error => {
        const message = this.getPositionErrorMessage(error)
        context.showWarning(message, { timeout: 0 })
        context.myLocationActive = false
        console.log(error)
      })
    },

    /**
     * Get position erro according error code
     * @param {*} error
     * @returns {String} message
     */
    getPositionErrorMessage (error) {
      // Set the default message
      let message = this.$t('mapView.acquirePositionErros.generic')

      if (typeof error === 'object') {
        // Treat the error cases
        // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError

        switch (error.code) {
          case 1:
            message = this.$t('mapView.acquirePositionErros.permissionDenied') // PERMISSION_DENIED
            break
          case 2:
            message = this.$t('mapView.acquirePositionErros.unavailable') // POSITION_UNAVAILABLE
            break
          case 3:
            message = this.$t('mapView.acquirePositionErros.timeout') // TIMEOUT
            break
        }
      }
      return message
    },
    /**
     * Set the drawing tool. Avoid multiple calls by
     * udebouncing them
     */
    setDrawingTool () {
      if (!this.$store.getters.embed) {
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
        // check the locales supported here: https://github.com/DenisCarriere/Leaflet.draw.locales
        const locale = drawLocales(this.$i18n.locale)

        // Override the tooltip message
        locale.draw.toolbar.buttons.polygon = this.$t('mapView.defineAvoidPolygon')

        // Set th custom draw locale to the leaflet draw locale
        Leaflet.drawLocal = locale

        // Add the draw control with custom locale to the map
        this.drawControlRef = new Leaflet.Control.Draw(this.drawOptions)
        map.addControl(this.drawControlRef)

        const context = this

        // Add listeners to draw created,
        // deleted and edited events
        map.on('draw:created', function (e) {
          context.onPolygonCreation(e, map)
          context.notifyAvoidPolygonsChanged()
        })
        map.on('draw:deleted', function (e) {
          context.notifyAvoidPolygonsChanged()
        })
        map.on('draw:edited', function (e) {
          context.notifyAvoidPolygonsChanged()
        })
        this.loadAvoidPolygons()
      }
    },

    /**
     * Recreate/redraw polygons on the view based
     * on the localMapViewData avoid_polygons option
     */
    loadAvoidPolygons () {
      const polygonsDrawn = this.extractPolygonsFromMap()
      const avoidPolygons = this.lodash.get(this.$store.getters.appRouteData, 'options.options.avoid_polygons')

      // If there are polygons to be recreated in the options and
      // there are not polygons already drawn, recreate/redraw them
      if (avoidPolygons && polygonsDrawn.coordinates.length === 0) {
        const map = this.$refs.map.mapObject
        for (const key in avoidPolygons.coordinates) {
          const coordinates = GeoUtils.switchLatLonIndex(avoidPolygons.coordinates[key][0])

          // Set the color options of the polygons about to be drawn
          const polygonOptions = { color: this.drawOptions.draw.polygon.shapeOptions.color }

          // Create each polygon using the leaflet tool
          // adn add it to the map object
          const polygon = Leaflet.polygon(coordinates, polygonOptions).addTo(map)

          // Add handler for the polygon click event
          const context = this
          polygon.on('click', function (event) {
            context.onPolygonClicked(polygon, event)
          })
        }
      }
    },

    /**
     * When a polygon is created add it to the map and a hendler to the click event
     * @param {*} event
     * @param {*} map
     */
    onPolygonCreation (event, map) {
      const context = this
      const polygon = event.layer
      polygon.on('click', function (event) {
        context.onPolygonClicked(polygon, event)
      })
      polygon.addTo(map)
    },

    /**
     * Enable edit mode for polygon by ading a edit popup when clicked
     * @param {*} polygon
     * @param {*} event
     */
    onPolygonClicked (polygon, event) {
      const map = this.$refs.map.mapObject
      polygon.editMode = true

      new Leaflet.Toolbar2.EditToolbar.Popup(event.latlng, {
        actions: [Leaflet.Toolbar2.EditAction.Popup.Edit, Leaflet.Toolbar2.EditAction.Popup.Delete]
      }).addTo(map, polygon)
    },
    /**
     * Get all the polygons and  notify the parent component when
     * an avoid polygon is created
     */
    notifyAvoidPolygonsChanged () {
      if (this.$refs.map.mapObject) {
        const avoidPolygon = this.extractPolygonsFromMap()
        this.$emit('avoidPolygonsChanged', avoidPolygon)
      }
    },

    /**
     * Get all the polygons from the map object
     */
    extractPolygonsFromMap () {
      // We create a MultPolygon object
      // becouse in it we can put one or multiple
      // polygons :-)
      const avoidPolygon = { type: 'MultiPolygon', coordinates: [] }

      // Extract each polygon from the map object
      this.$refs.map.mapObject.eachLayer(function (layer) {
        if (layer instanceof Leaflet.Polygon) {
          const geojson = layer.toGeoJSON()
          avoidPolygon.coordinates.push(geojson.geometry.coordinates)
        }
      })
      return avoidPolygon
    },
    /**
     * Highligh a rounte point on the active route index
     * @param {*} routeIndex
     */
    hightlightRoutePoint (routeIndex) {
      const activeRouteCoordinates = this.localMapViewData.routes[this.$store.getters.activeRouteIndex].geometry.coordinates
      if (activeRouteCoordinates[routeIndex]) {
        const point = activeRouteCoordinates[routeIndex]
        this.highlightedRoutePointAltitude = point[2]
        this.highlightedRoutePoint = Leaflet.latLng(point[1], point[0])
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
      this.highlightedRoutePoint = null
      this.highlightedRoutePointAltitude = null
    }
  },

  mounted () {    
    this.zoomLevel = this.initialZoom

    // Define a unique identifier to the map component instance
    this.guid = utils.guid()

    // When the box is created, it emit
    // an event to its parent telling the parent its guid
    this.$emit('onCreate', this.guid)

    // When the box that contains the map is resized

    // we need to resize the map height, redraw the map
    // and then fit the bounds
    const context = this
    this.eventBus.$on('redrawAndFitMap', (data) => {
      if (data.guid && data.guid === context.guid) {
        context.adjustMap()
      }
    })

    /**
     * Clear all the map data plotted (lines, polygons markers etc)
     */
    this.eventBus.$on('clearMap', () => {
      context.mapDataBuilder = null
      // When the clearMap event is triggred, we reset places and routes
      context.localMapViewData.places = []
      context.localMapViewData.routes = []
      context.localMapViewData.polygons = []
      context.clickLatlng = null
      this.$store.commit('currentLocation', null)
    })

    /**
     * When a place focus is changed (a new place is selected among the
     * ones listed on the map) updates the map center if the distance
     * between the old center and the new is greatet then 50 emter
     */
    this.eventBus.$on('placeFocusChanged', (place) => {
      context.focusedPlace = place
      const center = GeoUtils.buildLatLong(place.lat, place.lng)
      const distance = GeoUtils.calculateDistanceBetweenLocations(this.$store.getters.mapCenter, center, 'm')

      // We only consider that the center changed if it
      // changes more than 50 meters from the previous center
      if (distance > 50) {
        this.setMapCenter(center)
      }
    })

    this.eventBus.$on('changeActiveRouteIndex', this.setActiveRouteIndex)

    this.eventBus.$on('altitudeChartHoverIndexChanged', this.hightlightRoutePoint)

    this.eventBus.$on('mouseLeftChartAltitudeChart', this.removeRoutePoint)

    this.eventBus.$on('showAltitudeModal', function () {
      context.isAltitudeModalOpen = true
    })

    this.eventBus.$on('highlightPolylineSections', (extraInfo) => {
      context.extraInfo = extraInfo
      if (this.$store.getters.mapSettings.autoFitHighlightedBounds) {
        context.buildAndSetBounds()
        context.fitAndZoom()
      }
    })
    // Add the gesture handling so that when the user is 
    // scrolling a page (embed state) with an ors map it 
    // will actually scroll the page and not the map
    Leaflet.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling)

    // Once the map component is mounted, load the map data
    this.loadMapData()
    this.setProviders()
    this.setDrawingTool()
  },
  created () {
    // Copy the prop value to a local prop
    // so it can be modified locally
    this.showClickPopups = this.showPopups

    this.setMapCenter()
  }
}
