import Place from '@/models/place'
import Skill from '@/models/skill'

class Job extends Place {
  constructor(lng = null, lat = null, placeName = '', options = {}) {
    super(lng, lat, placeName, options)

    this.location = this.coordinates

    this.id = options.id || null
    this.service = options.service || 0 // time spent at job
    this.skills = options.skills || []
    this.priority = options.priority || 0
    this.delivery = options.delivery || [1]
    this.pickup = options.pickup || [0]
    this.time_windows = options.time_windows || []
  }

  static fromPlace(place) {
    return new Job(place.lng, place.lat, place.placeName, {
      id: place.placeId
    })
  }

  /**
   * @param {String} jobJSONString
   */
  static fromJSON(jobJSONString) {
    let job = JSON.parse(jobJSONString)
    return this.fromObject(job)
  }

  static fromObject(jobObject) {
    let skillObjects = []
    if (jobObject.skills) {
      for (let id of jobObject.skills) {
        skillObjects.push(Skill.getName(id))
      }
    }
    return new Job(jobObject.location[0], jobObject.location[1], jobObject.placeName, {
      id: jobObject.id,
      service: jobObject.service,
      skills: skillObjects,
      priority: jobObject.priority,
      delivery: jobObject.delivery,
      pickup: jobObject.pickup,
      time_windows: jobObject.time_windows,
      resolve: true
    })
  }

  static fromGeoJsonObject(jobObject) {
    let skillObjects = []
    if (jobObject.properties.skills) {
      for (let id of jobObject.properties.skills) {
        skillObjects.push(Skill.getName(id))
      }
    }
    return new Job(jobObject.geometry.coordinates[0], jobObject.geometry.coordinates[1], '', {
      id: jobObject.properties.id,
      service: jobObject.properties.service,
      skills: skillObjects,
      priority: jobObject.properties.priority,
      delivery: jobObject.properties.delivery,
      pickup: jobObject.properties.pickup,
      time_windows: jobObject.properties.time_windows,
      resolve: true
    })
  }

  static fromCsv(csv) {
    const lines = csv.split('\n')
    const header = lines[0].split(',')

    let jobs = []
    for (let i=1; i < lines.length; i++) {
      let obj = {}
      let currentLine = lines[i].split(',')

      for (const k in header){
        let parsedLine = Number(currentLine[k])

        if (header[k] === 'location_lng') {
          obj['location'] = [currentLine[k]]
        } else if (header[k] === 'location_lat') {
          obj['location'].push(parsedLine)
        } else if (['skills', 'delivery', 'pickup', 'time_window'].includes(header[k])) {
          obj[header[k]] = [parsedLine]
        } else {
          obj[header[k]] = parsedLine
        }
      }
      jobs.push(Job.fromObject(obj))
    }

    return jobs
  }

  clone() {
    return Job.fromJSON(this.toJSON(true))
  }

  /**
   * Set the job id
   * @param {*} id
   */
  setId(id) {
    this.id = id
  }

  toJSON(stringify = false) {
    let props = {
      'location': this.location,
      'id': this.id,
      'service': this.service,
      'skills': this.skills,
      'delivery': this.delivery,
      'pickup': this.pickup,
      'time_windows': this.time_windows
    }
    let out = this.checkProps(props)

    return stringify ? JSON.stringify(out) : out
  }

  toGeoJSON(stringify = false) {
    let props = {
      'location': this.location,
      'id': this.id,
      'service': this.service,
      'skills': this.skills,
      'delivery': this.delivery,
      'pickup': this.pickup,
      'time_windows': this.time_windows
    }
    let out = this.checkProps(props)
    out.label = 'Job ' + this.id

    const geoJsonData = { type: 'Feature',  properties: out, geometry: { type: 'Point', coordinates: this.location }}
    return stringify ? JSON.stringify(geoJsonData) : geoJsonData
  }

  static toCsv(jobs) {
    const csvKeys = ['id', 'location', 'service', 'delivery', 'pickup', 'skills', 'time_windows']
    const header = ['id', 'location_lng', 'location_lat', 'service', 'delivery', 'pickup', 'skills', 'time_windows']
    let data = header.join()
    for (let job of jobs) {
      job = job.toJSON()
      let jobValues = []
      for (const key of csvKeys) {
        if (key in job) {
          jobValues.push(job[key].toString())
        } else {
          jobValues.push('')
        }
      }
      data = data + '\n' + jobValues.join()
    }
    return data
  }

  static jobsFromFeatures(jobs) {
    const out = []
    for (const job of jobs) {
      jobs.push(Job.fromJSON(job))
    }
    return out
  }

  setLngLat (lng, lat) {
    super.setLngLat(lng, lat)
    this.location = this.coordinates
  }

  checkProps (props) {
    let out = {id: props.id, location: props.location}
    for (const p of ['service', 'time_windows']) {
      if (props[p].length && props[p] !== 0) {
        out[p] = props[p]
      }
    }
    for (const p of ['delivery', 'pickup',]) {
      if (props[p][0] !== 0) {
        out[p] = props[p]
      }
    }

    if (props.skills && props.skills.length) {
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
export default Job
