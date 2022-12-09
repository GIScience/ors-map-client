<template>
  <v-app >
    <v-progress-linear :indeterminate="true" class="progress-linear" :class="{'progress-linear-disabled': !showLoading}"></v-progress-linear>
    <app-toaster></app-toaster>
    <app-header :class="{'a11y' : $store.getters.mapSettings.accessibleModeActive}"></app-header>
    <v-content class="app-content" :class="{'a11y' : $store.getters.mapSettings.accessibleModeActive}">
      <app-confirm></app-confirm>
      <app-info></app-info>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
        <router-view v-title="title"></router-view>
      </transition>
    </v-content>
    <app-sidebar :class="{'a11y' : $store.getters.mapSettings.accessibleModeActive}"></app-sidebar>
  </v-app>
</template>
<script src="./app.js"></script>

<style lang="scss" src="./app.scss"></style>
<style lang="scss" src="./a11y.scss"></style>
