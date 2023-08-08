import OrsFilterUtil from '@/support/map-data-services/ors-filter-util'
import settingsOptions from '@/config/settings-options.js'
import defaultMapSettings from '@/config/default-map-settings'
import constants from '@/resources/constants'
import utils from '@/support/utils'
import lodash from 'lodash'
import {EventBus} from '@/common/event-bus'

export default {
  data: () => ({
    mapSettingsTransient: {
      endpoints: {}
    },
    appLocales: [],
    availableUnits: [],
    availableAreaUnits: [],
    customApiKey: false,
    resetShownOnceTooltips: false
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
      if (this.mapSettingsTransient.saveToLocalStorage) {
        let context = this
        const savingSettings = utils.clone(this.mapSettingsTransient)
        if (this.resetShownOnceTooltips) {
          savingSettings.shownOnceTooltips = {}
        } else {
          savingSettings.shownOnceTooltips = this.$store.getters.mapSettings.shownOnceTooltips
        }
        let activeLocale = savingSettings.locale
        this.$store.dispatch('saveSettings', savingSettings).then(() => {
          if (activeLocale && context.$i18n.locale !== activeLocale) {
            context.$i18n.locale = savingSettings.locale
            let title = context.$t('settings.reloadToApplyLanguageChangeTitle')
            let text = context.$t('settings.reloadToApplyLanguageChangeText')
            context.confirmDialog(title, text).then((data) => {
              if (data.response === 'yes') {
                window.location.reload()
              }
            })
          }
          EventBus.$emit('mapSettingsChanged', savingSettings)
          this.$emit('saved')
        })
      }
      // Dispatch an event about the locale change
      EventBus.$emit('localeChanged', this.mapSettingsTransient.locale)
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
      this.resetShownOnceTooltips = true
      this.save()
      this.customApiKey = false
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
    let units = utils.clone(settingsOptions.units)
    for (let key in units) {
      units[key].text = this.$t('options.units.'+ units[key].slug)
    }
    let areUnits = utils.clone(settingsOptions.areUnits)
    for (let key in units) {
      areUnits[key].text = this.$t('options.areUnits.'+ areUnits[key].slug)
    }

    this.appLocales = settingsOptions.appLocales
    this.availableUnits = units
    this.availableAreaUnits = areUnits
    this.mapSettingsTransient = utils.clone(this.$store.getters.mapSettings)
    this.mapSettingsTransient.apiKey = this.mapSettingsTransient.apiKey || defaultMapSettings.apiKey
    this.setIsCustomApiKey()
  }
}
