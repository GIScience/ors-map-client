import Share from '@/fragments/forms/map-form/components/share/Share'
import Download from '@/fragments/forms/map-form/components/download/Download'
import PolygonUtils from '@/support/polygon-utils'
import MapViewData from '@/models/map-view-data'
import GeoUtils from '@/support/geo-utils'
import tinycolor2 from 'tinycolor2'

export default {
  data: () => ({
  }),
  props: {
    mapViewData: {
      Type: MapViewData,
      Required: true
    }
  },
  components: {
    Share,
    Download
  },
  methods: {
    calcArea (polygon) {
      const latlngs = []
      const coordinates = polygon.geometry.coordinates.length === 1 ? polygon.geometry.coordinates[0] : polygon.geometry.coordinates
      for (const key in coordinates) {
        const coordinate = coordinates[key]
        latlngs.push(GeoUtils.buildLatLong(coordinate[1], coordinate[0]))
      }
      const polygonArea = GeoUtils.readableArea(latlngs, this.$store.getters.mapSettings.areaUnit)
      return polygonArea
    },
    polygonAreaTextColor (backgroundColor) {
      const foreGroundColor = tinycolor2(backgroundColor).isLight() ? 'black' : 'white'
      return foreGroundColor
    },
    hasAsCenter (place, polygon) {
      if (polygon.properties.center && place.coordinates && polygon.properties.center.toString() === place.coordinates.toString()) {
        return true
      }
    }
  },
  computed: {
    polygons () {
      const polygons = []
      if (this.mapViewData) {
        const translations = this.$t('global.units')
        translations.polygon = this.$t('global.polygon')
        for (const key in this.mapViewData.polygons) {
          const polygon = this.mapViewData.polygons[key]
          polygon.color = PolygonUtils.buildPolygonColor(key)
          polygon.label = PolygonUtils.buildPolygonLabel(polygon, translations)
          polygons.push(polygon)
        }
      }
      return polygons
    }
  }
}
