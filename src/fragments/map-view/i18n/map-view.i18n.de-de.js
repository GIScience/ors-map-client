export default {
  mapView: {
    routeTo: 'Route hierher',
    polygonDetails: 'Polygon-Details',
    polygon: 'Polygon',
    whatIsHere: 'Was ist hier?',
    directionsFromHere: 'Route von hier',
    fitAllFeatures: 'Alles anzeigen',
    addRouteStop: 'Wegpunkt hinzufügen',
    addDestinationToRoute: 'Als neues Ziel hinzufügen',
    acquirePositionErrors: {
      generic: 'Es war nicht möglich, Ihren Standort zu ermitteln, da der Zugriff nicht erlaubt war oder vom Gerät nicht unterstützt wird.',
      unavailable: 'Ihr Standort ist derzeit nicht verfügbar. Stellen Sie sicher, dass die Ortungsoption ordnungsgemäß konfiguriert ist.',
      permissionDenied: 'Ihre Position konnte nicht erfasst werden, da der Browser / das Gerät den Zugriff darauf verweigert hat. Sie können es erneut versuchen, indem Sie die Browser- / Geräteeinstellungen ändern und dann erneut auf den "Mein Standort" Button klicken',
      timeout: 'Ihr Gerät hat beim Versuch, Ihre Position zu ermitteln, eine Zeitüberschreitung zurückgegeben. Sie können es erneut versuchen, indem Sie auf den "Mein Standort" Button klicken'
    },
    yourCurrentLocation: 'Ihr aktueller Standort',
    options: 'Optionen',
    polylineMeasure: {
      bearingTextIn: 'Ein',
      bearingTextOut: 'Aus',
      tooltipTextDragAndDelete: 'Ziehen zum <b>bewegen</b><br>SHIFT-Klick zum <b>Löschen</b>',
      tooltipTextResume: '<br>CTRL-Klick um Linie <b>weiter zu zeichnen</b>',
      tooltipTextDelete: 'Drücken Sie die SHIFT und klicken Sie auf <b> Punkt löschen </ b>',
      tooltipTextAdd: 'CTRL-Klick um <b>Punkt hinzuzufügen</b>',
      clearControlTitle: 'Messung zurücksetzen',
      measureControlTitleOn: 'Entfernungsmessung einschalten',
      measureControlTitleOff: 'Entfernungsmessung einschalten',
      unitControlTitle: {
        text: 'Einheiten ändern',
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
    defineAvoidPolygon: 'Vermeiden Sie Polygone bei der Routen- oder Isochronenberechnung',
    defineAvoidRectangle: 'Vermeiden Sie Rechtecke bei der Routen- oder Isochronenberechnung',
    youCantIntersectPolygons: 'Polygone dürfen sich nicht überschneiden',
    polygonArea: 'Polygonfläche',
    highlighting: 'Hervorhebung',
    accuracy: 'Genauigkeit',
    youCanCenterAtYourLocationLater: 'Sie können die Karte jederzeit auf Ihren aktuellen Standort zentrieren, indem Sie auf die Schaltfläche "Mein Standort" klicken',
    yourLocation: 'Meinen Standort nutzen',
    setMyLocationAsMapCenter: 'Möchten Sie die Karte an Ihrem aktuellen Standort zentrieren? Dies verbessert die Genauigkeit der Ortssuche. Wenn Sie dazu aufgefordert werden, müssen Sie dies zulassen.',
    removePlace: 'Ort löschen',
    viewOnORS: 'In ORS anzeigen',
    moveMapPositionToLeft: 'Karte nach links bewegen',
    moveMapPositionToRight: 'Karte nach rechts bewegen',
    moveMapPositionToUp: 'Karte nach oben bewegen',
    moveMapPositionToDown: 'Karte nach unten bewegen',
    toggleDirect: 'Luftlinie zum nächsten Punkt an/aus',
    heightGraph: {
      distance: 'Entfernung',
      elevation: 'Höhe',
      segment_length: 'Länge des Abschnitts',
      type: 'Typ',
      legend: 'Legende'
    },
    editShape: 'Fläche bearbeiten',
    remove: 'Entfernen',
    avoidPolygonSaved: 'Zu vermeidendes Polygon gespeichert',
    avoidPolygonRemoved: 'Zu vermeidendes Polygon entfernt',
    avoidPolygonNotRemoved: 'Es war nicht möglich, das zu vermeidende Polygon zu entfernen',
    avoidPolygonNotSaved: 'Es war nicht möglich, das zu vermeidende Polygon zu speichern',
    polygonEditModeEnabled: 'Wenn Sie die Bearbeitung abgeschlossen haben, klicken Sie auf eine beliebige Stelle, um die Änderungen zu speichern',
    customTileProvider: 'Vom Benutzer definierter Kachelanbieter',
    gestureHandling: {
      touch: 'Verwenden Sie zwei Finger, um die Karte zu bewegen.',
      scroll: 'Verwenden Sie Strg + Scrollen zum Zoomen der Karte',
      scrollMac: 'Verwenden Sie \u2318 + Scrollen, um die Karte zu zoomen'
    }
  }
}
