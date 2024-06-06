<template>
  <box background="white" no-shadow>
    <div slot="header">
      <download :download-formats-supported="['json', 'geojson']" :map-view-data="mapViewData"></download>
      <share :url="shareUrl"></share>
      <print :map-view-data="localMapViewData"></print>
      <h3>{{$t('optimizationDetails.optimizationDetails')}}</h3>
    </div>
    <div  style="padding:0 0 0 10px" v-if="mapViewData.rawData.summary.unassigned">
      <h4>{{$t('optimizationDetails.warningUnassigned')}}</h4>
      <v-alert :key="job.id" v-for="job in mapViewData.rawData.unassigned" :value="job.id"  type="warning" style="color:black" >Job {{job.id}} {{$t('optimizationDetails.isUnassigned')}}</v-alert>
    </div>
    <v-expansion-panel slot="content" class="no-shadow" v-if="hasRoutes" :value="panelExtended" :expand="true">
      <v-expansion-panel-content style="background: transparent;" class="routes-header" :key="routeIndex" v-for="(route, routeIndex) in parsedRoutes">
        <div slot="header">
          <h4><v-icon :color="vehicleColors(route.vehicle)" style="padding: 0 5px 0 0">{{ getVehicleIconName(route.vehicle) }}</v-icon>{{$t('routeDetails.route')}} {{routeIndex + 1}} (Vehicle {{route.vehicle}})
            <v-btn icon target="_blank" :href="generateRouteURL(routeIndex)" v-if="parsedRoutes.length > 0" :title="$t('optimizationDetails.getInstructions')">
              <v-icon :color="vehicleColors(route.vehicle)">directions</v-icon>
            </v-btn>
          </h4>
        </div>
        <div style="padding:0 0 0 10px; display: flex; flex-wrap:wrap;">
          <template v-for="prop in ['distance','duration','service','delivery','pickup','waiting_time']">
            <v-chip v-if="route[prop] && prop === 'delivery' || prop === 'pickup' && route[prop][0] !== 0" style="flex: 0 1 auto">{{ $t(`optimization.${prop}`) }}: {{ route[prop][0] }}</v-chip>
            <v-chip v-else-if="route[prop] && prop !== 'delivery' && prop !== 'pickup' && route[prop] !== 0" style="flex: 0 1 auto">{{ $t(`optimizationDetails.${prop}`) }}: {{ route[prop] }}</v-chip>

          </template>
        </div>

        <v-list>
          <v-divider></v-divider>
          <v-list dense class="route-details">
            <div v-if="route.steps > 1" class="route-container">
              <v-expansion-panel class="no-shadow" v-if="hasRoutes" :value="route.steps.length === 1 ? 0 : null">
                <v-expansion-panel-content class="route-panel">
                  <v-list dense>
                    <optimization-steps :steps="route.steps"></optimization-steps>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </div>
            <div class="route-container">
              <div style="padding:0 0 0 5px">
                <v-expansion-panel class="no-shadow" v-if="hasRoutes" :value="null">
                  <v-expansion-panel-content class="route-panel" style="background: transparent;" >
                    <div slot="header"><h4 >{{$t('optimizationDetails.schedule')}}</h4></div>
                    <v-list class="instructions-scroll">
                      <v-divider></v-divider>
                      <v-list dense>
                        <optimization-steps :steps="route.steps"></optimization-steps>
                      </v-list>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </div>
            </div>
          </v-list>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </box>
</template>

<script src="./optimization-details.js"></script>
<style scoped src="./optimization-details.css"></style>
