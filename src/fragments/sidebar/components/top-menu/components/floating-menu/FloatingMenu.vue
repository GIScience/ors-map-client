<template>
  <v-menu v-if="menuItemsReady" class="info-menu" :open-on-hover="openOnHover" :open-on-click="!openOnHover" nudge-top="10" offset-y>
    <v-btn class="no-padding pl2 pr2" flat slot="activator" @click="menuClicked"
      v-smart-tooltip="{show: showSettingsTooltip, text: $t('floatingTopMenu.settingsTooltip'), position: 'bottom', dark: true, showOnce: true, name: 'settingsTooltip'}">
      <v-icon>{{showSettings ? 'more_vert' : 'info'}}</v-icon>
    </v-btn>
    <v-list>

    <template v-for="(item, index) in menuItems">
     <v-list-tile :key="index" v-if="item.show">
        <v-btn flat v-if="item.emitEvent" class="floating-item" @click="eventBus.$emit(item.emitEvent)">
          <v-icon :title="item.title" left color="dark">{{item.icon}}</v-icon>
          <template>{{item.title}}</template>
        </v-btn>
        <v-btn v-else flat class="floating-item" :target="item.blank" :href="item.href">
          <v-icon :title="item.title" left color="dark">{{item.icon}}</v-icon>
          <template>{{item.title}}</template>
        </v-btn>
      </v-list-tile>
    </template>
    </v-list>
  </v-menu>
</template>
<style scoped src="./floating-menu.css"></style>

<script src="./floating-menu.js"></script>
