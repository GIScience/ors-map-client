// https://github.com/webpack/webpack/issues/4772

const loader = {
  load: function (webPackContext, namedKey) {
    const defaultExports = []

    // here we initialize the object that will hold all the dependencies loaded
    const dependenceObjects = {}

    // tell the importer to use the passed context and populate the defined object
    importAll(webPackContext, dependenceObjects)

    /**
     * Once we have all additional route, we add them to the router
     */
    for (let prop in dependenceObjects) {
      // skip loop if the property is from prototype
      if (!Object.prototype.hasOwnProperty.call(dependenceObjects, prop)) continue

      // it is expected that each file has a default export
      // populate the array with named key of index, according the option passed
      if (namedKey === true) {
        defaultExports[prop] = dependenceObjects[prop].default
      } else {
        defaultExports.push(dependenceObjects[prop].default)
      }
    }
    return defaultExports
  }
}

// eslint-disable-next-line
function importAll (r, dependenceObjects) {
  r.keys().forEach(
    function (key) {
      // create a safe key, considering that the file path can contain dot and slash
      const safeKey = key.split('.').join('_').replace(/\//g, '_')
      dependenceObjects[safeKey] = r(key)
    }
  )
}

export default loader
