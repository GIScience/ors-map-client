export default {
  orsMapFilters: {
    profiles: {
      'cycling-regular': 'Kolo',
      'cycling-road': 'Silniční kolo',
      'cycling-electric': 'Elektrokolo',
      'cycling-mountain': 'Horské kolo',
      'cycling-safe': 'Bezpečné pro cyklisty',
      'foot-walking': 'Chůze',
      'foot-hiking': 'Pěší turistika',
      'driving-car': 'Auto',
      'driving-hgv': 'Těžké vozidlo',
      'wheelchair': 'Invalidní vozík',
      'hgv': 'Těžké vozidlo',
      'bus': 'Autobus',
      'agricultural': 'Zemědělský stroj',
      'delivery': 'Dodávkový vůz',
      'forestry': 'Lesní stroj',
      'goods': 'Nákladní vůz'
    },
    filters: {
      preference: {
        label: 'Předvolby trasy',
        description: 'Upřednostňovaný faktor, který je třeba vzít v úvahu při výpočtu tras',
        enum: {
          'fastest': 'Nejrychlejší',
          'shortest': 'Nejkratší',
          'recommended': 'Doporučená'
        }
      },
      range_type: {
        label: 'metoda Isochronu',
        description: 'Metoda použitá pro výpočet isochronu',
        enum: {
          'time': 'Čas',
          'distance': 'Vzdálenost'
        }
      },
      time_range: {
        label: 'Rozsah',
        description: 'Maximální rozsah isochron, které se mají vypočítat'
      },
      distance_range: {
        label: 'Rozsah',
        description: 'Maximální rozsah isochron, které se mají vypočítat'
      },
      time_interval: {
        label: 'Interval',
        description: 'Interval isochron, které se mají vypočítat'
      },
      distance_interval: {
        label: 'Interval',
        description: 'Interval isochron, které se mají vypočítat'
      },
      options: {
        label: 'Možnosti'
      },
      profile_params: {
        label: 'Parametry profilu'
      },
      restrictions: {
        label: 'Omezení'
      },
      axleload: {
        label: 'Zatížení nápravy',
        description: 'Maximální zatížení nápravy v tunách'
      },
      height: {
        label: 'Výška',
        description: 'Maximální výška v metrech. Tyto limity nejsou serverem vynucovány a slouží pouze k zajištění toho, aby nebyly nastaveny nepřiměřené hodnoty. Jakékoli podivně velké hodnoty by mohly vést k nepoužitelným trasám, když databáze OpenStreetMap není dostatečně označená.'
      },
      length: {
        label: 'Délka',
        description: 'Maximální délka v metrech. Tyto limity nejsou serverem vynucovány a slouží pouze k zajištění toho, aby nebyly nastaveny nepřiměřené hodnoty. Jakékoli podivně velké hodnoty by mohly vést k nepoužitelným trasám, když databáze OpenStreetMap není dostatečně označená.'
      },
      weight: {
        label: 'Váha',
        description: 'Maximální váha v tunách'
      },
      width: {
        label: 'Šířka',
        description: 'Maximální šířka v metrech. Tyto limity nejsou serverem vynucovány a slouží pouze k zajištění toho, aby nebyly nastaveny nepřiměřené hodnoty. Jakékoli podivně velké hodnoty by mohly vést k nepoužitelným trasám, když databáze OpenStreetMap není dostatečně označená.'
      },
      hazmat: {
        label: 'Nebezpečný náklad',
        description: 'Přeprava nebezpečného nákladu'
      },
      maximum_incline: {
        label: 'Maximální sklon',
        description: 'Maximální sklon v procentech'
      },
      maximum_sloped_kerb: {
        label: 'Maximální výška obrubníku',
        description: 'Udává maximální výšku šikmého obrubníku v metrech.'
      },
      minimum_width: {
        label: 'Minimální šířka chodníku',
        description: 'Určuje minimální šířku chodníku pro pěší v metrech.'
      },
      smoothness_type: {
        label: 'Plynulost trasy',
        description: 'Určuje minimální hladkost trasy. Další informace: https://wiki.openstreetmap.org/wiki/Key:smoothness'
      },
      surface_type: {
        label: 'Min. typ povrchu',
        description: 'Určuje minimální typ povrchu. Pořadí typu: https://wiki.openstreetmap.org/wiki/Key:surface'
      },
      track_type: {
        label: 'Minimální stupeň trasy',
        description: 'Určuje minimální stoupání trasy. Hodnoty stupně: https://wiki.openstreetmap.org/wiki/Key:tracktype'
      },
      round_trip: {
        label: 'Cesta tam a zpět'
      },
      round_trip_length: {
        label: 'Délka cesty tam a zpět',
        description: 'Cílová délka trasy (upozorňujeme, že se jedná o preferovanou hodnotu, ale výsledky se mohou lišit).'
      },
      points: {
        label: 'Body',
        description: 'Počet bodů, které se mají na trase použít. Větší počty bodů vytvářejí více kruhové trasy.'
      },
      seed: {
        label: 'Náhodné rozmístění',
        description: 'Náhodné rozmístění, které se použije pro přidání náhodnosti do generované trasy (min:0, max: 90).'
      },
      avoid_polygons: {
        label: 'Vyhnout se polygonům',
        description: 'Vyhnout se polygonům'
      },
      avoid_features: {
        label: 'Vyhnout se objektům',
        description: 'Vyhnout se objektům',
        enum: {
          'highways': 'Dálnice',
          'tollways': 'Mýtné brány',
          'ferries': 'Trajekty',
          'hills': 'Kopce',
          'tunnels': 'Tunely',
          'fords': 'Brody',
          'steps': 'Schody',
          'pavedroads': 'Zpevněné cesty',
          'unpavedroads': 'Nezpevněné cesty'
        }
      },
      avoid_borders: {
        label: 'Vyhnout se hranicím',
        description: 'Vyhnout se hranicím',
        enum: {
          'all': 'Všem',
          'controlled': 'Kontrolovaným'
        }
      },
      avoid_countries: {
        label: 'Vyhnout se zemím',
        description: 'Vyhnout se zemím'
      },
      alternative_routes: {
        label: 'Alternativní trasy'
      },
      target_count: {
        label: 'Počet tras',
        description: 'Cílový počet alternativních tras k výpočtu. Služba vrátí až tento počet tras, které splňují omezení podílového a váhového faktoru.'
      },
      share_factor: {
        label: 'Faktor podílu',
        description: 'Maximální podíl trasy, který mohou alternativy sdílet s optimální trasou. Výchozí hodnota 0,6 znamená, že alternativy mohou s optimální trasou sdílet až 60 % úseků trasy.'
      },
      weight_factor: {
        label: 'Faktor váhy',
        description: 'Maximální faktor, o který se může váha trasy odchýlit od optimální trasy. Výchozí hodnota 1,4 znamená, že alternativy mohou být až 1,4krát delší (nákladnější) než optimální trasa.'
      },
      maximum_speed: {
        label: 'Maximální rychlost',
        description: 'Maximální rychlost, která musí být použita'
      },
      weightings: {
        label: 'Další nastavení'
      },
      green: {
        label: 'Zeleň (pouze Německo)',
        description: 'Preferovat zelené plochy (k dispozici pouze pro Německo)'
      },
      quiet: {
        label: 'Klid (pouze Německo)',
        description: 'Preferují klidné oblasti (k dispozici pouze pro Německo)'
      },
      surface_quality_known: {
        label: 'Pouze povrchy se známou kvalitou',
        description: 'vynucuje použití pouze těch částí povrchu, u kterých je kvalita povrchu výslovně známa.'
      },
      allow_unsuitable: {
        label: 'Povolit nevhodné',
        description: 'Umožňuje použití takových částí, které by mohly být nevhodné pro invalidní vozík a které byly dříve vyloučeny.'
      },
      vehicle_type: {
        label: 'Typ vozidla',
        description: 'Typ vozidla, který se bere v úvahu při výpočtu trasy'
      }
    }
  }
}
