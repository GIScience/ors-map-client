import targetPoisConfig from '@/plugins/target-pois/target-pois-config'
import Place from '@/models/place'
import main from '@/main'

export default {
  props: {
    place: {
      type: Place,
      Required: true
    },
    hideName: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showName () {
      return !this.hideName
    }
  },
  methods: {
    geHumanizedKey(key) {
      let vueInstance = main.getInstance()
      let translations = vueInstance.$t('targetPois')
      if (translations[key]) {
        return translations[key]
      } else {
        let keyHumanized = key.replace(':', ' ').replace('_', ' ')
        return keyHumanized.charAt(0).toUpperCase() + keyHumanized.slice(1)
      }
    },
    showProp (key) {
      let hideProps = targetPoisConfig.hideProps
      if (hideProps.includes(key)) {
        return false
      }
      return true
    }
  }
}
