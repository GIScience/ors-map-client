<template>
  <div>
    <v-toolbar v-if="showToolbar" :class="{'hidden': !$store.getters.topBarOpen}" class="ors-toolbar app-toolbar" height="93" app
      :clipped-left="clipped" v-click-outside="hideTopBar">
      <a :href="homeUrl">
        <img height="52.5" :src="getConfigVal('logoImgSrc')" :alt="getConfigVal('appName')" class="ml-3">
      </a>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <template v-for="(item, index) in menuItems">
          <app-h-menu :item="item" :showIcon="false" :key="index"></app-h-menu>
        </template>
      </v-toolbar-items>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-btn fab small class="toggle-header" v-if="!$store.getters.embed && $highResolution"
      :title="$store.getters.topBarOpen? $t('header.hideMenuBar'): $t('header.showMenuBar')"
      style="width: 38px; height: 38px; position:absolute; right:170px; z-index:4; transition:all 1s ease; border-radius: 5px; border: 2px solid rgba(0,0,0,.2);
    background-clip: padding-box; box-shadow: none"
      :style="{top: $store.getters.topBarOpen? '103px' : '3px'}"
      @click.stop="toggleTopBar" >
      <v-icon large v-if="$store.getters.topBarOpen" >keyboard_arrow_up </v-icon>
      <v-icon large v-else >keyboard_arrow_down </v-icon>
    </v-btn>
  </div>
</template>
<script src="./header.js"></script>

<style src="./header.css"></style>
