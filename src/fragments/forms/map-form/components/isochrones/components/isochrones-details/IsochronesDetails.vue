<template>
  <box background="white" no-shadow>
    <div slot="header">
      <download :download-formats-supported="['json', 'geojson']" :map-view-data="localMapViewData"></download>
      <share :url="shareUrl"></share>
      <print :map-view-data="localMapViewData"></print>
      <h3>{{$t('isochrones.isochrones')}}</h3>
    </div>
    <div slot="content">
      <h4>{{$t('isochronesDetails.reachCenters')}}</h4>
      <v-list dense class="centers">
        <template v-for="(place, index) in localMapViewData.places">
          <v-expansion-panel :key="index" style="box-shadow: none;" :value="index === 0 ? 0 : null">
            <v-expansion-panel-content class="polygons-header">
              <div slot="header">
                <h5>{{place.placeName}}</h5>
              </div>
              <template v-for="(polygon, polygonIndex) in localMapViewData.polygons">
                <template v-if="hasAsCenter(place, polygon)">
                  <div :key="polygonIndex" style="padding-left:10px">
                    <v-layout class="action-options-wrapper">
                      <v-flex v-bind="{[ $highResolution? 'lg4' : 'md12']: true}">
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
            </v-expansion-panel-content>
          </v-expansion-panel>
        </template>
      </v-list>
    </div>
  </box>
</template>
<script src="./isochrones-details.js"></script>
<style scoped src="./isochrones-details.css"></style>
