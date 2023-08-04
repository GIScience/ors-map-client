
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    menuOpen: false,
    myLocationInterval: false,
    locationActive: false,
    continuously: false,
    toolTipVisible: false
  }),
  watch: {
    active: function (newVal) {
      this.locationActive = newVal
    }
  },
  mounted () {
    this.toolTipVisible = this.$store.getters.appRouteData.places.length === 0
  },
  methods: {
    /**
     * Handles the menu activation event
     */
    activatorClicked () {
      this.menuOpen = !this.menuOpen
      if (this.locationActive) {
        this.setLocationFromBrowser(false)
        this.toolTipVisible = false
      } else {
        const context = this
        setTimeout(() => {
          context.toolTipVisible = !!context.menuOpen
        }, 100)
      }
    },
    /**
     * Get the browser location and store it in our store
     * If failed, shows a toaster to the user
     * @param {Boolean} continuously
     */
    setLocationFromBrowser (continuously = false) {
      this.toolTipVisible = false
      this.continuously = continuously
      // Reset the location access denied flag
      const context = this

      if (this.locationActive) {
        this.$store.commit('currentLocation', null)
        clearInterval(this.myLocationInterval)
        setTimeout(() => {
          context.locationActive = false
          context.menuOpen = false
          context.$emit('updateLocation', false)
        }, 100)
      } else {
        context.$emit('updateLocation', true)
        if (continuously) {
          this.myLocationInterval = setInterval(() => {
            context.$emit('updateLocation', true)
          }, 2000)
        }
      }
    }
  },
  computed: {
    showTooltip () {
      return this.menuOpen
    },
  }
}
