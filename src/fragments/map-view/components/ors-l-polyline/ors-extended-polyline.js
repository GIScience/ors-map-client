import Leaflet from 'leaflet'
import GeoUtils from '@/support/geo-utils'
import orsDictionary from '@/resources/ors-dictionary'
import lodash from 'lodash'

// The import below will add some methods to Leaflet.GeometryUtil
// Even if it has not been accessed within this class, it is being used!
import 'leaflet-geometryutil'

/**
 * Add custom behaviors to the polyline, specially the drag
 * to create a stop point.
 * @emits followMarkerClicked - when the marker created over the polyline to show current cursor position is clicked
 * @emits follow - when a point of the polyline is focused with the mouse
 * @emits addStop - when the user drag the new polyline vertex into a location
 */
class OrsExtendedPolyline {
  constructor (context, showPointInfo = false) {
    this.showPointInfo = showPointInfo
    const options = {
      options: {
        distance: 20,   //distance from pointer to the polyline
        tolerance: 5,  //tolerance for snap effect to vertex
        vertices: {
          //first: true,  //first vertex is draggable
          //middle: true, //middle vertices are draggable
          //last: true,   //last vertex draggable
          //insert: true, //define if the number of polyline vertices can change
        },
        icon: new Leaflet.DivIcon({
          iconSize: new Leaflet.Point(8, 8),
          className: 'leaflet-div-icon leaflet-editing-icon'
        })
      },
      tempPolylineDraggingMarkerRef: null,
      tempPolylineDraggingMarkerInfoRef: null,

      initialize: this.initialize,
      addHooks: this.addHooks,
      removeHooks: this.removeHooks,

      _showPointInfo: this.showPointInfo,
      _processDrag: this.processDrag,
      _getClosestPointAndSegment: this.getClosestPointAndSegment,
      _mouseContextClick: this.mouseContextClick,
      _mouseMove: this.mouseMove,
      _getClosestIndex: this.getClosestIndex,
      _getInjectAfterIndex: this.getInjectAfterIndex,
      _isInvalidDrag: this.isInvalidDrag,
      _markerDragStart: this.markerDragStart,
      _markerDrag: this.markerDrag,
      _markerDragEnd: this.markerDragEnd,
      _buildInfoIcon: this.buildInfoIcon,
      _createOrUpdateCustomMarkers: this.createOrUpdateCustomMarkers,
      _polylineClicked: this.showCustomMarkers,
      _updateCustomMarkers: this.updateCustomMarkers,
      _createCustomMarkers: this.createCustomMarkers,

      // The `this`context inside the methods above
      // refers to the leaflet component context.
      // so to have access to the external world
      // we have to bind the context passed via
      // constructor in order to be able to return
      // it via method
      _getOuterContext: this.getContext.bind(context)
    }
    this.addPolylineCustomBehaviour(options)
  }

  /**
   * Get the Vue component context provided via constructor
   * @returns {Object} Vue instance
   */
  getContext () {
    return this
  }

  /**
   * Extends the polyline by adding the editingDrag
   */
  addPolylineCustomBehaviour (options) {
    Leaflet.EditDrag = Leaflet.EditDrag || {}
    Leaflet.EditDrag.Polyline = Leaflet.Handler.extend(options)

    Leaflet.Polyline.addInitHook(function() {
      if (this.edit_with_drag) {
        return
      }

      if (Leaflet.EditDrag.Polyline) {
        this.editingDrag = new Leaflet.EditDrag.Polyline(this)

        if (this.options.edit_with_drag) {
          this.editingDrag.enable()
        }
      }

      this.on('add', function () {
        if (this.editingDrag && this.editingDrag.enabled()) {
          this.editingDrag.addHooks()
        }
      })

      this.on('remove', function () {
        if (this.editingDrag && this.editingDrag.enabled()) {
          this.editingDrag.removeHooks()
        }
      })
      this.on('polylineClicked', function (event) {
        if (this.editingDrag && this.editingDrag.enabled()) {
          this.editingDrag._polylineClicked(event)
        }
      })
    })
  }
  /**
   * Initialize the draggable polyline
   * by setting references to objects and options
   * @param {*} poly
   */
  initialize (poly) {
    this._poly = poly
    this._marker = null
    this._markerInfo = null
    this._dragging = false
    Leaflet.Util.setOptions(this, poly.options)
  }

