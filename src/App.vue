<template>
  <v-app >
    <v-progress-linear :indeterminate="true" class="progress-linear" :class="{'progress-linear-disabled': !showLoading}"></v-progress-linear>
    <app-toaster></app-toaster>
    <app-header></app-header>
    <v-content class="app-content">
      <app-confirm></app-confirm>
      <app-info></app-info>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
        <router-view v-title="title"></router-view>
      </transition>
    </v-content>
    <app-sidebar></app-sidebar>
    <!-- For instance, we will display n app footer, because the want a full heigh map view -->
    <!-- <app-footer v-if="$store.getters.displayFooter"></app-footer> -->
  </v-app>
</template>
<script src="./app.js"></script>

<style lang="scss" src="./app.scss"></style>



