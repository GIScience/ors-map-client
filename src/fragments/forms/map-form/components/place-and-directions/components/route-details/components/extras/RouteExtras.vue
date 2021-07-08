<template>
<div>
  <v-expansion-panel v-if="showExtras()" slot="content" class="no-shadow" :value="null">
    <v-expansion-panel-content style="background: transparent;" class="extras-header" >
      <div slot="header"><h4 >{{$t('routeExtras.extraInfo')}}</h4></div>
      <div><p class="click-action-info">{{$t('routeExtras.clickToHighlightOnMap')}}</p></div>
      <template v-for="(extra, extraKey) in routeExtras">
        <v-layout row wrap :key="extraKey" v-if="showExtra(extraKey)">
          <v-flex xs10 sm11>
            <v-list>
              <div style="padding:0 0 0 10px">
                <h5 >{{$t('global.' + extraKey )}}</h5>
                <div class="extra-bar">
                  <template v-for="(summary, index) in routeExtras[extraKey].summary">
                    <v-tooltip :key="index + extraKey" :disabled="$lowResolution" top>
                      <div @click="showSection(extraKey, summary.value, index)" slot="activator" class="segment" :style="segmentStyle(extraKey, summary, index)"></div>
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
    </v-expansion-panel-content>
  </v-expansion-panel>
</div>
</template>

<script src="./route-extras.js"></script>

<style scoped src="./route-extras.css"></style>
