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
    let out = {
      'id': this.id,
      'location': this.location,
      'service': this.service,
      'delivery': this.delivery,
      'pickup': this.pickup
    }

    if (this.skills.length) {
      let skillIds = []
      for (const skill of this.skills) {
        skillIds.push(skill.id)
      }
      skillIds.sort((a,b) => a-b)
      out['skills'] = skillIds
    }
    if (this.time_windows.length) {
      out['time_windows'] = this.time_windows
    }
    return stringify ? JSON.stringify(out) : out
  }

  toGeoJSON(stringify = false) {
    let props = {label: 'Job ' + this.id}
    for (const p in ['id', 'service', 'delivery', 'pickup', 'time_windows']) {
      if (this[p] && this[p].length) {
        props[p] = this[p]
      }
    }

    if (this.skills && this.skills.length) {
      let skillIds = []
      for (const skill of this.skills) {
        skillIds.push(skill.id)
      }
      skillIds.sort((a,b) => a-b)
      props.skills = skillIds
    }

    const geoJsonData = { type: 'Feature',  properties: props, geometry: { type: 'Point', coordinates: this.location }}
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
}
export default Job
