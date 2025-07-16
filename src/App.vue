<template>
  <v-app >
    <v-progress-linear color="primary" :indeterminate="true" class="progress-linear" :class="{'progress-linear-disabled': !showLoading}"></v-progress-linear>
    <app-toaster></app-toaster>
    <app-header :class="{'a11y' : $store.getters.mapSettings.accessibleModeActive}"></app-header>
    <v-main class="app-content" :class="{'a11y' : $store.getters.mapSettings.accessibleModeActive}">
      <app-confirm></app-confirm>
      <app-info></app-info>
      <router-view v-title="title" v-slot="{ Component }">
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
    <app-sidebar :class="{'a11y' : $store.getters.mapSettings.accessibleModeActive}"></app-sidebar>
  </v-app>
</template>
<script src="./app.js"></script>

<style lang="scss" src="./app.scss"></style>
<style lang="scss" src="./a11y.scss"></style>
