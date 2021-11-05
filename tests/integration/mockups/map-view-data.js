import MapViewData from '@/models/map-view-data'
import Place from '@/models/place'

let features = [
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.769869,
        49.37625
      ]
    },
    'properties': {
      'id': '101906011',
      'gid': 'whosonfirst:locality:101906011',
      'layer': 'locality',
      'source': 'whosonfirst',
      'source_id': '101906011',
      'name': 'Heidelberg',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 0.867,
      'accuracy': 'centroid',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Heidelberg, BW, Germany',
      'unique_id': '101906011'
    },
    'bbox': [
      8.57312513958,
      49.3521596612,
      8.79412886129,
      49.4595876777
    ],
    'distance': 0.8655641929890087
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.793137,
        49.39434
      ]
    },
    'properties': {
      'id': 'way/87322611',
      'gid': 'openstreetmap:venue:way/87322611',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'way/87322611',
      'name': 'Sparkasse Heidelberg',
      'housenumber': '15',
      'street': 'Bahnhofstraße',
      'postalcode': '69151',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 2.585,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Neckargemünd',
      'locality_gid': 'whosonfirst:locality:101826799',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Sparkasse Heidelberg, Neckargemünd, BW, Germany',
      'addendum': {
        'osm': {
          'wheelchair': 'yes',
          'operator': 'Sparkasse Heidelberg',
          'opening_hours': 'Mo,Tu,Fr 08:30-12:30, 14:00-16:30; We 08:30-12:30; Th 08:30-12:30, 14:00-18:00'
        }
      },
      'unique_id': 'way/87322611'
    },
    'bbox': [
      8.7928299,
      49.3941569,
      8.7933164,
      49.3943459
    ],
    'distance': 2.58199841383592
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.692416,
        49.401247
      ]
    },
    'properties': {
      'id': '102063443',
      'gid': 'whosonfirst:county:102063443',
      'layer': 'county',
      'source': 'whosonfirst',
      'source_id': '102063443',
      'name': 'Heidelberg',
      'confidence': 0.4,
      'match_type': 'fallback',
      'distance': 5.497,
      'accuracy': 'centroid',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Heidelberg',
      'county_gid': 'whosonfirst:county:102063443',
      'county_a': 'HD',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Heidelberg, BW, Germany',
      'unique_id': '102063443'
    },
    'bbox': [
      8.573125,
      49.35216,
      8.794129,
      49.459588
    ],
    'distance': 5.490898644881834
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.803855,
        49.388906
      ]
    },
    'properties': {
      'id': 'node/272616428',
      'gid': 'openstreetmap:venue:node/272616428',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/272616428',
      'name': 'Sparkasse Heidelberg',
      'housenumber': '43',
      'street': 'Wiesenbacher Straße',
      'postalcode': '69151',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 3.08,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Neckargemünd',
      'locality_gid': 'whosonfirst:locality:101826799',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Sparkasse Heidelberg, Neckargemünd, BW, Germany',
      'addendum': {
        'osm': {
          'wheelchair': 'yes',
          'operator': 'Sparkasse'
        }
      },
      'unique_id': 'node/272616428'
    },
    'distance': 3.0767235752837703
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.773982,
        49.409535
      ]
    },
    'properties': {
      'id': 'node/3222658321',
      'gid': 'openstreetmap:venue:node/3222658321',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/3222658321',
      'name': 'Skulpturenpark Heidelberg',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 3.132,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Skulpturenpark Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wikidata': 'Q1562946',
          'wikipedia': 'de:Skulpturenpark Heidelberg',
          'website': 'http://www.skulpturenpark-heidelberg.de',
          'opening_hours': '24/7'
        }
      },
      'unique_id': 'node/3222658321'
    },
    'distance': 3.1287401691569046
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.774924,
        49.410024
      ]
    },
    'properties': {
      'id': 'node/3431560342',
      'gid': 'openstreetmap:venue:node/3431560342',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/3431560342',
      'name': 'Heidelberg Orthopädie',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 3.203,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Heidelberg Orthopädie, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wheelchair': 'yes',
          'operator': 'DB Netz AG'
        }
      },
      'unique_id': 'node/3431560342'
    },
    'distance': 3.1996275086161963
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.730576,
        49.402821
      ]
    },
    'properties': {
      'id': 'way/123530057',
      'gid': 'openstreetmap:venue:way/123530057',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'way/123530057',
      'name': 'Fernmeldeturm Heidelberg',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 3.245,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Fernmeldeturm Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wikidata': 'Q1407063',
          'wikipedia': 'de:Fernmeldeturm Heidelberg',
          'operator': 'Media Broadcast GmbH'
        }
      },
      'unique_id': 'way/123530057'
    },
    'bbox': [
      8.7304851,
      49.402761,
      8.7306678,
      49.4028803
    ],
    'distance': 3.241548544431239
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.728748,
        49.401708
      ]
    },
    'properties': {
      'id': 'relation/1991213',
      'gid': 'openstreetmap:venue:relation/1991213',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'relation/1991213',
      'name': 'Märchenparadies Heidelberg',
      'housenumber': '5a',
      'street': 'Königstuhl',
      'postalcode': '69117',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 3.258,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Märchenparadies Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wikidata': 'Q1957398',
          'wikipedia': 'de:Märchenparadies Königstuhl',
          'website': 'https://maerchen-paradies.de'
        }
      },
      'unique_id': 'relation/1991213'
    },
    'bbox': [
      8.72808,
      49.4011326,
      8.7309091,
      49.4027773
    ],
    'distance': 3.254334051108123
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.72843,
        49.403728
      ]
    },
    'properties': {
      'id': 'way/123528725',
      'gid': 'openstreetmap:venue:way/123528725',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'way/123528725',
      'name': 'Fernsehturm Heidelberg',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 3.427,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Fernsehturm Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wikidata': 'Q1407296',
          'wikipedia': 'de:Fernsehturm Heidelberg',
          'operator': 'Südwestrundfunk (SWR)'
        }
      },
      'unique_id': 'way/123528725'
    },
    'bbox': [
      8.7283436,
      49.4036803,
      8.7285174,
      49.4037778
    ],
    'distance': 3.4232194965573437
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.70843,
        49.395245
      ]
    },
    'properties': {
      'id': 'way/90355802',
      'gid': 'openstreetmap:venue:way/90355802',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'way/90355802',
      'name': 'Haus Heidelberg',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 4.173,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Haus Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wheelchair': 'yes'
        }
      },
      'unique_id': 'way/90355802'
    },
    'bbox': [
      8.7081325,
      49.3949995,
      8.7088187,
      49.3955246
    ],
    'distance': 4.168787058280473
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.720882,
        49.415235
      ]
    },
    'properties': {
      'id': 'node/268364931',
      'gid': 'openstreetmap:venue:node/268364931',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/268364931',
      'name': 'Heidelberg-Altstadt',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 4.74,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Heidelberg-Altstadt, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wheelchair': 'yes',
          'wikidata': 'Q800903',
          'wikipedia': 'de:Bahnhof Heidelberg-Altstadt',
          'operator': 'DB Netz AG'
        }
      },
      'unique_id': 'node/268364931'
    },
    'distance': 4.734741106308951
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.713238,
        49.413018
      ]
    },
    'properties': {
      'id': 'node/2826646592',
      'gid': 'openstreetmap:venue:node/2826646592',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/2826646592',
      'name': 'Jazzhaus Heidelberg',
      'housenumber': '6',
      'street': 'Leyergasse',
      'postalcode': '69117',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 4.937,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Jazzhaus Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wheelchair': 'no',
          'website': 'http://www.jazzhaus-hd.de/',
          'phone': '+49-6221-4332040',
          'opening_hours': 'We-Sa 20:00+; \'Konzertbeginn 21:30\''
        }
      },
      'unique_id': 'node/2826646592'
    },
    'distance': 4.931542963926215
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.717067,
        49.416433
      ]
    },
    'properties': {
      'id': 'way/91598991',
      'gid': 'openstreetmap:venue:way/91598991',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'way/91598991',
      'name': 'K. St.V. Palatia Heidelberg',
      'housenumber': '43',
      'street': 'Ziegelhäuser Landstraße',
      'postalcode': '69120',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 5.02,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'K. St.V. Palatia Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'website': 'https://www.palatia-heidelberg.de/'
        }
      },
      'unique_id': 'way/91598991'
    },
    'bbox': [
      8.7169096,
      49.4163671,
      8.7172255,
      49.4165557
    ],
    'distance': 5.014845743968503
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.705889,
        49.409752
      ]
    },
    'properties': {
      'id': 'node/4857343885',
      'gid': 'openstreetmap:venue:node/4857343885',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/4857343885',
      'name': 'Universitätsbibliothek Heidelberg',
      'housenumber': '107-109',
      'street': 'Plöck',
      'postalcode': '69117',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 5.11,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Universitätsbibliothek Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wheelchair': 'yes',
          'website': 'https://www.uni-heidelberg.de/einrichtungen/museen/universitaetsbibliothek.html',
          'opening_hours': 'Mo-Fr 08:30-01:00; Sa-Su 09:00-01:00; PH off'
        }
      },
      'unique_id': 'node/4857343885'
    },
    'distance': 5.104712987576045
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.690538,
        49.378207
      ]
    },
    'properties': {
      'id': 'way/481677440',
      'gid': 'openstreetmap:venue:way/481677440',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'way/481677440',
      'name': 'Thoraxklinik Heidelberg',
      'housenumber': '1',
      'street': 'Röntgenstraße',
      'postalcode': '69126',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 5.239,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Thoraxklinik Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wheelchair': 'yes',
          'wikidata': 'Q1411803',
          'wikipedia': 'de:Thoraxklinik Heidelberg',
          'website': 'https://www.thoraxklinik-heidelberg.de/',
          'phone': '+49 6221 396-0'
        }
      },
      'unique_id': 'way/481677440'
    },
    'bbox': [
      8.6887007,
      49.3770964,
      8.6917887,
      49.3786585
    ],
    'distance': 5.2332318476544915
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.742616,
        49.427916
      ]
    },
    'properties': {
      'id': 'node/3163952701',
      'gid': 'openstreetmap:venue:node/3163952701',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/3163952701',
      'name': 'Heidelberg 4',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 5.268,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Heidelberg 4, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'operator': 'Deutsche Funkturm'
        }
      },
      'unique_id': 'node/3163952701'
    },
    'distance': 5.262394892267872
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.70538,
        49.411661
      ]
    },
    'properties': {
      'id': 'node/3280822205',
      'gid': 'openstreetmap:venue:node/3280822205',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/3280822205',
      'name': 'Eckhaus Heidelberg',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 5.269,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Eckhaus Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wheelchair': 'yes',
          'operator': 'Ilona Prosenäk',
          'website': 'http://www.eckhausheidelberg.de/',
          'phone': '+4962217278115',
          'opening_hours': 'Mo-Sa 11:00-18:00'
        }
      },
      'unique_id': 'node/3280822205'
    },
    'distance': 5.262798994942021
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.692432,
        49.396675
      ]
    },
    'properties': {
      'id': 'relation/12286306',
      'gid': 'openstreetmap:venue:relation/12286306',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'relation/12286306',
      'name': 'Bergfriedhof Heidelberg',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 5.323,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Bergfriedhof Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wikidata': 'Q819654',
          'wikipedia': 'de:Bergfriedhof (Heidelberg)',
          'operator': 'Stadt Heidelberg',
          'website': 'http://grabsteine.genealogy.net/namelist.php?cem=4612'
        }
      },
      'unique_id': 'relation/12286306'
    },
    'bbox': [
      8.6896051,
      49.3942939,
      8.6962514,
      49.3993113
    ],
    'distance': 5.316795961088052
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.688461,
        49.380773
      ]
    },
    'properties': {
      'id': 'node/2926370308',
      'gid': 'openstreetmap:venue:node/2926370308',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/2926370308',
      'name': 'Volksbank Heidelberg',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 5.372,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Volksbank Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wheelchair': 'yes',
          'opening_hours': 'Mo-Fr 08:30-12:30,14:00-16:00; Th 08:30-12:30,14:00-18:00'
        }
      },
      'unique_id': 'node/2926370308'
    },
    'distance': 5.365685343280643
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.692443,
        49.404399
      ]
    },
    'properties': {
      'id': 'node/8637501991',
      'gid': 'openstreetmap:venue:node/8637501991',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/8637501991',
      'name': 'Schnelltest Heidelberg',
      'housenumber': '37',
      'street': 'Rohrbacher Straße',
      'postalcode': '69115',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 5.638,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Schnelltest Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'operator': 'UO Covid Schnelltest UG',
          'website': 'https://heidelberg-schnelltest.de/',
          'opening_hours': 'Mo-Su 08:00-17:00'
        }
      },
      'unique_id': 'node/8637501991'
    },
    'distance': 5.632076958797445
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.699223,
        49.412645
      ]
    },
    'properties': {
      'id': 'node/8667693240',
      'gid': 'openstreetmap:venue:node/8667693240',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/8667693240',
      'name': 'Testschiff Heidelberg',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 5.69,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Testschiff Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'operator': 'Safe Meditec',
          'website': 'https://testschiff.de/',
          'phone': '+49-6221-20181',
          'opening_hours': 'Mo-Fr 07:00-18:00; Sa-Su 08:00-14:00'
        }
      },
      'unique_id': 'node/8667693240'
    },
    'distance': 5.683778318099993
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.688557,
        49.405838
      ]
    },
    'properties': {
      'id': 'node/8490810472',
      'gid': 'openstreetmap:venue:node/8490810472',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/8490810472',
      'name': 'Amtsgericht Heidelberg',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 5.962,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Amtsgericht Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'website': 'https://amtsgericht-heidelberg.justiz-bw.de/pb/,Lde/Startseite',
          'phone': '+49 6221 590',
          'opening_hours': 'Mo-Th 07:30-16:30; Fr 7:30-15:00'
        }
      },
      'unique_id': 'node/8490810472'
    },
    'distance': 5.954871167432985
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.688401,
        49.406242
      ]
    },
    'properties': {
      'id': 'node/8490810473',
      'gid': 'openstreetmap:venue:node/8490810473',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/8490810473',
      'name': 'Landgericht Heidelberg',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 5.991,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Landgericht Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'website': 'http://www.landgericht-heidelberg.de',
          'phone': '+49 6221 590',
          'opening_hours': 'Mo-Th 07:30-16:30; Fr 7:30-15:00'
        }
      },
      'unique_id': 'node/8490810473'
    },
    'distance': 5.9847678358647896
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.68434,
        49.409314
      ]
    },
    'properties': {
      'id': 'way/122188809',
      'gid': 'openstreetmap:venue:way/122188809',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'way/122188809',
      'name': 'Ethianum Heidelberg',
      'street': 'Fehrentzstraße',
      'postalcode': '69115',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 6.409,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Ethianum Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'opening_hours': '05:30-21:00'
        }
      },
      'unique_id': 'way/122188809'
    },
    'bbox': [
      8.6838834,
      49.4088854,
      8.6848214,
      49.4097661
    ],
    'distance': 6.401837190395695
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.678977,
        49.404043
      ]
    },
    'properties': {
      'id': 'node/272597912',
      'gid': 'openstreetmap:venue:node/272597912',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/272597912',
      'name': 'B2 Heidelberg',
      'street': 'Belfortstraße',
      'postalcode': '69115',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 6.516,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'B2 Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wheelchair': 'limited',
          'opening_hours': 'Mo-Fr 06:00-20:00; Sa 06:00-14:00; Su,PH off'
        }
      },
      'unique_id': 'node/272597912'
    },
    'distance': 6.5089567084973785
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.676697,
        49.401407
      ]
    },
    'properties': {
      'id': 'node/3839210091',
      'gid': 'openstreetmap:venue:node/3839210091',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/3839210091',
      'name': 'Recyclingkaufhaus Heidelberg',
      'housenumber': '15',
      'street': 'Czernyring',
      'postalcode': '69115',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 6.57,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Recyclingkaufhaus Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wheelchair': 'yes',
          'operator': 'Soziale Dienste Heidelberg',
          'opening_hours': 'Mo-Fr 09:00-18:00, Sa 09:00-15:00'
        }
      },
      'unique_id': 'node/3839210091'
    },
    'distance': 6.5625347640602625
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.675768,
        49.399608
      ]
    },
    'properties': {
      'id': 'way/36822133',
      'gid': 'openstreetmap:venue:way/36822133',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'way/36822133',
      'name': 'Heidelberg Collaboratory for Image Processing',
      'housenumber': '4-6',
      'street': 'Speyerer Straße',
      'postalcode': '69115',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 6.573,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Heidelberg Collaboratory for Image Processing, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'operator': 'Ruprecht-Karls-Universität Heidelberg',
          'website': 'https://hci.iwr.uni-heidelberg.de/'
        }
      },
      'unique_id': 'way/36822133'
    },
    'bbox': [
      8.6751023,
      49.3991894,
      8.6764748,
      49.4001113
    ],
    'distance': 6.5652708185631665
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.671971,
        49.390604
      ]
    },
    'properties': {
      'id': 'way/55972914',
      'gid': 'openstreetmap:venue:way/55972914',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'way/55972914',
      'name': 'Sprungbude Heidelberg',
      'housenumber': '1-3',
      'street': 'Harbigweg',
      'postalcode': '69124',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 6.626,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Sprungbude Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'operator': 'Oliver Lechner',
          'website': 'https://sprungbude-heidelberg.de/',
          'phone': '+49 6221 602106',
          'opening_hours': 'Tu-Th 15:00-21:00; Fr 14:00-22:00; Sa 10:00-22:00; Su 10:00-20:00'
        }
      },
      'unique_id': 'way/55972914'
    },
    'bbox': [
      8.6715927,
      49.3903748,
      8.6723484,
      49.3908327
    ],
    'distance': 6.618840794925579
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.671048,
        49.391322
      ]
    },
    'properties': {
      'id': 'way/846676559',
      'gid': 'openstreetmap:venue:way/846676559',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'way/846676559',
      'name': 'Wohnmobilstellplatz Heidelberg',
      'housenumber': '1-3',
      'street': 'Harbigweg',
      'postalcode': '69124',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 6.704,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Wohnmobilstellplatz Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'operator': 'Sprungbude Heidelberg GmbH',
          'website': 'https://www.wohnmobilstellplatz-heidelberg.com/'
        }
      },
      'unique_id': 'way/846676559'
    },
    'bbox': [
      8.6704093,
      49.3909572,
      8.6715564,
      49.3916675
    ],
    'distance': 6.696331879910274
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.675422,
        49.403474
      ]
    },
    'properties': {
      'id': 'node/2820941790',
      'gid': 'openstreetmap:venue:node/2820941790',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/2820941790',
      'name': 'Heidelberg Hauptbahnhof',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 6.734,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Heidelberg Hauptbahnhof, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wheelchair': 'yes',
          'wikidata': 'Q467998',
          'wikipedia': 'de:Heidelberg Hauptbahnhof',
          'operator': 'DB Netz AG',
          'phone': '+496221525355'
        }
      },
      'unique_id': 'node/2820941790'
    },
    'distance': 6.726414177620664
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.670966,
        49.399243
      ]
    },
    'properties': {
      'id': 'node/2327697885',
      'gid': 'openstreetmap:venue:node/2327697885',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/2327697885',
      'name': 'Sparkasse Heidelberg',
      'housenumber': '4',
      'street': 'Schwetzinger Terrasse',
      'postalcode': '69115',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 6.895,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Sparkasse Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wheelchair': 'yes',
          'operator': 'Sparkasse Heidelberg',
          'opening_hours': 'Mo-We,Fr 09:00-12:30, Mo,Th 14:00-18:00'
        }
      },
      'unique_id': 'node/2327697885'
    },
    'distance': 6.887354169991853
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.656646,
        49.383785
      ]
    },
    'properties': {
      'id': 'node/4365886276',
      'gid': 'openstreetmap:venue:node/4365886276',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/4365886276',
      'name': 'DEKRA Heidelberg – Station Heidelberg',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 7.676,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'DEKRA Heidelberg – Station Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'website': 'http://www.dekra.de/heidelberg/portal.html',
          'phone': '+49 6221 737390'
        }
      },
      'unique_id': 'node/4365886276'
    },
    'distance': 7.667027040651399
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.672725,
        49.421621
      ]
    },
    'properties': {
      'id': 'way/25317632',
      'gid': 'openstreetmap:venue:way/25317632',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'way/25317632',
      'name': 'Heizkraftwerk Heidelberg',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 7.835,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Heizkraftwerk Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wikidata': 'Q14906803',
          'wikipedia': 'de:Heizkraftwerk Heidelberg',
          'operator': 'RWE'
        }
      },
      'unique_id': 'way/25317632'
    },
    'bbox': [
      8.6716528,
      49.4211633,
      8.6734972,
      49.4224115
    ],
    'distance': 7.826677748308959
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.669602,
        49.419747
      ]
    },
    'properties': {
      'id': 'node/8856635298',
      'gid': 'openstreetmap:venue:node/8856635298',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'node/8856635298',
      'name': 'Heidelberg Im Neuenheimer Feld / PH Heidelberg - CampusRad',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 7.913,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Heidelberg Im Neuenheimer Feld / PH Heidelberg - CampusRad, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'operator': 'VRNnextbike',
          'website': 'http://www.vrnnextbike.de'
        }
      },
      'unique_id': 'node/8856635298'
    },
    'distance': 7.903979082521111
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.663935,
        49.414738
      ]
    },
    'properties': {
      'id': 'way/5182648',
      'gid': 'openstreetmap:venue:way/5182648',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'way/5182648',
      'name': 'Zoo Heidelberg',
      'housenumber': '3',
      'street': 'Tiergartenstraße',
      'postalcode': '69120',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 7.999,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Zoo Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wheelchair': 'limited',
          'wikidata': 'Q220035',
          'wikipedia': 'de:Zoo Heidelberg',
          'operator': 'Tiergarten Heidelberg gGmbH',
          'website': 'https://www.zoo-heidelberg.de',
          'phone': '+49622164550'
        }
      },
      'unique_id': 'way/5182648'
    },
    'bbox': [
      8.6586462,
      49.4119857,
      8.6662347,
      49.4166277
    ],
    'distance': 7.990377120353475
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.664431,
        49.416319
      ]
    },
    'properties': {
      'id': 'way/894614246',
      'gid': 'openstreetmap:venue:way/894614246',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'way/894614246',
      'name': 'Universitätsklinikum Heidelberg',
      'housenumber': '672',
      'street': 'Im Neuenheimer Feld',
      'postalcode': '69120',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 8.048,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Universitätsklinikum Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'wikidata': 'Q324206'
        }
      },
      'unique_id': 'way/894614246'
    },
    'bbox': [
      8.6607253,
      49.4147564,
      8.6677056,
      49.4190387
    ],
    'distance': 8.039198814769522
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        8.640506,
        49.433363
      ]
    },
    'properties': {
      'id': 'way/375731342',
      'gid': 'openstreetmap:venue:way/375731342',
      'layer': 'venue',
      'source': 'openstreetmap',
      'source_id': 'way/375731342',
      'name': 'DLRG Heidelberg',
      'housenumber': '361',
      'street': 'Mannheimer Straße',
      'postalcode': '69123',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 10.503,
      'accuracy': 'point',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Baden-Württemberg',
      'region_gid': 'whosonfirst:region:85682567',
      'region_a': 'BW',
      'macrocounty': 'Karlsruhe Government Region',
      'macrocounty_gid': 'whosonfirst:macrocounty:404227555',
      'county': 'Rhein-Neckar-Kreis',
      'county_gid': 'whosonfirst:county:102063481',
      'county_a': 'RN',
      'localadmin': 'Neckargemünd',
      'localadmin_gid': 'whosonfirst:localadmin:1377688757',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101906011',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'DLRG Heidelberg, Heidelberg, BW, Germany',
      'addendum': {
        'osm': {
          'operator': 'DLRG',
          'website': 'http://www.heidelberg.dlrg.de'
        }
      },
      'unique_id': 'way/375731342'
    },
    'bbox': [
      8.6402551,
      49.4331991,
      8.6407591,
      49.433527
    ],
    'distance': 10.491406752715914
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        13.4739,
        50.6431
      ]
    },
    'properties': {
      'id': '1393558913',
      'gid': 'whosonfirst:neighbourhood:1393558913',
      'layer': 'neighbourhood',
      'source': 'whosonfirst',
      'source_id': '1393558913',
      'name': 'Heidelberg',
      'confidence': 0.6,
      'match_type': 'fallback',
      'distance': 364.998,
      'accuracy': 'centroid',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Saxony',
      'region_gid': 'whosonfirst:region:85682523',
      'region_a': 'SN',
      'county': 'Erzgebirgskreis',
      'county_gid': 'whosonfirst:county:102064211',
      'county_a': 'EZ',
      'localadmin': 'Seiffen/Erzgeb.',
      'localadmin_gid': 'whosonfirst:localadmin:1377685713',
      'locality': 'Seiffen',
      'locality_gid': 'whosonfirst:locality:101824033',
      'neighbourhood': 'Heidelberg',
      'neighbourhood_gid': 'whosonfirst:neighbourhood:1393558913',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Heidelberg, Seiffen, SN, Germany',
      'unique_id': '1393558913'
    },
    'bbox': [
      13.4689,
      50.6381,
      13.4789,
      50.6481
    ],
    'distance': 364.58959089611807
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        12.31001,
        53.09588
      ]
    },
    'properties': {
      'id': '1393562915',
      'gid': 'whosonfirst:neighbourhood:1393562915',
      'layer': 'neighbourhood',
      'source': 'whosonfirst',
      'source_id': '1393562915',
      'name': 'Heidelberg',
      'confidence': 0.6,
      'match_type': 'fallback',
      'distance': 481.538,
      'accuracy': 'centroid',
      'country': 'Germany',
      'country_gid': 'whosonfirst:country:85633111',
      'country_a': 'DEU',
      'region': 'Brandenburg',
      'region_gid': 'whosonfirst:region:85682553',
      'region_a': 'BB',
      'county': 'Prignitz',
      'county_gid': 'whosonfirst:county:102064003',
      'county_a': 'PI',
      'localadmin': 'Groß Pankow (Prignitz)',
      'localadmin_gid': 'whosonfirst:localadmin:1377683923',
      'locality': 'Groß Pankow',
      'locality_gid': 'whosonfirst:locality:101847973',
      'neighbourhood': 'Heidelberg',
      'neighbourhood_gid': 'whosonfirst:neighbourhood:1393562915',
      'continent': 'Europe',
      'continent_gid': 'whosonfirst:continent:102191581',
      'label': 'Heidelberg, Groß Pankow, BB, Germany',
      'unique_id': '1393562915'
    },
    'bbox': [
      12.30501,
      53.09088,
      12.31501,
      53.10088
    ],
    'distance': 480.99880557342937
  },
  {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        28.363685,
        -26.506229
      ]
    },
    'properties': {
      'id': '101926329',
      'gid': 'whosonfirst:locality:101926329',
      'layer': 'locality',
      'source': 'whosonfirst',
      'source_id': '101926329',
      'name': 'Heidelberg',
      'confidence': 1,
      'match_type': 'exact',
      'distance': 8668.99,
      'accuracy': 'centroid',
      'country': 'South Africa',
      'country_gid': 'whosonfirst:country:85633813',
      'country_a': 'ZAF',
      'region': 'Gauteng',
      'region_gid': 'whosonfirst:region:85688923',
      'region_a': 'GT',
      'county': 'Sedibeng',
      'county_gid': 'whosonfirst:county:1108730541',
      'county_a': 'SE',
      'locality': 'Heidelberg',
      'locality_gid': 'whosonfirst:locality:101926329',
      'continent': 'Africa',
      'continent_gid': 'whosonfirst:continent:102191573',
      'label': 'Heidelberg, GT, South Africa',
      'unique_id': '101926329'
    },
    'bbox': [
      28.336596,
      -26.535139,
      28.387115,
      -26.492676
    ],
    'distance': 8659.289409178446
  }
]

let mapViewDataPlaceSearchResults = new MapViewData()
mapViewDataPlaceSearchResults.places = Place.placesFromFeatures(features)
mapViewDataPlaceSearchResults.routes = []
mapViewDataPlaceSearchResults.timestamp = Date.now()

let mapViewDataSinglePlace = new MapViewData()
mapViewDataSinglePlace.places = Place.placesFromFeatures([features[0]])
mapViewDataSinglePlace.routes = []
mapViewDataSinglePlace.timestamp = Date.now()


const mapViewDataTemplates = {
  placeSearchResults: mapViewDataPlaceSearchResults,
  singlePlace: mapViewDataSinglePlace
}
export default mapViewDataTemplates
  
