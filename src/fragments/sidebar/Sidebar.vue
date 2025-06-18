<template>
  <div >
    <v-navigation-drawer
      touchless
      class="sidebar"
      order="1"
      v-model="isSideBarOpen"
      disable-resize-watcher
      :width="$mdAndUpResolution ? $store.getters.sidebarFullWidth : $store.getters.sidebarShrunkWidth"
      :permanent="$store.getters.leftSideBarPinned"
      :class="{'auto-height': $lowResolution && !$store.getters.leftSideBarPinned, 'full-height': $store.getters.leftSideBarPinned}">

      <div class="sidebar-header" :style="{height: $store.getters.sidebarHeaderHeight + 'px'}">
        <v-row class="sidebar-header-top" no-gutters>
          <v-col cols="6" md="9">
            <div class="logo-container">
              <a :href="homeUrl"><img height="52.5" class="small ml-2" :src="getImgSrc('logoImgSrc')" :title="getConfigVal('appName')" :alt="getConfigVal('appName')"></a>
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" md="3" class="sidebar-top-menu">
            <top-menu></top-menu>
          </v-col>
        </v-row>
        <profile-selector></profile-selector>
      </div>

      <!-- sidebar-content padding-bottom must be the same that is calculated in footer component height -->
      <div class="sidebar-content" :style="{height: sidebarContentHeightFormula}">
        <div class="sidebar-content-form" :style="{'padding-bottom': $store.getters.footerHeight + 'px'}">
          <map-form v-if="$store.getters.mapReady" class="map-search"></map-form>
          <v-expansion-panels v-if="!$highResolution">
            <v-expansion-panel :value="null" style="background: transparent;">
              <v-expansion-panel-title>Menu</v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list>
                  <v-divider></v-divider>
                  <v-list density="compact">
                    <template v-for='(item) in menuItems' v-bind:key="item.id">
                      <app-v-menu :item="item" :showIcon="true"></app-v-menu>
                    </template>
                  </v-list>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <app-footer></app-footer>
      </div>
    </v-navigation-drawer>
    <v-btn size="small" v-if="isSideBarOpen && $highResolution" :title="$t('sidebar.hideSidebar')" class="toggle-sidebar" :class="{'hidden': !isSideBarOpen, 'low-res': $lowResolution}" @click.stop="isSideBarOpen = false" >
      <v-icon size="large">keyboard_arrow_left</v-icon>
    </v-btn>
    <v-btn size="small" v-else-if="!isSideBarOpen && !$lowResolution && !$store.getters.embed" :title="$t('sidebar.showSidebar')" class="toggle-sidebar" :class="{'hidden': !isSideBarOpen}" @click.stop="isSideBarOpen = true" >
      <v-icon size="large">keyboard_arrow_right</v-icon>
    </v-btn>
  </div>
</template>
<script src="./sidebar.js"></script>
<style scoped src="./sidebar.css"></style>
