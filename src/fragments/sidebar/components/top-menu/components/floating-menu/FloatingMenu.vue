<template>
  <v-menu class="info-menu" :open-on-hover="openOnHover" :open-on-click="!openOnHover" nudge-top="10" offset-y>
    <v-btn class="no-padding pl2 pr2" flat slot="activator" @click="menuClicked"
      v-popper-tooltip="{show: showSettingsTooltip, text: $t('floatingTopMenu.settingsTooltip'), position: 'right', dark: true, showOnce: true, name: 'settingsTooltip'}">
      <v-icon>{{showSettings ? 'more_vert' : 'info'}}</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile v-if="showSettings">
        <v-btn class="floating-item" flat @click="eventBus.$emit('showSettingsModal')">
          <v-icon :title="$t('floatingTopMenu.openSettings')" left color="dark">settings</v-icon>
          <template>{{$t('floatingTopMenu.openSettings')}}</template>
        </v-btn>
      </v-list-tile>
      <v-list-tile>
        <v-btn class="floating-item" @click="eventBus.$emit('showAboutModal')" :title="$t('floatingTopMenu.openSettings')" flat>
          <v-icon :title="$t('floatingTopMenu.showAbout')" left>info</v-icon>
          <template>{{$t('floatingTopMenu.about')}}</template>
        </v-btn>
      </v-list-tile>
      <v-list-tile>
        <v-btn class="floating-item" target="_blank" href="https://openrouteservice.org"
          :title="$t('floatingTopMenu.openrouteserviceAPI')" flat>
          <v-icon left>code</v-icon>
          <template>{{$t('floatingTopMenu.openrouteserviceAPI')}}</template>
        </v-btn>
      </v-list-tile>
      <v-list-tile>
        <v-btn class="floating-item" target="_blank" href="https://disaster.openrouteservice.org"
          :title="$t('floatingTopMenu.openrouteserviceForDisasters')" flat>
          <v-icon left>healing</v-icon>
          <template>{{$t('floatingTopMenu.openrouteserviceForDisasters')}}</template>
        </v-btn>
      </v-list-tile>
      <v-list-tile>
        <v-btn class="floating-item" target="_blank" href="https://ask.openrouteservice.org"
          :title="$t('floatingTopMenu.askOpenrouteservice')" flat>
          <v-icon left>help</v-icon>
          <template>{{$t('floatingTopMenu.askOpenrouteservice')}}</template>
        </v-btn>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>
<style scoped src="./floating-menu.css"></style>

<script src="./floating-menu.js"></script>
