
export default {
  citySelector: {
    country: 'Country',
    state: 'State',
    city: 'City',
    places: {
      countries: {
        germany: 'Germany',
        austria: 'Austria'
      },
      states: {
        'baden-wuerttemberg': 'Baden-Württemberg',
        bayern: 'Bavaria',
        berlin: 'Berlin',
        bremen: 'Bremen',
        brandenburg: 'Brandenburg',
        hamburg: 'Hamburg',
        hessen: 'Hesse',
        'mecklenburg-vorpommern': 'Mecklenburg-Vorpommern',
        niedersachsen: 'Lower Saxony',
        'nordrhein-westfalen': 'North Rhine-Westphalia',
        'rheinland-pfalz': 'Rhineland-Palatinate',
        saarland: 'Saarland',
        sachsen: 'Saxony',
        'sachsen-anhalt': 'Saxony-Anhalt',
        'schleswig-holstein': 'Schleswig-Holstein',
        thueringen: 'Thuringia',
        wien: 'Vienna',
        oberoesterreich: 'Upper Austria',
        salzburg: 'Salzburg',
        steiermark: 'Styria',
        tirol: 'Tyrol'
      },
      // Only cities whose anglicized name differs from the slug-derived
      // fallback (prepareString) need an entry here.
      cities: {
        muenchen: 'Munich',
        koeln: 'Cologne',
        nuernberg: 'Nuremberg',
        hannover: 'Hanover',
        wien: 'Vienna'
      }
    }
  }
}
