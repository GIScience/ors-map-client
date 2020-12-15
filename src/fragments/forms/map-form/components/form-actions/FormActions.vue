<template>
  <div class="form-actions">
    <map-form-btn @clicked="addPlaceInput" v-if="canAddPlaceInput && isEnabled('addPlaceInput')" :icon="'add_location'" :title="$t('formActions.addPlaceInput')" ></map-form-btn>
    <map-form-btn @clicked="clearPlaces" v-if="$store.getters.mode === constants.modes.directions && isEnabled('clearPlaces')" :icon="'clear_all'" :title="$t('formActions.clearRoute')" ></map-form-btn>
    <map-form-btn @clicked="reverseRoute" v-if="$store.getters.mode === constants.modes.directions && isEnabled('reverseRoute')" :icon="'repeat'" :title="$t('formActions.reverseRoute')" ></map-form-btn>
    <map-form-btn v-if="isEnabled('roundtrip')" @clicked="toggleRoundTrip" :icon="'settings_backup_restore'" :text="$t('formActions.roundTrip')" :title="$t('formActions.toggleRoundTrip')" :color="roundtripActive ? 'primary' : 'default'" ></map-form-btn>
    <route-importer v-if="isEnabled('routeImporter')" @contentUploaded="contentUploaded" ></route-importer>
  </div>
</template>

<script src="./form-actions.js"></script>
