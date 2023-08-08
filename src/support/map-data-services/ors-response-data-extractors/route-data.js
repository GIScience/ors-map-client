
const routeData = {
  /**
   * Build an array of polylines based on extra info data that contains
   * route intervals and the color that each segment must be highlighted with
   * @param {*} polyLineData
   * @param {*} extraInfo
   * @returns {Array} of polylinesHighlighted
   */
  buildHighlightedPolylines: (polyLineData, extraInfo) => {
    if (polyLineData && extraInfo) {
      const polylinesHighlighted = []

      // Build the sections
      // Each section contains a label, a color and
      // may contain multiple polylines
      for (const key in extraInfo.sections) {
        const section = extraInfo.sections[key]
        const polylineHighlighted = {
          label: section.label,
          color: section.color,
          polylines: [] // It starts empty and will be populated below
        }
        // Use the intervals data to extract the
        // polyline data for the given interval
        for (const intervalKey in section.intervals) {
          const interval = section.intervals[intervalKey]
          // since we are getting items from an array
          // starting with the index 0, the amount of
          // items is the final position + 1
          const amountOfItems = interval[1] +1
          const segment = polyLineData.slice(interval[0], amountOfItems)
          polylineHighlighted.polylines.push(segment)
        }
        if (polylineHighlighted.polylines.length > 0) {
          polylinesHighlighted.push(polylineHighlighted)
        }
      }
      return polylinesHighlighted
    }
  },

  /**
   * Get the response data source type based on the endpoint and the type of responseData
   * @param {String} endpoint
   * @param {Object} responseData
   * @returns {String}  response source type
   */
  getSourceType (endpoint, responseData) {
    // In the case of directions and pois, there are
    // two possibilities. If the response is an object (json) or a gpx (xml)
    if (endpoint === '/directions') {
      if (typeof responseData === 'object') {
        return 'directionsJSON'
      } else {
        // This DirectionsGPXDataBuilder needs the request data because it will run a second
        // request (based on the original request) to get the GeoJSON equivalent response
        return 'directionsGPX'
      }
    } else {
      switch (endpoint) {
        case '/geocode/search':
        case '/geocode/autocomplete':
        case '/geocode/search/structured':
          return 'geocodeSearch'
        case '/geocode/reverse':
          return 'geocodeReverse'
        case '/isochrones':
          return 'isochrones'
        case '/pois':
          return 'pois'
        case '/matrix':
          return 'matrix'
      }
    }
  }
}
export default routeData
