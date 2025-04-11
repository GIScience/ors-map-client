<template>
  <div>
    <v-tabs class="tab app-tab map-search-tab" v-model="activeTab" slider-color="secondary">
      <v-tab ripple key="0" class="tab-title" v-if="hasPlacesAndDirectionsTab">
        {{ $t('mapForm.placesAndDirections') }}
      </v-tab>
      <v-tab ripple key="1" class="tab-title" v-if="hasIsochronesTab">
        {{$t('mapForm.isochrones')}}
      </v-tab>
    </v-tabs>
    <v-window v-model="activeTab" touch:false>
      <v-window-item key="0" class="places-and-directions-tab-form" v-if="hasPlacesAndDirectionsTab" touchless>
        <places-and-directions :active="$store.getters.mode !== constants.modes.isochrones"> </places-and-directions>
      </v-window-item>
      <v-window-item key="1" class="isochrones-tab-form" v-if="hasIsochronesTab" touchless>
        <isochrones :active="$store.getters.mode === constants.modes.isochrones" ></isochrones>
      </v-window-item>
    </v-window>
  </div>
</template>

<script src="./map-form.js"></script>
<style scoped src="./map-form.css"></style>
