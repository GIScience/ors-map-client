export default {
  orsMapFilters: {
    profiles: {
      'cycling-regular': 'Fahrrad',
      'cycling-road': 'Rennrad',
      'cycling-electric': 'E-Bike',
      'cycling-mountain': 'Mountainbike',
      'cycling-safe': 'Cycling safe',
      'foot-walking': 'Zu Fuß',
      'foot-hiking': 'Wandern',
      'driving-car': 'Auto',
      'driving-hgv': 'LKW',
      'wheelchair': 'Rollstuhl',

      'hgv': 'LKW',
      'bus': 'Bus',
      'agricultural': 'Landwirtschaftliches Fahrzeug',
      'delivery': 'Lieferwagen',
      'forestry': 'Forstwirtschaftlicher Lkw',
      'goods': 'Gütertransport'
    },
    filters: {
      preference: {
        label: 'Routenpräferenz',
        description: 'Bevorzugte Gewichtung bei der Wegsuche.',
        enum: {
          'fastest': 'Schnellste',
          'shortest': 'Kürzeste',
          'recommended': 'Empfohlen'
        }
      },
      range_type: {
        label: 'Isochronen-Typ',
        description: 'Art der generierten Isochrone',
        enum: {
          'time': 'Zeit',
          'distance': 'Entfernung'
        }
      },
      time_range: {
        label: 'Reichweite',
        description: 'Maximale Reichweite der Isochrone'
      },
      distance_range: {
        label: 'Reichweite',
        description: 'Maximale Reichweite der Isochrone'
      },
      time_interval: {
        label: 'Intervall',
        description: 'Intervall der zu berechnenden Isochronen'
      },
      distance_interval: {
        label: 'Intervall',
        description: 'Intervall der zu berechnenden Isochronen'
      },
      options: {
        label: 'Einstellungen'
      },
      profile_params: {
        label: 'Profil-Parameter'
      },
      restrictions: {
        label: 'Einschränkungen'
      },
      axleload: {
        label: 'Achslast',
        description: 'Die maximale Achslast in Tonnen'
      },
      height: {
        label: 'Höhe',
        description: 'Die maximale Höhe in Metern. Die Grenzen der Werte werden vom Server nicht überprüft. Sie existieren in der App um zu verhindern, dass unangemessene Werte gesetzt werden. Zu hohe Werte können zu unrealistischen Routen führen, wenn in OpenStreetMap keine Grenzwerte vorhanden sind.'
      },
      length: {
        label: 'Länge',
        description: 'Die maximale Länge in Metern. Die Grenzen der Werte werden vom Server nicht überprüft. Sie existieren in der App um zu verhindern, dass unangemessene Werte gesetzt werden. Zu hohe Werte können zu unrealistischen Routen führen, wenn in OpenStreetMap keine Grenzwerte vorhanden sind.'
      },
      weight: {
        label: 'Gewicht',
        description: 'Das maximale Gewicht in Tonnen'
      },
      width: {
        label: 'Breite',
        description: 'Die maximale Breite in Metern. Die Grenzen der Werte werden vom Server nicht überprüft. Sie existieren in der App um zu verhindern, dass unangemessene Werte gesetzt werden. Zu hohe Werte können zu unrealistischen Routen führen, wenn in OpenStreetMap keine Grenzwerte vorhanden sind.'
      },
      hazmat: {
        label: 'Gefahrgut',
        description: 'Transport gefährlicher Güter'
      },
      maximum_incline: {
        label: 'Maximale Steigung',
        description: 'Die maximale Steigung/Gefälle des Weges in Prozent'
      },
      maximum_sloped_kerb: {
        label: 'Maximale Bordstein Höhe',
        description: 'Maximale Höhe des Bordsteins in Metern'
      },
      minimum_width: {
        label: 'Minimale Wegbreite',
        description: 'Minimale Breite des Weges in Metern'
      },
      smoothness_type: {
        label: 'Oberflächenbeschaffenheit',
        description: 'Schlechteste nutzbare Oberflächenbeschaffenheit. Für nähere Infos: https://wiki.openstreetmap.org/wiki/DE:Key:smoothness'
      },
      surface_type: {
        label: 'Min. Oberflächentyp',
        description: 'Schlechtester nutzbarer Oberflächentyp. Reihenfolge von Oberflächentypen: https://wiki.openstreetmap.org/wiki/DE:Key:surface'
      },
      track_type: {
        label: 'Min. Wegzustand',
        description: 'Schlechtester nutzbarer Zustand des Weges. Informationen über Wegzustand: https://wiki.openstreetmap.org/wiki/DE:Key:tracktype'
      },
      round_trip: {
        label: 'Rundweg'
      },
      round_trip_length: {
        label: 'Länge des Rundweges',
        description: 'Längenvorgabe für den Rundweg (Dies ist ein Richtwert. Die resultierende Länge kann abweichen.).'
      },
      points: {
        label: 'Punkte',
        description: 'Anzahl der erzeugten Wegpunkte. Mit höherer Anzahl wird die Route kreisförmiger.'
      },
      seed: {
        label: 'Zufallsindex',
        description: 'Zufallswert, welcher die Ausrichtung des Rundweges beeinflusst. Ganze Zahl > 0.'
      },
      avoid_polygons: {
        label: 'Polygone vermeiden',
        description: 'Route oder Isochrone wird den definierten Bereich vermeiden.'
      },
      avoid_features: {
        label: 'Features vermeiden',
        description: 'Route oder Isochrone wird das definierte Feature vermeiden',
        enum: {
          'highways': 'Autobahnen',
          'tollways': 'Mautstraßen',
          'ferries': 'Fähren',
          'hills': 'Hügel',
          'tunnels': 'Tunnel',
          'fords': 'Furten',
          'steps': 'Stufen',
          'pavedroads': 'Gepflasterte Straßen',
          'unpavedroads': 'Ungepflasterte Straßen'
        }
      },
      avoid_borders: {
        label: 'Grenzen vermeiden',
        description: 'Vermeide alle oder nur kontrollierte Grenzen',
        enum: {
          'all': 'Alle',
          'controlled': 'Nur kontrollierte'
        }
      },
      avoid_countries: {
        label: 'Länder vermeiden',
        description: 'Vermeide ein oder mehrere Länder'
      },
      alternative_routes: {
        label: 'Alternative Routen'
      },
      target_count: {
        label: 'Anzahl der Routen',
        description: 'Anzahl der zu berechnenden Routen. Wenn möglich wird diese Anzahl an Routen, welche die Einschränkungen für den Anteilfaktor und den Gewichtungsfaktor erfüllen, zurückgegeben.'
      },
      share_factor: {
        label: 'Anteilfaktor',
        description: 'Maximaler Anteil den eine alternative Route mit der optimalen Route teilen kann. Der Standardwert von 0,6 bedeutet, dass die Alternativroute bis zu 60% des Weges mit der optimalen Route gemeinsam nutzen darf.'
      },
      weight_factor: {
        label: 'Gewichtungsfaktor',
        description: 'Faktor um den die Alternativroute länger sein darf. Der Standardwert von 1,4 bedeutet, dass Alternativen maximal 1,4-mal so lang wie die optimale Route sein darf.'
      },
      maximum_speed: {
        label: 'Maximale Geschwindigkeit',
        description: 'Maximal mögliche Geschwindigkeit des Fahrzeugs',
      },
      weightings: {
        label: 'Zusätzliche Einstellungen'
      },
      green: {
        label: 'Grün (nur Deutschland)',
        description: 'Grünflächen bevorzugen (nur für Deutschland verfügbar)',
      },
      quiet: {
        label: 'Ruhig',
        description: 'Ruhige Gebiete bevorzugen (nur für Deutschland verfügbar)',
      },
      surface_quality_known: {
        label: 'Nur Oberflächen mit bekannter Qualität',
        description: 'Bevorzugte Verwendung von Kanten, deren Oberflächenqualität explizit bekannt ist',
      },
      allow_unsuitable: {
        label: 'Ungeeignete Kanten zulassen',
        description: 'Ermöglicht die Verwendung von Kanten, die für Rollstuhlfahrer möglicherweise ungeeignet sind und früher ausgeschlossen waren'
      },
      vehicle_type: {
        label: 'Fahrzeugtyp',
        description: 'Für die Routenberechnung zu berücksichtigender Fahrzeugtyp',
      }
    }
  }
}
