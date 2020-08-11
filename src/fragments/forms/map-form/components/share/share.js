import axios from 'axios'
import appConfig from '@/config'
import constants from '@/resources/constants'

export default {
  created () {
    this.shareUrl = this.currentUrl
  },
  data: () => ({
    isShareModalOpen: false,
    shareUrl: null,
    isShortened: false
  }),
  computed: {
    currentUrl () {
      return location.href
    },
    shortBtnTitle () {
      const label = this.isShortened ? this.$t('share.fullUrl') : this.$t('share.shortUrl')
      return label
    }
  },
  methods: {

    /**
     * Toggle the url short/full
     */
    toggleShortUrl () {
      if (this.isShortened) {
        this.shareUrl = this.currentUrl
      } else {
        this.short()
      }
      this.isShortened = !this.isShortened
    },
    openShare () {
      this.isShareModalOpen = true
    },
    closeShare () {
      this.isShareModalOpen = false
    },
    /**
     * Copy the current url to clipboard
     *
     */
    copyUrl () {
      const url = this.shareUrl ? this.shareUrl : this.currentUrl
      if (this.copyToClipboard(url)) {
        this.showSuccess(this.$t('share.urlCopied'), { timeout: 2000 })
      }
    },
    /**
     * Copy the string to chipboard by creating a temporary textarea element
     *
     * @param {*} str
     * @returns {Boolean}
     */
    copyToClipboard (str) {
      const el = document.createElement('textarea')
      el.value = str
      document.body.appendChild(el)
      el.select()
      const result = document.execCommand('copy')
      document.body.removeChild(el)
      return result
    },

    /**
     * Convert the full url to a short url using bit.ly api
     */
    short () {
      const bitlyBaseApiUrl = 'https://api-ssl.bitly.com/v3/shorten'
      const apiKey = appConfig.bitlyApiKey
      const login = appConfig.bitlyLogin

      let publicUrl = location.href

      // The bit.ly service does not work with localhost
      // so we always replace the current host by the public host
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        const baseUrl = `${location.protocol}//${location.host}`
        publicUrl = location.href.replace(baseUrl, constants.orsPublicHost)
      }

      const longUrl = encodeURIComponent(publicUrl)
      const shortenerRequestUrl = `${bitlyBaseApiUrl}?login=${login}&apiKey=${apiKey}&longUrl=${longUrl}`

      // Show the loading bar while the request runs
      this.eventBus.$emit('showLoading', true)

      // Run the request and get the short url
      axios.get(shortenerRequestUrl).then((response) => {
        if (response.data.status_code === 200) {
          this.shareUrl = response.data.data.url
          this.isShortened = true
          this.showSuccess(this.$t('share.urlShortened'), { timeout: 2000 })
        } else {
          this.showError(this.$t('share.shorteningNotPossible'), { timeout: 2000 })
          console.log(response)
        }
      }).catch((error) => {
        this.showError(this.$t('share.shorteningNotPossible'), { timeout: 2000 })
        console.log(error)
      }).finally(() => {
        // Hide the loading bar when the request is finished
        this.eventBus.$emit('showLoading', false)
      })
    }
  }
}
