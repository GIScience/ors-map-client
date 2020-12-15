const config = {
  appName: 'Openrouteservice Maps',
  footerAppName: 'openrouteservice',
  baseAppUrl: '/', // could be, for example, '/map'
  devBaseAPIUrl: 'https://openrouteservice.org/wp-json/',
  prodBaseAPIUrl: 'https://openrouteservice.org/wp-json',
  mainMenuSlug: 'primary_menu',
  setCustomMenuIcons: true,
  defaultLocale: 'en-us', // only set as default a locale that is present in the app. By default they are: 'en-us', 'de-de' and 'pt-br'
  ORSApiKey: 'put-here-an-ors-api-key',
  useUserKey: true,
  baseMenuExternalUrl: 'https://openrouteservice.org',
  bitlyApiKey: 'put-the-bitly-api-key-here',
  bitlyLogin: 'put-the-bitly-login-here',
  maxPlaceInputs: 15, // Don't change this unless you know what your doing
  disabledActionsForIsochrones: ['roundtrip'], // possible values: addPlaceInput, clearPlaces, reverseRoute, roundtrip, routeImporter
  disabledActionsForPlacesAndDirections: [], // // possible values: addPlaceInput, clearPlaces, reverseRoute, roundtrip, routeImporter
  logoImgSrc: require('@/assets/img/logo@2x.png'),
  footerDevelopedByLink: 'https://www.heigit.org/'
}
config.getBaseUrl = () => {
  const env = process.env
  return env.NODE_ENV === 'production' ? config.prodBaseAPIUrl : config.devBaseAPIUrl
}

export default config
