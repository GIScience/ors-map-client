// This is an example file and is expected to be cloned
// without the -example on the same folder that it resides.

import routeSmoothnessList from '@/resources/lists/route-smoothness'
import surfaceTypesList from '@/resources/lists/surface-types'
import countriesList from '@/resources/lists/countries'
import gradesList from '@/resources/lists/grades'
import constants from '@/resources/constants'

const filters = [
  { // Profile filter is required. What you can change is the available items in the enum and mapping
    name: 'profile',
    useInServices: [constants.services.directions, constants.services.isochrones],
    hidden: true,
    required: true,
    type: constants.filterTypes.string,
    enum: [
      'driving-car',
      'driving-hgv',
      'cycling-regular',
      'cycling-road',
      'cycling-safe',
      'cycling-mountain',
      'cycling-electric',
      'foot-walking',
      'foot-hiking',
      'wheelchair'
    ],
    mapping: {
      'cycling-regular': {
        slug: 'cycling-regular',
        icon: 'directions_bike',
        nestedProfiles: ['cycling-regular', 'cycling-road', 'cycling-electric', 'cycling-mountain'],
        supportsTrailDifficulty: true
      },
      'foot-walking': {
        slug: 'foot-walking',
        icon: 'directions_walk',
        nestedProfiles: ['foot-walking', 'foot-hiking'],
        supportsTrailDifficulty: true,
        supportsGreen: true,
        supportsNoise: true
      },
      'driving-car': {
        slug: 'driving-car',
        icon: 'directions_car',
        supportsRoadAccessRestrictions: true,
        supportsTollways: true
      },
      'driving-hgv': {
        slug: 'driving-hgv',
        icon: 'directions_bus',
        vehicleTypes: ['bus', 'hgv', 'agricultural', 'delivery', 'forestry', 'goods'],
        supportsRoadAccessRestrictions: true,
        supportsTollways: true
      },
      wheelchair: {
        slug: 'wheelchair',
        icon: 'accessible'
      }
    }
  },
  {
    name: 'preference',
    useInServices: [constants.services.directions],
    availableOnModes: [constants.modes.directions],
    type: constants.filterTypes.string,
    isEnum: true,
    separator: '|',
    enum: [
      'shortest',
      'recommended'
    ],
    default: 'recommended',
    value: 'recommended'
  },
  {
    name: 'maximum_speed',
    unit: 'kmh',
    required: false,
    type: constants.filterTypes.steps,
    value: null,
    min: 80,
    max: 120,
    step: 1,
    validWhen: [
      {
        ref: 'profile',
        value: 'driving-car'
      }
    ],
    visibleWhen: [
      {
        ref: 'profile',
        value: 'driving-car'
      }
    ],
    availableOnModes: [constants.modes.directions],
    useInServices: [constants.services.directions]
  },
  {
    availableOnModes: [constants.modes.isochrones],
    useInServices: [constants.services.isochrones],
    name: 'range_type',
    required: true,
    type: constants.filterTypes.string,
    isEnum: true,
    enum: ['time', 'distance'],
    value: 'distance'
  },
  {
    name: 'time_range',
    internalName: 'range',
    unit: 'min',
    required: false,
    type: constants.filterTypes.steps,
    valueAsArray: true,
    value: 5,
    min: 1,
    max: 300,
    multiplyValueBy: 60,
    step: 1,
    visibleWhen: [
      {
        ref: 'range_type',
        value: 'time'
      }
    ],
    validWhen: [
      {
        ref: 'range_type',
        value: 'time'
      }
    ],
    availableOnModes: [constants.modes.isochrones],
    useInServices: [constants.services.isochrones],
    valuesRestrictions: [
      {
        ref: 'profile',
        valuesWhen: {
          'driving-*': {
            max: 60
          },
          'cycling-*': {
            max: 30
          },
          'foot-*': {
            max: 1200
          },
          wheelchair: {
            max: 1200,
          },
        }
      }
    ]
  },
  {
    name: 'time_interval',
    internalName: 'interval',
    unit: 'min',
    required: false,
    type: constants.filterTypes.steps,
    value: 1,
    min: 1,
    max: 30,
    step: 1,
    multiplyValueBy: 60,
    visibleWhen: [
      {
        ref: 'range_type',
        value: 'time'
      }
    ],
    validWhen: [
      {
        ref: 'range_type',
        value: 'time'
      }
    ],
    availableOnModes: [constants.modes.isochrones],
    useInServices: [constants.services.isochrones],
    valuesRestrictions: [
      {
        ref: 'profile',
        valuesWhen: {
          'driving-*': {
            max: [{ref: 'time_range'}, 60], // the max value of range or 60
            min: [{ref: 'time_range', calc: {dividedBy: 9}, min: 1}]
          },
          'cycling-*': {
            max: [{ref: 'time_range'}, 30], // the max value of range or 30,
            min: [{ref: 'time_range', calc: {dividedBy: 9}, min: 1}] //set min value by calculating time_range value divided by 9 or ...
          },
          'foot-*': {
            max: [{ref: 'time_range'}, 1200], // the max value of range or 1200,
            min: [{ref: 'time_range', calc: {dividedBy: 9}, min: 1}]
          },
          wheelchair: {
            max: [{ref: 'time_range'}, 1200], // the max value of range or 1200,
            min: [{ref: 'time_range', calc: {dividedBy: 9}, min: 1}]
          },
        }
      }
    ]
  },
  {
    name: 'distance_range',
    internalName: 'range',
    unit: 'km',
    required: false,
    type: constants.filterTypes.steps,
    value: 1,
    min: 1,
    max: 120,
    multiplyValueBy: 1000,
    valueAsArray: true,
    step: 1,
    visibleWhen: [
      {
        ref: 'range_type',
        value: 'distance'
      }
    ],
    validWhen: [
      {
        ref: 'range_type',
        value: 'distance'
      }
    ],
    availableOnModes: [constants.modes.isochrones],
    useInServices: [constants.services.isochrones]
  },
  {
    name: 'distance_interval',
    internalName: 'interval',
    unit: 'km',
    required: false,
    type: constants.filterTypes.steps,
    value: 1,
    min: 1,
    max: 30,
    multiplyValueBy: 1000,
    step: 1,
    visibleWhen: [
      {
        ref: 'range_type',
        value: 'distance'
      }
    ],
    validWhen: [
      {
        ref: 'range_type',
        value: 'distance'
      }
    ],
    availableOnModes: [constants.modes.isochrones],
    useInServices: [constants.services.isochrones],
    valuesRestrictions: [
      {
        ref: 'profile',
        valuesWhen: {
          'driving-*': {
            max: [{ref: 'distance_range'}, 120], // the max value of range or 120
            min: [{ref: 'distance_range', calc: {dividedBy: 9}, min: 1}]
          },
          'cycling-*': {
            max: [{ref: 'distance_range'}, 120], // the max value of range or 120
            min: [{ref: 'distance_range', calc: {dividedBy: 9}, min: 1}]
          },
          'foot-*': {
            max: [{ref: 'distance_range'}, 120], // the max value of range or 120
            min: [{ref: 'distance_range', calc: {dividedBy: 9}, min: 1}]
          },
          wheelchair: {
            max: [{ref: 'distance_range'}, 120], // the max value of range or 120
            min: [{ref: 'distance_range', calc: {dividedBy: 9}, min: 1}]
          },
        }
      }
    ]
  },
  {
    name: 'options',
    type: constants.filterTypes.wrapper,
    useInServices: [constants.services.directions, constants.services.isochrones],
    availableOnModes: [constants.modes.roundTrip, constants.modes.directions, constants.modes.isochrones],
    valueAsObject: true,
    props: [
      {
        name: 'vehicle_type',
        required: false,
        type: constants.filterTypes.string,
        useInServices: [constants.services.directions],
        availableOnModes: [constants.modes.directions],
      },
      {
        name: 'profile_params',
        type: constants.filterTypes.wrapper,
        useInServices: [constants.services.directions],
        availableOnModes: [constants.modes.roundTrip, constants.modes.directions],
        valueAsObject: true,
        validWhen: [
          {
            ref: 'profile',
            value: ['driving-hgv', 'wheelchair', 'foot-*']
          }
        ],
        visibleWhen: [
          {
            ref: 'profile',
            value: ['driving-hgv', 'wheelchair', 'foot-*']
          }
        ],
        props: [
          {
            name: 'restrictions',
            type: constants.filterTypes.wrapper,
            valueAsObject: true,
            availableOnModes: [constants.modes.roundTrip, constants.modes.directions],
            useInServices: [constants.services.directions, constants.services.roundTrip],
            validWhen: [
              {
                ref: 'profile',
                value: ['driving-hgv', 'wheelchair']
              }
            ],
            visibleWhen: [
              {
                ref: 'profile',
                value: ['driving-hgv', 'wheelchair']
              }
            ],
            props: [
              {
                name: 'axleload',
                unit: 't',
                required: false,
                type: constants.filterTypes.steps,
                validWhen: [
                  {
                    ref: 'profile',
                    value: 'driving-hgv'
                  },
                  {
                    ref: 'self',
                    min: 1
                  }
                ],
                visibleWhen: [
                  {
                    ref: 'profile',
                    value: 'driving-hgv'
                  }
                ],
                value: 0,
                min: 1,
                max: 100,
                step: 1
              },
              {
                name: 'height',
                unit: 'm',
                required: false,
                type: constants.filterTypes.steps,
                validWhen: [
                  {
                    ref: 'profile',
                    value: 'driving-hgv'
                  },
                  {
                    ref: 'self',
                    min: 2
                  }
                ],
                visibleWhen: [
                  {
                    ref: 'profile',
                    value: 'driving-hgv'
                  }
                ],
                value: 0,
                min: 1,
                max: 6,
                step: 0.1
              },
              {
                name: 'length',
                unit: 'm',
                required: false,
                type: constants.filterTypes.steps,
                validWhen: [
                  {
                    ref: 'profile',
                    value: 'driving-hgv'
                  },
                  {
                    ref: 'self',
                    min: 2
                  }
                ],
                visibleWhen: [
                  {
                    ref: 'profile',
                    value: 'driving-hgv'
                  }
                ],
                value: 0,
                min: 1,
                max: 30,
                step: 0.1
              },
              {
                name: 'weight',
                unit: 't',
                required: false,
                type: constants.filterTypes.steps,
                validWhen: [
                  {
                    ref: 'profile',
                    value: 'driving-hgv'
                  }
                ],
                visibleWhen: [
                  {
                    ref: 'profile',
                    value: 'driving-hgv'
                  }
                ],
                value: 0,
                min: 1,
                max: 100,
                step: 1
              },
              {
                name: 'width',
                unit: 'm',
                required: false,
                type: constants.filterTypes.steps,
                validWhen: [
                  {
                    ref: 'profile',
                    value: 'driving-hgv'
                  }
                ],
                visibleWhen: [
                  {
                    ref: 'profile',
                    value: 'driving-hgv'
                  }
                ],
                value: 0,
                min: 1,
                max: 6,
                step: 0.1
              },
              {
                name: 'hazmat',
                required: false,
                type: constants.filterTypes.boolean,
                validWhen: [
                  {
                    ref: 'profile',
                    value: 'driving-hgv'
                  }
                ],
                visibleWhen: [
                  {
                    ref: 'profile',
                    value: 'driving-hgv'
                  }
                ],
                value: false,
              },
              {
                name: 'maximum_incline',
                required: false,
                type: constants.filterTypes.string,
                validWhen: [
                  {
                    ref: 'profile',
                    value: 'wheelchair'
                  }
                ],
                visibleWhen: [
                  {
                    ref: 'profile',
                    value: 'wheelchair'
                  }
                ],
                value: '6',
                isEnum: true,
                enum: [
                  '3',
                  '6',
                  '10',
                  '15'
                ]
              },
              {
                name: 'maximum_sloped_kerb',
                required: false,
                type: constants.filterTypes.string,
                validWhen: [
                  {
                    ref: 'profile',
                    value: 'wheelchair'
                  }
                ],
                visibleWhen: [
                  {
                    ref: 'profile',
                    value: 'wheelchair'
                  }
                ],
                isEnum: true,
                value: '0.06',
                enum: [
                  '0.03',
                  '0.06',
                  '0.1'
                ]
              },
              {
                name: 'minimum_width',
                unit: 'm',
                required: false,
                type: constants.filterTypes.steps,
                validWhen: [
                  {
                    ref: 'profile',
                    value: 'wheelchair'
                  }
                ],
                visibleWhen: [
                  {
                    ref: 'profile',
                    value: 'wheelchair'
                  }
                ],
                value: 1,
                min: 0,
                max: 30,
                step: 1
              },
              {
                name: 'smoothness_type',
                required: false,
                type: constants.filterTypes.string,
                validWhen: [
                  {
                    ref: 'profile',
                    value: 'wheelchair'
                  }
                ],
                visibleWhen: [
                  {
                    ref: 'profile',
                    value: 'wheelchair'
                  }
                ],
                isEnum: true,
                value: 'good',
                items: routeSmoothnessList,
                itemValue: 'value'
              },
              {
                name: 'surface_type',
                required: false,
                type: constants.filterTypes.string,
                validWhen: [
                  {
                    ref: 'profile',
                    value: 'wheelchair'
                  }
                ],
                visibleWhen: [
                  {
                    ref: 'profile',
                    value: 'wheelchair'
                  }
                ],
                isEnum: true,
                value: 'cobblestone',
                items: surfaceTypesList,
                itemValue: 'value'
              },
              {
                name: 'track_type',
                required: false,
                type: constants.filterTypes.string,
                validWhen: [
                  {
                    ref: 'profile',
                    value: 'wheelchair'
                  }
                ],
                visibleWhen: [
                  {
                    ref: 'profile',
                    value: 'wheelchair'
                  }
                ],
                isEnum: true,
                default: null,
                value: 'grade1',
                itemValue: 'value',
                items: gradesList
              },
            ]
          },
          {
            name: 'weightings',
            type: constants.filterTypes.wrapper,
            valueAsObject: true,
            availableOnModes: [constants.modes.directions],
            useInServices: [constants.services.directions],
            validWhen: [ { ref: 'profile', value: 'foot-*' }],
            visibleWhen: [ { ref: 'profile', value: 'foot-*' } ],
            props: [
              {
                name: 'green',
                type: constants.filterTypes.steps,
                min: 0,
                max: 1,
                step: 0.1,
                default: null,
                value: 0,
                validWhen: [
                  {
                    ref: 'self',
                    min: 0.1
                  }
                ],
              },
              {
                name: 'quiet',
                type: constants.filterTypes.steps,
                min: 0,
                max: 1,
                step: 0.1,
                default: null,
                value: 0,
                validWhen: [
                  {
                    ref: 'self',
                    min: 0.1
                  }
                ],
              }
            ]
          },
          {
            name: 'surface_quality_known',
            type: constants.filterTypes.boolean,
            availableOnModes: [constants.modes.directions],
            useInServices: [constants.services.directions],
            validWhen: [ { ref: 'profile', value: 'wheelchair' }],
            visibleWhen: [ { ref: 'profile', value: 'wheelchair' } ],
            default: false,
            value: false
          },
          {
            name: 'allow_unsuitable',
            type: constants.filterTypes.boolean,
            availableOnModes: [constants.modes.directions],
            useInServices: [constants.services.directions],
            validWhen: [ { ref: 'profile', value: 'wheelchair' }],
            visibleWhen: [ { ref: 'profile', value: 'wheelchair' } ],
            default: false,
            value: false
          }
        ]
      },
      {
        name: 'round_trip',
        type: constants.filterTypes.wrapper,
        valueAsObject: true,
        hidden: false,
        availableOnModes: [constants.modes.roundTrip],
        useInServices: [constants.services.directions],
        props: [
          {
            name: 'length',
            translation_key: 'round_trip_length',
            unit: 'km',
            multiplyValueBy: 1000,
            required: false,
            type: constants.filterTypes.steps,
            default: null,
            value: 10,
            min: 0,
            max: 100,
            step: 1,
            validWhen: [
              {
                ref: 'self',
                min: 0
              }
            ],
            useInServices: [constants.services.directions]
          },
          {
            name: 'points',
            useInServices: [constants.services.directions],
            required: false,
            default: 3,
            value: 3,
            min: 3,
            max: 30,
            step: 1,
            type: constants.filterTypes.steps,
            validWhen: [
              {
                ref: 'options.props.round_trip.props.length',
                min: 0
              }
            ],
          },
          {
            name: 'seed',
            required: false,
            type: constants.filterTypes.random,
            inputType: 'number',
            default: 0,
            value: 0,
            min: 0,
            max: 90,
            useInServices: [constants.services.directions],
            validWhen: [
              {
                ref: 'options.props.round_trip.props.length',
                min: 0
              }
            ]
          }
        ]
      },
      {
        name: 'avoid_polygons',
        useInServices: [constants.services.directions, constants.services.isochrones],
        hidden: true,
        required: false,
        type: constants.filterTypes.array,
        default: []
      },
      {
        name: 'avoid_features',
        required: false,
        type: constants.filterTypes.array,
        default: false,
        apiDefault: false,
        isEnum: true,
        valueAsArray: true,
        multiSelect: true,
        enum: [
          'highways',
          'tollways',
          'steps',
          'ferries',
          'fords'
        ],
        itemRestrictions: [
          {
            ref: 'profile',
            itemsWhen: {
              'driving-*': [
                'highways',
                'tollways',
                'ferries'
              ],
              'cycling-*': [
                'ferries',
                'fords',
                'steps'
              ],
              'foot-*': [
                'ferries',
                'fords',
                'steps'
              ],
              wheelchair: [
                'ferries',
                'fords',
                'steps'
              ]
            }
          }
        ]
      },
      {
        name: 'avoid_borders',
        required: false,
        type: constants.filterTypes.array,
        default: false,
        apiDefault: false,
        isEnum: true,
        multiSelect: false,
        enum: [
          'all',
          'controlled'
        ]
      },
      {
        name: 'avoid_countries',
        required: false,
        type: constants.filterTypes.array,
        default: false,
        itemValue: 'cid',
        apiDefault: false,
        isEnum: true,
        valueAsArray: true,
        multiSelect: true,
        items: countriesList
      }
    ]
  },
  {

    name: 'alternative_routes',
    type: constants.filterTypes.wrapper,
    valueAsObject: true,
    availableOnModes: [constants.modes.directions],
    useInServices: [constants.services.directions],
    validWhen: [
      {
        ref: 'alternative_routes.props.target_count',
        min: 2
      }
    ],
    props: [
      {
        name: 'target_count',
        required: false,
        type: constants.filterTypes.steps,
        default: 1,
        value: 1,
        min: 1,
        max: 3,
        step: 1,
        validWhen: [
          {
            ref: 'self',
            min: 1
          }
        ],
        useInServices: [constants.services.directions]
      },
      {
        name: 'share_factor',
        useInServices: [constants.services.directions],
        required: false,
        default: 0.6,
        value: 0.6,
        min: 0.1,
        max: 1,
        step: 0.1,
        type: constants.filterTypes.steps,
        validWhen: [
          {
            ref: 'alternative_routes.props.target_count',
            min: 2
          }
        ],
        visibleWhen: [
          {
            ref: 'alternative_routes.props.target_count',
            min: 2
          }
        ]
      },
      {
        name: 'weight_factor',
        required: false,
        type: constants.filterTypes.steps,
        default: 1.4,
        value: 1.4,
        min: 1,
        max: 2,
        step: 0.1,
        useInServices: [constants.services.directions],
        validWhen: [
          {
            ref: 'alternative_routes.props.target_count',
            min: 2
          }
        ],
        visibleWhen: [
          {
            ref: 'alternative_routes.props.target_count',
            min: 2
          }
        ]
      }
    ]
  }
]

export default filters
