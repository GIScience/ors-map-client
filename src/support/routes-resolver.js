import appConfig from '@/config'

const resolver = {

  homeUrl: () => {
    let currentPath = location.pathname
    let baseUrl = appConfig.baseAppUrl

    // This solution covers the build of the home url
    // for local development url
    // and production sub folder url
    if (currentPath.indexOf(baseUrl) > -1) {
      return baseUrl
    } else {
      return currentPath
    }
  },
  place: () => {
    return '/place/'
  },
  directions: () => {
    return '/directions/'
  },
  search: () => {
    return '/search/'
  },
  isochronesPath: () => {
    return '/reach/'
  }
}

export default resolver
