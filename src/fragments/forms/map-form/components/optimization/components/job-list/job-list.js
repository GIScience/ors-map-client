import geoUtils from '@/support/geo-utils'
import MapViewData from '@/models/map-view-data'

export default {
  data: () => ({
    localMapViewData: null,
    jobExtended: [true]
  }),
  props: {
    jobs: {
      Type: Array,
      Required: true
    },
    mapViewData: {
      Type: MapViewData,
      Required: false
    }
  },
  computed: {
    unassignedIds () {
      let unassignedIds = []
      for (const job of this.localMapViewData.rawData.unassigned) {
        unassignedIds.push(job.id)
      }
      return unassignedIds
    },
  },
  watch: {
    // Every time the response data changes the map builder is reset and the map data is reloaded
    mapViewData: {
      handler: function () {
        this.localMapViewData = this.mapViewData.clone()
      },
      deep: true
    },
  },
  methods: {
    skillIds(job) {
      let ids = ''
      for (const skill of job.skills) {
        if(ids === ''){
          ids = skill.id
        } else {
          ids = ids + ', ' + skill.id
        }
      }
      return ids
    },
    humanisedTime (time) {
      const data = geoUtils.getHumanizedTimeAndDistance({duration: time},  this.$t('global.units'))
      return data.duration
    },
  }
}
