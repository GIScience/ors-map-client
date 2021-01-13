import PoiPopupContent from './fragments/poi-popup-content/PoiPopupContent'
import HtmlIcon from './fragments/html-icon/HtmlIcon'
import TargetPoisService from './target-pois-service'
import targetPoisConfig from './target-pois-config'
import AppMode from '@/support/app-modes/app-mode'
import constants from '@/resources/constants'
import GeoUtils from '@/support/geo-utils'
import Place from '@/models/place'
import store from '@/store/store'
import Leaflet from 'leaflet'
import {
  VBtn
} from 'vuetify'
import lodash, { reject } from 'lodash'
import Vue from 'vue'

class TargetPois {
  /**
   * TargetPois constructor.
   * IMPORTANT: this constructor is expected 
   * to be called on the hooks.js the `appLoaded` hook
   */
  constructor(vueInstance) {
    this.vueInstance = vueInstance
    this.debounceTimeoutId = null
    this.pois = []
    this.currentBoundingBox = null
  }

  /**
   * Adjust marker cluster options (change original object)
   * @param {*} options 
   */
  beforeUseMarkerClusterOptions(options) {
    options.showCoverageOnHover = false
    options.zoomToBoundsOnClick = true
    options.maxClusterRadius = 70
  }

  /**
   * Build overpass query filter to retrive
   * nodes and ways within a given bbox
   * @param {String} bboxStr 
   * @returns {Object}
   */
  buildOverPassQueryFilter(bboxStr) {
    let query = ''
    for (let key in targetPoisConfig.nodes) {
      query += `node[${targetPoisConfig.nodes[key]}](${bboxStr});`
    }
    for (let key in targetPoisConfig.ways) {
      query += `way[${targetPoisConfig.ways[key]}](${bboxStr});`
    }
    let filter = {
      data: `[out:json][timeout:${targetPoisConfig.timeout}]; (${query}); out center;`
    }
    return filter
  }
  /**
   * Build overpass query filter to retrive
   * nodes and ways near given center and distance
   * @param {Place} fromPlace 
   * @param {Number} maxDistance 
   * @returns {Object}
   */
  buildOverPassCenterFilter(fromPlace, maxDistance = 100000) {
    let center = `${fromPlace.lat},${fromPlace.lng}`
    let query = ''
    for (let key in targetPoisConfig.nodes) {
      query += `node[${targetPoisConfig.nodes[key]}](around:${maxDistance},${center});`
    }
    for (let key in targetPoisConfig.ways) {
      query += `way[${targetPoisConfig.ways[key]}](around:${maxDistance},${center});`
    }
    let filter = {
      data: `[out:json][timeout:${targetPoisConfig.timeout}]; (${query}); out center;`
    }
    return filter
  }

  /**
   * Get POIs withing the current bounding box
   * in the app mapBounds store.
   * @returns {Promise}
   */
  getBboxPois() {
    return new Promise((resolve, reject) => {
      let bbox = store.getters.mapBounds
      let bboxStr = `${bbox.rect.min_lat},${bbox.rect.min_lon},${bbox.rect.max_lat},${bbox.rect.max_lon}`

      if (this.currentBoundingBox != bboxStr) {
        this.currentBoundingBox = bboxStr
        let filters = this.buildOverPassQueryFilter(bboxStr)
        this.vueInstance.showInfo(this.vueInstance.$t('targetPois.loadingPois'), {
          timeout: 0
        })
        let context = this
        TargetPoisService.query(filters).then(response => {
          let poiPlaces = []
          if (response.data.length === 0) {
            if (context.vueInstance.$store.getters.mode === constants.modes.place) {
              context.vueInstance.showWarning(context.vueInstance.$t('targetPois.notPoisInThisRegion'), {timeout: 2000})
            }
          } else {
            poiPlaces = context.parseResultIntoPlaces(response.data)
            this.vueInstance.showSuccess(this.vueInstance.$t('targetPois.poisLoaded'), {
              timeout: 1000
            })
          }
          resolve(poiPlaces)
        }).catch(err => {
          reject(err)
        })
      }
    })
  }

  /**
   * Parse overpass api results into Place objects
   * @param {Array} items 
   * @returns {Array} of Places
   */
  parseResultIntoPlaces(items) {
    let poiPlaces = []
    for (let key in items) {
      let center = items[key]
      let placeName = center.tags.name || center.tags.description
      let properties = center.tags
      properties.targetedPoi = true
      let place = new Place(center.lon, center.lat, placeName, {
        properties: properties,
        placeId: center.id,
        isPoi: true
      })
      poiPlaces.push(place)
    }
    return poiPlaces
  }

