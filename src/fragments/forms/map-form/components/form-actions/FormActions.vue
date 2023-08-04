<template>
  <div class="form-actions">
    <v-layout class="action-options-wrapper">
      <v-flex :class="{'high-resolution': $highResolution}" v-if="canAddPlaceInput && isEnabled('addPlaceInput')">
        <map-form-btn @clicked="addPlaceInput" :icon="'add_location'" class="add-place-btn" :title="$t('formActions.addPlaceInput')">
        </map-form-btn>
      </v-flex>
      <v-flex :class="{'high-resolution': $highResolution}" v-if="$store.getters.mode === constants.modes.directions && isEnabled('clearPlaces')">
        <map-form-btn @clicked="clearPlaces" :icon="'clear_all'" class="clear-route-btn" :title="$t('formActions.clearRoute')"></map-form-btn>
      </v-flex>
      <v-flex :class="{'high-resolution': $highResolution}" v-if="$store.getters.mode === constants.modes.directions && isEnabled('reverseRoute')">
        <map-form-btn @clicked="reverseRoute" :icon="'repeat'" class="reverse-route-btn" :title="$t('formActions.reverseRoute')"></map-form-btn>
      </v-flex>
      <v-flex :class="{'high-resolution': $highResolution}" v-if="isEnabled('roundtrip')">
        <map-form-btn :text="$t('formActions.roundTrip')" class="round-trip-btn" :title="$t('formActions.toggleRoundTrip')"
          @clicked="toggleRoundTrip" :icon="'settings_backup_restore'"
          :color="roundTripActive ? 'primary' : 'default'"></map-form-btn>
      </v-flex>
      <v-flex :class="{'high-resolution': $highResolution}" v-if="isEnabled('routeImporter')">
        <route-importer class="route-importer" @contentUploaded="contentUploaded"></route-importer>
      </v-flex>
      <v-spacer></v-spacer>
    </v-layout>
  </div>
</template>

<script src="./form-actions.js"></script>
<style scoped src="./form-actions.css"></style>
