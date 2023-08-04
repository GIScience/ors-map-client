/**
 * Render and deals with left click events
 * @emits closed
 * @emits showLoading [via EventBus] (when resolving place info)
 * @emits directionsToPoint
 * @listens mapRightClicked
 * @listens mapLeftClicked (to close the right click pop up)
 */
import { ReverseGeocode } from '@/support/ors-api-runner'
import GeoUtils from '@/support/geo-utils'
import Place from '@/models/place'
import {EventBus} from '@/common/event-bus'

export default {
  data () {
    return {
      showLeftClickPopup: false,
      clickPoint: null,
      clickLatLng: null,
      clickInsidePolygon: false,
      data: null
    }
  },
  props: {
    currentZoom: {
      required: true,
      type: Number
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    show: function (newVal) {
      if (newVal === false) {
        this.showLeftClickPopup = false
      }
    }
  },
  computed: {
    placeInfo () {
      if (this.clickPoint) {
        return this.clickPoint
      }
    },
    hasPlaceInfo () {
      return !!this.clickPoint
    },
    placeInfoTitle () {
      const title = this.clickInsidePolygon ? this.$t('mapLeftClick.placeInsidePolygon') : this.$t('mapLeftClick.placeInfo')
      return title
    }
  },
  methods: {
    /**
     * Close the place info pop up
     */
    closePlaceInfo () {
      this.clickLatLng = null
      this.$emit('closed')
    },
    /**
     * Deal wth the map left click, preparing the data and displaying the popup
     * @param {*} data
     */
    mapLeftClick (data) {
      this.clickInsidePolygon = data.insidePolygon
      this.showLeftClickPopup = true
      this.clickLatLng = data.event.latlng
      this.clickPoint = { latLng: data.event.latlng }

      // Calculate and set polygon area
      if (this.clickInsidePolygon !== false) {
        const coords = []
        for (const key in this.clickInsidePolygon) {
          coords.push(GeoUtils.buildLatLong(this.clickInsidePolygon[key][1], this.clickInsidePolygon[key][0]))
        }
        this.clickPoint.containerArea = GeoUtils.readableArea(coords, this.$store.getters.mapSettings.areaUnit)
        this.clickInsidePolygon = this.clickPoint.clickInsidePolygon = true
      }

      if (this.$refs.placeInfoBox) {
        this.$refs.placeInfoBox.show()
      }

      const context = this
      this.resolvePoint(data.event.latlng.lat, data.event.latlng.lng).then((place) => {
        if (place) {
          context.clickPoint.placeName = place.placeName
          let hookData = {placeInfo: this.clickPoint, htmlFragment: this.$refs.placeInfoContainer}
          this.$root.appHooks.run('beforeShowResolvedPlaceInfo', hookData)
          if (context.$refs.placeInfoBox) {
            context.$refs.placeInfoBox.show()
          }
          context.$forceUpdate()
        }
      })
    },
    /**
     * Resolve the coordinates of a point to a qualified location
     * @param lar
     * @param lng
     * @param options
     * @returns {Promise}
     * @emits showLoading (via EventBus)
     */
    resolvePoint (lat, lng) {
      return new Promise((resolve, reject) => {
        EventBus.$emit('showLoading', true)
        const context = this
        ReverseGeocode(lat, lng).then(places => {
          if (places.length > 0) {
            const selectedPlace = Place.selectPlaceByZoomLevel(context.currentZoom, places)
            resolve(selectedPlace)
          } else {
            const place = new Place(lat, lng)
            resolve(place)
          }
        }).catch(response => {
          console.log(response)
          reject(response)
        }).finally(() => {
          EventBus.$emit('showLoading', false)
        })
      })
    },
    /**
     * Copy latitude/longitude to clipboard
     *
     */
    copyLatLng () {
      const latLng = `${this.clickLatLng.lat}, ${this.clickLatLng.lng}`
      if (this.copyToClipboard(latLng)) {
        this.showSuccess(this.$t('mapLeftClick.latlngCopied'), { timeout: 2000 })
      }
    },
    /**
     * Copy longitude, latitude to clipboard
     *
     */
    copyLngLat () {
      const lngLat = `${this.clickLatLng.lng}, ${this.clickLatLng.lat}`
      if (this.copyToClipboard(lngLat)) {
        this.showSuccess(this.$t('mapLeftClick.lnglatCopied'), { timeout: 2000 })
      }
    },
    /**
     * Copy the string to chipboard by creating a temporary textarea element
     *
     * @param {*} str
     * @returns {Boolean}
     */
    copyToClipboard (str) {
      const el = document.createElement('textarea')
      el.value = str
      document.body.appendChild(el)
      el.select()
      const result = document.execCommand('copy')
      document.body.removeChild(el)
      return result
    },
    /**
     * Build a place and emits an event to set the
     * app in directions mode to the clicked place
     * @param {*} placeInfo
     * @emits directionsToPoint
     */
    directionsToPoint (placeInfo) {
      const place = new Place(placeInfo.latLng.lng, placeInfo.latLng.lat)
      place.resolve().then(() => {
        this.$emit('directionsToPoint', {place})
      })
    }
  },
  created () {
    const context = this
    EventBus.$on('mapLeftClicked', (data) => {
      context.mapLeftClick(data)
    })
    EventBus.$on('mapRightClicked', () => {
      context.showLeftClickPopup = false
    })
  }
}
