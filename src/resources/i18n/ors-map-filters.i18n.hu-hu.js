
export default {
  orsMapFilters: {
    'profiles': {
      'cycling-regular': 'Kerékpár',
      'cycling-road': 'Országúti kerékpár',
      'cycling-electric': 'E-kerékpár',
      'cycling-mountain': 'Hegyi kerékpár',
      'cycling-safe': 'Biztonságos kerékpározás',
      'foot-walking': 'Séta',
      'foot-hiking': 'Túrázás',
      'driving-car': 'Személyautó',
      'driving-hgv': 'Nehéz jármű',
      'wheelchair': 'Kerekesszék',
      'hgv': 'Nehéz tgk.',
      'bus': 'Busz',
      'agricultural': 'Mezőgazdasági jármű',
      'delivery': 'Kisteherautó',
      'forestry': 'Erdészeti teherautó',
      'goods': 'Teherautó'
    },
    'filters': {
      'preference': {
        'label': 'Útvonaltervezési preferencia',
        'description': 'Az útvonal tervezésénél előnyben részesített tényező',
        'enum': {
          'fastest': 'Leggyorsabb',
          'shortest': 'Legrövidebb',
          'recommended': 'Ajánlott'
        }
      },
      'range_type': {
        'label': 'Izokróna típusa',
        'description': 'Az izokron vonalak kiszámításának módja',
        'enum': {
          'time': 'Idő',
          'distance': 'Távolság'
        }
      },
      'time_range': {
        'label': 'Hatótávolság',
        'description': 'A legtávolabbi izokron vonal távolsága'
      },
      'distance_range': {
        'label': 'Hatótávolság',
        'description': 'A legtávolabbi izokron vonal távolsága'
      },
      'time_interval': {
        'label': 'Intervallum',
        'description': 'Az izokron vonalak közötti idő- vagy térköz'
      },
      'distance_interval': {
        'label': 'Intervallum',
        'description': 'Az izokron vonalak közötti idő- vagy térköz'
      },
      'options': {
        'label': 'Útvonaltervezési beállítások'
      },
      'profile_params': {
        'label': 'Profil paraméterei'
      },
      'restrictions': {
        'label': 'Korlátozások'
      },
      'axleload': {
        'label': 'Tengelyterhelés',
        'description': 'Az engedélyezett legnagyobb tengelyterhelés (tonna)'
      },
      'height': {
        'label': 'Magasság',
        'description': 'Az engedélyezett legnagyobb magasság (méter). A korlátozások nem kötelezőek a szerveren, és csak az ügyfélben vannak jelen, hogy megakadályozzák az ésszerűtlen értékek beállítását. A túl magas értékek megvalósíthatatlan útvonalakhoz vezethetnek, ha a szükséges adatok jelenleg nincsenek jelen az OpenStreetMap adatbázisban.'
      },
      'length': {
        'label': 'Hosszúság',
        'description': 'Az engedélyezett legnagyobb hosszúság (méter). A korlátozások nem kötelezőek a szerveren, és csak az ügyfélben vannak jelen, hogy megakadályozzák az ésszerűtlen értékek beállítását. A túl magas értékek megvalósíthatatlan útvonalakhoz vezethetnek, ha a szükséges adatok jelenleg nincsenek jelen az OpenStreetMap adatbázisban.'
      },
      'weight': {
        'label': 'Súly',
        'description': 'Az engedélyezett legnagyobb tömeg (tonna)'
      },
      'width': {
        'label': 'Szélesség',
        'description': 'Az engedélyezett legnagyobb szélesség (méter). A korlátozások nem kötelezőek a szerveren, és csak az ügyfélben vannak jelen, hogy megakadályozzák az ésszerűtlen értékek beállítását. A túl magas értékek megvalósíthatatlan útvonalakhoz vezethetnek, ha a szükséges adatok jelenleg nincsenek jelen az OpenStreetMap adatbázisban.'
      },
      'hazmat': {
        'label': 'Veszélyes áru',
        'description': 'Veszélyes áru szállítása'
      },
      'maximum_incline': {
        'label': 'Lejtés',
        'description': 'A legnagyobb lejtésszög (százalék)'
      },
      'maximum_sloped_kerb': {
        'label': 'Járdaszegély-magasság',
        'description': 'A süllyesztett járdaszegélyek legnagyobb magassága (méter)'
      },
      'minimum_width': {
        'label': 'Gyalogút szélességes',
        'description': 'A gyalogút legkisebb szélessége (méter)'
      },
      'smoothness_type': {
        'label': 'Út simasága',
        'description': 'Az útvonal minimális simasága. További információ: https://wiki.openstreetmap.org/wiki/Key:smoothness'
      },
      'surface_type': {
        'label': 'Legrosszabb felszín',
        'description': 'Az útvonalon előforduló legkevésbé jó útfelszín. Sorrend: https://wiki.openstreetmap.org/wiki/Key:surface'
      },
      'track_type': {
        'label': 'Legrosszabb úttípus',
        'description': 'Mezőgazdasági/erdészeti utak legrosszabb típusa. Értékek: https://wiki.openstreetmap.org/wiki/Key:tracktype'
      },
      'round_trip': {
        'label': 'Körutazás'
      },
      'round_trip_length': {
        'label': 'Körutazás hossza',
        'description': 'Az útvonal kívánt hossza (ez csupán egy előnyben részesített érték, az eredmény azonban ettől eltérhet).'
      },
      'points': {
        'label': 'Pontok',
        'description': 'Az útvonal kitűzéséhez használt pontok száma. Minél több a pont, annál jobban hasonlít az út egy körre.'
      },
      'seed': {
        'label': 'Véletlenszerűségi tényező',
        'description': 'Véletlenszerűségi tényező (random seed) a létrehozott útvonal véletlenszerűségének meghatásozásához (érték: 0–90)'
      },
      'avoid_polygons': {
        'label': 'Elkerülendő sokszögek',
        'description': 'Elkerülendő sokszögek'
      },
      'avoid_features': {
        'label': 'Elkerülendő objektumok',
        'description': 'Elkerülendő objektumok',
        'enum': {
          'highways': 'Autópályák',
          'tollways': 'Fizetős utak',
          'ferries': 'Kompok',
          'hills': 'Hegyek',
          'tunnels': 'Alagutak',
          'fords': 'Gázlók',
          'steps': 'Lépcsők',
          'pavedroads': 'Burkolt utak',
          'unpavedroads': 'Burkolatlan utak'
        }
      },
      'avoid_borders': {
        'label': 'Elkerülendő határok',
        'description': 'Elkerülendő országhatárok',
        'enum': {
          'all': 'Összes',
          'controlled': 'Ellenőrzöttek'
        }
      },
      'avoid_countries': {
        'label': 'Elkerülendő országok',
        'description': 'Elkerülendő országok'
      },
      'alternative_routes': {
        'label': 'Alternatív útvonalak'
      },
      'target_count': {
        'label': 'Útvonalak száma',
        'description': 'A megtervezendő alternatív útvonalak száma. A szolgáltatás legfeljebb ennyi útvonalat ad meg, amelyek megfelelnek az egyezőségi és a súlyozási tényező korlátozásainak.'
      },
      'share_factor': {
        'label': 'Egyezőségi tényező',
        'description': 'Az útvonalnak az a maximális része, amennyi az alternatívák és az optimális útvonal esetében közös lehet. Az alapértelmezett 0,6-os érték azt jelenti, hogy az alternatív útvonalak akár 60%-a is azonos lehet az optimális útvonallal.'
      },
      'weight_factor': {
        'label': 'Súlyozási tényező',
        'description': 'Az a maximális tényező, amellyel az útvonal súlya eltérhet az optimális úttól. Az alapértelmezett 1,4-es érték azt jelenti, hogy az alternatívák legfeljebb 1,4-szer lehetnek hosszabbak (költségesebbek), mint az optimális útvonal.'
      },
      'maximum_speed': {
        'label': 'Legnagyobb sebesség',
        'description': 'Az útvonaltervezés során alkalmazott legnagyobb sebesség'
      },
      'weightings': {
        'label': 'További paraméterek'
      },
      'green': {
        'label': 'Zöld (csak Németországban)',
        'description': 'A zöldterületeket részesítse előnyben (csak Németországban érhető el)',
      },
      'quiet': {
        'label': 'Csendes (csak Németországban)',
        'description': 'A csendes területeket részesíti előnyben (csak Németországban érhető el)',
      },
      'surface_quality_known': {
        'label': 'Csak ismert minőségű felületek',
        'description': 'Csak olyan élek használatát kényszeríti ki, ahol a felület minősége kifejezetten ismert'
      },
      'allow_unsuitable': {
        'label': 'Nem megfelelő',
        'description': 'Lehetővé teszi olyan élek használatát, amelyek esetleg nem alkalmasak a korábban kizárt kerekesszékekhez'
      },
      'vehicle_type': {
        'label': 'Jármű típus',
        'description': 'Az útvonal kiszámításakor figyelembe veendő jármű típusa',
      }
    }
  }
}
