import Download from '@/fragments/forms/map-form/components/download/Download'
import Share from '@/fragments/forms/map-form/components/share/Share'
import Print from '@/fragments/forms/map-form/components/print/Print'
import RouteExtras from './components/extras/RouteExtras'
import MapViewData from '@/models/map-view-data'
import Steps from './components/steps/Steps'
import constants from '@/resources/constants'
import geoUtils from '@/support/geo-utils'
import {EventBus} from '@/common/event-bus'


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
     * Every time the response data changes
     * the map builder is reset and the
     * map data is reloaded
     */
    'mapViewData.routes': {
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
      return this.localMapViewData.isRouteData
    },
    shareUrl () {
      return location.href
    },
    startedPanelExtended () {
      return this.localMapViewData.routes.length === 1 ? 0 : null
    },
    /**
     * Builds and return route summary
     * @returns {Object}
     */
    routeSummary () {
      if (this.hasRoutes) {
        let summary = Object.assign({}, this.localMapViewData.routes[this.$store.getters.activeRouteIndex].summary)
        summary = this.getHumanizedSummary(summary, summary.unit)
        return summary
      }
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
      const context = this
      for (const key in this.localMapViewData.routes) {
        const route = Object.assign({}, this.localMapViewData.routes[key])
        const unit = route.summary.unit || route.summary.originalUnit
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
    },
    /**
     * When a segment is clicked
     * prepare the data and emit
     * and event targeting the highlight
     * of this segment
     * @param {*} segment
     * @param {*} index
     * @emits highlightPolylineSections
     */
    segmentClicked (segment, index) {
      const sectionTitle = ''
      const highlightData = {sectionTitle, sections: [] }
      const segmentData = this.buildExtraHighlightPolylineData(segment, index)
      highlightData.sections.push(segmentData)
      EventBus.$emit('highlightPolylineSections', highlightData)
    },
    /**
     * Build the extra info highlighting data
     * @param {*} segment
     * @param {*} index
     * @returns {Object}
     */
    buildExtraHighlightPolylineData (segment, index) {
      const color = constants.segmentHighlightColor
      const label = `${this.$t('routeDetails.segment')} ${index+1}`
      const intervals = []
      for (let key in segment.steps) {
        let wps = segment.steps[key].way_points
        intervals.push(wps)
      }
      return { intervals, color, label }
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