  /**
   * Adds the mousemove listener
   */
  addHooks () {
    if (this._poly._map) {
      this._map = this._poly._map
      this._map.on('mousemove', this._mouseMove, this)
    }
  }

  /**
   * Remove the mousemove listener
   */
  removeHooks () {
    this._map.off('mousemove')
  }

  /**
  * return the closest point on the closest segment
  */
  getClosestPointAndSegment (latLng) {
    let distanceMin = Infinity
    let segmentMin = null
    const len = (this._poly._latlngs.length - 1)

    for (let i = 0; i < len; i++) {
      const segment = [this._poly._latlngs[i], this._poly._latlngs[i + 1]]
      const distance = Leaflet.GeometryUtil.distanceSegment(this._map, latLng, segment[0], segment[1])
      if (distance < distanceMin) {
        distanceMin = distance
        segmentMin = segment
      }
    }

    return { point: Leaflet.GeometryUtil.closestOnSegment(this._map, latLng, segmentMin[0], segmentMin[1]) , segment: segmentMin }
  }

  /**
   * When a click is done ends the dragging event
   * @param {Event} event
   */
  mouseContextClick (event) {
    const closest = Leaflet.GeometryUtil.closest(this._map, this._poly, event.latlng, true)

    if (this.options.vertices.destroy !== false && closest.distance < this.options.tolerance) {
      const index = this._poly._latlngs.indexOf(closest)
      const maxIndex = (this._poly._latlngs.length - 1)
      if ((this.options.vertices.first === false && index == 0) || (this.options.vertices.last === false && index == maxIndex)) {
        return
      }
      if (index > -1) {
        this._poly.spliceLatLngs(index, 1)
        this._map.removeLayer(this._marker)
        this._map.removeLayer(this._markerInfo)
        this._marker = null
        this._markerInfo = null
      }
    }
    this._poly.fireEvent('rightClicked', event)
  }
  /**
   * Handle the mouse move over the map.
   * @param {*} event
   */
  mouseMove (event) {
    if (this.options.edit_with_drag) {
      this._createOrUpdateCustomMarkers(event)
    }
  }

  /**
   * Show custom markers that appears over the polyline
   * @param {*} event
   */
  showCustomMarkers (event) {
    if (this.options.edit_with_drag) {
      const originalEvent = event.originalEvent || event
      try {
        originalEvent.stopPropagation()
        originalEvent.preventDefault()
      } catch (error) {
        console.log(error.message)
      }
      this._createOrUpdateCustomMarkers(event)
    }
  }

  /**
   * Create or update the custom markers
   * when the mouse move over the map.
   * If the mouse is over the polyline
   * creates a marker that follows the polyline
   * and can be used to create the drag effect
   * @param {*} e
   */
  createOrUpdateCustomMarkers (e) {
    if (this._dragging) return

    const closest = Leaflet.GeometryUtil.closestLayerSnap(this._map, [this._poly], e.latlng, this.options.distance, false)

    if (this._marker && closest) {
      this._updateCustomMarkers(closest)
      const latLng = this._marker.getLatLng()
      this._poly.fireEvent('follow', latLng)

    } else if (!this._marker && closest) {
      this._createCustomMarkers(closest)
      const latLng = this._marker.getLatLng()
      this._poly.fireEvent('follow', latLng)

    } else if (this._marker) {
      if (this._marker) {
        this._map.removeLayer(this._marker)
      }
      if (this._markerInfo) {
        this._map.removeLayer(this._markerInfo)
      }
      this._marker = null
      this._markerInfo = null
    }
  }

