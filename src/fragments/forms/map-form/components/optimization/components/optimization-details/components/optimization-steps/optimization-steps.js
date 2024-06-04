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
    }
  }
}
