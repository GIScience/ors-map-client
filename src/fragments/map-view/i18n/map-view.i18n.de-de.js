export default {
  mapView: {
    routeTo: 'Route hierher',
    polygonDetails: 'Polygon details',
    polygon: 'Polygon',
    whatIsHere: 'Was ist hier?',
    directionsFromHere: 'Route von hier',
    fitAllFeatures: 'Alles anzeigen',
    addRouteStop: 'Wegpunkt hinzufügen',
    addDestinationToRoute: 'Als Ziel hinzufügen',
    acquirePositionErrors: {
      generic: 'Es war nicht möglich, Ihren Standort zu ermitteln, da der Zugriff nicht autorisiert war oder vom Browser / Gerät nicht unterstützt wird.',
      unavailable: 'Ihr Standort ist derzeit nicht verfügbar. Stellen Sie sicher, dass die Positionierung-Option/-Dienst ordnungsgemäß konfiguriert ist.',
      permissionDenied: 'Ihre Position konnte nicht erfasst werden, da der Browser / das Gerät den Zugriff darauf verweigert hat. Sie können es erneut versuchen, indem Sie die Browser- / Geräteeinstellungen ändern und dann erneut auf den "Mein Standort" Button klicken',
      timeout: 'Ihr Browser/Gerät hat beim Versuch, ihre Position zu finden, "Timeout" zurückgegeben. Sie können es erneut versuchen, indem Sie auf den "Mein Standort" Button klicken'
    },
    yourCurrentLocation: 'Mein Standort',
    options: 'Optionen',
    polylineMeasure: {
      bearingTextIn: 'Ein',
      bearingTextOut: 'Aus',
      tooltipTextDragAndDelete: 'Ziehen zum <b>bewegen</b><br>SHIFT-Klick zum <b>Löschen</b>',
      tooltipTextResume: '<br>CTRL-Klick um Linie <b>weiter zu zeichnen</b>',
      tooltipTextDelete: 'Drücken Sie SHIFT und klicken Sie auf <b> Punkt löschen </ b>',
      tooltipTextAdd: 'CTRL-Klick um <b>Punkt hinzuzufügen</b>',
      clearControlTitle: 'Messung zurücksetzen',
      measureControlTitleOn: 'Entfernung messen AN',
      measureControlTitleOff: 'Entfernung messen AUS',
      unitControlTitle: {
        text: 'Einheit ändern',
        metres: 'Meter',
        landmiles: 'Meilen',
        nauticalmiles: 'Seemeilen'
      },
      clearControlLabel: '&times',
      measureControlLabel: '&#8614;',
      measureControlClasses: [],
      unitControlLabel: {
        metres: 'm',
        kilometres: 'km',
        feet: 'ft',
        landmiles: 'M',
        nauticalmiles: 'NM'
      }
    },
    defineAvoidPolygon: 'Zeichne zu vermeidende Polygone (bei Routen oder Isochronen)',
    defineAvoidRectangle: 'Zeichne zu vermeidende Rechteck (bei Routen oder Isochronen)',
    youCantIntersectPolygons: 'Polygone dürfen sich nicht überschneiden',
    polygonArea: 'Polygon Fläche',
    highlighting: 'Hervorhebung',
    accuracy: 'Genauigkeit',
    youCanCenterAtYourLocationLater: 'Sie können die Karte jederzeit auf Ihren aktuellen Standort zentrieren, indem Sie auf die Schaltfläche "Mein Standort" klicken',
    yourLocation: 'Meinen Standort nutzen',
    setMyLocationAsMapCenter: 'Möchten Sie die Karte an Ihrem aktuellen Standort zentrieren? Dies verbessert die Genauigkeit der Ortssuche. Sie müssen es autorisieren, wenn Sie dazu aufgefordert werden.',
    removePlace: 'Ort löschen',
    viewOnORS: 'In ORS anzeigen',
    moveMapPositionToLeft: 'Karte nach Links bewegen',
    moveMapPositionToRight: 'Karte nach Rechts bewegen',
    moveMapPositionToUp: 'harte nach oben bewegen',
    moveMapPositionToDown: 'karte nach unten bewegen',
    toggleDirect: 'Direkter Weg (Luftlinie) zu nächstem Punkt an/aus',
    heightGraph: {
      distance: 'Entfernung',
      elevation: 'Höhe',
      segment_length: 'Abschnittslänge',
      type: 'Typ',
      legend: 'Legende'
    },
    editShape: 'Fläche bearbeiten',
    remove: 'Entfernen',
    avoidPolygonSaved: 'Polygon vermeiden gespeichert',
    avoidPolygonRemoved: 'Polygon vermeiden entfernt',
    avoidPolygonNotRemoved: 'Es war nicht möglich, das Ausweichpolygon zu entfernen',
    avoidPolygonNotSaved: 'Es war nicht möglich, das Vermeidungspolygon zu speichern',
    polygonEditModeEnabled: 'Wenn Sie die Bearbeitung abgeschlossen haben, klicken Sie auf eine beliebige Stelle, um die Änderungen zu speichern',
    customTileProvider: 'Vom Benutzer definierter Kachelanbieter',
    gestureHandling: {      
      touch: 'Verschieben der Karte mit zwei Fingern',
      scroll: 'Verwende Strg + Scrollen zum Zoomen der Karte',
      scrollMac: 'Verwenden Sie \u2318 + Scrollen, um die Karte zu zoomen'      
    }
  }
}
