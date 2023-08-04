// noinspection SpellCheckingInspection

const buildMapData = {
  directionsMapData: {
    'options': {
      'origin': '/directions',
      'apiVersion': '5.0',
      'translations': {
        'km': 'km(s)',
        'mi': 'mi(s)',
        'm': 'm',
        'seconds': 'seconds',
        's': 's',
        'minutes': 'minutes',
        'hours': 'hour(s)',
        'days': 'd',
        'h': 'h',
        'min': 'min',
        'meters': 'meters',
        'lat': 'lat',
        'lng': 'long',
        'tones': 'tones',
        't': 't',
        'kmh': 'km/h',
        'polygon': 'polygon'
      }
    },
    'content': {
      'type': 'FeatureCollection',
      'metadata': {
        'attribution': 'openrouteservice.org | OpenStreetMap contributors',
        'service': 'routing',
        'timestamp': 1633680853655,
        'query': {
          'coordinates': [
            [
              7.226386070251466,
              51.477053023240366
            ],
            [
              7.223510742187501,
              51.483093349884925
            ]
          ],
          'profile': 'wheelchair',
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
          ],
          'options': {
            'profile_params': {
              'restrictions': {
                'surface_type': 'cobblestone',
                'track_type': 'grade1',
                'smoothness_type': 'good',
                'maximum_sloped_kerb': 0.06,
                'maximum_incline': 6,
                'minimum_width': 1
              }
            }
          }
        },
        'engine': {
          'version': '6.6.1',
          'build_date': '2021-07-05T10:57:48Z',
          'graph_date': '2021-09-02T16:29:39Z'
        }
      },
      'features': [{
        'bbox': [
          7.22347,
          51.47698,
          95.43,
          7.226943,
          51.482993,
          107
        ],
        'type': 'Feature',
        'properties': {
          'ascent': 0.1,
          'descent': 11.6,
          'segments': [{
            'distance': 0.969,
            'duration': 768.3,
            'steps': [{
              'distance': 0.03,
              'duration': 26.8,
              'type': 11,
              'instruction': 'Head northwest on <b>Claudius-Höfe</b>',
              'name': 'Claudius-Höfe',
              'way_points': [
                0,
                1
              ]
            },
            {
              'distance': 0.079,
              'duration': 57,
              'type': 1,
              'instruction': 'Turn right onto <b>Mauritiusstraße</b>',
              'name': 'Mauritiusstraße',
              'way_points': [
                1,
                4
              ]
            },
            {
              'distance': 0.043,
              'duration': 31.2,
              'type': 0,
              'instruction': 'Turn left onto <b>Düppelstraße</b>',
              'name': 'Düppelstraße',
              'way_points': [
                4,
                7
              ]
            },
            {
              'distance': 0.034,
              'duration': 26.6,
              'type': 13,
              'instruction': 'Keep right onto <b>Düppelstraße</b>',
              'name': 'Düppelstraße',
              'way_points': [
                7,
                12
              ]
            },
            {
              'distance': 0.031,
              'duration': 22.1,
              'type': 0,
              'instruction': 'Turn left',
              'name': '-',
              'way_points': [
                12,
                16
              ]
            },
            {
              'distance': 0.028,
              'duration': 20.3,
              'type': 1,
              'instruction': 'Turn right',
              'name': '-',
              'way_points': [
                16,
                19
              ]
            },
            {
              'distance': 0.176,
              'duration': 158.6,
              'type': 0,
              'instruction': 'Turn left onto <b>Wittener Straße, B 226</b>',
              'name': 'Wittener Straße, B 226',
              'way_points': [
                19,
                27
              ]
            },
            {
              'distance': 0.046,
              'duration': 33.4,
              'type': 0,
              'instruction': 'Turn left',
              'name': '-',
              'way_points': [
                27,
                33
              ]
            },
            {
              'distance': 0.003,
              'duration': 2.7,
              'type': 13,
              'instruction': 'Keep right onto <b>Hauptbahnhof</b>',
              'name': 'Hauptbahnhof',
              'way_points': [
                33,
                34
              ]
            },
            {
              'distance': 0.037,
              'duration': 13.2,
              'type': 13,
              'instruction': 'Keep right',
              'name': '-',
              'way_points': [
                34,
                40
              ]
            },
            {
              'distance': 0.014,
              'duration': 5,
              'type': 1,
              'instruction': 'Turn right',
              'name': '-',
              'way_points': [
                40,
                42
              ]
            },
            {
              'distance': 0.447,
              'duration': 371.5,
              'type': 0,
              'instruction': 'Turn left onto <b>Ostring, B 226</b>',
              'name': 'Ostring, B 226',
              'way_points': [
                42,
                67
              ]
            },
            {
              'distance': 0,
              'duration': 0,
              'type': 10,
              'instruction': 'Arrive at Ostring, B 226, on the right',
              'name': '-',
              'way_points': [
                67,
                67
              ]
            }
            ],
            'ascent': 0.06360015869141478,
            'descent': 11.631999969482436
          }],
          'extras': {
            'surface': {
              'values': [
                [
                  0,
                  16,
                  3
                ],
                [
                  16,
                  19,
                  14
                ],
                [
                  19,
                  27,
                  3
                ],
                [
                  27,
                  33,
                  14
                ],
                [
                  33,
                  34,
                  0
                ],
                [
                  34,
                  40,
                  3
                ],
                [
                  40,
                  42,
                  14
                ],
                [
                  42,
                  56,
                  3
                ],
                [
                  56,
                  67,
                  14
                ]
              ],
              'summary': [{
                'value': 3,
                'distance': 0.7,
                'amount': 72.75
              },
              {
                'value': 14,
                'distance': 0.3,
                'amount': 26.94
              },
              {
                'value': 0,
                'distance': 0,
                'amount': 0.31
              }
              ]
            },
            'waytypes': {
              'values': [
                [
                  0,
                  10,
                  3
                ],
                [
                  10,
                  12,
                  2
                ],
                [
                  12,
                  19,
                  7
                ],
                [
                  19,
                  27,
                  1
                ],
                [
                  27,
                  33,
                  7
                ],
                [
                  33,
                  34,
                  0
                ],
                [
                  34,
                  42,
                  7
                ],
                [
                  42,
                  56,
                  1
                ],
                [
                  56,
                  67,
                  7
                ]
              ],
              'summary': [{
                'value': 1,
                'distance': 0.5,
                'amount': 46.55
              },
              {
                'value': 7,
                'distance': 0.3,
                'amount': 33.88
              },
              {
                'value': 3,
                'distance': 0.2,
                'amount': 18.15
              },
              {
                'value': 2,
                'distance': 0,
                'amount': 1.1
              },
              {
                'value': 0,
                'distance': 0,
                'amount': 0.31
              }
              ]
            },
            'steepness': {
              'values': [
                [
                  0,
                  67,
                  -1
                ]
              ],
              'summary': [{
                'value': -1,
                'distance': 1,
                'amount': 100
              }]
            }
          },
          'way_points': [
            0,
            67
          ],
          'summary': {
            'distance': 0.969,
            'duration': 768.3
          }
        },
        'geometry': {
          'coordinates': [
            [
              7.226195,
              51.47698,
              107
            ],
            [
              7.22597,
              51.477207,
              106
            ],
            [
              7.226143,
              51.477272,
              105.8
            ],
            [
              7.226884,
              51.477558,
              105.3
            ],
            [
              7.226943,
              51.477581,
              105.3
            ],
            [
              7.226869,
              51.477715,
              105.3
            ],
            [
              7.226742,
              51.477882,
              105.2
            ],
            [
              7.22668,
              51.477932,
              105.2
            ],
            [
              7.226614,
              51.478023,
              105.2
            ],
            [
              7.226607,
              51.478075,
              105.2
            ],
            [
              7.226635,
              51.478133,
              105.2
            ],
            [
              7.226691,
              51.478163,
              105.2
            ],
            [
              7.226755,
              51.478194,
              105.2
            ],
            [
              7.226672,
              51.478242,
              105.1
            ],
            [
              7.226624,
              51.478259,
              105
            ],
            [
              7.226527,
              51.478298,
              105
            ],
            [
              7.226388,
              51.478345,
              105
            ],
            [
              7.22637,
              51.478433,
              105
            ],
            [
              7.226315,
              51.478503,
              105
            ],
            [
              7.226408,
              51.478567,
              105
            ],
            [
              7.226361,
              51.478595,
              105
            ],
            [
              7.226256,
              51.478659,
              105
            ],
            [
              7.226225,
              51.478677,
              105
            ],
            [
              7.22574,
              51.478961,
              105
            ],
            [
              7.225593,
              51.479049,
              104.9
            ],
            [
              7.225062,
              51.479337,
              104.3
            ],
            [
              7.224704,
              51.479523,
              103.8
            ],
            [
              7.224511,
              51.479622,
              103.7
            ],
            [
              7.224376,
              51.479592,
              103.5
            ],
            [
              7.224251,
              51.479588,
              103.4
            ],
            [
              7.224124,
              51.479613,
              103.2
            ],
            [
              7.224035,
              51.479631,
              103.1
            ],
            [
              7.223959,
              51.479652,
              102.9
            ],
            [
              7.223869,
              51.479665,
              102.8
            ],
            [
              7.223843,
              51.479687,
              102.6
            ],
            [
              7.223851,
              51.479722,
              102.5
            ],
            [
              7.223866,
              51.479753,
              102.3
            ],
            [
              7.223863,
              51.479787,
              102.2
            ],
            [
              7.223915,
              51.479826,
              102
            ],
            [
              7.224003,
              51.479901,
              102
            ],
            [
              7.224083,
              51.479969,
              102
            ],
            [
              7.224175,
              51.479972,
              102
            ],
            [
              7.224277,
              51.479992,
              102
            ],
            [
              7.22426,
              51.48013,
              102
            ],
            [
              7.224254,
              51.48025,
              102
            ],
            [
              7.224452,
              51.480587,
              102
            ],
            [
              7.224466,
              51.480614,
              102
            ],
            [
              7.224531,
              51.480742,
              102
            ],
            [
              7.224586,
              51.480854,
              102
            ],
            [
              7.224682,
              51.481078,
              102
            ],
            [
              7.224692,
              51.481103,
              102
            ],
            [
              7.22474,
              51.481225,
              101.6
            ],
            [
              7.224801,
              51.48137,
              101.2
            ],
            [
              7.224916,
              51.48165,
              100.3
            ],
            [
              7.225017,
              51.481872,
              99.8
            ],
            [
              7.2252,
              51.482349,
              98.6
            ],
            [
              7.225211,
              51.482379,
              98.3
            ],
            [
              7.225331,
              51.482485,
              98.1
            ],
            [
              7.225343,
              51.48256,
              97.8
            ],
            [
              7.225364,
              51.4826,
              97.6
            ],
            [
              7.225222,
              51.482628,
              97.3
            ],
            [
              7.225175,
              51.482686,
              97.1
            ],
            [
              7.225158,
              51.48275,
              96.7
            ],
            [
              7.225044,
              51.48278,
              96.4
            ],
            [
              7.224823,
              51.482799,
              96.5
            ],
            [
              7.224746,
              51.482797,
              96.5
            ],
            [
              7.224188,
              51.482881,
              96.2
            ],
            [
              7.22347,
              51.482993,
              95.4
            ]
          ],
          'type': 'LineString'
        }
      }],
      'bbox': [
        7.22347,
        51.47698,
        95.43,
        7.226943,
        51.482993,
        107
      ]
    }
  },
  isochronesMapData: {
    'options': {
      'origin': '/isochrones',
      'apiVersion': '5.0',
      'translations': {
        'km': 'km(s)',
        'mi': 'mi(s)',
        'm': 'm',
        'seconds': 'seconds',
        's': 's',
        'minutes': 'minutes',
        'hours': 'hour(s)',
        'days': 'd',
        'h': 'h',
        'min': 'min',
        'meters': 'meters',
        'lat': 'lat',
        'lng': 'long',
        'tones': 'tones',
        't': 't',
        'kmh': 'km/h',
        'polygon': 'polygon'
      }
    },
    'content': {
      'type': 'FeatureCollection',
      'metadata': {
        'attribution': 'openrouteservice.org | OpenStreetMap contributors',
        'service': 'isochrones',
        'timestamp': 1633681199232,
        'query': {
          'locations': [
            [
              7.229218482971191,
              51.475663100358744
            ]
          ],
          'range': [
            1000
          ],
          'range_type': 'distance',
          'area_units': 'km',
          'attributes': [
            'total_pop'
          ],
          'interval': 1000
        },
        'engine': {
          'version': '6.6.1',
          'build_date': '2021-07-05T10:57:48Z',
          'graph_date': '2021-09-02T16:29:39Z'
        }
      },
      'bbox': [
        7.216541,
        51.466828,
        7.243581,
        51.484391
      ],
      'features': [{
        'type': 'Feature',
        'properties': {
          'group_index': 0,
          'value': 1000,
          'center': [
            7.229214908938546,
            51.475686093197034
          ],
          'total_pop': 9997
        },
        'geometry': {
          'coordinates': [
            [
              [
                7.216541,
                51.472481
              ],
              [
                7.216579,
                51.472293
              ],
              [
                7.217048,
                51.471448
              ],
              [
                7.220228,
                51.469996
              ],
              [
                7.224485,
                51.468494
              ],
              [
                7.225917,
                51.467468
              ],
              [
                7.228222,
                51.466828
              ],
              [
                7.230243,
                51.467287
              ],
              [
                7.230548,
                51.46767
              ],
              [
                7.231176,
                51.469212
              ],
              [
                7.236644,
                51.471446
              ],
              [
                7.236945,
                51.47133
              ],
              [
                7.240141,
                51.471748
              ],
              [
                7.241347,
                51.471999
              ],
              [
                7.241365,
                51.472004
              ],
              [
                7.243581,
                51.47578
              ],
              [
                7.243581,
                51.475782
              ],
              [
                7.242922,
                51.476577
              ],
              [
                7.241838,
                51.477667
              ],
              [
                7.238571,
                51.481185
              ],
              [
                7.237264,
                51.482416
              ],
              [
                7.233548,
                51.482324
              ],
              [
                7.232387,
                51.482038
              ],
              [
                7.23171,
                51.481782
              ],
              [
                7.22662,
                51.483762
              ],
              [
                7.226582,
                51.483808
              ],
              [
                7.225992,
                51.484269
              ],
              [
                7.225947,
                51.484276
              ],
              [
                7.225153,
                51.484391
              ],
              [
                7.21969,
                51.482575
              ],
              [
                7.21727,
                51.478928
              ],
              [
                7.217262,
                51.478876
              ],
              [
                7.21693,
                51.475696
              ],
              [
                7.216541,
                51.472481
              ]
            ]
          ],
          'type': 'Polygon'
        }
      }]
    }
  }
}
export default buildMapData
