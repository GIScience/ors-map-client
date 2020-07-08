
export default {
  data () {
    return {
      footerMainSiteName: 'openrouteservice',
      footerLink: 'http://www.heigit.org/'
    }
  },
  computed: {
    currentYear () {
      return (new Date()).getFullYear()
    }
  }
}
