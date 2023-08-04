<template>
  <div >
    <v-navigation-drawer
      touchless
      app
      clipped
      stateless
      hide-overlay
      class="sidebar"
      v-model="isSideBarOpen"
      disable-resize-watcher
      :width="$mdAndUpResolution ? $store.getters.sidebarFullWidth : $store.getters.sidebarShrunkWidth"
      :permanent="$store.getters.leftSideBarPinned"
      :class="{'auto-height': $lowResolution && !$store.getters.leftSideBarPinned, 'full-height': $store.getters.leftSideBarPinned}">

      <div class="sidebar-header" :style="{height: $store.getters.sidebarHeaderHeight + 'px'}">
        <v-layout row class="sidebar-header-top" >
          <v-flex xs6 md9>
            <div class="logo-container">
              <a :href="homeUrl"><img height="52.5" class="small ml-2" :src="getImgSrc('logoImgSrc')" :title="getConfigVal('appName')" :alt="getConfigVal('appName')"></a>
            </div>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs6 md3 class="sidebar-top-menu" >
            <top-menu></top-menu>
          </v-flex>
        </v-layout>
        <profile-selector></profile-selector>
      </div>

      <!-- sidebar-content padding-bottom must be the same that is calculated in footer component height -->
      <div class="sidebar-content" :style="{height: sidebarContentHeightFormula}">
        <div class="sidebar-content-form" :style="{'padding-bottom': $vuetify.breakpoint.smAndDown ? $store.getters.footerMiniHeight + 'px': $store.getters.footerFullHeight + 'px'}">
          <map-form v-if="$store.getters.mapReady" class="map-search"></map-form>
          <v-expansion-panel :value="null" v-if="!$highResolution">
            <v-expansion-panel-content style="background: transparent;">
              <div slot="header">Menu</div>
              <v-list>
                <v-divider></v-divider>
                <v-list dense>
                  <template v-for='(item, index) in menuItems'>
                    <app-v-menu :item="item" :showIcon="true" :key="index"></app-v-menu>
                  </template>
                </v-list>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </div>
        <app-footer></app-footer>
      </div>
    </v-navigation-drawer>
    <v-btn fab small v-if="isSideBarOpen && $highResolution" :title="$t('sidebar.hideSidebar')" class="toggle-sidebar" :class="{'hidden': !isSideBarOpen, 'low-res': $lowResolution}" @click.stop="isSideBarOpen = false" >
      <v-icon large >keyboard_arrow_left </v-icon>
    </v-btn>
    <v-btn fab small v-else-if="!isSideBarOpen && !$lowResolution && !$store.getters.embed" :title="$t('sidebar.showSidebar')" class="toggle-sidebar" :class="{'hidden': !isSideBarOpen}" @click.stop="isSideBarOpen = true" >
      <v-icon large >keyboard_arrow_right </v-icon>
    </v-btn>
  </div>
</template>
<script src="./sidebar.js"></script>
<style scoped src="./sidebar.css"></style>
