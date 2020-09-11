import Leaflet from 'leaflet'
import GeoUtils from '@/support/geo-utils'

// The import below will add some methods to Leaflet.GeometryUtil 
// Even if it is not been accessed within this class, it is being used
import LeafletGeometryutil from 'leaflet-geometryutil'

class OrsExtendedPolyline {
  constructor () {
    const options = {
      options: {
        distance: 20,   //distance from pointer to the polyline
        tollerance: 5,  //tollerance for snap effect to vertex
        vertices: {
          //first: true,  //first vertex is draggable
          //middle: true, //middle vertices are draggables
          //last: true,   //last vertex draggable
          //insert: true, //define if the number of polyline's vertices can change
        },
        icon: new Leaflet.DivIcon({
          iconSize: new Leaflet.Point(8, 8),
          className: 'leaflet-div-icon leaflet-editing-icon'
        })
      },
      tempPolylineDraggingMarkerRef: null,
    
      initialize: this.initialize,    
      addHooks: this.addHooks,    
      removeHooks: this.removeHooks,

      _processDrag: this.processDrag,    
      _getClosestPointAndSegment: this.getClosestPointAndSegment,    
      _mouseContextClick: this.mouseContextClick,    
      _mouseMove: this.mouseMove,    
      _getClosestIndex: this.getClosestIndex,
      _isInvalidDrag: this.isInvalidDrag,    
      _markerDragStart: this.markerDragStart,    
      _markerDrag: this.markerDrag,    
      _markerDragEnd: this.markerDragEnd
    }
    this.addPolylineCustomBehaviour(options)    
  }

  /**
   * Extends the polyline by adding the editingDrag
   */
  addPolylineCustomBehaviour (options) {
    Leaflet.EditDrag = Leaflet.EditDrag || {};    
    Leaflet.EditDrag.Polyline = Leaflet.Handler.extend(options);    
    
    Leaflet.Polyline.addInitHook(function() {
      if (this.edit_with_drag) {
        return
      }
    
      if (Leaflet.EditDrag.Polyline) {
        this.editingDrag = new Leaflet.EditDrag.Polyline(this);
    
        if (this.options.edit_with_drag) {
          this.editingDrag.enable()
        }
      }
    
      this.on('add', function () {
        if (this.editingDrag && this.editingDrag.enabled()) {
          this.editingDrag.addHooks()
        }
      });
    
      this.on('remove', function () {
        if (this.editingDrag && this.editingDrag.enabled()) {
          this.editingDrag.removeHooks()
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
  getClosestPointAndSegment (latlng) {
    var distanceMin = Infinity
    var segmentMin = null

    for (var i = 0, len = (this._poly._latlngs.length - 1); i < len; i++) {
      var segment = [ this._poly._latlngs[i], this._poly._latlngs[i + 1] ]
      var distance = Leaflet.GeometryUtil.distanceSegment(this._map, latlng, segment[0], segment[1])
      if (distance < distanceMin) {
        distanceMin = distance
        segmentMin = segment
      }
    }

    return { point: Leaflet.GeometryUtil.closestOnSegment(this._map, latlng, segmentMin[0], segmentMin[1]) , segment: segmentMin }
  }

  /**
   * When a click is done ends the dragging event
   * @param {*} e 
   */
  mouseContextClick (e) {
    var closest = Leaflet.GeometryUtil.closest(this._map, this._poly, e.latlng, true)

    if (this.options.vertices.destroy !== false && closest.distance < this.options.tollerance) {
      var index = this._poly._latlngs.indexOf(closest)
      var maxIndex = (this._poly._latlngs.length - 1)
      if ((this.options.vertices.first === false && index == 0) || (this.options.vertices.last === false && index == maxIndex)) {
        return
      }
      this._poly.spliceLatLngs(index, 1)
      this._map.removeLayer(this._marker)
      this._marker = null
    }
  }

  /**
   * Handle the mouse move over the map.
   * If the mouse is over the polyline
   * creates a marker that follows the polyline
   * and can be used to create the drag effect
   * @param {*} e 
   */
  mouseMove (e) {
    if (this._dragging) return

    var closest = Leaflet.GeometryUtil.closestLayerSnap(this._map, [this._poly], e.latlng, this.options.distance, false)

    if (this._marker && closest) {
      this.tempPolylineDraggingMarkerRef = this._marker.addTo(this._map)
      Leaflet.extend(this._marker._latlng, closest.latlng)
      this._marker.options.draggable = true
      this._marker.update()
      var latlng = this._marker.getLatLng()
      this._poly.fireEvent('follow', latlng)

    } else if (!this._marker && closest) {
      this._marker = Leaflet.marker(closest.latlng, { draggable: true, icon: this.options.icon }).addTo(this._map)
      this._marker.on('dragstart', this._markerDragStart, this)
      this._marker.on('drag', this._markerDrag, this)
      this._marker.on('dragend', this._markerDragEnd, this)
      this._marker.on('contextmenu', this._mouseContextClick, this)

    } else if (this._marker) {
      this._map.removeLayer(this._marker)
      this._marker = null
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
    var maxIndex = (this._poly._latlngs.length - 1)

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
   * set the flag _draggging as true
   * and process the drag
   * @param {*} event 
   */
  markerDragStart (event) {
    var latlng = event.target.getLatLng()

    this.closest = Leaflet.GeometryUtil.closest(this._map, this._poly, latlng, true)
    this._dragging = true
    //check the tollerance
    if (this.closest.distance < this.options.tollerance) {
      this._processDrag()    
    } else {
      this.closest = this._getClosestPointAndSegment(latlng)
      this._processDrag() 
    }
  }

  /**
   * Get the closest polyline point index
   * @returns {Integer} closestIndex
   */
  getClosestIndex () {
    var closestIndex = null
    var minDistance = null
    for (let index = 0; index < this._poly._latlngs.length; index++) {
      let latlng = this._poly._latlngs[index]
      
      if (latlng && this.closest) {
        let closestLatLng = this.closest.point || this.closest
        
        let currentDistance = GeoUtils.calculateDistanceBetweenLocations(latlng, closestLatLng, 'm')
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
    return closestIndex
  }

  /**
   * Process the polyline drag by adding a temporary 
   * vertex to represent user drag action
   * @param {*} event 
   */
  processDrag () {
    var closestIndex = this._getClosestIndex()

    if (this._isInvalidDrag(closestIndex)) {
      this.closest = null
      this._marker.options.draggable = false
      this._dragging = false
      return
    } else {
      //add a new vertex
      this._poly._latlngs.splice(closestIndex, 0, this.closest)
    }
  }

  /**
   * Set the closest lat and lng and redraw the polyline
   * @param {Object} e 
   */
  markerDrag (e) {
    if (this.closest) {
      this.closest.lat = e.target.getLatLng().lat
      this.closest.lng = e.target.getLatLng().lng
      this._poly.redraw()
    }
  }

  /**
   * When the drag event ends, fire the addstop event
   * set the flat _drgging boolean as false and remove the 
   * temp marker that follows the curor over the polyline
   * @param {*} event 
   */
  markerDragEnd (event) {
    // Make sure that the changes in the input are debounced
    var closestIndex = this._getClosestIndex()
    const data = {event, closest: this.closest, closestIndex}
    this._poly.fireEvent('addstop', data)
    this._dragging = false
    this._map.removeLayer(this.tempPolylineDraggingMarkerRef)       
  }
}

export default OrsExtendedPolyline

