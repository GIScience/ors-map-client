<template>
  <v-layout class="form-actions">
    <v-flex xs2 v-if="canAddPlaceInput && isEnabled('addPlaceInput')">
      <map-form-btn @clicked="addPlaceInput"
        :icon="'add_location'" :title="$t('formActions.addPlaceInput')"></map-form-btn>
    </v-flex>
    <v-flex xs2 v-if="$store.getters.mode === constants.modes.directions && isEnabled('clearPlaces')">
      <map-form-btn 
        @clicked="clearPlaces" :icon="'clear_all'" :title="$t('formActions.clearRoute')"></map-form-btn>
    </v-flex>
    <v-flex xs2 v-if="$store.getters.mode === constants.modes.directions && isEnabled('reverseRoute')">
      <map-form-btn 
        @clicked="reverseRoute" :icon="'repeat'" :title="$t('formActions.reverseRoute')"></map-form-btn>
    </v-flex>
    <v-flex xs2 v-if="isEnabled('roundtrip')">
      <map-form-btn
        :text="$t('formActions.roundTrip')" :title="$t('formActions.toggleRoundTrip')"
        @clicked="toggleRoundTrip" :icon="'settings_backup_restore'"
        :color="roundtripActive ? 'primary' : 'default'"></map-form-btn>
    </v-flex>
    <v-flex xs2 v-if="isEnabled('routeImporter')" @contentUploaded="contentUploaded">
      <route-importer></route-importer>
    </v-flex>
    <v-spacer></v-spacer>
  </v-layout>
</template>

<script src="./form-actions.js"></script>
