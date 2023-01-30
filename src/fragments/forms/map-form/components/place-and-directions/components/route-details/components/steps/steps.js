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
      const highlighData = {sectionTitle, sections: [] }
      const segmentData = this.buildExtraHighlighPolylineData(step, index)
      highlighData.sections.push(segmentData)
      EventBus.$emit('highlightPolylineSections', highlighData)
    },
    buildExtraHighlighPolylineData (step) {
      const color = constants.segmentHighlightColor
      const label = step.instruction.replace(/<(?:.|\n)*?>/gm, '')
      const intervals = [step.way_points]
      return { intervals, color, label }
    }
  }
}
