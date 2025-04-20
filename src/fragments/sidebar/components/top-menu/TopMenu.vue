<template>
  <v-layout row class="top-menu">
    <v-col cols="4" v-if="$mdAndUpResolution">
      <v-btn class="no-padding" v-if="$mdAndUpResolution"
        variant="text" @click="settingsClicked"
        v-smart-tooltip="{show: showSettingsTooltip, text: $t('topMenu.settingsTooltip'), position: 'left', dark: true, showOnce: true, name: 'settingsTooltip'}">
        <v-icon :title="$t('topMenu.openSettings')" color="dark" :medium="$lowResolution">settings</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="4" v-if="$mdAndUpResolution">
      <floating-menu class="no-padding"></floating-menu>
    </v-col>
    <v-col v-if="!$mdAndUpResolution">
      <floating-menu show-settings :open-on-hover="false" class="no-padding"></floating-menu>
    </v-col>
    <v-col cols="4">
      <v-btn variant="text" class="no-padding" v-if="$mdAndDownResolution" @click="toggleSidebarIsPinned()">
        <v-icon :title="$t('topMenu.pinSidebar')" :medium="$lowResolution"
          :color="isPinned ? 'primary': 'dark'">
          lock</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="4">
      <v-btn class="no-padding pr2" variant="text" @click="toggleSidebar()">
        <v-icon :title="$t('global.close')" color="dark" :medium="$lowResolution">close </v-icon>
      </v-btn>
    </v-col>
  </v-layout>
</template>

<script src="./top-menu.js"></script>
<style scoped src="./top-menu.css"></style>
