const constants = {
  apiVersion: '5.0',
  orsPublicHost: 'https://openrouteservice.org',
  publicEndpoints: {
    directions: 'pdirections',
    isochrones: 'pisochrones',
    geocodeSearch: 'pgeocode/search',
    autocomplete: 'pgeocode/autocomplete',
    pois: 'ppois',
    reverseGeocode: 'pgeocode/reverse'
  },
  endpoints: {
    directions: 'directions',
    isochrones: 'isochrones',
    geocodeSearch: 'geocode/search',
    autocomplete: 'geocode/autocomplete',
    pois: 'pois',
    reverseGeocode: 'geocode/reverse'
  },
  roundTripFilterName: 'round_trip',
  avoidPpolygonsFilterName: 'avoid_polygons',
  roundTripOptionsPath: 'options.round_trip',
  profileFilterName: 'profile',
  responseErrorCodePath: 'response.body.error.code',
  initialMapMaxZoom: 18,
  initialZoomLevel: 12,
  dataOrigins: {
    directions: '/directions',
    isochrones: '/isochrones',
    fileImporter: 'fileImporter'
  },
  modes: {
    roundTrip: 'roundtrip',
    directions: 'directions',
    place: 'place',
    search: 'search',
    isochrones: 'isochrones'
  },
  importableModes: {
    roundTrip: 'roundtrip',
    directions: 'directions',
    isochrones: 'isochrones'
  },
  services: {
    directions: 'directions',
    geocodeSearch: 'geocodeSearch',
    autocomplete: 'autocomplete',
    reverseGeocode: 'reverseGeocode',
    isochrones: 'isochrones'
  },
  filterTypes: {
    wrapper: 'wrapper',
    array: 'array',
    string: 'string',
    steps: 'steps',
    random: 'random',
    text: 'text',
    boolean: 'boolean'
  },
  extraInfos: {
    surface: 'surface',
    steepness: 'steepness',
    waytype: 'waytype'
  },
  orsKmlDocumentDescription: 'ORS route file',
  segmentHightlightColor: '#9ACD32',
  alternativeRouteColor: '#6E6E6E',
  routeBackgroundColor: '#fff'
}

export default constants
