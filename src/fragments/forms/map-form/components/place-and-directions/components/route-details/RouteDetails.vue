<template>
<div>
  <box background="white" v-if="hasRoutes" custom-class="expansion-box" noShadow>
    <div slot="header">
      <download :map-view-data="mapViewData" ></download>
      <share></share>
      <h3>{{$t('routeDetails.routeSummary')}}</h3>
    </div>
    <v-expansion-panel slot="content" class="no-shadow" v-if="hasRoutes" :value="startedPanelExtended">
      <v-expansion-panel-content style="background: transparent;" class="routes-header" :key="index" v-for="(route, index) in parsedRoutes">
        <div slot="header">
          <h4 >{{$t('routeDetails.route')}} {{index + 1}} ({{route.summary.distance}})
            <v-btn icon @click="changeActiveRouteIndex(index)" v-if="parsedRoutes.length > 1" :title="index === $store.getters.activeRouteIndex? $t('routeDetails.selectedRoute') : $t('routeDetails.selectRoute')">
              <v-icon :color="index === $store.getters.activeRouteIndex? 'primary' : 'dark' " >done</v-icon>
            </v-btn>
          </h4>
        </div>
        <v-list>
          <v-divider></v-divider>
          <v-list dense>
            <div style="padding:0 0 0 10px">
              <div>{{$t('routeDetails.distance')}}:  <b>{{route.summary.distance}} </b></div>
              <div>{{$t('routeDetails.duration')}}:  <b>{{route.summary.duration}} </b></div>
            </div>
            <div  style="padding:0 0 0 10px" v-if="route.properties.warnings">
              <h4 >{{$t('routeDetails.warnings')}}:</h4>
              <v-alert :key="warning.code" v-for="warning in route.properties.warnings" :value="warning.message"  type="warning" style="color:black" >{{ warning.message }}</v-alert>
            </div>
            <div v-if="route.properties.segments.length > 1 && index === $store.getters.activeRouteIndex">
              <v-expansion-panel class="no-shadow" v-if="hasRoutes" :value="route.properties.segments.length === 1 ? 0 : null">
                <v-expansion-panel-content class="route-panel"  v-for="(segment, index) in route.properties.segments" :key="index">
                  <div slot="header"><h4 >{{$t('routeDetails.segment')}} {{index + 1}}</h4></div>
                  <v-list>
                    <v-divider></v-divider>
                    <v-list dense class="instructions-scroll">
                      <div style="padding:0 0 0 0px">
                        <div>
                          {{$t('routeDetails.distance')}}:  <b>{{segment.distance}} </b>
                          <v-btn :max-width="30" fab icon small @click="segmentClicked(segment, index)" :title="$t('routeDetails.gotoSegment')">
                            <v-icon>remove_red_eye</v-icon>
                          </v-btn>
                        </div>
                        <div>{{$t('routeDetails.duration')}}:  <b>{{segment.duration}} </b></div>
                      </div>
                      <div style="padding:0 0 0 0px">
                        <h4 >{{$t('routeDetails.instructions')}}:</h4>
                        <br>
                        <steps :steps=" segment.steps"></steps>
                      </div>
                    </v-list>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <route-extras :route="route"></route-extras>
            </div>
            <div v-else-if="index === $store.getters.activeRouteIndex">
              <div style="padding:0 0 0 5px">
                <v-expansion-panel class="no-shadow" v-if="hasRoutes" :value="null">
                  <v-expansion-panel-content style="background: transparent;" >
                    <div slot="header"><h4 >{{$t('routeDetails.instructions')}}</h4></div>
                    <v-list class="instructions-scroll">
                      <v-divider></v-divider>
                      <v-list dense>
                        <steps :steps="route.properties.segments[0].steps"></steps>
                      </v-list>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <route-extras :route="route"></route-extras>
              </div>
            </div>
          </v-list>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </box>
</div>
</template>

<script src="./route-details.js"></script>

<style scoped src="./route-details.css"></style>
