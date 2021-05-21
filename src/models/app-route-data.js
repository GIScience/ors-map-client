import utils from '@/support/utils'
/**
 * AppRouteData class
 */
class AppRouteData {
  /**
   * Constructor
   * @param {*} places
   * @param {*} options
   */
  constructor (places = [], options = { fitBounds: true, search: false }) {
    this.places = places
    this.options = options
  }

  /**
   * Create a clone object
   * @returns  {MapViewData}
   */
  clone () {
    const clone = new AppRouteData()

    clone.options = utils.clone(this.options)

    for (const key in this.places) {
      clone.places.push(this.places[key].clone())
    }
    return clone
  }
}
// export the AppRouteData class
export default AppRouteData
