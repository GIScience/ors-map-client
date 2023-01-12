export default {
  orsMapFilters: {
    'profiles': {
      'cycling-regular': 'Bici',
      'cycling-road': 'Bici da corsa',
      'cycling-electric': 'E-bike',
      'cycling-mountain': 'Mountainbike',
      'cycling-safe': 'Sicuro per pedalare',
      'foot-walking': 'Camminata a piedi',
      'foot-hiking': 'Escursione a piedi',
      'driving-car': 'Auto',
      'driving-hgv': 'Veicolo pesante',
      'wheelchair': 'Sedia a rotelle',
      'hgv': 'Veicolo pesante',
      'bus': 'Autobus',
      'agricultural': 'Veicolo agricolo',
      'delivery': 'Veicolo da consegne',
      'forestry': 'Autocarro agricolo',
      'goods': 'Autocarro da beni'
    },
    'filters': {
      'preference': {
        'label': 'Preferenza itinerario',
        'description': 'Fattore preferito da considerare quando viene calcolato l\'itinerario',
        'enum': {
          'fastest': 'Il più veloce',
          'shortest': 'Il più breve',
          'recommended': 'Raccomandato'
        }
      },
      'range_type': {
        'label': 'Metodo isocrona',
        'description': 'Metodo usato per calcolare l\'isocrona',
        'enum': {
          'time': 'Tempo',
          'distance': 'Distanza'
        }
      },
      'time_range': {
        'label': 'Raggio d\'azione',
        'description': 'Massimo raggio d\'azione delle isocrone'
      },
      'distance_range': {
        'label': 'Raggio d\'azione',
        'description': 'Massimo raggio d\'azione delle isocrone'
      },
      'time_interval': {
        'label': 'Intervallo',
        'description': 'Intervallo in cui le isocrone devono essere calcolate'
      },
      'distance_interval': {
        'label': 'Intervallo',
        'description': 'Intervallo in cui le isocrone devono essere calcolate'
      },
      'options': {
        'label': 'Opzioni'
      },
      'profile_params': {
        'label': 'Proprietà del profilo'
      },
      'restrictions': {
        'label': 'Restrizioni'
      },
      'axleload': {
        'label': 'Carico sull\'asse',
        'description': 'Il carico massimo per asse in tonnellate'
      },
      'height': {
        'label': 'Altezza',
        'description': 'L\'altezza massima in metri. I limiti non sono obbligatori sul server e sono presenti sul client solo per evitare che vengano impostati valori irragionevoli. Valori troppo alti possono portare a percorsi irrealizzabili quando i dati richiesti non sono attualmente presenti nel database di OpenStreetMap'
      },
      'length': {
        'label': 'Lunghezza',
        'description': 'La lunghezza massima in metri. I limiti non sono obbligatori sul server e sono presenti sul client solo per evitare che vengano impostati valori irragionevoli. Valori troppo alti possono portare a percorsi irrealizzabili quando i dati richiesti non sono attualmente presenti nel database di OpenStreetMap.'
      },
      'weight': {
        'label': 'Peso',
        'description': 'Il peso massimo in tonnellate'
      },
      'width': {
        'label': 'Larghezza',
        'description': 'La larghezza massima in metri. I limiti non sono obbligatori sul server e sono presenti sul client solo per evitare che vengano impostati valori irragionevoli. Valori troppo alti possono portare a percorsi irrealizzabili quando i dati richiesti non sono attualmente presenti nel database di OpenStreetMap'
      },
      'hazmat': {
        'label': 'Merci pericolose',
        'description': 'Trasporto di merci pericolose'
      },
      'maximum_incline': {
        'label': 'Inclinazione Massimale',
        'description': 'Inclinazione Massimale in percentuale'
      },
      'maximum_sloped_kerb': {
        'label': 'Altezza massimale del marciapiade',
        'description': 'Specifica l\'altezza massima del marciapiede in metri'
      },
      'minimum_width': {
        'label': 'Larghezza minima del passaggio pedonale',
        'description': 'Specifica la larghezza minima del passaggio pedonale in metri'
      },
      'smoothness_type': {
        'label': 'Percorribilità del percorso',
        'description': 'Specifica la percorribilità minima del percorso. Per maggiori informazioni: https://wiki.openstreetmap.org/wiki/Key:smoothness'
      },
      'surface_type': {
        'label': 'Tipo di superficie minima',
        'description': 'Specifica il tipo minimo di superficie. Lista dei tipi: https://wiki.openstreetmap.org/wiki/Key:surface'
      },
      'track_type': {
        'label': 'Condizione minimale del percorso',
        'description': 'Specifica il grado minimo di condizione del percorso. Valore dei gradi: https://wiki.openstreetmap.org/wiki/Key:tracktype'
      },
      'round_trip': {
        'label': 'Andata e ritorno'
      },
      'round_trip_length': {
        'label': 'Lunghezza del viaggio di andata e ritorno',
        'description': 'Valore predefinito di lunghezza del percorso di andata e ritorno (nota che questo è un valore di preferenza, la lunghezza risultata potrebbe essere diversa).'
      },
      'points': {
        'label': 'Punti',
        'description': 'Il numero di punti da usare su un percorso. Valori alti creano percorsi circolari.'
      },
      'seed': {
        'label': 'Indice casuale',
        'description': 'Indice casuale da usare per aggiungere un grado di casualità al percorso da generare (minimo: 0, massimo: 90)'
      },
      'avoid_polygons': {
        'label': 'Poligoni da evitare',
        'description': 'Il percorso o le isocrone eviteranno il campo specificato'
      },
      'avoid_features': {
        'label': 'Features da evitare',
        'description': 'Il percorso o le isocrone eviteranno la feature specificata',
        'enum': {
          'highways': 'Autostrade',
          'tollways': 'Strade a pedaggio',
          'ferries': 'Traghetti',
          'hills': 'Colline',
          'tunnels': 'Tunnel',
          'fords': 'Guadi',
          'steps': 'Gradini',
          'pavedroads': 'Strada pavimentata',
          'unpavedroads': 'Strada non pavimentata'
        }
      },
      'avoid_borders': {
        'label': 'Evitare confini',
        'description': 'Evita i confini',
        'enum': {
          'all': 'tutti',
          'controlled': 'Controllati'
        }
      },
      'avoid_countries': {
        'label': 'Evitare paesi',
        'description': 'Evita i paesi'
      },
      'alternative_routes': {
        'label': 'Percorsi alternativi'
      },
      'target_count': {
        'label': 'Numero dei percorsi',
        'description': 'Numero dei percorsi alternativi da calcolare. Se possibile viene applicato ai percorsi che adempiono ai limiti dati dal Fattore di condivisione e di lunghezza.'
      },
      'share_factor': {
        'label': 'Fattore di condivisione',
        'description': 'Massimale frazione del percorso che i percorsi alternativi condividono con il percorso ottimale. Il valore predefinito di 0.6 significa che i percorsi alternativi possono condividere fino il 60 % dei segmenti del percorso ottimale.'
      },
      'weight_factor': {
        'label': 'Fattore di lunghezza',
        'description': 'Fattore massimo secondo il quale il percorso diverge dal percorso ottimale. Il valore predefinito di 1.4 significa che i percorsi alternativi possono essere fino a 1.4 volte più lunghi del percorso ottimale.'
      },
      'maximum_speed': {
        'label': 'Velocità massima',
        'description': 'Un limite di velocità massima che deve essere applicato',
      },
      'weightings': {
        'label': 'parametri aggiuntivi'
      },
      'green': {
        'label': 'Verde (solo in Germania)',
        'description': 'Preferisci gli spazi verdi (disponibile solo per la Germania)',
      },
      'quiet': {
        'label': 'Silenzioso (solo Germania)',
        'description': 'Preferisce zone tranquille (disponibile solo per la Germania)',
      },
      'surface_quality_known': {
        'label': 'Solo superfici con qualità nota',
        'description': 'Impone l\'uso dei soli bordi in cui la qualità della superficie è esplicitamente nota',
      },
      'allow_unsuitable': {
        'label': 'Consentire inadeguato',
        'description': 'Consente l\'utilizzo di bordi che potrebbero non essere adatti a sedie a rotelle precedentemente escluse',
      },
      'vehicle_type': {
        'label': 'Tipo di veicolo',
        'description': 'Tipo di veicolo da considerare per il calcolo del percorso',
      }
    }
  }
}
