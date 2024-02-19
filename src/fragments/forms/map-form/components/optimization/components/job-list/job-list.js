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
    }
  }
}
