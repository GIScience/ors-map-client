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
    let skillObjects = []
    if (job.skills) {
      for (let id of job.skills) {
        skillObjects.push(Skill.getName(id))
      }
    }
    return new Job(job.location[0], job.location[1], job.placeName, {
      id: job.id,
      service: job.service,
      skills: skillObjects,
      priority: job.priority,
      time_windows: job.time_windows,
      resolve: true
    })
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
      'delivery': this.delivery
    }

    if (this.skills.length) {
      let skillIds = []
      for (const skill of this.skills) {
        skillIds.push(skill.id)
      }
      skillIds.sort()
      out['skills'] = skillIds
    }
    if (this.time_windows.length) {
      out['time_windows'] = this.time_windows
    }
    return stringify ? JSON.stringify(out) : out
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
