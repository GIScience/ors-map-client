import Share from '@/fragments/forms/map-form/components/share/Share'
import geoUtils from '@/support/geo-utils'
import resolver from '@/support/routes-resolver'
import MapViewData from '@/models/map-view-data'

export default {
  props: {
    mapViewData: {
      required: true,
      type: MapViewData
    }
  },
  data: () => ({
    imageUrlFallBack: (resolver.homeUrl() + '/static/img/map-pin-600x400.jpg').replace('//', '/'),
    worldImageryTileProviderBaseUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile'
  }),
  computed: {
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
    Share
  }
}