  /**
   * Get the closest POIs from a POIs list, a given place and a maximum number of POIs
   * @param {*} pois 
   * @param {*} fromPlace 
   * @param {*} max  default is 3
   */
  getClosestPoiPlaces(pois, fromPlace, max = 3) {
    // Add the distance from given place to each POI
    for (let i = 1; i < pois.length; i++) {
      let toLatlng = {
        lat: pois[i].lat,
        lng: pois[i].lon
      }
      pois[i].distance = GeoUtils.calculateDistanceBetweenLocations(fromPlace, toLatlng)
    }
    // Sort POIs by distance
    pois = lodash.sortBy(pois, ['distance', 'asc'])

    // Get only the max items specified
    pois = pois.slice(0, max)

    // Convert POI ojevts into Places
    let closestPois = []
    for (let key in pois) {
      let placeName = pois[key].tags.name || pois[key].tags.description
      let properties = pois[key].tags
      let place = new Place(pois[key].lon, pois[key].lat, placeName, {
        properties: properties,
        placeId: pois[key].id,
        isPoi: true
      })
      closestPois.push(place)
    }
    return closestPois
  }

  /**
   * Get the POIs near a given center Place
   * @param {Place} fromPlace 
   * @param {Number} maxDistance 
   * @returns {Promise}
   */
  getPoisByCenterLocation(fromPlace, maxDistance) {
    let context = this
    return new Promise((resolve, reject) => {
      let filter = context.buildOverPassCenterFilter(fromPlace, maxDistance)
      TargetPoisService.query(filter).then(response => {
        let poiPlaces = []
        if (response.data.length > 0) {
          poiPlaces = context.getClosestPoiPlaces(response.data, fromPlace, 1)
        }
        resolve(poiPlaces)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  /**
   * Intercept the placeSelected event and hijack the app
   * behavior, chaing it to route to the nearest POI from
   * the selected Place
   * @param {Object} hookData 
   */
  placeSelected(hookData) {
    return new Promise((resolve) => {
      if (hookData.single) { // if the place was selected in a single input mode
        let context = this
        this.vueInstance.showInfo(this.vueInstance.$t('targetPois.searchingClosestPoi'))
        this.getPoisByCenterLocation(hookData.place).then(poiPlaces => {
          if (poiPlaces.length === 0) {
            context.vueInstance.showWarning(context.vueInstance.$t('targetPois.notPoiFoundNearTheLocationSelected'))
            resolve(true) // resolve will tell the place selected action to continue its normal flow
          } else {
            context.goToDirectionsRoute(hookData.place, poiPlaces[0])
          }
        }).catch((err) => {
          console.log(err)
          context.vueInstance.showWarning(context.vueInstance.$t('targetPois.notPoiFoundNearTheLocationSelected'))
          resolve(true) // resolve will tell the place selected action to continue its normal flow
        })
      } else {
        resolve(true) // resolve will tell the place selected action to continue its normal flow
      }
    })
  }

  /**
   * Build an app route object based on from and to 
   * places and redirect the app the new route
   * @param {Place} fromPlace 
   * @param {Place} toPlace 
   */
  goToDirectionsRoute(fromPlace, toPlace) {
    const appMode = new AppMode(constants.modes.directions)
    const route = appMode.getRoute([fromPlace, toPlace])
    this.vueInstance.$router.push(route)
  }

  /**
   * When the POI markers are created
   * customize them, using a custom icon and colors
   * @param {Array} markers 
   * @returns {Array} markers
   */
  poisMarkersCreated(markers) {
    // Build the html icon component and then gets its html
    var htmlIconClass = Vue.extend(HtmlIcon)
    let iconImg = require('./resources/poi-marker-img.png')
    var htmlIconInstance = new htmlIconClass({
      propsData: {
        color: 'white',
        iconImg: iconImg
      }
    })
    htmlIconInstance.$mount()
    let markerHtml = htmlIconInstance.$el.innerHTML

    for (let key in markers) {
      if (markers[key].place.properties.targetedPoi) {
        markers[key].clustered = true // if the markers should be shown clustered or not

        markers[key].icon = Leaflet.divIcon({
          className: 'custom-div-icon',
          html: markerHtml,
          iconSize: [30, 42],
          iconAnchor: [15, 42]
        })
      }
    }
    return markers
  }

  /**
   * Handle the marker popup open event
   * We modify the popup based on the place/marker clicked
   * to show place details and actions
   * @param {*} hookData 
   */
  beforeOpenMarkerPopup(hookData) {
    // hookData has the following structure {marker: Object, markerPopupContainer: HtmlNode}
    if (hookData.marker.place.properties.targetedPoi) {
      hookData.markerPopupContainerRef.innerText = ''
      hookData.markerPopupContainerRef.innerHTML = ''
      this.changePopupContent(hookData.markerPopupContainerRef, hookData.marker.place, true, false)
    } else if (hookData.marker.place.isPoi) {
      let context = this
      this.getPoisByCenterLocation(hookData.marker.place, 10).then(poiPlaces => {
        if (poiPlaces.length > 0) {
          let closestPoi = poiPlaces[0]
          if (closestPoi.equals(hookData.marker.place)) {
            context.changePopupContent(hookData.markerPopupContainerRef, closestPoi)
          }
        }
      })
    }
  }
  /**
   * Change the popup content based on the place data
   * @param {*} markerPopupContainerRef 
   * @param {*} poiPlace 
   * @param {*} addRouteBtn 
   * @param {*} hideName 
   */
  changePopupContent(markerPopupContainerRef, poiPlace, addRouteBtn = false, hideName = true) {
    let popup = markerPopupContainerRef.querySelectorAll('.poi-popup-content')

    if (popup.length === 0) {
      // TODO: avoid appending PoiPopupContent twice when the same marker is clicked a second time
      var PoisComponentClass = Vue.extend(PoiPopupContent)
      var poisPopupInstance = new PoisComponentClass({ propsData: { place: poiPlace, hideName: hideName} })
      poisPopupInstance.$mount() // pass nothing
      markerPopupContainerRef.appendChild(poisPopupInstance.$el)
      // If the route to this location btn must be appended
      if (addRouteBtn) {
        var BtnComponentClass = Vue.extend(VBtn) // don't forget to add 
        var btnInstance = new BtnComponentClass({
          propsData: {
            color: 'primary'
          }
        })
        btnInstance.$slots.default = [this.vueInstance.$t('targetPois.routeToThisPlace')]
  
        btnInstance.$on(['click'], e => {
          this.vueInstance.eventBus.$emit('directionsToPoint', {
            latlng: poiPlace.getLatLng(),
            place: poiPlace
          })
          this.vueInstance.$store.commit('setLeftSideBarIsOpen', true)
        })
        btnInstance.$mount() // pass nothing
        btnInstance.$el.style.marginLeft = '0'
        markerPopupContainerRef.appendChild(btnInstance.$el)
      }
    }
  }

  /**
   * Load POIs for the current map view
   * @param {MapViewData} mapViewData 
   * @param {*} zoom 
   * @emits mapViewDataChanged via eventBus
   */
  loadPoisForCurrentView(mapViewData, zoom = null) {
    clearTimeout(this.debounceTimeoutId)
    if (zoom && zoom < 6) {
      this.vueInstance.showWarning(this.vueInstance.$t('targetPois.zoomInToLoadPOIs'))
    } else {      
      const context = this
      this.debounceTimeoutId = setTimeout(function () {
        let cloneddMapViewData = mapViewData.clone()
        context.getBboxPois().then((poiPlaces) => {
          context.appendDifferPois(poiPlaces, cloneddMapViewData)
          context.pois = cloneddMapViewData.pois
          context.vueInstance.eventBus.$emit('mapViewDataChanged', cloneddMapViewData)
        }).catch(err => {
          context.vueInstance.showWarning(context.vueInstance.$t('targetPois.poisForTheCurrentViewCouldNotBeLoaded'), {timeout: 0})
        })
      }, 1000)
    }
  }
  /**
   * Append POIs that are not already loaded into the view
   * @param {Array} poiPlaces 
   * @param {MapViewData} mapViewData 
   */
  appendDifferPois(poiPlaces, mapViewData) {
    for (let key in poiPlaces) {
      let alreadyPresent = lodash.find(mapViewData.pois, function (p) {
        return p.placeId === poiPlaces[key].placeId || p.equals(poiPlaces[key])
      })
      if (!alreadyPresent) {
        alreadyPresent = lodash.find(mapViewData.places, function (p) {
          return p.placeId === poiPlaces[key].placeId || p.equals(poiPlaces[key])
        })
      }
      if (!alreadyPresent) {
        mapViewData.pois.push(poiPlaces[key])
      }
    }
  }

  /**
   * If the mapViewData changes and has no POIs (a route was calculated)
   * add the already loaded POIs to the object
   * @param {*} mapViewData 
   */
  mapViewDataChanged(mapViewData) {
    if (mapViewData.pois.length === 0 && this.pois.length > 0) {
      this.appendDifferPois(this.pois, mapViewData)
    }
  }

  /**
   * When the map bound changes, load the POIs withing the current map bounds
   * @param {*} hookData 
   */
  mapBoundsChanged(hookData) {
    let currentZoom = lodash.get(this.vueInstance, '$store.getters.appRouteData.options.zoom')
    this.loadPoisForCurrentView(hookData.context.mapViewData, currentZoom)
  }

  /**
   * Customize the place input label based on the app state
   * @param {*} hookData 
   */
  placeInputLabelBuilt(hookData) {
    if ((this.vueInstance.$store.getters.mode === constants.modes.place && hookData.single) || (hookData.placeModel.isEmpty() && hookData.single)) {
      hookData.label = this.vueInstance.$t('targetPois.findPoiNear')
    }
  }
}
// export the AppHooks json builder class
export default TargetPois
