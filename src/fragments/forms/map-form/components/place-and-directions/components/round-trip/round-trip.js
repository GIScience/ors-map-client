import OrsMapFilters from '@/config/ors-map-filters'
import OrsFilterUtil from '@/support/map-data-services/ors-filter-util'
import FieldsContainer from '@/fragments/forms/fields-container/FieldsContainer'

export default {
  data: () => ({
    orsFilters: OrsMapFilters
  }),
  props: {
  },
  components: {
    FieldsContainer
  },
  computed: {
    roundTripFilterAccessor () {
      const filterRef = OrsFilterUtil.getFilterRefByName('round_trip')
      return filterRef
    }
  },
  methods: {
    filterUpdated () {
      this.$emit('changed')
    }
  }
}
