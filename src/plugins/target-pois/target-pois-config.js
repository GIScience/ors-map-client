const config = {
    baseDisasterUrl: 'https://overpass.geog.uni-heidelberg.de',
    defaultProviderId: 2,
    orsKey: '5b3ce3597851110001cf624818a886fa34a44e66a25131d50db48822',
    oscarDirectionsEndpoint: '/api/v1/routing/avoid_areas/directions',
    oscarCustomHeaderName: 'ors-authorization',
    nodes: ['vaccination=covid19'], // // node["zero_waste"="yes"](around:100000,{{center}});
    ways: ['vaccination=covid19'],
    // nodes: ['zero_waste=yes', 'zero_waste=only', 'low_waste=yes', 'low_waste=zero_waste'], // // node["zero_waste"="yes"](around:100000,{{center}});
    // ways: ['zero_waste=yes', 'zero_waste=only', 'low_waste=yes', 'low_waste=zero_waste'],
    timeout: 3000,
    hideProps: ['placeId', 'targetedPoi', 'name']
}

export default config