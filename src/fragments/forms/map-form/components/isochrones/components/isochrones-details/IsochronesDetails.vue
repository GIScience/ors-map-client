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
        <template v-for="(group, groupId) in localMapViewData.polygons">
          <v-expansion-panel :key="groupId" style="box-shadow: none;" :value="groupId === 0 ? 0 : null">
            <v-expansion-panel-content class="polygons-header">
              <div slot="header" style="display: flex;align-items: center">
                  <v-btn icon @click.stop="toggleIsochroneVisibility(groupId)" class="no-margin"
                         :title="$t('isochronesDetails.toggleVisibility')">
                    <v-icon :color="group.visible ? 'primary' : 'dark' ">visibility</v-icon>
                  </v-btn>
                  <h5>{{localMapViewData.places[groupId].placeName}}</h5>
              </div>
              <v-flex>
                <v-slider class="polygon-opacity-slider" :min="0" :max="1"
                  prepend-icon="opacity"
                  :thumb-size="24"
                  v-model="group.opacity" label="" :title="$t('isochronesDetails.opacity')"
                  @change="polygonOpacityChanged(groupId)" :step="0.1">
                </v-slider>
              </v-flex>
              <div style="padding-left:10px">
                <v-layout class="action-options-wrapper">
                  <v-flex justify-center v-bind="{[ $highResolution? 'lg4' : 'md12']: true}"></v-flex>
                  <template v-if="group.rings[0].properties.total_pop !== null">
                    <v-flex lg3>
                      <div style="font-size:12px">
                        {{$t('global.population')}}
                      </div>
                    </v-flex>
                  </template>
                  <v-flex md5>
                    <div style="font-size:12px">
                      {{$t('mapView.polygonArea')}}
                    </div>
                  </v-flex>
                </v-layout>
              </div>
              <template v-for="(ring, ringId) in group.rings">
                <template>
                  <div :key="ringId" style="padding-left:10px">
                    <v-layout class="action-options-wrapper">
                      <v-flex v-bind="{[ $highResolution? 'lg4' : 'md12']: true}">
                        <v-btn icon @click="toggleRingVisibility(groupId, ringId)" class="no-margin"
                               :title="$t('isochronesDetails.toggleVisibility')">
                          <v-icon :color="ring.properties.visible? 'primary' : 'dark' ">visibility</v-icon>
                        </v-btn>
                        <span class="polygon-area" :style="{background: ring.properties.color}">
                          <b style="font-size:11px" :style="{color: polygonAreaTextColor(ring.properties.color)}">{{ring.properties.label.replace('Polygon', '')}}</b>
                        </span>
                      </v-flex>
                       <v-flex lg3>
                         <template v-if="ring.properties.total_pop !== null">
                           <div style="font-size:12px">
                            <span>{{ring.properties.total_pop}}</span>
                           </div>
                         </template>
                      </v-flex>
                      <v-flex md5>
                        <div style="font-size:12px">
                          <span>{{ring.properties.area}}</span>
                        </div>
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
