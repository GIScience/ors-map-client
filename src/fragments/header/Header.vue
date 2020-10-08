<template>
  <div>
    <v-toolbar v-if="showToolbar" :class="{'hidden': !$store.getters.topBarOpen}" class="ors-toolbar app-toolbar" height="93" app
      :clipped-left="clipped" v-click-outside="hideTopBar">
      <v-btn slot="defaukt" icon @click.stop="toggleSidebar" class="hidden-md-and-up">
        <v-icon>menu</v-icon>
      </v-btn>
      <a :href="homeUrl">
        <img height="52.5" src="@/assets/img/logo@2x.png" :alt="$t('global.appName')" class="ml-3">
      </a>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <template v-for="(item, index) in menuItems">
          <app-h-menu :item="item" :showIcon="false" :key="index"></app-h-menu>
        </template>
      </v-toolbar-items>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-btn fab small v-if="!$store.getters.embed && $highResolution"
      :title="$store.getters.topBarOpen? $t('header.hideMenuBar'): $t('header.showMenuBar')"
      style="position:absolute; right:170px; z-index:4; transition:all 1s ease; border-radius: 3px; border: 2px solid rgba(0,0,0,0.2);"
      :style="{top: $store.getters.topBarOpen? '110px' : '10px'}"
      @click.stop="toggleTopBar" >
      <v-icon large v-if="$store.getters.topBarOpen" >keyboard_arrow_up </v-icon>
      <v-icon large v-else >keyboard_arrow_down </v-icon>
    </v-btn>
  </div>
</template>
<script src="./header.js"></script>

<style src="./header.css"></style>
