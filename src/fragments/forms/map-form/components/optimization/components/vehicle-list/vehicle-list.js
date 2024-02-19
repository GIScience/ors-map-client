import constants from "@/resources/constants";

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
    vehicleColors(vehicleId) {
      return constants.vehicleColors[vehicleId]
    },
  }
}
