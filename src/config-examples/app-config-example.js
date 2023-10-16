// This is an example file and is expected to be cloned
// without the -example on the same folder that it resides.

// You can change the value of a property (using a supported value), but you shouldn't remove a property
/* eslint-disable no-undef */
const appConfig = {
  appName: 'Openrouteservice Maps', // The App name that is used as title for the logo
  footerAppName: 'openrouteservice', // The App name that appears on the bottom
  favIcon: '@/assets/img/favicon.ico', // The favicon used in the browser tab
  logoImgSrc: '@/assets/img/logo.png', // The logo used in the top-right corner of the sidebar and on the header menu
  brandLogoSrc: '@/assets/img/heigit-and-hd-uni-and-bw.png', // used for 'About' page and map overlay on large screens
  countryIconImgSrc: '@/assets/img/country-icon.png', // used for Place search as icon for country level results
  footerDevelopedByLink: 'https://www.heigit.org/', // The url that is used on the footer developed by link
  urlMode: 'hash', // The url mode for vue router: `hash` or `history`
  baseAppUrl: '/', // Could be, for example, '/map' if your app is running in a folder under a domain
  dataServiceBaseUrl: 'https://openrouteservice.org/wp-json/', // The base data url to retrieve ORS data (Don't change this unless you know what your doing!)
  maxPlaceInputs: 50, // The ORS API support max 50 points
  appMenu: {
    useORSMenu: true, // If the default ORS menu must be used
    mainMenuId: 'primary_menu',// only necessary if useORSMenu is true
    menuServiceEndpoint: 'wp-api-menus/v2/menus',// only necessary if useORSMenu is true
    menuPrimaryKeyField: 'term_id', // Only necessary if useORSMenu is true
    setCustomMenuIcons: true, // If the icons of the menu loaded must be customized via (only necessary if useORSMenu is true)
    baseMenuExternalUrl: 'https://openrouteservice.org' // The base url to retrieve the menu items
  },
  defaultLocale: 'en-us', // only set as default a locale that is present in the app. By default, they are: 'en-us', 'de-de' and 'pt-br'
  orsApiKey: 'put-here-an-ors-api-key', // ORS API key to be used on the ORS requests. You can get one here: https://openrouteservice.org/dev/#/signup
  useUserKey: true, // If the app is using a user ORS API key. // Don't change this unless you know what your doing!
  bitlyApiKey: 'put-the-bitly-api-key-here', // Bit.ly key used to generate the short url
  bitlyLogin: 'put-the-bitly-login-here', // Bit.ly login used to generate the short url

  showAdminAreaPolygon: true, // show admin area polygon
  showInstructionsTooltipsOnFirstLoad: true, // if the instructions tooltips must be shown on the app first load
  showDefaultAboutContent: true, // show default about content
  showAltitudeOnSidebar: false, // show altitude preview on sidebar

  autoSelectFirstExactAddressMatchOnSearchEnter: true, // If the first exact address match must be auto selected when the user type a text and in the place search and hit enter/return

  disabledActionsForIsochrones: ['roundtrip', 'routeImporter'], // Possible values: `addPlaceInput`, `clearPlaces`, `reverseRoute`, `roundtrip`, `routeImporter`
  disabledActionsForPlacesAndDirections: ['routeImporter'], // // Possible values: `addPlaceInput`, `clearPlaces`, `reverseRoute`, `roundtrip`, `routeImporter`
  supportsPlacesAndDirections: true, // If the whole places and directions feature is supported/enabled in the application
  supportsIsochrones: false, // If isochrones is supported/enabled in the application
  supportsMapFiltersOnSidebar: true, // if the filters options box is present/enabled in the app
  supportsDirections: true, // If the directions functionality is available
  sidebarStartsOpenInHighResolution: false, // if the sidebar must start open in high resolution
  defaultTilesProvider: 'osm', // The default tile provider  (valid values are the `id` property of one of the `mapTileProviders` array below)
  supportsAvoidPolygonDrawing: false, // If the avoid polygon drawing tools must be available on the map view
  distanceMeasureToolAvailable: false, // If the polyline distance measure tool must be available on the map view
  accessibilityToolAvailable: true, // If the accessibility tool must be available on the map view
  fitAllFeaturesToolAvailable: true, // If the fitAllFeatures tool must be available on the map view
  supportsClusteredMarkers: true, // If clustered markers is supported (then markers with `clustered=true` property will be clustered)
  supportsSearchBottomCarousel: true, // If the bottom carousel with the search results must be displayed or not.
  supportsSearchMode: true, // If the search mode is supported
  supportsMyLocationBtn: true, // If the `my location` button is supported on the map view
  initialZoomLevel: 13, // The initial map view zoom level
  initialMapMaxZoom: 18, // The initial map view max zoom


  // The map tile providers available. At least one must be present
  mapTileProviders: [
    {
      name: 'OpenStreetMap',
      id: 'osm',
      visible: false,
      attribution: '&copy; <a target="_blank" href="https://osm.org/copyright">OpenStreetMap</a> contributors',
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      maxZoom: 19
    },
    {
      name: 'Satellite imagery',
      id: 'world-imagery',
      visible: false,
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: 19
    },
    {
      name: 'Lite contrast',
      id: 'stamen-toner-lite',
      visible: false,
      url: 'https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> <a href="https://stamen.com/" target="_blank">&copy; Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors',
      maxZoom: 19
    },
    {
      name: 'High contrast',
      id: 'stamen-toner',
      visible: false,
      url: 'https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> <a href="https://stamen.com/" target="_blank">&copy; Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors',
      maxZoom: 19
    },
    {
      name: 'Light color',
      id: 'cartodb-positron',
      visible: false,
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19
    }
  ],
  wpsOverlayerTileProviders: []
}

export default appConfig
