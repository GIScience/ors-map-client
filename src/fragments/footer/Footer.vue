<template>
  <v-footer dark
  :style="{'margin-top':'-' + $store.getters.footerHeight + 'px'}"
  :height="$store.getters.footerHeight">
      <v-layout justify-center column wrap >
        <span><a :style="linkColor" target="_blank" href="https://github.com/GIScience/ors-map-client">v{{ appVersion }}</a>&nbsp;|&nbsp;© {{currentYear}} <strong>{{footerMainSiteName}}</strong></span>
        <div>{{ $t('global.developedByIntro') }}
            <a :style="linkColor" target="_blank" :title="$t('global.developedBy')" :href="footerLink">{{ $t('global.developedBy') }}</a>
        </div><br>
        <a :style="linkColor" class="link" :title="$t('about.privacyPolicy')" :href="constants.links.privacyPolicy"
           target="_blank">{{ $t('about.privacyPolicy') }}</a>
        <v-spacer shrink></v-spacer>
        <a :style="linkColor" class="link" :title="$t('about.termsOfService')" :href="constants.links.termsOfService" target="_blank">{{$t('about.termsOfService')}}</a>
      </v-layout>
    </v-footer>
</template>

<script src="./footer.js">

</script>

<style src="./footer.css" scoped></style>
