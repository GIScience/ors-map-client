<template>
  <div class="option-container">
    <v-btn flat class="profile-option-btn no-padding no-margin"
      :title="getProfileTitle(profile.slug)" :class="{'active': rootProfileActive}"
      :color="rootProfileActive ? 'primary' : 'dark'" :key="profile.slug"
      @click="profileSelected(profile.slug)">
      <v-icon large>{{profile.icon}}</v-icon>
    </v-btn>
    <v-menu attach="body" v-if="profile.vehicleTypes" class="profile-option-menu" v-model="subProfileIsOpen"
      transition="slide-y-transition" close-on-click close-on-content-click :open-on-hover="!isMobile" bottom>
      <v-btn icon class="profile-menu-activator" slot="activator">
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
      <v-list light style="background:white">
        <template v-for="(vehicleType, index) in profile.vehicleTypes">
          <v-list-tile :key="index" @click.stop.prevent="profileSelected(profile.slug, vehicleType)">
            <v-list-tile-title>
              {{ getProfileTitle(profile.slug, vehicleType) }}
              <v-icon v-if="activeVehicleType === vehicleType" color="primary" small large>check</v-icon>
            </v-list-tile-title>
          </v-list-tile>
        </template>
      </v-list>
    </v-menu>
    <v-menu v-else-if="profile.nestedProfiles" class="profile-option-menu" v-model="subProfileIsOpen" attach="body"
      transition="slide-y-transition" close-on-click close-on-content-click :open-on-hover="!isMobile" bottom>
      <v-btn icon class="profile-menu-activator" slot="activator">
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
      <v-list light style="background:white">
        <template v-for="(nestedProfile, index) in profile.nestedProfiles">
          <v-list-tile :key="index" @click.stop.prevent="profileSelected(nestedProfile)">
            <v-list-tile-title>
              {{ getProfileTitle(nestedProfile)}}
              <v-icon v-if="nestedProfile === activeProfileSlug" color="primary" small large>check</v-icon>
            </v-list-tile-title>
          </v-list-tile>
        </template>
      </v-list>
    </v-menu>
  </div>
</template>
<script src="./profile-selector-option.js"></script>
<style scoped src="./profile-selector-option.css"></style>
