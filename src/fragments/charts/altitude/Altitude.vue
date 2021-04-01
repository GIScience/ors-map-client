<template>
  <div v-if="altitudeData" class="pr-20" @mouseleave="mouseLeftChart">
    <line-chart :height="height" @chartHoverIndexChanged="chartHoverIndexChanged" v-if="altitudeData" :labels="altitudeData.labels" :datasets="altitudeData.datasets"></line-chart>
    <v-layout v-if="summary && showVariations">
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
