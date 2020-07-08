import Share from '@/fragments/forms/map-form/components/share/Share'
import Download from '@/fragments/forms/map-form/components/download/Download'
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
  created () {
    console.log(this.mapViewData)
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
      if (polygon.properties.center.toString() === place.coordinates.toString()) {
        return true
      }
    }
  }
}
