<template>
  <v-footer dark
  :style="{'margin-top': $vuetify.breakpoint.smAndDown ? '-' + $store.getters.footerMiniHeight + 'px': '-' + $store.getters.footerFullHeight + 'px'}"
  :height="$vuetify.breakpoint.smAndDown? $store.getters.footerMiniHeight : $store.getters.footerFullHeight" :class="{'small': $vuetify.breakpoint.smAndDown}">
      <p>
        <strong>
          <a target="_blank" href="https://github.com/GIScience/ors-map-client">v{{ appVersion }}</a>
        </strong>
        <span>&nbsp;© {{currentYear}} <strong>{{footerMainSiteName}}</strong></span>
        <span > | {{ $t('global.developedByIntro') }}
          <strong>
            <a target="_blank" :title="$t('global.developedBy')" :href="footerLink">{{ $t('global.developedBy') }}</a>
          </strong>
        </span><br>
        <span>
          <strong>
            <a class="link" :title="$t('about.privacyPolicy')" :href="constants.links.privacyPolicy" target="_blank">{{$t('about.privacyPolicy')}}</a>
          </strong>
          &nbsp; &nbsp;
          <strong>
            <a class="link" :title="$t('about.termsOfService')" :href="constants.links.termsOfService" target="_blank">{{$t('about.termsOfService')}}</a>
          </strong>
        </span>
      </p>
    </v-footer>
</template>

<script src="./footer.js">

</script>

<style src="./footer.css" scoped></style>
