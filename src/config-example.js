const config = {
  baseAppUrl: '/map',
  devBaseAPIUrl: 'https://openrouteservice.org/wp-json/',
  prodBaseAPIUrl: 'https://openrouteservice.org/wp-json',
  mainMenuSlug: 'primary_menu',
  setCustomMenuIcons: true,
  defaultLocale: 'en-us',
  ORSApiKey: 'put-here-an-ors-api-key',
  useUserKey: true,
  baseMenuExternalUrl: 'https://openrouteservice.org',
  bitlyApiKey: 'put-the-bitly-api-key-here',
  bitlyLogin: 'put-the-bitly-login-here',
  maxPlaceInputs: 15 // Don't change this unless you know what your doing
}
config.getBaseUrl = () => {
  const env = process.env
  return env.NODE_ENV === 'production' ? config.prodBaseAPIUrl : config.devBaseAPIUrl
}

export default config
