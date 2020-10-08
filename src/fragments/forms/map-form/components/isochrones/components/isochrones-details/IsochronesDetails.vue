<template>
  <box background="white" no-shadow>
    <div slot="header">
      <download :download-formats-supported="['json', 'geojson']" :map-view-data="mapViewData" ></download>
      <share></share>
      <h3>{{$t('isochrones.isochrones')}}</h3>
    </div>
    <div slot="content">
      <h4 >{{$t('isochronesDetails.polygons')}}</h4>
      <v-list dense class="centers">
        <template v-for="(place, index) in mapViewData.places">
          <div :key="index" style="padding-left:5px">
            <h5 >{{$t('isochronesDetails.center')}}: {{place.placeName}} </h5>
            <template  v-for="(polygon, index) in polygons">
              <template v-if="hasAsCenter(place, polygon)">
                <div :key="index" style="padding-left:5px">
                  <div>{{polygon.label.replace('Polygon', '')}}:  <span class="polygon-area" :style="{background: polygon.color}"><b :style="{color: polygonAreaTextColor(polygon.color)}"> {{calcArea(polygon)}}</b></span></div>
                </div>
              </template>
            </template>
            <br>
          </div>
        </template>
      </v-list>
    </div>
  </box>
</template>
<script src="./isochrones-details.js"></script>
<style scoped src="./isochrones-details.css"></style>
