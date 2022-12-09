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
    0: '0%',
    1: '1-3%',
    2: '4-6%',
    3: '7-11%',
    4: '12-15%',
    5: '>16%'
  },
  tollways: {
    '0': 'no_tollway',
    '1': 'is_tollway'
  },
  waycategory: {
    '0': 'no_category',
    '1': 'highway',
    '2': 'steps',
    '4': 'unpaved_road',
    '8': 'ferry',
    '16':	'track',
    '32':	'tunnel',
    '64':	'paved_road',
    '128': 'ford',
  },
  traildifficulty: {
    '0': 'no_data',	// no tag 	no tag
    '1': '0', // sac_scale=hiking 	mtb:scale=0
    '2': '1', // sac_scale=mountain_hiking 	mtb:scale=1
    '3': '2', // sac_scale=demanding_mountain_hiking 	mtb:scale=2
    '4': '3', // sac_scale=alpine_hiking 	mtb:scale=3
    '5': '4', //	sac_scale=demanding_alpine_hiking 	mtb:scale=4
    '6': '5', //	sac_scale=difficult_alpine_hiking 	mtb:scale=5
    '7': '6', // --- 	mtb:scale=6
  },
  roadaccessrestrictions: {
    '0': 'none', //	None (there are no restriction data)
    '1': 'no',
    '2': 'customers',
    '4': 'destination',
    '8': 'delivery',
    '16': 'private',
    '32': 'permissive'
  },
  green: {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '10': '10'
  },
  noise: {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '10': '10'
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
    roadaccessrestrictions: {
      0: 'gray',
      1: 'green',
      2: '#FFFF66',
      4: '#FFFF33',
      8: '#FFFF00',
      16: '#CCCC00',
      32: '#333300'
    },
    tollways: {
      '0': '#708090',
      '1': '#2F4F4F'
    },
    waycategory: {
      '0': '#FF7F50',
      '1': '#FFE4B5',
      '2': '#FF4500',
      '4': '#FFD700',
      '8': '#FFA500',
      '16':	'#FF8C00',
      '32':	'#BDB76B',
      '64':	'#FFFF00',
      '128': '#808000',
    },
    traildifficulty: {
      '0': 'gray',	// no tag 	no tag
      '1': '#F4A460', // sac_scale=hiking 	mtb:scale=0
      '2': '#DAA520', // sac_scale=mountain_hiking 	mtb:scale=1
      '3': '#CD853F', // sac_scale=demanding_mountain_hiking 	mtb:scale=2
      '4': '#D2691E', // sac_scale=alpine_hiking 	mtb:scale=3
      '5': '#8B4513', //	sac_scale=demanding_alpine_hiking 	mtb:scale=4
      '6': '#A0522D', //	sac_scale=difficult_alpine_hiking 	mtb:scale=5
      '7': '#A52A2A', // --- 	mtb:scale=6
    },
    green: [
      // 11 colors accessed by index
      '#dcedc8',
      '#c5e1a5',
      '#ccff90',
      '#aed581',
      '#9ccc65',
      '#b2ff59',
      '#8bc34a',
      '#7cb342',
      '#689f38',
      '#558b2f',
      '#33691e'
    ],
    noise: [
      // 11 colors accessed by index
      // 0 means less noise, 10 means more noise
      '#F5F5F5',
      '#E8E8E8',
      '#DCDCDC',
      '#D0D0D0',
      '#BEBEBE',
      '#B0B0B0',
      '#989898',
      '#808080',
      '#696969',
      '#505050',
      '#383838'
    ],
  }
}

export default orsDictionary
