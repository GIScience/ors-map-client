<template>
  <div>
    <v-item-group>
      <v-layout class="profile-options-wrapper">
        <v-item v-for="profile in profilesMapping" :key="profile.slug">
          <v-flex>
            <profile-selector-option @profileSelected="profileSelected" :profile="profile"
              :active-profile-slug="activeProfileSlug" :active-vehicle-type="activeVehicleType">
            </profile-selector-option>
          </v-flex>
        </v-item>
      </v-layout>
    </v-item-group>

    <div v-if="activeVehicleType">
      <v-chip outline small disabled color="primary">
        {{$t('global.profile')}}: {{($t('orsMapFilters.profiles.' + activeVehicleType)).toLowerCase()}}
      </v-chip>
    </div>
    <div v-else-if="activeProfileSlug">
      <v-chip outline small disabled color="primary">
        {{$t('global.profile')}}: {{($t('orsMapFilters.profiles.' + activeProfileSlug)).toLowerCase()}}
      </v-chip>
    </div>
  </div>
</template>
<script src="./profile-selector.js"></script>

<style scoped src="./profile-selector.css"></style>
