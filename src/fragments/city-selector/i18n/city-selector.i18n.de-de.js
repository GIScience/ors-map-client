
export default {
  citySelector: {
    country: 'Land',
    state: 'Bundesland',
    city: 'Stadt',
    places: {
      countries: {
        germany: 'Deutschland',
        austria: 'Österreich'
      },
      states: {
        'baden-wuerttemberg': 'Baden-Württemberg',
        bayern: 'Bayern',
        berlin: 'Berlin',
        bremen: 'Bremen',
        brandenburg: 'Brandenburg',
        hamburg: 'Hamburg',
        hessen: 'Hessen',
        'mecklenburg-vorpommern': 'Mecklenburg-Vorpommern',
        niedersachsen: 'Niedersachsen',
        'nordrhein-westfalen': 'Nordrhein-Westfalen',
        'rheinland-pfalz': 'Rheinland-Pfalz',
        saarland: 'Saarland',
        sachsen: 'Sachsen',
        'sachsen-anhalt': 'Sachsen-Anhalt',
        'schleswig-holstein': 'Schleswig-Holstein',
        thueringen: 'Thüringen',
        wien: 'Wien',
        oberoesterreich: 'Oberösterreich',
        salzburg: 'Salzburg',
        steiermark: 'Steiermark',
        tirol: 'Tirol'
      },
      // Only cities whose German name differs from the slug-derived
      // fallback (prepareString) need an entry here.
      cities: {
        muenchen: 'München',
        koeln: 'Köln',
        nuernberg: 'Nürnberg',
        hannover: 'Hannover',
        wien: 'Wien'
      }
    }
  }
}