  /**
   * Update custom markers when the mouse moves over the polyline
   * @param {*} closest
   */
  updateCustomMarkers (closest) {
    this.tempPolylineDraggingMarkerRef = this._marker.addTo(this._map)
    Leaflet.extend(this._marker._latlng, closest.latlng)
    this._marker.options.draggable = true
    this._marker.update()

    if (this._markerInfo) {
      this.tempPolylineDraggingMarkerInfoRef = this._markerInfo.addTo(this._map)
      Leaflet.extend(this._markerInfo._latlng, closest.latlng)
      this._markerInfo.options.draggable = false
      const closestIndex = this._getClosestIndex()
      this._markerInfo.setIcon(this._buildInfoIcon(closestIndex))
      this._markerInfo.update()
    }
  }
  /**
   * Create custom markers when the mouse is over the polyline
   * @param {*} closest
   */
  createCustomMarkers (closest) {
    this.closest = closest
    this._marker = Leaflet.marker(closest.latlng, { draggable: true, icon: this.options.icon }).addTo(this._map)

    this._marker.on('dragstart', this._markerDragStart, this)
    this._marker.on('drag', this._markerDrag, this)
    this._marker.on('dragend', this._markerDragEnd, this)
    this._marker.on('contextmenu', this._mouseContextClick, this)
    this._marker.on('click', () => {
      this._poly.fireEvent('followMarkerClicked')
    })

    let closestIndex = this._getClosestIndex()

    // The hover polyline route info pop up is disabled for now
    if (this._showPointInfo) {
      const infoIcon = this._buildInfoIcon(closestIndex)
      if (infoIcon) {
        this._markerInfo = Leaflet.marker(closest.latlng, { clickable: false, draggable: false, icon: infoIcon }).addTo(this._map)
      }
    }
  }

