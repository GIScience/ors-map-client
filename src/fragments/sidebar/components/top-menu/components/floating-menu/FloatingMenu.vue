<template>
  <v-menu v-if="menuItemsReady" class="info-menu" :open-on-hover="openOnHover" :open-on-click="!openOnHover" attach="body">
    <template v-slot:activator="{ props }">
      <v-btn class="info-button pl2 pr2" variant="text" @click="menuClicked" v-bind="props"
             v-smart-tooltip="{show: showSettingsTooltip, text: $t('floatingTopMenu.settingsTooltip'), position: 'bottom', dark: true, showOnce: true, name: 'settingsTooltip'}">
        <v-icon>{{showSettings ? 'more_vert' : 'info'}}</v-icon>
      </v-btn>
    </template>
    <v-list>
      <template v-for="(item, index) in menuItems">
        <v-layout row :key="index" v-if="item.show">
          <v-btn
            :prepend-icon="item.icon"
            class="floating-item" :key="index + 'emitEvent'" variant="text" :title="item.title" v-if="item.emitEvent" @click="emitEvent(item.emitEvent)"
          >
            {{$t('floatingTopMenu.' + item.id)}}
          </v-btn>
          <v-btn
            :prepend-icon="item.icon"
            class="floating-item" :key="index + 'noEvent'" v-else variant="text" :title="item.title" :target="item.target" :href="item.href"
          >
            {{$t('floatingTopMenu.' + item.id)}}
          </v-btn>
        </v-layout>
      </template>
    </v-list>
  </v-menu>
</template>
<style scoped src="./floating-menu.css"></style>

<script src="./floating-menu.js"></script>
