import utils from '@/support/utils'
import {EventBus} from '@/common/event-bus'

export default {
  data: () => ({
    infoPromise: null,
    infoTitle: '',
    infoText: '',
    infoOk: '',
    infoTheme: '',
    infoMaxWidth: '',
    show: false,
    textIsMarkdown: false,
    resizable: false,
    code: null, // if an additional json object is provided it will be displayed beyond the infoText
    zIndex: null,
    isMaximized: false,
    guid: null,
    persistent: false
  }),
  methods: {
    showDialog (info) {
      this.infoTitle = info.title
      this.infoText = info.text

      this.infoOk = info.ok || this.$t('global.ok')
      this.infoTheme = info.theme || 'primary'
      this.infoMaxWidth = info.maxWidth || '600'
      this.show = true
      this.resizable = info.resizable
      this.textIsMarkdown = info.markdown
      this.code = info.code // if an additional json object is provided it will be displayed beyond the infoText
      this.zIndex = info.zIndex || 3
      this.persistent = info.persistent || this.persistent
    },
    onOk (event) {
      event.preventDefault()
      event.stopPropagation()
      this.show = false
      EventBus.$emit('infoOk', { event: 'ok', guid: this.guid })
    }
  },
  created () {
    this.guid = utils.guid('info')
    this.$emit('infoCreated', this.guid)
    EventBus.$on('triggerShowInfo', (info) => {
      this.showDialog(info)
    })
  }
}
