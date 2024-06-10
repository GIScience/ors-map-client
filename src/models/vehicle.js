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
    this.capacity = options.capacity || [5]
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

  static fromGeoJsonObject(vObject) {
    let skillObjects = []
    if (vObject.properties.skills) {
      for (let id of vObject.properties.skills) {
        skillObjects.push(Skill.getName(id))
      }
    }
    return new Vehicle(
      vObject.geometry.coordinates[0][0],
      vObject.geometry.coordinates[0][1],
      '',
      {
        id: vObject.properties.id,
        description: vObject.properties.description,
        profile: vObject.properties.profile,
        start: vObject.properties.start,
        end: vObject.geometry.coordinates[1],
        capacity: vObject.properties.capacity,
        skills: skillObjects,
        time_window: vObject.properties.time_window,
        resolve: true,
      }
    )
  }

  static fromCsv(csv) {
    const lines = csv.split('\n')
    const header = lines[0].split(',')

    let vehicles = []
    for (let i=1; i < lines.length; i++) {
      let obj = {}
      let currentLine = lines[i].split(',')

      for (const k in header){
        let parsedLine
        if (header[k] !== 'description' || header[k] !== 'profile') {
          parsedLine = Number(currentLine[k])
        } else {
          parsedLine = currentLine[k]
        }

        if (header[k] === 'start_lng' || header[k] === 'end_lng') {
          obj[header[k].split('_')[0]] = [parsedLine]
        } else if (header[k] === 'start_lat' || header[k] === 'end_lat') {
          obj[header[k].split('_')[0]].push(parsedLine)
        } else if (['skills', 'capacity', 'time_window'].includes(header[k])) {
          obj[header[k]] = [parsedLine]
        } else {
          obj[header[k]] = parsedLine
        }
      }
      vehicles.push(Vehicle.fromObject(obj))
    }

    return vehicles
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
    let props = {
      start: this.start,
      end: this.end,
      id: this.id,
      description: this.description,
      profile: this.profile,
      capacity: this.capacity,
      skills: this.skills,
      time_window: this.time_window
    }
    let out = this.checkProps(props)

    return stringify ? JSON.stringify(out) : out
  }

  toGeoJSON(stringify = false) {
    let props = {
      start: this.start,
      end: this.end,
      id: this.id,
      description: this.description,
      profile: this.profile,
      capacity: this.capacity,
      skills: this.skills,
      time_window: this.time_window
    }
    let out = this.checkProps(props)
    out.label = 'Vehicle ' + this.id

    const geoJsonData = { type: 'Feature', properties: out,
      geometry: { type: 'MultiPoint', coordinates: [this.start, this.end] }}
    return stringify ? JSON.stringify(geoJsonData) : geoJsonData
  }

  static toCsv(vehicles) {
    const csvKeys = ['id', 'start', 'end', 'description', 'profile', 'capacity', 'skills', 'time_windows']
    const header = ['id', 'start_lng', 'start_lat', 'end_lng', 'end_lat', 'description', 'profile', 'capacity', 'skills', 'time_windows']
    let data = header.join()
    for (let v of vehicles) {
      v = v.toJSON()
      let vehicleValues = []
      for (const key of csvKeys) {
        if (key in v) {
          vehicleValues.push(v[key].toString())
        } else {
          vehicleValues.push('')
        }
      }
      data = data + '\n' + vehicleValues.join()
    }
    return data
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

  checkProps (props) {
    let out = {id: props.id, start: props.start}
    for (const p of ['end', 'description', 'profile', 'time_window']) {
      if (props[p].length && props[p] !== 0) {
        out[p] = props[p]
      }
    }
    for (const p of ['capacity']) {
      if (props[p][0] !== 0) {
        out[p] = props[p]
      }
    }

    if (props.skills.length) {
      let skillIds = []
      for (const skill of props.skills) {
        skillIds.push(skill.id)
      }
      skillIds.sort((a,b) => a-b)
      out.skills = skillIds
    }

    return out
  }
}

export default Vehicle
