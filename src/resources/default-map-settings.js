const defaultMapSettings = {
  apiBaseUrl: 'https://api.openrouteservice.org',
  saveToLocalStorage: true,
  elevationProfile: true,
  steepness: true,
  surface: true,
  waytype: true,
  apiKey: null,
  endpoints: null,
  locale: 'en',
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
  prioritizeSearchingForNearbyPlaces: true,
  defaultProfile: 'cycling-regular',
  compressDataUrlSegment: true,
  autoFitHighlightedBounds: true,
  acessibleModeActive: false
}

export default defaultMapSettings
