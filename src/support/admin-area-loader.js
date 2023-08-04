import NominatimService from '@/support/nominatim-service'
import PolygonUtils from '@/support/polygon-utils'
import GeoUtils from '@/support/geo-utils'
import theme from '@/config/theme'

/**
 * AdminAreaLoader class
 */
class AdminAreaLoader {
  /**
   * Build the admin area query filter based on place properties
   * @param {*} place
   * @returns {Object} adminAreaFilter
   */
  buildAdminAreaFilter(place, layer) {
    let adminAreaFilter = { polygon_geojson: 1, format: 'json', country: place.properties.country }

    if (layer === 'region') {
      if (place.properties.region) {
        adminAreaFilter.state = place.properties.region.toLowerCase().replace(' region', '')
      } else {
        adminAreaFilter.state  = this.getPlaceNameAsAdminArea(place)
      }
      return adminAreaFilter
    }
    if (layer === 'county') {
      this.setAdminRegion(adminAreaFilter, place)
      if (place.properties.county) {
        adminAreaFilter.county  = place.properties.county.toLowerCase().replace(' county', '')
      } else {
        adminAreaFilter.county  = this.getPlaceNameAsAdminArea(place)
      }
      return adminAreaFilter
    }
    if (layer === 'locality') {
      this.setAdminRegion(adminAreaFilter, place)
      let locality = place.properties.locality || place.properties.county || place.properties.macrocounty
      if (locality) {
        adminAreaFilter.city = locality.toLowerCase()
      } else {
        adminAreaFilter.city  = this.getPlaceNameAsAdminArea(place)
      }
    }
    return adminAreaFilter
  }

  /**
   * Set admin area filter state
   * @param {Object} adminAreaFilter
   * @param {Place} place
   */
  setAdminRegion (adminAreaFilter, place) {
    if (place.properties.region && place.properties.region !== place.properties.locality) {
      adminAreaFilter.state  = place.properties.region.toLowerCase().replace(' region', '')
    }
  }

  /**
   * Get the place name as admin area
   * @param {Place} place
   * @returns {String}
   */
  getPlaceNameAsAdminArea (place) {
    let adminArea
    if (place.placeName.indexOf(',') > -1) {
      adminArea  = place.placeName.split(',')[0]
    } else {
      adminArea  = place.placeName
    }
    return adminArea
  }

  /**
   * Get the admin area polygon for a given place
   * @param {Place} place
   * @return {Promise}
   */
  getAdminAreaPolygon(place) {
    return new Promise((resolve, reject) => {
      if (!place.placeName) {
        resolve([])
      }
      // make a copy of the original layer
      // before updating the place via resolver
      let layer = place.properties.layer
      let layersThatSupportAdminPolygon = ['county', 'locality', 'region', 'country']

      if (layersThatSupportAdminPolygon.includes(layer)) {
        // Define the zoom level used to resolve
        let layerZoom = GeoUtils.zoomLevelByLayer(layer)

        let context = this
        if (place.isEmpty()) {
          place.resolve(layerZoom).then(() => {
            context.getPlaceValidPolygons(place, layer).then((validPolygons) => {
              resolve(validPolygons)
            }).catch(err => {
              reject(err)
            })
          })
        } else {
          context.getPlaceValidPolygons(place, layer).then((validPolygons) => {
            resolve(validPolygons)
          }).catch(err => {
            reject(err)
          })
        }
      } else {
        resolve([])
      }
    })
  }

