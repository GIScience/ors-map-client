<template>
<div>
  <box background="white" v-if="hasRoutes" custom-class="expansion-box" no-shadow>
    <template v-slot:header>
      <download :map-view-data="mapViewData" ></download>
      <share :url="shareUrl"></share>
      <print :map-view-data="mapViewData"></print>
      <h3>{{$t('routeDetails.routeDetails')}}</h3>
    </template>
    <template v-slot:content>
      <v-expansion-panels class="no-shadow" v-if="hasRoutes">
        <v-expansion-panel :value="panelExtended" style="background: transparent;" class="routes-header" :key="routeIndex" v-for="(route, routeIndex) in parsedRoutes">
          <v-expansion-panel-title>
            <h4 >{{$t('routeDetails.route')}} {{routeIndex + 1}} ({{route.summary.distance}})
              <v-btn icon @click.stop="changeActiveRouteIndex(routeIndex)" v-if="parsedRoutes.length > 1" :title="routeIndex === $store.getters.activeRouteIndex? $t('routeDetails.selectedRoute') : $t('routeDetails.selectRoute')">
                <v-icon :color="routeIndex === $store.getters.activeRouteIndex? 'primary' : 'dark' " >done</v-icon>
              </v-btn>
            </h4>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-list>
              <v-divider></v-divider>
              <v-list density="compact" class="route-details">
                <div style="padding:0 0 0 10px">
                  <div>{{$t('global.distance')}}:  <b>{{route.summary.distance}} </b></div>
                  <div v-if="route.summary.duration" >{{$t('global.duration')}}:  <b>{{route.summary.duration}} </b></div>
                </div>
                <div  style="padding:0 0 0 10px" v-if="route.properties.warnings">
                  <h4 >{{$t('routeDetails.warnings')}}:</h4>
                  <v-alert :key="warning.code" v-for="warning in route.properties.warnings" :value="getWarningTranslated(warning)"  type="warning" style="color:black" >{{ getWarningTranslated(warning) }}</v-alert>
                </div>
                <div v-if="route.properties.segments.length > 1 && routeIndex === $store.getters.activeRouteIndex" class="route-container">
                  <v-expansion-panels class="no-shadow" v-if="hasRoutes">
                    <v-expansion-panel class="route-panel" v-for="(segment, segmentIndex) in route.properties.segments" :key="segmentIndex" :value="route.properties.segments.length === 1 ? 0 : null">
                      <v-expansion-panel-title>
                        <h4 >{{$t('routeDetails.segment')}} {{segmentIndex + 1}}</h4>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <v-list>
                          <v-divider></v-divider>
                          <v-list density="compact" class="instructions-scroll">
                            <div style="padding:0 0 0 0">
                              <div>
                                {{$t('global.distance')}}:  <b>{{segment.distance}} </b>
                                <v-btn :max-width="30" style="height:15px" icon size="small" @click="segmentClicked(segment, segmentIndex)" :title="$t('routeDetails.gotoSegment')">
                                  <v-icon>remove_red_eye</v-icon>
                                </v-btn>
                              </div>
                              <div>{{$t('global.duration')}}:  <b>{{segment.duration}} </b></div>
                              <v-layout>
                              <v-flex sm6 v-if="segment.ascent">
                                <p><v-icon>arrow_upward</v-icon> {{formatElevation(segment.ascent)}} {{$t('global.units.m')}}</p>
                              </v-flex>
                              <v-flex sm6 v-if="segment.descent">
                                <p><v-icon>arrow_downward</v-icon> {{formatElevation(segment.descent)}} {{$t('global.units.m')}}</p>
                              </v-flex>
                            </v-layout>
                            </div>
                            <div style="padding:0 0 0 0">
                              <h4 >{{$t('routeDetails.instructions')}}:</h4>
                              <br>
                              <steps :steps=" segment.steps"></steps>
                            </div>
                          </v-list>
                        </v-list>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                  <route-extras :route="route"></route-extras>
                  <div style="padding-left: 5px; padding-right:30px; padding-top:10px">
                    <b>{{$t('routeDetails.routeOpacity')}}</b>
                    <v-slider class="route-opacity-slider" :min="0" :max="1"
                      append-icon="opacity"
                      :thumb-size="24"
                      thumb-label="always"
                      v-model="route.properties.opacity" :title="$t('routeDetails.routeOpacity')"
                      @update:modelValue="routeOpacityChanged(routeIndex)" :step="0.1">
                    </v-slider>
                  </div>
                </div>
                <div v-else-if="routeIndex === $store.getters.activeRouteIndex" class="route-container">
                  <div style="padding:0 0 0 5px">
                    <v-expansion-panels class="no-shadow" v-if="hasRoutes">
                      <v-expansion-panel :value="null" class="route-panel" style="background: transparent;" >
                        <v-expansion-panel-title>
                          <h4 >{{$t('routeDetails.instructions')}}</h4>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-list class="instructions-scroll">
                            <v-divider></v-divider>
                            <v-list density="compact">
                              <steps :steps="route.properties.segments[0].steps"></steps>
                            </v-list>
                          </v-list>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>
                    <route-extras :route="route"></route-extras>
                    <div style="padding-left: 5px; padding-right:30px; padding-top:10px">
                      <v-slider class="route-opacity-slider" :min="0" :max="1"
                        append-icon="opacity"
                        :thumb-size="24"
                        thumb-label="always"
                        v-model="route.properties.opacity" :title="$t('routeDetails.routeOpacity')"
                        @update:modelValue="routeOpacityChanged(routeIndex)" :step="0.1">
                      </v-slider>
                    </div>
                  </div>
                </div>
              </v-list>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
  </box>
</div>
</template>

<script src="./route-details.js"></script>

<style scoped src="./route-details.css"></style>
