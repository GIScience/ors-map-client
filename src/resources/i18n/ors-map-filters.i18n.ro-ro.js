export default {
  orsMapFilters: {
    profiles: {
      bus: 'Autobuz',
      delivery: 'Camion de livrare',
      forestry: 'Camion forestier',
      goods: 'Camion de marfă',
      hgv: 'Vehicule grele',
      agricultural: 'Vehicul agricol',
      'cycling-regular': 'Bicicletă',
      'cycling-road': 'Bicicleta de drum',
      'cycling-mountain': 'Mountain bike',
      'cycling-safe': 'Ciclism în condiții de siguranță',
      'foot-walking': 'Mers pe jos',
      'foot-hiking': 'Drumeție pe jos',
      'driving-car': 'Automobil',
      wheelchair: 'Scaun rulant',
      'cycling-electric': 'Bicicletă electrică',
      'driving-hgv': 'Vehicule grele',
    },
    filters: {
      preference: {
        label: 'Preferința de rută',
        enum: {
          fastest: 'Cel mai rapid',
          shortest: 'Cel mai scurt',
          recommended: 'Recomandat',
        },
        description: 'Factorul preferat care trebuie luat în considerare la calcularea rutelor',
      },
      range_type: {
        label: 'Metoda izocronei',
        description: 'Metoda utilizată pentru calcularea izocronei',
        enum: {
          time: 'Timp',
          distance: 'Distanță',
        },
      },
      time_range: {
        label: 'Gamă',
        description: 'Intervalul maxim al izocronelor care urmează să fie calculate',
      },
      distance_range: {
        label: 'Gamă',
        description: 'Intervalul maxim al izocronelor care urmează să fie calculate',
      },
      time_interval: {
        label: 'Interval',
        description: 'Intervalul dintre izocronele care urmează să fie calculate',
      },
      distance_interval: {
        label: 'Intervalul',
        description: 'Intervalul dintre izocronele care urmează să fie calculate',
      },
      restrictions: {
        label: 'Restricții',
      },
      axleload: {
        label: 'Sarcina pe axă',
        description: 'Sarcina maximă pe axă în tone',
      },
      height: {
        label: 'Înălțime',
        description: 'Înălțimea maximă în metri. Limitele nu sunt impuse de server și sunt doar pentru a se asigura că nu sunt setate valori nerezonabile. Orice valori ciudat de mari ar putea duce la rute inutilizabile atunci când baza de date OpenStreetMap nu este suficient de etichetată pentru acest lucru.',
      },
      length: {
        label: 'Lungime',
        description: 'Lungimea maximă în metri. Limitele nu sunt impuse de server și sunt doar pentru a se asigura că nu sunt setate valori nerezonabile. Orice valori ciudat de mari ar putea duce la rute inutilizabile atunci când baza de date OpenStreetMap nu este suficient de etichetată pentru acest lucru.',
      },
      weight: {
        description: 'Greutatea maximă în tone',
        label: 'Greutate',
      },
      width: {
        label: 'Lățime',
        description: 'Lățimea maximă în metri. Limitele nu sunt impuse de server și sunt doar pentru a se asigura că nu sunt setate valori nerezonabile. Orice valori ciudat de mari ar putea duce la rute inutilizabile atunci când baza de date OpenStreetMap nu este suficient de etichetată pentru acest lucru.',
      },
      hazmat: {
        label: 'Mărfuri periculoase',
        description: 'Transportul de mărfuri periculoase',
      },
      maximum_incline: {
        label: 'Înclinare maximă',
        description: 'Înclinarea maximă în procente',
      },
      maximum_sloped_kerb: {
        label: 'Înălțimea maximă a bordurii',
        description: 'Specifică înălțimea maximă a bordurii înclinate în metri',
      },
      minimum_width: {
        label: 'Lățimea minimă a trotuarului',
        description: 'Precizează lățimea minimă a trotuarului în metri',
      },
      smoothness_type: {
        label: 'Fluiditatea traseului',
        description: 'Specifică netezimea minimă a traseului. Informații suplimentare: https://wiki.openstreetmap.org/wiki/Key:smoothness',
      },
      surface_type: {
        label: 'Tipul de suprafață minimă',
        description: 'Specifică tipul de suprafață minimă. Ordinea tipului: https://wiki.openstreetmap.org/wiki/Key:surface',
      },
      track_type: {
        label: 'Gradul minim al traseului',
        description: 'Specifică nivelul minim al traseului. Valori ale gradului: https://wiki.openstreetmap.org/wiki/Key:tracktype',
      },
      round_trip: {
        label: 'Călătorie dus-întors',
      },
      round_trip_length: {
        label: 'Lungimea călătoriei dus-întors',
        description: 'Lungimea țintă a traseului (rețineți că aceasta este o valoare preferată, dar rezultatele pot fi diferite).',
      },
      points: {
        label: 'Puncte',
        description: 'Numărul de puncte care trebuie utilizate pe traseu. Valorile mai mari creează trasee mai circulare.',
      },
      seed: {
        label: 'Sămânță aleatorie',
        description: 'O sămânță aleatorie care să fie utilizată pentru a adăuga aleatorism la ruta generată (min:0, max: 90)',
      },
      avoid_polygons: {
        label: 'Evitați poligoanele',
        description: 'Evitați poligoanele',
      },
      avoid_features: {
        label: 'Evitați funcțiile',
        enum: {
          highways: 'Autostrăzi',
          tollways: 'Autostrăzi cu taxă',
          ferries: 'Feriboturi',
          hills: 'Dealuri',
          tunnels: 'Tuneluri',
          fords: 'Forduri',
          steps: 'Pași',
          pavedroads: 'Drumuri asfaltate',
          unpavedroads: 'Drumuri neasfaltate',
        },
        description: 'Evitați funcțiile',
      },
      avoid_borders: {
        label: 'Evitați frontierele',
        description: 'Evitați frontierele',
        enum: {
          all: 'Toate',
          controlled: 'Controlat',
        },
      },
      avoid_countries: {
        description: 'Evitați țările',
        label: 'Evitați țările',
      },
      alternative_routes: {
        label: 'Rute alternative',
      },
      target_count: {
        label: 'Numărul de rute',
        description: 'Numărul țintă de rute alternative de calculat. Serviciul returnează până la acest număr de rute care îndeplinesc constrângerile legate de factorul de pondere și de factorul de greutate.',
      },
      share_factor: {
        label: 'Coeficientul de repartiție',
        description: 'Fracțiunea maximă a traseului pe care alternativele o pot împărți cu traseul optim. Valoarea implicită de 0,6 înseamnă că alternativele pot împărți până la 60% din segmentele de traseu cu traseul optim.',
      },
      weight_factor: {
        label: 'Coeficientul de greutate',
        description: 'Factorul maxim cu care greutatea traseului se poate abate de la traseul optim. Valoarea implicită de 1,4 înseamnă că alternativele pot fi de până la 1,4 ori mai lungi (costisitoare) decât traseul optim.',
      },
      maximum_speed: {
        label: 'Viteză maximă',
        description: 'Viteza maximă care trebuie aplicată',
      },
      weightings: {
        label: 'Setări suplimentare',
      },
      green: {
        label: 'Verde (numai în Germania)',
        description: 'Preferă zonele verzi (disponibil numai pentru Germania)',
      },
      quiet: {
        label: 'Silențios (numai în Germania)',
        description: 'Preferă zonele liniștite (disponibil doar pentru Germania)',
      },
      surface_quality_known: {
        label: 'Numai suprafețe cu o calitate cunoscută',
        description: 'Forțează utilizarea numai a marginilor în cazul în care calitatea suprafeței este cunoscută în mod explicit',
      },
      allow_unsuitable: {
        label: 'Permiteți necorespunzătoare',
        description: 'Permite utilizarea marginilor care ar putea fi nepotrivite pentru scaunul cu rotile și care erau anterior excluse',
      },
      vehicle_type: {
        label: 'Tipul de vehicul',
        description: 'Tipul de vehicul care trebuie luat în considerare pentru calcularea traseului',
      },
      options: {
        label: 'Opțiuni',
      },
      profile_params: {
        label: 'Parametrii profilului',
      },
    },
  }
}
