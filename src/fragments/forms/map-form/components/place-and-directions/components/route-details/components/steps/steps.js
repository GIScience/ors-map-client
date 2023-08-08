import InstructionCodeToSymbol from '@/resources/lists/instruction-code-to-symbol'
import constants from '@/resources/constants'
import {EventBus} from '@/common/event-bus'

export default {
  props: {
    steps: {
      Type: Array,
      Required: true
    }
  },
  methods: {
    instructionSymbol (typeCode) {
      let symbol = InstructionCodeToSymbol[typeCode]
      return symbol
    },
    stepClicked (step, index) {
      const sectionTitle = this.$t('steps.step')
      const highlightData = {sectionTitle, sections: [] }
      const segmentData = this.buildExtraHighlightPolylineData(step, index)
      highlightData.sections.push(segmentData)
      EventBus.$emit('highlightPolylineSections', highlightData)
    },
    buildExtraHighlightPolylineData (step) {
      const color = constants.segmentHighlightColor
      const label = step.instruction.replace(/<(?:.|\n)*?>/gm, '')
      const intervals = [step.way_points]
      return { intervals, color, label }
    }
  }
}
