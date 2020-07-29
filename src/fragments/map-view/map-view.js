/**
 * MapView component.
 * Renders an leaflet map based on the mapViewData passed via props. Capture the map events, dealing with them or emitting events
 * @uses storage defined in @see /src/store/modules/map-state
 *
 * Events that this component listens to:
 * @listens redrawAndFitMap [via eventBus] - event that will trigger a map redraw and refit bounds - expects {isMaximized: Boolean, guid: String}
 * @listens clearMap [via eventBus] - event that will trigger a map clear
 * @listens activeRouteIndexChanged [via eventBus] - event that will trigger active rounte index change
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
import ExtraInfoHighlight from './components/extra-info-highlight/ExtraInfoHighlight'
import MapRightClick from './components/map-right-click/MapRightClick'
import LControlPolylineMeasure from 'vue2-leaflet-polyline-measure'
import MapLeftClick from './components/map-left-click/MapLeftClick'
import MyLocation from './components/my-location/MyLocation'
import LDrawToolbar from 'vue2-leaflet-draw-toolbar'
import MapViewData from '@/models/map-view-data'
import drawLocales from 'leaflet-draw-locales'
import mapDefinitions from './map-definitions'
import constants from '@/resources/constants'
import GeoUtils from '@/support/geo-utils'
import PolygonUtils from '@/support/polygon-utils'
import utils from '@/support/utils'
import theme from '@/common/theme'

// imported styles
import 'leaflet-measure/dist/leaflet-measure.css'
import 'vue-resize/dist/vue-resize.css'
import Leaflet from 'leaflet'

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
    ExtraInfoHighlight,
    MapRightClick,
    MapLeftClick,
    MyLocation
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
      tileProviders: [],
      layersPosition: 'topright',
      map: null,
      zoomLevel: constants.initialZoomLevel,
      mapDataBuilder: null,
      initialMaxZoom: constants.initialMapMaxZoom,
      localMapViewData: new MapViewData(), // we use a local copy of the mapViewData to be able to modify it
      info: null,
      mainRouteColor: theme.primary,
      alternativeRouteColor: '#6E6E6E',
      guid: null,
      markersLatLong: [],
      clickLatlng: null,
      myLocationActive: false,
      setDrawingTimeout: null,
      markerMoveTimeoutId: null,
      drawControlRef: null,
      clickInsidePolygon: null,
      currentInnerHeight: null,
      showClickPopups: true,
      showActiveRouteData: true,
      showAlternativeRouteTooltip: true,
      dataBounds: null,
      myLocationMenuOpen: false,
      focusedPlace: null,
      highlightedRoutePoint: null
    }
  },
  computed: {
    zoom () {
      let zoom = this.zoomLevel > 0 ? this.zoomLevel : this.maxZoom
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
        measureControl: true
      }
    },
    mapCenter () {
      if (this.hasOnlyOneMarker) {
        let singlePlaceCenter = GeoUtils.buildLatLong(this.markers[0].position.lat, this.markers[0].position.lng)
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
      let tooltip = this.routeToolTip(0)
      return {
        style: {color: this.mainRouteColor, weight: '5'},
        onEachFeature: (feature, layer) => {
          layer.bindTooltip(tooltip, { permanent: false, sticky: true })
        }
      }
    },
    geojsonOutlineOptions () {
      return { style: { color: '#fff', weight: '9' } }
    },
    activeRouteData () {
      if (this.localMapViewData.hasRoutes()) {
        let coords = this.localMapViewData.routes[this.$store.getters.activeRouteIndex].geometry.coordinates

        // Vue2-Leaflet,used to render data on the mpa, expect the coordinates in the [lat,lon] order,
        // but the GeoJSON format returned by ORS API contains coordinates in the [lon lat] order.
        // So we invert them to provide to the component what is expected
        let activeRoute = GeoUtils.switchLatLonIndex(coords)
        return activeRoute
      }
    },
    alternativeRoutesData () {
      let alternativeRoutesPolyline = []
      if (this.localMapViewData.hasRoutes()) {
        for (let key in this.localMapViewData.routes) {
          // Vue2-Leaflet,used to render data on the mpa, expect the coordinates in the [lat,lon] order,
          // but the GeoJSON format returned by ORS API contains coordinates in the [lon lat] order.
          // So we invert them to provide to the component what is expected
          let coords = GeoUtils.switchLatLonIndex(this.localMapViewData.routes[key].geometry.coordinates)
          alternativeRoutesPolyline.push(coords)
        }
      }
      return alternativeRoutesPolyline
    },
    polygons () {
      let polygons = []
      if (this.localMapViewData) {
        let translations = this.$t('global.units')
        translations.polygon = this.$t('global.polygon')
        for (let key in this.localMapViewData.polygons) {
          let polygon = this.localMapViewData.polygons[key]
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
      if (this.localMapViewData.hasPlaces()) {
        let markers = GeoUtils.buildMarkers(this.localMapViewData, this.focusedPlace)
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
        let markerData = {
          center: Leaflet.latLng(this.$store.getters.currentLocation.lat, this.$store.getters.currentLocation.lng),
          radius: 9,
          accuracy: this.$store.getters.currentLocation.accuracy,
          opacity: 0.7
        }
        return markerData
      }
    },
    canAddStop () {
      let can = !Array.isArray(this.markers) || this.markers.length < 15
      return can
    },
    polylineMeasureOptions () {
      let polylineMeasureTranslations = this.$t('mapView.polylineMeasure')
      let options = mapDefinitions.polylineMeasureOptions(polylineMeasureTranslations)
      return options
    },

    drawOptions () {
      let options = mapDefinitions.drawOptions(this.$t('mapView.youCantIntersectPolygons'))
      return options
    },

    mapHeight () {
      return this.height
    },
    markerIsDraggable () {
      let draggableModes = [constants.modes.directions, constants.modes.roundTrip, constants.modes.isochrones]
      let isDraggable = draggableModes.includes(this.mode)
      return isDraggable
    },
    showMarkerPopup () {
      let show = this.mode !== constants.modes.search
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
        this.loadMapData()
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
    customTileProviderUrl () {
      this.setProviders()
    },
    height () {
      this.adjustMap()
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
     * Update the view center
     */
    centerChanged () {
      if (this.center) {
        this.setMapCenter(this.center)
        let currentLocation = {lat: this.center.lat, lng: this.center.lng, accuracy: 50}
        this.$store.commit('currentLocation', currentLocation)
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
        let summaryCopy = Object.assign({}, this.localMapViewData.routes[index].summary)
        let tooltip = this.humanizeRouteToolTip(summaryCopy)
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
      let center = event.target.getCenter()

      let distance = GeoUtils.calculateDistanceBetweenLocations(this.$store.getters.mapCenter, center, 'm')
      // We only consider that the center changed if it
      // changes more than 50 meters from the previous center
      if (distance > 50) {
        this.setMapCenter(center)
        let data = { center: this.$store.getters.mapCenter, distance: distance }
        this.$emit('mapCenterMoved', data)
      }
      // If the map is moved by the user the myLocation is reset it in order to define if
      // my location circle should continue to appear as map center
      if (this.myLocationActive) {
        let distance = GeoUtils.calculateDistanceBetweenLocations(this.$store.getters.currentLocation, center, 'm')
        // For some unknow reason, when a new map center
        // is defined it may varies from the location acquired
        // via browser location api. So, we are considering that
        // if this distance is less then 50 meters, then the my
        // location must still be considered as active
        this.myLocationActive = distance < 50
      }
    },
    /**
     * Change the current active route index
     * @param {*} index
     * @param {*} event
     * @emits activeRouteIndexChanged
     */
    setActiveRouteIndex (index, event) {
      this.$store.commit('activeRouteIndex', index)
      if (event) {
        event.originalEvent.stopPropagation()
        event.originalEvent.preventDefault()
      }

      // We just want to disalbe the showClickPopups
      // temporaly, so we capy the original state
      // set it as false and after a two seconds
      // we restore the original value
      let showPopupBefore = this.showClickPopups
      this.showClickPopups = false
      setTimeout(() => {
        this.showClickPopups = showPopupBefore
      }, 2000)

      // Force the active route polyline to render again
      // after a timeout in order to make sure it
      // is over the other polylines
      let showActiveRouteDataBefore = this.showActiveRouteData
      this.showActiveRouteData = false
      setTimeout(() => {
        this.showActiveRouteData = showActiveRouteDataBefore
      }, 100)

      // Show the route selected data
      // if in low resolution mode
      // if not in low resolution, the route
      // data is visible on the sidebar
      if (this.localMapViewData.hasRoutes()) {
        // get tooltip and remove any html from the tool tip
        let message = this.routeToolTip(index).replace(/<(?:.|\n)*?>/gm, ' ')
        this.showInfo(message)
      }
      this.eventBus.$emit('activeRouteIndexChanged', index)
    },

    /**
     * When a layer is selected in the layer control
     * remove the expand class so that it is closed
     * after the selection
     */
    baseLayerChanged () {
      let layerControl = document.querySelector('.leaflet-control-layers')
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
        for (let key in this.localMapViewData.places) {
          let humanizedIndex = Number(key) + 1
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
    markerMove (event) {
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

    polylineMoved (event) {
      console.log(event)
    },
    /**
     * Deal with the marker drag end event
     * getting the marker index and emitting and event
     * @param {*} event
     * @emits markerDragged
     */
    markerDragEnd (event) {
      let targetLatlng = event.oldLatLng
      let markerIndex = null

      // Find the marker index by comparing the lat and long
      for (let index = 0; index < this.markers.length; index++) {
        let markerP = this.markers[index].position
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
        let marker = this.markers[markerIndex]
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
        let previousCenter = this.$store.getters.mapCenter
        this.$store.commit('mapCenter', latlng)
        this.storeMapBounds()

        // Store current map center
        localStorage.setItem('mapCenter', JSON.stringify(latlng))

        if (previousCenter) {
          // Notify about the current map center change
          this.$emit('mapCenterChanged', this.$store.getters.mapCenter)
        }
      } else {
        let routePlaces = this.$store.getters.appRouteData.places

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
      let storedMapCenter = localStorage.getItem('mapCenter')
      if (storedMapCenter) {
        this.setMapCenter(JSON.parse(storedMapCenter))
      } else {
        // By default the center is Heidelberg (Germany))
        let defaultCenter = GeoUtils.buildLatLong(49.510944, 8.76709)
        this.setMapCenter(defaultCenter)
      }
    },

    /**
     * Set map bounds
     */
    storeMapBounds () {
      let buildBondaryes = (bounds) => {
        let boundary = {
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
        let bounds = this.map.getBounds()
        let mapBounds = buildBondaryes(bounds)
        this.$store.commit('mapBounds', mapBounds)
        this.$store.commit('mapReady', true)
      } else {
        this.$nextTick(() => {
          this.map = this.$refs.map.mapObject
          let bounds = this.map.getBounds()
          let mapBounds = buildBondaryes(bounds)
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
      let bounds = this.localMapViewData.bbox || [{lon: 0, lat: 0}, {lon: 0, lat: 0}]
      let polylineData = []

      // Add the routes coordinates to the polyline that must
      // be considered to  the all features databound
      for (let rKey in this.localMapViewData.routes) {
        if (this.localMapViewData.routes[rKey].geometry.coordinates) {
          // Vue2-Leaflet,used to render data on the mpa, expect the coordinates in the [lat,lon] order,
          // but the GeoJSON format returned by ORS API contains coordinates in the [lon lat] order.
          // So we invert them to provide to the component what is expected
          let coords = GeoUtils.switchLatLonIndex(this.localMapViewData.routes[rKey].geometry.coordinates)
          polylineData = polylineData.concat(coords)
        }
      }
      // Add the polygons coordinates to the polyline that must
      // be considered to  the all features databound
      for (let pKey in this.polygons) {
        if (this.polygons[pKey].latlngs) {
          polylineData = polylineData.concat(this.polygons[pKey].latlngs)
        }
      }
      // Build the all features databounds taking into consideration
      // the places and the roues/polygons polyline
      this.dataBounds = GeoUtils.getBounds(bounds, this.localMapViewData.places, polylineData)
    },
    /**
     * Make sure the active route index is valid
     */
    defineActiveRouteIndex () {
      if (this.localMapViewData.hasRoutes()) {
        let maxRouteIndexValid = this.localMapViewData.routes.length - 1
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
      let curretMapZoom = mapObj.getZoom()
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
        let dataPassed = {latlng: data.clickLatlng}
        this.$emit(data.eventName, dataPassed)
      }
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
      let context = this

      // get and use the fit bounds option to determine if the fit should be run
      let maxFitBoundsZoom = this.hasOnlyOneMarker ? context.zoomLevel : this.maxZoom

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
      if (this.fitBounds === true || force === true) {
        // If the mapViewData contains routes
        // then set the zoom as the initialMaxZoom
        // becasue the fit bounds will be run

        // To make it work properly we have to wait a bit
        // before fitting the map bounds
        let context = this
        setTimeout(() => {
          context.map.fitBounds(context.dataBounds, {padding: [20, 20], maxZoom: maxFitBoundsZoom})
        }, 400)
      }
    },
    /**
     * Handle the polygon click event and show the polygon data in a pop up
     * @param {*} polygon
     */
    polygonInfoClick (polygon) {
      this.infoDialog(polygon.label, null, {code: polygon.data, resizable: true, zIndex: 1001})
    },

    /**
     * Handle the map right cick event, showing the options pop up box
     */
    mapRightClick (event) {
      if (this.showClickPopups) {
        // To be catch by the MapRightClick.vue component
        let insidePolygon = this.isPointInsidePolygons(event.latlng.lat, event.latlng.lng)
        if (!insidePolygon) {
          let mapEl = this.$refs.map.$el
          let data = {event, mapEl, canAddStop: this.canAddStop}
          this.eventBus.$emit('mapRightClicked', data)
        }
        this.clickLatlng = {lat: event.latlng.lat, lng: event.latlng.lng}
      }
    },

    /**
     * Handle the map left cick event, showing the place info pop up box
     */
    mapLeftClick (event) {
      let drawPolygonToolbarActive = this.lodash.get(this.drawControlRef, '_toolbars.draw._activeMode')
      if (this.showClickPopups && !drawPolygonToolbarActive) {
        let insidePolygon = this.isPointInsidePolygons(event.latlng.lat, event.latlng.lng)
        let data = {event, insidePolygon}
        this.eventBus.$emit('mapLeftClicked', data)
        this.clickLatlng = {lat: event.latlng.lat, lng: event.latlng.lng}
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
      let polygons = this.extractPolygonsFromMap()
      for (let key in polygons.coordinates) {
        let coords = polygons.coordinates[key][0]
        let inside = GeoUtils.isPointInsidePolygon(lat, lng, coords)
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
        let humanizedData = GeoUtils.getHumanizedTimeAndDistance(tooltipData, this.$t('mapView'))
        let formattedTooltip = `${this.$t('mapView.distance')} ${humanizedData.distance}<br>${this.$t('mapView.duration')} ${humanizedData.duration}`
        return formattedTooltip
      }
    },
    /**
     * Adjust the map dimensions and redraw it according the current window size
     */
    adjustMap () {
      window.dispatchEvent(new Event('resize'))

      let context = this

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
      let context = this
      GeoUtils.getBrowserLocation().then((location) => {
        context.$store.commit('currentLocation', location)
        context.myLocationActive = showMarker

        // Set returned location as map center
        let latlng = GeoUtils.buildLatLong(location.lat, location.lng)
        this.setMapCenter(latlng)
      }).catch(error => {
        let message = this.getPositionErrorMessage(error)
        context.showWarning(message, {timeout: 0})
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
    },
    /**
     * Set drawing polygon tool to the map object
     */
    setAvoidPolygonDrawingTool () {
      // Get a reference to the map object
      let map = this.$refs.map.mapObject

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

        let context = this

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
      let polygonsDrawn = this.extractPolygonsFromMap()
      let avoidPolygons = this.lodash.get(this.$store.getters.appRouteData, 'options.options.avoid_polygons')

      // If there are polygons to be recreated in the options and
      // there are not polygons already drawn, recreate/redraw them
      if (avoidPolygons && polygonsDrawn.coordinates.length === 0) {
        let map = this.$refs.map.mapObject
        for (let key in avoidPolygons.coordinates) {
          let coordinates = GeoUtils.switchLatLonIndex(avoidPolygons.coordinates[key][0])

          // Set the color options of the polygons about to be drawn
          let polygonOptions = {color: this.drawOptions.draw.polygon.shapeOptions.color}

          // Create each polygon using the leaflet tool
          // adn add it to the map object
          let polygon = Leaflet.polygon(coordinates, polygonOptions).addTo(map)

          // Add handler for the polygon click event
          let context = this
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
      let context = this
      let polygon = event.layer
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
      let map = this.$refs.map.mapObject
      polygon.editMode = true

      new Leaflet.Toolbar2.EditToolbar.Popup(event.latlng, {
        actions: [ Leaflet.Toolbar2.EditAction.Popup.Edit, Leaflet.Toolbar2.EditAction.Popup.Delete ]
      }).addTo(map, polygon)
    },
    /**
     * Get all the polygons and  notify the parent component when
     * an avoid polygon is created
     */
    notifyAvoidPolygonsChanged () {
      if (this.$refs.map.mapObject) {
        let avoidPolygon = this.extractPolygonsFromMap()
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
      let avoidPolygon = { type: 'MultiPolygon', coordinates: [] }

      // Extract each polygon from the map object
      this.$refs.map.mapObject.eachLayer(function (layer) {
        if (layer instanceof Leaflet.Polygon) {
          let geojson = layer.toGeoJSON()
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
      let activeRouteCoordinates = this.localMapViewData.routes[this.$store.getters.activeRouteIndex].geometry.coordinates
      if (activeRouteCoordinates[routeIndex]) {
        let point = activeRouteCoordinates[routeIndex]
        this.highlightedRoutePoint = Leaflet.latLng(point[0], point[1])
      }
    },
    /**
     * Remove route highlight point
     */
    removeRoutePoint () {
      this.highlightedRoutePoint = null
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
    let context = this
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
    })

    /**
     * When a place focus is changed (a new place is selected among the
     * ones listed on the map) updates the map center if the distance
     * between the old center and the new is greatet then 50 emter
     */
    this.eventBus.$on('placeFocusChanged', (place) => {
      context.focusedPlace = place
      let center = GeoUtils.buildLatLong(place.lat, place.lng)
      let distance = GeoUtils.calculateDistanceBetweenLocations(this.$store.getters.mapCenter, center, 'm')

      // We only consider that the center changed if it
      // changes more than 50 meters from the previous center
      if (distance > 50) {
        this.setMapCenter(center)
      }
    })

    this.eventBus.$on('activeRouteIndexChanged', this.setActiveRouteIndex)

    this.eventBus.$on('altitudeChartHoverIndexChanged', this.hightlightRoutePoint)

    this.eventBus.$on('mouseLeftChartAltitudeChart', this.removeRoutePoint)

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
