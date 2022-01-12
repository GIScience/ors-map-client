import {HttpClient} from 'vue-rest-client'
import appConfig from '@/config/app-config'
import constants from '@/resources/constants'

export default {
  data: () => ({
    isShareModalOpen: false,
    shareUrl: null,
    isShortened: false
  }),
  props: {
    url: {
      required: false,
      default: null
    }
  },
  computed: {
    currentUrl () {
      return this.url || location.href
    },
    embedCode () {
      let code = `<iframe style='border:none' width='100%' height='100%'  src="${this.currentUrl}/embed/${this.$store.getters.mapSettings.locale}"></iframe>`
      return code
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
        let context = this
        this.short().then((shortUrl => {
          context.shareUrl = shortUrl
          context.isShortened = true
          context.showSuccess(context.$t('share.urlShortened'), { timeout: 2000 })
        })).catch(() => {
          context.showError(context.$t('share.shorteningNotPossible'), { timeout: 2000 })
        })
      }
      this.isShortened = !this.isShortened
    },
    openShare () {
      this.shareUrl = this.currentUrl
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
     * Copy the current url to clipboard
     *
     */
    copyEmbed () {
      if (this.copyToClipboard(this.embedCode)) {
        this.showSuccess(this.$t('share.embedCodeCopied'), { timeout: 2000 })
      }
    },
    /**
     * Copy the string to chipboard by creating a temporary textarea element
     *
     * @param {String} str
     * @returns {Boolean}
     */
    copyToClipboard (str) {
      const tempTextArea = document.createElement('textarea')
      tempTextArea.value = str
      this.$refs.shareContainer.appendChild(tempTextArea)
      tempTextArea.select()
      const result = document.execCommand('copy')
      this.$refs.shareContainer.removeChild(tempTextArea)
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

      // The bit.ly service does not work with localhost.
      // So we always replace the current host by the public host
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        const baseUrl = `${location.protocol}//${location.host}`
        publicUrl = location.href.replace(baseUrl, constants.orsPublicHost)
      }

      const longUrl = encodeURIComponent(publicUrl)
      const shortenerRequestUrl = `${bitlyBaseApiUrl}?login=${login}&apiKey=${apiKey}&longUrl=${longUrl}`

      // Run the request and get the short url
      let httpClient = new HttpClient({getVueInstance: () => { return this }})

      return new Promise((resolve, reject) => {
        httpClient.http.get(shortenerRequestUrl).then((response) => {
          if (response.data.status_code === 200) {
            resolve(response.data.data.url)
          } else {
            console.log(response)
            reject(response)
          }
        }).catch((error) => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
}
