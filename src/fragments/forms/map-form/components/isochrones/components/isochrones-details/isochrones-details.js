import Share from '@/fragments/forms/map-form/components/share/Share'
import Download from '@/fragments/forms/map-form/components/download/Download'
import PolygonUtils from '@/support/polygon-utils'
import MapViewData from '@/models/map-view-data'
import GeoUtils from '@/support/geo-utils'
import tinycolor2 from 'tinycolor2'
import Leaflet from 'leaflet'

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
      let latlngs = []
      let coordinates = polygon.geometry.coordinates.length === 1 ? polygon.geometry.coordinates[0] : polygon.geometry.coordinates
      for (let key in coordinates) {
        let coordinate = coordinates[key]
        latlngs.push(GeoUtils.buildLatLong(coordinate[1], coordinate[0]))
      }
      let area = Leaflet.GeometryUtil.geodesicArea(latlngs)
      let polygonArea = Leaflet.GeometryUtil.readableArea(area, this.$store.getters.mapSettings.areaUnit)
      return polygonArea
    },
    polygonAreaTextColor (backgroundColor) {
      let foreGroundColor = tinycolor2(backgroundColor).isLight() ? 'black' : 'white'
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
      let polygons = []
      if (this.mapViewData) {
        let translations = this.$t('global.units')
        translations.polygon = this.$t('global.polygon')
        for (let key in this.mapViewData.polygons) {
          let polygon = this.mapViewData.polygons[key]
          polygon.color = PolygonUtils.buildPolygonColor(key)
          polygon.label = PolygonUtils.buildPolygonLabel(polygon, translations)
          polygons.push(polygon)
        }
      }
      return polygons
    }
  }
}
