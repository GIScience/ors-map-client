<template>
  <v-row class="top-menu flex-nowrap" no-gutters>
    <v-col cols="4" v-if="mdAndUp">
      <v-btn class="no-padding" v-if="mdAndUp"
        variant="text" @click="settingsClicked"
        v-smart-tooltip="{show: showSettingsTooltip, text: $t('topMenu.settingsTooltip'), position: 'left', dark: true, showOnce: true, name: 'settingsTooltip'}">
        <v-icon :title="$t('topMenu.openSettings')" color="dark" :size="smAndDown ? 'medium' : undefined">settings</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="4" v-if="mdAndUp">
      <floating-menu class="no-padding"></floating-menu>
    </v-col>
    <v-col v-if="!mdAndUp">
      <floating-menu show-settings :open-on-hover="false" class="no-padding"></floating-menu>
    </v-col>
    <v-col cols="4">
      <v-btn variant="text" class="no-padding" v-if="mdAndDown" @click="toggleSidebarIsPinned()">
        <v-icon :title="$t('topMenu.pinSidebar')" :size="smAndDown ? 'medium' : undefined"
          :color="isPinned ? 'primary': 'dark'">
          lock</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="4">
      <v-btn class="no-padding pr2" variant="text" @click="toggleSidebar()">
        <v-icon :title="$t('global.close')" color="dark" :size="smAndDown ? 'medium' : undefined">close </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script src="./top-menu.js"></script>
<style scoped src="./top-menu.css"></style>
