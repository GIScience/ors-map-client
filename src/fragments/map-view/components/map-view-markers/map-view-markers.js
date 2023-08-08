import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import constants from '@/resources/constants'
import {LMarker, LPopup } from 'vue2-leaflet'
import appConfig from '@/config/app-config'

import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

export default {
  props: {
    isPoi: {
      type: Boolean,
      default: false
    },
    markers: {
      default: () => [],
      type: Array
    },
    mode: {
      type: String,
      required: true
    },
  },
  components: {
    LMarker,
    LPopup,
    'v-marker-cluster': Vue2LeafletMarkerCluster
  },
  computed: {
    localMarkers () {
      return this.markers
    },
    /**
     * Determines if marker cluster must be used or not
     * @returns {Boolean}
     */
    supportsClusteredMarkers () {
      return appConfig.supportsClusteredMarkers
    },
    /**
     * Return the marker cluster options. By default, it is empty,
     * but it can be changed via app hook
     * @returns {Object}
     */
    markersClusterOptions () {
      let options = {}
      // If the options object is modified in the hook, the changes
      // will reflect here and the returned object will incorporate the changes
      this.$root.appHooks.run('beforeUseMarkerClusterOptions', options)
      return options
    },
    /**
     * Determines if markers are removable
     * based on the current app mode
     * @returns {Boolean} isRemovable
     */
    markerIsRemovable () {
      if (this.isPoi || this.$store.getters.embed) {
        return false
      }
      let markerRemovableModes = [constants.modes.directions, constants.modes.roundTrip, constants.modes.isochrones, constants.modes.place]
      let isRemovable = markerRemovableModes.includes(this.mode)
      return isRemovable
    },
    /**
     * Determines if markers are draggable
     * based on the current app mode
     * @returns {Boolean} isDraggable
     */
    markerIsDraggable () {
      if (this.isPoi || this.$store.getters.embed) {
        return false
      }
      const draggableModes = [constants.modes.directions, constants.modes.roundTrip, constants.modes.isochrones]
      const isDraggable = draggableModes.includes(this.mode)
      return isDraggable
    },

    /**
     * Show the marker popup
     */
    showMarkerPopup () {
      const show = this.mode !== constants.modes.search || appConfig.supportsSearchBottomCarousel !== true
      return show
    },
  },
  methods: {
    /**
     * Determines if the direct mode is available to be
     * triggered from a marker at a given index
     * @param {*} index
     * @returns {Boolean} available
     */
    directIsAvailable (index) {
      if (this.isPoi) {
        return false
      }
      let available = false
      if (this.mode === constants.modes.directions && index < (this.markers.length -1)) {
        available = true
      }
      return available
    },
    markerMoved (event) {
      this.$emit('markerMoved', event)
    },
    show (index, clustered = false) {
      let markerIsClustered = this.markers[index].clustered === true
      let matchesClusteringRule = clustered === markerIsClustered
      return matchesClusteringRule
    },
    markerClicked (index, marker, event) {
      // Only prevent the default click, that shows the
      // place name if the app is not in the search mode
      if (this.mode === constants.modes.search && appConfig.supportsSearchBottomCarousel === true) {
        event.originalEvent.preventDefault()
        event.originalEvent.stopPropagation()
      }
      this.$emit('markerClicked', marker.place)
      let markerPopupContainerRef = this.$refs[`markerPopupContainer${index}`]
      markerPopupContainerRef = Array.isArray(markerPopupContainerRef) ? markerPopupContainerRef[0] : markerPopupContainerRef
      this.$root.appHooks.run('beforeOpenMarkerPopup', {markerPopupContainerRef, marker})
    },
    removePlace(index) {
      this.$emit('removePlace', index)
    },
    markAsDirectFromHere (index) {
      this.$emit('markAsDirectFromHere', index)
    }
  },
}
