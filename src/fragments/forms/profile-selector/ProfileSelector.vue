<template>
  <div>
    <v-item-group>
      <div style="min-width:275px; height:70px">
        <v-layout class="profile-options-wrapper">
          <v-item v-for="profile in profilesMapping" :key="profile.slug">
            <v-flex style="min-width:45px">
              <profile-selector-option @profileSelected="profileSelected" :profile="profile"
                :active-profile-slug="activeProfileSlug" :active-vehicle-type="activeVehicleType">
              </profile-selector-option>
            </v-flex>
          </v-item>
        </v-layout>
      </div>
    </v-item-group>

    <div v-if="activeVehicleType">
      <v-chip outline small disabled color="primary">
        {{$t('global.profile')}}: {{($t('orsMapFilters.profiles.' + activeVehicleType))}}
      </v-chip>
    </div>
    <div v-else-if="activeProfileSlug">
      <v-chip outline small disabled color="primary">
        {{$t('global.profile')}}: <span v-if="$store.getters.mapSettings.skipAllSegments">{{($t('global.rawRouting'))}}</span><span v-else>{{($t('orsMapFilters.profiles.' + activeProfileSlug))}}</span>
      </v-chip>
    </div>
  </div>
</template>
<script src="./profile-selector.js"></script>

<style scoped src="./profile-selector.css"></style>
