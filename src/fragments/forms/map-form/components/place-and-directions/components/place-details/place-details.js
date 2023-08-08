import Share from '@/fragments/forms/map-form/components/share/Share'
import Print from '@/fragments/forms/map-form/components/print/Print'
import resolver from '@/support/routes-resolver'
import MapViewData from '@/models/map-view-data'
import geoUtils from '@/support/geo-utils'
import constants from '@/resources/constants'

export default {
  props: {
    mapViewData: {
      required: true,
      type: MapViewData
    }
  },
  data: () => ({
    imageUrlFallBack: (resolver.homeUrl() + '/static/img/map-pin-600x400.jpg').replace('//', '/'),
    worldImageryTileProviderBaseUrl: constants.worldImageryTileProviderBaseUrl,
  }),
  methods: {
    /**
     * Copy latitude/longitude to clipboard
     *
     */
    copyLatLng () {
      const latLng = `${this.place.lat}, ${this.place.lng}`
      if (this.copyToClipboard(latLng)) {
        this.showSuccess(this.$t('placeDetails.latlngCopied'), { timeout: 2000 })
      }
    },
    /**
     * Copy longitude, latitude to clipboard
     *
     */
    copyLngLat () {
      const lngLat = `${this.place.lng}, ${this.place.lat}`
      if (this.copyToClipboard(lngLat)) {
        this.showSuccess(this.$t('placeDetails.lnglatCopied'), { timeout: 2000 })
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
    }
  },
  computed: {
    shareUrl () {
      return location.href
    },
    imagePath () {
      if (this.placeLayer) {
        const zoom = geoUtils.zoomLevelByLayer(this.placeLayer)
        const tileData = geoUtils.getTileData(this.place.lat, this.place.lng, zoom)
        const url = `${this.worldImageryTileProviderBaseUrl}/${tileData.z}/${tileData.y}/${tileData.x}`
        return url
      } else {
        return this.imageUrlFallBack
      }
    },
    place () {
      const place = this.mapViewData.places[0]
      if (!place.properties.country) {
        place.resolve().then(() => {
          if (!place.properties.layer) {
            place.properties.layer = 'notAvailable'
          }
        })
      }
      return place
    },
    placeLayer () {
      const layer = this.place.properties.layer
      if (layer !== 'notAvailable') {
        return layer
      }
    }
  },
  components: {
    Share,
    Print
  }
}
