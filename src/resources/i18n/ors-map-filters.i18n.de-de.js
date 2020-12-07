
export default {
  orsMapFilters: {
    profiles: {
      'cycling-regular': 'Fahrrad',
      'cycling-road': 'Rennrad',
      'cycling-electric': 'E-bike',
      'cycling-mountain': 'Mountainbike',
      'cycling-safe': 'Cycling safe',
      'foot-walking': 'Zu Fuß',
      'foot-hiking': 'Wandern',
      'driving-car': 'Auto',
      'driving-hgv': 'LKW',
      'wheelchair': 'Rollstuhl',

      'hgv': 'LKW',
      'bus': 'Bus',
      'agricultural': 'Forstwirtschaftliches Fahrzeug',
      'delivery': 'Lieferwagen',
      'forestry': 'Forstwirtschaftlicher Lkw',
      'goods': 'Güter-Lkwk'
    },
    filters: {
      preference: {
        label: 'Routen Präferenz',
        description: 'Bevorzugte Gewichtung bei der Wegsuche.',
        enum: {
          'fastest': 'Schnellste',
          'shortest': 'Kürzeste',
          'recommended': 'Empfohlen'
        }
      },
      range_type: {
        label: 'Isochronen Typ',
        description: 'Art der generierten Isochrone',
        enum: {
          'time': 'Zeit',
          'distance': 'Entfernung'
        }
      },
      range: {
        label: 'Reichweite',
        description: 'Die maximale Reichweite der Isochrone'
      },
      interval: {
        label: 'Intervall',
        description: 'Intervall in dem Isochronen erzeugt werden sollen'
      },
      options: {
        label: 'Routen Einstellungen'
      },
      profile_params: {
        label: 'Profil Eigenschaften'
      },
      restrictions: {
        label: 'Einschränkungen'
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
        description: 'Minimalwert der Oberflächenbeschaffenheit. Für nähere Infos: https://wiki.openstreetmap.org/wiki/DE:Key:smoothness'
      },
      surface_type: {
        label: 'Min. Oberflächentyp',
        description: 'Minimaler Oberflächentyp. Reihenfolge von Oberflächentypen: https://wiki.openstreetmap.org/wiki/DE:Key:surface'
      },
      track_type: {
        label: 'Min. Wegzustand',
        description: 'Minimaler Zustand des Weges. Informationen über Wegzustand: https://wiki.openstreetmap.org/wiki/DE:Key:tracktype'
      },
      round_trip: {
        label: 'Rundweg'
      },
      length: {
        label: 'Länge des Rundweges',
        description: 'Die Längenvorgabe für den Rundweg (Dies ist ein Richtwert. Die resultierende Länge kann abweichen.).'
      },
      points: {
        label: 'Punkte',
        description: 'Anzahl der erzeugten Wegpunkte. Mit Höhere Werte werden Routen kreisförmiger.'
      },
      seed: {
        label: 'Zufallsindex',
        description: 'Ein Zufallsindex welcher die Ausrichtung des Rundweges beeinflusst. Ganze Zahl > 0.'
      },
      avoid_polygons: {
        label: 'Vermeide Polygone',
        description: 'Route oder Isochrone wird den definierten Bereich vermeiden.'
      },
      avoid_features: {
        label: 'Vermeide Features',
        description: 'Route oder Isochrone wird das definierte Feature vermeiden',
        enum: {
          'highways': 'Autobahn',
          'tollways': 'Mautstraßen',
          'ferries': 'Fähren',
          'tunnels': 'Tunnel',
          'fords': 'Furten',
          'steps': 'Stufen',
          'pavedroads': 'Gepflasterte Straßen',
          'unpavedroads': 'Ungepflasterte Straßen'
        }
      },
      avoid_borders: {
        label: 'Grenzen Vermeiden',
        description: 'Vermeide alle oder kontrollierte Grenzen',
        enum: {
          'all': 'Alle',
          'controlled': 'Kontrollierte'
        }
      },
      avoid_countries: {
        label: 'Länder Vermeiden',
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
      }
    }
  }
}
