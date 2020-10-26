import OrsFilterUtil from '@/support/map-data-services/ors-filter-util'
import settingsOptions from '@/resources/settings-options.js'
import defaultMapSettings from '@/resources/default-map-settings'
import constants from '@/resources/constants'
import utils from '@/support/utils'
import lodash from 'lodash'

export default {
  data: () => ({
    mapSettingsTransient: {
      endpoints: {}
    },
    appLocales: [],
    availableUnits: [],
    availableAreaUnits: [],
    customApiKey: false,
  }),
  computed: {
    routingLocales () {
      return settingsOptions.routingInstructionsLocales
    },
    availableTileServices () {
      let services = settingsOptions.tileServices
      if (this.mapSettingsTransient.customTileProviderUrl === null || this.mapSettingsTransient.customTileProviderUrl.length === 0) {
        services = lodash.filter(services, function (s) {
          return s.value !== 'custom'
        })
      }
      return services
    },
    availableProfiles () {
      let filterRef = OrsFilterUtil.getFilterRefByName(constants.profileFilterName)
      let options = []
      for (let key in filterRef.enum) {
        let itemVal = filterRef.enum[key]
        options.push({value: itemVal, text: this.$t('orsMapFilters.profiles.' + itemVal)})
      }
      return options
    },
    apiKeyLabel () {
      return this.customApiKey == true ? this.$t('settings.customApiKey') : this.$t('settings.apiKey')
    }
  },
  methods: {
    save () {
      this.$store.commit('mapSettings', this.mapSettingsTransient)
      localStorage.removeItem('mapSettings')
      if (this.mapSettingsTransient.saveToLocalStorage) {
        let context = this
        this.$store.dispatch('saveSettings', savingSettings).then(() => {
          if (context.$i18n.locale !== savingSettings.locale) {
            context.$i18n.locale = savingSettings.locale
            context.confirmDialog(context.$t('settings.reloadToApplyLanguageChangeTitle'), context.$t('settings.reloadToApplyLanguageChangeText')).then((response) => {
              if (response === true) {
                window.location.reload()
              }
            })
          }          
        })        
      }
      // Dispatch an event about the locale change
      this.eventBus.$emit('localeChanged', this.mapSettingsTransient.locale)
    },
    saveAll () {
      if (!this.validateSettings()) {
        this.showError(this.$t('settings.invalidSettingsValue'))
      } else {
        this.save()
        this.showSuccess(this.$t('settings.mapSettingsSaved'))
      }
    },
    restoreDefaultMapSettings () {
      this.mapSettingsTransient = this.mapSettingsTransient = utils.clone(defaultMapSettings)
      this.setIsCustomApiKey()
      this.save()
      this.showSuccess(this.$t('settings.defaultMapSettingsRestored'))

    },
    validateSettings () {
      let valid = true
      if (!this.mapSettingsTransient.locale || !this.mapSettingsTransient.unit || !this.mapSettingsTransient.apiKey || this.mapSettingsTransient.apiKey === '') {
        valid = false
      }
      for (const key in this.mapSettingsTransient.endpoints) {
        if (!this.mapSettingsTransient.endpoints[key] || this.mapSettingsTransient.endpoints[key] === '') {
          valid = false
        }
      }
      return valid
    },
    saveMapSettings () {
      this.$store.commit('mapSettings', this.mapSettingsTransient)
      this.showSuccess(this.$t('settings.mapSettingsSaved'))
    },
    setIsCustomApiKey () {
      const savingSettings = utils.clone(this.mapSettingsTransient)
      const defaultSettings = defaultMapSettings

      // The apiKey must not be saved if it is the default one (if is not a custom one)
      if (savingSettings.apiKey !== defaultSettings.apiKey) {
        this.customApiKey = true
      }
    }
  },

  created () {
    this.appLocales = settingsOptions.appLocales
    this.availableUnits = settingsOptions.units
    this.availableAreaUnits = settingsOptions.areUnits
    this.mapSettingsTransient = utils.clone(this.$store.getters.mapSettings)
    this.setIsCustomApiKey()
  }
}
