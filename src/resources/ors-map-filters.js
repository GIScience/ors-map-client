import countriesList from '@/resources/countries'
import constants from '@/resources/constants'

const filters = [
  {
    name: 'profile',
    useInServices: [constants.services.directions, constants.services.isochrones],
    hidden: true,
    description: 'Specifies the route profile.',
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
        title: 'Cycling regular',
        icon: 'directions_bike',
        primary: true
      },
      'cycling-road': {
        slug: 'cycling-road',
        title: 'Cycling road',
        icon: 'directions_bike'
      },
      'cycling-electric': {
        slug: 'cycling-electric',
        title: 'Cycling electric',
        icon: 'directions_bike'
      },
      'cycling-mountain': {
        slug: 'cycling-mountain',
        title: 'Cycling mountain',
        icon: 'directions_bike'
      },
      'foot-walking': {
        slug: 'foot-walking',
        title: 'Foot walking',
        icon: 'directions_walk',
        primary: true
      },
      'foot-hiking': {
        slug: 'foot-hiking',
        title: 'Foot hiking',
        icon: 'directions_walk'
      },
      'driving-car': {
        slug: 'driving-car',
        title: 'Driving car',
        icon: 'directions_car',
        primary: true
      },
      'driving-hgv': {
        slug: 'driving-hgv',
        title: 'Driving HGV',
        icon: 'directions_car'
      },
      'wheelchair': {
        slug: 'wheelchair',
        title: 'wheelchair',
        icon: 'accessible_forward',
        primary: true
      }
    }
  },
  {
    label: 'Route preference',
    name: 'preference',
    useInServices: [constants.services.directions],
    availableOnModes: [constants.modes.directions],
    description: 'The preferred factor to be considered when calculating routes',
    type: constants.filterTypes.string,
    isEnum: true,
    separator: '|',
    enum: [
      'fastest',
      'shortest',
      'recommended'
    ],
    default: 'fastest',
    value: 'fastest'
  },
  {
    availableOnModes: [constants.modes.isochrones],
    useInServices: [constants.services.isochrones],
    name: 'range_type',
    required: true,
    type: constants.filterTypes.string,
    description: 'Method used to calculate the isochrone',
    label: 'Isochrone Method',
    isEnum: true,
    enum: ['time', 'distance'],
    value: 'distance'
  },
  {
    availableOnModes: [], // not in use
    useInServices: [constants.services.isochrones],
    name: 'reverse_direction',
    required: true,
    type: constants.filterTypes.boolean,
    description: 'If the reverse mode must be used or not to calculate the isochrones',
    label: 'Reverse direction',
    value: false
  },
  {
    name: 'range',
    unit: 'min',
    required: false,
    type: constants.filterTypes.steps,
    description: 'The time interval of the isochrones to be calculated, in minutes,',
    label: 'Time',
    value: 1,
    min: 1,
    max: 18,
    multiplyValueBy: 1000,
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
    description: 'The time interval of the isochrones to be calculated, in minutes,',
    label: 'Interval',
    value: 1,
    min: 3,
    max: 30,
    step: 1,
    multiplyValueBy: 1000,
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
    description: 'The max distance of the isochrones, in kilometers',
    label: 'Distance',
    value: 1,
    min: 1,
    max: 100,
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
    description: 'The distance interval of the isochrones to be calculated, in kilometers',
    label: 'Interval',
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
    label: 'Avoid options',
    type: constants.filterTypes.wrapper,
    useInServices: [constants.services.directions, constants.services.isochrones],
    availableOnModes: [constants.modes.roundTrip, constants.modes.directions, constants.modes.isochrones],
    valueAsObject: true,
    name: 'options',
    props: [
      {
        label: 'Round trip',
        type: constants.filterTypes.wrapper,
        valueAsObject: true,
        hidden: true,
        availableOnModes: [constants.modes.roundTrip],
        useInServices: [constants.services.directions],
        name: 'round_trip',
        props: [
          {
            name: 'length',
            unit: 'km',
            multiplyValueBy: 1000,
            required: false,
            type: constants.filterTypes.steps,
            description: 'The target length of the route (note that this is a preferred value, but results may be different).',
            label: 'Length of the round trip',
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
            label: 'Points',
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
            description: 'The number of points to use on the route. Larger values create more circular routes.'
          },
          {
            label: 'Random seed',
            name: 'seed',
            required: false,
            type: constants.filterTypes.random,
            inputType: 'number',
            description: 'A random seed to use for adding randomisation to the generated route (min:0, max: 90)',
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
        label: 'Avoid polygons',
        name: 'avoid_polygons',
        useInServices: [constants.services.directions, constants.services.isochrones],
        hidden: true,
        required: false,
        type: constants.filterTypes.array,
        description: 'Avoid polygons',
        default: []
      },
      {
        name: 'avoid_features',
        required: false,
        type: constants.filterTypes.array,
        description: 'Avoid features',
        default: false,
        label: 'Avoid features',
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
              'wheelchair': [
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
        description: 'Avoid borders',
        default: false,
        label: 'Avoid borders',
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
        description: 'Avoid countries',
        default: false,
        label: 'Avoid countries',
        itemText: 'en-US',
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
    label: 'Alternative routes',
    type: constants.filterTypes.wrapper,
    valueAsObject: true,
    availableOnModes: [constants.modes.directions],
    useInServices: [constants.services.directions],
    name: 'alternative_routes',
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
        description: 'Target number of alternative routes to compute. Service returns up to this number of routes that fulfill the share-factor and weight-factor constraints.',
        label: 'Number of routes',
        default: 1,
        value: 1,
        min: 1,
        max: 3,
        step: 1,
        validWhen: [
          {
            ref: 'self',
            min: 2
          }
        ],
        useInServices: [constants.services.directions]
      },
      {
        label: 'Share factor',
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
        description: 'Maximum fraction of the route that alternatives may share with the optimal route. The default value of 0.6 means alternatives can share up to 60% of path segments with the optimal route.'
      },
      {
        name: 'weight_factor',
        required: false,
        type: constants.filterTypes.steps,
        description: 'Maximum factor by which route weight may diverge from the optimal route. The default value of 1.4 means alternatives can be up to 1.4 times longer (costly) than the optimal route.',
        default: 1.4,
        value: 1.4,
        min: 1,
        max: 2,
        step: 0.1,
        label: 'Weight factor',
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
