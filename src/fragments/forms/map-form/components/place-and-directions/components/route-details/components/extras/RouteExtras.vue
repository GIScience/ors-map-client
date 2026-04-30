<template>
  <div>
    <template v-for="(extra, extraKey) in routeExtras">
      <v-layout row wrap :key="extraKey" v-if="showExtra(extraKey)">
        <v-list style="width:95%;">
          <div style="padding:0 0 0 10px">
            <div class="extra-bar">
              <template v-for="(summary, index) in routeExtras[extraKey].summary">
                <v-tooltip :key="index + extraKey" :disabled="$lowResolution" top>
                  <div slot="activator" class="segment" :style="segmentStyle(extraKey, summary, index)"></div>
                  {{ getExtraValueLabel(extraKey, summary.value) }}
                </v-tooltip>
              </template>
            </div>
            <div class="extra-bar-labels">
              <template v-for="(summary, index) in routeExtras[extraKey].summary">
                <div
                  :key="'label-' + index + extraKey"
                  class="segment-label"
                  :style="{ '--seg-width': summary.amount + '%' }"
                >
                  {{ getExtraValueLabel(extraKey, summary.value) }} {{ summary.amount.toFixed(1) }} %
                </div>
              </template>
            </div>
          </div>
        </v-list>
      </v-layout>
    </template>
  </div>
</template>

<script src="./route-extras.js"></script>

<style scoped src="./route-extras.css"></style>
