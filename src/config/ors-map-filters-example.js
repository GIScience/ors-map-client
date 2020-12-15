import countriesList from '@/resources/lists/countries'
import gradesList from '@/resources/lists/grades'
import surfaceTypesList from '@/resources/lists/surface-types'
import routeSmoothnessList from '@/resources/lists/route-smoothness'

import constants from '@/resources/constants'

const filters = [
  { // Profile filter is required. What you can change is the avaialble items in enum and mapping
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
    default: 'cycling-regular',
    value: 'cycling-regular',
    mapping: {
      'cycling-regular': {
        slug: 'cycling-regular',
        icon: 'directions_bike',
        nestedProfiles: ['cycling-regular', 'cycling-road', 'cycling-electric', 'cycling-mountain']
      },
      'foot-walking': {
        slug: 'foot-walking',
        icon: 'directions_walk',
        nestedProfiles: ['foot-walking', 'foot-hiking']
      },
      'driving-car': {
        slug: 'driving-car',
        icon: 'directions_car'  
      },
      'driving-hgv': {
        slug: 'driving-hgv',
        icon: 'directions_bus',
        vehicleTypes: ['bus', 'hgv', 'agricultural', 'delivery', 'forestry', 'goods']
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
    name: 'range',
    unit: 'min',
    required: false,
    type: constants.filterTypes.steps,
    label: 'Time',
    value: 5,
    min: 1,
    max: 300,
    multiplyValueBy: 60,
    step: 1,
    validWhen: [
      {
        ref: 'range_type',
        value: 'time'
      }
    ],
    availableOnModes: [constants.modes.isochrones],
    useInServices: [constants.services.isochrones]
  },
  {
    name: 'interval',
    unit: 'min',
    required: false,
    type: constants.filterTypes.steps,
    value: 1,
    min: 3,
    max: 30,
    step: 1,
    multiplyValueBy: 60,
    validWhen: [
      {
        ref: 'range_type',
        value: 'time'
      }
    ],
    availableOnModes: [constants.modes.isochrones],
    useInServices: [constants.services.isochrones]
  },
  {
    name: 'range',
    unit: 'km',
    required: false,
    type: constants.filterTypes.steps,
    value: 1,
    min: 1,
    max: 115,
    multiplyValueBy: 1000,
    step: 1,
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
    name: 'interval',
    unit: 'km',
    required: false,
    type: constants.filterTypes.steps,
    value: 1,
    min: 3,
    max: 30,
    multiplyValueBy: 1000,
    step: 1,
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
    name: 'options',
    type: constants.filterTypes.wrapper,
    useInServices: [constants.services.directions, constants.services.isochrones],
    availableOnModes: [constants.modes.roundTrip, constants.modes.directions, constants.modes.isochrones],
    valueAsObject: true,
    props: [
      {
        name: 'vehicle_type',
        required: false,
        hidden: true,
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
            value: 'wheelchair'
          }
        ],        
        props: [
          {
            name: 'restrictions',
            type: constants.filterTypes.wrapper,
            valueAsObject: true,
            availableOnModes: [constants.modes.roundTrip, constants.modes.directions],
            useInServices: [constants.services.directions, constants.services.roundTrip],
            props: [
              {
                name: 'maximum_incline',
                required: false,
                type: constants.filterTypes.string,
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
                unit: 'meters',
                required: false,
                type: constants.filterTypes.steps,
                value: 1,
                min: 0,
                max: 30,
                step: 1
              },
              {
                name: 'smoothness_type',
                required: false,
                type: constants.filterTypes.string,
                isEnum: true,
                value: 'good',
                items: routeSmoothnessList,                
                itemValue: 'value'
              },
              {
                name: 'surface_type',
                required: false,
                type: constants.filterTypes.string,
                isEnum: true,
                value: 'cobblestone',
                items: surfaceTypesList,                
                itemValue: 'value'
              },
              {
                name: 'track_type',
                required: false,
                type: constants.filterTypes.string,
                isEnum: true,
                default: null,
                value: 'grade1',                
                itemValue: 'value',
                items: gradesList
              }
            ]
          }
        ]
      },
      {
        name: 'round_trip',
        type: constants.filterTypes.wrapper,
        valueAsObject: true,
        hidden: true,
        availableOnModes: [constants.modes.roundTrip],
        useInServices: [constants.services.directions],
        props: [
          {
            name: 'length',
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
          'ferries',
          'tunnels',
          'pavedroads',
          'unpavedroads',
          'tracks',
          'fords',
          'steps',
          'hills'
        ],
        itemRestrictions: [
          {
            ref: 'profile',
            itemsWhen: {
              'driving-*': [
                'highways',
                'tollways',
                'ferries',
                'tunnels',
                'pavedroads',
                'unpavedroads'
              ],
              'cycling-*': [
                'ferries',
                'fords',
                'steps'
              ],
              'foot-*': [
                'ferries',
                'fords',
                'steps',
                'hills'
              ],
              wheelchair: [
                'ferries',
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
        separator: '|',
        multiSelect: true,
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
        separator: '|',
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
        ]
      }
    ]
  }
]

export default filters
