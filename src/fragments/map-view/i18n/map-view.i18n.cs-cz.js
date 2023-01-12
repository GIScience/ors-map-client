export default {
  mapView: {
    routeTo: 'Trasa na toto místo',
    polygonDetails: 'Podrobnosti o polygonu',
    polygon: 'Polygon',
    whatIsHere: 'Co je tady?',
    directionsFromHere: 'Instrukce odtud',
    fitAllFeatures: 'Zobrazit všechny funkce',
    addRouteStop: 'Zde přidejte zastávku na trase',
    addDestinationToRoute: 'Přidat cíl do trasy',
    acquirePositionErrors: {
      generic: 'Vaši polohu nebylo možné získat, protože nebyla autorizována nebo ji zařízení nepodporuje.',
      unavailable: 'Podle vašeho zařízení není vaše poloha momentálně dostupná. Zkontrolujte, zda je správně nakonfigurována možnost/služba určování polohy.',
      permissionDenied: 'Vaši pozici nebylo možné získat, protože k ní zařízení odepřelo přístup. Můžete to zkusit znovu tak, že změníte nastavení zařízení a znovu kliknete na tlačítko "moje poloha".',
      timeout: 'Vaše zařízení při pokusu o získání polohy vrátilo "timeout". Můžete to zkusit znovu kliknutím na tlačítko "moje pozice".'
    },
    yourCurrentLocation: 'Vaše aktuální poloha',
    options: 'Možnosti',
    polylineMeasure: {
      bearingTextIn: 'Do',
      bearingTextOut: 'Z',
      tooltipTextDragAndDelete: 'Kliknutím a přetažením <b>bod přesunete</b><br>Stiskněte klávesu SHIFT a kliknutím <b>bod smažte</b>',
      tooltipTextResume: '<br>Stiskněte klávesu CTRL a kliknutím <b>obnovte řádek</b>',
      tooltipTextDelete: 'Stiskněte klávesu SHIFT a kliknutím <b>bod smažte</b>',
      tooltipTextAdd: 'Stiskněte klávesu CTRL a kliknutím <b>přidejte bod</b>',
      clearControlTitle: 'Vymazat měření',
      measureControlTitleOn: 'Zapnout měření vzdálenosti',
      measureControlTitleOff: 'Vypnout měření vzdálenosti',
      unitControlTitle: {
        text: 'Změnit jednotky',
        metres: 'metry',
        landmiles: 'míle',
        nauticalmiles: 'námořní míle'
      },
      clearControlLabel: '&krát',
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
    defineAvoidPolygon: 'Definice polygonů, kterým se lze vyhnout při výpočtu trasy',
    defineAvoidRectangle: 'Definice obdélníků, kterým se lze vyhnout při výpočtu trasy',
    youCantIntersectPolygons: 'Nelze protínat polygony',
    polygonArea: 'plocha Polygonu',
    highlighting: 'Zvýraznění',
    accuracy: 'Přesnost',
    youCanCenterAtYourLocationLater: 'Kliknutím na tlačítko "moje poloha" můžete kdykoli vycentrovat mapu na svou aktuální polohu.',
    yourLocation: 'Použijte svou polohu',
    setMyLocationAsMapCenter: 'Chcete mapu vycentrovat na aktuální polohu? Zlepšíte tím přesnost vyhledávání místa. Pokud budete vyzváni, budete to muset autorizovat.',
    removePlace: 'Odebrat místo',
    viewOnORS: 'Zobrazit na ORS',
    moveMapPositionToLeft: 'Posunout střed mapy doleva',
    moveMapPositionToRight: 'Posunout střed mapy doprava',
    moveMapPositionToUp: 'Posunout střed mapy nahoru',
    moveMapPositionToDown: 'Posunout střed mapy dolu',
    toggleDirect: 'Přepnout přímo odtud až na další místo',
    heightGraph: {
      distance: 'Vzdálenost',
      elevation: 'Nadmořská výška',
      segment_length: 'Délka úseku',
      type: 'Typ',
      legend: 'Legenda'
    },
    editShape: 'Upravit tvar',
    remove: 'Odstranit',
    avoidPolygonSaved: 'Vyhnout se uloženému polygonu',
    avoidPolygonRemoved: 'Vyhnout se odstraněnému polygonu',
    avoidPolygonNotRemoved: 'Nebylo možné odstranit polygon, kterému se lze vyhnout.',
    avoidPolygonNotSaved: 'Nebylo možné uložit polygon, kterému se lze vyhnout.',
    polygonEditModeEnabled: 'Po dokončení úprav klikněte kamkoli, abyste změny uložili.',
    customTileProvider: 'Vlastní poskytovatel dlaždic definovaný uživatelem',
    gestureHandling: {
      touch: 'Posunujte mapu pomocí dvou prstů',
      scroll: 'Pro přiblížení mapy použijte ctrl + rolování',
      scrollMac: 'Pro přiblížení mapy použijte \u2318 + rolování'
    }
  }
}
