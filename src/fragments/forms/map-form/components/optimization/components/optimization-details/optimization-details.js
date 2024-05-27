import Download from '@/fragments/forms/map-form/components/download/Download'
import Share from '@/fragments/forms/map-form/components/share/Share'
import Print from '@/fragments/forms/map-form/components/print/Print'
import MapViewData from '@/models/map-view-data'
import OptimizationSteps from './components/optimization-steps/OptimizationSteps'
import geoUtils from '@/support/geo-utils'
import {getVehicleIconName, vehicleColors} from '@/support/optimization-utils'

export default {
  data: () => ({
    localMapViewData: null,
    panelExtended: [true, true, true],
  }),
  props: {
    mapViewData: {
      Type: MapViewData,
      Required: true
    }
  },
  components: {
    Download,
    Share,
    Print,
    OptimizationSteps,
  },
  computed: {
    hasRoutes () {
      return this.localMapViewData.isRouteData
    },
    shareUrl () {
      return location.href
    },
    /**
     * Builds and return the routes
     * parsed, with translations and
     * humanized content
     * @returns {Array} of route objects
     */
    parsedRoutes () {
      if (!this.hasRoutes) {
        return []
      }
      const routes = []
      for (const key in this.localMapViewData.routes) {
        const route = Object.assign({}, this.localMapViewData.routes[key])
        if (!route.summary) {
          route.summary = geoUtils.getHumanizedTimeAndDistance({distance: route.distance, duration:route.duration, unit: 'm'},  this.$t('global.units'))
          this.parseSteps(route.steps)
          route.distance = route.summary.distance
          route.duration = route.summary.duration
        }
        routes.push(route)
      }
      return routes
    },
  },
  created() {
    this.localMapViewData = this.mapViewData.clone()
  },
  watch: {
    /**
     * Every time the response data changes
     * the map builder is reset and the
     * map data is reloaded
     */
    mapViewData: {
      handler: function () {
        this.localMapViewData = this.mapViewData.clone()
      },
      deep: true
    },
  },
  methods: {
    vehicleColors,
    getVehicleIconName,
    /** get the parsed segments by humanizing the duration and distances
     * @param {*} steps
     * @returns {Object} segments
     */
    parseSteps (steps) {
      for (const step of steps) {
        let {duration, distance} = geoUtils.getHumanizedTimeAndDistance({distance: step.distance, duration:step.duration, unit: 'm'},  this.$t('global.units'))
        step.duration = duration
        step.distance = distance
      }
    },
    /**
     * constructs the URL for forwarding to directions mode by route ID
     * @param {number} routeId
     */
    generateRouteURL(routeId) {
      const locationStrings = this.parsedRoutes[routeId].steps.map(e => [e.location[0].toFixed(7), e.location[1].toFixed(7)].toString())
      const profile = this.localMapViewData.vehicles[routeId].profile
      return `/#/directions/${locationStrings.join('/')}/data/{"coordinates":"${locationStrings.join(';')}","options":{"profile":"${profile}","preference":"recommended"}}`
    }
  }
}