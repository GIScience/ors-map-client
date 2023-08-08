import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
import DomToImage from 'dom-to-image'
import Vue from 'vue'

// Printing templates
import PrintDirections from './components/directions-template/PrintDirections'
import PrintIsochrones from './components/isochrones-template/PrintIsochrones'
import PrintPlace from './components/place-template/PrintPlace'

export default {
  created() {
    this.localMapViewData = this.mapViewData
  },
  data: () => ({
    localMapViewData: null,
    modePrintingHtml: null
  }),
  props: {
    mapViewData: {
      type: MapViewData
    }
  },
  computed: {
    title() {
      return document.title
    },
    hostname() {
      return location.hostname
    }
  },
  methods: {
    /**
     * Generate and print view
     */
    generateAndPrintView() {
      this.showInfo(this.$t('print.preparingPrinting'), { timeout: 0 })
      // Make sure the sidebar is closed before the
      // map view image is captured
      let leftSideBarOpen = this.$store.getters.leftSideBarOpen
      let sidebarIsPinned = this.$store.getters.leftSideBarPinned

      if (leftSideBarOpen) {
        this.$store.commit('setLeftSideBarIsOpen', !leftSideBarOpen)
      }
      if (sidebarIsPinned) {
        this.$store.commit('setLeftSideBarIsPinned', !sidebarIsPinned)
      }

      // Wait a bit so that the sidebar is closed (if it was open)
      setTimeout(() => {
        // Get current rendered map view from DOM
        let mapView = document.getElementById(constants.mapViewElementId)

        // Hide all over map elements before
        // capturing the map view image
        this.setMapViewControlsVisibility(mapView, false)
        let context = this

        // Generate a PNG image from the current map view
        // and then print the instructions
        DomToImage.toPng(mapView).then((mapImageUrlData) => {
          // Restore the visibility of over map elements
          context.setMapViewControlsVisibility(mapView, true)

          context.setTemplatePrintingHtml(mapImageUrlData)

          // Wait a bit to make sure that the `modePrintingHtml`
          // is rendered in the view, because it will be part of the
          // printed content
          setTimeout(() => {
            context.printView()
            // Restore previous state of the sidebar openness
            context.$store.commit('setLeftSideBarIsOpen', leftSideBarOpen)
            context.$store.commit('setLeftSideBarIsPinned', sidebarIsPinned)
            context.showSuccess(context.$t('print.readyToPrint'))
          }, 500)
        })
      }, 1000)
    },

    /**
     * Set the printing HTML based on the mode template
     * @param {String} mapImageUrlData
     * @returns {String}
     */
    setTemplatePrintingHtml(mapImageUrlData) {
      let PrintTemplateClass

      // Define the printing template based on the `mode`
      switch (this.localMapViewData.mode) {
        case constants.modes.directions:
        case constants.modes.roundTrip:
          PrintTemplateClass = Vue.extend(PrintDirections)
          break
        case constants.modes.place:
          PrintTemplateClass = Vue.extend(PrintPlace)
          break
        case constants.modes.isochrones:
          PrintTemplateClass = Vue.extend(PrintIsochrones)
          break
        default:
          break
      }
      let propsData = {
        mapViewData: this.mapViewData,
        mapViewImage: mapImageUrlData
      }
      let bidingData = {
        propsData,
        i18n: this.$i18n,
        store: this.$store
      }
      const printingTemplate = new PrintTemplateClass(bidingData)
      this.modePrintingHtml = printingTemplate.$mount().$el.innerHTML
    },

    /**
     * Print the view using a hidden iframe
     */
    printView() {
      let htmlData = this.$refs.printableElement.innerHTML
      const frame1 = document.createElement('iframe')
      frame1.name = 'frame1'
      frame1.style.position = 'absolute'
      frame1.style.top = '-1000000px'
      document.body.appendChild(frame1)
      const frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument

      frameDoc.document.open()
      frameDoc.document.write(`<html><head><title>${document.title}</title>`)
      frameDoc.document.write('<style type="text/css">@media print { body {-webkit-print-color-adjust: exact;}}</style>')
      frameDoc.document.write('</head><body>')
      frameDoc.document.write(htmlData)
      frameDoc.document.write('</body></html>')
      frameDoc.document.close()
      setTimeout(function () {
        window.frames['frame1'].focus()
        window.frames['frame1'].print()
        document.body.removeChild(frame1)
      }, 500)
      return false
    },

    /**
     * Set map view controls visibility
     * @param {HtmlNode} mapView
     * @param {Boolean} visible
     */
    setMapViewControlsVisibility(mapView, visible) {
      let buttonsOverMap = mapView.getElementsByClassName('v-btn')
      for (let i = 0; i < buttonsOverMap.length; i++) {
        buttonsOverMap[i].style.display = visible ? 'block' : 'none'
      }
      let leafletControls = mapView.getElementsByClassName('leaflet-control')
      for (let j = 0; j < leafletControls.length; j++) {
        leafletControls[j].style.display = visible ? 'block' : 'none'
      }
      let leafletPopups = mapView.getElementsByClassName('leaflet-popup')
      for (let k = 0; k < leafletPopups.length; k++) {
        leafletPopups[k].style.display = visible ? 'block' : 'none'
      }
    }
  }
}