  /**
   * Build route info icon content
   * @returns {Object} Leaflet.divIcon
   */
  buildInfoIcon (coordinatePolylineIndex) {
    const context = this._getOuterContext()
    const coordinates = lodash.get(context.route, 'geometry.coordinates')
    if (coordinates && coordinatePolylineIndex !== null) {
      const route = context.route
      const altitude = coordinates[coordinatePolylineIndex][2].toFixed(2)

      // calculate the distance of the point
      const totalDistance = route.summary.distance.toFixed(1)
      const currentStep = (route.geometry.coordinates.length / (coordinatePolylineIndex + 1))
      const currentDistance = (totalDistance / currentStep).toFixed(1)
      const globalTranslations = context.$t('global')
      const orsPolylineTranslations = context.$t('orsLPolyline')
      const orsDictionaryTranslations = context.$t('orsDictionary')
      let surfaceType = null

      // Get the surface type for the given point
      if (route.properties.extras.surface) {
        for (let key in route.properties.extras.surface.values) {
          let value = route.properties.extras.surface.values[key]
          if (coordinatePolylineIndex >= value[0] && coordinatePolylineIndex <= value[1]) {
            let surfaceTypeKey = orsDictionary.surface[value[2]]
            surfaceType = orsDictionaryTranslations[surfaceTypeKey]
            break
          }
        }
        if (!surfaceType) {
          surfaceType = context.$t('orsLPolyline.unknownSurfaceType')
        }
      }

      const infoIcon = Leaflet.divIcon({
        className: 'ors-l-polyline-custom-div-icon',
        html:
        `<div class='ors-l-polyline-info-wrapper'>
          <div class='ors-l-polyline-vertical-bar'></div>
          <div class='ors-l-polyline-content-block'>
            <div class='ors-l-polyline-top-block-info'>
              <b>${globalTranslations.distance}</b>: ${currentDistance} / ${totalDistance} ${route.summary.unit}<br/>
              <b>${globalTranslations.elevation}</b>: ${altitude} ${globalTranslations.units.meters}<br/>
              <b>${orsPolylineTranslations.surface}</b>: ${surfaceType}
            </div>
            <div class='ors-l-polyline-bottom-block-info'></div>
          </div>
        </div>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      })
      return infoIcon
    }
  }

  /**
   * Check whether the drag is valid
   * @param {*} index
   * @returns {Boolean}
   */
  isInvalidDrag (index) {
    if (!index) {
      return true
    }
    const maxIndex = (this._poly._latlngs.length - 1)

    if ((this.options.vertices.first === false && index == 0) ||
        (this.options.vertices.last === false && index == maxIndex) ||
        (this.options.vertices.middle === false && (index > 0 && index < maxIndex))) {
      return true
    }

    if ((this.options.vertices.middle === false || this.options.vertices.insert === false) && index === -1) {
      return true
    }
    return false
  }

  /**
   * When the marker drag starts
   * set the closest property and
   * set the flag _dragging as true
   * and process the drag
   * @param {*} event
   */
  markerDragStart (event) {
    const latLng = event.target.getLatLng()

    this.closest = Leaflet.GeometryUtil.closest(this._map, this._poly, latLng, true)
    this.startingDragPoint = latLng
    this._dragging = true

    // Check the tolerance
    if (this.closest.distance < this.options.tolerance) {
      this._processDrag()
    } else {
      this.closest = this._getClosestPointAndSegment(latLng)
      this._processDrag()
    }
  }

  /**
   * Get the closest polyline point index
   * @returns {Integer} closestIndex
   */
  getClosestIndex () {
    let closestIndex = null
    let minDistance = null
    if (this.closest) {
      for (let index = 0; index < this._poly._latlngs.length; index++) {
        let latLng = this._poly._latlngs[index]

        if (latLng) {
          let closestLatLng = this.closest.point || this.closest
          closestLatLng = closestLatLng.latlng || closestLatLng

          let currentDistance = GeoUtils.calculateDistanceBetweenLocations(latLng, closestLatLng, 'm')
          if (currentDistance === 0) {
            closestIndex = index
            break
          } else {
            if (minDistance === null || currentDistance < minDistance) {
              minDistance = currentDistance
              closestIndex = index
            }
          }
        }
      }
    }
    return closestIndex
  }

  /**
   * Get the index where the new stop must be added after
   * @returns {Integer} injectIndex
   */
  getInjectAfterIndex () {
    let injectIndex = null
    let minDistance = null
    for (let index = 0; index < this._poly._latlngs.length; index++) {
      let latLng = this._poly._latlngs[index]
      if (latLng) {
        let currentDistance = GeoUtils.calculateDistanceBetweenLocations(latLng, this.startingDragPoint, 'm')
        if (currentDistance === 0) {
          injectIndex = index
          break
        } else {
          if (minDistance === null || currentDistance < minDistance) {
            minDistance = currentDistance
            injectIndex = index
          }
        }
      }
    }
    return injectIndex
  }

  /**
   * Process the polyline drag by adding a temporary
   * vertex to represent user drag action
   * @param {*} event
   */
  processDrag () {
    const closestIndex = this._getClosestIndex()

    if (this._isInvalidDrag(closestIndex)) {
      this.closest = null
      this._marker.options.draggable = false
      this._dragging = false

    } else {
      //add a new vertex
      this._poly._latlngs.splice(closestIndex, 0, this.closest)
    }
  }

  /**
   * Set the closest lat and lng and redraw the polyline
   * @param {Object} event
   */
  markerDrag (event) {
    if (this.closest) {
      this.closest.lat = event.target.getLatLng().lat
      this.closest.lng = event.target.getLatLng().lng
      this._poly.redraw()
    }
  }

  /**
   * When the drag event ends, fire the addStop event
   * set the flat _dragging boolean as false and remove the
   * temp marker that follows the cursor over the polyline
   * @param {*} event
   */
  markerDragEnd (event) {
    const draggedFromIndex = this._getInjectAfterIndex()
    const data = {event, closest: this.closest, draggedFromIndex}
    this._poly.fireEvent('addStop', data)
    this._dragging = false
    this._map.removeLayer(this.tempPolylineDraggingMarkerRef)
    if (this.tempPolylineDraggingMarkerInfoRef) {
      this._map.removeLayer(this.tempPolylineDraggingMarkerInfoRef)
    }
    this.startingDragPoint = null
  }
}

export default OrsExtendedPolyline
