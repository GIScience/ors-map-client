// This is an example file and is expected to be cloned 
// without the -example on the same folder that it resides.

/**
 * The object below contains the default settings that are configurable via
 * app interface in src/fragments/forms/settings.vue. If the user changes a value for 
 * a given setting option, then it will be saved in the localStorage, loaded on the app load
 * and will override the default value.  The options for each settings value are defined
 * in src/config/settings-options-example.js. You can change the default value, but not
 * remove defaultMapSettings props.
 */

const defaultMapSettings = {
  apiBaseUrl: 'https://api.openrouteservice.org',
  saveToLocalStorage: true,
  elevationProfile: true,
  steepness: true,
  surface: true,
  waytype: true,
  apiKey: null,
  endpoints: null,
  locale: 'de-de',
  routingInstructionsLocale: 'en',
  unit: 'km',
  alwaysFitBounds: true,
  areaUnit: 'km',
  defaultTileProvider: 'osm',
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
