import constants from '@/resources/constants'
import MapViewData from '@/models/map-view-data'
import appConfig from '@/config/app-config'
import lodash from 'lodash'
import {EventBus} from '@/common/event-bus'

/**
 * Render and deals with right click events
 * @emits closed
 * @emits rightClickEvent
 * @listens mapRightClicked
 * @listens mapLeftClicked (to close the right click pop up)
 */
export default {
  data () {
    return {
      showRightClickPopup: false,
      rightClickPopUpX: null,
      rightClickPopUpY: null,
      clickPoint: null,
      clickLatLng: null,
      data: null
    }
  },
  props: {
    mapViewData: {
      required: true,
      type: MapViewData
    }
  },
  computed: {
    canAddStop () {
      return this.$store.getters.mode === constants.modes.directions && this.mapViewData.hasRoutes()
    },
    show () {
      return this.showRightClickPopup
    },
    directionsToHereText () {
      let text = this.$t('mapRightClick.directionsToHere')
      if (!this.mapViewData.hasRoutes()) {
        return text
      } else {
        text = this.$t('mapRightClick.nonStopDirectionsToHere')
        return text
      }
    },
    canAddIsochroneCenter () {
      return this.$store.getters.mode === constants.modes.isochrones || (this.$store.getters.mode === constants.modes.place && !this.$store.getters.isSidebarVisible)
    },
    canRoute () {
      return this.$store.getters.mode !== constants.modes.isochrones
    },
    canShowInspector () {
      return true
    }
  },
  methods: {
    inspectDataOnOSM () {
      let zoom = lodash.get(this, '$store.getters.appRouteData.options.zoom')
      if (!zoom) {
        zoom = appConfig.initialZoomLevel
      }
      let url = `https://www.openstreetmap.org/query?lat=${this.clickLatLng.lat}&lon=${this.clickLatLng.lng}#map=${zoom}/${this.clickLatLng.lat}/${this.clickLatLng.lng}`
      window.open(url, '_blank')
    },
    /**
     * Deal with close event by hiding the right click pop up
     * and by emitting close event
     * @emits closed
     */
    closed () {
      this.showRightClickPopup = false
      this.$emit('closed')
    },
    /**
     * Send the right click event
     * @param {*} eventName
     * @emits rightClickEvent
     */
    rightClickEvent (eventName) {
      this.showRightClickPopup = false
      const clickLatLng = this.clickLatLng
      const data = { eventName, clickLatLng }
      this.$emit('rightClickEvent', data)
      this.clickLatLng = null
    },
    /**
     * Deal wth the map right click, preparing the data and displaying the modal
     * @param {*} data
     */
    mapRightClick (data) {
      this.showRightClickPopup = false
      this.data = data
      const event = data.event
      const mapEl = data.mapEl
      const boxWidth = 190
      const boxHeight = 217
      const mapWidth = mapEl.clientWidth
      const mapHeight = mapEl.clientHeight
      const offsetX = 10
      const offsetY = 10

      // Define the x and y where the box must start from based on
      // the location of the click and the box size.
      // The goal is to avoid the box to overflow the size
      // and always start the box in the point selected
      // showing one of its corners joined to the selected point
      let x = event.containerPoint.x > (mapWidth / 2) ? event.containerPoint.x - (boxWidth + offsetX) : event.containerPoint.x
      if (x <= 0) {
        x = event.containerPoint.x
      }

      let y = event.containerPoint.y > (mapHeight / 2) ? event.containerPoint.y - (boxHeight + offsetY) : event.containerPoint.y
      if (y <= 0) {
        y = event.containerPoint.y
      }

      this.rightClickPopUpX = `${x}px`
      this.rightClickPopUpY = `${y}px`
      this.clickLatLng = event.latlng
      this.showRightClickPopup = true
      this.callHook()
    },
    callHook () {
      let context = this
      setTimeout(() => {
        let el = context.$el.querySelectorAll('.box-content')
        if (!el || el.length === 0) {
          context.callHook()
        } else {
          let hookData = {context: context, containerRef: el[0], latLng: context.clickLatLng}
          context.$root.appHooks.run('rightClickContentReady', hookData)
        }
      }, 200)
    }
  },
  created () {
    const context = this
    EventBus.$on('mapRightClicked', (data) => {
      context.mapRightClick(data)
    })
    EventBus.$on('mapLeftClicked', () => {
      context.showRightClickPopup = false
    })
  },
}
