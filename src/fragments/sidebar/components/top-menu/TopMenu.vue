<template>
  <v-layout row class="top-menu">
    <v-flex sm4 v-if="$mdAndUpResolution">
      <v-btn class="no-padding" v-if="$mdAndUpResolution"
        flat @click="settingsClicked"
        v-smart-tooltip="{show: showSettingsTooltip, text: $t('topMenu.settingsTooltip'), position: 'left', dark: true, showOnce: true, name: 'settingsTooltip'}">
        <v-icon :title="$t('topMenu.openSettings')" color="dark" :medium="$lowResolution">settings</v-icon>
      </v-btn>
    </v-flex>
    <v-flex sm4 v-if="$mdAndUpResolution">
      <floating-menu class="no-padding"></floating-menu>
    </v-flex>
    <v-flex v-if="!$mdAndUpResolution">
      <floating-menu show-settings :open-on-hover="false" class="no-padding"></floating-menu>
    </v-flex>
    <v-flex sm4>
      <v-btn flat class="no-padding" v-if="$mdAndDownResolution" @click="toggleSidebarIsPinned()">
        <v-icon :title="$t('topMenu.pinSidebar')" :medium="$lowResolution"
          :color="isPinned ? 'primary': 'dark'">
          lock</v-icon>
      </v-btn>
    </v-flex>
    <v-flex sm4>
      <v-btn class="no-padding pr2" flat @click="toggleSidebar()">
        <v-icon :title="$t('global.close')" color="dark" :medium="$lowResolution">close </v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script src="./top-menu.js"></script>
<style scoped src="./top-menu.css"></style>
