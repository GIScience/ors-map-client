<template>
  <box background="white" no-shadow>
    <template v-slot:header>
      <download :download-formats-supported="['json', 'geojson']" :map-view-data="localMapViewData"></download>
      <share :url="shareUrl"></share>
      <print :map-view-data="localMapViewData"></print>
      <h3>{{$t('isochrones.isochrones')}}</h3>
    </template>
    <template v-slot:content>
      <h4>{{$t('isochronesDetails.reachCenters')}}</h4>
      <v-list density="compact" class="centers">
        <template v-for="(place, index) in localMapViewData.places" :key="index">
          <v-expansion-panels style="box-shadow: none;">
            <v-expansion-panel :value="index === 0 ? 0 : null" class="polygons-header">
              <v-expansion-panel-title>
                <h5>{{place.placeName}}</h5>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <template v-for="(polygon, polygonIndex) in localMapViewData.polygons">
                  <template v-if="hasAsCenter(place, polygon)">
                    <div :key="polygonIndex" style="padding-left:10px">
                      <v-layout class="action-options-wrapper">
                        <v-flex :class="$highResolution ? 'lg4' : 'md12'">
                          <v-btn icon @click="toggleVisibility(polygonIndex)" class="no-margin"
                            :title="$t('isochronesDetails.toggleVisibility')">
                            <v-icon :color="polygon.properties.visible? 'primary' : 'dark' ">visibility</v-icon>
                          </v-btn>
                          <span class="polygon-area" :style="{background: polygon.properties.color}">
                            <b style="font-size:11px" :style="{color: polygonAreaTextColor(polygon.properties.color)}">{{polygon.properties.label.replace('Polygon', '')}}</b>
                          </span>
                        </v-flex>
                         <v-flex lg3>
                           <template v-if="polygon.properties.total_pop !== null">
                             <div style="font-size:12px">
                              <span >{{$t('global.population')}}</span> <br/> <span>{{polygon.properties.total_pop}}</span>
                             </div>
                           </template>
                        </v-flex>
                         <v-spacer></v-spacer>
                        <v-flex md5 v-if="$highResolution">
                          <v-slider class="polygon-opacity-slider" :min="0" :max="1"
                            prepend-icon="opacity"
                            :thumb-size="24"
                            thumb-label="always"
                            v-model="polygon.properties.fillOpacity" label="" :title="$t('isochronesDetails.opacity')"
                            @change="polygonOpacityChanged(polygonIndex)" :step="0.1">
                          </v-slider>
                          <br/>
                        </v-flex>
                      </v-layout>
                    </div>
                  </template>
                </template>
                <br />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
      </v-list>
    </template>
  </box>
</template>
<script src="./isochrones-details.js"></script>
<style scoped src="./isochrones-details.css"></style>
