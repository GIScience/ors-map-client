
const routeData = {
  /**
   * Reorder the values of an array of coordinates switching the position of lat and long of each coordinate
   * @param {*} coordinatesArr
   * @returns {Array} of reordered coordinates
   */
  buildHighlightedPolylines: (polyLineData, extraInfo) => {
    if (polyLineData && extraInfo) {
      let polylinesHighlighted = []

      for (let key in extraInfo.sections) {
        let section = extraInfo.sections[key]
        let polylineHighlighted = {
          label: section.label,
          color: section.color,
          polylines: []
        }
        for (let intervalKey in section.intervals) {
          let interval = section.intervals[intervalKey]
          let segment = polyLineData.slice(interval[0], interval[1])
          polylineHighlighted.polylines.push(segment)
        }
        if (polylineHighlighted.polylines.length > 0) {
          polylinesHighlighted.push(polylineHighlighted)
        }
      }
      return polylinesHighlighted
    }
  },
  getSourceType (endpoint, responseData) {
    // In the case of directions andpoint, there are
    // two possibilities. If the response is an object (json) or a gpx (xml)
    if (endpoint === '/directions') {
      if (typeof responseData === 'object') {
        return 'directionsJSON'
      } else {
        // This DirectionsGPXDataBuilder needs the request data because it will run a second
        // request (based on the original request) to get the geojson equivalent response
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
