<template>
  <div></div>
</template>
<script>
export default {
  name: 'InfoBanner',
  created() {
    const now = Date.now()
    const bannerStart = Date.parse('2024-06-24T14:52:00')
    const bannerEnd = Date.parse('2024-06-29T00:00:00')
    const bannerText = 'Due to Server Maintenance on June 24th at 17:00 CET there might be some network disruptions that restrict functionality.<br>On Friday, June 28th at 8:30 CET for 6-24h this application won\'t be working properly due to unavailable geocoding.'
    if (bannerStart < now && now < bannerEnd) {
      this.showError(bannerText, {timeout: 0, y: 'top', x: 'no'})
    }
  }
}
</script>
