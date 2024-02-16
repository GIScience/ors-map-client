import {PlacesSearch, ReverseGeocode} from '@/support/ors-api-runner'
import Utils from '@/support/utils'
import GeoUtils from '@/support/geo-utils'
import appConfig from '@/config/app-config'
import RouteImporter from '@/fragments/forms/route-importer/RouteImporter.vue'
import MapFormBtn from '@/fragments/forms/map-form-btn/MapFormBtn.vue'
import PlaceInput from '@/fragments/forms/place-input/PlaceInput.vue'
import EditSkills from '@/fragments/forms/map-form/components/optimization/components/skill-list/EditSkills.vue'
import {EventBus} from '@/common/event-bus'
import Job from '@/models/job'
import Skill from '@/models/skill'
import Place from '@/models/place'

export default {
  data: () => ({
    isJobsOpen: true,
    editId: 0,
    editJobs: [],
    jobSkills: [],
    pastedJobs: [],
    JsonPlaceholder: '[{"id":1,"location":[8.68525,49.420822],"service":300,"delivery":[1],"skills":[1]}]',
    focused: false,
    searching: false,
    debounceTimeoutId: null,
    saveToLocalStorage: true,
    showSkillManagement: false,
    isImportOpen: false
  }),
  props: {
    jobs: {
      Type: Array[Job],
      Required: true
    },
    skills: {
      Type: Array[Skill],
      Required: false
    },
    model: {
      Type: Place,
      Required: false
    },
    // Amount of place inputs
    disabledActions: {
      default: () => [],
      type: Array,
    }
  },
  components: {
    RouteImporter,
    MapFormBtn,
    PlaceInput,
    EditSkills,
    EventBus
  },
  computed: {
    editJobsJSON () {
      const jsonJobs = []
      for (const job of this.editJobs) {
        jsonJobs.push(job.toJSON())
      }
      return jsonJobs
    },
    placeSuggestions () {
      if (!this.focused) {
        return []
      }
      let suggestions = []
      if (this.localModel.nameIsNumeric()) {
        const latLng = this.model.getLatLng()
        const rawCoordinatesPlace = new Place(latLng.lng, latLng.lat, `${latLng.lng},${latLng.lat}`, { properties: { layer: 'rawCoordinate' } })
        rawCoordinatesPlace.rawCoordinate = true
        suggestions.push(rawCoordinatesPlace)
      }
      suggestions = suggestions.concat(this.localModel.suggestions)
      return suggestions
    },
  },
  created () {
    // this.loadSkills()

    for (const job of this.jobs) {
      this.editJobs.push(job.clone())
    }

    for (const skill of this.skills) {
      this.jobSkills.push(skill.clone())
    }

    const context = this
    // edit Jobs box is open
    EventBus.$on('showJobsModal', (editId) => {
      context.isJobsOpen = true
      context.editId = editId
    })
  },
  methods: {
    isEnabled (action) {
      const disabled = this.disabledActions
      return !disabled.includes(action)
    },

    closeJobsModal () {
      this.isJobsOpen = false
      this.$emit('close')
    },

    contentUploaded (data) {
      this.$emit('contentUploaded', data)
    },

    importJobs () {
      this.isImportOpen = true
    },
    closeImport() {
      this.isImportOpen = false
      this.$emit('close')
    },
    saveJobImport() {
      try {
        const jobs = []
        for (const s of JSON.parse(this.pastedJobs)) {
          jobs.push(Job.fromObject(s))
        }
        this.editJobs = jobs

        this.isImportOpen = false
        this.saveJobs()
      } catch (err) {
        this.showError(this.$t('optimization.notAJson'), {timeout: 3000})
      }
    },

    exportJobs () {
      navigator.clipboard.writeText(JSON.stringify(this.editJobsJSON)).then(() => {
        this.showSuccess(this.$t('job.copiedToClipboard'), {timeout: 3000})
      }, () => {
        this.showError(this.$t('job.copiedToClipboardFailed'), {timeout: 3000})
      },)
    },
    emptyLocation () {
      for (let jobId in this.editJobs) {
        if (this.editJobs[jobId].location === null) {
          return true
        }
      }
      return false
    },
    saveJobs () {
      if (this.emptyLocation()) {
        this.showError('Added job does not have a valid location', {timeout: 3000})
      } else {
        this.$emit('jobsChanged', this.editJobs)
        if (this.saveToLocalStorage) {
          localStorage.setItem('jobs', JSON.stringify(this.editJobsJSON))
        }
        this.closeJobsModal()
      }
    },
    addJob (fromMap) {
      if(fromMap) {
        // TODO: choose point from map
        this.showError(this.$t('global.notImplemented'), {timeout: 3000})
      } else {
        let job = new Job()
        this.model = new Place()
        let id = this.editJobs.length + 1
        job.setId(id)
        this.editJobs.push(job)
        this.editId = id
      }
    },
    switchToSearch () {
      this.model = new Place()
      this.editJobs[this.editId - 1].location = null
    },
    setFocus (data) {
      // When the user clicks outside an input this method is called and is intended to
      // set the focus as false in this case. To do so, we check if the was previously focused
      // The parameters passed (automatically) by the click-outside is expected to be MouseEvent object and no a boolean.
      if (typeof data === 'object' && data.clickedOutside) {
        if (this.inputWasActiveAndLostFocus(data)) {
          this.emptyPickPlaceSource()
          this.focused = false
        }
      } else {
        this.focused = data // data is boolean in this case
      }
      // If the job location is in search mode, then run the autocompleteSearch that will show the suggestions
      if (this.focused) {
        this.autocompleteSearch()
      }
    },
    highlightedName (placeName) {
      let searchMask = this.localModel.placeName
      const regEx = new RegExp(searchMask, 'ig')
      let localPlaceName = this.localModel.placeName
      let replaceMask
      if ((placeName.toLowerCase()).indexOf(this.localModel.placeName.toLowerCase() + ' ') === 0) {
        localPlaceName = localPlaceName[0].toUpperCase() + localPlaceName.substring(1) + '&nbsp;'
      } else if ((placeName.toLowerCase()).indexOf(this.localModel.placeName.toLowerCase()) === 0 ) {
        localPlaceName = localPlaceName[0].toUpperCase() + localPlaceName.substring(1)
      } else if ((placeName.toLowerCase()).indexOf(this.localModel.placeName.toLowerCase()) > 0 ) {
        localPlaceName = '&nbsp;' + localPlaceName[0].toUpperCase() + localPlaceName.substring(1)
      }
      replaceMask = `<strong>${localPlaceName}</strong>`

      placeName = placeName.replace(regEx, replaceMask)
      return placeName.trim()
    },
    showAreaIcon (place) {
      return place.properties.layer === 'country' || place.properties.layer === 'region'
    },
    getLayerTranslation (layer) {
      let transKey = 'global.layers.'+ layer
      let translation = this.$t(transKey)
      if (translation !== transKey) {
        return translation
      } else {
        return this.$t('global.layers.notAvailable')
      }
    },
    distance (suggestedPlace) {
      // Set origin and destination
      const fromLatLng = { lat: this.$store.getters.mapCenter.lat, lng: this.$store.getters.mapCenter.lng }
      const toLatLng = { lat: suggestedPlace.lat, lng: suggestedPlace.lng }

      // calculate the distance between the two points
      let distance = GeoUtils.calculateDistanceBetweenLocations(fromLatLng, toLatLng, this.$store.getters.mapSettings.unit)

      if (distance > 0) {
        distance = distance.toFixed(1)
      } else {
        distance = 0
      }
      return distance
    },
    selectSuggestion (suggestedPlace) {
      // Only proceed if it is being selected
      // a place different from the current one
      if (!suggestedPlace.equals(this.model)) {
        // If the suggested place is a ra coordinate, remove the layer attribute
        // because it is a placeholder, not a valid layer
        if (suggestedPlace.rawCoordinate) {
          delete suggestedPlace.properties.layer
        }
        this.selectPlace(suggestedPlace)
        this.$forceUpdate()
        this.selected()
      }
    },
    selectPlace (place) {
      // We shall not reassign an external object, so we update each property
      this.model.placeName = place.properties.label || place.placeName
      this.model.placeId = place.properties.id
      this.model.setLngLat(place.lng, place.lat)
      this.model.properties = place.properties
      this.model.suggestions = []
      this.searching = false
      // If a place is selected from a suggestion then no current location must be active.
      this.$store.commit('currentLocation', null)
    },
    selected () {
      this.focused = false
      this.editJobs[this.editId-1].location = this.model.coordinates
    },
    locationInputChanged (event = null) {
      this.localModel = this.model.clone()
      if (event) {
        const isPasteEvent = event instanceof ClipboardEvent
        // In case of a ClipboardEvent (ctr + v) we must just ignore, since the input
        // model  has not changed yet, and it will trigger another change event when it changes
        if (!isPasteEvent) {
          event.preventDefault()
          event.stopPropagation()
          clearTimeout(this.debounceTimeoutId)
          const context = this

          // Make sure that the changes in the input are debounced
          this.debounceTimeoutId = setTimeout(function () {
            if (context.localModel.nameIsNumeric()) {
              let latLng = context.localModel.getLatLng()
              context.model.setLngLat(latLng.lng, latLng.lat)
            }
            if (event.key === 'Enter') {
              context.focused = false
              // We can only try to auto select the first result if the inputted text is not a coordinate
              if (!context.localModel.nameIsNumeric()) {
                if (appConfig.autoSelectFirstExactAddressMatchOnSearchEnter) {
                  EventBus.$emit('showLoading', true)
                  PlacesSearch(context.localModel.placeName, 10).then(places => {
                    // If the first result is an address and the match_type is exact, then we auto select the first item on the enter/return action
                    const addresses = context.lodash.filter(places, (p) => {
                      return (p.properties.layer === 'address' || p.properties.layer === 'postalcode') && p.properties.match_type === 'exact'
                    })

                    if (addresses.length === 1) {
                      context.selectSuggestion(addresses[0])
                    } else { // if not call the search handler
                      context.autocompleteSearch()
                    }
                  }).catch(response => {
                    console.log(response)
                    // In case of any fail, call the search mode handler
                    context.autocompleteSearch()
                  }).finally(() => {
                    EventBus.$emit('showLoading', false)
                  })
                } else {
                  context.autocompleteSearch()
                }
              } else { // If a coordinate was inputted, call the auto complete
                context.autocompleteSearch()
              }
            } else {
              context.autocompleteSearch()
            }
          }, 1000)
        }
      }
    },
    autocompleteSearch () {
      // Make sure that the local model is up-to-date
      if (!this.localModel || this.localModel.placeName.length === 0) {
        this.localModel = this.model.clone()
      }
      if (this.localModel.nameIsNumeric()) {
        const latLng = this.model.getLatLng()
        EventBus.$emit('showLoading', true)
        const context = this
        ReverseGeocode(latLng.lat, latLng.lng, 10).then(places => {
          const place = new Place(latLng.lng, latLng.lat)
          place.setSuggestions(places)
          context.localModel = place
          context.focused = true
          this.focusIsAutomatic = false
          if (places.length > 1) {
            Utils.hideMobileKeyboard()
          }
          context.$emit('autocompleted')
        }).catch(response => {
          console.log(response)
        }).finally(() => {
          context.searching = false
          EventBus.$emit('showLoading', false)
        })
      } else {
        this.searching = true
        if (!this.localModel.placeName || this.model.placeName.length === 0) {
          this.localModel = new Place()
          this.searching = false
        } else {
          const context = this
          // Run the place search
          EventBus.$emit('showLoading', true)
          PlacesSearch(this.localModel.placeName, 10).then(places => {
            context.localModel.setSuggestions(places)
            context.focused = true
            this.focusIsAutomatic = false
            if (places.length === 0) {
              context.showInfo(context.$t('placeInput.noPlaceFound'))
            } else if (places.length > 1) {
              Utils.hideMobileKeyboard()
            }
            context.$emit('autocompleted')
          }).catch(response => {
            console.log(response)
            context.showError(context.$t('placeInput.unknownSearchPlaceError'))
          }).finally(() => {
            context.searching = false
            EventBus.$emit('showLoading', false)
          })
        }
      }
    },
    removeJob (id) {
      this.editJobs.splice(id-1,1)
      for (const i in this.editJobs) {
        this.editJobs[i].setId(parseInt(i)+1)
      }
    },
    copyJob () {
      this.showError(this.$t('global.notImplemented'), {timeout: 3000})
    },
    restoreJobs () {
      this.editJobs = this.jobs
    },

    loadSkills() {
      // this.jobSkills = this.$store.getters.appRouteData.skills
      let storedSkills = localStorage.getItem('skills')
      if (storedSkills) {
        const skills = []
        for (const skill of JSON.parse(storedSkills)) {
          skills.push(Skill.fromObject(skill))
        }
        this.jobSkills = skills
      }
    },
    manageSkills(skillId) {
      this.showSkillManagement = true
      EventBus.$emit('showSkillsModal', skillId)
    },
    skillsChanged(editedSkills) {
      let newSkills = []
      for (const skill of editedSkills) {
        newSkills.push(skill.clone())
      }
      this.jobSkills = newSkills
    },
  }
}
