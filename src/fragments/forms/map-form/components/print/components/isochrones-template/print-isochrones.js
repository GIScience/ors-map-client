import PolygonUtils from '@/support/polygon-utils'
import MapViewData from '@/models/map-view-data'
import Utils from '@/support/utils'

export default {
  props: {
    mapViewData: {
      type: MapViewData
    },
    mapViewImage: {
      type: String
    }
  },
  created () {
    this.localMapViewData = this.mapViewData
  },
  data: () => ({
    localMapViewData: null,
    mapImageDataUrl: null
  }),
  computed: {
    contentTitle () {
      let rangeTranslObject = this.$t('orsMapFilters.filters.range_type')
      let activeProfile = this.localMapViewData.options.profile
      let title = this.$t(`orsMapFilters.profiles.${activeProfile}`) + '<br/>'
      let rangeType = this.localMapViewData.options.range_type
      let rangeTypeLabel = rangeTranslObject.enum[rangeType].toLowerCase()
      title += `${rangeTranslObject.label}: ${rangeTypeLabel}</br>`
      return title
    }
  },
  methods: {
    polygonAreaTextColor (polygon) {
      let textColor = Utils.contrastingTextColor(polygon.properties.color)
      return textColor
    },
    hasAsCenter (place, polygon) {
      return PolygonUtils.hasPlaceAsCenter(place, polygon)
    }
  }
}
