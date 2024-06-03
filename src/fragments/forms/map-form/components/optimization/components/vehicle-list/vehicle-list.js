import {vehicleIcon} from '@/support/map-data-services/ors-filter-util'
import {vehicleColors} from '@/support/optimization-utils'
import geoUtils from '@/support/geo-utils'

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
    /**
     * Returns readable time window 'start - end' where start and end is either a time or timestamp
     * @param {Array<number>} prop
     * @returns {string}
     */
    timeWindow (prop) {
      const startTime = prop[0]
      const endTime = prop[1]
      const startHumanized = geoUtils.getHumanizedTime(startTime)
      const endHumanized = geoUtils.getHumanizedTime(endTime)
      return `${startHumanized} - ${endHumanized}`
    },
  }
}
