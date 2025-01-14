<template>
  <v-expansion-panel :value="0" class="round-trip-panel">
    <v-expansion-panel-content class="round-trip-panel-content">
      <template v-slot:header>
        <h4>{{$t('roundtrip.roundtripOptions')}}</h4>
      </template>
      <template>
        <fields-container @fieldUpdated="filterUpdated" :parameters="roundTripFilterAccessor.props"></fields-container>
      </template>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script src="./round-trip.js"></script>

<style scoped src="./round-trip.css"></style>
