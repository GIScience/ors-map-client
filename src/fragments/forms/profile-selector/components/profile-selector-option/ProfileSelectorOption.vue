<template>
  <div class="option-container">
    <v-btn v-if="profile.primary" flat class="profile-option-btn no-padding no-margin"
      :title="getProfileTitle(profile.slug)" :class="{'active': active}"
      :color="active ? 'primary' : 'dark'" :key="profile.slug"
      @click="profileSelected(profile.slug)">
      <v-icon large>{{profile.icon}}</v-icon>
    </v-btn>
    <v-menu v-if="profile.vehicleTypes" class="profile-option-menu" v-model="extraProfilesOpen"
      transition="slide-y-transition" :close-on-click="true" :close-on-content-click="true" :open-on-hover="false" bottom>
      <v-btn icon class="profile-menu-activator" slot="activator">
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
      <v-list light style="background:white">
        <template v-for="(nestedItemSlug, index) in profile.vehicleTypes">
          <v-list-tile v-if="true" :key="index" @click.stop="profileSelected(profile.slug, nestedItemSlug)">
            <v-list-tile-title>
              {{ getProfileTitle(profile.slug, nestedItemSlug) }}
              <v-icon :color="active ? 'primary' : 'dark'" small
                v-if="nestedItemSlug === nestedItemActive" large>check</v-icon>
            </v-list-tile-title>
          </v-list-tile>
        </template>
      </v-list>
    </v-menu>
    <v-menu v-else-if="profile.nestedProfiles" class="profile-option-menu" v-model="extraProfilesOpen"
      transition="slide-y-transition" :close-on-click="true" :close-on-content-click="true" :open-on-hover="false" bottom>
      <v-btn icon class="profile-menu-activator" slot="activator">
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
      <v-list light style="background:white">
        <template v-for="(nestedItemSlug, index) in profile.nestedProfiles">
          <v-list-tile v-if="true" :key="index" @click.stop="profileSelected(profile.slug, nestedItemSlug)">
            <v-list-tile-title>
              {{ getProfileTitle(profile.slug, nestedItemSlug) }}
              <v-icon :color="active ? 'primary' : 'dark'" small
                v-if="nestedItemSlug === nestedItemActive" large>check</v-icon>
            </v-list-tile-title>
          </v-list-tile>
        </template>
      </v-list>
    </v-menu>
  </div>
</template>
<script src="./profile-selector-option.js"></script>
<style scoped src="./profile-selector-option.css"></style>
