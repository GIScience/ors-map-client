import Share from '@/fragments/forms/map-form/components/share/Share'
import Download from '@/fragments/forms/map-form/components/download/Download'
import PolygonUtils from '@/support/polygon-utils'
import MapViewData from '@/models/map-view-data'
import GeoUtils from '@/support/geo-utils'
import tinyColor2 from 'tinycolor2'

export default {
  data: () => ({
    localMapViewData: null
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
  created() {
    this.localMapViewData = this.mapViewData.clone()
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
      const foreGroundColor = tinyColor2(backgroundColor).isLight() ? 'black' : 'white'
      return foreGroundColor
    },
    hasAsCenter (place, polygon) {
      if (polygon.properties.center && place.coordinates && polygon.properties.center.toString() === place.coordinates.toString()) {
        return true
      }
    },
    toggleVisibility (polygonIndex) {
      this.eventBus.$emit('togglePolygonVisibility', polygonIndex)
    },

    polygonOpacityChanged (polygonIndex) {      
      let fillOpacity = this.localMapViewData.polygons[polygonIndex].properties.fillOpacity
      this.eventBus.$emit('setPolygonOpacity', {polygonIndex, fillOpacity })
    }
  },
  watch: {
    /**
     * Every time the response data changes
     * the map builder is reset and the
     * map data is reloaded
     */
    mapViewData: {
      handler: function () {
        this.localMapViewData = this.mapViewData.clone()
      },
      deep: true
    },
  }
}
