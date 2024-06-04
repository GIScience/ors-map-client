import geoUtils from '@/support/geo-utils'

export default {
  data: () => ({
    jobExtended: [true]
  }),
  props: {
    jobs: {
      Type: Array,
      Required: true
    }
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
