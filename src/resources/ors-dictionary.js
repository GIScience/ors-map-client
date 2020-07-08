const orsDictionary = {
  waytypes: [
    'unknown', // at position 0
    'stateRoad', // at position 1
    'road', // at position 2
    'street', // at position 3
    'path', // at position 4
    'track', // at position 5
    'cycleway', // at position 6
    'footway', // at position 7
    'steps', // at position 8
    'ferry', // at position 9
    'construction' // at position 10
  ],
  surface: [
    'unknown', // at position 0
    'paved', // at position 1
    'unpaved', // at position 2
    'asphalt', // at position 3
    'concrete', // at position 4
    'cobblestone', // at position 5
    'metal', // at position 6
    'wood', // at position 7
    'compactedGravel', // at position 8
    'fineGravel', // at position 9
    'gravel', // at position 10
    'dirt', // at position 11
    'ground', // at position 12
    'ice', // at position 13
    'pavingStones', // at position 14
    'sand', // at position 15
    'woodchips', // at position 16
    'grass', // at position 17
    'grassPaver' // at position 18
  ],
  steepness: {
    '-5': '>16%',
    '-4': '12-15%',
    '-3': '7-11%',
    '-2': '4-6%',
    '-1': '1-3%',
    '0': '0%',
    '1': '1-3%',
    '2': '4-6%',
    '3': '7-11%',
    '4': '12-15%',
    '5': '>16%'
  },
  roadaccessrestrictions: {
    '0': 'none',
    '1': 'no',
    '2': 'nustomers',
    '4': 'destination',
    '8': 'delivery',
    '16': 'private',
    '32': 'permissive'
  },
  colors: {
    waytypes: [
      // 11 colors accessed by index
      '#AFEEEE',
      '#40E0D0',
      '#00BFFF',
      '#1E90FF',
      '#6495ED',
      '#0000FF',
      '#000080',
      '#20B2AA',
      '#5F9EA0',
      '#008B8B'
    ],
    surface: [
      // 19 colors accessed by index
      '#7CFC00', // unknown
      '#728C00', // paved
      '#4AA02C', // unpaved
      '#9ACD32', // asphalt
      '#00FF7F', // concrete
      '#00FA9A', // cobblestone
      '#90EE90', // metal
      '#8FBC8F', // wood
      '#3CB371', // compactedGravel
      '#2E8B57', // fineGravel
      '#808000', // gravel
      '#556B2F', // dirt
      '#6B8E23', // ground
      '#BDB76B', // ice
      '#F0E68C', // pavingStones
      '#00FFFF', // sand
      '#66CDAA', // woodchips
      '#228B22', // grass
      '#008000' // grassPaver
    ],
    steepness: [
      // 11 colors accessed by index
      '#DDA0DD',
      '#EE82EE',
      '#FF00FF',
      '#9400D3',
      '#8B008B',
      '#FFB6C1',
      '#FF69B4',
      '#C71585',
      '#FFE4E1',
      '#8B4513',
      '#A52A2A',
      '#800000'
    ],
    roadaccessrestrictions: [
      // 7 colors accessed by index
      '#FFFACD',
      '#696969',
      '#FFEFD5',
      '#2F4F4F',
      '#FFDAB9',
      '#000000',
      '#FFFF00'
    ]
  }
}

export default orsDictionary
