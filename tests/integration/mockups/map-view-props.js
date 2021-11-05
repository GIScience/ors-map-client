import defaultMapSettings from '@/config/default-map-settings'
import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
import appConfig from '@/config/app-config'

const mapViewProps = {
  initialZoom: appConfig.initialZoomLevel,
  avoidPolygons: [],
  mapViewData: new MapViewData(),
  center: defaultMapSettings.mapCenter,
  showPopups: false,
  height: 900,
  fitBounds: true,
  showControls: true,
  shrunk: false,
  mode: constants.modes.place,
  supportsDrawingTool: true,
  routingProfileIcon: null
}
export default mapViewProps
