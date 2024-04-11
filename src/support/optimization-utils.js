import constants from '@/resources/constants'
import {vehicleIcon} from '@/support/map-data-services/ors-filter-util'

export const vehicleColors = (vehicleId) => {
  return constants.vehicleColors[vehicleId]
}

export const getVehicleIconName = (vehicleId) => {
  let v = JSON.parse(localStorage.getItem('vehicles'))
  return vehicleIcon(v.find(e => e.id === vehicleId).profile)
}
