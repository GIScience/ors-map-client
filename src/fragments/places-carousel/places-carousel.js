import geoUtils from '@/support/geo-utils'
import resolver from '@/support/routes-resolver'
import MapViewData from '@/models/map-view-data'
import VueHorizontalList from 'vue-horizontal-list'
import theme from '@/common/theme'

export default {
  props: {
    mapViewData: {
      required: true,
      type: MapViewData
    },
    activeIndex: {
      default: 0,
      type: Number
    }
  },
  watch: {
    'horizontalListRef.position' (newIndex) {
      if (this.mapViewData.places[newIndex]) {
        let place = this.mapViewData.places[newIndex]
        this.placeActive = place
        this.$emit('placeSelected', newIndex)
      }
    },
    'activeIndex' (newIndex) {
      // the place change comes from outside
      this.horizontalListRef.go(newIndex)
    }
  },
  data: () => ({
    imageUrlFallBack: (resolver.homeUrl() + '/static/img/map-pin-600x400.jpg').replace('//', '/'),
    worldImageryTileProviderBaseUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile',
    horizontalListRef: null,
    placeActive: null
  }),
  computed: {
    /**
     * Return the horizontal list component options
     * @returns {Object}
     */
    horizontalListOptions () {
      return {
        item: {
          // css class to inject into each individual item
          class: '',
          // padding between each item
          padding: 12
        },
        list: {
          // css class for the parent of item
          class: '',
          // maximum width of the list it can extend to before switching to windowed mode, basically think of the bootstrap container max-width
          // windowed is used to toggle between full-screen mode and container mode
          windowed: 1200,
          // padding of the list, if container < windowed what is the left-right padding of the list
          // during full-screen mode the padding will added to left & right to centralise the item
          padding: 24
        },
        responsive: [
          // responsive breakpoints to calculate how many items to show in the list at each width interval
          // it will always fall back to these:
          {end: 576, size: 1},
          {start: 576, end: 768, size: 2},
          {start: 768, end: 992, size: 3},
          {start: 992, end: 1200, size: 4},
          {start: 1200, size: 5}
        ],
        navigation: {
          // when to show navigation
          start: 10000000, // define a very big value in order to avoid the navigation arrows to be shown. We are using custom navigation
          color: theme.primary
        }
      }
    },
    themeAcessor () {
      return theme
    }
  },
  methods: {
    /**
     * Get the image path for a given place
     * @param {*} place
     * @returns {String} image path
     */
    imagePath (place) {
      if (this.placeLayer) {
        let zoom = geoUtils.zoomLevelByLayer(this.placeLayer(place))
        let tileData = geoUtils.getTileData(place.lat, place.lng, zoom)
        let url = `${this.worldImageryTileProviderBaseUrl}/${tileData.z}/${tileData.y}/${tileData.x}`
        return url
      } else {
        return this.imageUrlFallBack
      }
    },
    /**
     * Determines if a place must be considered as active
     * @param {*} place
     * @returns {Boolean}
     */
    isActive (place) {
      if (this.placeActive) {
        return this.placeActive.equals(place)
      } else {
        // If there is no place active yet, return the place
        // at index 0 as active
        return place.findIndex(this.mapViewData.places) === 0
      }
    },
    /**
     * REtrieves the place layer
     * @param {*} place
     */
    placeLayer (place) {
      let layer = place.properties.layer
      if (layer !== this.$t('placesCarousel.notAvailable')) {
        return layer
      }
    },
    /**
     * Handles the place item clicked by
     * setting the place as active and
     * emitting a place selected local event
     * @param {*} place
     */
    itemClicked (place) {
      this.placeActive = place
      let index = place.findIndex(this.mapViewData.places)
      this.$emit('placeSelected', index)
    },
    /**
     * Hanles the click outside event
     * emitting the closed event
     */
    clickOutside () {
      this.$emit('closed')
    },
    /**
     * Scroll to the next block of places
     */
    next () {
      if (this.horizontalListRef._hasNext) {
        this.horizontalListRef.next()
      } else {
        // Go to first
        this.horizontalListRef.go(0)
      }
    },
    /**
     * Scroll to the previous block of places
     */
    previous () {
      if (this.horizontalListRef._hasPrev) {
        this.horizontalListRef.prev()
      } else {
        // Go to last
        this.horizontalListRef.go(this.horizontalListRef._size)
      }
    },
    /**
     * Emmit the directions to latlg
     * @param {*} place
     */
    directionsTo (place) {
      this.$emit('directionsToPoint', {place})
      this.$emit('closed')
    }
  },
  mounted () {
    this.horizontalListRef = this.$refs.horizontalList
    let context = this

    // Set the active index after a second
    setTimeout(() => {
      context.horizontalListRef.go(context.activeIndex)
    }, 1000)
  },
  components: {
    VueHorizontalList
  }
}
