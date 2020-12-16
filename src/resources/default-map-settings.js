import appConfig from '@/config/app-config'

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
  areaUnit: 'km',
  defaultTileProvider: appConfig.defaultTileProvider,
  customTileProviderUrl: '',
  prioritizeSearchingForNearbyPlaces: true,
  defaultProfile: 'cycling-regular',
  compressDataUrlSegment: true,
  autoFitHighlightedBounds: true,
  acessibleModeActive: false,
  shownOnceTooltips: {},
  mapCenter: {lat: 49.510944, lng: 8.76709}, // Default center is at Heidelberg, Germany

  // Settings not being used yet:
  tollways: false,
  randomizedIsochroneColors: false,
  suitabilityOfWays: false,
  distanceMarkers: false,
}

export default defaultMapSettings
