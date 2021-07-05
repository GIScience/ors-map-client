import theme from '@/config/theme'
import lodash from 'lodash'

/**
 * Get the  columns from the the mapViewData @see src/models/map-view-data
 * @param {*} mapViewData
 */
const getColumns = (mapViewData, routeIndex) => {
  let coordinates = []
  const route = mapViewData.routes[routeIndex]
  if (route && route.geometry && route.geometry.coordinates) {
    coordinates = route.geometry.coordinates
  }
  const columns = coordinates.length
  return Array(columns)
}

/**
 * Get the datasets from the mapViewData @see src/models/map-view-data
 * @param {*} mapViewData
 */
const getDatasets = (mapViewData, routeIndex, translations) => {
  const altitudeDataset = {
    label: translations.meters,
    borderColor: theme.info,
    borderWidth: 0,
    backgroundColor: '#A1C8DC',
    pointHoverBackgroundColor: 'white',
    showLines: false,
    fill: 'origin',
    pointRadius: 0,
    data: []
  }
  let coordinates = []
  const route = mapViewData.routes[routeIndex]
  if (route && route.geometry && route.geometry.coordinates) {
    coordinates = route.geometry.coordinates
  }

  lodash.each(coordinates, (data) => {
    if (data.length > 2) {
      altitudeDataset.data.push(Math.round(data[2]))
    }
  })
  return [altitudeDataset]
}

const parse = (mapViewData, routeIndex, translations) => {
  const parsed = {
    labels: getColumns(mapViewData, routeIndex),
    datasets: getDatasets(mapViewData, routeIndex, translations)
  }
  return parsed
}

export default {
  parse
}
