import Place from '@/models/place'
import Skill from '@/models/skill'

class Vehicle extends Place {
  constructor(lng = null, lat = null, placeName = '', options = {}) {
    super(lng, lat, placeName, options)

    this.start = options.start || this.coordinates
    this.end = options.end || this.coordinates

    this.id = options.id || null
    this.description = options.description || ''
    this.profile = options.profile || 'driving-car'
    this.capacity = options.capacity || [1]
    this.skills = options.skills || []
    this.time_window = options.time_window || []
  }

  static fromPlace(place) {
    return new Vehicle(place.lng, place.lat, place.placeName, {
      id: place.placeId,
    })
  }

  /**
   * @param {String} vehicleJSONString
   */
  static fromJSON(vehicleJSONString) {
    let vehicle = JSON.parse(vehicleJSONString)
    return this.fromObject(vehicle)
  }

  static fromObject(vObject) {
    let skillObjects = []
    if (vObject.skills) {
      for (let id of vObject.skills) {
        skillObjects.push(Skill.getName(id))
      }
    }
    return new Vehicle(
      vObject.start[0] || vObject.end[0],
      vObject.start[1] || vObject.end[1],
      vObject.placeName,
      {
        id: vObject.id,
        description: vObject.description,
        profile: vObject.profile,
        start: vObject.start,
        end: vObject.end,
        capacity: vObject.capacity,
        skills: skillObjects,
        time_window: vObject.time_window,
        resolve: true,
      }
    )
  }

  clone() {
    return Vehicle.fromJSON(this.toJSON(true))
  }

  /**
   * Set the vehicle id
   * @param {*} id
   */
  setId(id) {
    this.id = id
  }

  toJSON(stringify = false) {
    let out = {
      id: this.id,
      description: this.description,
      profile: this.profile,
      start: this.start,
      end: this.end,
      capacity: this.capacity,
    }

    if (this.skills.length) {
      let skillIds = []
      for (const skill of this.skills) {
        skillIds.push(skill.id)
      }
      skillIds.sort()
      out.skills = skillIds
    }
    if (this.time_window.length) {
      out.time_window = this.time_window
    }
    return stringify ? JSON.stringify(out) : out
  }

  static vehiclesFromFeatures(vehicles) {
    const out = []
    for (const v of vehicles) {
      vehicles.push(Vehicle.fromJSON(v))
    }
    return out
  }

  setLngLat (lng, lat) {
    super.setLngLat(lng, lat)
    this.start = this.coordinates
    this.end = this.coordinates
  }
}

export default Vehicle
