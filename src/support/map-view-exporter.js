import InstructionCodeToSymbol from '@/resources/lists/instruction-code-to-symbol'
import DomToImage from 'dom-to-image'

const MapViewExporter = {
  /**
   * Prepare and print route instructions
   * @param {Object} route 
   * @param {Array} places 
   * @param {HtmlNode} mapView
   * @param {Object} translations 
   */
  printRouteInstructions(route, places, mapView, translations) {
    let htmlData = `<b>${location.hostname}</b>`
    htmlData += `<h2>${places[0].placeName} &rArr; ${places[places.length -1].placeName}</h2>`
    htmlData += `<b>${route.summary.distance} </b> &#38; `
    htmlData += `<b>${route.summary.duration} </b><br/><br/>`

    MapViewExporter.setMapViewControlsVisibility(mapView, false)

    // Build an PNG image from the current map view
    // and then print the instructions
    DomToImage.toPng(mapView).then((dataUrl) => {
      MapViewExporter.setMapViewControlsVisibility(mapView, true)
      let imageHtml = `<img width="auto" height="400" src="${dataUrl}"/>`
      htmlData += imageHtml
      htmlData += MapViewExporter.buildSegmentsPrintingInstructions(route.properties.segments, translations)
      MapViewExporter.printHtml(htmlData)
    })
  },

  /**
   * Print instructions with map view
   * @param {*} htmlData 
   */
  printHtml(htmlData) {
    var contents = htmlData
    var frame1 = document.createElement('iframe')
    frame1.name = "frame1"
    frame1.style.position = "absolute"
    frame1.style.top = "-1000000px"
    document.body.appendChild(frame1)
    var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument
    frameDoc.document.open()
    frameDoc.document.write(`<html><head><title>${document.title}</title>`)
    frameDoc.document.write('</head><body>')
    frameDoc.document.write('<h1>' + document.title + '</h1>')
    frameDoc.document.write(contents)
    frameDoc.document.write('</body></html>')
    frameDoc.document.close()
    setTimeout(function () {
      window.frames["frame1"].focus()
      window.frames["frame1"].print()
      document.body.removeChild(frame1)
    }, 500)
    return false
  },

  /**
   * Build segments printing instructions
   * @param {Array} segments 
   * @param {Object} translations 
   * @returns {String} segmentsHtml
   */
  buildSegmentsPrintingInstructions(segments, translations) {
    let stepCounter = 1
    let segmentsHtml = ''
    for (const key in segments) {
      let segment = segments[key]
      segmentsHtml += `<h3>${translations.segment} ${Number(key) + 1} - `
      if (segments.length > 1) {
        segmentsHtml += `<b>${segment.distance} </b> &#38;`
        segmentsHtml += `<b>${segment.duration} </b></h3>`
      } else {
        segmentsHtml += `</h3>`
      }
      segmentsHtml += `</h3>`

      for (const stepKey in segment.steps) {
        let step = segment.steps[stepKey]
        if (step.distance && step.duration) {
          let symbol = `<span style="font-size:24px">${InstructionCodeToSymbol[step.type]}</span>`
          segmentsHtml += `(${stepCounter}) ${symbol} ${step.instruction}`
          segmentsHtml += `<br/>&nbsp;&nbsp;&origof;`
          segmentsHtml += ` <b>${step.distance} </b> &#38; `
          segmentsHtml += `<b>${step.duration} </b><br/><br/>`
        } else {
          segmentsHtml += `<span style="font-size:24px">&odot;</span> <b>${step.instruction}</b><br/><br/>`
        }
        stepCounter++
      }
    }
    return segmentsHtml
  },
  /**
   * Set map view controls visibility
   * @param {HtmlNode} mapView 
   * @param {Boolean} visible 
   */
  setMapViewControlsVisibility(mapView, visible) {
    let buttonsOverMap = mapView.getElementsByClassName('v-btn')
    for (var i = 0; i < buttonsOverMap.length; i++) {
      buttonsOverMap[i].style.display = visible ? 'block' : 'none'
    }
    let leafletControls = mapView.getElementsByClassName('leaflet-control')
    for (var i = 0; i < leafletControls.length; i++) {
      leafletControls[i].style.display = visible ? 'block' : 'none'
    }
    let leafletPopups = mapView.getElementsByClassName('leaflet-popup')
    for (var i = 0; i < leafletPopups.length; i++) {
      leafletPopups[i].style.display = visible ? 'block' : 'none'
    }
  }
}
export default MapViewExporter
