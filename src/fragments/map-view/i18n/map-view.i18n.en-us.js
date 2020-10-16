export default {
  mapView: {
    routeTo: 'Route to this place',
    polygonDetails: 'Polygon details',
    polygon: 'Polygon',
    placeInfo: 'Place info',
    lat: 'Lat',
    lng: 'Lng',
    latlngCopied: 'Latitude and longitude copied',
    lnglatCopied: 'Longitude and latitude copied',
    copyLatlng: 'Copy in latitude,longitude format',
    copyLnglat: 'Copy in longitude,latitude format',
    whatIsHere: 'What is here ?',
    directionsFromHere: 'Directions from here',
    fitAllFeatures: 'Show all features',
    directionsToHere: 'Directions to here',
    addRouteStop: 'Add a route stop here',
    addDestinationToRoute: 'Add destination to route',
    acquirePositionErrors: {
      generic: 'It was not possible to acquire your location because it was not authorized or the browser/device does not support it.',
      unavailable: 'According to your browser/device your location is currently not available. Make sure the positioning option/service is properly configured.',
      permissionDenied: 'Your position could not be acquired because the browser/device denied access to it. You can retry it by changing the browser/device settings and then click again on the "my position button"',
      timeout: 'Your browser/device returned "timeout" while trying to acquire a position. You can retry it by clicking on the "my position button"'
    },
    yourCurrentLocation: 'Your current location',
    options: 'Options',
    polylineMeasure: {
      bearingTextIn: 'In',
      bearingTextOut: 'Out',
      tooltipTextDragAndDelete: 'Click and drag to <b>move point</b><br>Press SHIFT-key and click to <b>delete point</b>',
      tooltipTextResume: '<br>Press CTRL-key and click to <b>resume line</b>',
      tooltipTextAdd: 'Press CTRL-key and click to <b>add point</b>',
      clearControlTitle: 'Clear Measurements',
      measureControlTitleOn: 'Turn on distance measurement',
      measureControlTitleOff: 'Turn off distance measurement',
      unitControlTitle: {
        text: 'Change Units',
        metres: 'meters',
        landmiles: 'land miles',
        nauticalmiles: 'nautical miles'
      },
      clearControlLabel: '&times',
      measureControlLabel: '&#8614;',
      measureControlClasses: [],
      unitControlLabel: {
        metres: 'm',
        kilometres: 'km',
        feet: 'ft',
        landmiles: 'M',
        nauticalmiles: 'NM'
      }
    },
    defineAvoidPolygon: 'Define avoid polygons to directions',
    youCantIntersectPolygons: 'You can`t intersect polygons',
    placeInsidePolygon: 'Place inside polygon',
    polygonArea: 'Polygon area',
    highlighting: 'Highlighting',
    accuracy: 'Accuracy',
    youCanCenterAtYourLocationLater: 'You can center the map at your current location at any time by clicking on "my location" button',
    yourLocation: 'Use your location',
    setMyLocationasMapCenter: 'Do you want to center the map at your current location? This will improve place search precision. You will have to authorize it if prompted.',
    removePlace: 'Remove place',
    viewOnORS: 'View on ORS',
    moveMapPositionToLeft: 'Move map center to the left',
    moveMapPositionToRight: 'Move map center to the right',
    moveMapPositionToUp: 'Move map center up',
    moveMapPositionToDown: 'Move map center down',
    toggleDirect: 'Toggle direct from here until next place',
    heightGraph: {
      distance: "Distance",
      elevation: "Elevation",
      segment_length: "Segment length",
      type: "Type",
      legend: "Legend"
    }
  }
}
