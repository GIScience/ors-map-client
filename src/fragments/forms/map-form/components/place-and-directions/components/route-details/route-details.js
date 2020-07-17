import Share from '@/fragments/forms/map-form/components/share/Share'
import Download from '@/fragments/forms/map-form/components/download/Download'
import RouteExtras from './components/extras/RouteExtras'
import MapViewData from '@/models/map-view-data'
import Steps from './components/steps/Steps'
import geoUtils from '@/support/geo-utils'

export default {
  props: {
    mapViewData: {
      Type: MapViewData,
      Required: true
    }
  },
  data () {
    return {
      localMapViewData: new MapViewData() // we use a local copy of the mapViewData to be able to modify it
    }
  },
  created () {
    this.localMapViewData = this.mapViewData.clone()
  },
  watch: {
    /**
     * Every time the response data changes
     * the map builder is reseted and the
     * map data is reloaded
     */
    mapViewData: {
      handler: function () {
        // When the mapViewData prop changes, we copy its value to a
        // local instance so that we can modify it when necessary
        this.localMapViewData = this.mapViewData.clone()
      },
      deep: true
    }
  },
  computed: {
    hasRoutes () {
      return this.mapViewData.isRouteData
    },

    startedPanelExtended () {
      return this.mapViewData.routes.length === 1 ? 0 : null
    },
    routeSummary () {
      if (this.hasRoutes) {
        let summary = Object.assign({}, this.localMapViewData.routes[this.$store.getters.activeRouteIndex].summary)
        summary = this.getHumanizedSummary(summary, summary.unit)
        return summary
      }
    },
    parsedRoutes () {
      if (!this.hasRoutes) {
        return []
      }
      let routes = []
      let context = this
      for (let key in this.localMapViewData.routes) {
        let route = Object.assign({}, this.localMapViewData.routes[key])
        let unit = route.summary.unit || route.summary.originalUnit
        if (!route.summary.humanized) {
          route.summary = context.getHumanizedSummary(route.summary, unit)
          route.summary.humanized = true
          context.parseSegments(route.properties.segments)
          this.localMapViewData.routes[key].summary = route.summary
        }
        routes.push(route)
      }
      return routes
    }
  },
  methods: {
    getHumanizedSummary (summary, unit = null) {
      unit = unit || this.$store.getters.mapSettings.unit
      summary.unit = unit
      let durationAndDistance = geoUtils.getHumanizedTimeAndDistance(summary, this.$t('routeDetails'))
      summary.distance = durationAndDistance.distance
      summary.duration = durationAndDistance.duration
      return summary
    },
    parseSegments (segments) {
      let context = this
      for (let key in segments) {
        let segment = Object.assign({}, segments[key])
        segment = context.getHumanizedSummary(segment, segment.unit)
        segments[key].duration = segment.duration
        segments[key].distance = segment.distance

        for (let stepKey in segments[key].steps) {
          let step = Object.assign({}, segments[key].steps[stepKey])
          step = context.getHumanizedSummary(step, step.unit)
          segments[key].steps[stepKey].distance = step.distance
          segments[key].steps[stepKey].duration = step.duration
        }
      }
    },
    changeActiveRouteIndex (index) {
      this.eventBus.$emit('activeRouteIndexChanged', index)
    }
  },
  components: {
    Steps,
    Download,
    Share,
    RouteExtras
  }
}
