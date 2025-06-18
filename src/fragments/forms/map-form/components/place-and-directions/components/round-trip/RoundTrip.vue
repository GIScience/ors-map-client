<template>
  <v-expansion-panels class="round-trip-panel">
    <v-expansion-panel :value="0" class="round-trip-panel-content">
      <v-expansion-panel-title>
        <h4>{{$t('roundtrip.roundtripOptions')}}</h4>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <fields-container @fieldUpdated="filterUpdated" :parameters="roundTripFilterAccessor.props"></fields-container>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script src="./round-trip.js"></script>

<style scoped src="./round-trip.css"></style>
