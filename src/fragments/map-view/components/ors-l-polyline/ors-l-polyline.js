import OrsExtendedPolyline from './ors-extended-polyline'
import { LPolyline, LTooltip, LPopup} from 'vue2-leaflet'
import constants from '@/resources/constants'
import GeoUtils from '@/support/geo-utils'
import theme from '@/config/theme'
import lodash from 'lodash'

export default {
  data () {
    return {
      orsExtendedPolyline: null,
      backgroundWeight: 11, // will automaticaly be changed based on the weight value on `created`,
      active: true
    }
  },
  components: {
    LPolyline,
    LTooltip,
    LPopup
  },
  props: {
    options: {
      type: Object,
      Type: Array,
      default: function () {
        return {}
      }
    },
    route: {
      type: Object,
      default: function () {
        return {}
      }
    },
    latLngs: {
      type: Array,
      default: function () {
        return []
      }
    },
    weight: {
      type: Number,
      default: 7
    },
    focusedPolyIndex: {
      type: Number,
      default: null
    },
    color: {
      type: String,
      default: theme.primary
    },
    backgroundColor: {
      type: String,
      default: constants.routeBackgroundColor,
    },
    draggable: {
      type: Boolean,
      default: false
    },
    notActive: {
      type: Boolean,
      default: false
    },
    tooltipIcon: {
      type: String,
      required: false
    }
  },
  watch: {
    focusedPolyIndex: function (newVal) {
      if (newVal !== null) {
        this.showPolylinePointByIndex(newVal)
      }
    },
    'route': function () {
      this.active = false
      setTimeout(() => {
        this.active = true
      }, 100)
    },
  },
  methods: {
    addStopViaPolylineDrag (data) {
      this.$emit('addStopViaPolylineDrag', data)
    },
    followPolyline (data) {
      this.$emit('followPolyline', data)
    },
    openPopup(event) {
      this.$nextTick(() => {
        event.target.openPopup()
      })
    },
    /**
     * When the polyline is clicked
     * check if it is active. If so, show clicked point
     * the polyline details. If not active, just
     * forward the event by emitting a vuejs `click` event
     * @param {*} event 
     * @emits click
     */
    click (event) {
      if (!this.notActive && this.$refs.foregroundPolyline.mapObject) {
        this.openPopup(event)
      } else {        
        this.$emit('click', event)
      }
    },
    /**
     * Show the details of a polyline point
     * by firing the polylineClicked event
     * @param {Event} event 
     * @fire polylineClicked
     */
    showPolylinePointDetails (event) {
      const leafletPolylineObject = this.$refs.foregroundPolyline.mapObject
      let originalEvent = event.originalEvent || event
      originalEvent.stopPropagation()
      originalEvent.preventDefault()
      originalEvent.clckedOverPolyline = true
      leafletPolylineObject.fire('polylineClicked', event)
    },
    /**
     * Show the polyline point by index
     * @param {Number} polylineCoordsIndex 
     */
    showPolylinePointByIndex (polylineCoordsIndex) {
      const customEvent = new Event('showPolylinePointByIndex')
      const point = this.latLngsCoordinates[polylineCoordsIndex]
      customEvent.latlng = GeoUtils.buildLatLong(point[0], point[1])
      this.showPolylinePointDetails(customEvent)
    }
  },
  computed: {
    /**
     * Get the latlngs coodinate array
     * from the latLngs prop or from the route
     * coordinates or return an empty array
     * @returns {Array}
     */
    latLngsCoordinates () {
      if (this.latLngs.length > 0) {
        return this.latLngs
      } else {
        let latLngs = lodash.get(this.route, 'geometry.coordinates')
        if (latLngs && Array.isArray(latLngs) && latLngs.length > 0) {
          return latLngs
        } else {
          return []
        }
      }
    },
    popupContent () {
      const summaryCopy = Object.assign({}, this.route.summary)
      const humanizedData = GeoUtils.getHumanizedTimeAndDistance(summaryCopy, this.$t('global.units'))
      let tooltipInnerContent = `${this.$t('global.distance')} ${humanizedData.distance}`
      if (humanizedData.duration) {
        tooltipInnerContent += `<br> ${this.$t('global.duration')} ${humanizedData.duration}`
      }
      if (this.tooltipIcon) {
        let tooltip = `
        <div>
          <div style='min-width:30px;width:20%;height:50px;float:left'>
            <span class="material-icons">${this.tooltipIcon}</span>
          </div>
          <div style='min-width:180px'>${tooltipInnerContent}</div>
        </div>`
        return tooltip
      } else {
        return `<div><div style='min-width:180px'>${tooltipInnerContent}</div></div>`
      }
    }
  },
  created () {
    this.active = !this.notActive
    if (this.latLngs.length === 0 && !lodash.get(this.route, 'geometry.coordinates')) {
      console.error('Latlngs or route object must be passed with valid values')
    } else {
      this.backgroundWeight = this.weight + 4
    
      // If draggable is defined via prop as true
      // then add the necessary attribute on the
      // options object
      if (this.draggable === true) {
        this.options.edit_with_drag = true
      }
      // This willa add custom behaviors to the vue2leaflet polyline
      this.orsExtendedPolyline = new OrsExtendedPolyline(this)
    }
  }
}
