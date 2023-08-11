const constants = {
  apiVersion: '5.0',
  orsPublicHost: 'https://maps.openrouteservice.org',
  orsApiRequestTimeout: 40000,
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
  responseErrorCodePath: 'response.error.code',
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
    isochrones: 'isochrones',
    pageNotFound: 'pageNotFound'
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
    boolean: 'boolean',
    switch: 'switch'
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
  routeBackgroundColor: '#fff',
  mapViewElementId: 'map-view',
  worldImageryTileProviderBaseUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile',
  links: {
    source: 'https://github.com/GIScience/ors-map-client',
    forum: 'https://ask.openrouteservice.org/c/maps/20',
    newIssue: 'https://github.com/GIScience/ors-map-client/issues/new',
    termsOfService: 'https://openrouteservice.org/terms-of-service',
    privacyPolicy: 'https://openrouteservice.org/privacy-policy/',
    donate: 'https://openrouteservice.org/donations/',
    ghsl: 'https://ghsl.jrc.ec.europa.eu/about.php',
    heigit: 'https://heigit.org',
    osm: 'https://osm.org',
    disaster: 'https://disaster.openrouteservice.org',
    ors: 'https://openrouteservice.org'
  }
}

export default constants
