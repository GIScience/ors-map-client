<template>
  <div>
    <v-tabs class="tab app-tab map-search-tab" v-model="activeTab" slider-color="secondary">
      <v-tab ripple key="0" class="tab-title" v-if="hasPlacesAndDirectionsTab">
        {{ $t('mapForm.PlacesAndDirections') }}
      </v-tab>
      <v-tab ripple key="1" class="tab-title" v-if="hasIsochronesTab">
        {{$t('mapForm.isochrones')}}
      </v-tab>
      <v-tab-item key="0" v-if="hasPlacesAndDirectionsTab">
        <places-and-directions :active="$store.getters.mode !== constants.modes.isochrones"> </places-and-directions>
      </v-tab-item>
      <v-tab-item key="1" v-if="hasIsochronesTab">
        <isochrones :active="$store.getters.mode === constants.modes.isochrones" ></isochrones>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script src="./map-form.js"></script>
<style scoped src="./map-form.css"></style>
