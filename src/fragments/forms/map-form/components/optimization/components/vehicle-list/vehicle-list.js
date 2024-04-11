import {vehicleIcon} from '@/support/map-data-services/ors-filter-util'
import {vehicleColors} from '@/support/optimization-utils'

export default {
  data: () => ({
    vehicleExtended: [false]
  }),
  props: {
    vehicles: {
      Type: Array,
      Required: true
    }
  },
  methods: {
    vehicleColors,
    vehicleIcon,
    skillIds(vehicle) {
      let ids = ''
      for (const skill of vehicle.skills) {
        if(ids === ''){
          ids = skill.id
        } else {
          ids = ids + ', ' + skill.id
        }
      }
      return ids
    },
  }
}
