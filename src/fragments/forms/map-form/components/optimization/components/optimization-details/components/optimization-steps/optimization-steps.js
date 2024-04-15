import {EventBus} from '@/common/event-bus'
import constants from '@/resources/constants'

export default {
  name: 'OptimizationSteps',
  props: {
    steps: {
      Type: Array,
      Required: true
    }
  },
  data: () => ({

  }),
  methods: {
    typeSymbol (typeCode) {
      let symbol = ''
      switch (typeCode) {
        case 'start':
          symbol = 'place'
          break
        case 'job':
          symbol = 'work'
          break
        case 'delivery':
          symbol = 'local_shipping'
          break
        case 'pickup':
          symbol = 'input'
          break
        case 'break':
          symbol = 'snooze'
          break
        case 'end':
          symbol = 'flag'
          break
        default:

      }
      return symbol
    },
    stepClicked (step) {
      // const sectionTitle = this.$t('steps.step')
      const highlightData = {step: step}
      console.log(highlightData)
      // const segmentData = this.buildExtraHighlightPolylineData(step, index)
      // highlightData.sections.push(segmentData)
      EventBus.$emit('highlightStep', highlightData)
    },
    buildExtraHighlightPolylineData (step) {
      const color = constants.segmentHighlightColor
      const label = step.instruction.replace(/<(?:.|\n)*?>/gm, '')
      const intervals = [step.way_points]
      return { intervals, color, label }
    }
  }
}
