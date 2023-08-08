<template>
  <div class="printing-template directions-template">
    <h2 v-html="contentTitle"></h2>
    <br /><br />

    <img alt="Map print view" width="auto" height="400" :src="mapViewImage" />
    <template v-for="(place, index) in localMapViewData.places">
      <div :key="index">
        <h5>{{place.placeName}}</h5>
        <template v-for="(polygon, polygonIndex) in localMapViewData.polygons">
          <template v-if="hasAsCenter(place, polygon)">
            <div :key="polygonIndex" style="padding-left:10px">
              <span :style="{background: polygon.properties.color}">
                <b :style="{color: polygonAreaTextColor(polygon)}">{{polygon.properties.label.replace('Polygon', '')}}</b>
              </span>
              <span>&rArr;</span> {{polygon.properties.area}} &#38;
              <span>{{$t('global.population')}}: {{polygon.properties.total_pop}}</span>
            </div>
          </template>
        </template>
        <br />
       </div>
    </template>
  </div>
</template>

<script src="./print-isochrones.js"></script>
