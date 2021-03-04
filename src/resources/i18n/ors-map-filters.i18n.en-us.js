
export default {
  orsMapFilters: {
    profiles: {
      'cycling-regular': 'Bike',
      'cycling-road': 'Road bike',
      'cycling-electric': 'E-bike',
      'cycling-mountain': 'Mountainbike',
      'cycling-safe': 'Cycling safe',
      'foot-walking': 'Foot walking',
      'foot-hiking': 'Foot hiking',
      'driving-car': 'Car',
      'driving-hgv': 'Heavy vehicle',
      'wheelchair': 'Wheelchair',      
      'hgv': 'Heavy vehicle',
      'bus': 'Bus',
      'agricultural': 'Agricultural vehicle',
      'delivery': 'Delivery truck',
      'forestry': 'Forestry truck',
      'goods': 'Goods truck'
    },
    filters: {
      preference: {
        label: 'Route preference',
        description: 'The preferred factor to be considered when calculating routes',
        enum: {
          'fastest': 'Fastest',
          'shortest': 'Shortest',
          'recommended': 'Recommended'
        }
      },
      range_type: {
        label: 'Isochrone Method',
        description: 'Method used to calculate the isochrone',
        enum: {
          'time': 'Time',
          'distance': 'Distance'
        }
      },
      range: {
        label: 'Range',
        description: 'The max range of the isochrones to be calculated'
      },
      interval: {
        label: 'Interval',
        description: 'The interval of the isochrones to be calculated'
      },
      options: {
        label: 'Route options'
      },
      profile_params: {
        label: 'Profile parameters'
      },
      restrictions: {
        label: 'Restrictions'
      },
      axleload: {
        label: 'Axle load',
        description: 'The maximum axel load in tones'
      },
      height: {
        label: 'Height',
        description: 'The maximum height in meters'
      },
      length: {
        label: 'Length',
        description: 'The maximum length in meters'
      },
      weight: {
        label: 'Weight',
        description: 'The maximum weight in tones'
      },
      width: {
        label: 'Width',
        description: 'The maximum width in meters'
      },
      hazmat: {
        label: 'Hazardous Goods',
        description: 'Transporting hazardous Goods'
      },
      maximum_incline: {
        label: 'Max inclination',
        description: 'The maximum inclination in percentage'
      },
      maximum_sloped_kerb: {
        label: 'Max kerb height',
        description: 'Specifies the maximum height of the sloped curb in meters'
      },
      minimum_width: {
        label: 'Footway minimum width',
        description: 'Specifies the minimum width of the footway in metres'
      },
      smoothness_type: {
        label: 'Route smoothness',
        description: 'Specifies the minimum smoothness of the route. Further infos: https://wiki.openstreetmap.org/wiki/Key:smoothness'
      },
      surface_type: {
        label: 'Min. surface type',
        description: 'Specifies the minimum surface type. Type order: https://wiki.openstreetmap.org/wiki/Key:surface'
      },
      track_type: {
        label: 'Minimum route grade',
        description: 'Specifies the minimum grade of the route. Grade values: https://wiki.openstreetmap.org/wiki/Key:tracktype'
      },
      round_trip: {
        label: 'Round trip'
      },
      round_trip_length: {
        label: 'Length of the round trip',
        description: 'The target length of the route (note that this is a preferred value, but results may be different).'
      },
      points: {
        label: 'Points',
        description: 'The number of points to use on the route. Larger values create more circular routes.'
      },
      seed: {
        label: 'Random seed',
        description: 'A random seed to use for adding randomisation to the generated route (min:0, max: 90)'
      },
      avoid_polygons: {
        label: 'Avoid polygons',
        description: 'Avoid polygons'
      },
      avoid_features: {
        label: 'Avoid features',
        description: 'Avoid features',
        enum: {
          'highways': 'Highways',
          'tollways': 'Tollways',
          'ferries': 'Ferries',
          'tunnels': 'Tunnels',
          'fords': 'Fords',
          'steps': 'Steps',
          'pavedroads': 'Paved roads',
          'unpavedroads': 'Unpaved roads'
        }
      },
      avoid_borders: {
        label: 'Avoid borders',
        description: 'Avoid borders',
        enum: {
          'all': 'All',
          'controlled': 'Controlled'
        }
      },
      avoid_countries: {
        label: 'Avoid countries',
        description: 'Avoid countries'
      },
      alternative_routes: {
        label: 'Alternative routes'
      },
      target_count: {
        label: 'Number of routes',
        description: 'Target number of alternative routes to compute. Service returns up to this number of routes that fulfill the share-factor and weight-factor constraints.'
      },
      share_factor: {
        label: 'Share factor',
        description: 'Maximum fraction of the route that alternatives may share with the optimal route. The default value of 0.6 means alternatives can share up to 60% of path segments with the optimal route.'
      },
      weight_factor: {
        label: 'Weight factor',
        description: 'Maximum factor by which route weight may diverge from the optimal route. The default value of 1.4 means alternatives can be up to 1.4 times longer (costly) than the optimal route.'
      }
    }
  }
}
