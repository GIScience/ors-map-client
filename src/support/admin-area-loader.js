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
        let county = place.properties.county.toLowerCase().replace(' county', '')
        adminAreaFilter.county  = county
      }
    }
    if (layer === 'locality') {
      if (place.properties.region && place.properties.region !== place.properties.locality) {
        adminAreaFilter.state  = place.properties.region.toLowerCase().replace(' region', '')
      }
      adminAreaFilter.city = place.properties.locality.toLowerCase()
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
      // maek a copy of the original layer 
      // before updating the place via resolver
      let layer = place.properties.layer
      let layersThatSupportAdminPolygon = ['county', 'locality', 'region', 'country']
      
      if (layersThatSupportAdminPolygon.includes(layer)) {
        // Define the zoom level used to resolve
        let layerZoom = GeoUtils.zoomLevelByLayer(layer)
  
        let context = this
        place.resolve(layerZoom).then(() => {
          let adminAreaFilter = context.buildAdminAreaFilter(place, layer)
          NominatimService.query(adminAreaFilter).then((response) => {
            let validPolygons = context.adjustAdminArea(place, response.data)            
            if (validPolygons) {
              resolve(validPolygons)
            } else {
              resolve([])
            }
          }).catch(err => {
            reject(err)
          })
        })
      } else {
        resolve([])
      }
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
  
      // Include the pois that are inside the area polygon
      if (PolygonUtils.isInsidePolygon(place, polygonCoords)) {              
        isInside = true
        break
      }
    }
    return isInside
  }

  /**
   * Adjust the area plygon and validate it
   * @param {*} place 
   * @param {*} polygon 
   * @returns {Object| false}
   */
  adjustAdminArea(place, data) {
    let polygons = []
    for (let key in data) {
      let area = data[key]
      if (area.geojson.type !== 'Point') {
        let hasCoordinatesAsMultyPolygon = Array.isArray(area.geojson.coordinates[0]) && Array.isArray(area.geojson.coordinates[0][0])
        
        // Treat as multipolygon in both cases
        if (area.geojson.type === 'MultiPolygon' || hasCoordinatesAsMultyPolygon ) {
          let splitPolygons = PolygonUtils.splitMultiPolygonIntoPolygons(area.geojson)
          for (let pKey in splitPolygons) {
            let adjustedPolygon = this.adjustPolygon(splitPolygons[pKey], place)
            if (adjustedPolygon) {
              polygons.push(adjustedPolygon)
            }
          }
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
    polygon = {geometry: {coordinates: flattenCoordinates}, type: polygon.type}
    polygon.label = place.placeName
    polygon.color = theme.primary
    polygon.fillColor = 'transparent'
    return polygon
  }
}
export default AdminAreaLoader
