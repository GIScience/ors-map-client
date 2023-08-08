import lodash from 'lodash'

/**
 * Get the chart columns from route coordinate length
 * @param route - route response object
 */
const getColumns = (route) => {
  let coordinates = []
  if (route && route.geometry && route.geometry.coordinates) {
    coordinates = route.geometry.coordinates
  }
  const columns = coordinates.length
  return Array(columns).fill('')
}

/**
 * Build the chart datasets from the Z value of the route coordinates
 * @param route - route response object
 * @param metersTranslation - localized 'meters' string
 */
const getDatasets = (route, metersTranslation) => {
  const altitudeDataset = {
    label: metersTranslation,
    data: []
  }
  let coordinates = []
  if (route?.geometry?.coordinates) {
    coordinates = route.geometry.coordinates
  }

  lodash.each(coordinates, (data) => {
    if (data.length > 2) {
      altitudeDataset.data.push(Math.round(data[2]))
    }
  })
  return [altitudeDataset]
}

const parse = (route, translations) => {
  return {
    labels: getColumns(route),
    datasets: getDatasets(route, translations)
  }
}

export default {
  parse
}
