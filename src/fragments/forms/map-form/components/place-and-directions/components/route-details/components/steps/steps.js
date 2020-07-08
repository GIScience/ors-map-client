
export default {
  props: {
    steps: {
      Type: Array,
      Required: true
    }
  },
  methods: {
    instruction (code) {
      switch (code) {
        case 0:
          return {icon: 'call_missed', class: 'turn-left'} // Left
        case 1:
          return {icon: 'call_missed', class: 'turn-right'} // Right
        case 2:
          return {icon: 'undo'} // Sharp left
        case 3:
          return {icon: 'redo'} // Sharp right
        case 4:
          return {icon: 'call_made', class: 'slight-left'} // Slight left
        case 5:
          return {icon: 'call_made', class: 'slight-right'} // Slight right
        case 6:
          return {icon: 'arrow_upward'} // Straight
        case 7:
          return {icon: 'cached'} // Enter roundabout
        case 8:
          return {icon: 'replay'} // Exit roundabout

        case 9:
          return {icon: 'replay', class: 'u-turn'} // U-turn
        case 10:
          return {icon: 'call_made', class: 'slight-right'} // Goal
        case 11:
          return {icon: 'arrow_upward'} // Depart
        case 12:
          return {icon: 'vertical_align_top', class: 'keep-left'} // Keep left
        case 13:
          return {icon: 'vertical_align_top', class: 'keep-right'} // Keep right
      }
    }
  }
}
