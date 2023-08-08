<template>
  <div v-if="altitudeData" class="pr-20" @mouseleave="mouseLeftChart">
    <line-chart
      v-if="altitudeData"
      id="altitude-chart"
      :options="chartOptions"
      :data="altitudeData"
    />
    <v-layout v-if="summary">
      <v-flex sm6>
        <p><v-icon>arrow_upward</v-icon> {{ascent}} {{$t('global.units.m')}}</p>
      </v-flex>
      <v-flex sm6>
        <p><v-icon>arrow_downward</v-icon> {{descent}} {{$t('global.units.m')}}</p>
      </v-flex>
    </v-layout>
  </div>
</template>
<script src="./altitude.js"></script>
