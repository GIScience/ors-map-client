// This is an example file and is expected to be cloned
// without the -example on the same folder that it resides.

// Defines the default zoom that must be applied when a certain
// object with a given layer is focused

const layerZoomMapping = {
  macrocounty: 3,
  country: 4,
  region: 7,
  county: 8,
  macroregion: 8,
  locality: 9,
  neighbourhood: 10,
  borough: 10,
  localadmin: 13,
  street: 14,
  postalcode: 15,
  address: 16,
  venue: 16
}

export default layerZoomMapping
