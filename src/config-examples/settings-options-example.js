// This is an example file and is expected to be cloned
// without the -example on the same folder that it resides.
// You can change the items of an array of options but not remove
// an options array. Only Valid options must be present
// in each key.

const settingsOptions = {
  routingInstructionsLocales: [
    { text: 'EN', value: 'en' },
    { text: 'DE', value: 'de' }
  ],
  units: [
    { text: 'Kilometers', value: 'km', slug: 'kilometers' },
    { text: 'Meters', value: 'm', slug: 'meters' },
    { text: 'Miles', value: 'mi', slug: 'miles' }
  ],
  areUnits: [
    { text: 'Sq kms', value: 'km', slug: 'sqKms' },
    { text: 'Hectare', value: 'ha', slug: 'hectare' },
    { text: 'Sq meters', value: 'm', slug: 'sqMeters' }
  ],
  appLocales: [
    { text: 'English US', value: 'en-us' },
    { text: 'Deutsch DE', value: 'de-de' }
  ],
  tileServices: [
    { text: 'OpenStreetMap', value: 'osm' },
    { text: 'World Imagery', value: 'world-imagery' },
    { text: 'Lite contrast', value: 'stamen-toner-lite' },
    { text: 'High contrast', value: 'stamen-toner' },
    { text: 'Light color', value: 'cartodb-positron' }
  ]
}

export default settingsOptions