  /**
   * Get place valid polygons
   * @param {Place} place
   * @param {String} layer
   * @returns {Array}
   */
  getPlaceValidPolygons (place, layer) {
    let context = this
    return new Promise((resolve, reject) => {
      let adminAreaFilter = this.buildAdminAreaFilter(place, layer)
      NominatimService.query(adminAreaFilter).then((response) => {
        let validPolygons = context.adjustAdminArea(place, response.data)
        if (Array.isArray(validPolygons) && validPolygons.length > 0) {
          resolve(validPolygons)
        } else {
          // Some places are stored considered as region/state in OSM
          // but are taken as county by nominatim. So, in the case it
          // is not found as state, try as county.
          if (adminAreaFilter.state && !adminAreaFilter.county) {
            context.getPlaceValidPolygons(place, 'county').then(result => {
              resolve(result)
            })
          } else {
            resolve([])
          }
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  /**
   * check if a Place is inside any passed polygon
   * @param {*} polygons
   * @param {Place} place
   */
  isPointInsidePolygons (polygons, place) {
    let isInside = false

    for (let key in polygons) {
      // Adjust the order of lat lng
      let polygonCoords = GeoUtils.switchLatLonIndex(polygons[key].geometry.coordinates)

      // Include the POIs that are inside the area polygon
      if (PolygonUtils.isInsidePolygon(place, polygonCoords)) {
        isInside = true
        break
      }
    }
    return isInside
  }

  /**
   * Adjust the area polygon and validate it
   * @param {*} place
   * @param {*} polygon
   * @returns {Object| false}
   */
  adjustAdminArea(place, data) {
    let polygons = []
    for (let key in data) {
      let area = data[key]
      if (area.geojson.type !== 'Point') {
        let hasCoordinatesAsMultiPolygon = Array.isArray(area.geojson.coordinates[0]) && Array.isArray(area.geojson.coordinates[0][0])

        // Treat as multipolygon in both cases
        if (area.geojson.type === 'MultiPolygon' || hasCoordinatesAsMultiPolygon ) {
          let builtPolygons = this.buildPolygonsFromMultiPolygon(area.geojson, place)
          polygons = polygons.concat(builtPolygons)
        } else {
          let polygon = {geometry: {coordinates: area.geojson.coordinates}, type: area.geojson.type}
          let adjustedPolygon = this.adjustPolygon(polygon, place)
          if (adjustedPolygon) {
            polygons.push(adjustedPolygon)
            break
          }
        }
      }
    }
    let isInside = this.isPointInsidePolygons(polygons, place)
    if (isInside) {
      return polygons
    }
    return []
  }

  /**
   * Build a polygon collection from a multipolygon area object
   * @param {Geojson} area
   * @param {Place} place
   * @returns {Array}
   */
  buildPolygonsFromMultiPolygon (areaGeojson, place) {
    let polygons = []
    // Treat as multipolygon in both cases
    let splitPolygons = PolygonUtils.splitMultiPolygonIntoPolygons(areaGeojson)
    for (let pKey in splitPolygons) {
      let adjustedPolygon = this.adjustPolygon(splitPolygons[pKey], place)
      if (adjustedPolygon) {
        if (adjustedPolygon.length === 1 && adjustedPolygon[0].length > 3) {
          polygons.push(adjustedPolygon[0])
        } else {
          polygons = polygons.concat(adjustedPolygon)
        }
      }
    }
    // In some cases, the built multipolygon contains only one polygon
    if (polygons.length === 1 && polygons[0].length > 3) {
      polygons = polygons[0]
    }
    return polygons
  }
  /**
   * Validate a polygon
   * @param {*} polygon
   * @param {*} place
   * @returns {Object|false} polygon
   */

  adjustPolygon (polygon, place) {
    let flattenCoordinates = PolygonUtils.flatCoordinates(polygon.geometry.coordinates)
    let first = flattenCoordinates[0].toString()
    let last = flattenCoordinates.at(-1).toString()
    if (first !== last) {
      let cleanCoords = []
      for (let key in flattenCoordinates) {
        let current = flattenCoordinates[key].toString()
        if (key > 0 && current === first) {
          break
        } else {
          cleanCoords.push(flattenCoordinates[key])
        }
      }
      flattenCoordinates = cleanCoords
    }
    polygon = {geometry: {coordinates: flattenCoordinates}, type: polygon.type, properties: {}}
    polygon.properties.label = place.placeName
    polygon.properties.color = theme.primary
    polygon.properties.visible = true
    polygon.properties.fillColor = 'transparent'
    return polygon
  }
}
export default AdminAreaLoader
