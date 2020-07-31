import MapViewData from '@/models/map-view-data'
import Altitude from '@/fragments/charts/altitude/Altitude'

export default {
  props: {
    mapViewData: {
      required: true,
      type: MapViewData
    }
  },
  components: {
    Altitude
  },
  created () {
    this.$emit('beforeOpen')
    this.open = true
    let context = this
    this.eventBus.$on('highlightPolylineSections', () => {
      context.open = false
    })
  },
  data () {
    return {
      open: true
    }
  },
  watch: {
    '$store.getters.leftSideBarOpen': function (newVal) {
      if (newVal === true && this.$lowResolution) {
        this.closeAltitudeModal()
      }
    }
  },
  computed: {
    width () {
      let value = ''
      let offset = 60
      let leftSidebarOpen = this.$store.getters.leftSideBarPinned || this.$store.getters.leftSideBarOpen
      if (leftSidebarOpen) {
        // Here we use the same width that the sidebar uses depending onf the resolution
        let sidebarWidth = this.$mdAndUpResolution ? 400 : 290
        value = window.innerWidth - (sidebarWidth + offset)
      } else {
        value = window.innerWidth - offset
      }
      return value
    },
    height () {
      let height = this.width / 2
      return height > 150 ? 150 : height

    }
  },
  methods: {
    closeAltitudeModal () {
      this.open = false
      this.$emit('close')
    },
    clicked (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  }
}
