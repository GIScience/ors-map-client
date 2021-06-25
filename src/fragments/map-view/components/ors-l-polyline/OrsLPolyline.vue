<template>
  <div class="ors-l-polyline">
    <l-polyline :lat-lngs="latLngsCoordinates" :opacity="routeOpacity" :weight="backgroundWeight" :color="backgroundColor"></l-polyline>
    <l-polyline ref="foregroundPolyline"
      @follow="followPolyline" 
      @rightClicked="rightClicked"
      @click.exact="click($event)"
      @followMarkerClicked="click($event)"
      @addstop="addStopViaPolylineDrag"
      @add="openPopup"
      :options="options" 
      :lat-lngs="latLngsCoordinates" 
      :weight="weight" 
      :opacity="routeOpacity"
      :color="color">
    </l-polyline>
  </div>
</template>
<script src="./ors-l-polyline.js"></script>
<style src="./ors-l-polyline.css"></style>
