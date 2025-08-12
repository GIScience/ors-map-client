<template>
  <div>
    <v-tabs class="tab app-tab map-search-tab" v-model="activeTab" slider-color="secondary">
      <v-tab ripple key="0" class="tab-title" v-if="hasPlacesAndDirectionsTab">
        {{ $t('mapForm.placesAndDirections') }}
      </v-tab>
      <v-tab ripple key="1" class="tab-title" v-if="hasIsochronesTab">
        {{$t('mapForm.isochrones')}}
      </v-tab>
      <v-tab ripple key="2" class="tab-title" v-if="hasOptimizationTab">
        {{$t('mapForm.optimization')}}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeTab" touchless>
      <v-tab-item key="0" class="places-and-directions-tab-form" v-if="hasPlacesAndDirectionsTab" touchless>
        <places-and-directions :active="[constants.modes.places, constants.modes.directions].includes($store.getters.mode)"> </places-and-directions>
      </v-tab-item>
      <v-tab-item key="1" class="isochrones-tab-form" v-if="hasIsochronesTab" touchless>
        <isochrones :active="$store.getters.mode === constants.modes.isochrones" ></isochrones>
      </v-tab-item>
      <v-tab-item key="2" class="optimization-tab-form" v-if="hasOptimizationTab" touchless>
        <optimization :active="$store.getters.mode === constants.modes.optimization" ></optimization>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script src="./map-form.js"></script>
<style scoped src="./map-form.css"></style>
