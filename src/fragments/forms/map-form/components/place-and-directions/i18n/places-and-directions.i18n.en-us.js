
export default {
  placesAndDirections: {
    isochrones: 'Isochrones',
    place: 'place',
    notRouteFound: 'It was not possible to find a route connecting the places with the selected profile',
    notRouteFoundWithFilters: 'It was not possible to find a route connecting the places with the selected profile and filters',
    noPlaceFound: 'No place found with the inputted content',
    routeReady: 'Route ready',
    useLocation: 'GPS',
    addPlaceInput: 'Add place',
    clearRoute: 'Clear route',
    reverseRoute: 'Reverse',
    orderByClosestPlaces: 'Order by places closer to your location',
    calculatingRoute: 'Calculating route...',
    yourLocation: 'Your location',
    expandAltitudeChart: 'Expand chart',
    errorRenderingContentUploaded: 'Error while rendering the content uploaded. Check the file format and content',
    roundTrip: 'Round trip',
    notPossibleToCalculateRoute: 'A route could not be calculated using one of the selected places',
    apiError: {
      2000: 'Unable to parse JSON request',
      2001: 'Required parameter is missing',
      2002: 'Invalid parameter format',
      2003: 'Route parameters exceed one or more limits. Please remember that some avoidables have limits, like the route length and the area of an avoid polygon that must not exceed 20000 square kilometers.',
      2004: 'Route parameters exceed one or more limits. Remember that the approximated route distance must not be greater than 6000 kms. When certain route options or avoidables are used, the approximated route distance must not be greater than 150 kms.',
      2006: 'Unable to parse the request to the export handler',
      2007: 'Unsupported export format',
      2008: 'Empty element',
      2009: 'Unable to find a suitable route for the places and criteria specified. Maybe the profile specified is not supported in this area/region with the filter(s) applied.',
      2010: 'It was not possible to find a suitable point that is part of the route. Maybe one of the points selected is not routable or the selected profile is not supported in this region',
      2011: 'When using alternative routes option it is not possible to define route stops',
      2012: 'An invalid parameter was specified. Make sure the URL is correct',
      2099: 'Unable to compute a route connecting connecting the places selected'
    },
    genericErrorMsg: 'It was not possible to calculate the route',
    reorder: 'Reorder'
  }
}
