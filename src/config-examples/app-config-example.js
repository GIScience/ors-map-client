// This is an example file and is expected to be cloned
// without the -example on the same folder that it resides.

// You can change the value of a property (using a supported value), but you shouldn't remove a property
/* eslint-disable no-undef */
const appConfig = {
  appName: 'Openrouteservice Maps', // The App name that is used as title for the logo
  footerAppName: 'openrouteservice', // The App name that appears on the bottom
  favIcon: '@/assets/img/favicon.ico', // The favicon used in the browser tab
  logoImgSrc: '@/assets/img/logo.png', // The logo used in the top-right corner of the sidebar and on the header menu
  brandLogoSrc: '@/assets/img/heigit-and-hd-uni.png', // used for 'About' page and map overlay on large screens
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
  showAltitudeOnSidebar: true, // show altitude preview on sidebar

  autoSelectFirstExactAddressMatchOnSearchEnter: true, // If the first exact address match must be auto selected when the user type a text and in the place search and hit enter/return

  disabledActionsForIsochrones: ['roundtrip'], // Possible values: `addPlaceInput`, `clearPlaces`, `reverseRoute`, `roundtrip`, `routeImporter`
  disabledActionsForPlacesAndDirections: [], // // Possible values: `addPlaceInput`, `clearPlaces`, `reverseRoute`, `roundtrip`, `routeImporter`
  supportsPlacesAndDirections: true, // If thw whole places and directions feature is supported/enabled in the application
  supportsIsochrones: true, // If isochrones is supported/enabled in the application
  supportsMapFiltersOnSidebar: true, // if the filters options box is present/enabled in the app
  supportsDirections: true, // If the directions functionality is available
  sidebarStartsOpenInHighResolution: false, // if the sidebar must start open in high resolution
  defaultTilesProvider: 'osm', // The default tile provider  (valid values are the `id` property of one of the `mapTileProviders` array below)
  supportsAvoidPolygonDrawing: true, // If the avoid polygon drawing tools must be available on the map view
  distanceMeasureToolAvailable: true, // If the polyline distance measure tool must be available on the map view
  accessibilityToolAvailable: true, // If the accessibility tool must be available on the map view
  fitAllFeaturesToolAvailable: true, // If the fitAllFeatures tool must be available on the map view
  supportsClusteredMarkers: true, // If clustered markers is supported (then markers with `clustered=true` property will be clustered)
  supportsSearchBottomCarousel: true, // If the bottom carousel with the search results must be displayed or not.
  supportsSearchMode: true, // If the search mode is supported
  supportsMyLocationBtn: true, // If the `my location` button is supported on the map view
  initialZoomLevel: 6, // The initial map view zoom level
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
      maxZoom: 17
    },
    {
      name: 'Topography',
      id: 'topography',
      visible: false,
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href=https:///viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      maxZoom: 18
    },
    {
      name: 'Transport Dark',
      id: 'transport-dark',
      visible: false,
      url: 'https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=13efc496ac0b486ea05691c820824f5f',
      attribution: 'Maps &copy; <a href="https://thunderforest.com/">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    },
    {
      name: 'Outdoors',
      id: 'outdoors',
      visible: false,
      url: 'https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=13efc496ac0b486ea05691c820824f5f',
      attribution: 'Maps &copy; <a href="https://thunderforest.com/">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    },
    {
      name: 'Cyclosm',
      id: 'cyclosm',
      visible: false,
      url: 'https://{s}.tile-openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
      attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }
  ],
  wpsOverlayerTileProviders: []
}

export default appConfig
