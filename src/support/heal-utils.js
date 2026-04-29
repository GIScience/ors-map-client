import orsDictionary from "@/resources/ors-dictionary";
import lodash from 'lodash'

function getExtraValueLabel (extraKey, value,  $t) {
  let dict = orsDictionary
  if (dict[extraKey] && dict[extraKey][value]) {
    const key = dict[extraKey][value]

    const labels = $t('orsDictionary')
    if (labels[key]) {
      return labels[key]
    }
    return key
  }
  return value
}
function colorValue (extraKey, index, value = null) {
  let dict = orsDictionary
  let color
  if (value !== null) {
    color = dict.colors[extraKey][value]
  } else {
    color = dict.colors[extraKey][index]
  }

  return color
}

export function buildExtraHighlightPolylineData (values, extraKey, index, value,  $t) {
  const color = colorValue(extraKey, index, value)
  const label = getExtraValueLabel(extraKey, value,  $t).toLowerCase()
  // Values contains an array with the following data:
  // a) position `zero` - the starting index on the route polyline array of
  // where the given extra info starts
  // b) position `1` - the final index on the route polyline array where the
  // given extra info ends.
  // c) position 2 - the value that represents the extra info to be
  // shown on over the route. For example, steepness

  // As some extra info may be present in several non-continuous
  // segments we must get the intervals where the value matches
  // so that we show only the extra info wth the value selected by the user
  const intervals = lodash.filter(values, (v) => {
    return v[2] === value
  })
  return {
    intervals,
    color,
    label
  }
}
