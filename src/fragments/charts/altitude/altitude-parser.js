import theme from '@/common/theme'
import lodash from 'lodash'

/**
 * Get the  colums from the the mapviewdata @see src/models/map-view-data
 * @param {*} mapViewData
 */
const getColumns = (mapViewData, routeIndex) => {
  let coordinates = []
  let route = mapViewData.routes[routeIndex]
  if (route && route.geometry && route.geometry.coordinates) {
    coordinates = route.geometry.coordinates
  }
  let columns = coordinates.length
  return Array(columns)
}

/**
 * Get the datasets from the mapviewdata @see src/models/map-view-data
 * @param {*} mapViewData
 */
const getDatasets = (mapViewData, routeIndex) => {
  let altitudeDataset = {
    label: 'Meters',
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
  let route = mapViewData.routes[routeIndex]
  if (route && route.geometry && route.geometry.coordinates) {
    coordinates = route.geometry.coordinates
  }

  lodash.each(coordinates, (data, index) => {
    if (data.length > 2) {
      altitudeDataset.data.push(Math.round(data[2]))
    }
  })
  return [altitudeDataset]
}

const parse = (mapViewData, routeIndex) => {
  let parsed = {
    labels: getColumns(mapViewData, routeIndex),
    datasets: getDatasets(mapViewData, routeIndex)
  }
  return parsed
}

export default {
  parse
}
