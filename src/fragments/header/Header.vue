<template>
  <div style="height: 0">
    <v-toolbar :collapse="!showToolbar" v-if="showToolbar" :class="{'hidden': !$store.getters.topBarOpen}" class="app-toolbar" height="93" app
      :clipped-left="clipped" v-click-outside="{handler: hideTopBar, include}">
      <a :href="homeUrl">
        <img height="52.5" :src="getImgSrc('logoImgSrc')" :alt="getConfigVal('appName')" class="ml-3">
      </a>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <template v-for="(item) in menuItems" v-bind:key="item.id">
          <app-h-menu :item="item" :showIcon="false"></app-h-menu>
        </template>
      </v-toolbar-items>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-btn size="small" :icon="$store.getters.topBarOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" class="toggle-header"
           v-if="!$store.getters.embed && $highResolution"
      :title="$store.getters.topBarOpen? $t('header.hideMenuBar'): $t('header.showMenuBar')"
           :style="{top: $store.getters.topBarOpen? '103px' : '3px'}"
      @click.stop="toggleTopBar" >
    </v-btn>
  </div>
</template>
<script src="./header.js"></script>

<style src="./header.css"></style>
