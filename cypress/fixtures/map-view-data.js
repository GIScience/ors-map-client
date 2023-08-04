// noinspection SpellCheckingInspection

import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
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
          'website': 'https://www.skulpturenpark-heidelberg.de',
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
          'website': 'https://www.jazzhaus-hd.de/',
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
          'website': 'https://www.eckhausheidelberg.de/',
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
          'website': 'https://grabsteine.genealogy.net/namelist.php?cem=4612'
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
          'website': 'https://www.landgericht-heidelberg.de',
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
          'website': 'https://www.dekra.de/heidelberg/portal.html',
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
          'website': 'https://www.vrnnextbike.de'
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
          'website': 'https://www.heidelberg.dlrg.de'
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
let routes = [
  {
    'bbox': [
      6.0548,
      50.866659,
      97.06,
      6.081475,
      50.901925,
      155.99
    ],
    'type': 'Feature',
    'properties': {
      'ascent': 61.7,
      'descent': 35,
      'segments': [{
        'distance': 5.524,
        'duration': 1166.4,
        'steps': [{
          'distance': 0.051,
          'duration': 18.3,
          'type': 11,
          'instruction': 'Head east',
          'name': '-',
          'way_points': [
            0,
            4
          ]
        },
        {
          'distance': 0.088,
          'duration': 22.3,
          'type': 4,
          'instruction': 'Turn slight left',
          'name': '-',
          'way_points': [
            4,
            11
          ]
        },
        {
          'distance': 0.019,
          'duration': 3.7,
          'type': 1,
          'instruction': 'Turn right onto <b>Groenstergracht</b>',
          'name': 'Groenstergracht',
          'way_points': [
            11,
            14
          ]
        },
        {
          'distance': 0.203,
          'duration': 40.5,
          'type': 1,
          'instruction': 'Turn right onto <b>Waubacherweg</b>',
          'name': 'Waubacherweg',
          'way_points': [
            14,
            18
          ]
        },
        {
          'distance': 0.019,
          'duration': 3.8,
          'type': 1,
          'instruction': 'Turn right',
          'name': '-',
          'way_points': [
            18,
            21
          ]
        },
        {
          'distance': 0.03,
          'duration': 6,
          'type': 0,
          'instruction': 'Turn left',
          'name': '-',
          'way_points': [
            21,
            23
          ]
        },
        {
          'distance': 0.013,
          'duration': 2.7,
          'type': 0,
          'instruction': 'Turn left',
          'name': '-',
          'way_points': [
            23,
            26
          ]
        },
        {
          'distance': 0.574,
          'duration': 114.8,
          'type': 13,
          'instruction': 'Keep right',
          'name': '-',
          'way_points': [
            26,
            52
          ]
        },
        {
          'distance': 0.033,
          'duration': 6.6,
          'type': 5,
          'instruction': 'Turn slight right onto <b>Veldhofstraat</b>',
          'name': 'Veldhofstraat',
          'way_points': [
            52,
            55
          ]
        },
        {
          'distance': 0.864,
          'duration': 172.8,
          'type': 7,
          'instruction': 'Enter the roundabout and take the 2nd exit onto <b>Veldhofstraat</b>',
          'name': 'Veldhofstraat',
          'exit_number': 2,
          'way_points': [
            55,
            100
          ]
        },
        {
          'distance': 0.104,
          'duration': 20.9,
          'type': 6,
          'instruction': 'Continue straight onto <b>Haanraderstraat</b>',
          'name': 'Haanraderstraat',
          'way_points': [
            100,
            105
          ]
        },
        {
          'distance': 0.868,
          'duration': 173.6,
          'type': 1,
          'instruction': 'Turn right onto <b>Holzkuilerweg</b>',
          'name': 'Holzkuilerweg',
          'way_points': [
            105,
            145
          ]
        },
        {
          'distance': 0.568,
          'duration': 113.6,
          'type': 2,
          'instruction': 'Turn sharp left onto <b>Vinkerstraat</b>',
          'name': 'Vinkerstraat',
          'way_points': [
            145,
            164
          ]
        },
        {
          'distance': 0.073,
          'duration': 14.6,
          'type': 0,
          'instruction': 'Turn left onto <b>Kloosterbosstraat</b>',
          'name': 'Kloosterbosstraat',
          'way_points': [
            164,
            167
          ]
        },
        {
          'distance': 0.357,
          'duration': 80.4,
          'type': 1,
          'instruction': 'Turn right onto <b>Lichtenbergstraat</b>',
          'name': 'Lichtenbergstraat',
          'way_points': [
            167,
            177
          ]
        },
        {
          'distance': 0.116,
          'duration': 25.4,
          'type': 1,
          'instruction': 'Turn right onto <b>Deken Deutzlaan</b>',
          'name': 'Deken Deutzlaan',
          'way_points': [
            177,
            182
          ]
        },
        {
          'distance': 0.069,
          'duration': 13.7,
          'type': 0,
          'instruction': 'Turn left onto <b>Directeur van der Mühlenlaan</b>',
          'name': 'Directeur van der Mühlenlaan',
          'way_points': [
            182,
            188
          ]
        },
        {
          'distance': 0.657,
          'duration': 131.4,
          'type': 0,
          'instruction': 'Turn left',
          'name': '-',
          'way_points': [
            188,
            208
          ]
        },
        {
          'distance': 0.297,
          'duration': 59.4,
          'type': 0,
          'instruction': 'Turn left',
          'name': '-',
          'way_points': [
            208,
            223
          ]
        },
        {
          'distance': 0.11,
          'duration': 22.2,
          'type': 12,
          'instruction': 'Keep left',
          'name': '-',
          'way_points': [
            223,
            236
          ]
        },
        {
          'distance': 0.197,
          'duration': 44.4,
          'type': 12,
          'instruction': 'Keep left onto <b>Heyendallaan</b>',
          'name': 'Heyendallaan',
          'way_points': [
            236,
            242
          ]
        },
        {
          'distance': 0.042,
          'duration': 9.4,
          'type': 0,
          'instruction': 'Turn left onto <b>Heyendallaan</b>',
          'name': 'Heyendallaan',
          'way_points': [
            242,
            244
          ]
        },
        {
          'distance': 0.025,
          'duration': 6.3,
          'type': 12,
          'instruction': 'Keep left',
          'name': '-',
          'way_points': [
            244,
            247
          ]
        },
        {
          'distance': 0.084,
          'duration': 21.5,
          'type': 2,
          'instruction': 'Turn sharp left',
          'name': '-',
          'way_points': [
            247,
            255
          ]
        },
        {
          'distance': 0.045,
          'duration': 26.9,
          'type': 4,
          'instruction': 'Turn slight left',
          'name': '-',
          'way_points': [
            255,
            259
          ]
        },
        {
          'distance': 0.019,
          'duration': 11.1,
          'type': 0,
          'instruction': 'Turn left',
          'name': '-',
          'way_points': [
            259,
            261
          ]
        },
        {
          'distance': 0,
          'duration': 0,
          'type': 10,
          'instruction': 'Arrive at your destination, on the right',
          'name': '-',
          'way_points': [
            261,
            261
          ]
        }
        ],
        'ascent': 61.70739514487127,
        'descent': 35.012546130589044
      }],
      'extras': {
        'surface': {
          'values': [
            [
              0,
              7,
              12
            ],
            [
              7,
              43,
              3
            ],
            [
              43,
              52,
              0
            ],
            [
              52,
              145,
              3
            ],
            [
              145,
              155,
              1
            ],
            [
              155,
              167,
              3
            ],
            [
              167,
              170,
              14
            ],
            [
              170,
              179,
              3
            ],
            [
              179,
              182,
              14
            ],
            [
              182,
              255,
              3
            ],
            [
              255,
              261,
              0
            ]
          ],
          'summary': [{
            'value': 3,
            'distance': 4.8,
            'amount': 86.68
          },
          {
            'value': 1,
            'distance': 0.3,
            'amount': 6.17
          },
          {
            'value': 0,
            'distance': 0.2,
            'amount': 3.69
          },
          {
            'value': 14,
            'distance': 0.1,
            'amount': 2.01
          },
          {
            'value': 12,
            'distance': 0.1,
            'amount': 1.45
          }
          ]
        },
        'waytypes': {
          'values': [
            [
              0,
              7,
              4
            ],
            [
              7,
              11,
              3
            ],
            [
              11,
              14,
              5
            ],
            [
              14,
              18,
              2
            ],
            [
              18,
              52,
              6
            ],
            [
              52,
              105,
              2
            ],
            [
              105,
              133,
              6
            ],
            [
              133,
              177,
              3
            ],
            [
              177,
              182,
              2
            ],
            [
              182,
              188,
              3
            ],
            [
              188,
              235,
              6
            ],
            [
              235,
              244,
              2
            ],
            [
              244,
              255,
              3
            ],
            [
              255,
              261,
              7
            ]
          ],
          'summary': [{
            'value': 6,
            'distance': 2.3,
            'amount': 42.4
          },
          {
            'value': 2,
            'distance': 1.6,
            'amount': 28.33
          },
          {
            'value': 3,
            'distance': 1.5,
            'amount': 26.34
          },
          {
            'value': 4,
            'distance': 0.1,
            'amount': 1.45
          },
          {
            'value': 7,
            'distance': 0.1,
            'amount': 1.15
          },
          {
            'value': 5,
            'distance': 0,
            'amount': 0.34
          }
          ]
        },
        'steepness': {
          'values': [
            [
              0,
              58,
              -1
            ],
            [
              58,
              155,
              1
            ],
            [
              155,
              261,
              0
            ]
          ],
          'summary': [{
            'value': 0,
            'distance': 2.3,
            'amount': 41.95
          },
          {
            'value': 1,
            'distance': 2.2,
            'amount': 39.26
          },
          {
            'value': -1,
            'distance': 1,
            'amount': 18.79
          }
          ]
        }
      },
      'summary': {
        'distance': 5.524,
        'duration': 1166.4
      },
      'way_points': [
        0,
        261
      ],
      'opacity': 0.9
    },
    'geometry': {
      'coordinates': [
        [
          6.0548,
          50.901417,
          123.9
        ],
        [
          6.05513,
          50.901463,
          123.8
        ],
        [
          6.055421,
          50.901475,
          123.6
        ],
        [
          6.055487,
          50.901494,
          123.5
        ],
        [
          6.055497,
          50.901502,
          123.3
        ],
        [
          6.055501,
          50.901518,
          123.1
        ],
        [
          6.055502,
          50.901656,
          123
        ],
        [
          6.055669,
          50.901678,
          122.9
        ],
        [
          6.055751,
          50.901705,
          122.7
        ],
        [
          6.056333,
          50.901864,
          122.1
        ],
        [
          6.056371,
          50.901902,
          122
        ],
        [
          6.056384,
          50.901925,
          121.8
        ],
        [
          6.056419,
          50.901916,
          121.7
        ],
        [
          6.056563,
          50.901888,
          121.5
        ],
        [
          6.056639,
          50.901877,
          121.4
        ],
        [
          6.056603,
          50.901155,
          119.8
        ],
        [
          6.056607,
          50.900885,
          119.4
        ],
        [
          6.056642,
          50.900609,
          119.1
        ],
        [
          6.056749,
          50.90006,
          119
        ],
        [
          6.056618,
          50.900043,
          119
        ],
        [
          6.056562,
          50.899994,
          119
        ],
        [
          6.056534,
          50.899976,
          119
        ],
        [
          6.05655,
          50.899836,
          118.8
        ],
        [
          6.056585,
          50.899706,
          118.6
        ],
        [
          6.056635,
          50.899687,
          118.4
        ],
        [
          6.056693,
          50.899663,
          118.2
        ],
        [
          6.056743,
          50.899639,
          118
        ],
        [
          6.056765,
          50.899593,
          117.8
        ],
        [
          6.056965,
          50.899161,
          116.8
        ],
        [
          6.05728,
          50.898704,
          115.8
        ],
        [
          6.057606,
          50.898296,
          115
        ],
        [
          6.057981,
          50.897832,
          115
        ],
        [
          6.058035,
          50.897765,
          114.7
        ],
        [
          6.05836,
          50.897364,
          113.3
        ],
        [
          6.058448,
          50.897222,
          112.9
        ],
        [
          6.058534,
          50.897049,
          112.1
        ],
        [
          6.058562,
          50.897004,
          111.7
        ],
        [
          6.058626,
          50.896836,
          111.3
        ],
        [
          6.058654,
          50.896723,
          110.9
        ],
        [
          6.058668,
          50.896665,
          110.5
        ],
        [
          6.058684,
          50.896488,
          110.1
        ],
        [
          6.058731,
          50.896376,
          109.7
        ],
        [
          6.058695,
          50.896214,
          109.3
        ],
        [
          6.058647,
          50.896005,
          108.5
        ],
        [
          6.058561,
          50.895725,
          107.6
        ],
        [
          6.058476,
          50.895441,
          106.8
        ],
        [
          6.058472,
          50.895392,
          106.5
        ],
        [
          6.058495,
          50.895288,
          106.2
        ],
        [
          6.058529,
          50.895165,
          106
        ],
        [
          6.058567,
          50.895095,
          105.8
        ],
        [
          6.058704,
          50.894933,
          105.4
        ],
        [
          6.058797,
          50.894873,
          105.2
        ],
        [
          6.058891,
          50.894836,
          105
        ],
        [
          6.059014,
          50.894694,
          104.8
        ],
        [
          6.059069,
          50.894636,
          104.6
        ],
        [
          6.059118,
          50.894576,
          104.4
        ],
        [
          6.059098,
          50.894569,
          104.2
        ],
        [
          6.05904,
          50.894527,
          104
        ],
        [
          6.05903,
          50.894479,
          103.8
        ],
        [
          6.059037,
          50.894459,
          103.6
        ],
        [
          6.059056,
          50.894437,
          103.4
        ],
        [
          6.059117,
          50.894406,
          103.2
        ],
        [
          6.059234,
          50.894406,
          103.1
        ],
        [
          6.059268,
          50.894419,
          103
        ],
        [
          6.059341,
          50.894364,
          103
        ],
        [
          6.059459,
          50.894278,
          103
        ],
        [
          6.059782,
          50.894053,
          103
        ],
        [
          6.059877,
          50.894003,
          103
        ],
        [
          6.059994,
          50.893938,
          103
        ],
        [
          6.060096,
          50.89388,
          103
        ],
        [
          6.060225,
          50.893824,
          103
        ],
        [
          6.060408,
          50.893754,
          102.8
        ],
        [
          6.06059,
          50.893681,
          102.6
        ],
        [
          6.06087,
          50.893576,
          102.1
        ],
        [
          6.061777,
          50.893294,
          100.5
        ],
        [
          6.062131,
          50.893194,
          99.9
        ],
        [
          6.062633,
          50.893023,
          99
        ],
        [
          6.063005,
          50.892879,
          98.1
        ],
        [
          6.063152,
          50.892823,
          97.9
        ],
        [
          6.063444,
          50.892684,
          97.6
        ],
        [
          6.063607,
          50.892604,
          97.6
        ],
        [
          6.063974,
          50.892372,
          97.3
        ],
        [
          6.064264,
          50.892128,
          97.2
        ],
        [
          6.064359,
          50.892023,
          97.1
        ],
        [
          6.064432,
          50.891942,
          97.1
        ],
        [
          6.064481,
          50.891879,
          97.1
        ],
        [
          6.064552,
          50.891759,
          97.2
        ],
        [
          6.064646,
          50.891598,
          97.5
        ],
        [
          6.064735,
          50.891448,
          98.2
        ],
        [
          6.064746,
          50.891429,
          98.8
        ],
        [
          6.065052,
          50.891082,
          101.4
        ],
        [
          6.065243,
          50.890892,
          102.7
        ],
        [
          6.065381,
          50.890778,
          103.4
        ],
        [
          6.065847,
          50.890442,
          106
        ],
        [
          6.066001,
          50.890328,
          106.6
        ],
        [
          6.066017,
          50.890319,
          107.3
        ],
        [
          6.066231,
          50.890165,
          108.4
        ],
        [
          6.066614,
          50.889894,
          109.3
        ],
        [
          6.066849,
          50.88973,
          109.1
        ],
        [
          6.067267,
          50.889453,
          108.6
        ],
        [
          6.067493,
          50.889317,
          108.9
        ],
        [
          6.067629,
          50.88924,
          109.1
        ],
        [
          6.067692,
          50.889213,
          109.2
        ],
        [
          6.06833,
          50.888999,
          110.1
        ],
        [
          6.068677,
          50.888842,
          110.9
        ],
        [
          6.068736,
          50.888807,
          111
        ],
        [
          6.06864,
          50.888738,
          111.2
        ],
        [
          6.068128,
          50.888469,
          112.1
        ],
        [
          6.068028,
          50.8884,
          112.4
        ],
        [
          6.067397,
          50.887948,
          113.4
        ],
        [
          6.067024,
          50.887694,
          113.9
        ],
        [
          6.066696,
          50.887436,
          114.3
        ],
        [
          6.066609,
          50.887298,
          114.5
        ],
        [
          6.066543,
          50.887017,
          115.5
        ],
        [
          6.066536,
          50.886973,
          116
        ],
        [
          6.066531,
          50.88689,
          116.5
        ],
        [
          6.06654,
          50.886802,
          117.1
        ],
        [
          6.06654,
          50.886394,
          118.9
        ],
        [
          6.066497,
          50.885802,
          121.3
        ],
        [
          6.066482,
          50.885695,
          121.7
        ],
        [
          6.066431,
          50.885567,
          122.2
        ],
        [
          6.066366,
          50.885439,
          122.6
        ],
        [
          6.06635,
          50.885408,
          123.1
        ],
        [
          6.066258,
          50.885313,
          123.4
        ],
        [
          6.066112,
          50.885118,
          124
        ],
        [
          6.06606,
          50.884971,
          124
        ],
        [
          6.066122,
          50.884851,
          124
        ],
        [
          6.066312,
          50.884694,
          124
        ],
        [
          6.066393,
          50.884328,
          123.9
        ],
        [
          6.066373,
          50.884267,
          123.9
        ],
        [
          6.066034,
          50.88405,
          123.7
        ],
        [
          6.065933,
          50.883967,
          123.6
        ],
        [
          6.065825,
          50.883831,
          123.5
        ],
        [
          6.065793,
          50.883752,
          123.4
        ],
        [
          6.06574,
          50.88361,
          123.3
        ],
        [
          6.065734,
          50.883593,
          123.2
        ],
        [
          6.065711,
          50.883522,
          123.3
        ],
        [
          6.065659,
          50.883265,
          123.4
        ],
        [
          6.065634,
          50.88295,
          123.7
        ],
        [
          6.065631,
          50.882924,
          124.1
        ],
        [
          6.065583,
          50.882635,
          125.3
        ],
        [
          6.065503,
          50.882261,
          126.9
        ],
        [
          6.065449,
          50.882194,
          127.3
        ],
        [
          6.065364,
          50.882139,
          127.7
        ],
        [
          6.065038,
          50.882014,
          128.5
        ],
        [
          6.064935,
          50.881953,
          128.9
        ],
        [
          6.065763,
          50.881697,
          130.7
        ],
        [
          6.065934,
          50.881651,
          131
        ],
        [
          6.066041,
          50.881643,
          131
        ],
        [
          6.066147,
          50.881607,
          131
        ],
        [
          6.066339,
          50.881531,
          131
        ],
        [
          6.066529,
          50.881397,
          131.1
        ],
        [
          6.066843,
          50.881129,
          131.5
        ],
        [
          6.068009,
          50.880346,
          135.4
        ],
        [
          6.068507,
          50.880016,
          137.9
        ],
        [
          6.068529,
          50.879984,
          138.3
        ],
        [
          6.068572,
          50.879914,
          138.8
        ],
        [
          6.068759,
          50.87953,
          140.5
        ],
        [
          6.068821,
          50.879218,
          141.4
        ],
        [
          6.068869,
          50.878982,
          142.3
        ],
        [
          6.06891,
          50.878737,
          143.1
        ],
        [
          6.068956,
          50.878564,
          143.5
        ],
        [
          6.069037,
          50.878374,
          144.2
        ],
        [
          6.069233,
          50.87812,
          145.3
        ],
        [
          6.069347,
          50.878031,
          145.6
        ],
        [
          6.069775,
          50.878272,
          146.7
        ],
        [
          6.07,
          50.878404,
          147.2
        ],
        [
          6.070141,
          50.87845,
          147.4
        ],
        [
          6.070165,
          50.878399,
          147.6
        ],
        [
          6.070346,
          50.878145,
          148
        ],
        [
          6.070658,
          50.877715,
          148
        ],
        [
          6.07077,
          50.877581,
          148.1
        ],
        [
          6.07174,
          50.87648,
          150.6
        ],
        [
          6.071852,
          50.876337,
          150.9
        ],
        [
          6.072296,
          50.875821,
          152.2
        ],
        [
          6.072356,
          50.875757,
          152.3
        ],
        [
          6.072432,
          50.875698,
          152.4
        ],
        [
          6.072547,
          50.875627,
          152.5
        ],
        [
          6.072053,
          50.875303,
          152.8
        ],
        [
          6.071602,
          50.875018,
          153
        ],
        [
          6.071563,
          50.874994,
          153
        ],
        [
          6.071423,
          50.874912,
          153
        ],
        [
          6.07138,
          50.874886,
          153
        ],
        [
          6.071467,
          50.874821,
          153.1
        ],
        [
          6.07178,
          50.87453,
          153.3
        ],
        [
          6.071817,
          50.874493,
          153.4
        ],
        [
          6.07185,
          50.874448,
          153.5
        ],
        [
          6.071844,
          50.874405,
          153.6
        ],
        [
          6.071818,
          50.874364,
          153.7
        ],
        [
          6.071909,
          50.874331,
          153.8
        ],
        [
          6.072209,
          50.874235,
          153.9
        ],
        [
          6.072379,
          50.874143,
          154
        ],
        [
          6.073044,
          50.873528,
          154.3
        ],
        [
          6.073704,
          50.872992,
          153.7
        ],
        [
          6.074016,
          50.872678,
          153.2
        ],
        [
          6.074276,
          50.872358,
          153
        ],
        [
          6.07435,
          50.872276,
          153.1
        ],
        [
          6.074455,
          50.872188,
          153.1
        ],
        [
          6.074692,
          50.871994,
          153.3
        ],
        [
          6.075109,
          50.871492,
          153.8
        ],
        [
          6.075474,
          50.870997,
          154.5
        ],
        [
          6.075812,
          50.870499,
          155.1
        ],
        [
          6.076001,
          50.870183,
          155.2
        ],
        [
          6.076154,
          50.869858,
          155.3
        ],
        [
          6.076224,
          50.869616,
          155.5
        ],
        [
          6.076235,
          50.8695,
          155.5
        ],
        [
          6.076212,
          50.869447,
          155.6
        ],
        [
          6.076132,
          50.86936,
          155.6
        ],
        [
          6.076093,
          50.869337,
          155.7
        ],
        [
          6.076121,
          50.86926,
          155.7
        ],
        [
          6.076142,
          50.869215,
          155.8
        ],
        [
          6.076151,
          50.869195,
          155.8
        ],
        [
          6.07618,
          50.869172,
          155.8
        ],
        [
          6.076245,
          50.869167,
          155.9
        ],
        [
          6.076407,
          50.869115,
          155.9
        ],
        [
          6.076436,
          50.869097,
          155.9
        ],
        [
          6.076546,
          50.868974,
          155.9
        ],
        [
          6.076707,
          50.868738,
          156
        ],
        [
          6.07685,
          50.868432,
          156
        ],
        [
          6.077344,
          50.867093,
          155.8
        ],
        [
          6.077359,
          50.867,
          155.7
        ],
        [
          6.077327,
          50.866958,
          155.7
        ],
        [
          6.077298,
          50.866925,
          155.6
        ],
        [
          6.077266,
          50.866891,
          155.6
        ],
        [
          6.077286,
          50.866829,
          155.5
        ],
        [
          6.077306,
          50.866782,
          155.5
        ],
        [
          6.077329,
          50.866721,
          155.4
        ],
        [
          6.077379,
          50.866697,
          155.4
        ],
        [
          6.077449,
          50.866673,
          155.3
        ],
        [
          6.077489,
          50.866662,
          155.3
        ],
        [
          6.077546,
          50.866659,
          155.3
        ],
        [
          6.0777,
          50.866679,
          155.2
        ],
        [
          6.077812,
          50.866712,
          155.2
        ],
        [
          6.077973,
          50.866823,
          155.2
        ],
        [
          6.078207,
          50.86691,
          155.1
        ],
        [
          6.07835,
          50.866981,
          155.1
        ],
        [
          6.07842,
          50.866997,
          155.1
        ],
        [
          6.078577,
          50.867088,
          155
        ],
        [
          6.079518,
          50.867443,
          154.5
        ],
        [
          6.080204,
          50.867708,
          154
        ],
        [
          6.080366,
          50.867798,
          153.9
        ],
        [
          6.080711,
          50.867792,
          153.7
        ],
        [
          6.080851,
          50.867792,
          153.6
        ],
        [
          6.080956,
          50.867894,
          153.5
        ],
        [
          6.08121,
          50.868091,
          153.4
        ],
        [
          6.081351,
          50.868204,
          153.3
        ],
        [
          6.081408,
          50.868213,
          153.3
        ],
        [
          6.081463,
          50.868194,
          153.3
        ],
        [
          6.081475,
          50.86823,
          153.3
        ],
        [
          6.081471,
          50.86827,
          153.2
        ],
        [
          6.081448,
          50.868286,
          153.2
        ],
        [
          6.081201,
          50.868313,
          153.1
        ],
        [
          6.081173,
          50.868345,
          153
        ],
        [
          6.081355,
          50.868501,
          152.8
        ],
        [
          6.081409,
          50.868656,
          152.7
        ],
        [
          6.081447,
          50.868756,
          152.3
        ],
        [
          6.081447,
          50.86879,
          151.9
        ],
        [
          6.081397,
          50.868877,
          151.5
        ],
        [
          6.081298,
          50.868968,
          151.1
        ],
        [
          6.081143,
          50.869103,
          150.7
        ],
        [
          6.080965,
          50.869112,
          150.7
        ],
        [
          6.080904,
          50.869101,
          150.6
        ]
      ],
      'type': 'LineString'
    },
    'summary': {
      'distance': 5.524,
      'duration': 1166.4,
      'descent': 35,
      'ascent': 61.7,
      'unit': 'km',
      'originalUnit': 'km'
    }
  }
]
let routePlaces = [
  new Place(6.054840087890626, 50.90130070888041, 'Waubacherweg, Eygelshoven,LB,Netherlands'),
  new Place(6.080245971679688, 50.87054481536601, 'Kanunnik Kruyderpad, Kerkrade,LB,Netherlands')
]

