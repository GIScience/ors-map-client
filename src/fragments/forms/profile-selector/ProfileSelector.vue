<template>
  <div>
    <v-btn-toggle v-model="activeProfileIndex" mandatory>
      <template v-for="profile in profilesMapping">
        <v-btn :title="getProfileTitle(profile.slug)" v-if="profile.primary" :color="currentProfile === profile.slug ? 'primary' : 'dark'" :key="profile.slug" flat @click="setProfile(profile.slug)">
          <v-icon large>{{profile.icon}}</v-icon>
        </v-btn>
      </template>
      <v-menu class="floating-menu" ref="floatingMenu" v-model="extraProfilesOpen"
        transition="slide-y-transition"
        :close-on-click="true"
        :close-on-content-click="true"
        :open-on-hover="true"
        bottom >
        <v-btn slot="activator">
          <v-icon :color="activeProfileIndex >= 4 ? 'primary' : 'dark'">add</v-icon>
        </v-btn>
        <v-list light style="background:white">
          <template  v-for="(profile, index) in profilesMapping">
            <v-list-tile v-if="!profile.primary" :key="index"
              @click.stop="setProfile(profile.slug, 4)">
              <v-list-tile-title>
                {{ getProfileTitle(profile.slug) }}
                <v-icon :color="currentProfile === profile.slug ? 'primary' : 'dark'" small v-if="currentProfile === profile.slug" large>check</v-icon>
              </v-list-tile-title>
            </v-list-tile>
          </template>
        </v-list>
      </v-menu>
    </v-btn-toggle>
    <div>
      <v-chip outline small disabled color="primary">
        <v-icon>check_circle</v-icon>
        {{$t('orsMapFilters.profiles.' + currentProfile)}}
      </v-chip>
    </div>
  </div>
</template>

<script src="./profile-selector.js"></script>

<style scoped src="./profile-selector.css"></style>
