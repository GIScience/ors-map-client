const constants = {
  clientVersion: '1.0.13', // If you change the version here you have to change on package.json too!
  apiVersion: '5.0',
  orsPublicHost: 'https://openrouteservice.org',
  orsApiRequestTimeout: 30000,
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
  avoidPolygonsFilterName: 'avoid_polygons',
  roundTripOptionsPath: 'options.round_trip',
  avoidPolygonsOptionsPath: 'options.options.avoid_polygons',
  profileFilterName: 'profile',
  vehicleTypeFilterName: 'vehicle_type',
  responseErrorCodePath: 'response.body.error.code',
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
    waytype: 'waytype',
    suitability: 'suitability',
    waycategory: 'waycategory',
    tollways: 'tollways',
    traildifficulty: 'traildifficulty',
    osmid: 'osmid',
    roadaccessrestrictions: 'roadaccessrestrictions',
    countryinfo: 'countryinfo',
    green: 'green',
    noise: 'noise'
  },
  orsKmlDocumentDescription: 'ORS route file',
  segmentHighlightColor: '#9ACD32',
  alternativeRouteColor: '#6E6E6E',
  routeBackgroundColor: '#fff'
}

export default constants
