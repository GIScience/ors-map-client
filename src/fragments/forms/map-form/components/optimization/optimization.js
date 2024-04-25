import MapFormMixin from '../map-form-mixin'
import MapViewDataBuilder from '@/support/map-data-services/map-view-data-builder'
import FieldsContainer from '@/fragments/forms/fields-container/FieldsContainer'
import OrsFilterUtil from '@/support/map-data-services/ors-filter-util'
import FormActions from '@/fragments/forms/map-form/components/form-actions/FormActions'
import {EventBus} from '@/common/event-bus'
import { Optimization } from '@/support/ors-api-runner'
import AppMode from '@/support/app-modes/app-mode'
import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
import appConfig from '@/config/app-config'
import Job from '@/models/job'
import Vehicle from '@/models/vehicle'
import Skill from '@/models/skill'

// Local components
import OptimizationDetails from './components/optimization-details/OptimizationDetails'
import JobList from './components/job-list/JobList.vue'
import VehicleList from './components/vehicle-list/VehicleList.vue'
import EditDialog from './components/edit-dialog/EditDialog.vue'
import EditSkills from './components/edit-skills/EditSkills.vue'

export default {
  mixins: [MapFormMixin],
  data: () => ({
    mode: constants.modes.optimization,
    mapViewData: new MapViewData(),
    skills: [],
    jobs: [],
    vehicles: [],
    pickPlaceSupported: true,
    showEditDialog: false,
    editProp: '',
    editData: [],
    showSkillManagement: false
  }),
  components: {
    FieldsContainer,
    FormActions,
    OptimizationDetails,
    JobList,
    VehicleList,
    EditDialog,
    EditSkills
  },
  computed: {
    jobsJSON () {
      const jsonJobs = []
      for (const job of this.jobs) {
        jsonJobs.push(job.toJSON())
      }
      return jsonJobs
    },
    vehiclesJSON () {
      const jsonVehicles = []
      for (const v of this.vehicles) {
        jsonVehicles.push(v.toJSON())
      }
      return jsonVehicles
    },
    skillsJSON () {
      const jsonSkills = []
      for (const skill of this.skills) {
        jsonSkills.push(skill.toJSON())
      }
      return jsonSkills
    },
    disabledActions () {
      return appConfig.disabledActionsForOptimization
    }
  },
  created () {
    let storedSkills = localStorage.getItem('skills')
    // load skills from local storage if there, otherwise set example skill
    if (storedSkills) {
      const skills = []
      for (const s of JSON.parse(storedSkills)) {
        skills.push(Skill.fromObject(s))
      }
      this.skills = skills
    } else {
      this.skills = [Skill.fromJSON('{"name":"length over 1.5m", "id":1}')]
      localStorage.setItem('skills', JSON.stringify(this.skillsJSON))
    }
    // TODO: remove defaults
    this.jobs = [Job.fromJSON('{"id":1,"service":300,"skills":[1],"amount":[1],"location":[8.68525,49.420822]}')]
    this.vehicles = [Vehicle.fromJSON('{"id":1,"profile":"driving-car","start":[ 8.675863, 49.418477 ],"end":[ 8.675863, 49.418477 ],"capacity":[4],"skills":[1]}')]
    this.loadData()

    const context = this
    // When the filters object has changed externally, reprocess the app route
    EventBus.$on('filtersChangedExternally', () => {
      if (context.active) {
        context.updateAppRoute()
      }
    })
    // When the user click on a marker to remove it
    EventBus.$on('removePlace', (data) => {
      if (context.active) {
        context.removePlace(data)
      }
    })

    /**
     * Update local object when a mapViewData is uploaded
     */
    EventBus.$on('mapViewDataUploaded', (mapViewData) => {
      if (context.active) {
        context.mapViewData = mapViewData
        context.jobs = mapViewData.jobs
        context.vehicles = mapViewData.vehicles
      }
    })

    /**
     * If the map data view has changed and this component
     * is not active, then reset its data to the initial state
     */
    EventBus.$on('mapViewDataChanged', () => {
      if (!context.active) {
        context.mapViewData = new MapViewData()
        context.jobs = []
        context.vehicles = []
      }
    })

    // On map right click -> addJob
    EventBus.$on('addJob', (data) => {
      context.addJob(data)
    })

    // On popup edit click -> edit job
    EventBus.$on('editJob', (index) => {
      context.manageJobs(index)
    })

    // On map right click -> addVehicle
    EventBus.$on('addVehicle', (data) => {
      context.addVehicle(data)
    })

    // On popup edit click -> edit vehicle
    EventBus.$on('editVehicle', (index) => {
      context.manageVehicles(index)
    })

    // When a marker drag finishes, update
    // the place coordinates and re-render the map
    EventBus.$on('markerDragged', (marker) => {
      if (context.active) {
        if (marker.text.startsWith('V')) {
          let vehicle = context.vehicles[parseInt(marker.text.slice(1))-1]
          vehicle.setLngLat(marker.position.lng, marker.position.lat)
          context.updateAppRoute()
        } else {
          let job = context.jobs[parseInt(marker.text)-1]
          job.setLngLat(marker.position.lng, marker.position.lat)
          context.updateAppRoute()
        }
      }
    })

    // place is picked from Map
    EventBus.$on('setInputPlace', (data) => {
      if (context.active) {
        let id = data.placeInputId
        // pickEditSource indicates which property the place should fill
        if (data.pickEditSource === 'jobs') {
          if (id > context.jobs.length) {
            let job = Job.fromPlace(data.place)
            job.setId(id)
            context.jobs.push(job)
          } else {
            context.jobs[data.pickPlaceIndex].location = data.place.coordinates
          }
          context.manageJobs(id)
        } else if (data.pickEditSource === 'vehicleStart') {
          if (id > context.vehicles.length) {
            let v = Vehicle.fromPlace(data.place)
            v.setId(id)
            context.vehicles.push(v)
          } else {
            const v = context.vehicles[data.pickPlaceIndex]
            if (v.end[0] === v.start[0] && v.end[1] === v.start[1]) {
              context.vehicles[data.pickPlaceIndex].end = data.place.coordinates
            }
            context.vehicles[data.pickPlaceIndex].start = data.place.coordinates
          }
          context.manageVehicles(id)
        } else if (data.pickEditSource === 'vehicleEnd') {
          this.vehicles[data.pickPlaceIndex].end = data.place.coordinates
          context.manageVehicles(id)
        }
      } else {
        context.setSidebarIsOpen(true)
        context.$forceUpdate()
      }
    })
  },
  watch: {
    $route: function () {
      if (this.$store.getters.mode === constants.modes.optimization) {
        this.loadData()
      } else {
        this.skills = []
        this.jobs = []
        this.vehicles = []
      }
    }
  },
  methods: {
    /**
     * When the user click on the map and select a point as the route start
     * @param {*} data {latLng: ..., place:...}
     */
    addJob (data) {
      const job = Job.fromPlace(data.place)
      job.setId(this.jobs.length + 1)
      const context = this
      job.resolve().then(() => {
        context.jobs.push(job)
        context.manageJobs(job.id)
        context.updateAppRoute()
      }).catch((err) => {
        console.log(err)
        context.showError(this.$t('optimization.couldNotResolveTheJobLocation'), { timeout: 0 })
      })
    },
    // open editJobs dialog
    manageJobs(jobId) {
      this.editProp = 'jobs'
      this.editData = this.jobs
      this.showEditDialog = true
      EventBus.$emit('showEditModal', jobId)
    },
    // when there are no jobs and button in sidebar is clicked
    addJobFromMap() {
      this.showInfo(this.$t('placeInput.clickOnTheMapToSelectAPlace'))
      this.setPickPlaceSource(this.jobs)
    },

    // when the user clicks on the map and selects a point as the route start
    addVehicle (data) {
      const vehicle = Vehicle.fromPlace(data.place)
      vehicle.setId(this.vehicles.length + 1)
      const context = this
      vehicle.resolve().then(() => {
        if (this.vehicles.length > 3) {
          this.showError(this.$t('optimization.vehicleMaxWarning'), {timeout: 3000})
        }
        context.vehicles.push(vehicle)
        context.manageVehicles(vehicle.id)
        context.updateAppRoute()
      }).catch((err) => {
        console.log(err)
        context.showError(this.$t('optimization.couldNotResolveTheVehicleLocation'), { timeout: 0 })
      })
    },
    // open editVehicles dialog
    manageVehicles(vehicleId) {
      this.editProp = 'vehicles'
      this.editData = this.vehicles
      this.showEditDialog = true
      EventBus.$emit('showEditModal', vehicleId)
    },
    // when there are no vehicles and button in sidebar is clicked
    addVehicleFromMap() {
      this.showInfo(this.$t('placeInput.clickOnTheMapToSelectAPlace'))
      this.setPickPlaceSource(this.vehicles)
    },

    // open editSkills dialog
    manageSkills(skillId) {
      this.showSkillManagement = true
      EventBus.$emit('showSkillsModal', skillId)
    },

    // Set the pick place input source
    setPickPlaceSource (source) {
      if (this.pickPlaceSupported) {
        this.$store.commit('pickPlaceIndex', source.length)
        this.$store.commit('pickPlaceId', source.length + 1)
        if (source === this.jobs) {
          this.$store.commit('pickEditSource', 'jobs')
        } else if (source === this.vehicles) {
          this.$store.commit('pickEditSource', 'vehicleStart')
        }
      }
    },
    // remove job or vehicle when marker is deleted from map view
    removePlace (data) {
      if (data.job) {
        let index = data.job.id - 1
        this.jobs.splice(index,1)
        for (const i in this.jobs) {
          this.jobs[i].setId(parseInt(i)+1)
        }
      } else if (data.vehicle) {
        let index = data.vehicle.id - 1
        this.vehicles.splice(index,1)
        for (const i in this.vehicles) {
          this.vehicles[i].setId(parseInt(i)+1)
        }
      }
      this.updateAppRoute()
    },
    /**
     * After each change on the map search we redirect the user to the built target app route
     * The data will be loaded from the path and the map will be updated, keeping the
     * url synchronized with the current map status
     */
    updateAppRoute () {
      let localCoords = this.jobs.map(j => j.coordinates)
      const appRouteData = this.$store.getters.appRouteData
      let urlCoords = appRouteData.places.map(urlJ => urlJ.coordinates)
      if (JSON.stringify(localCoords) !== JSON.stringify(urlCoords) || JSON.stringify(this.vehiclesJSON) !== JSON.stringify(appRouteData.options.vehicles)) {
        const jobs = this.jobs
        const vehicles = this.vehiclesJSON
        this.$store.commit('mode', constants.modes.optimization)
        const appMode = new AppMode(this.$store.getters.mode)
        const route = appMode.getRoute(jobs, {vehicles: vehicles})
        if (Object.keys(route.params).length > 1) {// params contains data and placeName? props
          this.$router.push(route)
        }
      }
    },
    // return start and end if they differ, otherwise only the start location of vehicle
    vehicleLocations (vehicle) {
      if (vehicle.end) {
        return [vehicle.start, vehicle.end]
      } else {
        return vehicle.start
      }
    },
    /**
     * Update the value in the filter when a parameter is updated in form-fields
     * and then change the app route
     *
     * @param {*} data
     */
    filterUpdated (data) {
      if (data.value !== undefined) {
        if (data.parentIndex !== undefined) {
          const parent = OrsFilterUtil.getFilterByAncestryAndItemIndex(data.parentIndex, data.index)
          parent.value = data.value
        } else {
          this.OrsMapFiltersAccessor[data.index].value = data.value
        }
      }
      this.updateAppRoute()
    },
    /**
     * Request and draw a route based on the value of multiples places input
     * @returns {Promise}
     */
    optimizeJobs () {
      localStorage.setItem('jobs', JSON.stringify(this.jobsJSON))
      localStorage.setItem('vehicles', JSON.stringify(this.vehiclesJSON))
      const context = this
      return new Promise((resolve) => {
        if (context.jobs.length) {
          if (context.vehicles.length) {
            context.showInfo(context.$t('optimization.optimizeJobs'), { timeout: 0 })
            EventBus.$emit('showLoading', true)

            // Calculate the optimized routes
            Optimization(context.jobs, context.vehicles).then(data => {
              data.options.translations = context.$t('global.units')

              data = context.$root.appHooks.run('beforeBuildOptimizationMapViewData', data)
              if (data) {
                MapViewDataBuilder.buildMapData(data, context.$store.getters.appRouteData).then((mapViewData) => {
                  context.mapViewData = mapViewData
                  context.mapViewData.jobs = context.jobs
                  context.mapViewData.vehicles = context.vehicles
                  EventBus.$emit('mapViewDataChanged', mapViewData)
                  EventBus.$emit('newInfoAvailable')
                  context.showSuccess(context.$t('optimization.optimizationResultReady'), { timeout: 2000 })
                  context.setSidebarIsOpen()
                  resolve(mapViewData)
                })
              }
            }).catch(result => {
              context.handleOptimizeJobsError(result)
            }).finally(() => {
              EventBus.$emit('showLoading', false)
            })
          } else {
            context.showError('No vehicles given. Please add a Vehicle to optimize')
          }
        } else {
          context.showError('No jobs given. Please add some Jobs to optimize')
          // There are no enough places or round trip to be routed
          resolve({})
        }
      })
    },
    /**
     * Handle the route places error response displaying the correct message
     * @param {*} result
     * @param {*} args
     */
    handleOptimizeJobsError (result) {
      this.$root.appHooks.run('beforeHandleOptimizationError', result)

      const errorCode = this.lodash.get(result, constants.responseErrorCodePath)
      if (errorCode) {
        const errorKey = `optimization.apiError.${errorCode}`
        let errorMsg = this.$t(errorKey)
        if (errorMsg === errorKey) {
          errorMsg = this.$t('optimization.genericErrorMsg')
        }
        this.showError(errorMsg, { timeout: 0, mode: 'multi-line' })
        console.error(result.response.error)
      } else {
        this.showError(this.$t('optimization.notPossible'), { timeout: 0 })
        console.error(result)
      }
    },

    /**
     * Load the map data from the url
     * rebuilding the place inputs, and its values
     * and render the map with this data (place or route)
     */
    loadData () {
      if (this.$store.getters.mode === constants.modes.optimization) {
        // Empty the array and populate it with the
        // places from the appRoute without changing the
        // object reference because it is a prop
        const defaultJobs = this.jobs
        const defaultVehicles = this.vehicles
        this.jobs = this.$store.getters.appRouteData.jobs
        const urlVehicles = this.$store.getters.appRouteData.options.vehicles
        let places = this.$store.getters.appRouteData.places
        let storedJobs = localStorage.getItem('jobs')
        let storedVehicles = localStorage.getItem('vehicles')
        // prioritise data from url, then data from local storage
        if (urlVehicles) {
          const vehicles = []
          for (let v of urlVehicles) {
            vehicles.push(Vehicle.fromObject(v))
          }
          this.vehicles = vehicles
        } else if (this.vehicles === undefined && storedVehicles) {
          const vehicles = []
          for (const v of JSON.parse(storedVehicles)) {
            vehicles.push(Vehicle.fromObject(v))
          }
          this.vehicles = vehicles
        } else if (this.vehicles === undefined || !this.vehicles.length) {
          this.vehicles = defaultVehicles
        }
        const jobs = []
        if (places.length > 0) {
          for (const [i, place] of places.entries()) {
            const job = Job.fromPlace(place)
            job.setId(i + 1)
            jobs.push(job)
          }
        } else if (this.jobs === undefined && storedJobs) {
          for (const job of JSON.parse(storedJobs)) {
            jobs.push(Job.fromObject(job))
          }
        }
        this.jobs = jobs
        if (!this.jobs.length) {
          this.jobs = defaultJobs
        }
        this.optimizeJobs()
      }
    },
    // when jobs are changed update jobs and generate new route
    jobsChanged(editedJobs) {
      let newJobs = []
      for (const job of editedJobs) {
        newJobs.push(job.clone())
      }
      this.jobs = newJobs
      this.updateAppRoute()
    },
    // when vehicles are changed update vehicles and generate new route
    vehiclesChanged(editedVehicles) {
      let newVehicles = []
      for (const vehicle of editedVehicles) {
        newVehicles.push(vehicle.clone())
      }
      this.vehicles = newVehicles
      this.updateAppRoute()
    },
    // when skills are changed update skills
    skillsChanged(editedSkills) {
      let newSkills = []
      for (const skill of editedSkills) {
        newSkills.push(skill.clone())
      }
      this.skills = newSkills
    },
  }
}
