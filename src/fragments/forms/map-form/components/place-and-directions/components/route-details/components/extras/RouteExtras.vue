<template v-slot:content>
<div>
  <v-expansion-panels v-if="showExtras()" class="no-shadow" :value="showExtraInfoSection">
    <v-expansion-panel style="background: transparent;" class="extras-header" >
      <v-expansion-panel-title>
        <h4 >{{$t('routeExtras.extraInfo')}}</h4>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div><p class="click-action-info">{{$t('routeExtras.clickToHighlightOnMap')}}</p></div>
        <template v-for="(extra, extraKey) in routeExtras">
          <v-layout row wrap :key="extraKey" v-if="showExtra(extraKey)">
            <v-flex xs10 sm11>
              <v-list>
                <div style="padding:0 0 0 10px">
                  <h5 >{{$t('global.' + extraKey )}}</h5>
                  <div class="extra-bar">
                    <template v-for="(summary, index) in routeExtras[extraKey].summary" :key="index + extraKey">
                      <v-tooltip :disabled="$lowResolution" top>
                        <template v-slot:activator="{ on }">
                          <div @click="showSection(extraKey, summary.value, index)" class="segment" :style="segmentStyle(extraKey, summary, index)" v-on="on"></div>
                        </template>
                        {{getExtraValueLabel(extraKey, summary.value)}} - {{$t('routeExtras.clickToHighlightOnMap')}}
                      </v-tooltip>
                    </template>
                  </div>
                </div>
              </v-list>
            </v-flex>
            <v-flex xs2 sm1>
              <v-btn class="show-all-on-map" :max-width="30" fab icon @click="showAllSections(extraKey)" :title="$t('routeExtras.showAllOnMap')">
                <v-icon>remove_red_eye</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </template>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</div>
</template>

<script src="./route-extras.js"></script>

<style scoped src="./route-extras.css"></style>
