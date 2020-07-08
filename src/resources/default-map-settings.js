const defaultMapSettings = {
  apiBaseUrl: 'https://api.openrouteservice.org',
  saveToLocalStorage: true,
  elevationProfile: true,
  steepness: true,
  surface: true,
  waytype: true,
  apiKey: null,
  endpoints: null,
  locale: 'en-us',
  routingInstructionsLocale: 'en',
  unit: 'km',
  alwaysFitBounds: true,
  // settings not being used yet:
  tollways: false,
  randomizedIsochroneColors: false,
  suitabilityOfWays: false,
  distanceMarkers: false,
  areaUnit: 'km',
  defaultTileProvider: 'osm',
  customTileProviderUrl: '',
  prioritizeSearchingForNearbyPlaces: true
}

export default defaultMapSettings
