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
      adminAreaFilter.state  = place.properties.region.toLowerCase().replace(' region', '')
    }
    if (layer === 'county') {
      if (place.properties.region) {
        adminAreaFilter.state  = place.properties.region.toLowerCase().replace(' region', '')
      }
      if (place.properties.county) {
        adminAreaFilter.county  = place.properties.county.toLowerCase().replace(' county', '')  
      } else {
        if (place.placeName.indexOf(',') > -1) {
          adminAreaFilter.county  = place.placeName.split(',')[0]
        } else {
          adminAreaFilter.county  = place.placeName
        }
      }
    }
    if (layer === 'locality') {
      if (place.properties.region && place.properties.region !== place.properties.locality) {
        adminAreaFilter.state  = place.properties.region.toLowerCase().replace(' region', '')
      }
      let locality = place.properties.locality || place.properties.county || place.properties.macrocounty
      if (locality) {
        adminAreaFilter.city = locality.toLowerCase()
      } else {
        if (place.placeName.indexOf(',') > -1) {
          adminAreaFilter.city  = place.placeName.split(',')[0]
        } else {
          adminAreaFilter.city  = place.placeName
        }
      }
    }
    return adminAreaFilter
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
    return new Promise((resolve, reject) => {
      let adminAreaFilter = this.buildAdminAreaFilter(place, layer)
      NominatimService.query(adminAreaFilter).then((response) => {
        let validPolygons = this.adjustAdminArea(place, response.data)
        if (validPolygons) {
          resolve(validPolygons)
        } else {
          resolve([])
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  /**
   * check if a Place is inside of any of the polygons passed
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
          polygons = this.buildPolygonsFromMultiPolygon(area.geojson, place)
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
  buildPolygonsFromMultiPolygon (AreaGeojson, place) {
    let polygons = []
    // Treat as multipolygon in both cases
    let splitPolygons = PolygonUtils.splitMultiPolygonIntoPolygons(AreaGeojson)
    for (let pKey in splitPolygons) {
      let adjustedPolygon = this.adjustPolygon(splitPolygons[pKey], place)
      if (adjustedPolygon) {
        polygons.push(adjustedPolygon)
      }
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
    let last = flattenCoordinates[flattenCoordinates.length - 1].toString()
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
