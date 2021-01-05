
import {LMarker, LPopup } from 'vue2-leaflet'
import constants from '@/resources/constants'
export default {
  props: {
    markers: {
      default: () => [],
      type: Array
    },
    clustered: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      required: true
    },
  },
  components: {
    LMarker,
    LPopup
  },
  computed: {
    localMarkers () {
      return this.markers
    },
    /**
     * Determines if markers are removable
     * based on the current app mode
     * @returns {Boolean} isRemovable
     */
    markerIsRemovable () {
      let markerRemovableModes = [constants.modes.directions, constants.modes.roundTrip, constants.modes.isochrones]
      let isRemovable = markerRemovableModes.includes(this.mode)
      return isRemovable
    },
    /**
     * Determines if markers are draggable
     * based on the current app mode
     * @returns {Boolean} isDraggable
     */
    markerIsDraggable () {
      const draggableModes = [constants.modes.directions, constants.modes.roundTrip, constants.modes.isochrones]
      const isDraggable = draggableModes.includes(this.mode)
      return isDraggable
    },
    
     /**
     * Show the marker popup
     */
    showMarkerPopup () {
      const show = this.mode !== constants.modes.search
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
      let available = false
      if (this.mode === constants.modes.directions && index < (this.markers.length -1)) {
        available = true
      }
      return available
    },
    markerMoved (event) {
      this.$emit('markerMoved', event)
    },
    show (index) {
      let markerIsClustered = this.markers[index].clustered === true
      let matchesClusteringRule = markerIsClustered === this.clustered
      return matchesClusteringRule
    },
    markerClicked (index, marker, event) {
      // Only prevent the default click, that shows the
      // place name if the app is not in the search mode
      if (this.mode === constants.modes.search) {
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
    markAsDirectfromHere (index) {
      this.$emit('markAsDirectfromHere', index)
    }
  },
}
