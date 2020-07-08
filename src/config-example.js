const config = {
  baseAppUrl: '/map',
  devBaseAPIUrl: 'https://openrouteservice.org/wp-json/',
  prodBaseAPIUrl: 'https://openrouteservice.org/wp-json',
  mainMenuSlug: 'primary_menu',
  setCustomMenuIcons: true,
  userApiKey: 'put-a-fall-back-ors-api-key-here',
  publicApiKeyUrl: 'https://openrouteservice.org/wp-json/ors-api/v1/weathercheck',
  baseMenuExternalUrl: 'https://openrouteservice.org',
  bitlyApiKey: 'put-the-bitly-api-key-here',
  bitlyLogin: 'put-the-bitly-login-here',
  maxPlaceInputs: 15, // Don't change this unless you know what your doing
  useCompressedUrlData: true
}
config.getBaseUrl = () => {
  let env = process.env
  return env.NODE_ENV === 'production' ? config.prodBaseAPIUrl : config.devBaseAPIUrl
}

export default config
