const config = {
  appName: 'Openrouteservice Maps',
  footerAppName: 'openrouteservice',
  baseAppUrl: '/', // could be, for example, '/map'
  appMenu: {
    useORSMenu: true,
    mainMenuId: 'primary_menu', // only necessary if useORSMenu is true
    menuServiceEndpoint: 'wp-api-menus/v2/menus', // only necessary if useORSMenu is true
    menuPrimaryKeyField: 'term_id', // only necessary if useORSMenu is true
    setCustomMenuIcons: true, // if the app must set custom menu icons for ORS menu. only if useORSMenu is true 
    baseMenuExternalUrl: 'https://openrouteservice.org', // The url to be prepended to the menu items wchick points to external world
    devBaseAPIUrl: 'https://openrouteservice.org/wp-json/', // base url to request menu items in dev mode
    prodBaseAPIUrl: 'https://openrouteservice.org/wp-json', // base url to request menu items in production mode
  },  
  defaultLocale: 'en-us', // only set as default a locale that is present in the app. By default they are: 'en-us', 'de-de' and 'pt-br'
  ORSApiKey: 'put-here-an-ors-api-key', // set here your ORS api key. REgister and get a key here https://openrouteservice.org/dev/#/login 
  useUserKey: true, // if the app must use an user ORS API key to run the requests. Default is true.
  bitlyApiKey: 'put-the-bitly-api-key-here',
  bitlyLogin: 'put-the-bitly-login-here',
  maxPlaceInputs: 15, // Don't change this unless you know what your doing
  disabledActionsForIsochrones: ['roundtrip'], // possible values: addPlaceInput, clearPlaces, reverseRoute, roundtrip, routeImporter
  disabledActionsForPlacesAndDirections: [], // // possible values: addPlaceInput, clearPlaces, reverseRoute, roundtrip, routeImporter
  logoImgSrc: require('@/assets/img/logo@2x.png'),
  footerDevelopedByLink: 'https://www.heigit.org/',

  supportsPlacesAndDirections: true, // If places and directions are supported/enabled in the application
  supportsIsochrones: true, // If isochrones is supported/enabled in the application
  supportsMapFiltersOnSidebar: true, // if the filters options box is present/enabled in the app
  sidebarStartsOpenInheighResolution: false, // if the sidebar must start open in heigh resolution
  defaultTileProvider: 'osm', // the default tipe provider

  // The map tile providers available. At least one must be present
  mapTileProviders: [
    {
      name: 'Open Street Maps',
      id: 'osm',
      visible: false,
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      token: null
    },
    {
      name: 'Satellite imagery',
      id: 'world-imagery',
      visible: false,
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      token: null
    },
    {
      name: 'Topography',
      id: 'topography',
      visible: false,
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      token: null
    },
    {
      name: 'Transport Dark',
      id: 'transport-dark',
      visible: false,
      url: 'https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=13efc496ac0b486ea05691c820824f5f',
      attribution: 'Maps &copy; <a href="http://thunderforest.com/">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      token: null
    },
    {
      name: 'Outdoors',
      id: 'outdoors',
      visible: false,
      url: 'https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=13efc496ac0b486ea05691c820824f5f',
      attribution: 'Maps &copy; <a href="http://thunderforest.com/">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    {
      name: 'Cyclosm',
      id: 'cyclosm',
      visible: false,
      url: 'https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
      attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  ]
}
config.getBaseUrl = () => {
  const env = process.env
  return env.NODE_ENV === 'production' ? config.prodBaseAPIUrl : config.devBaseAPIUrl
}

export default config
