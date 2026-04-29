import Download   from '@/fragments/forms/map-form/components/download/Download'
import Share      from '@/fragments/forms/map-form/components/share/Share'
import Print      from '@/fragments/forms/map-form/components/print/Print'
import RouteExtras from './components/extras/RouteExtras'
import MapViewData from '@/models/map-view-data'
import Steps      from './components/steps/Steps'
import geoUtils   from '@/support/geo-utils'
import { EventBus } from '@/common/event-bus'

export default {
  props: {
    mapViewData: {
      Type: MapViewData,
      Required: true
    }
  },
  data () {
    return {
      localMapViewData: new MapViewData() // We use a local copy of the mapViewData in order to be able to modify it
    }
  },
  created () {
    this.localMapViewData = this.mapViewData.clone()
  },
  watch: {
    /**
     * Every time the response data changes the local copy is refreshed.
     */
    'mapViewData.routes': {
      handler () {
        this.localMapViewData = this.mapViewData.clone()
      },
      deep: true
    }
  },
  computed: {
    hasRoutes () {
      return this.localMapViewData.isRouteData
    },
    shareUrl () {
      return location.href
    },
    panelExtended () {
      return this.localMapViewData.routes.length > 0 ? this.$store.getters.activeRouteIndex : null
    },
    /**
     * Returns the routes with humanized distance/duration labels.
     * @returns {Array}
     */
    parsedRoutes () {
      if (!this.hasRoutes) {
        return []
      }
      const routes = []
      const context = this
      for (const key in this.localMapViewData.routes) {
        const route = Object.assign({}, this.localMapViewData.routes[key])
        const unit = route.summary.unit || route.summary.originalUnit
        if (!route.summary.humanized) {
          route.summary = context.getHumanizedSummary(route.summary, unit)
          route.summary.humanized = true
          for (let item of Object.values(route.properties.extras)) {
            // frontend fix for wrong total amount see https://github.com/GIScience/openrouteservice/issues/1455
            const total_amount = item.summary.reduce((a, b) => a + b.amount, 0)
            if (total_amount > 100) {
              const surplus = total_amount - 100
              // deduct from largest segment
              const idxOfLargest = item.summary.reduce(
                (maxIndex, curObj, curIndex, array) => {
                  return curObj.amount > array[maxIndex].amount ? curIndex : maxIndex
                }, 0)
              item.summary[idxOfLargest].amount -= surplus
            }}
          context.parseSegments(route.properties.segments)
          this.localMapViewData.routes[key].summary = route.summary
        }
        routes.push(route)
      }
      return routes
    }
  },
  methods: {
    formatElevation (elevation) {
      const value = Math.abs(elevation).toFixed(1)
      return value
    },
    routeOpacityChanged (routeIndex) {
      let opacity = this.localMapViewData.routes[routeIndex].properties.opacity
      EventBus.$emit('setRouteOpacity', {routeIndex, opacity })
    },
    /**
     * Get the route summary with humanized
     * distance and duration data
     * @param {*} summary
     * @param {*} unit
     * @return {Object} summary
     */
    getHumanizedSummary (summary, unit = null) {
      unit = unit || this.$store.getters.mapSettings.unit
      summary.unit = unit
      const durationAndDistance = geoUtils.getHumanizedTimeAndDistance(summary, this.$t('global.units'))
      summary.distance = durationAndDistance.distance
      summary.duration = durationAndDistance.duration
      return summary
    },
    getWarningTranslated (warning) {
      let translationKey = 'routeDetails.warningCodes.' + warning.code
      let trans =  this.$t(translationKey)
      return trans
    },
    /**
     * get the parsed segments by
     * humanizing the duration and distances
     * @param {*} segments
     * @returns {Object} segments
     */
    parseSegments (segments) {
      const context = this
      for (const key in segments) {
        let segment = Object.assign({}, segments[key])
        segment = context.getHumanizedSummary(segment, segment.unit)
        segments[key].duration = segment.duration
        segments[key].distance = segment.distance

        for (const stepKey in segments[key].steps) {
          let step = Object.assign({}, segments[key].steps[stepKey])
          step = context.getHumanizedSummary(step, step.unit)
          segments[key].steps[stepKey].distance = step.distance
          segments[key].steps[stepKey].duration = step.duration
        }
      }
    },
    /**
     * Handle the active route index change
     * by emitting a changeActiveRouteIndex
     * event via EventBus
     * @param {*} index
     * @emits changeActiveRouteIndex
     */
    changeActiveRouteIndex (index) {
      EventBus.$emit('changeActiveRouteIndex', index)
      EventBus.$emit('activeRouteIndexChanged', index)
    }
  },
  components: {
    Steps,
    Download,
    Share,
    Print,
    RouteExtras
  }
}
