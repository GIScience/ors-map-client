<template>
<div>

  <box background="white" v-if="hasRoutes" custom-class="expansion-box" no-shadow>
    <div slot="header">
      <h4>{{ $t('routeDetails.legend') }}</h4>
      <div class="legend">
        <div class="flex-row"><span class="legend-box low"/> {{ $t('routeDetails.legendLow') }}</div>
        <div class="flex-row"><span class="legend-box mid"/> {{ $t('routeDetails.legendMid') }}</div>
        <div class="flex-row"><span class="legend-box high"/> {{ $t('routeDetails.legendHigh') }}</div>
      </div>
    </div>
    <v-expansion-panel slot="content" class="no-shadow" v-if="hasRoutes" expand :value="parsedRoutes.map((_, index) => index+1)">
      <v-expansion-panel-content style="background: transparent;" class="routes-header" :key="routeIndex" v-for="(route, routeIndex) in parsedRoutes">
        <div slot="header" style="display:flex; align-items: center; justify-content: space-between;">
          <h4 >{{ routeIndex === 0 ? $t('routeDetails.heatRoute') : $t('routeDetails.fastestRoute') }}
            ({{ route.summary.distance }})</h4>
            <v-btn icon  v-if="parsedRoutes.length > 1" :title="routeIndex === $store.getters.activeRouteIndex? $t('routeDetails.selectedRoute') : $t('routeDetails.selectRoute')">
              <v-icon @click.stop="changeActiveRouteIndex(routeIndex)" :color="routeIndex === $store.getters.activeRouteIndex ? dark : 'grey lighten-1'" >{{ routeIndex === $store.getters.activeRouteIndex ? "visibility" : "visibility_off" }}</v-icon>
            </v-btn>

        </div>
        <v-list>
          <v-divider></v-divider>
          <v-list dense class="route-details">
            <div style="padding:0 0 0 10px">
              <div v-if="route.summary.duration" >{{$t('global.duration')}}:  <b>{{route.summary.duration}} </b></div>
            </div>
            <route-extras :route="route"></route-extras>
          </v-list>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </box>
</div>
</template>

<script src="./route-details.js"></script>

<style scoped src="./route-details.css"></style>