let rawData = {
  'type': 'FeatureCollection',
  'features': [
    {
      'bbox': [
        6.0548,
        50.866659,
        97.06,
        6.081475,
        50.901925,
        155.99
      ],
      'type': 'Feature',
      'properties': {
        'ascent': 61.7,
        'descent': 35,
        'segments': [
          {
            'distance': 5.524,
            'duration': 1166.4,
            'steps': [
              {
                'distance': 0.051,
                'duration': 18.3,
                'type': 11,
                'instruction': 'Head east',
                'name': '-',
                'way_points': [
                  0,
                  4
                ]
              },
              {
                'distance': 0.088,
                'duration': 22.3,
                'type': 4,
                'instruction': 'Turn slight left',
                'name': '-',
                'way_points': [
                  4,
                  11
                ]
              },
              {
                'distance': 0.019,
                'duration': 3.7,
                'type': 1,
                'instruction': 'Turn right onto <b>Groenstergracht</b>',
                'name': 'Groenstergracht',
                'way_points': [
                  11,
                  14
                ]
              },
              {
                'distance': 0.203,
                'duration': 40.5,
                'type': 1,
                'instruction': 'Turn right onto <b>Waubacherweg</b>',
                'name': 'Waubacherweg',
                'way_points': [
                  14,
                  18
                ]
              },
              {
                'distance': 0.019,
                'duration': 3.8,
                'type': 1,
                'instruction': 'Turn right',
                'name': '-',
                'way_points': [
                  18,
                  21
                ]
              },
              {
                'distance': 0.03,
                'duration': 6,
                'type': 0,
                'instruction': 'Turn left',
                'name': '-',
                'way_points': [
                  21,
                  23
                ]
              },
              {
                'distance': 0.013,
                'duration': 2.7,
                'type': 0,
                'instruction': 'Turn left',
                'name': '-',
                'way_points': [
                  23,
                  26
                ]
              },
              {
                'distance': 0.574,
                'duration': 114.8,
                'type': 13,
                'instruction': 'Keep right',
                'name': '-',
                'way_points': [
                  26,
                  52
                ]
              },
              {
                'distance': 0.033,
                'duration': 6.6,
                'type': 5,
                'instruction': 'Turn slight right onto <b>Veldhofstraat</b>',
                'name': 'Veldhofstraat',
                'way_points': [
                  52,
                  55
                ]
              },
              {
                'distance': 0.864,
                'duration': 172.8,
                'type': 7,
                'instruction': 'Enter the roundabout and take the 2nd exit onto <b>Veldhofstraat</b>',
                'name': 'Veldhofstraat',
                'exit_number': 2,
                'way_points': [
                  55,
                  100
                ]
              },
              {
                'distance': 0.104,
                'duration': 20.9,
                'type': 6,
                'instruction': 'Continue straight onto <b>Haanraderstraat</b>',
                'name': 'Haanraderstraat',
                'way_points': [
                  100,
                  105
                ]
              },
              {
                'distance': 0.868,
                'duration': 173.6,
                'type': 1,
                'instruction': 'Turn right onto <b>Holzkuilerweg</b>',
                'name': 'Holzkuilerweg',
                'way_points': [
                  105,
                  145
                ]
              },
              {
                'distance': 0.568,
                'duration': 113.6,
                'type': 2,
                'instruction': 'Turn sharp left onto <b>Vinkerstraat</b>',
                'name': 'Vinkerstraat',
                'way_points': [
                  145,
                  164
                ]
              },
              {
                'distance': 0.073,
                'duration': 14.6,
                'type': 0,
                'instruction': 'Turn left onto <b>Kloosterbosstraat</b>',
                'name': 'Kloosterbosstraat',
                'way_points': [
                  164,
                  167
                ]
              },
              {
                'distance': 0.357,
                'duration': 80.4,
                'type': 1,
                'instruction': 'Turn right onto <b>Lichtenbergstraat</b>',
                'name': 'Lichtenbergstraat',
                'way_points': [
                  167,
                  177
                ]
              },
              {
                'distance': 0.116,
                'duration': 25.4,
                'type': 1,
                'instruction': 'Turn right onto <b>Deken Deutzlaan</b>',
                'name': 'Deken Deutzlaan',
                'way_points': [
                  177,
                  182
                ]
              },
              {
                'distance': 0.069,
                'duration': 13.7,
                'type': 0,
                'instruction': 'Turn left onto <b>Directeur van der Mühlenlaan</b>',
                'name': 'Directeur van der Mühlenlaan',
                'way_points': [
                  182,
                  188
                ]
              },
              {
                'distance': 0.657,
                'duration': 131.4,
                'type': 0,
                'instruction': 'Turn left',
                'name': '-',
                'way_points': [
                  188,
                  208
                ]
              },
              {
                'distance': 0.297,
                'duration': 59.4,
                'type': 0,
                'instruction': 'Turn left',
                'name': '-',
                'way_points': [
                  208,
                  223
                ]
              },
              {
                'distance': 0.11,
                'duration': 22.2,
                'type': 12,
                'instruction': 'Keep left',
                'name': '-',
                'way_points': [
                  223,
                  236
                ]
              },
              {
                'distance': 0.197,
                'duration': 44.4,
                'type': 12,
                'instruction': 'Keep left onto <b>Heyendallaan</b>',
                'name': 'Heyendallaan',
                'way_points': [
                  236,
                  242
                ]
              },
              {
                'distance': 0.042,
                'duration': 9.4,
                'type': 0,
                'instruction': 'Turn left onto <b>Heyendallaan</b>',
                'name': 'Heyendallaan',
                'way_points': [
                  242,
                  244
                ]
              },
              {
                'distance': 0.025,
                'duration': 6.3,
                'type': 12,
                'instruction': 'Keep left',
                'name': '-',
                'way_points': [
                  244,
                  247
                ]
              },
              {
                'distance': 0.084,
                'duration': 21.5,
                'type': 2,
                'instruction': 'Turn sharp left',
                'name': '-',
                'way_points': [
                  247,
                  255
                ]
              },
              {
                'distance': 0.045,
                'duration': 26.9,
                'type': 4,
                'instruction': 'Turn slight left',
                'name': '-',
                'way_points': [
                  255,
                  259
                ]
              },
              {
                'distance': 0.019,
                'duration': 11.1,
                'type': 0,
                'instruction': 'Turn left',
                'name': '-',
                'way_points': [
                  259,
                  261
                ]
              },
              {
                'distance': 0,
                'duration': 0,
                'type': 10,
                'instruction': 'Arrive at your destination, on the right',
                'name': '-',
                'way_points': [
                  261,
                  261
                ]
              }
            ],
            'ascent': 61.70739514487127,
            'descent': 35.012546130589044
          }
        ],
        'extras': {
          'surface': {
            'values': [
              [
                0,
                7,
                12
              ],
              [
                7,
                43,
                3
              ],
              [
                43,
                52,
                0
              ],
              [
                52,
                145,
                3
              ],
              [
                145,
                155,
                1
              ],
              [
                155,
                167,
                3
              ],
              [
                167,
                170,
                14
              ],
              [
                170,
                179,
                3
              ],
              [
                179,
                182,
                14
              ],
              [
                182,
                255,
                3
              ],
              [
                255,
                261,
                0
              ]
            ],
            'summary': [
              {
                'value': 3,
                'distance': 4.8,
                'amount': 86.68
              },
              {
                'value': 1,
                'distance': 0.3,
                'amount': 6.17
              },
              {
                'value': 0,
                'distance': 0.2,
                'amount': 3.69
              },
              {
                'value': 14,
                'distance': 0.1,
                'amount': 2.01
              },
              {
                'value': 12,
                'distance': 0.1,
                'amount': 1.45
              }
            ]
          },
          'waytypes': {
            'values': [
              [
                0,
                7,
                4
              ],
              [
                7,
                11,
                3
              ],
              [
                11,
                14,
                5
              ],
              [
                14,
                18,
                2
              ],
              [
                18,
                52,
                6
              ],
              [
                52,
                105,
                2
              ],
              [
                105,
                133,
                6
              ],
              [
                133,
                177,
                3
              ],
              [
                177,
                182,
                2
              ],
              [
                182,
                188,
                3
              ],
              [
                188,
                235,
                6
              ],
              [
                235,
                244,
                2
              ],
              [
                244,
                255,
                3
              ],
              [
                255,
                261,
                7
              ]
            ],
            'summary': [
              {
                'value': 6,
                'distance': 2.3,
                'amount': 42.4
              },
              {
                'value': 2,
                'distance': 1.6,
                'amount': 28.33
              },
              {
                'value': 3,
                'distance': 1.5,
                'amount': 26.34
              },
              {
                'value': 4,
                'distance': 0.1,
                'amount': 1.45
              },
              {
                'value': 7,
                'distance': 0.1,
                'amount': 1.15
              },
              {
                'value': 5,
                'distance': 0,
                'amount': 0.34
              }
            ]
          },
          'steepness': {
            'values': [
              [
                0,
                58,
                -1
              ],
              [
                58,
                155,
                1
              ],
              [
                155,
                261,
                0
              ]
            ],
            'summary': [
              {
                'value': 0,
                'distance': 2.3,
                'amount': 41.95
              },
              {
                'value': 1,
                'distance': 2.2,
                'amount': 39.26
              },
              {
                'value': -1,
                'distance': 1,
                'amount': 18.79
              }
            ]
          }
        },
        'summary': {
          'distance': 5.524,
          'duration': 1166.4
        },
        'way_points': [
          0,
          261
        ]
      },
      'geometry': {
        'coordinates': [
          [
            6.0548,
            50.901417,
            123.9
          ],
          [
            6.05513,
            50.901463,
            123.8
          ],
          [
            6.055421,
            50.901475,
            123.6
          ],
          [
            6.055487,
            50.901494,
            123.5
          ],
          [
            6.055497,
            50.901502,
            123.3
          ],
          [
            6.055501,
            50.901518,
            123.1
          ],
          [
            6.055502,
            50.901656,
            123
          ],
          [
            6.055669,
            50.901678,
            122.9
          ],
          [
            6.055751,
            50.901705,
            122.7
          ],
          [
            6.056333,
            50.901864,
            122.1
          ],
          [
            6.056371,
            50.901902,
            122
          ],
          [
            6.056384,
            50.901925,
            121.8
          ],
          [
            6.056419,
            50.901916,
            121.7
          ],
          [
            6.056563,
            50.901888,
            121.5
          ],
          [
            6.056639,
            50.901877,
            121.4
          ],
          [
            6.056603,
            50.901155,
            119.8
          ],
          [
            6.056607,
            50.900885,
            119.4
          ],
          [
            6.056642,
            50.900609,
            119.1
          ],
          [
            6.056749,
            50.90006,
            119
          ],
          [
            6.056618,
            50.900043,
            119
          ],
          [
            6.056562,
            50.899994,
            119
          ],
          [
            6.056534,
            50.899976,
            119
          ],
          [
            6.05655,
            50.899836,
            118.8
          ],
          [
            6.056585,
            50.899706,
            118.6
          ],
          [
            6.056635,
            50.899687,
            118.4
          ],
          [
            6.056693,
            50.899663,
            118.2
          ],
          [
            6.056743,
            50.899639,
            118
          ],
          [
            6.056765,
            50.899593,
            117.8
          ],
          [
            6.056965,
            50.899161,
            116.8
          ],
          [
            6.05728,
            50.898704,
            115.8
          ],
          [
            6.057606,
            50.898296,
            115
          ],
          [
            6.057981,
            50.897832,
            115
          ],
          [
            6.058035,
            50.897765,
            114.7
          ],
          [
            6.05836,
            50.897364,
            113.3
          ],
          [
            6.058448,
            50.897222,
            112.9
          ],
          [
            6.058534,
            50.897049,
            112.1
          ],
          [
            6.058562,
            50.897004,
            111.7
          ],
          [
            6.058626,
            50.896836,
            111.3
          ],
          [
            6.058654,
            50.896723,
            110.9
          ],
          [
            6.058668,
            50.896665,
            110.5
          ],
          [
            6.058684,
            50.896488,
            110.1
          ],
          [
            6.058731,
            50.896376,
            109.7
          ],
          [
            6.058695,
            50.896214,
            109.3
          ],
          [
            6.058647,
            50.896005,
            108.5
          ],
          [
            6.058561,
            50.895725,
            107.6
          ],
          [
            6.058476,
            50.895441,
            106.8
          ],
          [
            6.058472,
            50.895392,
            106.5
          ],
          [
            6.058495,
            50.895288,
            106.2
          ],
          [
            6.058529,
            50.895165,
            106
          ],
          [
            6.058567,
            50.895095,
            105.8
          ],
          [
            6.058704,
            50.894933,
            105.4
          ],
          [
            6.058797,
            50.894873,
            105.2
          ],
          [
            6.058891,
            50.894836,
            105
          ],
          [
            6.059014,
            50.894694,
            104.8
          ],
          [
            6.059069,
            50.894636,
            104.6
          ],
          [
            6.059118,
            50.894576,
            104.4
          ],
          [
            6.059098,
            50.894569,
            104.2
          ],
          [
            6.05904,
            50.894527,
            104
          ],
          [
            6.05903,
            50.894479,
            103.8
          ],
          [
            6.059037,
            50.894459,
            103.6
          ],
          [
            6.059056,
            50.894437,
            103.4
          ],
          [
            6.059117,
            50.894406,
            103.2
          ],
          [
            6.059234,
            50.894406,
            103.1
          ],
          [
            6.059268,
            50.894419,
            103
          ],
          [
            6.059341,
            50.894364,
            103
          ],
          [
            6.059459,
            50.894278,
            103
          ],
          [
            6.059782,
            50.894053,
            103
          ],
          [
            6.059877,
            50.894003,
            103
          ],
          [
            6.059994,
            50.893938,
            103
          ],
          [
            6.060096,
            50.89388,
            103
          ],
          [
            6.060225,
            50.893824,
            103
          ],
          [
            6.060408,
            50.893754,
            102.8
          ],
          [
            6.06059,
            50.893681,
            102.6
          ],
          [
            6.06087,
            50.893576,
            102.1
          ],
          [
            6.061777,
            50.893294,
            100.5
          ],
          [
            6.062131,
            50.893194,
            99.9
          ],
          [
            6.062633,
            50.893023,
            99
          ],
          [
            6.063005,
            50.892879,
            98.1
          ],
          [
            6.063152,
            50.892823,
            97.9
          ],
          [
            6.063444,
            50.892684,
            97.6
          ],
          [
            6.063607,
            50.892604,
            97.6
          ],
          [
            6.063974,
            50.892372,
            97.3
          ],
          [
            6.064264,
            50.892128,
            97.2
          ],
          [
            6.064359,
            50.892023,
            97.1
          ],
          [
            6.064432,
            50.891942,
            97.1
          ],
          [
            6.064481,
            50.891879,
            97.1
          ],
          [
            6.064552,
            50.891759,
            97.2
          ],
          [
            6.064646,
            50.891598,
            97.5
          ],
          [
            6.064735,
            50.891448,
            98.2
          ],
          [
            6.064746,
            50.891429,
            98.8
          ],
          [
            6.065052,
            50.891082,
            101.4
          ],
          [
            6.065243,
            50.890892,
            102.7
          ],
          [
            6.065381,
            50.890778,
            103.4
          ],
          [
            6.065847,
            50.890442,
            106
          ],
          [
            6.066001,
            50.890328,
            106.6
          ],
          [
            6.066017,
            50.890319,
            107.3
          ],
          [
            6.066231,
            50.890165,
            108.4
          ],
          [
            6.066614,
            50.889894,
            109.3
          ],
          [
            6.066849,
            50.88973,
            109.1
          ],
          [
            6.067267,
            50.889453,
            108.6
          ],
          [
            6.067493,
            50.889317,
            108.9
          ],
          [
            6.067629,
            50.88924,
            109.1
          ],
          [
            6.067692,
            50.889213,
            109.2
          ],
          [
            6.06833,
            50.888999,
            110.1
          ],
          [
            6.068677,
            50.888842,
            110.9
          ],
          [
            6.068736,
            50.888807,
            111
          ],
          [
            6.06864,
            50.888738,
            111.2
          ],
          [
            6.068128,
            50.888469,
            112.1
          ],
          [
            6.068028,
            50.8884,
            112.4
          ],
          [
            6.067397,
            50.887948,
            113.4
          ],
          [
            6.067024,
            50.887694,
            113.9
          ],
          [
            6.066696,
            50.887436,
            114.3
          ],
          [
            6.066609,
            50.887298,
            114.5
          ],
          [
            6.066543,
            50.887017,
            115.5
          ],
          [
            6.066536,
            50.886973,
            116
          ],
          [
            6.066531,
            50.88689,
            116.5
          ],
          [
            6.06654,
            50.886802,
            117.1
          ],
          [
            6.06654,
            50.886394,
            118.9
          ],
          [
            6.066497,
            50.885802,
            121.3
          ],
          [
            6.066482,
            50.885695,
            121.7
          ],
          [
            6.066431,
            50.885567,
            122.2
          ],
          [
            6.066366,
            50.885439,
            122.6
          ],
          [
            6.06635,
            50.885408,
            123.1
          ],
          [
            6.066258,
            50.885313,
            123.4
          ],
          [
            6.066112,
            50.885118,
            124
          ],
          [
            6.06606,
            50.884971,
            124
          ],
          [
            6.066122,
            50.884851,
            124
          ],
          [
            6.066312,
            50.884694,
            124
          ],
          [
            6.066393,
            50.884328,
            123.9
          ],
          [
            6.066373,
            50.884267,
            123.9
          ],
          [
            6.066034,
            50.88405,
            123.7
          ],
          [
            6.065933,
            50.883967,
            123.6
          ],
          [
            6.065825,
            50.883831,
            123.5
          ],
          [
            6.065793,
            50.883752,
            123.4
          ],
          [
            6.06574,
            50.88361,
            123.3
          ],
          [
            6.065734,
            50.883593,
            123.2
          ],
          [
            6.065711,
            50.883522,
            123.3
          ],
          [
            6.065659,
            50.883265,
            123.4
          ],
          [
            6.065634,
            50.88295,
            123.7
          ],
          [
            6.065631,
            50.882924,
            124.1
          ],
          [
            6.065583,
            50.882635,
            125.3
          ],
          [
            6.065503,
            50.882261,
            126.9
          ],
          [
            6.065449,
            50.882194,
            127.3
          ],
          [
            6.065364,
            50.882139,
            127.7
          ],
          [
            6.065038,
            50.882014,
            128.5
          ],
          [
            6.064935,
            50.881953,
            128.9
          ],
          [
            6.065763,
            50.881697,
            130.7
          ],
          [
            6.065934,
            50.881651,
            131
          ],
          [
            6.066041,
            50.881643,
            131
          ],
          [
            6.066147,
            50.881607,
            131
          ],
          [
            6.066339,
            50.881531,
            131
          ],
          [
            6.066529,
            50.881397,
            131.1
          ],
          [
            6.066843,
            50.881129,
            131.5
          ],
          [
            6.068009,
            50.880346,
            135.4
          ],
          [
            6.068507,
            50.880016,
            137.9
          ],
          [
            6.068529,
            50.879984,
            138.3
          ],
          [
            6.068572,
            50.879914,
            138.8
          ],
          [
            6.068759,
            50.87953,
            140.5
          ],
          [
            6.068821,
            50.879218,
            141.4
          ],
          [
            6.068869,
            50.878982,
            142.3
          ],
          [
            6.06891,
            50.878737,
            143.1
          ],
          [
            6.068956,
            50.878564,
            143.5
          ],
          [
            6.069037,
            50.878374,
            144.2
          ],
          [
            6.069233,
            50.87812,
            145.3
          ],
          [
            6.069347,
            50.878031,
            145.6
          ],
          [
            6.069775,
            50.878272,
            146.7
          ],
          [
            6.07,
            50.878404,
            147.2
          ],
          [
            6.070141,
            50.87845,
            147.4
          ],
          [
            6.070165,
            50.878399,
            147.6
          ],
          [
            6.070346,
            50.878145,
            148
          ],
          [
            6.070658,
            50.877715,
            148
          ],
          [
            6.07077,
            50.877581,
            148.1
          ],
          [
            6.07174,
            50.87648,
            150.6
          ],
          [
            6.071852,
            50.876337,
            150.9
          ],
          [
            6.072296,
            50.875821,
            152.2
          ],
          [
            6.072356,
            50.875757,
            152.3
          ],
          [
            6.072432,
            50.875698,
            152.4
          ],
          [
            6.072547,
            50.875627,
            152.5
          ],
          [
            6.072053,
            50.875303,
            152.8
          ],
          [
            6.071602,
            50.875018,
            153
          ],
          [
            6.071563,
            50.874994,
            153
          ],
          [
            6.071423,
            50.874912,
            153
          ],
          [
            6.07138,
            50.874886,
            153
          ],
          [
            6.071467,
            50.874821,
            153.1
          ],
          [
            6.07178,
            50.87453,
            153.3
          ],
          [
            6.071817,
            50.874493,
            153.4
          ],
          [
            6.07185,
            50.874448,
            153.5
          ],
          [
            6.071844,
            50.874405,
            153.6
          ],
          [
            6.071818,
            50.874364,
            153.7
          ],
          [
            6.071909,
            50.874331,
            153.8
          ],
          [
            6.072209,
            50.874235,
            153.9
          ],
          [
            6.072379,
            50.874143,
            154
          ],
          [
            6.073044,
            50.873528,
            154.3
          ],
          [
            6.073704,
            50.872992,
            153.7
          ],
          [
            6.074016,
            50.872678,
            153.2
          ],
          [
            6.074276,
            50.872358,
            153
          ],
          [
            6.07435,
            50.872276,
            153.1
          ],
          [
            6.074455,
            50.872188,
            153.1
          ],
          [
            6.074692,
            50.871994,
            153.3
          ],
          [
            6.075109,
            50.871492,
            153.8
          ],
          [
            6.075474,
            50.870997,
            154.5
          ],
          [
            6.075812,
            50.870499,
            155.1
          ],
          [
            6.076001,
            50.870183,
            155.2
          ],
          [
            6.076154,
            50.869858,
            155.3
          ],
          [
            6.076224,
            50.869616,
            155.5
          ],
          [
            6.076235,
            50.8695,
            155.5
          ],
          [
            6.076212,
            50.869447,
            155.6
          ],
          [
            6.076132,
            50.86936,
            155.6
          ],
          [
            6.076093,
            50.869337,
            155.7
          ],
          [
            6.076121,
            50.86926,
            155.7
          ],
          [
            6.076142,
            50.869215,
            155.8
          ],
          [
            6.076151,
            50.869195,
            155.8
          ],
          [
            6.07618,
            50.869172,
            155.8
          ],
          [
            6.076245,
            50.869167,
            155.9
          ],
          [
            6.076407,
            50.869115,
            155.9
          ],
          [
            6.076436,
            50.869097,
            155.9
          ],
          [
            6.076546,
            50.868974,
            155.9
          ],
          [
            6.076707,
            50.868738,
            156
          ],
          [
            6.07685,
            50.868432,
            156
          ],
          [
            6.077344,
            50.867093,
            155.8
          ],
          [
            6.077359,
            50.867,
            155.7
          ],
          [
            6.077327,
            50.866958,
            155.7
          ],
          [
            6.077298,
            50.866925,
            155.6
          ],
          [
            6.077266,
            50.866891,
            155.6
          ],
          [
            6.077286,
            50.866829,
            155.5
          ],
          [
            6.077306,
            50.866782,
            155.5
          ],
          [
            6.077329,
            50.866721,
            155.4
          ],
          [
            6.077379,
            50.866697,
            155.4
          ],
          [
            6.077449,
            50.866673,
            155.3
          ],
          [
            6.077489,
            50.866662,
            155.3
          ],
          [
            6.077546,
            50.866659,
            155.3
          ],
          [
            6.0777,
            50.866679,
            155.2
          ],
          [
            6.077812,
            50.866712,
            155.2
          ],
          [
            6.077973,
            50.866823,
            155.2
          ],
          [
            6.078207,
            50.86691,
            155.1
          ],
          [
            6.07835,
            50.866981,
            155.1
          ],
          [
            6.07842,
            50.866997,
            155.1
          ],
          [
            6.078577,
            50.867088,
            155
          ],
          [
            6.079518,
            50.867443,
            154.5
          ],
          [
            6.080204,
            50.867708,
            154
          ],
          [
            6.080366,
            50.867798,
            153.9
          ],
          [
            6.080711,
            50.867792,
            153.7
          ],
          [
            6.080851,
            50.867792,
            153.6
          ],
          [
            6.080956,
            50.867894,
            153.5
          ],
          [
            6.08121,
            50.868091,
            153.4
          ],
          [
            6.081351,
            50.868204,
            153.3
          ],
          [
            6.081408,
            50.868213,
            153.3
          ],
          [
            6.081463,
            50.868194,
            153.3
          ],
          [
            6.081475,
            50.86823,
            153.3
          ],
          [
            6.081471,
            50.86827,
            153.2
          ],
          [
            6.081448,
            50.868286,
            153.2
          ],
          [
            6.081201,
            50.868313,
            153.1
          ],
          [
            6.081173,
            50.868345,
            153
          ],
          [
            6.081355,
            50.868501,
            152.8
          ],
          [
            6.081409,
            50.868656,
            152.7
          ],
          [
            6.081447,
            50.868756,
            152.3
          ],
          [
            6.081447,
            50.86879,
            151.9
          ],
          [
            6.081397,
            50.868877,
            151.5
          ],
          [
            6.081298,
            50.868968,
            151.1
          ],
          [
            6.081143,
            50.869103,
            150.7
          ],
          [
            6.080965,
            50.869112,
            150.7
          ],
          [
            6.080904,
            50.869101,
            150.6
          ]
        ],
        'type': 'LineString'
      },
      'summary': {
        'distance': 5.524,
        'duration': 1166.4,
        'descent': 35,
        'ascent': 61.7,
        'unit': 'km',
        'originalUnit': 'km'
      }
    }
  ],
  'bbox': [
    6.0548,
    50.866659,
    97.06,
    6.081475,
    50.901925,
    155.99
  ],
  'metadata': {
    'attribution': 'openrouteservice.org | OpenStreetMap contributors',
    'service': 'routing',
    'timestamp': 1640262626016,
    'query': {
      'coordinates': [
        [
          6.054840087890626,
          50.90130070888041
        ],
        [
          6.080245971679688,
          50.87054481536601
        ]
      ],
      'profile': 'cycling-regular',
      'preference': 'recommended',
      'format': 'geojson',
      'units': 'km',
      'language': 'en',
      'instructions_format': 'html',
      'elevation': true,
      'extra_info': [
        'surface',
        'steepness',
        'waytype'
      ]
    },
    'engine': {
      'version': '6.6.3',
      'build_date': '2021-12-16T11:22:41Z',
      'graph_date': '2021-12-13T14:16:56Z'
    }
  }
}

let mapViewDataPlaceSearchResults = new MapViewData()
mapViewDataPlaceSearchResults.places = Place.placesFromFeatures(features)
mapViewDataPlaceSearchResults.routes = []
mapViewDataPlaceSearchResults.timestamp = Date.now()

let mapViewDataSinglePlace = new MapViewData()
mapViewDataSinglePlace.places = Place.placesFromFeatures([features[0]])
mapViewDataSinglePlace.routes = []
mapViewDataSinglePlace.timestamp = Date.now()

let mapViewDataRoute = new MapViewData()
mapViewDataRoute.places = routePlaces
mapViewDataRoute.routes = routes
mapViewDataRoute.timestamp = Date.now()
mapViewDataRoute.mode = constants.modes.directions
mapViewDataRoute.isRouteData = true
mapViewDataRoute.rawData = rawData


const mapViewDataTemplates = {
  placeSearchResults: mapViewDataPlaceSearchResults,
  singlePlace: mapViewDataSinglePlace,
  route: mapViewDataRoute
}
export default mapViewDataTemplates
