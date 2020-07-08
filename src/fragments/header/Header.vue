<template>
  <div>
    <v-toolbar :class="{'hidden': !$store.getters.topBarOpen}" class="ors-toolbar app-toolbar" height="93" app
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
    <v-icon large v-if="$store.getters.topBarOpen" class="toggle-top-bar"
      :class="{'hidden': !$store.getters.topBarOpen}" @click.stop="toggleTopBar" :title="'Hidde menu bar'">
      keyboard_arrow_up</v-icon>
    <v-icon large v-else-if="$highResolution" class="toggle-top-bar" :class="{'hidden': !$store.getters.topBarOpen}"
      @click.stop="toggleTopBar" :title="'Show menu bar'">keyboard_arrow_down</v-icon>
  </div>
</template>
<script src="./header.js"></script>

<style src="./header.css"></style>
