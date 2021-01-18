// This is an example file and is expected to be cloned 
// without the -example on the same folder that it resides.
// You can change the items of an array of options but not remove
// an options array. Only Valid options must be present
// in each key.

const settingsOptions = {
  routingInstructionsLocales: [
    { text: 'EN', value: 'en' },
    { text: 'DE', value: 'de' },
    { text: 'CN', value: 'cn' },
    { text: 'ES', value: 'es' },
    { text: 'RU', value: 'ru' },
    { text: 'DK', value: 'dk' },
    { text: 'FR', value: 'fr' },
    { text: 'IT', value: 'it' },
    { text: 'NL', value: 'nl' },
    { text: 'PT BR', value: 'pt' },
    { text: 'SE', value: 'se' },
    { text: 'TR', value: 'tr' },
    { text: 'GR', value: 'gr' }
  ],
  units: [
    { text: 'Kilometers', value: 'km' },
    { text: 'Meters', value: 'm' },
    { text: 'Miles', value: 'mi' }
  ],
  areUnits: [
    { text: 'Sq kms', value: 'km' },
    { text: 'Hectare', value: 'ha' },
    { text: 'Sq meters', value: 'm' }
  ],
  appLocales: [
    { text: 'English US', value: 'en-us' },
    { text: 'Deutsch DE', value: 'de-de' },
    { text: 'Português BR', value: 'pt-br' }
  ],
  tileServices: [
    { text: 'OpenStreetMaps', value: 'osm' },
    { text: 'World Imagery', value: 'world-imagery' },
    { text: 'Topography', value: 'topography' },
    { text: 'Transport Dark', value: 'transport-dark' },
    { text: 'Cyclosm', value: 'cyclosm' },
    { text: 'Custom', value: 'custom' }
  ]
}

export default settingsOptions
