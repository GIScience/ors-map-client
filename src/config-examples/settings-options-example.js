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
    { text: 'GR', value: 'gr' },
    { text: 'HU', value: 'hu' }
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
    { text: 'Deutsch DE', value: 'de-de' },
    { text: 'Español ES', value: 'es-es' },
    { text: 'Français FR', value: 'fr-fr' },
    { text: 'Português BR', value: 'pt-br' },
    { text: 'Italiano IT', value: 'it-it' },
    { text: 'Magyar HU', value: 'hu-hu' },
    { text: 'Čeština CS', value: 'cs-cz' },
    { text: 'Română RO', value: 'ro-ro' }
  ],
  tileServices: [
    { text: 'OpenStreetMap', value: 'osm' },
    { text: 'World Imagery', value: 'world-imagery' },
    { text: 'Topography', value: 'topography' },
    { text: 'Transport Dark', value: 'transport-dark' },
    { text: 'Cyclosm', value: 'cyclosm' },
    { text: 'Custom', value: 'custom' }
  ]
}

export default settingsOptions
